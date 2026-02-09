# AGENTS.md — Launchpad98

> **This file exists for ChatGPT Codex compatibility.** Codex reads `AGENTS.md`
> automatically. All project instructions live in `CLAUDE.md`.

## Before Writing Any Code

Read `CLAUDE.md` — it contains the full architecture, constraints, known issues,
and step-by-step refactoring prompts.

## Quick Constraints

- **This is a refactor-only pass. No new features.**
- **Max JS = ES5 only.** No `let`, `const`, arrow functions, template literals,
  `class`, `Promise`. Use `var`, `function`, string concatenation.
- **Max JS ≠ Node.js.** No `console.log` (use `post()`), no `require()`, no
  `setTimeout` (use `new Task()`), no `fetch()`, no `window`/`document`.
- **LiveAPI: never in global scope.** Wait for `bang()` or `loadbang()`.
- **Gate all logging:** `if (LOG_ENABLED) post(...);`
- **Behavior must be identical.** Same templates, same labels, same colors, same
  mode routing. If it worked before, it must work identically after.
- **The `.amxd` file is binary.** Only edit `.js` and `.json` files. The `.amxd`
  must be edited in the Max GUI.

## Project Summary

Launchpad98 is a drop-in Max for Live OSD overlay for Launchpad95. The main code
file is `L95_ext.js` — a Max JS bridge script with 12 duplicate function definitions,
no error handling, and scattered mode string matching. The refactoring goal is to
clean it up without changing any observable behavior.
