
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { ChainType } from '@/utils/alchemyService';

export interface WalletInfo {
  name: string;
  chain: ChainType;
  address?: string;
  icon?: string;
}

export const useWalletConnection = () => {
  const [connectedWallets, setConnectedWallets] = useState<WalletInfo[]>([]);
  const { toast } = useToast();

  const connectWallet = async (wallet: WalletInfo): Promise<WalletInfo> => {
    // Check if already connected
    if (connectedWallets.some(w => w.name === wallet.name)) {
      return wallet;
    }
    
    try {
      // This would be replaced with actual wallet connection logic
      // For now, we'll prompt the user for their address
      let address = prompt(`Enter your ${wallet.name} wallet address:`);
      
      // Basic validation - should be enhanced in production
      if (!address || address.trim() === '') {
        toast({
          title: "Invalid Address",
          description: "Please provide a valid wallet address",
          variant: "destructive",
        });
        throw new Error("Invalid address");
      }
      
      // Add some basic address format validation
      if (wallet.chain === 'ethereum' || wallet.chain === 'polygon' || wallet.chain === 'starknet') {
        if (!address.startsWith('0x')) {
          address = '0x' + address;
        }
      }
      
      const walletWithAddress: WalletInfo = {
        ...wallet,
        address: address.trim()
      };
      
      setConnectedWallets(prev => [...prev, walletWithAddress]);
      
      toast({
        title: "Wallet Connected",
        description: `${wallet.name} connected successfully.`,
        variant: "default",
      });
      
      return walletWithAddress;
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: `Could not connect to ${wallet.name}. Please try again.`,
        variant: "destructive",
      });
      throw error;
    }
  };

  const disconnectWallet = (wallet: WalletInfo) => {
    setConnectedWallets(prev => prev.filter(w => w.name !== wallet.name));
    
    toast({
      title: "Wallet Disconnected",
      description: `${wallet.name} has been disconnected.`,
    });
  };

  const disconnectAll = () => {
    setConnectedWallets([]);
  };

  return {
    connectedWallets,
    connectWallet,
    disconnectWallet,
    disconnectAll,
    isConnected: (wallet: WalletInfo) => connectedWallets.some(w => w.name === wallet.name)
  };
};

export default useWalletConnection;
