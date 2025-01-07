#!/bin/bash

# Lê a mensagem passada como input
MESSAGE=$1

# Usa o token do GitHub para autenticação
GITHUB_TOKEN=$2

# Obtemos o nome do repositório a partir do contexto do GitHub Actions
OWNER=$(echo $GITHUB_REPOSITORY | cut -d'/' -f1)
REPO=$(echo $GITHUB_REPOSITORY | cut -d'/' -f2)

# Listar todos os PRs abertos
PRs=$(curl -s -H "Authorization: token $GITHUB_TOKEN" "https://api.github.com/repos/$OWNER/$REPO/pulls?state=open")

# Para cada PR, adicionar um comentário
for pr_number in $(echo "$PRs" | jq -r '.[].number'); do
  echo "Comentando no PR #$pr_number"
  curl -X POST -H "Authorization: token $GITHUB_TOKEN" \
    -d "{\"body\": \"$MESSAGE\"}" \
    "https://api.github.com/repos/$OWNER/$REPO/issues/$pr_number/comments"
done
