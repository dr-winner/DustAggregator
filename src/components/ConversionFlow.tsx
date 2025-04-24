
import React from 'react';
import { ConversionSettings } from '@/components/ConversionSettings';
import { ProcessingCard } from '@/components/ProcessingCard';
import { SuccessCard } from '@/components/SuccessCard';
import { ChainType } from '@/utils/alchemyService';
import { TokenInfo } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface ConversionFlowProps {
  step: number;
  totalValue: number;
  selectedTokens: TokenInfo[];
  txHash: string;
  outputAsset: { symbol: string; chain: ChainType };
  outputAmount: number;
  withdrawalMethod: string;
  onConversionSettings: (output: { symbol: string; chain: ChainType }, method: string) => void;
  onProcessingComplete: (hash: string) => void;
  onBack: () => void;
  onReset: () => void;
}

export const ConversionFlow: React.FC<ConversionFlowProps> = ({
  step,
  totalValue,
  selectedTokens,
  txHash,
  outputAsset,
  outputAmount,
  withdrawalMethod,
  onConversionSettings,
  onProcessingComplete,
  onBack,
  onReset
}) => {
  // Back button at the top of each step except step 4 (success)
  const BackButton = () => {
    if (step === 4) return null;
    
    return (
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onBack}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
    );
  };

  if (step === 2) {
    return (
      <div className="max-w-xl mx-auto">
        <BackButton />
        <ConversionSettings 
          totalValue={totalValue}
          onConfirm={onConversionSettings}
          onBack={onBack}
        />
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="max-w-xl mx-auto">
        <BackButton />
        <ProcessingCard 
          onComplete={onProcessingComplete}
        />
      </div>
    );
  }

  if (step === 4) {
    return (
      <div className="max-w-xl mx-auto">
        <SuccessCard 
          details={{
            txHash,
            outputAsset,
            outputAmount,
            tokenCount: selectedTokens.length,
            totalValue,
            withdrawalMethod
          }}
          onReset={onReset}
        />
      </div>
    );
  }

  return null;
};

export default ConversionFlow;
