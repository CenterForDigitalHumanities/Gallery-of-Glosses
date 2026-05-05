# Gallery of Glosses — Improvements Roadmap

This document outlines recommended next steps for the Gallery of Glosses platform, covering both technical improvements and academic/researcher-facing enhancements.

---

## Technical Improvements

### Short-Term (Low Effort, High Impact)

#### Performance
- **Parallel data fetching** — The `useGlossList`, `useManuscriptList`, and related hooks currently fetch and process each item sequentially inside a `for` loop. Replacing these with `Promise.all` or a batched parallel fetch would dramatically reduce initial load time for large collections.
- **Deduplicate the `expand` helper** — The same `expand(targetId)` pattern is copy-pasted across five hooks and two page components. Extract it into a shared utility function in `lib/utils.ts` to reduce maintenance burden and ensure consistent behavior.
- **Remove `makeAggregationQuery`/`makePagedQuery` duplication** — These two functions are nearly identical. Merge them into a single `makePagedQuery` that accepts optional pagination parameters.

#### Code Quality
- **Remove the duplicate Tailwind config** — Both `tailwind.config.js` and `tailwind.config.ts` exist. Keep only `tailwind.config.ts` for a consistent TypeScript-first setup.
- **Remove the self-referencing dependency** — `package.json` contains `"gallery-of-glosses": "file:"` which is a circular self-reference. Remove it.
- **Strengthen TypeScript types** — Several files use `any` types (e.g., `processGloss(gloss: any, ...)`). Define proper interfaces for RERUM annotation bodies and use them throughout. This will catch data-shape mismatches at compile time.
- **Add `loading` state to `useGlossInstance` and `useManuscriptInstance`** — These hooks currently expose no loading indicator, which may cause UI flicker or blank renders.

#### Testing
- **Add tests for `processManuscript` and `processWitnessFragment`** — The existing tests only cover `processGloss` and a few utility functions. Adding tests for the other processors will catch regressions in data transformation.
- **Add tests for the hooks** — Use `@testing-library/react` with `renderHook` to test that hooks correctly call utilities and update state. Consider adding `msw` (Mock Service Worker) to intercept real HTTP calls in tests without mocking `axios` directly.
- **Add integration/smoke tests** — Use Playwright or Cypress to verify that the Browse Glosses page loads and shows data, a gloss detail page renders, and the search/filter toolbar works end-to-end.
- **Enforce test coverage** — Add a Jest `coverageThreshold` in `jest.config.mjs` to prevent coverage from dropping below a minimum percentage on new PRs.

#### CI/CD
- **Add a test step to the publish workflow** — Currently `.github/workflows/publish.yml` builds and deploys but never runs tests. Add a `npm test` step before the build so broken tests block deployment.
- **Add a lint/type-check step** — Run `next lint` and `tsc --noEmit` as separate CI steps to catch type errors and lint violations before they reach the main branch.
- **Add a `version-bump` PR check** — The existing `version-bump.yml` workflow should be validated to ensure version bumps happen on releases, not just any push.

#### Accessibility & UX
- **Improve the error boundary** — The updated `error.tsx` now shows a retry button; extend this pattern by creating route-level `error.tsx` files inside `/browse`, `/gloss`, and `/manuscript` so that a failure in one section doesn't affect the rest of the site.
- **Add `aria-label` attributes to icon-only buttons** — The GitHub link and theme-toggle button in `Header.tsx` rely on screen-reader-only `<span>` elements. Verify these are announced correctly with a screen reader.
- **Add skip-to-main-content link** — Insert a visually-hidden "Skip to main content" link at the top of `Header.tsx` to improve keyboard navigation.
- **Announce loading state to screen readers** — The `BeatLoader` spinner in `DataTable.tsx` has no ARIA live region. Add `role="status"` and `aria-live="polite"` so assistive technologies announce when loading completes.
- **Improve page `<title>` and `<meta description>`** — Currently every page uses the same generic title ("Gallery of Glosses") and description ("Learn About Glosses"). Populate per-route metadata (e.g., gloss title, manuscript shelfmark) so search engines and browser tabs are more informative.

#### Security
- **Content Security Policy (CSP)** — Because the app is deployed as a static export, CSP headers must be set at the CDN or web server level (e.g., in `_headers` for Netlify/Cloudflare Pages, or `public/.htaccess` for GitHub Pages with a custom domain). Define a strict CSP that allows only the domains used (RERUM API, YouTube embeds, Google Fonts).
- **Subresource Integrity for YouTube embeds** — The YouTube `<iframe>` embeds on the home page and About page load third-party scripts. Consider replacing them with a privacy-respecting facade (click-to-load) to reduce tracking and page weight.
- **Audit `dangerouslySetInnerHTML` usage** — The docs pages (About, Resources, Terminology, Tips, etc.) render HTML strings from `src/configs/docs.ts` via `dangerouslySetInnerHTML`. The current content is static and developer-controlled, so this is low-risk; however, if the content source ever becomes user-editable (e.g., pulled from a CMS), a sanitization library such as `DOMPurify` must be introduced before rendering.

### Medium-Term

