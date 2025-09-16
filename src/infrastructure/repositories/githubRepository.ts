import { githubApi } from "@/core/api/githubApi";
import { Repository } from "@/core/domain/entities/repository";

export interface SearchRepositoriesResponse {
  items: Repository[];
  total_count: number;
}

export const fetchRepositories = async (
  query: string,
  pageParam = 1,
): Promise<SearchRepositoriesResponse> => {
  if (!query) {
    return { items: [], total_count: 0 };
  }
  const response = await githubApi.get<SearchRepositoriesResponse>(
    `/search/repositories?q=${query}&sort=stars&order=desc&page=${pageParam}&per_page=20`,
  );
  return response.data;
};
