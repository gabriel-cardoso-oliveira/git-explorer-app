import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { Repository } from "@/core/domain/entities/repository";
import Text from "@/designSystem/components/Text";
import { useTheme } from "@/designSystem/theme";
import { RootStackParamList } from "@/navigation/types";
import ErrorMessage from "@/shared/components/ErrorMessage";

import { RepositoryItem } from "../components/RepositoryItem";
import { SearchBar } from "../components/SearchBar";
import { useSearchRepositories } from "../hooks/useSearchRepositories";
import { ActivityIndicator, Container } from "./styles";

const MemoizedRepositoryItem = memo(RepositoryItem);

const RepositorySearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (searchQuery === debouncedQuery) return;

    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery, debouncedQuery]);

  const {
    data,
    isFetching,
    isLoading,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
  } = useSearchRepositories(debouncedQuery);

  const repositories = useMemo(
    () => data?.pages.flatMap((page) => page.items) || [],
    [data],
  );

  const handleRepositoryPress = useCallback(
    (owner: string, repo: string) => {
      navigation.navigate("RepositoryDetails", { owner, repo });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: Repository }) => (
      <MemoizedRepositoryItem
        repository={item}
        onPress={() => handleRepositoryPress(item.owner.login, item.name)}
      />
    ),
    [handleRepositoryPress],
  );

  const renderFooter = useCallback(() => {
    if (isFetching && hasNextPage) {
      return <ActivityIndicator size="large" color={theme.colors.primary} />;
    }
    return null;
  }, [isFetching, hasNextPage, theme.colors.primary]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

        {isLoading && (
          <ActivityIndicator
            testID="activity-indicator"
            size="large"
            color={theme.colors.primary}
          />
        )}

        {isError && error && <ErrorMessage message={error.message} />}

        <FlatList
          data={repositories}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          onEndReached={() => {
            if (hasNextPage && !isFetching) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.3}
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
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
        />
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default RepositorySearchScreen;
