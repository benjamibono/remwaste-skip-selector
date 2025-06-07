import React, { useState } from "react";
import { ProgressStepper } from "@/components/ProgressStepper";
import { SkipSelector } from "@/components/SkipSelector";
import { BottomBar } from "@/components/BottomBar";
import { Skip } from "@/types/skip";
import skipsData from "../../data.json";

export function SkipSelectionPage() {
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);
  const skips = skipsData as Skip[];

  const handleSelectSkip = (skip: Skip) => {
    setSelectedSkip(skip);
  };

  const handleBack = () => {
    // Navigate to previous step
    console.log("Going back to waste type selection");
  };

  const handleContinue = () => {
    if (selectedSkip) {
      // Navigate to next step with selected skip
      console.log("Continuing to permit check with skip:", selectedSkip);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      <ProgressStepper currentStep={3} />
      <div className="pb-28">
        {/* Add padding for bottom bar */}
        <SkipSelector
          skips={skips}
          selectedSkip={selectedSkip}
          onSelectSkip={handleSelectSkip}
        />
      </div>
      <BottomBar
        selectedSkip={selectedSkip}
        onBack={handleBack}
        onContinue={handleContinue}
      />
    </div>
  );
}
