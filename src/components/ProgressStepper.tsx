import React from "react";
import {
  MapPin,
  Trash2,
  Package,
  Shield,
  Calendar,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  title: string;
  shortTitle: string; // Always used for mobile
  icon: React.ReactNode;
  completed: boolean;
  current: boolean;
}

interface ProgressStepperProps {
  currentStep: number;
}

export function ProgressStepper({ currentStep }: ProgressStepperProps) {
  const steps: Step[] = [
    {
      id: "location",
      title: "Location",
      shortTitle: "Location",
      icon: <MapPin className="w-4 h-4" />,
      completed: currentStep > 1,
      current: currentStep === 1,
    },
    {
      id: "waste-type",
      title: "Waste",
      shortTitle: "Waste",
      icon: <Trash2 className="w-4 h-4" />,
      completed: currentStep > 2,
      current: currentStep === 2,
    },
    {
      id: "skip-selection",
      title: "Skip Selection",
      shortTitle: "Skip",
      icon: <Package className="w-4 h-4" />,
      completed: currentStep > 3,
      current: currentStep === 3,
    },
    {
      id: "permit-check",
      title: "Permit",
      shortTitle: "Permit",
      icon: <Shield className="w-4 h-4" />,
      completed: currentStep > 4,
      current: currentStep === 4,
    },
    {
      id: "date-selection",
      title: "Date",
      shortTitle: "Date",
      icon: <Calendar className="w-4 h-4" />,
      completed: currentStep > 5,
      current: currentStep === 5,
    },
    {
      id: "payment",
      title: "Payment",
      shortTitle: "Payment",
      icon: <CreditCard className="w-4 h-4" />,
      completed: currentStep > 6,
      current: currentStep === 6,
    },
  ];

  return (
    <div className="w-full bg-white dark:bg-slate-950/95 shadow-sm border-b dark:border-slate-800 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-3 sm:py-6">
          <nav aria-label="Progress">
            {/* Mobile Progress Bar */}
            <div className="flex sm:hidden items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div
                  className={cn(
                    "w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200",
                    steps[currentStep - 1]?.completed
                      ? "bg-blue-600 dark:bg-blue-500 text-white"
                      : steps[currentStep - 1]?.current
                      ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 ring-2 ring-blue-500 dark:ring-blue-400"
                      : "bg-gray-100 dark:bg-slate-700 text-gray-400 dark:text-slate-500"
                  )}
                >
                  {steps[currentStep - 1]?.icon}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-slate-100">
                    Step {currentStep} of {steps.length}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-slate-400">
                    {steps[currentStep - 1]?.title}
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500 dark:text-slate-400">
                {Math.round((currentStep / steps.length) * 100)}%
              </div>
            </div>

            {/* Mobile Progress Bar */}
            <div className="sm:hidden">
              <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${(currentStep / steps.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Desktop Stepper */}
            <ol className="hidden sm:flex items-center justify-between space-x-2">
              {steps.map((step, stepIdx) => (
                <li key={step.id} className="relative flex-1 min-w-0">
                  {stepIdx !== steps.length - 1 && (
                    <div
                      className={cn(
                        "absolute top-4 h-0.5 transition-all duration-300",
                        step.completed
                          ? "bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-400"
                          : "bg-gray-200 dark:bg-slate-700"
                      )}
                      style={{
                        left: "calc(50% + 16px)",
                        width: "calc(100% - 32px)",
                      }}
                      aria-hidden="true"
                    />
                  )}
                  <div className="relative flex flex-col items-center group px-1">
                    <div
                      className={cn(
                        "w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 mb-2",
                        step.completed
                          ? "bg-blue-600 dark:bg-blue-500 text-white shadow-md"
                          : step.current
                          ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 ring-2 ring-blue-500 dark:ring-blue-400 shadow-lg animate-glow"
                          : "bg-gray-100 dark:bg-slate-700 text-gray-400 dark:text-slate-500"
                      )}
                    >
                      {step.icon}
                    </div>
                    <span
                      className={cn(
                        "text-xs font-medium text-center whitespace-nowrap transition-all duration-200 px-1",
                        step.completed || step.current
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-500 dark:text-slate-400"
                      )}
                    >
                      {step.shortTitle}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
}
