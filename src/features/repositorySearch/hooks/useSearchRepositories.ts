import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";

import {
  fetchRepositories,
  SearchRepositoriesResponse,
} from "@/infrastructure/repositories/githubRepository";

interface SearchRepositoriesResult {
  pages: SearchRepositoriesResponse[];
  pageParams: number[];
}

const REPOSITORIES_QUERY_KEY = "repositories";

export const useSearchRepositories = (
  query: string,
): UseInfiniteQueryResult<SearchRepositoriesResult> =>
  useInfiniteQuery({
    queryKey: [REPOSITORIES_QUERY_KEY, query],
    queryFn: ({ pageParam = 1 }) => fetchRepositories(query, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalItems = allPages.flatMap((page) => page.items).length;
      if (totalItems < lastPage.total_count) {
        return allPages.length + 1;
      }
      return undefined;
    },
    enabled: !!query,
  });