- **Migrate to React Query (already a dependency)** — `@tanstack/react-query` is listed in `package.json` but not yet used. Replacing the manual `useState`/`useEffect` data-fetching hooks with React Query `useQuery` hooks would provide automatic caching, background refetching, deduplication of requests, and built-in loading/error state management.
- **Server-side data fetching for SEO** — Because the project uses `output: 'export'` (fully static), consider pre-fetching all gloss and manuscript data at build time via `generateStaticParams` + server components, and caching the results. This would allow search engines to index full gloss content rather than relying on client-side rendering.
- **Implement the Compare tool** — `/tools/compare` currently renders a placeholder. A useful implementation would allow researchers to select two or more glosses (or witness fragments) side-by-side and highlight textual differences using a diff library.
- **Implement the Map tool** — `/tools/map` currently renders a placeholder. A leaflet- or MapLibre-based map showing manuscript provenance (`_originRegion`, `_originLocal`) would let researchers visually explore the geographic spread of glossing traditions.
- **Search across all fields** — The current filter only searches the column designated as `filterColumn`. A global full-text search across title, gloss text, canonical reference, and tags simultaneously would greatly improve discoverability.
- **Sortable columns** — TanStack Table already supports column sorting; enabling it in `DataTable.tsx` would let researchers sort glosses alphabetically, by date, or by canonical reference.

### Long-Term

- **Linked Data / JSON-LD export** — Expose each gloss and manuscript as a JSON-LD or RDF resource so that other Digital Humanities projects (SCTA, GLOSSAM, etc.) can consume Gallery of Glosses data programmatically.
- **IIIF deep-linking** — Where a manuscript has an `_iiifManifest` URL, embed a lightweight IIIF viewer (e.g., Clover) on the manuscript and witness pages so researchers can navigate directly from a gloss to its location in the digitized manuscript image.
- **Citation export** — Add a "Cite this gloss" feature that generates formatted citations (Chicago, MLA, Turabian) for individual gloss entries, making it easier for scholars to reference specific transcriptions in publications.

---

## Academic & Researcher-Facing Improvements

### Discovery & Search

- **Advanced search / faceted filtering** — Allow researchers to combine filters: language, document type, canonical reference range, tag, date of manuscript, provenance region. This is particularly valuable for comparative studies across multiple glossing traditions.
- **Browse by Section / Subsection** — The data already has `section` and `subsection` fields (e.g., Matthew 5:1). Expose these as browsable hierarchies so researchers can navigate directly to all glosses on a given chapter or verse.
- **Browse by Language** — Add a dedicated "Browse by Language" view to support researchers working on specific linguistic traditions (Latin, Old English, Old Irish, Middle French, etc.).
- **Browse by Creator / Glossator** — Where attribution data is available, expose it as a browsable dimension.

### Data Presentation

- **Render gloss text as formatted HTML** — Gloss text can have `textFormat: "text/html"`. Currently the raw HTML value is displayed as plain text in many views. Render it safely (with DOMPurify sanitization) so that italics, superscripts, and Latin abbreviations display correctly.
- **Parallel witness display** — On a gloss detail page, show the witness fragment texts side-by-side (or stacked with alignment) to facilitate collation. Highlight differences between witnesses.
- **IIIF Viewer integration** — Embed a panel on each witness/fragment page that loads the corresponding page in the manuscript's IIIF manifest, positioned at the correct folio. Researchers should be able to see the transcription and the original manuscript image together.
- **Persistent URLs with stable citations** — Ensure each gloss, manuscript, and witness has a stable, citable URL. Add a visible "Cite as" or "Permalink" element on each detail page.

### Collaboration & Contribution

- **Contribution guidelines page** — Add a `/docs/contributing` page explaining how scholars can submit new glosses via `glossing.rerum.io`, what data fields are expected, and editorial standards (orthographic normalization, canonical reference format, tagging conventions).
- **Attribution and provenance on detail pages** — Display the `creator` field (where present) on gloss and witness detail pages so that researchers can credit the scholar who transcribed a particular gloss.
- **Version history** — RERUM stores the full version history of every annotation. Expose a "History" tab or panel on gloss detail pages showing previous versions and their timestamps, supporting scholarly transparency about how transcriptions have evolved.
- **Data download / export** — Provide a CSV or JSON export of the full glosses dataset (or filtered subsets) for researchers who want to perform their own analyses in tools like R, Python, or Excel.

### Cross-Project Interoperability

- **Link to SCTA resources** — For glosses on scholastic texts, add deep links to the corresponding passage in the Scholastic Commentaries and Texts Archive (scta.info) so researchers can read the glossed text alongside the gloss.
- **Link to GLOSSAM** — Where a manuscript is also represented in the GLOSSAM database, provide a cross-reference link.
- **OAI-PMH or ResourceSync endpoint** — For institutional repositories and library discovery systems, expose a metadata harvest endpoint so that gallery records can be indexed by library catalogues.

### Pedagogy & Outreach

- **Guided tours / curated collections** — Allow editors to assemble thematic sets of glosses (e.g., "Glosses on Romans 1:1–7", "Glosses citing Augustine") that can be shared as persistent URLs for classroom use or conference presentations.
- **Expanded Terminology page** — Add definitions for discipline-specific terms (e.g., *glossa ordinaria*, *interlinear vs. marginal gloss*, *lemma*, *catena*) with bibliography to help students and researchers from adjacent fields orient themselves.
- **Multilingual UI** — Given that primary sources span multiple languages and the scholarly community is international, consider at minimum a French translation of the site interface, given the significant francophone medievalist community.
