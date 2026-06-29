---
mode: agent
description: Read CHANGES.md, propose a design doc, then (after approval) implement on a feature branch, commit (incl. the plan), publish the branch, and open a PR.
tools: ['codebase', 'search', 'editFiles', 'runCommands', 'changes']
---

# Implement Changes from CHANGES.md

You are running an automated, approval-gated workflow. Work through the phases
**in order**. After each phase that ends with **⛔ STOP**, you MUST stop and wait
for the user to explicitly approve before continuing. Do not skip a gate.

## Phase 1 — Read & plan

1. Read [`CHANGES.md`](../../CHANGES.md) at the repository root.
2. For every change listed in it, produce an implementation plan / design doc and
   write it to `plans/IMPLEMENTATION-PLAN.md`. The doc must contain, per change:
   - **Summary** — what the change is, in one or two sentences.
   - **Affected files** — the actual files you'll touch (verify they exist in the
     codebase; don't guess).
   - **Approach** — the concrete steps you'll take.
   - **Verification** — how you'll confirm it works (a command, a manual step, etc.).
   - **Risks / open questions** — anything the reviewer should weigh in on.
3. Do **not** modify any application code in this phase. Only create the plan doc.

⛔ **STOP.** Tell the user the plan is written to `plans/IMPLEMENTATION-PLAN.md`
and ask them to review and approve it. Wait for explicit approval before Phase 2.

## Phase 2 — Branch & implement

Only after the user approves the plan:

1. Run `git status`. The plan doc from Phase 1 (`plans/IMPLEMENTATION-PLAN.md`)
   will show as an untracked file — that is expected; leave it in place and do
   **not** ask about it. Only if there are *other*, unrelated uncommitted changes
   should you surface them and ask how to proceed.
2. Create and switch to a feature branch named `feature/<short-slug>`, where the
   slug is derived from the changes (e.g. `feature/edit-todo-text`).
3. Implement the changes exactly as described in the approved plan — nothing more.
   Make only the edits the plan calls for.
4. Run the verification steps from the plan and report the results honestly. If a
   step fails, fix it or surface the failure — do not claim success without
   evidence.
5. Do **not** commit yet.

⛔ **STOP.** Summarize the code changes (a `git diff --stat` plus a short
description) and ask the user to review and approve the implementation. Wait for
explicit approval before Phase 3.

## Phase 3 — Commit, publish & open PR

Only after the user approves the code changes. Then do **all** of the following
in sequence **without stopping again** — there is no further approval gate:

1. Stage everything, including the plan doc: `git add -A`. The commit **must**
   include `plans/IMPLEMENTATION-PLAN.md` — do not ask whether to include it.
2. Commit with a clear, conventional message that references the change(s)
   implemented, e.g. `feat: inline edit for todo text`.
3. Publish the feature branch: `git push -u origin <branch>`.
4. Open a pull request automatically with the GitHub CLI, targeting `main`:
   `gh pr create --base main --head <branch> --title "<title>" --body "<summary>"`.
   Derive the title and body from the implemented changes and the approved plan.
5. Report the branch name, commit hash, and the PR URL.

## Rules

- Honor every ⛔ STOP gate — never proceed past one on your own.
- Keep changes surgical: only what the approved plan specifies.
- If anything is ambiguous, ask before acting rather than guessing.
