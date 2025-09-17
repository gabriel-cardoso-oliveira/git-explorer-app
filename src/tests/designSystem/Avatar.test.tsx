import React from "react";
import { StyleSheet } from "react-native";

import Avatar from "@/designSystem/components/Avatar";
import { tokens } from "@/designSystem/tokens";

import { render, screen } from "../test-utils";

describe("Avatar", () => {
  const source = {
    uri: "https://avatars.githubusercontent.com/u/9919?s=200&v=4",
  };

  it("renders correctly with default props", () => {
    const { toJSON } = render(<Avatar source={source} />);

    const image = screen.getByTestId("avatar-image");
    expect(image).toBeTruthy();
    expect(image.props.source).toEqual(source);

    const expectedSize = tokens.sizes.md * 4;
    const avatarContainerView = toJSON();
    const flattened = StyleSheet.flatten(avatarContainerView?.props.style);

    expect(flattened).toMatchObject({
      width: expectedSize,
      height: expectedSize,
    });
  });

  it("applies correct dimensions for a given size", () => {
    const size = "lg";
    const { toJSON } = render(<Avatar source={source} size={size} />);

    const expectedSize = tokens.sizes[size] * 4;
    const avatarContainerView = toJSON();
    const flattened = StyleSheet.flatten(avatarContainerView?.props.style);

    expect(flattened).toMatchObject({
      width: expectedSize,
      height: expectedSize,
    });
  });
});
