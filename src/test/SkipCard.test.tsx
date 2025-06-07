// Manual test scenarios for SkipCard component
// Run these tests by observing the UI in development mode

export const skipCardTestData = {
  // Test case 1: Skip with all features
  skipWithFeatures: {
    id: 1,
    size: 6,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 305,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: "2025-04-03T13:51:46.897146",
    updated_at: "2025-04-07T13:16:52.992",
    allowed_on_road: true,
    allows_heavy_waste: true,
  },

  // Test case 2: Skip without features (like 14 and 16 yard skips)
  skipWithoutFeatures: {
    id: 2,
    size: 14,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 470,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: "2025-04-03T13:51:46.897146",
    updated_at: "2025-04-07T13:16:53.69",
    allowed_on_road: false,
    allows_heavy_waste: false,
  },

  // Test case 3: Skip with additional costs
  skipWithCosts: {
    id: 3,
    size: 20,
    hire_period_days: 14,
    transport_cost: 248,
    per_tonne_cost: 248,
    price_before_vat: 992,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: "2025-04-03T13:51:40.344435",
    updated_at: "2025-04-07T13:16:52.434",
    allowed_on_road: false,
    allows_heavy_waste: true,
  },
};

export const responsiveTestScenarios = [
  {
    name: "Mobile",
    width: "375px",
    description: "Single column layout, touch-optimized buttons",
  },
  {
    name: "Tablet",
    width: "768px",
    description: "Two column grid, medium spacing",
  },
  {
    name: "Desktop",
    width: "1024px",
    description: "Three column grid, full features",
  },
  {
    name: "Large Desktop",
    width: "1440px",
    description: "Three column grid with enhanced spacing",
  },
];

export const darkModeTestCases = [
  {
    name: "Light Mode",
    description: "All components should have proper contrast and visibility",
  },
  {
    name: "Dark Mode",
    description: "All components should adapt to dark theme with proper colors",
  },
  {
    name: "Theme Toggle",
    description:
      "Toggle should smoothly transition between light and dark modes",
  },
];

// Manual testing checklist
export const testingChecklist = {
  skipCardConsistency: [
    "✓ All skip cards have the same height regardless of content",
    "✓ Features section maintains consistent spacing",
    "✓ Price section alignment is consistent",
    "✓ Additional pricing info has uniform height",
    "✓ Buttons are aligned across all cards",
  ],

  responsiveDesign: [
    "✓ Mobile: Single column, touch-friendly buttons",
    "✓ Tablet: Two columns, proper spacing",
    "✓ Desktop: Three columns, optimal layout",
    "✓ Text remains readable at all sizes",
    "✓ Images scale properly",
  ],

  darkMode: [
    "✓ Theme toggle works smoothly",
    "✓ All text is readable in dark mode",
    "✓ Borders and shadows adapt properly",
    "✓ Cards maintain visual hierarchy",
    "✓ Icons and badges contrast properly",
  ],

  functionality: [
    "✓ Skip selection works correctly",
    "✓ Filtering system functions properly",
    "✓ Sorting options work as expected",
    "✓ Animations are smooth and purposeful",
    "✓ Hover states provide good feedback",
  ],
};

// To run these tests:
// 1. Start the development server: npm run dev
// 2. Open browser developer tools
// 3. Test responsive design using device toolbar
// 4. Toggle dark/light mode and verify all components
// 5. Check skip card consistency across different skip types
// 6. Verify filtering and sorting functionality
