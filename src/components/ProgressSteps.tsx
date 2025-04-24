
import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  title: string;
  description: string;
}

interface ProgressStepsProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export const ProgressSteps: React.FC<ProgressStepsProps> = ({
  steps,
  currentStep,
  className
}) => {
  return (
    <div className={cn('flex justify-between w-full', className)}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isLast = index === steps.length - 1;

        return (
          <div
            key={index}
            className={cn(
              'flex flex-col items-center relative flex-1',
              isLast ? 'flex-grow-0' : ''
            )}
          >
            <div className="flex items-center">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10',
                  isCompleted
                    ? 'bg-primary border-primary text-primary-foreground'
                    : isCurrent
                    ? 'border-primary/50 bg-background text-primary'
                    : 'border-muted-foreground/30 bg-background text-muted-foreground'
                )}
              >
                {isCompleted ? <Check size={16} /> : <span>{index + 1}</span>}
              </div>
              {!isLast && (
                <div
                  className={cn(
                    'h-[2px] w-full transition-all duration-300',
                    isCompleted ? 'bg-primary' : 'bg-muted-foreground/30'
                  )}
                />
              )}
            </div>
            <div className="text-center mt-2">
              <p className={cn(
                'text-sm font-medium',
                isCurrent
                  ? 'text-primary'
                  : isCompleted
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              )}>
                {step.title}
              </p>
              <p className="text-xs text-muted-foreground mt-1 hidden md:block">
                {step.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProgressSteps;
