import { fireEvent } from "@testing-library/react-native";
import React from "react";

import Switch from "@/designSystem/components/Switch";

import { render, screen } from "../test-utils";

describe("Switch", () => {
  it("renders with initial value and calls onValueChange", () => {
    const onValueChangeMock = jest.fn();
    render(<Switch value={false} onValueChange={onValueChangeMock} />);

    const switchComponent = screen.getByTestId("switch");
    expect(switchComponent.props.value).toBe(false);

    fireEvent(switchComponent, "onValueChange", true);
    expect(onValueChangeMock).toHaveBeenCalledWith(true);
  });

  it("reflects the updated value", () => {
    const onValueChangeMock = jest.fn();
    const { rerender } = render(
      <Switch value={false} onValueChange={onValueChangeMock} />,
    );

    const switchComponent = screen.getByTestId("switch");
    expect(switchComponent.props.value).toBe(false);

    rerender(<Switch value={true} onValueChange={onValueChangeMock} />);
    expect(switchComponent.props.value).toBe(true);
  });
});
