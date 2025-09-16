import React from "react";
import { StyleProp, Text as RNText, TextStyle } from "react-native";

import { useTheme } from "../theme";
import { Color, Size } from "../tokens";

type Variant = "body" | "heading";

interface TextProps {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  color?: Color;
}

const Text: React.FC<TextProps> = ({
  children,
  variant = "body",
  size = "md",
  color = "text",
}) => {
  const theme = useTheme();
  const fontSize = theme.sizes[size];
  const fontColor = theme.colors[color];

  const textStyles: StyleProp<TextStyle> = {
    color: fontColor,
    fontSize,
    ...(variant === "heading" && { fontWeight: "bold" }),
  };

  return <RNText style={textStyles}>{children}</RNText>;
};

export default Text;
