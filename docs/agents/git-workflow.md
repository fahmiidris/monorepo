# Git Workflow

Trunk-based development for this repo. Agents and contributors should follow these conventions when branching, committing, and opening pull requests.

## Trunk branch

**`stag` is the trunk.** Branch from it, target PRs at it, and keep it deployable.

```bash
git fetch origin
git checkout stag
git pull origin stag
git checkout -b feat/my-feature
```

Do not treat long-lived feature branches as integration branches. Merge work back to `stag` frequently via pull requests.

## One PR, one feature

Each pull request should deliver **one feature or one logical change**. If a piece of work spans multiple unrelated concerns, split it into separate PRs.

- One PR ↔ one squash commit on `stag`
- Keep the PR scope reviewable — avoid bundling unrelated fixes, refactors, or features

## Merge strategy

PRs are **squash-merged** on GitHub. After merge, `stag` receives a **single commit** per PR.

Because squash merge collapses the branch history, the **squash commit message on GitHub must follow the conventional commit format below**. That message becomes the commit on `stag`.

## Commit message format

Use **[Conventional Commits](https://www.conventionalcommits.org/)** in **lowercase**:

```
<type>(<optional scope>): <description>

[optional body]

[optional footer(s)]
```

### Rules

- **All lowercase** — type, scope, and description (e.g. `feat(wallet): add withdrawal limit check`, not `Feat(Wallet): Add ...`)
- **Imperative mood** in the description (`add`, `fix`, `remove`, not `added`, `fixes`)
- **No trailing period** on the subject line
- **Subject line ≤ 72 characters**

### Types

| Type       | When to use                                               |
| ---------- | --------------------------------------------------------- |
| `feat`     | New feature or user-facing capability                     |
| `fix`      | Bug fix                                                   |
| `refactor` | Code change that neither fixes a bug nor adds a feature   |
| `test`     | Adding or updating tests                                  |
| `docs`     | Documentation only                                        |
| `chore`    | Tooling, deps, CI, formatting — no production code change |
| `perf`     | Performance improvement                                   |
| `ci`       | CI/CD configuration                                       |
| `build`    | Build system or external dependencies                     |

### Examples

```
feat(wallet): add withdrawal limit check
fix(auth): reject expired refresh tokens
refactor(payment): extract gateway channel resolver
chore(deps): bump turbo to 2.9.14
```

### Scope

Use a short, lowercase scope when it aids navigation — typically a module or domain area (`wallet`, `auth`, `payment`). Omit scope when the change is repo-wide.

### Breaking changes

Add `!` after the type/scope or a `BREAKING CHANGE:` footer:

```
feat(api)!: remove legacy v1 payment endpoints

BREAKING CHANGE: v1 payment routes are no longer served; clients must use v2.
```

## Agent checklist

When creating commits or PRs:

1. Branch from latest `stag`
2. Keep the change scoped to one feature
3. Write commit messages in lowercase conventional commit format
4. Open the PR against `stag`
5. Ensure the squash-merge title/message on GitHub matches the same format — it becomes the commit on `stag`
