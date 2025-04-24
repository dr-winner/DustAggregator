
import React from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DustToken } from "./DustToken";
import { TokenInfo } from '@/types';

interface TokenListProps {
  filteredTokens: TokenInfo[];
  selectedTokens: TokenInfo[];
  onSelectToken: (token: TokenInfo, selected: boolean) => void;
  allTokensLength: number;
  isLoading: boolean;
}

export const TokenList: React.FC<TokenListProps> = ({
  filteredTokens,
  selectedTokens,
  onSelectToken,
  allTokensLength,
  isLoading
}) => {
  const selectAll = () => {
    const isAllSelected = filteredTokens.every(token => 
      selectedTokens.some(t => t.id === token.id)
    );

    filteredTokens.forEach(token => {
      onSelectToken(token, !isAllSelected);
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-16 h-16 relative mb-4">
          <div className="w-full h-full rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        </div>
        <p className="text-lg font-medium">Loading tokens...</p>
        <p className="text-muted-foreground text-sm mt-2">Fetching your token balances from the blockchain</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={selectAll} 
          className="text-sm"
          disabled={filteredTokens.length === 0}
        >
          {filteredTokens.every(token => selectedTokens.some(t => t.id === token.id))
            ? "Deselect All"
            : "Select All"}
        </Button>
        <span className="text-sm text-muted-foreground">
          {filteredTokens.length} tokens found
        </span>
      </div>

      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-2">
          {filteredTokens.map(token => (
            <DustToken
              key={token.id}
              token={token}
              onSelect={onSelectToken}
              isSelected={selectedTokens.some(t => t.id === token.id)}
            />
          ))}

          {filteredTokens.length === 0 && allTokensLength > 0 && (
            <div className="py-8 text-center text-muted-foreground">
              No tokens found matching your filters
            </div>
          )}
          
          {allTokensLength === 0 && (
            <div className="py-8 text-center text-muted-foreground">
              No tokens found. Connect your wallets to see your tokens.
            </div>
          )}
        </div>
      </ScrollArea>
    </>
  );
};

export default TokenList;
