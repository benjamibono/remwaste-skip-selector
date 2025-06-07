import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Info, ChevronDown } from "lucide-react";
import { SkipCard } from "./SkipCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "./ThemeToggle";
import { Skip } from "@/types/skip";

interface SkipSelectorProps {
  skips: Skip[];
  selectedSkip: Skip | null;
  onSelectSkip: (skip: Skip) => void;
}

type SortOption = "size-asc" | "size-desc" | "price-asc" | "price-desc";
type FilterOption = "road-friendly" | "heavy-waste";

export function SkipSelector({
  skips,
  selectedSkip,
  onSelectSkip,
}: SkipSelectorProps) {
  const [sortBy, setSortBy] = useState<SortOption>("size-asc");
  const [activeFilters, setActiveFilters] = useState<FilterOption[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleSkipSelect = (skip: Skip) => {
    // Allow unselecting if the same skip is clicked
    if (selectedSkip?.id === skip.id) {
      onSelectSkip(null as any); // Unselect
    } else {
      onSelectSkip(skip);
    }
  };

  const toggleFilter = (filter: FilterOption) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const filteredAndSortedSkips = useMemo(() => {
    let filtered = skips;

    // Apply filters (multiple can be active)
    if (activeFilters.length > 0) {
      filtered = skips.filter((skip) => {
        return activeFilters.every((filter) => {
          switch (filter) {
            case "road-friendly":
              return skip.allowed_on_road;
            case "heavy-waste":
              return skip.allows_heavy_waste;
            default:
              return true;
          }
        });
      });
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
  }, [skips, sortBy, activeFilters]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const sortOptions = [
    { value: "size-asc", label: "Size ↓" },
    { value: "size-desc", label: "Size ↑" },
    { value: "price-asc", label: "Price ↓" },
    { value: "price-desc", label: "Price ↑" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header with Theme Toggle */}
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          ></motion.div>
          <div className="sm:flex items-center gap-3 hidden">
            <ThemeToggle />
          </div>
        </div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="relative inline-block mb-4">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 dark:from-white dark:via-blue-100 dark:to-indigo-100 bg-clip-text text-transparent leading-tight">
              Choose Your Perfect Skip
            </h1>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 blur-lg rounded-lg -z-10" />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="sm:text-xl md:text-2xl text-gray-600 dark:text-slate-300 max-w-3xl mx-auto text-balance leading-relaxed"
          >
            Select from our range of premium skips designed for all your waste
            disposal needs
          </motion.p>
        </motion.div>

        {/* Enhanced Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-12"
        >
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl mb-2 sm:mb-3 shadow-lg">
              <span className="text-sm sm:text-lg font-bold text-white">
                {skips.length}
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
              Skip Options
            </div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl mb-2 sm:mb-3 shadow-lg">
              <span className="text-sm sm:text-lg font-bold text-white">
                {skips.filter((s) => s.allowed_on_road).length}
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
              Road Friendly
            </div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl mb-2 sm:mb-3 shadow-lg">
              <span className="text-sm sm:text-lg font-bold text-white">
                {skips.filter((s) => s.allows_heavy_waste).length}
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-400">
              Heavy Waste
            </div>
          </div>
        </motion.div>

        {/* Enhanced Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-modern rounded-2xl shadow-lg p-4 sm:p-6 mb-8 border border-white/50 dark:border-slate-700/50 backdrop-blur-sm"
        >
          <div className="flex flex-col gap-4">
            {/* Mobile-optimized controls */}
            <div className="flex flex-row justify-end gap-3 sm:gap-4 items-center">
              {/* Left side with filters */}
              <div className="flex-1 lg:w-[155px] lg:flex-none flex flex-wrap items-center gap-2 sm:gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full flex items-center justify-center gap-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-gray-200/50 dark:border-slate-600/50 text-sm px-3 py-2"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                  {activeFilters.length > 0 && (
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                      {activeFilters.length}
                    </span>
                  )}
                </Button>

                {/* Active filter badges */}
                <AnimatePresence mode="wait">
                  {activeFilters.map((filter) => (
                    <motion.div
                      key={filter}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs"
                      >
                        {filter === "road-friendly"
                          ? "Road Friendly"
                          : "Heavy Waste"}
                        <button
                          onClick={() => toggleFilter(filter)}
                          className="ml-1 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full w-3 h-3 flex items-center justify-center transition-colors text-xs"
                        >
                          ×
                        </button>
                      </Badge>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Sort dropdown */}
              <div className="flex-1 lg:w-[155px] lg:flex-none">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 px-3 py-2 text-sm flex items-center justify-center gap-2"
                    >
                      <span>
                        {
                          sortOptions.find((option) => option.value === sortBy)
                            ?.label
                        }
                      </span>
                      <ChevronDown className="w-4 h-4 text-gray-400 dark:text-slate-500" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[155px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-gray-200 dark:border-slate-700 shadow-lg">
                    <DropdownMenuLabel className="text-gray-900 dark:text-slate-100">
                      Sort By
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                      value={sortBy}
                      onValueChange={(value) => setSortBy(value as SortOption)}
                    >
                      {sortOptions.map((option) => (
                        <DropdownMenuRadioItem
                          key={option.value}
                          value={option.value}
                          className="text-gray-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 focus:bg-blue-50 dark:focus:bg-blue-900/30"
                        >
                          {option.label}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Enhanced Filter Options */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="pt-4 border-t border-gray-200/50 dark:border-slate-700/50"
                >
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={
                        activeFilters.length === 0 ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setActiveFilters([])}
                      className={
                        activeFilters.length === 0
                          ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md"
                          : ""
                      }
                    >
                      All Skips
                    </Button>
                    <Button
                      variant={
                        activeFilters.includes("road-friendly")
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => toggleFilter("road-friendly")}
                      className={
                        activeFilters.includes("road-friendly")
                          ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-md"
                          : ""
                      }
                    >
                      Road Friendly
                    </Button>
                    <Button
                      variant={
                        activeFilters.includes("heavy-waste")
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => toggleFilter("heavy-waste")}
                      className={
                        activeFilters.includes("heavy-waste")
                          ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md"
                          : ""
                      }
                    >
                      Heavy Waste
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Skip Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredAndSortedSkips.map((skip, index) => (
            <SkipCard
              key={skip.id}
              skip={skip}
              isSelected={selectedSkip?.id === skip.id}
              onSelect={handleSkipSelect}
              index={index}
            />
          ))}
        </motion.div>

        {/* Enhanced Empty State */}
        {filteredAndSortedSkips.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Info className="w-8 h-8 text-gray-400 dark:text-slate-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No skips found
            </h3>
            <p className="text-gray-600 dark:text-slate-400 mb-4 max-w-md mx-auto">
              Try adjusting your filters to see more options, or browse all
              available skips.
            </p>
            <Button
              onClick={() => setActiveFilters([])}
              variant="outline"
              className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
            >
              Show All Skips
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
