import { useInfiniteQuery } from "@tanstack/react-query";

import { fetchRepositoryIssues } from "@/infrastructure/repositories/githubRepository";

const REPOSITORY_ISSUES_QUERY_KEY = "repositoryIssues";

export const useRepositoryIssues = (owner: string, repo: string) =>
  useInfiniteQuery({
    queryKey: [REPOSITORY_ISSUES_QUERY_KEY, owner, repo],
    queryFn: ({ pageParam = 1 }) =>
      fetchRepositoryIssues(owner, repo, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 20) {
        return allPages.length + 1;
      }
      return undefined;
    },
  });
