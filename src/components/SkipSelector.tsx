import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Filter, SortAsc, SortDesc, Info } from "lucide-react";
import { SkipCard } from "./SkipCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skip } from "@/types/skip";
import { cn } from "@/lib/utils";

interface SkipSelectorProps {
  skips: Skip[];
  selectedSkip: Skip | null;
  onSelectSkip: (skip: Skip) => void;
}

type SortOption = "size-asc" | "size-desc" | "price-asc" | "price-desc";
type FilterOption = "all" | "road-friendly" | "heavy-waste";

export function SkipSelector({
  skips,
  selectedSkip,
  onSelectSkip,
}: SkipSelectorProps) {
  const [sortBy, setSortBy] = useState<SortOption>("size-asc");
  const [filterBy, setFilterBy] = useState<FilterOption>("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredAndSortedSkips = useMemo(() => {
    let filtered = skips;

    // Apply filters
    switch (filterBy) {
      case "road-friendly":
        filtered = skips.filter((skip) => skip.allowed_on_road);
        break;
      case "heavy-waste":
        filtered = skips.filter((skip) => skip.allows_heavy_waste);
        break;
      default:
        filtered = skips;
    }

    // Apply sorting
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "size-asc":
          return a.size - b.size;
        case "size-desc":
          return b.size - a.size;
        case "price-asc":
          return a.price_before_vat - b.price_before_vat;
        case "price-desc":
          return b.price_before_vat - a.price_before_vat;
        default:
          return 0;
      }
    });
  }, [skips, sortBy, filterBy]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Perfect Skip
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select from our range of premium skips designed for all your waste
            disposal needs
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-8 mb-8"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {skips.length}
            </div>
            <div className="text-sm text-gray-600">Skip Options</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {skips.filter((s) => s.allowed_on_road).length}
            </div>
            <div className="text-sm text-gray-600">Road Friendly</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {skips.filter((s) => s.allows_heavy_waste).length}
            </div>
            <div className="text-sm text-gray-600">Heavy Waste</div>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
              </Button>
              {filterBy !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {filterBy === "road-friendly"
                    ? "Road Friendly"
                    : "Heavy Waste"}
                  <button
                    onClick={() => setFilterBy("all")}
                    className="ml-1 hover:bg-gray-200 rounded-full w-4 h-4 flex items-center justify-center"
                  >
                    ×
                  </button>
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="size-asc">Size (Small to Large)</option>
                <option value="size-desc">Size (Large to Small)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
              </select>
            </div>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 pt-4 border-t border-gray-200"
            >
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={filterBy === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterBy("all")}
                >
                  All Skips
                </Button>
                <Button
                  variant={filterBy === "road-friendly" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterBy("road-friendly")}
                >
                  Road Friendly
                </Button>
                <Button
                  variant={filterBy === "heavy-waste" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterBy("heavy-waste")}
                >
                  Heavy Waste
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Skip Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredAndSortedSkips.map((skip, index) => (
            <SkipCard
              key={skip.id}
              skip={skip}
              isSelected={selectedSkip?.id === skip.id}
              onSelect={onSelectSkip}
              index={index}
            />
          ))}
        </motion.div>

        {filteredAndSortedSkips.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Info className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No skips found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters to see more options.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
