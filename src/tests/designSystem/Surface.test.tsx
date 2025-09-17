import React from "react";
import { Text } from "react-native";

import Surface from "@/designSystem/components/Surface";
import { tokens } from "@/designSystem/tokens";

import { render, screen } from "./test-utils";

describe("Surface", () => {
  it("renders children correctly", () => {
    render(
      <Surface>
        <Text>Content</Text>
      </Surface>,
    );
    expect(screen.getByText("Content")).toBeTruthy();
  });

  it("applies default styles", () => {
    const { toJSON } = render(
      <Surface>
        <Text>Default</Text>
      </Surface>,
    );
    const surfaceView = toJSON();
    expect(surfaceView?.props.style).toEqual({
      backgroundColor: tokens.colors.light.surface,
      borderRadius: tokens.radius.lg,
      padding: tokens.spacing.md,
      gap: tokens.spacing.xs,
    });
  });

  it("applies correct styles for a given color", () => {
    const { toJSON } = render(
      <Surface color="background">
        <Text>Custom Color</Text>
      </Surface>,
    );
    const surfaceView = toJSON();
    expect(surfaceView?.props.style).toMatchObject({
      backgroundColor: tokens.colors.light.background,
    });
  });
});
