import { fireEvent } from "@testing-library/react-native";
import React from "react";

import Input from "@/designSystem/components/Input";
import { tokens } from "@/designSystem/tokens";

import { render, screen } from "../test-utils";

describe("Input", () => {
  it("renders a text input with a label", () => {
    render(<Input label="Username" />);
    expect(screen.getByText("Username")).toBeTruthy();
    expect(screen.getByLabelText("Username")).toBeTruthy();
  });

  it("renders without a label", () => {
    render(<Input placeholder="Username" />);
    expect(screen.queryByText("Username")).toBeNull();
    expect(screen.getByPlaceholderText("Username")).toBeTruthy();
  });

  it("forwards props to RNTextInput", () => {
    const onChangeTextMock = jest.fn();
    render(
      <Input
        label="Email"
        onChangeText={onChangeTextMock}
        value="test@example.com"
      />,
    );

    const input = screen.getByLabelText("Email");
    expect(input.props.value).toBe("test@example.com");

    fireEvent.changeText(input, "new@example.com");
    expect(onChangeTextMock).toHaveBeenCalledWith("new@example.com");
  });

  it("displays helper text", () => {
    render(<Input helperText="This is a helper text" />);
    expect(screen.getByText("This is a helper text")).toBeTruthy();
  });

  it("displays an error message and applies error styles", () => {
    render(<Input label="Password" error="Password is too short" />);

    const input = screen.getByLabelText("Password");
    expect(screen.getByText("Password is too short")).toBeTruthy();
    expect(input.props.style).toMatchObject({
      borderColor: tokens.colors.light.danger,
    });
  });

  it("prioritizes error message over helper text", () => {
    render(
      <Input error="This is an error" helperText="This is a helper text" />,
    );
    expect(screen.getByText("This is an error")).toBeTruthy();
    expect(screen.queryByText("This is a helper text")).toBeNull();
  });

  it("applies correct padding for size", () => {
    render(<Input label="Search" size="lg" />);
    const input = screen.getByLabelText("Search");
    expect(input.props.style).toMatchObject({
      paddingVertical: tokens.spacing.lg,
    });
  });
});
