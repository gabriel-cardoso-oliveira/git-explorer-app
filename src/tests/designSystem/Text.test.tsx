import React from "react";
import { StyleSheet } from "react-native";

import Text from "@/designSystem/components/Text";
import { tokens } from "@/designSystem/tokens";

import { render, screen } from "./test-utils";

describe("Text", () => {
  it("renders children correctly", () => {
    render(<Text>Hello World</Text>);
    expect(screen.getByText("Hello World")).toBeTruthy();
  });

  it("applies default styles", () => {
    render(<Text>Default</Text>);
    const text = screen.getByText("Default");

    const flattened = StyleSheet.flatten(text.props.style);

    expect(flattened).toMatchObject({
      color: tokens.colors.light.text,
      fontSize: tokens.sizes.md,
      textAlign: "left",
    });

    expect(flattened.fontWeight).toBeUndefined();
  });

  it("applies heading variant style", () => {
    render(<Text variant="heading">Heading</Text>);
    const text = screen.getByText("Heading");

    expect(text.props.style).toMatchObject({ fontWeight: "bold" });
  });

  it("applies correct size", () => {
    render(<Text size="xl">Extra Large</Text>);
    const text = screen.getByText("Extra Large");

    expect(text.props.style).toMatchObject({ fontSize: tokens.sizes.xl });
  });

  it("applies correct color", () => {
    render(<Text color="primary">Primary Color</Text>);
    const text = screen.getByText("Primary Color");

    expect(text.props.style).toMatchObject({
      color: tokens.colors.light.primary,
    });
  });

  it("applies correct text alignment", () => {
    render(<Text textAlign="center">Centered</Text>);
    const text = screen.getByText("Centered");

    expect(text.props.style).toMatchObject({ textAlign: "center" });
  });

  it("truncates text with numberOfLines", () => {
    render(<Text numberOfLines={1}>Long text to be truncated</Text>);
    const text = screen.getByText("Long text to be truncated");

    expect(text.props.numberOfLines).toBe(1);
  });
});
