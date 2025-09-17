import { render, RenderOptions } from "@testing-library/react-native";
import React, { ReactElement } from "react";

import { AppThemeProvider } from "@/designSystem/theme";

const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <AppThemeProvider>{children}</AppThemeProvider>;

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react-native";

export { customRender as render };
