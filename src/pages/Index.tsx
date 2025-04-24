
import React, { useState } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { ProgressSteps } from '@/components/ProgressSteps';
import DustParticles from '@/components/DustParticles';
import { ApiKeyModal } from '@/components/ApiKeyModal';
import { Button } from '@/components/ui/button';
import { Key } from 'lucide-react';
import { getAlchemyApiKey } from '@/utils/alchemyService';
import { WalletConnectionStep } from '@/components/WalletConnectionStep';
import { TokenSelectionStep } from '@/components/TokenSelectionStep';
import { ConversionFlow } from '@/components/ConversionFlow';
import useWalletTokens from '@/hooks/useWalletTokens';
import useConversionWorkflow from '@/hooks/useConversionWorkflow';
import { chains, workflowSteps } from '@/constants/dustAggregator';

const Index: React.FC = () => {
  const [showApiKeyModal, setShowApiKeyModal] = useState<boolean>(false);
  
  const {
    allTokens,
    selectedTokens,
    isLoading,
    connectedWallets,
    handleConnectWallet,
    handleDisconnectWallet,
    fetchAllTokens,
    handleTokensSelect
  } = useWalletTokens();

  const {
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
  } = useConversionWorkflow(connectedWallets);

  // Calculate total value of selected tokens
  const totalValue = selectedTokens.reduce((sum, token) => sum + token.value, 0);
  
  // Calculate output amount based on conversion rate
  const outputAmount = totalValue * conversionRate;

  const handleApiKeySubmit = () => {
    // Refresh token data if we have connected wallets
    if (connectedWallets.length > 0) {
      fetchAllTokens();
    }
  };

  const handleTokenSelection = (tokens) => {
    handleTokensSelect(tokens);
    goToStep(2);
  };

  const handleBackFromTokenSelection = () => {
    goToStep(0);
  };

  const handleBackFromConversion = () => {
    goToStep(1);
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* API Key Modal */}
      <ApiKeyModal 
        open={showApiKeyModal} 
        onOpenChange={setShowApiKeyModal} 
        onKeySubmit={handleApiKeySubmit}
      />
      
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <DustParticles count={20} className="opacity-20" />
      </div>
      
      {/* Content */}
      {showGetStarted ? (
        <HeroSection onGetStarted={handleGetStarted} />
      ) : (
        <div className="container mx-auto max-w-5xl px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-center">Dust Aggregator</h1>
            
            {/* API Key Button */}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowApiKeyModal(true)}
              className="bg-black/20 border-white/10 text-white/80"
            >
              <Key className="h-4 w-4 mr-2" />
              {getAlchemyApiKey() ? "Change API Key" : "Set API Key"}
            </Button>
          </div>
          
          {/* Progress Steps */}
          <ProgressSteps 
            steps={workflowSteps} 
            currentStep={currentStep} 
            className="mb-12" 
          />
          
          {/* Step 0: Connect Wallets */}
          {currentStep === 0 && (
            <WalletConnectionStep 
              chains={chains}
              connectedWallets={connectedWallets}
              onConnect={handleConnectWallet}
              onDisconnect={handleDisconnectWallet}
            />
          )}
          
          {/* Step 1: Select Tokens */}
          {currentStep === 1 && (
            <TokenSelectionStep 
              connectedWallets={connectedWallets}
              tokens={allTokens}
              isLoading={isLoading}
              onRefresh={fetchAllTokens}
              onSubmit={handleTokenSelection}
              onBack={handleBackFromTokenSelection}
            />
          )}
          
          {/* Steps 2-4: Conversion Flow */}
          {currentStep >= 2 && (
            <ConversionFlow 
              step={currentStep}
              totalValue={totalValue}
              selectedTokens={selectedTokens}
              txHash={txHash}
              outputAsset={outputAsset}
              outputAmount={outputAmount}
              withdrawalMethod={withdrawalMethod}
              onConversionSettings={handleConversionSettings}
              onProcessingComplete={handleProcessingComplete}
              onBack={handleBackFromConversion}
              onReset={handleReset}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Index;
