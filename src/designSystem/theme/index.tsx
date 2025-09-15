import { ThemeProvider, useTheme as useEmotionTheme } from "@emotion/react";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { tokens } from "../tokens";

export type ThemeMode = "light" | "dark";

interface ThemeContextValue {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleThemeMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export interface AppTheme {
  colors: typeof tokens.colors.light;
  spacing: typeof tokens.spacing;
  sizes: typeof tokens.sizes;
  radius: typeof tokens.radius;
}

export const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");

  const toggleThemeMode = useCallback(() => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  }, []);

  const theme: AppTheme = useMemo(
    () => ({
      spacing: tokens.spacing,
      sizes: tokens.sizes,
      radius: tokens.radius,
      colors: tokens.colors[themeMode],
    }),
    [themeMode],
  );

  const contextValue = useMemo(
    () => ({
      themeMode,
      setThemeMode,
      toggleThemeMode,
    }),
    [themeMode, toggleThemeMode],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeMode must be used within an AppThemeProvider");
  }
  return context;
};

export const useTheme = () => useEmotionTheme() as AppTheme;
