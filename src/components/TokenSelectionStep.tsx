
import React from 'react';
import { TokenInfo } from '@/types';
import { TokensSelection } from '@/components/TokensSelection';
import { Button } from '@/components/ui/button';
import { WalletInfo } from '@/hooks/useWalletConnection';
import { ChainIcon } from '@/components/ChainIcon';
import { ArrowLeft } from 'lucide-react';

interface TokenSelectionStepProps {
  connectedWallets: WalletInfo[];
  tokens: TokenInfo[];
  isLoading: boolean;
  onRefresh: () => void;
  onSubmit: (tokens: TokenInfo[]) => void;
  onBack: () => void;
}

export const TokenSelectionStep: React.FC<TokenSelectionStepProps> = ({
  connectedWallets,
  tokens,
  isLoading,
  onRefresh,
  onSubmit,
  onBack,
}) => {
  return (
    <div className="space-y-6">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onBack}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Wallet Selection
      </Button>
      
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Select Dust Tokens</h2>
        <div className="flex flex-wrap gap-2">
          {connectedWallets.map((wallet, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-secondary/50 px-3 py-1 rounded-full">
              <ChainIcon chain={wallet.chain} size="sm" />
              <span className="text-sm">{wallet.chain.charAt(0).toUpperCase() + wallet.chain.slice(1)}</span>
            </div>
          ))}
        </div>
      </div>
      
      <TokensSelection
        tokens={tokens}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
      
      {/* Refresh button */}
      <div className="flex justify-center mt-4">
        <Button 
          variant="outline"
          onClick={onRefresh}
          disabled={isLoading || connectedWallets.length === 0}
        >
          {isLoading ? "Loading..." : "Refresh Token Data"}
        </Button>
      </div>
    </div>
  );
};

export default TokenSelectionStep;
