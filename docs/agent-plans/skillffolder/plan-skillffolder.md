# Plan — Skillffolder

## Design direction

The screenshot is a reference for a light paper surface, serif title,
fine blue rules, and calm technical precision. This MVP changes the information
architecture: instead of a four-step vertical timeline, a single workbench makes
the input and generated result visible together.

| Token | Value | Reason |
| --- | --- | --- |
| Paper | `#f8f8f5` | quiet, editorial background |
| Ink | `#12213a` | high-legibility technical text |
| Signal blue | `#1769ff` | selected states and executable actions |
| Mist | `#e8eef8` | restrained grouping surface |
| Success | `#188a5a` | completed generation feedback |

Display text uses `DM Serif Display`; UI and code use `DM Sans` and `DM Mono`.
The signature is a visible command line that updates from the request and becomes
the generation action.

## Implementation

1. Add the standalone project with `index.html`, `styles.css`, `app.js`,
   `project.json`, and `README.md`.
2. Implement editable prompt fields and derived resource command.
3. Simulate the generator with loading, success, empty, and error states;
   populate an accessible generated-file list.
4. Keep all dependencies local to the project and all asset paths relative.

## Verification

1. Run `npm run build`; assert the generated manifest contains `skillffolder`.
2. Serve `dist`, check central and direct project paths.
3. Check desktop and narrow layouts, keyboard actions, visible focus, console,
   and the prompt/generation states.

## Delivery

1. Inspect the final diff and stage only project and planning files.
2. Commit, push, open a draft PR, and wait for GitHub Actions to succeed.
3. Record the PR and verification evidence in `MEMORY.md` and `TODO.md`.
