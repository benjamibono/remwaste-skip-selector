import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Package,
  Calendar,
  Tag,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatHirePeriod } from "@/lib/utils";
import { Skip } from "@/types/skip";

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
  // Determine skip badges - only one popular skip (6-yard) and best value (4-yard)
  const isPopular = selectedSkip?.size === 6; // Only 6-yard is popular
  const isBestValue = selectedSkip?.size === 4; // 4-yard is best value

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-gray-200 dark:border-slate-800 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Back Button - Hidden on mobile when skip is selected */}
          <Button
            onClick={onBack}
            variant="outline"
            size="lg"
            className={`w-full sm:w-auto bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 px-6 sm:px-8 ${
              selectedSkip ? "hidden sm:flex" : "flex"
            }`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Back</span>
            <span className="sm:hidden">Back</span>
          </Button>

          {/* Skip Summary - Show if selected */}
          {selectedSkip && (
            <div className="hidden sm:flex items-center gap-4 flex-1 mx-4">
              <div className="hidden sm:flex w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl items-center justify-center shadow-lg">
                <Package className="w-6 h-6" />
              </div>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                      {selectedSkip.size} Yard Skip
                    </h3>
                    {isPopular && (
                      <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-2 py-0.5">
                        Popular
                      </Badge>
                    )}
                    {isBestValue && (
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-0.5">
                        <DollarSign className="w-3 h-3 mr-1" />
                        Best Value
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-600 dark:text-slate-300">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatHirePeriod(selectedSkip.hire_period_days)}
                    </span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      {formatPrice(
                        selectedSkip.price_before_vat,
                        selectedSkip.vat
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Empty Space when no skip selected or selected skip info on mobile */}
          {!selectedSkip ? (
            <div className="flex-1 mx-4 text-center">
              <p className="text-sm text-gray-500 dark:text-slate-400">
                Select a skip to continue
              </p>
            </div>
          ) : (
            /* Show skip info only on mobile when selected */
            <div className="flex sm:hidden items-center gap-4 flex-1 mx-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl flex items-center justify-center shadow-lg">
                <Package className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                    {selectedSkip.size} Yard Skip
                  </h3>
                  {isPopular && (
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-2 py-0.5">
                      Popular
                    </Badge>
                  )}
                  {isBestValue && (
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-0.5">
                      <DollarSign className="w-3 h-3 mr-1" />
                      Best Value
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-slate-300">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatHirePeriod(selectedSkip.hire_period_days)}
                  </span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {formatPrice(
                      selectedSkip.price_before_vat,
                      selectedSkip.vat
                    )}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Continue Button - Only show when skip is selected on mobile */}
          {selectedSkip && (
            <Button
              onClick={onContinue}
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 px-6 sm:px-8"
            >
              <span className="hidden sm:inline">Continue</span>
              <span className="sm:hidden">Next</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}

          {/* Desktop Continue Button - Always visible on desktop */}
          {!selectedSkip && (
            <Button
              onClick={onContinue}
              size="lg"
              disabled={true}
              className="hidden sm:flex bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 px-6 sm:px-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
