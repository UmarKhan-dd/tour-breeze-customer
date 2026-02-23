// theme.ts
import { vars } from "nativewind";

// ============================================================================
// FONT CONFIGURATION
// ============================================================================
export interface ThemeFonts {
  heading: {
    family: string;
    weights: Record<string, string>;
  };
  body: {
    family: string;
    weights: Record<string, string>;
  };
  mono: {
    family: string;
    weights: Record<string, string>;
  };
}

// Modern font family for real estate app
export const themeFonts: ThemeFonts = {
  heading: {
    family: "Inter",
    weights: {
      normal: "Inter_400Regular",
      medium: "Inter_500Medium",
      semibold: "Inter_600SemiBold",
      bold: "Inter_700Bold",
    },
  },
  body: {
    family: "Inter",
    weights: {
      normal: "Inter_400Regular",
      medium: "Inter_500Medium",
      semibold: "Inter_600SemiBold",
    },
  },
  mono: {
    family: "JetBrainsMono",
    weights: {
      normal: "JetBrainsMono_400Regular",
      medium: "JetBrainsMono_500Medium",
    },
  },
};

// Ocean Teal Theme - Professional, Trustworthy, Modern for Real Estate
export const lightTheme = vars({
  "--radius": "12", // Slightly more rounded for modern feel

  // Core semantic colors - Light teal background
  "--background": "240 253 250", // Light teal tint (#f0fdfa)
  "--foreground": "15 23 42", // Deep slate (#0f1728)

  "--card": "255 255 255", // Pure white cards
  "--card-foreground": "15 23 42", // Deep slate text

  "--popover": "255 255 255", // White popover
  "--popover-foreground": "15 23 42", // Deep slate text

  // Primary - Teal for trust and professionalism
  "--primary": "13 148 136", // Teal-600 (#0d9488)
  "--primary-foreground": "255 255 255", // White text on teal

  "--secondary": "204 251 241", // Light teal (#ccfbf1)
  "--secondary-foreground": "19 78 74", // Dark teal (#134e4a)

  "--muted": "243 244 246", // Light gray (#f3f4f6)
  "--muted-foreground": "107 114 128", // Muted gray (#6b7280)

  "--accent": "20 184 166", // Teal-500 (#14b8a6)
  "--accent-foreground": "255 255 255", // White text

  "--destructive": "239 68 68", // Red-500 (#ef4444)

  "--border": "226 232 240", // Slate-200 (#e2e8f0)
  "--input": "243 244 246", // Light gray input
  "--ring": "13 148 136", // Teal-600 for focus rings

  // Chart colors
  "--chart-1": "13 148 136", // Teal
  "--chart-2": "59 130 246", // Blue
  "--chart-3": "249 115 22", // Orange
  "--chart-4": "168 85 247", // Purple
  "--chart-5": "236 72 153", // Pink

  // Sidebar colors
  "--sidebar": "250 250 250", // Light gray
  "--sidebar-foreground": "15 23 42", // Deep slate
  "--sidebar-primary": "13 148 136", // Teal primary
  "--sidebar-primary-foreground": "255 255 255", // White
  "--sidebar-accent": "243 244 246", // Light gray
  "--sidebar-accent-foreground": "15 23 42", // Deep slate
  "--sidebar-border": "226 232 240", // Slate border
  "--sidebar-ring": "13 148 136", // Teal ring
});

export const darkTheme = vars({
  "--radius": "12",

  // Core semantic colors - Dark teal background
  "--background": "15 41 36", // Deep teal (#0f2924)
  "--foreground": "240 253 250", // Light teal text (#f0fdfa)

  "--card": "45 65 60", // More distinct teal (#2d413c)
  "--card-foreground": "240 253 250", // Light teal text

  "--popover": "45 45 45", // Gray popover
  "--popover-foreground": "250 250 250", // White text

  // Primary - Light teal for dark mode
  "--primary": "94 234 212", // Teal-300 (#5eead4)
  "--primary-foreground": "15 41 36", // Dark teal text

  "--secondary": "26 46 42", // Dark teal secondary
  "--secondary-foreground": "94 234 212", // Light teal text

  "--muted": "26 46 42", // Dark teal muted
  "--muted-foreground": "156 163 175", // Gray-400

  "--accent": "45 212 191", // Teal-400 (#2dd4bf)
  "--accent-foreground": "15 41 36", // Dark teal text

  "--destructive": "248 113 113", // Red-400

  "--border": "26 46 42", // Dark teal border
  "--input": "45 45 45", // Gray input
  "--ring": "94 234 212", // Teal-300 ring

  // Chart colors
  "--chart-1": "94 234 212", // Light teal
  "--chart-2": "96 165 250", // Light blue
  "--chart-3": "251 146 60", // Light orange
  "--chart-4": "192 132 252", // Light purple
  "--chart-5": "244 114 182", // Light pink

  // Sidebar colors
  "--sidebar": "15 41 36", // Dark teal
  "--sidebar-foreground": "240 253 250", // Light teal
  "--sidebar-primary": "94 234 212", // Light teal primary
  "--sidebar-primary-foreground": "15 41 36", // Dark teal
  "--sidebar-accent": "26 46 42", // Dark teal accent
  "--sidebar-accent-foreground": "240 253 250", // Light teal
  "--sidebar-border": "26 46 42", // Dark teal border
  "--sidebar-ring": "94 234 212", // Light teal ring
});
