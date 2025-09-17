import { githubApi } from "@/core/api/githubApi";
import {
  fetchRepositories,
  fetchRepositoryDetails,
  fetchRepositoryIssues,
} from "@/infrastructure/repositories/githubRepository";

jest.mock("@/core/api/githubApi");

const githubApiMock = githubApi as jest.Mocked<typeof githubApi>;

describe("Repositories API functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns empty result when query is empty", async () => {
    const result = await fetchRepositories("");
    expect(result).toEqual({ items: [], total_count: 0 });
    expect(githubApiMock.get).not.toHaveBeenCalled();
  });

  it("calls githubApi.get with correct URL and returns data", async () => {
    const mockData = { items: [{ id: 1, name: "repo" }], total_count: 1 };
    githubApiMock.get.mockResolvedValueOnce({ data: mockData });

    const result = await fetchRepositories("react", 2);

    expect(githubApiMock.get).toHaveBeenCalledWith(
      "/search/repositories?q=react&sort=stars&order=desc&page=2&per_page=20",
    );
    expect(result).toEqual(mockData);
  });

  it("throws an error if githubApi.get rejects", async () => {
    githubApiMock.get.mockRejectedValueOnce(new Error("Network error"));

    await expect(fetchRepositories("react")).rejects.toThrow("Network error");
  });

  it("calls githubApi.get with correct URL and returns data", async () => {
    const mockData = { id: 1, name: "repo" };
    githubApiMock.get.mockResolvedValueOnce({ data: mockData });

    const result = await fetchRepositoryDetails("facebook", "react");

    expect(githubApiMock.get).toHaveBeenCalledWith("/repos/facebook/react");
    expect(result).toEqual(mockData);
  });

  it("throws an error if githubApi.get rejects", async () => {
    githubApiMock.get.mockRejectedValueOnce(new Error("Network error"));

    await expect(fetchRepositoryDetails("facebook", "react")).rejects.toThrow(
      "Network error",
    );
  });

  it("calls githubApi.get with correct URL and returns issues", async () => {
    const mockData = [{ id: 1, title: "issue" }];
    githubApiMock.get.mockResolvedValueOnce({ data: mockData });

    const result = await fetchRepositoryIssues("facebook", "react", 2);

    expect(githubApiMock.get).toHaveBeenCalledWith(
      "/repos/facebook/react/issues?state=open&page=2&per_page=20",
    );
    expect(result).toEqual(mockData);
  });

  it("throws an error if githubApi.get rejects", async () => {
    githubApiMock.get.mockRejectedValueOnce(new Error("Network error"));

    await expect(fetchRepositoryIssues("facebook", "react")).rejects.toThrow(
      "Network error",
    );
  });

  it("uses default pageParam=1 if not provided for fetchRepositories", async () => {
    const mockData = { items: [], total_count: 0 };
    githubApiMock.get.mockResolvedValueOnce({ data: mockData });

    await fetchRepositories("react");

    expect(githubApiMock.get).toHaveBeenCalledWith(
      "/search/repositories?q=react&sort=stars&order=desc&page=1&per_page=20",
    );
  });

  it("uses default pageParam=1 if not provided for fetchRepositoryIssues", async () => {
    const mockData: any[] = [];
    githubApiMock.get.mockResolvedValueOnce({ data: mockData });

    await fetchRepositoryIssues("facebook", "react");

    expect(githubApiMock.get).toHaveBeenCalledWith(
      "/repos/facebook/react/issues?state=open&page=1&per_page=20",
    );
  });
});
