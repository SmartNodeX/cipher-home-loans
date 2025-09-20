import { Home, Key } from "lucide-react";

interface SecureLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const SecureLogo = ({ className = "", size = "md" }: SecureLogoProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16"
  };

  const iconSize = {
    sm: 16,
    md: 24,
    lg: 32
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* House roof background */}
      <div className="absolute inset-0 bg-gradient-security rounded-lg shadow-security animate-security-pulse">
        <Home 
          size={iconSize[size]} 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary-foreground"
        />
      </div>
      
      {/* Digital key overlay */}
      <div className="absolute -bottom-1 -right-1 bg-gradient-financial rounded-full p-1 shadow-encrypted animate-lock-bounce">
        <Key 
          size={iconSize[size] * 0.6} 
          className="text-secondary-foreground transform rotate-45"
        />
      </div>
    </div>
  );
};