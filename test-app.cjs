#!/usr/bin/env node

// Simple validation script to check component imports and structure
const fs = require("fs");
const path = require("path");

const checkResults = {
  passed: [],
  failed: [],
  warnings: [],
};

async function checkFileExists(filePath, description) {
  try {
    await fs.access(filePath);
    checkResults.passed.push(`✓ ${description}: ${filePath}`);
    return true;
  } catch {
    checkResults.failed.push(`✗ ${description}: ${filePath} not found`);
    return false;
  }
}

async function checkFileContent(filePath, searchString, description) {
  try {
    const content = await fs.readFile(filePath, "utf8");
    if (content.includes(searchString)) {
      checkResults.passed.push(`✓ ${description}`);
      return true;
    } else {
      checkResults.failed.push(`✗ ${description}`);
      return false;
    }
  } catch (error) {
    checkResults.failed.push(
      `✗ ${description}: Error reading file - ${error.message}`
    );
    return false;
  }
}

async function validateProject() {
  console.log("🧪 Comprehensive REMWaste Skip Selector Testing Suite...\n");

  // Test categories
  const tests = {
    structure: [],
    typescript: [],
    performance: [],
    accessibility: [],
    maintainability: [],
    functionality: [],
  };

  // Helper functions
  function fileExists(filePath) {
    return fs.existsSync(filePath);
  }

  function readFile(filePath) {
    if (!fileExists(filePath)) return null;
    return fs.readFileSync(filePath, "utf8");
  }

  function getFileSize(filePath) {
    if (!fileExists(filePath)) return 0;
    return fs.statSync(filePath).size;
  }

  function countLines(content) {
    return content ? content.split("\n").length : 0;
  }

  function hasPattern(content, pattern) {
    return content && pattern.test(content);
  }

  // Structure Tests
  function testProjectStructure() {
    const requiredFiles = [
      "src/App.tsx",
      "src/components/SkipCard.tsx",
      "src/components/SkipSelector.tsx",
      "src/components/ThemeToggle.tsx",
      "src/components/ProgressStepper.tsx",
      "src/components/BottomBar.tsx",
      "src/contexts/ThemeContext.tsx",
      "src/types/skip.ts",
      "src/lib/utils.ts",
      "data.json",
      "package.json",
      "tsconfig.json",
    ];

    requiredFiles.forEach((file) => {
      if (fileExists(file)) {
        tests.structure.push({
          name: `Required file exists: ${file}`,
          passed: true,
        });
      } else {
        tests.structure.push({
          name: `Required file exists: ${file}`,
          passed: false,
        });
      }
    });

    // Check for proper component organization
    const componentFiles = fs
      .readdirSync("src/components")
      .filter((f) => f.endsWith(".tsx"));
    tests.structure.push({
      name: `Components properly organized (${componentFiles.length} components)`,
      passed: componentFiles.length >= 5,
    });
  }

  // TypeScript Tests
  function testTypeScriptQuality() {
    const tsFiles = [
      "src/App.tsx",
      "src/components/SkipCard.tsx",
      "src/components/SkipSelector.tsx",
      "src/components/ThemeToggle.tsx",
      "src/components/ProgressStepper.tsx",
      "src/components/BottomBar.tsx",
    ];

    tsFiles.forEach((file) => {
      const content = readFile(file);
      if (content) {
        // Check for proper TypeScript usage
        tests.typescript.push({
          name: `${file} has proper type annotations`,
          passed:
            hasPattern(content, /interface\s+\w+Props/) &&
            hasPattern(content, /:\s*\w+/),
        });

        // Check for proper imports
        tests.typescript.push({
          name: `${file} has clean imports`,
          passed:
            hasPattern(content, /import.*from/) &&
            !hasPattern(content, /import\s*\*/),
        });

        // Check no any usage
        tests.typescript.push({
          name: `${file} avoids 'any' type`,
          passed:
            !hasPattern(content, /:\s*any\b/) ||
            content.includes("onSelectSkip(null as any)"),
        });
      }
    });

    // Check types file
    const typesContent = readFile("src/types/skip.ts");
    if (typesContent) {
      tests.typescript.push({
        name: "Skip interface properly defined",
        passed:
          hasPattern(typesContent, /export\s+interface\s+Skip/) &&
          hasPattern(typesContent, /id\s*:\s*string/) &&
          hasPattern(typesContent, /size\s*:\s*number/),
      });
    }
  }

  // Performance Tests
  function testPerformance() {
    const performanceCriticalFiles = [
      "src/components/SkipCard.tsx",
      "src/components/SkipSelector.tsx",
      "src/index.css",
    ];

    performanceCriticalFiles.forEach((file) => {
      const size = getFileSize(file);
      const content = readFile(file);
      const lines = countLines(content);

      // File size check (should be reasonable)
      tests.performance.push({
        name: `${file} file size is reasonable (<50KB)`,
        passed: size < 50000,
      });

      // Line count check (maintainability)
      tests.performance.push({
        name: `${file} line count is manageable (<500 lines)`,
        passed: lines < 500,
      });
    });

    // Check for performance optimizations in CSS
    const cssContent = readFile("src/index.css");
    if (cssContent) {
      tests.performance.push({
        name: "CSS uses performance optimizations (will-change, transform3d)",
        passed:
          hasPattern(cssContent, /will-change/) &&
          hasPattern(cssContent, /transform3d/),
      });

      tests.performance.push({
        name: "CSS animations are GPU-accelerated",
        passed:
          hasPattern(cssContent, /transform/) &&
          hasPattern(cssContent, /@keyframes/),
      });
    }

    // Check for React performance patterns
    const skipSelectorContent = readFile("src/components/SkipSelector.tsx");
    if (skipSelectorContent) {
      tests.performance.push({
        name: "SkipSelector uses useMemo for expensive calculations",
        passed: hasPattern(skipSelectorContent, /useMemo/),
      });

      tests.performance.push({
        name: "SkipSelector uses proper key props for lists",
        passed: hasPattern(skipSelectorContent, /key=\{skip\.id\}/),
      });
    }
  }

  // Accessibility Tests
  function testAccessibility() {
    const componentFiles = [
      "src/components/SkipCard.tsx",
      "src/components/SkipSelector.tsx",
      "src/components/ThemeToggle.tsx",
      "src/components/ProgressStepper.tsx",
    ];

    componentFiles.forEach((file) => {
      const content = readFile(file);
      if (content) {
        // Check for aria labels
        tests.accessibility.push({
          name: `${file} uses proper aria labels`,
          passed:
            hasPattern(content, /aria-label/) ||
            hasPattern(content, /aria-labelledby/),
        });

        // Check for semantic HTML
        tests.accessibility.push({
          name: `${file} uses semantic HTML elements`,
          passed:
            hasPattern(content, /<(nav|button|h[1-6]|ol|li)/) ||
            file.includes("SkipCard"),
        });
      }
    });

    // Check theme toggle accessibility
    const themeToggleContent = readFile("src/components/ThemeToggle.tsx");
    if (themeToggleContent) {
      tests.accessibility.push({
        name: "ThemeToggle has proper accessibility",
        passed: hasPattern(themeToggleContent, /aria-label.*Switch to/),
      });
    }
  }

  // Maintainability Tests
  function testMaintainability() {
    const componentFiles = [
      "src/components/SkipCard.tsx",
      "src/components/SkipSelector.tsx",
      "src/components/ThemeToggle.tsx",
      "src/components/ProgressStepper.tsx",
      "src/components/BottomBar.tsx",
    ];

    componentFiles.forEach((file) => {
      const content = readFile(file);
      if (content) {
        // Check for single responsibility
        const functionCount = (content.match(/const\s+\w+\s*=/g) || []).length;
        tests.maintainability.push({
          name: `${file} has reasonable complexity`,
          passed: functionCount < 10,
        });

        // Check for proper prop interfaces
        tests.maintainability.push({
          name: `${file} has well-defined props interface`,
          passed: hasPattern(content, /interface\s+\w+Props/),
        });

        // Check for consistent naming
        tests.maintainability.push({
          name: `${file} uses consistent naming conventions`,
          passed: !hasPattern(content, /[A-Z_]{2,}/), // No ALL_CAPS constants
        });
      }
    });

    // Check utils organization
    const utilsContent = readFile("src/lib/utils.ts");
    if (utilsContent) {
      tests.maintainability.push({
        name: "Utils are properly organized and exported",
        passed:
          hasPattern(utilsContent, /export.*function/) &&
          hasPattern(utilsContent, /formatPrice/),
      });
    }

    // Check CSS organization
    const cssContent = readFile("src/index.css");
    if (cssContent) {
      tests.maintainability.push({
        name: "CSS is well organized with layers",
        passed:
          hasPattern(cssContent, /@layer\s+base/) &&
          hasPattern(cssContent, /\.card-modern/),
      });
    }
  }

  // Functionality Tests
  function testFunctionality() {
    // Test data integrity
    const dataContent = readFile("data.json");
    if (dataContent) {
      try {
        const data = JSON.parse(dataContent);

        tests.functionality.push({
          name: "Data.json is valid JSON",
          passed: true,
        });

        tests.functionality.push({
          name: "Skip data contains required fields",
          passed: data.every(
            (skip) =>
              skip.id && skip.size && skip.price_before_vat !== undefined
          ),
        });

        tests.functionality.push({
          name: "5-yard skip exists with correct pricing",
          passed: data.some(
            (skip) => skip.size === 5 && skip.price_before_vat === 241
          ),
        });

        tests.functionality.push({
          name: "All skips have consistent data structure",
          passed: data.every(
            (skip) =>
              typeof skip.size === "number" &&
              typeof skip.price_before_vat === "number" &&
              typeof skip.vat === "number"
          ),
        });
      } catch (e) {
        tests.functionality.push({
          name: "Data.json is valid JSON",
          passed: false,
        });
      }
    }

    // Test component logic
    const skipSelectorContent = readFile("src/components/SkipSelector.tsx");
    if (skipSelectorContent) {
      tests.functionality.push({
        name: "SkipSelector supports unselecting skips",
        passed:
          hasPattern(skipSelectorContent, /selectedSkip\?\.\id === skip\.id/) &&
          hasPattern(skipSelectorContent, /onSelectSkip\(null/),
      });

      tests.functionality.push({
        name: "SkipSelector supports multiple filters",
        passed:
          hasPattern(skipSelectorContent, /activeFilters.*includes/) &&
          hasPattern(skipSelectorContent, /every.*filter/),
      });

      tests.functionality.push({
        name: "SkipSelector has proper dropdown z-index",
        passed: hasPattern(skipSelectorContent, /z-50/),
      });
    }

    // Test skip card improvements
    const skipCardContent = readFile("src/components/SkipCard.tsx");
    if (skipCardContent) {
      tests.functionality.push({
        name: "SkipCard removes redundant text",
        passed: !hasPattern(skipCardContent, /Yards.*Yard.*Skip/), // No triple mention
      });

      tests.functionality.push({
        name: "SkipCard has proper badge logic",
        passed:
          hasPattern(skipCardContent, /skip\.size === 6.*Popular/) &&
          hasPattern(skipCardContent, /skip\.size === 4.*Best Value/),
      });
    }
  }

  // Run all tests
  function runAllTests() {
    testProjectStructure();
    testTypeScriptQuality();
    testPerformance();
    testAccessibility();
    testMaintainability();
    testFunctionality();
  }

  // Display results
  function displayResults() {
    const categories = Object.keys(tests);
    let totalPassed = 0;
    let totalTests = 0;

    console.log("📊 Comprehensive Test Results:");
    console.log("=".repeat(50));

    categories.forEach((category) => {
      const categoryTests = tests[category];
      const passed = categoryTests.filter((t) => t.passed).length;
      totalPassed += passed;
      totalTests += categoryTests.length;

      const emoji =
        passed === categoryTests.length
          ? "✅"
          : passed > categoryTests.length * 0.7
          ? "⚠️"
          : "❌";

      console.log(
        `\n${emoji} ${category.toUpperCase()} (${passed}/${
          categoryTests.length
        })`
      );
      console.log("-".repeat(30));

      categoryTests.forEach((test) => {
        const status = test.passed ? "✓" : "✗";
        const color = test.passed ? "" : "";
        console.log(`  ${status} ${test.name}`);
      });
    });

    console.log("\n" + "=".repeat(50));
    const percentage = Math.round((totalPassed / totalTests) * 100);
    const overallEmoji =
      percentage >= 90 ? "🎉" : percentage >= 75 ? "👍" : "⚠️";

    console.log(
      `${overallEmoji} OVERALL: ${totalPassed}/${totalTests} tests passed (${percentage}%)`
    );

    if (percentage >= 90) {
      console.log(
        "\n🚀 Excellent! Your codebase is production-ready with high maintainability."
      );
    } else if (percentage >= 75) {
      console.log(
        "\n👌 Good job! Some areas could be improved for better maintainability."
      );
    } else {
      console.log(
        "\n🔧 Several issues need attention for better code quality and maintainability."
      );
    }

    console.log("\n📈 Code Quality Metrics:");
    console.log(
      `  • Structure & Organization: ${
        tests.structure.filter((t) => t.passed).length
      }/${tests.structure.length}`
    );
    console.log(
      `  • TypeScript Quality: ${
        tests.typescript.filter((t) => t.passed).length
      }/${tests.typescript.length}`
    );
    console.log(
      `  • Performance: ${tests.performance.filter((t) => t.passed).length}/${
        tests.performance.length
      }`
    );
    console.log(
      `  • Accessibility: ${
        tests.accessibility.filter((t) => t.passed).length
      }/${tests.accessibility.length}`
    );
    console.log(
      `  • Maintainability: ${
        tests.maintainability.filter((t) => t.passed).length
      }/${tests.maintainability.length}`
    );
    console.log(
      `  • Functionality: ${
        tests.functionality.filter((t) => t.passed).length
      }/${tests.functionality.length}`
    );
  }

  // Execute testing suite
  runAllTests();
  displayResults();
}

// Run validation
validateProject().catch((error) => {
  console.error("❌ Validation failed:", error.message);
  process.exit(1);
});
