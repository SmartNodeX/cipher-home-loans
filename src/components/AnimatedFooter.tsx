import { Home, Lock, Shield, Key } from "lucide-react";

export const AnimatedFooter = () => {
  return (
    <footer className="bg-gradient-hero border-t border-card-border mt-20">
      <div className="container mx-auto px-6 py-12">
        {/* Animated Houses */}
        <div className="flex justify-center items-center gap-8 mb-8">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="relative group cursor-pointer"
              style={{ 
                animationDelay: `${i * 0.5}s`,
                animation: `house-pop 3s ease-in-out infinite`
              }}
            >
              {/* House */}
              <div className="relative">
                <Home 
                  size={40} 
                  className="text-primary group-hover:text-accent transition-colors duration-300"
                />
                
                {/* Encrypted Lock */}
                <div className="absolute -top-1 -right-1 bg-encrypted rounded-full p-1 animate-lock-bounce">
                  <Lock size={16} className="text-encrypted-foreground" />
                </div>
              </div>
              
              {/* Security indicator */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                <div className="w-2 h-2 bg-approved rounded-full animate-security-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Home size={24} className="text-primary" />
                <Key size={12} className="absolute -bottom-1 -right-1 text-secondary transform rotate-45" />
              </div>
              <span className="text-lg font-semibold text-foreground">SecureLend</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Revolutionizing mortgage lending with Fully Homomorphic Encryption, 
              ensuring your financial data stays private throughout the entire process.
            </p>
          </div>

          {/* Security Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Shield size={20} className="text-primary" />
              Security Features
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Lock size={14} className="text-encrypted" />
                End-to-end encryption
              </li>
              <li className="flex items-center gap-2">
                <Shield size={14} className="text-primary" />
                FHE data processing
              </li>
              <li className="flex items-center gap-2">
                <Key size={14} className="text-secondary" />
                Blockchain verification
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Contact</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>support@securelend.finance</p>
              <p>1-800-SECURE-1</p>
              <p>Licensed Mortgage Lender</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-card-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 SecureLend. All rights reserved. NMLS ID: 123456
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Compliance</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};