import React from "react";
import { Switch as RNSwitch } from "react-native";

import { useTheme, useThemeMode } from "../theme";

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({ value, onValueChange }) => {
  const theme = useTheme();
  const { themeMode } = useThemeMode();

  return (
    <RNSwitch
      value={value}
      onValueChange={onValueChange}
      trackColor={
        themeMode === "dark"
          ? { false: theme.colors.border, true: theme.colors.text }
          : { false: theme.colors.border, true: theme.colors.border }
      }
      thumbColor={theme.colors.primary}
    />
  );
};

export default Switch;
