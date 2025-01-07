# Announcement Pull Request GitHub Action

A GitHub Action to add a comment to all open Pull Requests in a repository.

![image](https://github.com/user-attachments/assets/b2a67501-8e71-4b34-b8cd-d96187bd4d03)


## Description

This action adds a custom comment to all open Pull Requests (PRs) in a repository. It is useful, for example, to notify developers about updates or important events directly in PRs.

## How to Use

To use this action in your repository, add the following to your `.github/workflows/<your-workflow>.yml` file:

```yaml
name: Add PR Comment

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  add-pr-comment:
    runs-on: ubuntu-latest

    steps:
      - name: Add comment to PR
        uses: paulo9mv/announcement_pull_request@v0.4.3
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          message: "Hey everyone, code review is always welcome!"
```

### Input Parameters
token (required): The GitHub token to authenticate the action. Use ${{ secrets.GITHUB_TOKEN }} to allow the action to interact with the repository.
message (required): The message that will be posted on the PRs.

### Permissions
The GITHUB_TOKEN has limited permissions by default, and you may need to configure them to ensure the action can add comments to PRs.

If you are using the action in your repository and the action cannot add comments, add the following to your workflow.yml file, inside the job that uses the action:

```yaml
permissions:
  issues: write      # Permission to add and modify comments on issues and PRs
  pull-requests: write  # Permission to add comments on pull requests
```
These permissions will ensure that the action has access to interact with PRs.

### Example Workflow
Here’s a complete example of a workflow that adds a comment to all PRs when there’s a new update:

```yaml
name: Add Comment to PRs

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  add-pr-comment:
    runs-on: ubuntu-latest

    permissions:
      issues: write
      pull-requests: write

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Add comment to PR
        uses: paulo9mv/announcement_pull_request@v0.4.3
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          message: "Hey everyone, code review is always welcome!"
```


## Contributions 🤩
If you have suggestions or improvements for this action, feel free to open a Pull Request or Issue.

## License
Distributed under the MIT License. See the LICENSE file for more details.

## Made in 🇧🇷
