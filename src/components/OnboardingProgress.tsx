import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export function OnboardingProgress({ currentStep, totalSteps, steps }: OnboardingProgressProps) {
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={cn(
                "w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-all duration-300",
                index < currentStep
                  ? "bg-brand border-brand text-brand-foreground"
                  : index === currentStep
                  ? "bg-brand border-brand text-brand-foreground animate-pulse"
                  : "bg-background border-border text-muted-foreground"
              )}
            >
              {index < currentStep ? (
                <Check className="w-4 h-4" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <span className={cn(
              "text-xs mt-2 text-center max-w-[80px]",
              index <= currentStep ? "text-foreground" : "text-muted-foreground"
            )}>
              {step}
            </span>
          </div>
        ))}
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div
          className="bg-gradient-to-r from-brand to-brand/80 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${((currentStep) / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
}