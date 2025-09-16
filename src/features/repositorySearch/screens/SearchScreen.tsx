// import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

import Text from "@/designSystem/components/Text";
import { useTheme } from "@/designSystem/theme";
import ErrorMessage from "@/shared/components/ErrorMessage";

// import { RootStackParamList } from "@/navigation/types";
import { RepositoryItem } from "../components/RepositoryItem";
import { SearchBar } from "../components/SearchBar";
import { useSearchRepositories } from "../hooks/useSearchRepositories";
import { ActivityIndicator, Container } from "./styles";

const RepositorySearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const theme = useTheme();
  //   const navigation = useNavigation<RootStackParamList>();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const {
    data,
    isFetching,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
  } = useSearchRepositories(debouncedQuery);

  const repositories = data?.pages.flatMap((page) => page.items) || [];

  const handleRepositoryPress = (owner: string, repo: string) => {
    // navigation.navigate("RepositoryDetails", { owner, repo });
  };

  const renderFooter = () => {
    if (isFetching && hasNextPage) {
      return <ActivityIndicator size="large" color={theme.colors.primary} />;
    }
    return null;
  };

  return (
    <Container>
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

      {isLoading && (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      )}

      {isError && (
        <ErrorMessage message="Ocorreu um erro ao buscar os repositórios. Tente novamente." />
      )}

      <FlatList
        data={repositories}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <RepositoryItem
            repository={item}
            onPress={() => handleRepositoryPress(item.owner.login, item.name)}
          />
        )}
        onEndReached={() => {
          if (hasNextPage && !isFetching) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          repositories.length === 0 && !isLoading ? (
            <Text textAlign="center">Nenhum repositório encontrado.</Text>
          ) : null
        }
        refreshing={isFetching && !isLoading}
        onRefresh={() => refetch()}
        ListFooterComponent={renderFooter()}
        ItemSeparatorComponent={() => (
          <View style={{ height: theme.spacing.sm }} />
        )}
      />
    </Container>
  );
};

export default RepositorySearchScreen;
