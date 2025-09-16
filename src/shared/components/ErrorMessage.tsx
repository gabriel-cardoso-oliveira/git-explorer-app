import React from "react";

import Surface from "@/designSystem/components/Surface";
import Text from "@/designSystem/components/Text";

interface AvatarProps {
  message: string;
}

const ErrorMessage: React.FC<AvatarProps> = ({ message }) => (
  <Surface color="danger">
    <Text textAlign="center" color="background">
      {message}
    </Text>
  </Surface>
);

export default ErrorMessage;
