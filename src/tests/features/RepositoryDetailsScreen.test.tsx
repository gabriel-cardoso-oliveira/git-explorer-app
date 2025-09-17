import { fireEvent, screen } from "@testing-library/react-native";
import React from "react";

import { useRepositoryDetails } from "@/features/repositoryDetails/hooks/useRepositoryDetails";
import RepositoryDetailsScreen from "@/features/repositoryDetails/screens/RepositoryDetailsScreen";

import { render } from "../test-utils";

jest.mock("@/features/repositoryDetails/hooks/useRepositoryDetails");

const mockNavigate = jest.fn();
jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
  useRoute: () => ({
    params: {
      owner: "facebook",
      repo: "react",
    },
  }),
}));

const useRepositoryDetailsMock = useRepositoryDetails as jest.Mock;

const mockDetails = {
  id: 1,
  name: "react",
  full_name: "facebook/react",
  owner: { login: "facebook", avatar_url: "url" },
  description: "A declarative, efficient, and flexible JavaScript library.",
  stargazers_count: 100,
  forks_count: 20,
  watchers_count: 10,
  open_issues_count: 5,
  language: "JavaScript",
};

describe("RepositoryDetailsScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows loading indicator", () => {
    useRepositoryDetailsMock.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });
    render(<RepositoryDetailsScreen />);
    expect(screen.getByTestId("activity-indicator")).toBeTruthy();
  });

  it("shows error message", () => {
    useRepositoryDetailsMock.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });
    render(<RepositoryDetailsScreen />);
    expect(
      screen.getByText(
        "Ocorreu um erro ao carregar os detalhes do repositório. Tente novamente.",
      ),
    ).toBeTruthy();
  });

  it("renders repository details and navigates to issues", () => {
    useRepositoryDetailsMock.mockReturnValue({
      data: mockDetails,
      isLoading: false,
      isError: false,
    });
    render(<RepositoryDetailsScreen />);

    expect(screen.getByText("facebook/react")).toBeTruthy();
    expect(screen.getByText(mockDetails.description)).toBeTruthy();
    expect(screen.getByText("⭐ 100 stars")).toBeTruthy();
    expect(screen.getByText("🔀 20 forks")).toBeTruthy();
    expect(screen.getByText("👀 10 watchers")).toBeTruthy();
    expect(screen.getByText("JavaScript")).toBeTruthy();

    const issuesButton = screen.getByText("Abrir Issues (5)");
    fireEvent.press(issuesButton);

    expect(mockNavigate).toHaveBeenCalledWith("RepositoryIssues", {
      owner: "facebook",
      repo: "react",
    });
  });
});
