import { useTheme } from "@emotion/react";
import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

interface SurfaceProps {
  children: React.ReactNode;
}

export const Surface: React.FC<SurfaceProps> = ({ children }) => {
  const theme = useTheme();

  const surfaceStyles: StyleProp<ViewStyle> = {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
  };

  return <View style={surfaceStyles}>{children}</View>;
};
