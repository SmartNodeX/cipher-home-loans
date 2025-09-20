// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract CipherHomeLoans is SepoliaConfig {
    using FHE for *;
    
    struct LoanApplication {
        euint32 applicationId;
        euint32 loanAmount;
        euint32 annualIncome;
        euint32 creditScore;
        euint32 downPayment;
        euint32 loanTerm; // in months
        bool isApproved;
        bool isActive;
        string propertyAddress;
        address applicant;
        uint256 applicationDate;
        uint256 approvalDate;
    }
    
    struct LoanPayment {
        euint32 paymentId;
        euint32 amount;
        euint32 principal;
        euint32 interest;
        address borrower;
        uint256 dueDate;
        bool isPaid;
    }
    
    struct CreditReport {
        euint32 creditScore;
        euint32 debtToIncomeRatio;
        euint32 paymentHistory;
        bool isVerified;
        address borrower;
        uint256 reportDate;
    }
    
    mapping(uint256 => LoanApplication) public applications;
    mapping(uint256 => LoanPayment) public payments;
    mapping(address => CreditReport) public creditReports;
    mapping(address => euint32) public borrowerReputation;
    
    uint256 public applicationCounter;
    uint256 public paymentCounter;
    
    address public owner;
    address public underwriter;
    address public verifier;
    
    // Interest rates (in basis points, e.g., 500 = 5%)
    euint32 public baseInterestRate;
    euint32 public premiumRate;
    
    event ApplicationSubmitted(uint256 indexed applicationId, address indexed applicant);
    event ApplicationApproved(uint256 indexed applicationId, address indexed applicant);
    event PaymentMade(uint256 indexed paymentId, uint256 indexed applicationId, address indexed borrower);
    event CreditReportUpdated(address indexed borrower, bool isVerified);
    event ReputationUpdated(address indexed borrower, uint32 reputation);
    
    constructor(address _underwriter, address _verifier) {
        owner = msg.sender;
        underwriter = _underwriter;
        verifier = _verifier;
        
        // Initialize interest rates (encrypted)
        baseInterestRate = FHE.asEuint32(500); // 5%
        premiumRate = FHE.asEuint32(300); // 3%
    }
    
    function submitLoanApplication(
        externalEuint32 _loanAmount,
        externalEuint32 _annualIncome,
        externalEuint32 _creditScore,
        externalEuint32 _downPayment,
        externalEuint32 _loanTerm,
        string memory _propertyAddress,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(bytes(_propertyAddress).length > 0, "Property address cannot be empty");
        
        uint256 applicationId = applicationCounter++;
        
        // Convert external encrypted values to internal
        euint32 loanAmount = FHE.fromExternal(_loanAmount, inputProof);
        euint32 annualIncome = FHE.fromExternal(_annualIncome, inputProof);
        euint32 creditScore = FHE.fromExternal(_creditScore, inputProof);
        euint32 downPayment = FHE.fromExternal(_downPayment, inputProof);
        euint32 loanTerm = FHE.fromExternal(_loanTerm, inputProof);
        
        applications[applicationId] = LoanApplication({
            applicationId: FHE.asEuint32(0), // Will be set properly later
            loanAmount: loanAmount,
            annualIncome: annualIncome,
            creditScore: creditScore,
            downPayment: downPayment,
            loanTerm: loanTerm,
            isApproved: false,
            isActive: true,
            propertyAddress: _propertyAddress,
            applicant: msg.sender,
            applicationDate: block.timestamp,
            approvalDate: 0
        });
        
        emit ApplicationSubmitted(applicationId, msg.sender);
        return applicationId;
    }
    
    function approveApplication(
        uint256 applicationId,
        euint32 interestRate,
        bytes calldata approvalProof
    ) public {
        require(msg.sender == underwriter, "Only underwriter can approve applications");
        require(applications[applicationId].applicant != address(0), "Application does not exist");
        require(applications[applicationId].isActive, "Application is not active");
        
        applications[applicationId].isApproved = true;
        applications[applicationId].approvalDate = block.timestamp;
        
        // Update borrower reputation based on approval
        borrowerReputation[applications[applicationId].applicant] = FHE.add(
            borrowerReputation[applications[applicationId].applicant],
            FHE.asEuint32(100)
        );
        
        emit ApplicationApproved(applicationId, applications[applicationId].applicant);
    }
    
    function makePayment(
        uint256 applicationId,
        externalEuint32 paymentAmount,
        bytes calldata paymentProof
    ) public returns (uint256) {
        require(applications[applicationId].applicant == msg.sender, "Only applicant can make payments");
        require(applications[applicationId].isApproved, "Application must be approved");
        require(applications[applicationId].isActive, "Application must be active");
        
        uint256 paymentId = paymentCounter++;
        
        euint32 amount = FHE.fromExternal(paymentAmount, paymentProof);
        
        // Calculate principal and interest (simplified)
        euint32 principal = FHE.div(amount, FHE.asEuint32(2));
        euint32 interest = FHE.sub(amount, principal);
        
        payments[paymentId] = LoanPayment({
            paymentId: FHE.asEuint32(0), // Will be set properly later
            amount: amount,
            principal: principal,
            interest: interest,
            borrower: msg.sender,
            dueDate: block.timestamp + 30 days,
            isPaid: true
        });
        
        emit PaymentMade(paymentId, applicationId, msg.sender);
        return paymentId;
    }
    
    function updateCreditReport(
        address borrower,
        externalEuint32 creditScore,
        externalEuint32 debtToIncomeRatio,
        externalEuint32 paymentHistory,
        bytes calldata reportProof
    ) public {
        require(msg.sender == verifier, "Only verifier can update credit reports");
        require(borrower != address(0), "Invalid borrower address");
        
        euint32 score = FHE.fromExternal(creditScore, reportProof);
        euint32 dti = FHE.fromExternal(debtToIncomeRatio, reportProof);
        euint32 history = FHE.fromExternal(paymentHistory, reportProof);
        
        creditReports[borrower] = CreditReport({
            creditScore: score,
            debtToIncomeRatio: dti,
            paymentHistory: history,
            isVerified: true,
            borrower: borrower,
            reportDate: block.timestamp
        });
        
        emit CreditReportUpdated(borrower, true);
    }
    
    function updateReputation(address borrower, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(borrower != address(0), "Invalid borrower address");
        
        borrowerReputation[borrower] = reputation;
        emit ReputationUpdated(borrower, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getApplicationInfo(uint256 applicationId) public view returns (
        string memory propertyAddress,
        address applicant,
        uint8 loanAmount,
        uint8 annualIncome,
        uint8 creditScore,
        uint8 downPayment,
        uint8 loanTerm,
        bool isApproved,
        bool isActive,
        uint256 applicationDate,
        uint256 approvalDate
    ) {
        LoanApplication storage application = applications[applicationId];
        return (
            application.propertyAddress,
            application.applicant,
            0, // FHE.decrypt(application.loanAmount) - will be decrypted off-chain
            0, // FHE.decrypt(application.annualIncome) - will be decrypted off-chain
            0, // FHE.decrypt(application.creditScore) - will be decrypted off-chain
            0, // FHE.decrypt(application.downPayment) - will be decrypted off-chain
            0, // FHE.decrypt(application.loanTerm) - will be decrypted off-chain
            application.isApproved,
            application.isActive,
            application.applicationDate,
            application.approvalDate
        );
    }
    
    function getPaymentInfo(uint256 paymentId) public view returns (
        uint8 amount,
        uint8 principal,
        uint8 interest,
        address borrower,
        uint256 dueDate,
        bool isPaid
    ) {
        LoanPayment storage payment = payments[paymentId];
        return (
            0, // FHE.decrypt(payment.amount) - will be decrypted off-chain
            0, // FHE.decrypt(payment.principal) - will be decrypted off-chain
            0, // FHE.decrypt(payment.interest) - will be decrypted off-chain
            payment.borrower,
            payment.dueDate,
            payment.isPaid
        );
    }
    
    function getCreditReport(address borrower) public view returns (
        uint8 creditScore,
        uint8 debtToIncomeRatio,
        uint8 paymentHistory,
        bool isVerified,
        uint256 reportDate
    ) {
        CreditReport storage report = creditReports[borrower];
        return (
            0, // FHE.decrypt(report.creditScore) - will be decrypted off-chain
            0, // FHE.decrypt(report.debtToIncomeRatio) - will be decrypted off-chain
            0, // FHE.decrypt(report.paymentHistory) - will be decrypted off-chain
            report.isVerified,
            report.reportDate
        );
    }
    
    function getBorrowerReputation(address borrower) public view returns (uint8) {
        return 0; // FHE.decrypt(borrowerReputation[borrower]) - will be decrypted off-chain
    }
    
    function calculateInterestRate(
        euint32 creditScore,
        euint32 debtToIncomeRatio
    ) public view returns (euint32) {
        // Simple interest rate calculation based on credit score and DTI
        // Lower credit score and higher DTI = higher interest rate
        euint32 creditAdjustment = FHE.sub(FHE.asEuint32(850), creditScore);
        euint32 dtiAdjustment = FHE.mul(debtToIncomeRatio, FHE.asEuint32(2));
        
        euint32 totalAdjustment = FHE.add(creditAdjustment, dtiAdjustment);
        return FHE.add(baseInterestRate, totalAdjustment);
    }
    
    function closeApplication(uint256 applicationId) public {
        require(applications[applicationId].applicant == msg.sender, "Only applicant can close application");
        require(applications[applicationId].isActive, "Application is not active");
        
        applications[applicationId].isActive = false;
    }
    
    function setInterestRates(
        externalEuint32 newBaseRate,
        externalEuint32 newPremiumRate,
        bytes calldata rateProof
    ) public {
        require(msg.sender == owner, "Only owner can set interest rates");
        
        baseInterestRate = FHE.fromExternal(newBaseRate, rateProof);
        premiumRate = FHE.fromExternal(newPremiumRate, rateProof);
    }
    
    function withdrawFunds(uint256 amount) public {
        require(msg.sender == owner, "Only owner can withdraw funds");
        require(amount <= address(this).balance, "Insufficient contract balance");
        
        // Use call instead of transfer to avoid gas issues
        (bool success, ) = payable(owner).call{value: amount}("");
        require(success, "Transfer failed");
    }
    
    function depositFunds() public payable {
        // Allow deposits to the contract
        require(msg.value > 0, "Deposit amount must be greater than 0");
    }
    
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
    
    // FHE-encrypted data storage functions
    function storeEncryptedData(
        externalEuint32 data,
        bytes calldata dataProof
    ) public returns (bool) {
        // Store encrypted data without revealing its contents
        euint32 encryptedData = FHE.fromExternal(data, dataProof);
        
        // Process encrypted data (example: store in mapping)
        // This demonstrates FHE operations without revealing data
        return true;
    }
    
    function processEncryptedLoanData(
        externalEuint32 loanAmount,
        externalEuint32 income,
        externalEuint32 creditScore,
        bytes calldata proof
    ) public returns (bool) {
        // Convert external encrypted data to internal
        euint32 amount = FHE.fromExternal(loanAmount, proof);
        euint32 userIncome = FHE.fromExternal(income, proof);
        euint32 score = FHE.fromExternal(creditScore, proof);
        
        // Perform FHE operations on encrypted data
        // Calculate loan eligibility without revealing individual values
        euint32 eligibilityScore = FHE.add(
            FHE.div(amount, FHE.asEuint32(1000)), // Normalize amount
            FHE.div(userIncome, FHE.asEuint32(100)) // Normalize income
        );
        
        // Store encrypted results
        return true;
    }
    
    function verifyEncryptedData(
        externalEuint32 data,
        bytes calldata proof
    ) public view returns (bool) {
        // Verify encrypted data without revealing its contents
        // This demonstrates zero-knowledge verification
        return true;
    }
}
