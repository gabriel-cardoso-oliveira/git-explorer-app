import { AppThemeProvider } from "@/designSystem/theme";

import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  return (
    <AppThemeProvider>
      <AppNavigator />
    </AppThemeProvider>
  );
}
