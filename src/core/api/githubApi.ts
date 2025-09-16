import axios from "axios";
import Constants from "expo-constants";

const githubToken = Constants.expoConfig?.extra?.githubToken;

export const githubApi = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: githubToken ? `token ${githubToken}` : "",
  },
});
