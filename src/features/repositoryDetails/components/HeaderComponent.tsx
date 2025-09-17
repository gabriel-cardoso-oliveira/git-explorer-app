import React from "react";

import { RepositoryDetails } from "@/core/domain/entities/repository";
import Avatar from "@/designSystem/components/Avatar";
import Text from "@/designSystem/components/Text";

import { Header, TextContainer } from "./styles";

interface HeaderComponentProps {
  details: RepositoryDetails;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ details }) => (
  <Header>
    <Avatar source={{ uri: details.owner.avatar_url }} size="md" />
    <TextContainer>
      <Text variant="heading">{details.full_name}</Text>
      <Text size="sm" color="muted">
        por {details.owner.login}
      </Text>
    </TextContainer>
  </Header>
);

export default HeaderComponent;
