import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export interface PullRequest {
  id: number;
  title: string;
  url: string;
  repo: string;
  state: string;
  createdAt: string;
  mergedAt: string | null;
}

export async function fetchUserPullRequests(
  username: string,
  limit: number = 50
): Promise<PullRequest[]> {
  const { data } = await octokit.search.issuesAndPullRequests({
    q: `author:${username} type:pr`,
    per_page: limit,
    sort: "created",
    order: "desc",
  });

  return data.items.map((item) => ({
    id: item.id,
    title: item.title,
    url: item.html_url,
    repo: item.repository_url?.replace("https://api.github.com/repos/", "") ?? "",
    state: item.state ?? "",
    createdAt: item.created_at ?? "",
    mergedAt: item.pull_request?.merged_at ?? null,
  }));
}