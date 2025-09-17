import { screen, waitFor } from "@testing-library/react-native";
import React from "react";

import { useRepositoryIssues } from "@/features/repositoryIssues/hooks/useRepositoryIssues";
import RepositoryIssuesScreen from "@/features/repositoryIssues/screens/RepositoryIssuesScreen";

import { render } from "../test-utils";

jest.mock("@/features/repositoryIssues/hooks/useRepositoryIssues");

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useRoute: () => ({
    params: {
      owner: "facebook",
      repo: "react",
    },
  }),
}));

const useRepositoryIssuesMock = useRepositoryIssues as jest.Mock;

const mockIssues = {
  pages: [
    [
      {
        id: 1,
        number: 123,
        title: "Bug in component",
        user: { login: "testuser", avatar_url: "url" },
        created_at: new Date().toISOString(),
        labels: [
          {
            name: "bug",
            id: 1,
            color: "red",
            default: true,
            description: "bug",
            node_id: "1",
            url: "url",
          },
        ],
      },
    ],
  ],
  pageParams: [1],
};

describe("RepositoryIssuesScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useRepositoryIssuesMock.mockReturnValue({
      data: undefined,
      isLoading: false,
      isFetching: false,
      isError: false,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      refetch: jest.fn(),
    });
  });

  it("shows loading indicator", () => {
    useRepositoryIssuesMock.mockReturnValue({
      ...useRepositoryIssuesMock(),
      isLoading: true,
    });
    render(<RepositoryIssuesScreen />);
    expect(screen.getByTestId("activity-indicator")).toBeTruthy();
  });

  it("shows error message", () => {
    useRepositoryIssuesMock.mockReturnValue({
      ...useRepositoryIssuesMock(),
      isError: true,
    });
    render(<RepositoryIssuesScreen />);
    expect(
      screen.getByText(
        "Ocorreu um erro ao buscar as issues do repositório. Tente novamente.",
      ),
    ).toBeTruthy();
  });

  it("displays empty message when there are no issues", async () => {
    useRepositoryIssuesMock.mockReturnValue({
      ...useRepositoryIssuesMock(),
      data: { pages: [[]], pageParams: [1] },
    });
    render(<RepositoryIssuesScreen />);
    await waitFor(() => {
      expect(screen.getByText("Nenhuma issue aberta.")).toBeTruthy();
    });
  });

  it("displays a list of issues", async () => {
    useRepositoryIssuesMock.mockReturnValue({
      ...useRepositoryIssuesMock(),
      data: mockIssues,
    });
    render(<RepositoryIssuesScreen />);
    await waitFor(() => {
      expect(screen.getByText("Bug in component")).toBeTruthy();
      expect(screen.getByText("#123")).toBeTruthy();
      expect(screen.getByText("testuser")).toBeTruthy();
    });
  });
});
