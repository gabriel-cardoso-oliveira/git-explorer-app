import { fireEvent } from "@testing-library/react-native";
import React from "react";
import { StyleSheet } from "react-native";

import Button from "@/designSystem/components/Button";
import { tokens } from "@/designSystem/tokens";

import { render, screen } from "./test-utils";

describe("Button", () => {
  const onPressMock = jest.fn();

  beforeEach(() => {
    onPressMock.mockClear();
  });

  it("renders children and calls onPress", () => {
    render(<Button onPress={onPressMock}>Click me</Button>);

    const button = screen.getByTestId("button");
    expect(button).toBeTruthy();

    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(
      <Button onPress={onPressMock} disabled>
        Disabled
      </Button>,
    );

    const button = screen.getByTestId("button");
    fireEvent.press(button);
    expect(onPressMock).not.toHaveBeenCalled();

    expect(button.props.accessibilityState.disabled).toBe(true);
    expect(button.props.style).toMatchObject({ opacity: 0.5 });
  });

  it("shows loading indicator when loading prop is true", () => {
    const { getByTestId } = render(
      <Button onPress={onPressMock} loading>
        Loading
      </Button>,
    );

    expect(screen.queryByText("Loading")).toBeNull();

    const button = getByTestId("button");

    expect(button.props.accessibilityState.disabled).toBe(true);

    fireEvent.press(button);
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it("applies primary variant styles by default", () => {
    render(<Button onPress={onPressMock}>Primary</Button>);
    const button = screen.getByTestId("button");
    expect(StyleSheet.flatten(button.props.style)).toMatchObject({
      backgroundColor: tokens.colors.light.primary,
    });
  });

  it("applies outline variant styles", () => {
    render(
      <Button onPress={onPressMock} variant="outline">
        Outline
      </Button>,
    );
    const button = screen.getByTestId("button");
    expect(StyleSheet.flatten(button.props.style)).toMatchObject({
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: tokens.colors.light.primary,
    });
  });

  it("applies ghost variant styles", () => {
    render(
      <Button onPress={onPressMock} variant="ghost">
        Ghost
      </Button>,
    );
    const button = screen.getByTestId("button");
    expect(StyleSheet.flatten(button.props.style)).toMatchObject({
      backgroundColor: "transparent",
    });
  });

  it("applies correct padding for size", () => {
    render(
      <Button onPress={onPressMock} size="lg">
        Large
      </Button>,
    );
    const button = screen.getByTestId("button");
    expect(StyleSheet.flatten(button.props.style)).toMatchObject({
      paddingVertical: tokens.spacing.lg,
    });
  });
});
