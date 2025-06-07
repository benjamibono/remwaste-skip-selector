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
      id: "postcode",
      title: "Postcode",
      icon: <MapPin className="w-4 h-4" />,
      completed: currentStep > 1,
      current: currentStep === 1,
    },
    {
      id: "waste-type",
      title: "Waste Type",
      icon: <Trash2 className="w-4 h-4" />,
      completed: currentStep > 2,
      current: currentStep === 2,
    },
    {
      id: "select-skip",
      title: "Select Skip",
      icon: <Package className="w-4 h-4" />,
      completed: currentStep > 3,
      current: currentStep === 3,
    },
    {
      id: "permit-check",
      title: "Permit Check",
      icon: <Shield className="w-4 h-4" />,
      completed: currentStep > 4,
      current: currentStep === 4,
    },
    {
      id: "choose-date",
      title: "Choose Date",
      icon: <Calendar className="w-4 h-4" />,
      completed: currentStep > 5,
      current: currentStep === 5,
    },
    {
      id: "payment",
      title: "Payment",
      icon: <CreditCard className="w-4 h-4" />,
      completed: currentStep > 6,
      current: currentStep === 6,
    },
  ];

  return (
    <div className="w-full bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <nav aria-label="Progress">
            <ol className="flex items-center justify-between">
              {steps.map((step, stepIdx) => (
                <li key={step.id} className="relative flex-1">
                  {stepIdx !== steps.length - 1 && (
                    <div
                      className={cn(
                        "absolute top-4 right-0 w-full h-0.5 transform translate-x-1/2",
                        step.completed ? "bg-blue-600" : "bg-gray-200"
                      )}
                      aria-hidden="true"
                    />
                  )}
                  <div className="relative flex flex-col items-center group">
                    <span
                      className={cn(
                        "w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200",
                        step.completed
                          ? "bg-blue-600 text-white"
                          : step.current
                          ? "bg-blue-100 text-blue-600 ring-4 ring-blue-50"
                          : "bg-gray-100 text-gray-400"
                      )}
                    >
                      {step.icon}
                    </span>
                    <span
                      className={cn(
                        "mt-2 text-xs font-medium text-center max-w-20",
                        step.completed || step.current
                          ? "text-blue-600"
                          : "text-gray-500"
                      )}
                    >
                      {step.title}
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
