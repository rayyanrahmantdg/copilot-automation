---
mode: agent
description: Read CHANGES.md, propose a design doc, then (after approval) implement on a feature branch and commit.
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

1. Confirm the working tree is clean (`git status`). If it isn't, surface that and
   ask how to proceed.
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

## Phase 3 — Commit

Only after the user approves the code changes:

1. Stage the changes (`git add -A`).
2. Commit with a clear, conventional message that references the change(s)
   implemented, e.g. `feat: inline edit for todo text`.
3. Report the resulting branch name and commit hash. Do **not** push or open a PR
   unless the user asks.

## Rules

- Honor every ⛔ STOP gate — never proceed past one on your own.
- Keep changes surgical: only what the approved plan specifies.
- If anything is ambiguous, ask before acting rather than guessing.
