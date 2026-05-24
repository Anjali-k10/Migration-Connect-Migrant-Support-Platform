# Fix Git push issues

Your branch is **2 commits ahead** of `origin/main`. The repo is configured correctly (no `node_modules` or `.env` secrets committed).

Remote: `https://github.com/Anjali-k10/Migration-Connect-Migrant-Support-Platform.git`

---

## Step 1 — Sync then push

Run from the project root:

```bash
git fetch origin
git pull --rebase origin main
git push origin main
```

If push succeeds, you are done.

---

## Step 2 — If you see **403 / Permission denied**

You are logged in as **Sona30k** but the remote belongs to **Anjali-k10**. You need **one** of these:

**A) Collaborator access** — Ask the repo owner to add `Sona30k` as a collaborator on GitHub, then push again.

**B) Push to your own GitHub repo**

1. On GitHub, create a new empty repo (e.g. under your account).
2. Point `origin` at your repo:

```bash
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your details.

**C) Keep both remotes** (team repo + your fork):

```bash
git remote rename origin upstream
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

---

## Step 3 — If you see **Authentication failed** (HTTPS)

GitHub no longer accepts account passwords for `git push`.

1. Create a **Personal Access Token**: GitHub → Settings → Developer settings → Personal access tokens → Generate (scope: `repo`).
2. Push again; when prompted for password, paste the **token** (not your GitHub password).

Or use SSH:

```bash
git remote set-url origin git@github.com:Anjali-k10/Migration-Connect-Migrant-Support-Platform.git
git push origin main
```

(Requires an SSH key added to your GitHub account.)

---

## Step 4 — If you see **rejected (non-fast-forward)**

Someone else pushed to `main`. Run:

```bash
git fetch origin
git pull --rebase origin main
# fix any conflicts, then:
git add .
git rebase --continue
git push origin main
```

---

## Quick check

```bash
git status
git remote -v
git log origin/main..HEAD --oneline
```

You should see 2 commits ready to push when `git status` says *ahead of origin/main by 2 commits*.
