import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

import { AppTheme } from "@/designSystem/theme";

export const getScreenOptions = (
  theme: AppTheme,
): NativeStackNavigationOptions => ({
  headerTitleAlign: "center",
  headerBackVisible: false,
  headerStyle: {
    backgroundColor: theme.colors.background,
  },
  headerTintColor: theme.colors.text,
  headerTitleStyle: {
    fontSize: theme.sizes.lg,
  },
  contentStyle: {
    flexGrow: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
  },
  animation: "fade",
});
