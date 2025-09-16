import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

import { useTheme } from "../theme";
import { Spacing } from "../tokens";
import Text from "./Text";

type Variant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  variant?: Variant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  variant = "primary",
  size = "md",
  loading,
  disabled,
}) => {
  const theme = useTheme();

  const getButtonStyles = () => {
    const commonStyles: ViewStyle = {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: theme.radius.lg,
      paddingVertical: theme.spacing[size as Spacing],
      paddingHorizontal: theme.spacing.md,
    };

    switch (variant) {
      case "outline":
        return {
          ...commonStyles,
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: theme.colors.primary,
        };
      case "ghost":
        return {
          ...commonStyles,
          backgroundColor: "transparent",
        };
      case "primary":
      default:
        return {
          ...commonStyles,
          backgroundColor: theme.colors.primary,
        };
    }
  };

  const buttonStyle = getButtonStyles();

  const contentColorKey = variant === "primary" ? "background" : "primary";

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[buttonStyle, disabled && styles.disabled]}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors[contentColorKey]} />
      ) : (
        <Text color={contentColorKey}>{children}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
});

export default Button;
