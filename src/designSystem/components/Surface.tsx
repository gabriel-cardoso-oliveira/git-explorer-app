import { useTheme } from "@emotion/react";
import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

import { Color } from "../tokens";

interface SurfaceProps {
  children: React.ReactNode;
  color?: Color;
}

const Surface: React.FC<SurfaceProps> = ({ children, color = "surface" }) => {
  const theme = useTheme();

  const surfaceStyles: StyleProp<ViewStyle> = {
    backgroundColor: theme.colors[color],
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    gap: theme.spacing.xs,
  };

  return <View style={surfaceStyles}>{children}</View>;
};

export default Surface;
