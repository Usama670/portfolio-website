# Projects redesign verification

Scope: replaced the Projects section with Projects.tsx and its scoped Projects.css; updated project copy in the existing data file. ProjectCaseStudy.tsx has a supporting focus/scroll restoration fix. App.tsx changed only the project integration and removed the old project filter state. The global index.css is byte-for-byte unchanged, and other section markup is unchanged.

- TypeScript: passed.
- Vite production build via build-portable.mjs: passed.
- Browser console: no errors observed.
- All six projects verified with native page scrolling; the showcase remains pinned at 104px during its scroll track.
- Number, text, image, technology tags and progress update with the active project.
- Progress buttons support direct navigation; continue-past-projects link provides an exit without scroll trapping.
- Keyboard: project preview activation with Enter and case-study dismissal with Escape work.
- Project preview hover/focus overlay and visible link focus checked.
- Dark and light themes visually checked.
- Desktop 1440x900, compact desktop 1024x768, tablet 768x1024, and mobile 375x812 checked with no horizontal overflow.
- Tablet/mobile show all six projects in vertical flow, with information before images and action links after images.
- Reduced-motion branch checked through a server-render component harness with a mocked reduced-motion preference: six flow projects, no pinned track, six correct image paths, and only configured links. Browser-level OS preference emulation was unavailable.
- The existing project images remain illustrative placeholders. Missing live/GitHub links remain hidden.

Run: node build-portable.mjs
Preview: node preview-portable.mjs
Standard npm scripts remain configured for normal developer environments; the portable builder avoids the Windows child-process restrictions in this environment.
