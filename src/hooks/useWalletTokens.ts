
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { ChainType, fetchTokenBalances, estimateTokenValue, getAlchemyApiKey } from '@/utils/alchemyService';
import { TokenInfo } from '@/types';
import useWalletConnection, { WalletInfo } from '@/hooks/useWalletConnection';

export const useWalletTokens = () => {
  const [allTokens, setAllTokens] = useState<TokenInfo[]>([]);
  const [selectedTokens, setSelectedTokens] = useState<TokenInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const { toast } = useToast();
  const { 
    connectedWallets, 
    connectWallet, 
    disconnectWallet,
    isConnected 
  } = useWalletConnection();

  const handleConnectWallet = async (wallet: WalletInfo) => {
    try {
      const connectedWallet = await connectWallet(wallet);
      
      // If we have an API key, fetch tokens for this wallet
      if (getAlchemyApiKey() && connectedWallet.address) {
        fetchWalletTokens(connectedWallet);
      }
      
      return connectedWallet;
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      throw error;
    }
  };
  
  const fetchWalletTokens = async (wallet: WalletInfo) => {
    if (!wallet.address) return;
    
    setIsLoading(true);
    
    try {
      const tokens = await fetchTokenBalances(wallet.address, wallet.chain);
      
      // Transform token data to match our interface
      const processedTokens: TokenInfo[] = tokens.map((token, idx) => ({
        ...token,
        id: `${wallet.chain}-${token.contractAddress}-${idx}`,
        chain: wallet.chain,
        value: estimateTokenValue(token.tokenBalance, token.decimals)
      }));
      
      // Filter out tokens with very low value (optional)
      const dustTokens = processedTokens.filter(token => token.value > 0.01 && token.value < 5);
      
      // Update all tokens
      setAllTokens(prev => {
        // Remove existing tokens from this wallet/chain
        const filtered = prev.filter(t => !(t.chain === wallet.chain && 
          t.contractAddress === tokens[0].contractAddress));
        return [...filtered, ...dustTokens];
      });
    } catch (error) {
      console.error(`Error fetching tokens for ${wallet.name}:`, error);
      toast({
        title: "Token Fetch Failed",
        description: `Could not load tokens for ${wallet.name}.`,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchAllTokens = async () => {
    if (connectedWallets.length === 0) return;
    
    setIsLoading(true);
    setAllTokens([]);
    
    try {
      for (const wallet of connectedWallets) {
        if (wallet.address) {
          await fetchWalletTokens(wallet);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnectWallet = (wallet: WalletInfo) => {
    disconnectWallet(wallet);
    
    // Remove tokens from this wallet
    setAllTokens(prev => prev.filter(token => token.chain !== wallet.chain));
    
    // Also remove from selected tokens if any
    setSelectedTokens(prev => prev.filter(token => token.chain !== wallet.chain));
  };

  const handleTokensSelect = (tokens: TokenInfo[]) => {
    setSelectedTokens(tokens);
  };

  return {
    allTokens,
    selectedTokens,
    setSelectedTokens,
    isLoading,
    connectedWallets,
    handleConnectWallet,
    handleDisconnectWallet,
    fetchAllTokens,
    handleTokensSelect,
    isConnected
  };
};

export default useWalletTokens;
