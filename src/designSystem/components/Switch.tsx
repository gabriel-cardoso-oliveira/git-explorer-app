import React from "react";
import { Switch as RNSwitch } from "react-native";

import { useTheme } from "../theme";

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({ value, onValueChange }) => {
  const theme = useTheme();

  return (
    <RNSwitch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: theme.colors.border, true: theme.colors.text }}
      thumbColor={theme.colors.primary}
    />
  );
};

export default Switch;
