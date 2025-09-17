import { RouteProp, useRoute } from "@react-navigation/native";
import React, { memo, useCallback, useMemo } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

import { Issue } from "@/core/domain/entities/issue";
import Text from "@/designSystem/components/Text";
import { useTheme } from "@/designSystem/theme";
import { RootStackParamList } from "@/navigation/types";
import ErrorMessage from "@/shared/components/ErrorMessage";

import IssueItem from "../components/IssueItem";
import { useRepositoryIssues } from "../hooks/useRepositoryIssues";

type RepositoryIssuesRouteProp = RouteProp<
  RootStackParamList,
  "RepositoryIssues"
>;

const MemoizedIssueItem = memo(IssueItem);

const RepositoryIssuesScreen: React.FC = () => {
  const route = useRoute<RepositoryIssuesRouteProp>();
  const { owner, repo } = route.params;
  const theme = useTheme();

  const {
    data: issuesData,
    isFetching: isFetchingIssues,
    isLoading: isLoadingIssues,
    isError: isErrorIssues,
    fetchNextPage,
    hasNextPage,
    refetch: refetchIssues,
  } = useRepositoryIssues(owner, repo);

  const issues = useMemo(
    () => issuesData?.pages.flatMap((page) => page) || [],
    [issuesData],
  );

  const renderItem = useCallback(
    ({ item }: { item: Issue }) => <MemoizedIssueItem issue={item} />,
    [],
  );

  const renderFooter = useCallback(() => {
    if (isFetchingIssues && hasNextPage) {
      return (
        <ActivityIndicator
          style={{ marginVertical: 20 }}
          size="small"
          color={theme.colors.primary}
        />
      );
    }
    return null;
  }, [isFetchingIssues, hasNextPage, theme.colors.primary]);

  if (isErrorIssues) {
    return (
      <ErrorMessage message="Ocorreu um erro ao buscar as issues do repositório. Tente novamente." />
    );
  }

  return (
    <FlatList
      data={issues}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderItem}
      onEndReached={() => {
        if (hasNextPage && !isFetchingIssues) {
          fetchNextPage();
        }
      }}
      onEndReachedThreshold={0.3}
      refreshing={isFetchingIssues && !isLoadingIssues}
      onRefresh={() => refetchIssues()}
      ListFooterComponent={renderFooter()}
      ListEmptyComponent={
        !isLoadingIssues ? (
          <Text textAlign="center">Nenhuma issue aberta.</Text>
        ) : null
      }
      ItemSeparatorComponent={() => (
        <View style={{ height: theme.spacing.sm }} />
      )}
    />
  );
};

export default RepositoryIssuesScreen;
