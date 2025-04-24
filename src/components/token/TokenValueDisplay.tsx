
import React from 'react';
import { formatTokenBalance } from '@/utils/alchemyService';

interface TokenValueDisplayProps {
  tokenBalance?: string;
  decimals?: number;
  value: number;
}

export const TokenValueDisplay: React.FC<TokenValueDisplayProps> = ({
  tokenBalance,
  decimals,
  value
}) => {
  // Format balance for display
  const displayBalance = () => {
    if (!tokenBalance) return '0';
    
    if (tokenBalance.startsWith('0x')) {
      return formatTokenBalance(tokenBalance, decimals);
    }
    
    try {
      const balance = parseFloat(tokenBalance);
      return balance.toLocaleString(undefined, {
        maximumFractionDigits: 4,
        minimumFractionDigits: balance < 0.0001 ? 6 : 4
      });
    } catch (e) {
      console.error("Error formatting token balance:", e);
      return tokenBalance;
    }
  };
  
  return (
    <div className="text-right">
      <div className="font-medium">{displayBalance()}</div>
      <div className="text-xs text-muted-foreground">
        ${value.toLocaleString(undefined, {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2
        })}
      </div>
    </div>
  );
};

export default TokenValueDisplay;
