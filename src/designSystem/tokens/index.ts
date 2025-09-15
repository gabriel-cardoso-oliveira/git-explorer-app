export const spacingTokens = ["xs", "sm", "md", "lg", "xl"] as const;
export const sizeTokens = ["xs", "sm", "md", "lg", "xl"] as const;
export const radiusTokens = ["sm", "md", "lg"] as const;

const lightColors = {
  primary: "#155c54;",
  background: "#ffffff",
  surface: "#f6f8fa",
  text: "#24292e",
  muted: "#586069",
  border: "#e1e4e8",
  success: "#28a745",
  warning: "#f9c51a",
  danger: "#cb2431",
};

const darkColors: typeof lightColors = {
  primary: "#128275",
  background: "#0d1117",
  surface: "#161b22",
  text: "#c9d1d9",
  muted: "#8b949e",
  border: "#30363d",
  success: "#3fb950",
  warning: "#d29922",
  danger: "#f85149",
};

export const tokens = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
  },
  radius: {
    sm: 4,
    md: 8,
    lg: 16,
  },
  colors: {
    light: lightColors,
    dark: darkColors,
  },
};

export type Spacing = keyof typeof tokens.spacing;
export type Size = keyof typeof tokens.sizes;
export type Radius = keyof typeof tokens.radius;
export type Color = keyof typeof lightColors;
