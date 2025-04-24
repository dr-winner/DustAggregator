
import React from 'react';
import { WalletInfo } from '@/hooks/useWalletConnection';
import { WalletCard } from '@/components/WalletCard';
import { ChainType } from '@/utils/alchemyService';
import { ChainIcon } from '@/components/ChainIcon';

interface WalletConnectionStepProps {
  chains: {name: string; type: ChainType}[];
  connectedWallets: WalletInfo[];
  onConnect: (wallet: WalletInfo) => Promise<WalletInfo>;
  onDisconnect: (wallet: WalletInfo) => void;
}

export const WalletConnectionStep: React.FC<WalletConnectionStepProps> = ({
  chains,
  connectedWallets,
  onConnect,
  onDisconnect,
}) => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-center mb-6">Connect Your Wallets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chains.map((chain, idx) => (
          <WalletCard
            key={idx}
            wallet={{ name: chain.name, chain: chain.type }}
            onConnect={onConnect}
            onDisconnect={onDisconnect}
            isConnected={connectedWallets.some(w => w.chain === chain.type)}
          />
        ))}
      </div>
      
      {connectedWallets.length > 0 && (
        <div className="flex justify-center mt-8">
          <div className="bg-secondary/30 backdrop-blur-sm p-4 rounded-xl border border-secondary/50 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span>
              {connectedWallets.length} {connectedWallets.length === 1 ? 'wallet' : 'wallets'} connected
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletConnectionStep;
