import { toast } from '@/hooks/use-toast';

export type ChainType = 'ethereum' | 'starknet' | 'solana' | 'polygon' | 'stellar';

export interface TokenBalance {
  contractAddress: string;
  tokenBalance: string;
  name?: string;
  symbol?: string;
  decimals?: number;
  logo?: string;
}

// This will be populated when user provides API key
let alchemyApiKey = 'J-ANpBpYAKYWUBKWU0blxP-74N89IKjP';

export const setAlchemyApiKey = (apiKey: string) => {
  alchemyApiKey = apiKey;
  localStorage.setItem('alchemy_api_key', apiKey);
  return true;
};

export const getAlchemyApiKey = () => {
  if (!alchemyApiKey) {
    const storedKey = localStorage.getItem('alchemy_api_key');
    if (storedKey) {
      alchemyApiKey = storedKey;
      return storedKey;
    }
  }
  return alchemyApiKey;
};

// Convert chain type to Alchemy compatible network
const getNetworkFromChain = (chain: ChainType): string => {
  switch (chain) {
    case 'ethereum':
      return 'eth-sepolia'; // Changed to Sepolia testnet
    case 'polygon':
      return 'polygon-mainnet';
    case 'solana':
      return 'sol-mainnet';
    case 'starknet':
      return 'starknet-mainnet';
    case 'stellar':
      // Alchemy doesn't support Stellar directly
      return 'eth-sepolia'; // Fallback to Sepolia testnet
    default:
      return 'eth-sepolia';
  }
};

// Format token value based on decimals
export const formatTokenBalance = (balance: string, decimals: number = 18): string => {
  if (!balance) return '0';
  const value = parseInt(balance, 16) / Math.pow(10, decimals);
  return value.toFixed(value < 0.001 ? 6 : 4);
};

// Estimate USD value (this would be replaced with real price feed in production)
export const estimateTokenValue = (balance: string, decimals: number = 18): number => {
  // This is a mock estimate - in production you'd call a price API
  const tokenBalance = parseFloat(formatTokenBalance(balance, decimals));
  // Random price between $0.1 and $5 per token for dust
  return tokenBalance * (Math.random() * 4.9 + 0.1);
};

// Fetch token balances from Alchemy API
export const fetchTokenBalances = async (address: string, chain: ChainType): Promise<TokenBalance[]> => {
  const apiKey = getAlchemyApiKey();
  
  if (!apiKey) {
    toast({
      title: "API Key Missing",
      description: "Please provide an Alchemy API key to fetch real data.",
      variant: "destructive",
    });
    return [];
  }

  if (!address) return [];
  
  try {
    const network = getNetworkFromChain(chain);
    
    // For Solana
    if (chain === 'solana') {
      const url = `https://solana-mainnet.g.alchemy.com/v2/${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: 1,
          jsonrpc: '2.0',
          method: 'getTokenAccountsByOwner',
          params: [
            address,
            { programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' },
            { encoding: 'jsonParsed' }
          ]
        })
      });
      
      const data = await response.json();
      if (data.error) throw new Error(data.error.message);
      
      return (data.result?.value || []).map((item: any) => ({
        contractAddress: item.account.data.parsed.info.mint,
        tokenBalance: item.account.data.parsed.info.tokenAmount.amount,
        decimals: item.account.data.parsed.info.tokenAmount.decimals,
        // Name and symbol would need additional API calls
        name: `${item.account.data.parsed.info.mint.substring(0, 4)}...`,
        symbol: `SOL-${item.account.data.parsed.info.mint.substring(0, 4)}`
      }));
    } 
    
    // For Ethereum and EVM chains
    else if (chain === 'ethereum' || chain === 'polygon') {
      const url = `https://${network}.g.alchemy.com/v2/${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: 1,
          jsonrpc: '2.0',
          method: 'alchemy_getTokenBalances',
          params: [address]
        })
      });
      
      const data = await response.json();
      if (data.error) throw new Error(data.error.message);
      
      // Filter for non-zero balances
      const tokenBalances = data.result.tokenBalances.filter(
        (token: any) => token.tokenBalance !== '0x0'
      );
      
      // Get metadata for each token (in a real app, you'd batch these)
      const tokensWithMetadata = await Promise.all(
        tokenBalances.map(async (token: any) => {
          try {
            const metadataResponse = await fetch(url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                id: 1,
                jsonrpc: '2.0',
                method: 'alchemy_getTokenMetadata',
                params: [token.contractAddress]
              })
            });
            
            const metadata = await metadataResponse.json();
            return {
              ...token,
              name: metadata.result.name || `Token ${token.contractAddress.substring(0, 6)}`,
              symbol: metadata.result.symbol || `???`,
              decimals: metadata.result.decimals || 18,
              logo: metadata.result.logo
            };
          } catch (err) {
            return {
              ...token,
              name: `Unknown Token`,
              symbol: `???`,
              decimals: 18
            };
          }
        })
      );
      
      return tokensWithMetadata;
    }
    
    // For chains not directly supported by Alchemy
    else {
      // Mock data for chains not supported by Alchemy
      return Array(5).fill(0).map((_, i) => ({
        contractAddress: `0x${Math.random().toString(16).substr(2, 40)}`,
        tokenBalance: `0x${Math.floor(Math.random() * 1000000).toString(16)}`,
        name: `${chain.toUpperCase()} Token ${i+1}`,
        symbol: `${chain.substring(0, 3).toUpperCase()}-${i+1}`,
        decimals: 18
      }));
    }
  } catch (error) {
    console.error(`Error fetching ${chain} tokens:`, error);
    toast({
      title: `${chain.charAt(0).toUpperCase() + chain.slice(1)} API Error`,
      description: `Could not fetch token data: ${(error as Error).message}`,
      variant: "destructive",
    });
    return [];
  }
};
