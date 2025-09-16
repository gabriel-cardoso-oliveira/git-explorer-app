import React from "react";
import {
  StyleProp,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

import { useTheme } from "../theme";
import { Spacing } from "../tokens";
import Text from "./Text";

type InputSize = "sm" | "md" | "lg";
interface InputProps extends Omit<RNTextInputProps, "style"> {
  label?: string;
  error?: string;
  helperText?: string;
  containerStyle?: StyleProp<ViewStyle>;
  size?: InputSize;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  containerStyle,
  size = "md",
  ...rest
}) => {
  const theme = useTheme();

  const inputStyle: StyleProp<TextStyle> = {
    borderWidth: 1,
    borderColor: error ? theme.colors.danger : theme.colors.border,
    borderRadius: theme.radius.lg,
    paddingVertical: theme.spacing[size as Spacing],
    paddingHorizontal: theme.spacing.md,
    fontSize: theme.sizes.md,
    color: theme.colors.text,
    backgroundColor: theme.colors.surface,
  };

  return (
    <View style={containerStyle}>
      {label && (
        <Text size="sm" color="text">
          {label}
        </Text>
      )}
      <RNTextInput
        style={inputStyle}
        placeholderTextColor={theme.colors.muted}
        {...rest}
      />
      {error ? (
        <Text size="xs" color="danger">
          {error}
        </Text>
      ) : helperText ? (
        <Text size="xs" color="muted">
          {helperText}
        </Text>
      ) : null}
    </View>
  );
};

export default Input;
