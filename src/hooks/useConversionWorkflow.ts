
import { useState, useEffect } from 'react';
import { ChainType } from '@/utils/alchemyService';
import { TokenInfo } from '@/types';

export const useConversionWorkflow = (connectedWallets: any[]) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [showGetStarted, setShowGetStarted] = useState<boolean>(true);
  const [txHash, setTxHash] = useState<string>('');
  const [outputAsset, setOutputAsset] = useState<{ symbol: string; chain: ChainType }>({ symbol: 'USDC', chain: 'stellar' });
  const [withdrawalMethod, setWithdrawalMethod] = useState<string>('withdraw');

  // Calculate conversion rate (approximation)
  const conversionRate = 0.95; // 5% slippage/fee

  const handleGetStarted = () => {
    setShowGetStarted(false);
    setCurrentStep(0);
  };

  const handleConversionSettings = (output: { symbol: string; chain: ChainType }, method: string) => {
    setOutputAsset(output);
    setWithdrawalMethod(method);
    setCurrentStep(3);
  };

  const handleProcessingComplete = (hash: string) => {
    setTxHash(hash);
    setCurrentStep(4);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setTxHash('');
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  useEffect(() => {
    // Auto-progress from step 0 to step 1 if at least one wallet is connected
    if (currentStep === 0 && connectedWallets.length > 0) {
      setCurrentStep(1);
    }
  }, [connectedWallets, currentStep]);

  return {
    currentStep,
    showGetStarted,
    txHash,
    outputAsset,
    withdrawalMethod,
    conversionRate,
    handleGetStarted,
    handleConversionSettings,
    handleProcessingComplete,
    handleReset,
    goToStep
  };
};

export default useConversionWorkflow;
