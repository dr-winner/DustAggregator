
import React from 'react';
import { ChainIcon } from "../ChainIcon";
import { ChainType } from '@/utils/alchemyService';

interface TokenDisplayProps {
  symbol: string | undefined;
  name: string | undefined;
  chain: ChainType;
  logo?: string;
  className?: string;
}

export const TokenDisplay: React.FC<TokenDisplayProps> = ({
  symbol,
  name,
  chain,
  logo,
  className
}) => {
  return (
    <div className="flex items-center space-x-2">
      {logo ? (
        <img src={logo} alt={symbol || 'Token'} className="w-6 h-6 rounded-full" />
      ) : (
        <ChainIcon chain={chain} size="sm" />
      )}
      <div className="flex flex-col">
        <span className="font-medium">{symbol || '???'}</span>
        <span className="text-xs text-muted-foreground">{name}</span>
      </div>
    </div>
  );
};

export default TokenDisplay;
