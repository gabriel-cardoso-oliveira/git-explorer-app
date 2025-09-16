import React from "react";
import { TouchableOpacity } from "react-native";

import { Repository } from "@/core/domain/entities/repository";
import Badge from "@/designSystem/components/Badge";
import Surface from "@/designSystem/components/Surface";
import Text from "@/designSystem/components/Text";

import { Footer, Header } from "./styles";

interface RepositoryItemProps {
  repository: Repository;
  onPress: () => void;
}

export const RepositoryItem: React.FC<RepositoryItemProps> = ({
  repository,
  onPress,
}) => (
  <TouchableOpacity onPress={onPress}>
    <Surface>
      <Header>
        <Text variant="heading">{repository.name}</Text>
        <Text size="sm" color="muted">
          por {repository.owner.login}
        </Text>
      </Header>
      <Text color="muted">{repository.description}</Text>
      <Footer>
        {repository.language && (
          <Badge color="primary">{repository.language}</Badge>
        )}
        <Text size="sm">⭐ {repository.stargazers_count}</Text>
      </Footer>
    </Surface>
  </TouchableOpacity>
);
