import React from "react";
import { motion } from "framer-motion";
import {
  Check,
  Truck,
  Weight,
  Calendar,
  Info,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  cn,
  formatPrice,
  formatHirePeriod,
  getSkipImageUrl,
} from "@/lib/utils";
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
  const skipImageUrl = getSkipImageUrl(skip.size);

  // Determine skip badges - only one popular skip (6-yard) and best value (4-yard)
  const isPopular = skip.size === 6; // Only 6-yard is popular
  const isBestValue = skip.size === 4; // 4-yard is best value

  // Calculate cubic meters (1 cubic yard = 0.764555 cubic meters)
  const cubicMeters = (skip.size * 0.764555).toFixed(1);

  // Get ideal use case based on skip size and features
  const getIdealUseCase = (skip: Skip) => {
    const size = skip.size;
    const roadFriendly = skip.allowed_on_road;
    const heavyWaste = skip.allows_heavy_waste;

    if (size <= 2) {
      return "Perfect for small home cleanouts, bathroom renovations, or garden waste disposal";
    } else if (size <= 4) {
      return roadFriendly
        ? "Ideal for kitchen renovations, small office clearances, and moderate DIY projects"
        : "Great for garage clearouts, small construction projects, and household decluttering";
    } else if (size <= 6) {
      return roadFriendly
        ? "Perfect for house renovations, landscaping projects, and medium construction work"
        : "Ideal for larger home improvements, garden makeovers, and commercial cleanouts";
    } else if (size <= 8) {
      return heavyWaste
        ? "Excellent for construction sites, heavy materials, and large-scale renovations"
        : "Great for major house clearances, office relocations, and substantial DIY projects";
    } else {
      return heavyWaste
        ? "Perfect for commercial construction, industrial waste, and major demolition projects"
        : "Ideal for large commercial cleanouts, major renovations, and substantial construction waste";
    }
  };

  // Estimate weight capacity based on skip size (rough estimate)
  const getWeightCapacity = (size: number) => {
    if (size <= 2) return "1-2";
    if (size <= 4) return "2-4";
    if (size <= 6) return "4-6";
    if (size <= 8) return "6-8";
    return "8-12";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
      whileHover={{
        y: -8,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      className={cn(
        "group relative card-modern rounded-3xl shadow-lg hover:shadow-2xl border-2 transition-all duration-300 cursor-pointer overflow-hidden",
        isSelected
          ? "border-blue-500 dark:border-blue-400 shadow-2xl shadow-blue-500/25 scale-[1.02]"
          : "border-gray-200/50 dark:border-slate-700/50 hover:border-blue-300 dark:hover:border-blue-600"
      )}
      onClick={() => onSelect(skip)}
    >
      {/* Popular Badge */}
      {isPopular && !isSelected && (
        <div className="absolute top-3 left-3 z-20">
          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold px-2 py-1 text-xs shadow-lg">
            <TrendingUp className="w-3 h-3 mr-1" />
            Popular
          </Badge>
        </div>
      )}

      {/* Best Value Badge */}
      {isBestValue && !isSelected && (
        <div className="absolute top-3 left-3 z-20">
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold px-2 py-1 text-xs shadow-lg">
            <DollarSign className="w-3 h-3 mr-1" />
            Best Value
          </Badge>
        </div>
      )}

      {/* Info Button */}
      <div className="absolute top-3 right-3 z-20">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700 rounded-full shadow-md border border-gray-200/50 dark:border-slate-600/50 transition-all duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <Info className="w-4 h-4 text-gray-600 dark:text-slate-300" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border border-gray-200/50 dark:border-slate-700/50 shadow-xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {skip.size}
                  </span>
                </div>
                {skip.size} Yard Skip Details
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Size Information */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl p-4 border border-blue-200/50 dark:border-blue-800/50">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Size & Capacity
                </h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-slate-300">
                      Volume:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {skip.size} cubic yards ({cubicMeters}m³)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-slate-300">
                      Weight capacity:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      Up to {getWeightCapacity(skip.size)} tonnes
                    </span>
                  </div>
                </div>
              </div>

              {/* Ideal Use Case */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl p-4 border border-green-200/50 dark:border-green-800/50">
                <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                  Ideal For
                </h3>
                <p className="text-sm text-green-700 dark:text-green-300 leading-relaxed">
                  {getIdealUseCase(skip)}
                </p>
              </div>

              {/* Features */}
              <div className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 rounded-xl p-4 border border-purple-200/50 dark:border-purple-800/50">
                <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-3">
                  Features
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full",
                        skip.allowed_on_road ? "bg-green-500" : "bg-gray-400"
                      )}
                    />
                    <span className="text-xs text-gray-700 dark:text-slate-300">
                      {skip.allowed_on_road ? "Road Friendly" : "Driveway Only"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full",
                        skip.allows_heavy_waste
                          ? "bg-purple-500"
                          : "bg-gray-400"
                      )}
                    />
                    <span className="text-xs text-gray-700 dark:text-slate-300">
                      {skip.allows_heavy_waste
                        ? "Heavy Waste OK"
                        : "Standard Waste"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Hire Period */}
              <div className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-slate-800/50 dark:to-slate-700/50 rounded-xl p-4 border border-gray-200/50 dark:border-slate-600/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500 dark:text-slate-400" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      Hire Period
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {hirePeriod}
                  </span>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Background gradient overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50 dark:from-blue-950/20 dark:via-indigo-950/10 dark:to-purple-950/20 opacity-0 transition-opacity duration-300",
          isSelected && "opacity-100"
        )}
      />

      {/* Selection indicator */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="absolute top-4 right-14 z-10 w-9 h-9 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center shadow-lg"
        >
          <Check className="w-5 h-5" />
        </motion.div>
      )}

      <div className="relative p-6">
        {/* Skip image */}
        <div className="relative h-52 rounded-2xl mb-6 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-800">
          <img
            src={skipImageUrl}
            alt={`${skip.size} yard skip container`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Hover effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/10 group-hover:to-indigo-600/10 transition-all duration-300" />
        </div>

        {/* Skip details */}
        <div className="space-y-4">
          <div className="text-center">
            {/* Clean title without redundancy */}
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {skip.size} Yard Skip
            </h3>
            <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-slate-300">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">{hirePeriod}</span>
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2 justify-center min-h-[36px] items-center">
            {skip.allowed_on_road && (
              <Badge
                variant="secondary"
                className="flex items-center gap-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
              >
                <Truck className="w-3.5 h-3.5" />
                Road Friendly
              </Badge>
            )}
            {skip.allows_heavy_waste && (
              <Badge
                variant="secondary"
                className="flex items-center gap-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
              >
                <Weight className="w-3.5 h-3.5" />
                Heavy Waste
              </Badge>
            )}
            {!skip.allowed_on_road && !skip.allows_heavy_waste && (
              <Badge
                variant="outline"
                className="flex items-center gap-1.5 text-gray-500 dark:text-slate-400 border-gray-300 dark:border-slate-600"
              >
                <Info className="w-3.5 h-3.5" />
                Standard Use
              </Badge>
            )}
          </div>

          {/* Price */}
          <div className="text-center space-y-1">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {totalPrice}
            </div>
            <div className="text-sm text-gray-500 dark:text-slate-400">
              Including {skip.vat}% VAT
            </div>
          </div>

          {/* Additional pricing info */}
          <div className="min-h-[64px] flex items-center justify-center">
            {skip.transport_cost || skip.per_tonne_cost ? (
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-800/50 dark:to-slate-700/50 rounded-xl p-3 space-y-2 w-full border border-gray-200/50 dark:border-slate-700/50">
                {skip.transport_cost && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-slate-300">
                      Transport:
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      £{skip.transport_cost}
                    </span>
                  </div>
                )}
                {skip.per_tonne_cost && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-slate-300">
                      Per tonne:
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      £{skip.per_tonne_cost}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl p-3 w-full flex items-center justify-center border border-green-200/50 dark:border-green-800/50">
                <span className="text-sm text-green-700 dark:text-green-300 font-medium">
                  ✓ All costs included in price
                </span>
              </div>
            )}
          </div>

          {/* Select button */}
          <Button
            className={cn(
              "w-full font-semibold transition-all duration-300 text-base h-12 rounded-xl shadow-lg",
              isSelected
                ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-blue-500/25"
                : "bg-gradient-to-r from-gray-900 to-gray-800 hover:from-blue-600 hover:to-blue-700 text-white shadow-gray-900/25 hover:shadow-blue-500/25"
            )}
            size="lg"
          >
            {isSelected ? (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-2"
              >
                <Check className="w-5 h-5" />
                Selected
              </motion.div>
            ) : (
              <span className="group-hover:scale-105 transition-transform duration-200">
                Select This Skip
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Subtle border glow effect */}
      <div
        className={cn(
          "absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 pointer-events-none",
          "bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10",
          isSelected && "opacity-100"
        )}
      />
    </motion.div>
  );
}
