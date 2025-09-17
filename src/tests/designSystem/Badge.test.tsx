import React from "react";
import { StyleSheet } from "react-native";

import Badge from "@/designSystem/components/Badge";
import { tokens } from "@/designSystem/tokens";

import { render, screen } from "../test-utils";

describe("Badge", () => {
  it("renders children correctly", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeTruthy();
  });

  it("applies default styles", () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByTestId("badge-container");
    const text = screen.getByTestId("badge-text");

    expect(StyleSheet.flatten(badge.props.style)).toMatchObject({
      backgroundColor: tokens.colors.light.muted,
      borderRadius: tokens.radius.lg,
      paddingVertical: tokens.spacing.xs,
      paddingHorizontal: tokens.spacing.sm,
    });

    expect(StyleSheet.flatten(text.props.style)).toMatchObject({
      color: tokens.colors.light.text,
      fontSize: tokens.sizes.sm,
    });
  });

  it("applies correct styles for a given color", () => {
    render(<Badge color="primary">Primary</Badge>);
    const badge = screen.getByTestId("badge-container");
    const text = screen.getByTestId("badge-text");

    expect(StyleSheet.flatten(badge.props.style)).toMatchObject({
      backgroundColor: tokens.colors.light.primary,
    });

    expect(StyleSheet.flatten(text.props.style)).toMatchObject({
      color: tokens.colors.light.background,
    });
  });

  it("applies correct styles for a given size", () => {
    render(<Badge size="lg">Large</Badge>);
    const text = screen.getByTestId("badge-text");

    expect(StyleSheet.flatten(text.props.style)).toMatchObject({
      fontSize: tokens.sizes.lg,
    });
  });
});
