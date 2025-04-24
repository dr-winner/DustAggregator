
import { ChainType } from '@/utils/alchemyService';

// Define available blockchain networks
export const chains: {name: string; type: ChainType}[] = [
  { name: 'Ethereum', type: 'ethereum' },
  { name: 'Starknet', type: 'starknet' },
  { name: 'Solana', type: 'solana' },
  { name: 'Polygon', type: 'polygon' },
  { name: 'Stellar', type: 'stellar' },
];

// Steps for progress tracking
export const workflowSteps = [
  { title: 'Connect Wallets', description: 'Connect your blockchain wallets' },
  { title: 'Select Tokens', description: 'Choose dust tokens to convert' },
  { title: 'Configure', description: 'Select conversion settings' },
  { title: 'Process', description: 'Convert and receive tokens' },
];
