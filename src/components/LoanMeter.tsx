import { useState, useEffect } from "react";
import { Shield, Lock, Unlock, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LoanMeterProps {
  title: string;
  value: number;
  maxValue: number;
  isEncrypted?: boolean;
  status: "encrypted" | "pending" | "approved";
  className?: string;
}

export const LoanMeter = ({ 
  title, 
  value, 
  maxValue, 
  isEncrypted = true, 
  status,
  className = "" 
}: LoanMeterProps) => {
  const [displayValue, setDisplayValue] = useState(isEncrypted ? 0 : value);
  const percentage = (value / maxValue) * 100;

  useEffect(() => {
    if (!isEncrypted) {
      const timer = setTimeout(() => {
        setDisplayValue(value);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isEncrypted, value]);

  const getStatusStyles = () => {
    switch (status) {
      case "encrypted":
        return {
          border: "border-encrypted",
          bg: "bg-encrypted/10",
          text: "text-encrypted-foreground",
          icon: Lock,
          animation: "animate-encrypt"
        };
      case "pending":
        return {
          border: "border-pending",
          bg: "bg-pending/10", 
          text: "text-pending-foreground",
          icon: Shield,
          animation: "animate-security-pulse"
        };
      case "approved":
        return {
          border: "border-approved",
          bg: "bg-approved/10",
          text: "text-approved-foreground", 
          icon: Unlock,
          animation: "animate-decrypt"
        };
    }
  };

  const statusStyle = getStatusStyles();
  const StatusIcon = statusStyle.icon;

  return (
    <Card className={`${statusStyle.border} ${statusStyle.bg} shadow-card ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-sm font-medium">
          <span className={isEncrypted ? "blur-sm" : statusStyle.text}>
            {title}
          </span>
          <StatusIcon 
            size={16} 
            className={`${statusStyle.text} ${statusStyle.animation}`}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Value Display */}
          <div className={`text-2xl font-bold ${statusStyle.text} ${isEncrypted ? "blur-sm animate-encrypt" : "animate-decrypt"}`}>
            ${displayValue.toLocaleString()}
          </div>
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress 
              value={isEncrypted ? 0 : percentage} 
              className={`h-2 ${isEncrypted ? "animate-encrypt" : "animate-decrypt"}`}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span className={isEncrypted ? "blur-sm" : ""}>
                {percentage.toFixed(1)}%
              </span>
              <span className={isEncrypted ? "blur-sm" : ""}>
                ${maxValue.toLocaleString()} max
              </span>
            </div>
          </div>

          {/* Status Badge */}
          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text} border ${statusStyle.border}`}>
            <TrendingUp size={12} className="mr-1" />
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};