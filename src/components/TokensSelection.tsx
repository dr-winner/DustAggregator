
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TokenInfo } from '@/types';
import { TokenFilterTabs } from './TokenFilterTabs';
import { TokenSearchBar } from './TokenSearchBar';
import { TokenList } from './TokenList';
import { useTokenFilter } from '@/hooks/useTokenFilter';

interface TokensSelectionProps {
  tokens: TokenInfo[];
  onSubmit: (selectedTokens: TokenInfo[]) => void;
  className?: string;
  isLoading?: boolean;
}

export const TokensSelection: React.FC<TokensSelectionProps> = ({
  tokens,
  onSubmit,
  className,
  isLoading = false
}) => {
  const [selectedTokens, setSelectedTokens] = useState<TokenInfo[]>([]);
  const {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    filteredTokens,
    tokenCounts
  } = useTokenFilter(tokens);

  const selectToken = (token: TokenInfo, selected: boolean) => {
    if (selected) {
      setSelectedTokens(prev => [...prev, token]);
    } else {
      setSelectedTokens(prev => prev.filter(t => t.id !== token.id));
    }
  };

  const totalValue = selectedTokens.reduce((sum, token) => sum + token.value, 0);

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Select Dust Tokens</span>
          <div className="flex items-center gap-2 text-sm font-normal">
            <span className="text-muted-foreground">Total value:</span>
            <span className="font-bold text-primary">${totalValue.toFixed(2)}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-4">
            <TokenFilterTabs 
              activeTab={activeTab}
              tokenCounts={tokenCounts}
            />

            <TokenSearchBar 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>

          <TabsContent value={activeTab} className="mt-2">
            <TokenList 
              filteredTokens={filteredTokens}
              selectedTokens={selectedTokens}
              onSelectToken={selectToken}
              allTokensLength={tokens.length}
              isLoading={isLoading}
            />

            <div className="mt-6 flex justify-end">
              <Button 
                onClick={() => onSubmit(selectedTokens)} 
                disabled={selectedTokens.length === 0 || isLoading}
                className="relative overflow-hidden group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <span className="relative z-10">
                  {`Aggregate ${selectedTokens.length} ${selectedTokens.length === 1 ? 'token' : 'tokens'}`}
                </span>
                <span className="absolute inset-0 bg-glow-conic opacity-0 group-hover:opacity-20 transition-opacity duration-500"></span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TokensSelection;
