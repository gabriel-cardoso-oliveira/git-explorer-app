import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, RenderOptions } from "@testing-library/react-native";
import React, { ReactElement } from "react";

import { AppThemeProvider } from "@/designSystem/theme";

const testQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <QueryClientProvider client={testQueryClient}>
    <AppThemeProvider>
      <NavigationContainer>{children}</NavigationContainer>
    </AppThemeProvider>
  </QueryClientProvider>
);

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react-native";
export { customRender as render };
