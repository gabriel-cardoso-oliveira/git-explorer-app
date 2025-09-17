import { fireEvent, screen, waitFor } from "@testing-library/react-native";
import React from "react";

import { useSearchRepositories } from "@/features/repositorySearch/hooks/useSearchRepositories";
import RepositorySearchScreen from "@/features/repositorySearch/screens/SearchScreen";

import { render } from "../test-utils";

jest.mock("@/features/repositorySearch/hooks/useSearchRepositories");

const mockNavigate = jest.fn();
jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

const useSearchRepositoriesMock = useSearchRepositories as jest.Mock;

const mockRepositories = {
  pages: [
    {
      items: [
        {
          id: 1,
          name: "react",
          owner: { login: "facebook" },
          description: "A JS library for building user interfaces",
          stargazers_count: 100,
          language: "JavaScript",
        },
      ],
    },
  ],
  pageParams: [1],
};

describe("RepositorySearchScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useSearchRepositoriesMock.mockReturnValue({
      data: undefined,
      isLoading: false,
      isFetching: false,
      isError: false,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
    });
  });

  it("renders search bar and initial message", () => {
    render(<RepositorySearchScreen />);
    expect(screen.getByPlaceholderText("Buscar repositórios...")).toBeTruthy();
    expect(screen.getByText("Nenhum repositório encontrado.")).toBeTruthy();
  });

  it("shows loading indicator while fetching", async () => {
    useSearchRepositoriesMock.mockReturnValue({
      ...useSearchRepositoriesMock(),
      isLoading: true,
    });
    render(<RepositorySearchScreen />);

    fireEvent.changeText(
      screen.getByPlaceholderText("Buscar repositórios..."),
      "react",
    );

    await waitFor(() => {
      expect(screen.getByTestId("activity-indicator")).toBeTruthy();
    });
  });

  it("displays repositories on successful search", async () => {
    useSearchRepositoriesMock.mockReturnValue({
      ...useSearchRepositoriesMock(),
      data: mockRepositories,
    });
    render(<RepositorySearchScreen />);

    fireEvent.changeText(
      screen.getByPlaceholderText("Buscar repositórios..."),
      "react",
    );

    await waitFor(() => {
      expect(screen.getByText("react")).toBeTruthy();
      expect(
        screen.getByText("A JS library for building user interfaces"),
      ).toBeTruthy();
    });
  });

  it("displays error message on search failure", async () => {
    useSearchRepositoriesMock.mockReturnValue({
      ...useSearchRepositoriesMock(),
      isError: true,
    });
    render(<RepositorySearchScreen />);

    fireEvent.changeText(
      screen.getByPlaceholderText("Buscar repositórios..."),
      "react",
    );

    await waitFor(() => {
      expect(
        screen.getByText(
          "Ocorreu um erro ao buscar os repositórios. Tente novamente.",
        ),
      ).toBeTruthy();
    });
  });

  it("navigates to repository details on press", async () => {
    useSearchRepositoriesMock.mockReturnValue({
      ...useSearchRepositoriesMock(),
      data: mockRepositories,
    });
    render(<RepositorySearchScreen />);

    fireEvent.changeText(
      screen.getByPlaceholderText("Buscar repositórios..."),
      "react",
    );

    await waitFor(() => {
      fireEvent.press(screen.getByText("react"));
    });

    expect(mockNavigate).toHaveBeenCalledWith("RepositoryDetails", {
      owner: "facebook",
      repo: "react",
    });
  });
});
