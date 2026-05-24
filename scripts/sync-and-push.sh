#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/.."

echo "→ Fetching from origin..."
git fetch origin

echo "→ Rebasing on origin/main..."
git pull --rebase origin main

echo "→ Pushing to origin/main..."
if git push origin main; then
  echo "✓ Push successful."
else
  echo ""
  echo "✗ Push failed. Common fixes:"
  echo "  • 403: You need collaborator access or push to your own repo (see docs/PUSHING.md)"
  echo "  • Auth: Use a GitHub Personal Access Token instead of your password"
  echo "  • Run: git remote -v   to confirm the remote URL"
  exit 1
fi
