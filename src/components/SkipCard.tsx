import React from "react";
import { motion } from "framer-motion";
import { Check, Truck, Weight, Calendar, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, formatPrice, formatHirePeriod } from "@/lib/utils";
import { Skip } from "@/types/skip";

interface SkipCardProps {
  skip: Skip;
  isSelected: boolean;
  onSelect: (skip: Skip) => void;
  index: number;
}

export function SkipCard({ skip, isSelected, onSelect, index }: SkipCardProps) {
  const totalPrice = formatPrice(skip.price_before_vat, skip.vat);
  const hirePeriod = formatHirePeriod(skip.hire_period_days);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className={cn(
        "relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 cursor-pointer group overflow-hidden",
        isSelected
          ? "border-blue-500 shadow-2xl scale-[1.02]"
          : "border-gray-200 hover:border-blue-300 hover:-translate-y-1 hover:shadow-xl"
      )}
      onClick={() => onSelect(skip)}
    >
      {/* Background gradient overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 transition-opacity duration-300",
          isSelected && "opacity-100"
        )}
      />

      {/* Skip size badge */}
      <div className="absolute top-4 right-4 z-10">
        <Badge className="bg-blue-600 text-white font-bold px-3 py-1 text-sm">
          {skip.size} Yards
        </Badge>
      </div>

      {/* Selection indicator */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-4 left-4 z-10 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center"
        >
          <Check className="w-5 h-5" />
        </motion.div>
      )}

      <div className="relative p-6">
        {/* Skip image placeholder with modern design */}
        <div className="relative h-48 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-xl mb-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="text-center">
              <div className="w-16 h-12 mx-auto mb-2 bg-yellow-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {skip.size}
                </span>
              </div>
              <div className="text-white text-sm font-medium">
                REMWaste Skip
              </div>
            </div>
          </div>
        </div>

        {/* Skip details */}
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {skip.size} Yard Skip
            </h3>
            <p className="text-gray-600 flex items-center justify-center gap-1">
              <Calendar className="w-4 h-4" />
              {hirePeriod}
            </p>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2 justify-center">
            {skip.allowed_on_road && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Truck className="w-3 h-3" />
                Road Friendly
              </Badge>
            )}
            {skip.allows_heavy_waste && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Weight className="w-3 h-3" />
                Heavy Waste
              </Badge>
            )}
          </div>

          {/* Price */}
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {totalPrice}
            </div>
            <div className="text-sm text-gray-500">
              Including {skip.vat}% VAT
            </div>
          </div>

          {/* Additional pricing info */}
          {(skip.transport_cost || skip.per_tonne_cost) && (
            <div className="bg-gray-50 rounded-lg p-3 space-y-1">
              {skip.transport_cost && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Transport:</span>
                  <span className="font-medium">£{skip.transport_cost}</span>
                </div>
              )}
              {skip.per_tonne_cost && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Per tonne:</span>
                  <span className="font-medium">£{skip.per_tonne_cost}</span>
                </div>
              )}
            </div>
          )}

          {/* Select button */}
          <Button
            className={cn(
              "w-full font-semibold transition-all duration-200",
              isSelected
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-900 hover:bg-gray-800"
            )}
            size="lg"
          >
            {isSelected ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Selected
              </>
            ) : (
              "Select This Skip"
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
