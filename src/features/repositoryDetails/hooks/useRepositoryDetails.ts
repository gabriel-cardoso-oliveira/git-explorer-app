import { useQuery } from "@tanstack/react-query";

import { fetchRepositoryDetails } from "@/infrastructure/repositories/githubRepository";

const REPOSITORY_DETAILS_QUERY_KEY = "repositoryDetails";

export const useRepositoryDetails = (owner: string, repo: string) =>
  useQuery({
    queryKey: [REPOSITORY_DETAILS_QUERY_KEY, owner, repo],
    queryFn: () => fetchRepositoryDetails(owner, repo),
  });
