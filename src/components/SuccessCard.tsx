
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChainIcon } from './ChainIcon';
import { ArrowRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConversionDetails {
  txHash: string;
  outputAsset: {
    symbol: string;
    chain: 'ethereum' | 'starknet' | 'solana' | 'polygon' | 'stellar';
  };
  outputAmount: number;
  tokenCount: number;
  totalValue: number;
  withdrawalMethod: string;
}

interface SuccessCardProps {
  details: ConversionDetails;
  onReset: () => void;
  className?: string;
}

export const SuccessCard: React.FC<SuccessCardProps> = ({
  details,
  onReset,
  className
}) => {
  return (
    <Card className={cn('w-full max-w-md mx-auto overflow-hidden', className)}>
      <div className="bg-gradient-to-r from-accent to-accent/70 h-2" />
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
            <Check className="h-8 w-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold mb-1">Conversion Successful!</h2>
          <p className="text-muted-foreground">
            Your dust tokens have been successfully converted and {details.withdrawalMethod === 'withdraw' ? 'sent to your wallet' : 'donated'}
          </p>
        </div>

        <div className="bg-secondary/50 rounded-lg p-4 mb-6 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Transaction Hash</span>
            <div className="flex items-center">
              <span className="text-sm font-mono bg-secondary p-1 rounded">
                {`${details.txHash.substring(0, 6)}...${details.txHash.substring(details.txHash.length - 4)}`}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Dust Tokens Converted</span>
            <span className="font-medium">{details.tokenCount} tokens</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Value</span>
            <span className="font-medium">${details.totalValue.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Converted To</span>
            <div className="flex items-center gap-2">
              <ChainIcon chain={details.outputAsset.chain} size="sm" />
              <span className="font-medium">
                {details.outputAmount.toFixed(6)} {details.outputAsset.symbol}
              </span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{details.withdrawalMethod === 'withdraw' ? 'Withdrawal Method' : 'Donation Status'}</span>
            <span className="font-medium">
              {details.withdrawalMethod === 'withdraw' ? 'To Connected Wallet' : 'Completed'}
            </span>
          </div>
        </div>

        <div className="flex justify-center">
          <Button onClick={onReset} className="w-full relative overflow-hidden group">
            <span className="relative z-10 flex items-center">
              Convert More Dust
              <ArrowRight className="ml-2 h-4 w-4" />
            </span>
            <span className="absolute inset-0 bg-glow-conic opacity-0 group-hover:opacity-20 transition-opacity duration-500"></span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuccessCard;
