import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { Alert } from "react-native";

import Badge from "@/designSystem/components/Badge";
import Button from "@/designSystem/components/Button";
import Text from "@/designSystem/components/Text";
import { useTheme } from "@/designSystem/theme";
import { RootStackParamList } from "@/navigation/types";
import ErrorMessage from "@/shared/components/ErrorMessage";

import HeaderComponent from "../components/HeaderComponent";
import { useRepositoryDetails } from "../hooks/useRepositoryDetails";
import {
  ActivityIndicator,
  Container,
  ContainerDetails,
  ContainerLanguage,
} from "./styles";

type RepositoryDetailsRouteProp = RouteProp<
  RootStackParamList,
  "RepositoryDetails"
>;

const RepositoryDetailsScreen: React.FC = () => {
  const route = useRoute<RepositoryDetailsRouteProp>();
  const { owner, repo } = route.params;
  const theme = useTheme();

  const {
    data: details,
    isLoading: isLoadingDetails,
    isError: isErrorDetails,
  } = useRepositoryDetails(owner, repo);

  if (isLoadingDetails) {
    return <ActivityIndicator size="large" color={theme.colors.primary} />;
  }

  if (isErrorDetails) {
    return (
      <ErrorMessage message="Ocorreu um erro ao carregar os detalhes do repositório. Tente novamente." />
    );
  }

  if (!details) {
    return null;
  }

  return (
    <Container>
      <HeaderComponent details={details} />
      <Text>{details.description}</Text>
      <ContainerDetails>
        <Text size="sm">⭐ {details.stargazers_count} stars</Text>
        <Text size="sm">🔀 {details.forks_count} forks</Text>
        <Text size="sm">👀 {details.watchers_count} watchers</Text>
        {details.language && (
          <ContainerLanguage>
            <Text size="sm">Linguagem principal:</Text>
            <Badge color="primary">{details.language}</Badge>
          </ContainerLanguage>
        )}
      </ContainerDetails>
      <Button
        onPress={() => Alert.alert("Ação", "Abrir Issues do repositório...")}
      >
        Abrir Issues ({details.open_issues_count})
      </Button>
    </Container>
  );
};

export default RepositoryDetailsScreen;
