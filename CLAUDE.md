# CLAUDE.md — Launchpad98

> **For AI coding agents (Claude Code, ChatGPT Codex, and others):**
> This file is the canonical project instruction manual. Read it before making any changes.
> Claude Code reads this file automatically. Codex agents: see also `AGENTS.md`.
> All instructions are platform-neutral — follow them regardless of which agent you use.
>
> **For the developer:** This is your architecture reference for the Launchpad98 project.

<!--
AGENT COMPATIBILITY NOTE:
- Claude Code: reads CLAUDE.md automatically
- ChatGPT Codex: reads AGENTS.md, which redirects here
- Other agents: should be pointed to this file
-->

---

## What This Project Is

**Launchpad98** is a drop-in Max for Live OSD overlay for hdavid's Launchpad95.
Users copy the Launchpad98 folder into their Ableton MIDI Remote Scripts alongside
an existing Launchpad95 install. It does NOT modify LP95's Python — it reads LP95's
M4LInterface properties via LiveAPI from a separate M4L device.

### Key Components
- **L95_ext.js** — Max JS bridge script. Discovers LP95's control surface via LiveAPI,
  observes mode changes, reads attributes, and routes OSD template data to the display.
  This is the main code file and the primary refactor target.
- **Launchpad98OSD.amxd** — Max for Live device containing the JS, patchers, and UI.
  Binary file — edit in Max GUI only.

### License
GPL-3.0

---

## Current State & Refactoring Goals

This is a **refactor/optimization pass only**. No new features.

### Known Issues in L95_ext.js
1. **12 duplicate function definitions** — every function is defined twice (first definition,
   then a "DEBUG OVERRIDES" version). Max JS uses last definition only, so the first 12
   are dead code. Remove them.
2. **Repeated `att_0..att_7` / `att_n_0..att_n_7` patterns** — 16 individual observer
   callbacks that should be arrays iterated in a loop.
3. **Mode string matching** — fragile string parsing of `osd.mode` to determine which
   template to load. Should be consolidated into a single `resolve_mode_id()` function
   with a lookup table.
4. **No error handling** — LiveAPI calls have no null checks or try/catch. If LP95 isn't
   loaded, the script crashes silently.
5. **No boot retry** — if the M4L device loads before LP95 is initialized, discovery
   fails permanently. Needs a retry loop with backoff.
6. **Console spam** — bare `post()` calls everywhere with no gating. Should use
   `if (LOG_ENABLED) post(...)` pattern.
7. **No debounce on mode changes** — rapid mode switching causes redundant template loads.

### Refactoring Rules
- **Behavior must be identical** — every observable behavior must remain the same.
  The OSD must display the same templates, the same labels, the same colors.
- **No new features** — no mode_id, no pad_colors, no JWeb grid. Those are Launchpad2000.
- **ES5 only** — Max JS engine. No let/const/arrow/class/Promise/template literals.
- **post() not console.log** — Max JS has no console object.
- **Test after every change** — load in Ableton, switch through all modes, verify OSD.

---

## File Structure

```
/                              # repo root
├── Launchpad98/               # the installable folder (copied to MIDI Remote Scripts)
│   ├── Launchpad98OSD.amxd    # M4L device (binary — edit in Max only)
│   └── ... (any resources bundled inside the .amxd)
├── CLAUDE.md                  # THIS FILE
├── AGENTS.md                  # Codex entry point
├── .claude/
│   └── settings.json          # Claude Code permissions
├── .codex/
│   └── config.toml            # Codex CLI config
├── README.md
├── LICENSE
├── .gitignore
├── demo.png
└── toggledsections.png
```

**Note**: `L95_ext.js` lives INSIDE `Launchpad98OSD.amxd`. To edit it, open the
`.amxd` in Max, find the `js` object, and the script file will be in the device's
resources. For refactoring, extract a working copy to the repo root, edit it, then
re-import into the `.amxd` in Max.

If there is a standalone `L95_ext.js` already at the repo root or in a subfolder,
edit that directly — it's the authoritative copy.

---

## Technology Stack & Constraints

### Max JS (`js` object) — ES5 Only
```
NO: let, const, arrow functions, template literals, class, Promise,
    destructuring, for...of, Map/Set, import/export, require()
YES: var, function, string concatenation, for loops, post()
```

### Available Globals
```javascript
post("msg");              // Max console (NOT console.log)
error("msg");             // Max console error
outlet(n, value);         // Send to outlet n
new Dict("name");         // Max named dictionary
new LiveAPI(cb, "path");  // Live Object Model
new Task(fn, this);       // Scheduled callback (replaces setTimeout)
autowatch = 1;            // Auto-reload on save
```

### LiveAPI Rules
- **Never instantiate in global scope** — wait for `bang()` or `loadbang()`
- **Observer-driven, never poll** — use `api.property = "name"` with callbacks
- **Cleanup**: set `api.property = ""` before discarding to prevent ghost callbacks
- **IDs are ephemeral** — never store across sessions

### Performance Rules
- Gate all logging: `if (LOG_ENABLED) post(...);`
- No `post()` in hot paths (attribute observer callbacks)
- Throttle mode changes with 50ms debounce via `Task`
- Cache template data — don't reload on every mode switch if mode hasn't changed
- Reuse LiveAPI objects where possible instead of creating new ones per callback

---

## Refactoring Prompts (for Claude Code, Codex, or any agent)

Execute these in order. Git commit after each step. Test in Ableton between steps.

```
1. "Read L95_ext.js completely. Identify all duplicate function definitions
   (functions defined twice where Max JS only uses the last definition).
   List them but do NOT edit yet. Output a summary of what you found."

2. "Remove all first-definition duplicates from L95_ext.js. Keep only the
   second (DEBUG OVERRIDES) version of each function. Remove the
   '// ===== DEBUG OVERRIDES =====' markers. Verify the file still has
   exactly one definition of each function. Do not change any logic."

3. "Refactor att_0 through att_7 and att_n_0 through att_n_7 observer
   callbacks into array-based loops. Create a single observer setup
   function that iterates 0..7 and registers callbacks. The observable
   behavior must be identical — same attributes, same values, same timing."

4. "Consolidate all mode string matching into a single resolve_mode_id()
   function with a lookup table mapping mode strings to template names.
   Replace all scattered if/else chains that match on mode strings with
   calls to this function. Do not change which template is loaded for
   any given mode."

5. "Add error handling: wrap all LiveAPI instantiations and property reads
   in try/catch. Add null checks on getnamed() calls. If LP95 is not found,
   log once and stop — don't spam the console. Add a boot retry pattern:
   if discovery fails on loadbang, retry every 500ms up to 10 times with
   a Task, then give up with a single error message."

6. "Add a LOG_ENABLED flag (var LOG_ENABLED = 0;) at the top of the file.
   Wrap every post() call in 'if (LOG_ENABLED)' guards. Exception: the
   boot discovery success/failure messages should always print."

7. "Add a 50ms debounce on mode switch handling using a Task. If a new mode
   arrives within 50ms of the previous one, cancel the pending template
   load and use the newest mode only."

8. "Final review: check for unused variables, unreachable code, any
   remaining bare post() calls, and verify ES5 compliance (no let/const/
   arrow/template literals). List anything found."
```

---

## Related Projects

| Project | Relationship |
|---------|-------------|
| [hdavid/Launchpad95](https://github.com/hdavid/Launchpad95) | The control surface script this OSD reads from |
| [LarsonRogers/Launchpad2000](https://github.com/LarsonRogers/Launchpad2000) | Fork of LP95 with integrated OSD (successor to this project) |
