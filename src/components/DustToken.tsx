
import React from 'react';
import { TokenInfo } from '@/types';
import { TokenDisplay } from './token/TokenDisplay';
import { TokenValueDisplay } from './token/TokenValueDisplay';
import { TokenSelectionCard } from './token/TokenSelectionCard';

interface DustTokenProps {
  token: TokenInfo;
  onSelect: (token: TokenInfo, selected: boolean) => void;
  isSelected: boolean;
  className?: string;
}

export const DustToken: React.FC<DustTokenProps> = ({
  token,
  onSelect,
  isSelected,
  className
}) => {
  const handleSelectChange = (selected: boolean) => {
    onSelect(token, selected);
  };

  return (
    <TokenSelectionCard
      id={token.id}
      chain={token.chain}
      isSelected={isSelected}
      onSelectChange={handleSelectChange}
      className={className}
    >
      <div className="flex items-center justify-between w-full">
        <TokenDisplay 
          symbol={token.symbol} 
          name={token.name} 
          logo={token.logo}
          chain={token.chain} 
        />
        
        <TokenValueDisplay 
          tokenBalance={token.tokenBalance}
          decimals={token.decimals}
          value={token.value}
        />
      </div>
    </TokenSelectionCard>
  );
};

export default DustToken;
