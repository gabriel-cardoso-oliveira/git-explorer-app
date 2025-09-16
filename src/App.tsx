import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AppThemeProvider } from "@/designSystem/theme";

import AppNavigator from "./navigation/AppNavigator";

const queryClient = new QueryClient();

export default function App() {
  return (
    <AppThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AppNavigator />
      </QueryClientProvider>
    </AppThemeProvider>
  );
}
