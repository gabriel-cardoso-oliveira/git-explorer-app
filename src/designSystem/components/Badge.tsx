import React from "react";
import { StyleProp, TextStyle, View } from "react-native";

import { useTheme } from "../theme";
import { Color, Size } from "../tokens";
import Text from "./Text";

interface BadgeProps {
  children: React.ReactNode;
  color?: Color;
  size?: Size;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  color = "muted",
  size = "sm",
}) => {
  const theme = useTheme();

  const badgeStyle: StyleProp<TextStyle> = {
    backgroundColor: theme.colors[color],
    borderRadius: theme.radius.lg,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    width: "auto",
    alignSelf: "flex-start",
  };

  return (
    <View testID="badge-container" style={badgeStyle}>
      <Text
        testID="badge-text"
        size={size}
        color={color === "muted" ? "text" : "background"}
      >
        {children}
      </Text>
    </View>
  );
};

export default Badge;
