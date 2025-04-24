
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface TokenSelectionCardProps {
  id: string;
  chain: string;
  isSelected: boolean;
  onSelectChange: (isSelected: boolean) => void;
  className?: string;
  children: React.ReactNode;
}

export const TokenSelectionCard: React.FC<TokenSelectionCardProps> = ({
  id,
  chain,
  isSelected,
  onSelectChange,
  className,
  children
}) => {
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <Card 
      className={cn(
        "relative overflow-hidden border transition-all duration-300",
        isSelected ? `border-${chain} bg-${chain}/10` : "border-transparent",
        isHovering ? "scale-105" : "",
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className={cn(
        "absolute inset-0 opacity-0 transition-opacity duration-300",
        isSelected ? "opacity-30" : isHovering ? "opacity-10" : ""
      )}>
        <div className={`w-full h-full bg-${chain}/20`} />
      </div>

      <div className="flex justify-between items-center p-4 relative z-10">
        <div className="flex items-center space-x-3">
          <Checkbox 
            id={`token-${id}`}
            checked={isSelected}
            onCheckedChange={(checked) => onSelectChange(checked as boolean)}
            className={cn(
              "border-2 transition-colors",
              isSelected ? `border-${chain}` : ""
            )}
          />
          {children}
        </div>
      </div>
    </Card>
  );
};

export default TokenSelectionCard;
