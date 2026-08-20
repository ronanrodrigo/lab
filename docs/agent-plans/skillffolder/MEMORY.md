# Skillffolder — Memory

## Context

Create a static MVP in `ronanrodrigo/lab` for developers to understand and
exercise the scripts and functions supplied by `architecture-guided-development`.
The project lives in `skillffolder/` and publishes under `/lab/skillffolder/`.

## Confirmed decisions

- Canonical repository: `ronanrodrigo/lab` on `main`; the former `playground`
  reference is a redirect/stale name.
- The repository instruction file is lowercase `agents.md`.
- The MVP is HTML, CSS and vanilla JavaScript, with simulated local output.
- The primary journey is: edit a request → inspect the derived generator command
  → run the simulated generator → inspect the generated file manifest.
- Visual reference: user-provided Skillffolder screenshot. Preserve its light,
  editorial, technical character, but use a new prompt-to-generation composition.
- No external API or fallback data is needed.

## Relevant references

- [Briefing](../../../../../../.codex/attachments/b4a9759e-6e86-4994-b7a9-a9d31408b901/pasted-text.txt)
- [Repository guidance](../../../agents.md)
- [Plan](plan-skillffolder.md)
- [Task board](TODO.md)

## Current state

The isolated worktree is at
`/Users/ronan/Developer/worktrees/lab-skillffolder` on `codex/skillffolder`.
The MVP and its design QA are complete locally. `npm run build` includes the
project in the generated manifest; browser verification confirmed the main flow,
hub listing, narrow layout and clean console. Git delivery remains.
