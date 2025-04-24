
import { ChainType } from '@/utils/alchemyService';

// Centralized TokenInfo interface to be used throughout the app
export interface TokenInfo {
  id: string;
  name?: string;
  symbol?: string;
  contractAddress: string;
  tokenBalance?: string;
  balance?: string;
  decimals?: number;
  logo?: string;
  value: number;
  chain: ChainType;
}
