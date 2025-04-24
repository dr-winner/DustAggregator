
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProcessStep {
  name: string;
  description: string;
  loading?: boolean;
  completed?: boolean;
  error?: boolean;
}

interface ProcessingCardProps {
  onComplete: (txHash: string) => void;
  className?: string;
}

export const ProcessingCard: React.FC<ProcessingCardProps> = ({ 
  onComplete,
  className 
}) => {
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [steps, setSteps] = useState<ProcessStep[]>([
    {
      name: "Preparing Tokens",
      description: "Verifying token balances and preparing transaction",
      loading: true
    },
    {
      name: "Smart Contract Interaction",
      description: "Sending tokens to the aggregation smart contract",
    },
    {
      name: "Performing Conversion",
      description: "Converting dust tokens to selected asset",
    },
    {
      name: "Finalizing Transaction",
      description: "Sending converted tokens to destination",
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(oldProgress => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        const newProgress = Math.min(oldProgress + 2, 100);
        return newProgress;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const stepProgress = progress / 25; // 4 steps, 25% each
    const currentStep = Math.min(Math.floor(stepProgress), 3);

    if (currentStep !== currentStepIndex) {
      setSteps(prevSteps => prevSteps.map((step, index) => {
        if (index === currentStepIndex) {
          return { ...step, loading: false, completed: true };
        } 
        if (index === currentStep) {
          return { ...step, loading: true };
        }
        return step;
      }));
      setCurrentStepIndex(currentStep);
    }

    if (progress >= 100) {
      setSteps(prevSteps => 
        prevSteps.map((step, index) => 
          index === 3 ? { ...step, loading: false, completed: true } : step
        )
      );
      setTimeout(() => {
        // Generate a random transaction hash
        const txHash = '0x' + Array.from({length: 64}, () => 
          Math.floor(Math.random() * 16).toString(16)
        ).join('');
        onComplete(txHash);
      }, 1000);
    }
  }, [progress, currentStepIndex, onComplete]);

  return (
    <Card className={cn('w-full', className)}>
      <CardContent className="pt-6 space-y-6">
        <div className="text-center mb-2">
          <h2 className="text-xl font-bold mb-1">Processing Conversion</h2>
          <p className="text-sm text-muted-foreground">
            Please wait while we process your dust token conversion
          </p>
        </div>

        <Progress value={progress} className="h-2" />
        <p className="text-center text-sm text-muted-foreground">{progress}% complete</p>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={cn(
                "flex items-start gap-4 p-3 rounded-lg transition-colors", 
                step.completed ? "bg-green-500/10 text-green-500" : 
                  step.loading ? "bg-secondary text-foreground" : 
                    "text-muted-foreground"
              )}
            >
              <div className="mt-0.5">
                {step.completed ? (
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                ) : step.loading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-muted-foreground/30" />
                )}
              </div>
              <div>
                <p className="font-medium">{step.name}</p>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProcessingCard;
