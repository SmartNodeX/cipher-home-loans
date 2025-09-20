import { SecureLogo } from "@/components/SecureLogo";
import { LoanMeter } from "@/components/LoanMeter";
import { WalletConnection } from "@/components/WalletConnection";
import { AnimatedFooter } from "@/components/AnimatedFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, TrendingUp, FileText, DollarSign, Home, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-card-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SecureLogo size="md" />
              <div>
                <h1 className="text-xl font-bold text-foreground">SecureLend</h1>
                <p className="text-sm text-muted-foreground">FHE Mortgage Platform</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Dashboard
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Applications
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Security
              </a>
              <Button variant="security" size="sm">
                <Shield size={16} />
                Apply Now
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              Secure Mortgage Lending
              <span className="block text-primary"> with FHE</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your credit history and property data remain encrypted throughout the entire 
              approval process. Revolutionary privacy-preserving mortgage lending.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="security" size="lg" className="text-lg px-8">
                <Lock size={20} />
                Start Secure Application
              </Button>
              <Button variant="hero" size="lg" className="text-lg px-8">
                <FileText size={20} />
                Learn About FHE
              </Button>
            </div>

            {/* Security Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              {[
                {
                  icon: Shield,
                  title: "End-to-End Encryption",
                  description: "Your data never leaves encrypted state during processing"
                },
                {
                  icon: Lock,
                  title: "Privacy Preserved",
                  description: "Credit analysis without exposing sensitive information"
                },
                {
                  icon: Zap,
                  title: "Instant Verification",
                  description: "Smart contracts for transparent, automated approvals"
                }
              ].map((feature, i) => (
                <Card key={i} className="border-card-border bg-card/50 backdrop-blur-sm shadow-card">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-gradient-security rounded-lg shadow-security w-fit">
                      <feature.icon size={24} className="text-primary-foreground" />
                    </div>
                    <CardTitle className="text-foreground">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Encrypted Loan Dashboard
              </h2>
              <p className="text-muted-foreground">
                Real-time processing of your encrypted mortgage data
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Wallet Connection */}
              <div className="lg:col-span-1">
                <WalletConnection />
              </div>

              {/* Loan Meters */}
              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <LoanMeter
                    title="Credit Score Analysis"
                    value={742}
                    maxValue={850}
                    status="encrypted"
                    isEncrypted={true}
                  />
                  <LoanMeter
                    title="Property Valuation"
                    value={450000}
                    maxValue={500000}
                    status="pending"
                    isEncrypted={false}
                  />
                  <LoanMeter
                    title="Loan Amount"
                    value={380000}
                    maxValue={400000}
                    status="approved"
                    isEncrypted={false}
                  />
                  <LoanMeter
                    title="Income Verification"
                    value={95000}
                    maxValue={100000}
                    status="encrypted"
                    isEncrypted={true}
                  />
                </div>

                {/* Status Card */}
                <Card className="border-primary bg-primary/10 shadow-security">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary">
                      <TrendingUp size={20} />
                      Application Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-foreground font-medium">Processing Encrypted Data</p>
                        <p className="text-muted-foreground text-sm">
                          FHE computation in progress - your data remains private
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                        <span className="text-primary font-medium">87%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <AnimatedFooter />
    </div>
  );
};

export default Index;
