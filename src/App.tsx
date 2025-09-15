import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";

import { AppThemeProvider } from "@/designSystem/theme";

export default function App() {
  return (
    <AppThemeProvider>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </AppThemeProvider>
  );
}
