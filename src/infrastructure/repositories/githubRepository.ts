import { githubApi } from "@/core/api/githubApi";
import { Issue } from "@/core/domain/entities/issue";
import {
  Repository,
  RepositoryDetails,
} from "@/core/domain/entities/repository";

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

export const fetchRepositoryDetails = async (
  owner: string,
  repo: string,
): Promise<RepositoryDetails> => {
  const response = await githubApi.get<RepositoryDetails>(
    `/repos/${owner}/${repo}`,
  );
  return response.data;
};

export const fetchRepositoryIssues = async (
  owner: string,
  repo: string,
  pageParam = 1,
): Promise<Issue[]> => {
  const response = await githubApi.get<Issue[]>(
    `/repos/${owner}/${repo}/issues?state=open&page=${pageParam}&per_page=20`,
  );
  return response.data;
};
