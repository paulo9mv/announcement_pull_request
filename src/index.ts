import * as core from "@actions/core";
import * as github from "@actions/github";

async function run() {
  try {
    // Obter os inputs
    const message = core.getInput("message");
    const token = core.getInput("token") || process.env.GITHUB_TOKEN;

    if (!token) {
      core.setFailed("GITHUB_TOKEN is required.");
      return;
    }

    // Criar o cliente GitHub
    const octokit = github.getOctokit(token);

    // Listar os PRs abertos
    const { data: pullRequests } = await octokit.rest.pulls.list({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      state: "open",
    });

    // Adicionar comentário em cada PR
    for (const pr of pullRequests) {
      const prNumber = pr.number;
      console.log(`Comentando no PR #${prNumber}`);
      await octokit.rest.issues.createComment({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        issue_number: prNumber,
        body: message, // Comentário personalizado
      });
    }
  } catch (error) {
    core.setFailed(`Action failed with error: ${error}`);
  }
}

run();
