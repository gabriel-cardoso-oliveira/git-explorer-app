import styled from "@emotion/native";
import React from "react";
import { Image } from "react-native";

import { useTheme } from "../theme";
import { Size } from "../tokens";

interface AvatarProps {
  source: { uri: string };
  size?: Size;
}

const AvatarContainer = styled.View`
  overflow: hidden;
  border-radius: 9999px;
`;

const Avatar: React.FC<AvatarProps> = ({ source, size = "md" }) => {
  const theme = useTheme();
  const avatarDimension = theme.sizes[size] * 5;

  return (
    <AvatarContainer
      style={{ width: avatarDimension, height: avatarDimension }}
    >
      <Image source={source} style={{ width: "100%", height: "100%" }} />
    </AvatarContainer>
  );
};

export default Avatar;
