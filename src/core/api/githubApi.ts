import axios, { type AxiosError } from "axios";
import Constants from "expo-constants";

const githubToken = Constants.expoConfig?.extra?.githubToken;

const headers: { Authorization?: string; Accept: string } = {
  Accept: "application/vnd.github.v3+json",
};

if (githubToken) {
  headers.Authorization = `token ${githubToken}`;
}

export const githubApi = axios.create({
  baseURL: "https://api.github.com",
  headers,
});

githubApi.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    let errorMessage = "Ocorreu um erro inesperado. Tente novamente.";

    if (error.response) {
      const { status, data } = error.response;
      const apiMessage = (data as { message?: string })?.message;

      if (status === 403 && apiMessage?.includes("API rate limit exceeded")) {
        errorMessage =
          "Limite de requisições da API do GitHub excedido. Para evitar isso, configure seu token pessoal no arquivo .env.";
      } else if (status === 404) {
        errorMessage = "O recurso solicitado não foi encontrado (Erro 404).";
      } else if (apiMessage) {
        errorMessage = apiMessage;
      }
    } else if (error.request) {
      errorMessage =
        "Não foi possível se conectar ao servidor do GitHub. Verifique sua conexão com a internet.";
    }

    return Promise.reject(new Error(errorMessage));
  },
);
