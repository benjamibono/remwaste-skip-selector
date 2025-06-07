import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skip } from "@/types/skip";
import { formatPrice, formatHirePeriod } from "@/lib/utils";

interface BottomBarProps {
  selectedSkip: Skip | null;
  onBack: () => void;
  onContinue: () => void;
}

export function BottomBar({
  selectedSkip,
  onBack,
  onContinue,
}: BottomBarProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center justify-between">
              {/* Back Button */}
              <Button
                variant="outline"
                onClick={onBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>

              {/* Selected Skip Summary */}
              <AnimatePresence mode="wait">
                {selectedSkip ? (
                  <motion.div
                    key="selected"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex items-center gap-4 bg-blue-50 rounded-full px-4 py-2"
                  >
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <Package className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">
                        {selectedSkip.size} Yard Skip
                      </div>
                      <div className="text-sm text-gray-600">
                        {formatPrice(
                          selectedSkip.price_before_vat,
                          selectedSkip.vat
                        )}{" "}
                        • {formatHirePeriod(selectedSkip.hire_period_days)}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="unselected"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-gray-500 text-sm"
                  >
                    Please select a skip to continue
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Continue Button */}
              <Button
                onClick={onContinue}
                disabled={!selectedSkip}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
