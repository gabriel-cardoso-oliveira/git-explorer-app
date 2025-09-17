export interface Repository {
  id: number;
  name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  stargazers_count: number;
  language: string | null;
  description: string | null;
  full_name: string;
}

export interface RepositoryDetails extends Repository {
  forks_count: number;
  watchers_count: number;
  open_issues_count: number;
}
