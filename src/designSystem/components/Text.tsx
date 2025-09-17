import React from "react";
import { StyleProp, Text as RNText, TextStyle } from "react-native";

import { useTheme } from "../theme";
import { Color, Size } from "../tokens";

type Variant = "body" | "heading";

interface TextProps {
  children: React.ReactNode;
  textAlign?: "left" | "center" | "right";
  variant?: Variant;
  size?: Size;
  color?: Color;
  numberOfLines?: number;
}

const Text: React.FC<TextProps> = ({
  children,
  variant = "body",
  size = "md",
  color = "text",
  textAlign = "left",
  numberOfLines,
}) => {
  const theme = useTheme();
  const fontSize = theme.sizes[size];
  const fontColor = theme.colors[color];

  const textStyles: StyleProp<TextStyle> = {
    color: fontColor,
    fontSize,
    ...(variant === "heading" && { fontWeight: "bold" }),
    textAlign,
  };

  return (
    <RNText style={textStyles} numberOfLines={numberOfLines}>
      {children}
    </RNText>
  );
};

export default Text;
