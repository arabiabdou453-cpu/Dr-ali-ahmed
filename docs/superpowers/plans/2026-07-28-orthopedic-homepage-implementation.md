# Orthopedic Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Next.js 15 reproduction of the supplied Dr Ali Ahmed A homepage that is visually indistinguishable from the reference at 1440px.

**Architecture:** Use a strict App Router application with focused section components, typed static content, local WebP assets, and CSS geometry calibrated against Playwright screenshots. Navbar and Hero form a hard visual gate; no lower section is implemented until both pass repeated 1440px comparison.

**Tech Stack:** Next.js 15.1.11, React 19, strict TypeScript, Tailwind CSS 3.4, Framer Motion, Lucide React, Vitest, Testing Library, Playwright, Pixelmatch

## Global Constraints

- The 1440px orthopedic screenshot is the final visual authority.
- Main content width is exactly 1280px and centered.
- Page background is `#F8FAFC`; primary blue is `#0057B8`; dark navy is `#0B1F3A`; text gray is `#64748B`.
- Never redesign, modernize, reinterpret, simplify, or embellish the reference.
- Any difference in composition, crop, wrapping, position, height, spacing, alignment, type scale, shadow, or gradient is a bug.
- Verify every required image exists and decodes before referencing it.
- Decorative images use `alt=""`; missing images must fail validation before render.
- Asset generation is screenshot reconstruction, not independent creative work.
  A medically similar but visually different image is a failed asset.
- Every 1440px calibration pass produces an implementation capture and an
  automated pixel-diff image against an identically sized reference.
- Pixel-diff metrics locate defects; they never override human visual judgment
  or make a visually incorrect result acceptable.
- Every visual-acceptance capture uses Playwright Chromium only.
- Every capture must await `document.fonts.ready`; a screenshot taken before
  fonts finish loading is invalid and must not be compared.
- All visible wording, punctuation, capitalization, and reference line breaks
  are content-locked. Copy must not be rewritten or improved.
- Use no explicit or implicit `any`, suppression comments, unsafe double assertions, or weakened checks.
- Run formatting, lint, typecheck, tests, production build, and dependency audit before completion.
- Implementation order is Navbar → Hero → Feature cards → Specialties → Statistics → Lower section → Footer.
- Do not begin Feature cards until Navbar and Hero pass the 1440px visual gate.

---

## File Map

- `package.json`: pinned runtime and verification scripts.
- `tsconfig.json`: strict TypeScript configuration.
- `next.config.ts`: security response headers.
- `postcss.config.mjs`, `tailwind.config.ts`: styling toolchain.
- `src/app/layout.tsx`: Inter font, metadata, and document shell.
- `src/app/page.tsx`: ordered section composition only.
- `src/app/globals.css`: reset, design tokens, exact section geometry, responsive rules.
- `src/components/site-header.tsx`: desktop/mobile navigation.
- `src/components/hero.tsx`: hero copy, actions, image blend, and asset contract.
- `src/components/feature-cards.tsx`: four feature cards.
- `src/components/specialties.tsx`: six specialty cards.
- `src/components/statistics-bar.tsx`: four metrics.
- `src/components/lower-section.tsx`: profile, appointment form, and contact.
- `src/components/footer-features.tsx`: five footer benefits.
- `src/components/motion-reveal.tsx`: reduced-motion-aware reveal boundary.
- `src/content/homepage.ts`: readonly typed copy and icon mappings.
- `src/lib/assets.ts`: required asset manifest and filesystem validator.
- `src/lib/appointment.ts`: typed local form validation.
- `public/images/*.webp`: verified local imagery.
- `tests/assets.test.ts`: image presence and decode tests.
- `tests/appointment.test.ts`: form-validation tests.
- `tests/homepage.test.tsx`: semantic content/order tests.
- `tests/visual/navbar-hero.spec.ts`: 1440px gate capture.
- `tests/visual/full-page.spec.ts`: final 1440px capture.
- `tests/visual/reference-full-page-1440.png`: normalized clean orthopedic
  full-page reference supplied by the user.
- `tests/visual/reference-navbar-hero-1440.png`: initial-viewport reference crop
  derived from the normalized full-page reference.
- `scripts/visual-diff.mjs`: exact-dimension pixel comparison and highlighted
  diff artifact generation.
- `playwright.config.ts`, `vitest.config.ts`, `vitest.setup.ts`: test runners.

---

### Task 1: Foundation, Verification Tooling, and Asset Gate

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next-env.d.ts`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `tailwind.config.ts`
- Create: `.prettierrc.json`
- Create: `.gitignore`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/app/globals.css`
- Create: `src/lib/assets.ts`
- Create: `tests/assets.test.ts`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `playwright.config.ts`
- Copy: clean orthopedic screenshot to `tests/visual/reference-1440.png`
- Generate: `public/images/hero-doctor.webp`
- Generate: `public/images/doctor-profile.webp`
- Generate: `public/images/clinic-map.webp`

**Interfaces:**
- Produces: `REQUIRED_IMAGE_PATHS: readonly string[]`
- Produces: `validateRequiredImages(rootDirectory: string): Promise<readonly AssetValidation[]>`
- Produces: scripts `dev`, `build`, `start`, `format:check`, `lint`, `typecheck`, `test`, `test:visual`

- [ ] **Step 1: Create the pinned package manifest**

Use this dependency shape, retaining the exact major/minor framework target:

```json
{
  "name": "dr-ali-ahmed-orthopedic-homepage",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "format:check": "prettier --check .",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:visual": "playwright test",
    "visual:diff": "node scripts/visual-diff.mjs"
  },
  "dependencies": {
    "framer-motion": "^12.23.12",
    "lucide-react": "^0.468.0",
    "next": "15.1.11",
    "react": "19.0.0",
    "react-dom": "19.0.0"
  },
  "devDependencies": {
    "@playwright/test": "^1.54.1",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.1.0",
    "@types/node": "^22.10.5",
    "@types/pixelmatch": "^5.2.6",
    "@types/pngjs": "^6.0.5",
    "@types/react": "^19.0.3",
    "@types/react-dom": "^19.0.2",
    "autoprefixer": "^10.4.20",
    "eslint": "^8.57.1",
    "eslint-config-next": "15.1.11",
    "postcss": "^8.4.49",
    "prettier": "^3.4.2",
    "pixelmatch": "^6.0.0",
    "pngjs": "^7.0.0",
    "sharp": "^0.33.5",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.7.2",
    "vitest": "^2.1.8"
  }
}
```

- [ ] **Step 2: Install dependencies and browsers**

Run:

```powershell
npm install
npx playwright install chromium
```

Expected: lockfile created, Chromium installed, and no unresolved dependency error.

- [ ] **Step 3: Add strict framework and test configuration**

Configure TypeScript with `"strict": true`, `"noUncheckedIndexedAccess": true`,
the `@/*` path alias, and Next.js defaults. Configure Tailwind content paths for
`src/**/*.{ts,tsx}`. Configure Vitest for `jsdom`, setup file
`vitest.setup.ts`, and test discovery under `tests/**/*.test.{ts,tsx}`.

Configure Playwright with:

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/visual",
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  use: {
    baseURL: "http://127.0.0.1:3100",
    viewport: { width: 1440, height: 1200 },
  },
  webServer: {
    command: "npm run dev -- --port 3100",
    url: "http://127.0.0.1:3100",
    reuseExistingServer: true,
  },
});
```

Do not add Firefox or WebKit projects. Chromium is the sole browser for visual
acceptance.

- [ ] **Step 4: Add exact-dimension visual-diff tooling**

Create `scripts/visual-diff.mjs` with explicit reference, actual, and output
arguments. Decode both PNGs, fail when dimensions differ, and write a
high-contrast diff:

```js
import fs from "node:fs";
import path from "node:path";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

const [, , referencePath, actualPath, diffPath] = process.argv;

if (!referencePath || !actualPath || !diffPath) {
  throw new Error(
    "Usage: npm run visual:diff -- <reference.png> <actual.png> <diff.png>",
  );
}

const reference = PNG.sync.read(fs.readFileSync(referencePath));
const actual = PNG.sync.read(fs.readFileSync(actualPath));

if (reference.width !== actual.width || reference.height !== actual.height) {
  throw new Error(
    `Dimension mismatch: reference ${reference.width}x${reference.height}, actual ${actual.width}x${actual.height}`,
  );
}

const diff = new PNG({ width: reference.width, height: reference.height });
const mismatchedPixels = pixelmatch(
  reference.data,
  actual.data,
  diff.data,
  reference.width,
  reference.height,
  {
    threshold: 0.1,
    includeAA: true,
    alpha: 0.35,
    diffColor: [255, 0, 64],
    aaColor: [255, 184, 0],
  },
);

fs.mkdirSync(path.dirname(diffPath), { recursive: true });
fs.writeFileSync(diffPath, PNG.sync.write(diff));
process.stdout.write(
  `${JSON.stringify({ width: reference.width, height: reference.height, mismatchedPixels })}\n`,
);
```

Normalize the supplied clean reference once to 1440px width without changing
its aspect relationships, and preserve it at
`tests/visual/reference-full-page-1440.png`. Derive the Navbar + Hero gate
reference by cropping from the top of that normalized reference at the exact
initial-viewport height used by Playwright; preserve the crop at
`tests/visual/reference-navbar-hero-1440.png`. Never stretch either axis
independently.

- [ ] **Step 5: Add security headers**

Implement `headers()` in `next.config.ts` for all routes with:

```ts
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
] as const;
```

Use a CSP restricted to self-hosted scripts, styles, fonts, and images required
by Next.js development and production. Do not add HSTS to localhost.

- [ ] **Step 6: Write the failing asset test**

```ts
import { describe, expect, it } from "vitest";
import { validateRequiredImages } from "@/lib/assets";

describe("required homepage images", () => {
  it("finds three decodable WebP assets", async () => {
    const results = await validateRequiredImages(process.cwd());
    expect(results).toHaveLength(3);
    expect(results.every((result) => result.exists && result.isWebp)).toBe(true);
  });
});
```

- [ ] **Step 7: Run the focused test and confirm RED**

Run: `npm test -- tests/assets.test.ts`

Expected: FAIL because `@/lib/assets` and the image files do not exist.

- [ ] **Step 8: Generate and inspect all three image assets**

Use the image-generation workflow with the supplied orthopedic screenshots as
the controlling visual references. This is reconstruction, not creative asset
generation. Each result must preserve the reference subject, camera angle,
lighting, crop, composition, and subject positions. Generate:

- Hero: male orthopedic surgeon, age 35–45, white coat, modern white clinic,
  looking down at a realistic knee model, doctor and model right-weighted,
  blurred shelves, wide photographic crop.
- Profile: the same doctor facing camera with folded arms, white coat, clinic
  background, portrait crop.
- Map: light street-map preview with the clinic marker and zoom controls matching
  the screenshot.

Save as WebP at the exact required paths and visually inspect every file before
continuing. Reject any output whose doctor, anatomical model, camera angle,
lighting, crop, or composition is visually different from the reference, even
if it is medically accurate or aesthetically polished.

- [ ] **Step 9: Implement the typed asset validator**

```ts
import { access, readFile } from "node:fs/promises";
import path from "node:path";

export const REQUIRED_IMAGE_PATHS = [
  "public/images/hero-doctor.webp",
  "public/images/doctor-profile.webp",
  "public/images/clinic-map.webp",
] as const;

export interface AssetValidation {
  readonly path: string;
  readonly exists: boolean;
  readonly isWebp: boolean;
}

export async function validateRequiredImages(
  rootDirectory: string,
): Promise<readonly AssetValidation[]> {
  return Promise.all(
    REQUIRED_IMAGE_PATHS.map(async (relativePath) => {
      const absolutePath = path.join(rootDirectory, relativePath);
      try {
        await access(absolutePath);
        const bytes = await readFile(absolutePath);
        const isWebp =
          bytes.subarray(0, 4).toString("ascii") === "RIFF" &&
          bytes.subarray(8, 12).toString("ascii") === "WEBP";
        return { path: relativePath, exists: true, isWebp };
      } catch {
        return { path: relativePath, exists: false, isWebp: false };
      }
    }),
  );
}
```

- [ ] **Step 10: Run the focused test and confirm GREEN**

Run: `npm test -- tests/assets.test.ts`

Expected: PASS with three existing WebP assets.

- [ ] **Step 11: Create the minimal App Router shell**

Use `next/font/google` Inter in `layout.tsx`, French document language, exact
metadata, global background, and a temporary `<main data-testid="page-shell" />`
in `page.tsx`. Do not reference an image until Step 9 passes.

- [ ] **Step 12: Verify and commit**

Run:

```powershell
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build
npm audit --audit-level=high
```

Expected: every command exits 0.

Commit:

```powershell
git add package.json package-lock.json tsconfig.json next-env.d.ts next.config.ts postcss.config.mjs tailwind.config.ts .prettierrc.json .gitignore src tests public scripts playwright.config.ts vitest.config.ts vitest.setup.ts
git commit -m "chore: establish verified Next.js homepage foundation"
```

---

### Task 2: Navbar Pixel Gate

**Files:**
- Create: `src/components/site-header.tsx`
- Create: `src/content/homepage.ts`
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`
- Create: `tests/homepage.test.tsx`
- Create: `tests/visual/navbar-hero.spec.ts`

**Interfaces:**
- Produces: `SiteHeader(): JSX.Element`
- Produces: `NAV_ITEMS` as a readonly list of `{ label: string; href: string }`
- Visual output: exact 82px navbar at 1440px

- [ ] **Step 1: Write the failing navbar semantic test**

Test that the page renders the doctor name, subtitle, six navigation labels,
WhatsApp accessible name, and appointment CTA. Assert the header has
`data-section="navbar"`.

- [ ] **Step 2: Run the focused test and confirm RED**

Run: `npm test -- tests/homepage.test.tsx`

Expected: FAIL because `SiteHeader` is absent.

- [ ] **Step 3: Implement the minimal typed navbar**

Create readonly navigation content and a semantic header using Lucide
`Bone`, `MessageCircle`, and `CalendarDays`. Use real anchors, `aria-current`
for Accueil, and visible focus styles.

- [ ] **Step 4: Implement exact desktop geometry**

In `globals.css`, set:

```css
.site-header {
  height: 82px;
  border-bottom: 1px solid #e8eef5;
  background: #fff;
}

.site-header__inner {
  width: min(1280px, calc(100% - 64px));
  height: 100%;
  margin-inline: auto;
  display: grid;
  grid-template-columns: 292px 1fr 247px;
  align-items: center;
}
```

Calibrate logo, nav gaps, underline, WhatsApp control, and CTA to the exact
reference dimensions. Add a non-disruptive mobile collapse below 900px.

- [ ] **Step 5: Add the navbar screenshot capture**

```ts
import { expect, test } from "@playwright/test";

test("captures the navbar and hero gate at 1440px", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  await expect(page.locator('[data-section="navbar"]')).toHaveCSS(
    "height",
    "82px",
  );
  await page.screenshot({
    path: "tests/visual/output/navbar-hero-1440.png",
    fullPage: false,
  });
});
```

Every later screenshot test must use the same awaited font-loading block
immediately before `page.screenshot()`. Automated diff commands must never run
against a capture produced before that wait completes.

- [ ] **Step 6: Run semantic checks**

Run:

```powershell
npm test -- tests/homepage.test.tsx
npm run typecheck
```

Expected: PASS.

- [ ] **Step 7: Run the first navbar screenshot**

Run: `npx playwright test tests/visual/navbar-hero.spec.ts`

Expected: screenshot created at 1440px. The first render is explicitly rejected
as uncalibrated.

- [ ] **Step 8: Compare and correct navbar geometry**

Inspect the reference and output side by side. Correct every difference in
82px height, 32px outer alignment, logo size, name/subtitle baseline, nav
centering, 32px item gaps, underline position, icon controls, CTA dimensions,
border, and typography.

- [ ] **Step 9: Generate and inspect the navbar diff artifact**

Run:

```powershell
npm run visual:diff -- tests/visual/reference-navbar-hero-1440.png tests/visual/output/navbar-hero-1440.png tests/visual/output/navbar-hero-diff-1440.png
```

Expected: identical dimensions and a highlighted diff image. Use the diff to
locate geometry, spacing, typography, color, shadow, and alignment defects.

- [ ] **Step 10: Capture the second navbar screenshot and diff**

Run: `npx playwright test tests/visual/navbar-hero.spec.ts`

Expected: a new screenshot with all identified navbar defects corrected. Repeat
Steps 8–10 until no observable navbar difference remains.

Navbar acceptance requires the reference crop, actual
`navbar-hero-1440.png` initial-viewport capture, and generated
`navbar-hero-diff-1440.png` compared at identical dimensions. Passing code,
computed-style assertions, tests, or manual inspection without the automated
diff artifact does not pass the gate.

- [ ] **Step 11: Commit the accepted navbar**

```powershell
git add src/components/site-header.tsx src/content/homepage.ts src/app/page.tsx src/app/globals.css tests/homepage.test.tsx tests/visual/navbar-hero.spec.ts
git commit -m "feat: reproduce the reference navbar"
```

---

### Task 3: Hero Pixel Gate

**Files:**
- Create: `src/components/hero.tsx`
- Create: `src/components/motion-reveal.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`
- Modify: `tests/homepage.test.tsx`
- Modify: `tests/visual/navbar-hero.spec.ts`

**Interfaces:**
- Produces: `Hero(): JSX.Element`
- Consumes: `/images/hero-doctor.webp`
- Visual output: exact 380px hero with a 620px by 300px blended image

- [ ] **Step 1: Write the failing hero semantic and geometry tests**

Assert exact badge, heading text, paragraph, both actions, empty decorative image
alternative text, `data-section="hero"`, and a Playwright computed height of
380px.

- [ ] **Step 2: Run tests and confirm RED**

Run:

```powershell
npm test -- tests/homepage.test.tsx
npx playwright test tests/visual/navbar-hero.spec.ts
```

Expected: FAIL because Hero is absent.

- [ ] **Step 3: Implement the hero structure**

Use semantic copy and a local `next/image` import. Apply `alt=""`, explicit
priority loading, and a motion wrapper that renders static geometry and disables
animation when reduced motion is requested.

- [ ] **Step 4: Implement exact hero typography and geometry**

Set 380px section height, 45% / 55% columns, 56px/1.1 heading, 18px paragraph,
28px badge, 48px buttons, and a 620px by 300px image stage. The heading must
wrap exactly after “mobilité,” and only “priorité” is blue.

- [ ] **Step 5: Implement the non-card image blend**

The image stage must have no border, shadow, or white card surface. Use the
reference radius only on the outer right crop and a left overlay:

```css
.hero__media::before {
  content: "";
  position: absolute;
  inset: 0 auto 0 0;
  z-index: 1;
  width: 34%;
  background: linear-gradient(90deg, #f8fafc 0%, rgba(248, 250, 252, 0) 100%);
  pointer-events: none;
}
```

Tune width and stops from screenshot comparison; do not keep these initial
values if the transition differs from the reference.

- [ ] **Step 6: Run semantic and type checks**

Run:

```powershell
npm test -- tests/homepage.test.tsx
npm run typecheck
```

Expected: PASS.

- [ ] **Step 7: Capture the first complete Navbar + Hero screenshot**

Run: `npx playwright test tests/visual/navbar-hero.spec.ts`

Expected: a fresh 1440px screenshot. Reject this first combined render.

- [ ] **Step 8: Compare hero composition at pixel level**

Inspect the reference and output at the same display scale. Record and correct
every discrepancy in hero top offset, left column origin, badge, heading
baseline and wrap, paragraph width, button position, photo dimensions, doctor
position, knee-model position, crop, radius, and white gradient transition.
Treat wording, punctuation, capitalization, and line wrapping as immutable
reference geometry; do not rewrite copy to make the layout easier to match.

- [ ] **Step 9: Generate and inspect the Navbar + Hero diff**

Run the exact-dimension diff command against the initial-viewport reference.
Use the highlighted output to identify geometry, crop, typography, color,
shadow, gradient, and alignment defects.

- [ ] **Step 10: Recrop or regenerate the hero asset when CSS cannot fix composition**

If doctor or knee-model placement differs after `object-position` calibration,
replace the source WebP using the supplied reference as the composition target.
Re-run `npm test -- tests/assets.test.ts` before rendering the replacement.

- [ ] **Step 11: Capture and diff the corrected Navbar + Hero screenshot**

Run: `npx playwright test tests/visual/navbar-hero.spec.ts`

Expected: a second screenshot reflecting all recorded fixes.

- [ ] **Step 12: Repeat the comparison loop until the gate passes**

Repeat Steps 8–11. Do not implement Task 4 while any Navbar or Hero difference
is visible in either manual inspection or the automated diff at 1440px.

Hero acceptance requires an actual 1440px initial-viewport capture and direct
visual comparison evidence plus the preserved automated diff artifact. Unit
tests, geometry assertions, and a successful build are supporting checks only;
none can substitute for the screenshot and diff comparison.

- [ ] **Step 13: Run the gate verification and commit**

Run:

```powershell
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build
```

Expected: all pass and Navbar + Hero are visually indistinguishable.

Commit:

```powershell
git add src/components/hero.tsx src/components/motion-reveal.tsx src/app/page.tsx src/app/globals.css public/images/hero-doctor.webp tests
git commit -m "feat: pass the navbar and hero pixel gate"
```

---

### Task 4: Feature Cards

**Files:**
- Create: `src/components/feature-cards.tsx`
- Modify: `src/content/homepage.ts`
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`
- Modify: `tests/homepage.test.tsx`
- Modify: `tests/visual/full-page.spec.ts`

**Interfaces:**
- Produces: `FeatureCards(): JSX.Element`
- Consumes: four readonly feature definitions

- [ ] Write a failing test for four exact titles and descriptions.
- [ ] Implement four 280px by 95px cards, 24px gaps, 45px icon boxes, and exact
overlap without covering Hero actions.
- [ ] Capture at 1440px, reject the first render, compare, correct, and recapture
until card positions, shadow, radius, copy wrapping, and overlap match.
- [ ] Run `npm test`, `npm run typecheck`, and commit with
`feat: reproduce the feature cards`.

---

### Task 5: Specialties

**Files:**
- Create: `src/components/specialties.tsx`
- Modify: `src/content/homepage.ts`
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`
- Modify: `tests/homepage.test.tsx`
- Modify: `tests/visual/full-page.spec.ts`

**Interfaces:**
- Produces: `Specialties(): JSX.Element`
- Consumes: six readonly specialty definitions

- [ ] Write a failing test for the exact heading and six ordered specialties.
- [ ] Implement the centered heading and six 180px cards with reference Lucide
outline icons, descriptions, and links.
- [ ] Capture, reject, compare, correct, and recapture until height, gaps, icon
scale, copy wrapping, shadow, and link baselines match.
- [ ] Run focused tests and commit with `feat: reproduce specialties`.

---

### Task 6: Statistics Bar

**Files:**
- Create: `src/components/statistics-bar.tsx`
- Modify: `src/content/homepage.ts`
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`
- Modify: `tests/homepage.test.tsx`
- Modify: `tests/visual/full-page.spec.ts`

**Interfaces:**
- Produces: `StatisticsBar(): JSX.Element`

- [ ] Write a failing test for the four exact values and labels.
- [ ] Implement the 75px `#0B1F3A` to `#0057B8` bar with equal items.
- [ ] Capture, reject, compare, correct, and recapture until gradient, radius,
item positions, icon size, and text baselines match.
- [ ] Run focused tests and commit with `feat: reproduce statistics bar`.

---

### Task 7: Lower Section and Local Appointment Validation

**Files:**
- Create: `src/components/lower-section.tsx`
- Create: `src/lib/appointment.ts`
- Create: `tests/appointment.test.ts`
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`
- Modify: `tests/homepage.test.tsx`
- Modify: `tests/visual/full-page.spec.ts`

**Interfaces:**
- Produces: `validateAppointment(input: AppointmentInput): ValidationResult`
- Produces: `LowerSection(): JSX.Element`

- [ ] Write failing tests for empty fields, malformed phone, excessive lengths,
and a valid local-only form.
- [ ] Implement discriminated `ValidationResult` types and bounded field
validation without storage, logging, or transmission.
- [ ] Implement the three equal visual columns and exact supplied content using
the verified profile and map assets with `alt=""`.
- [ ] Capture, reject, compare, correct, and recapture until column sizes, form
controls, portrait crop, map crop, spacing, and typography match.
- [ ] Run tests and commit with `feat: reproduce lower appointment section`.

---

### Task 8: Footer Feature Strip and Responsive Completion

**Files:**
- Create: `src/components/footer-features.tsx`
- Modify: `src/content/homepage.ts`
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`
- Modify: `tests/homepage.test.tsx`
- Modify: `tests/visual/full-page.spec.ts`

**Interfaces:**
- Produces: `FooterFeatures(): JSX.Element`

- [ ] Write a failing test for the five exact footer benefits.
- [ ] Implement the desktop strip, reference icons, dividers, type, and height.
- [ ] Add tablet/mobile rules without altering geometry at 1440px.
- [ ] Capture, reject, compare, correct, and recapture the footer and full page.
- [ ] Test keyboard focus, 320px overflow, and reduced motion.
- [ ] Commit with `feat: complete responsive orthopedic homepage`.

---

### Task 9: Final Visual and Production Verification

**Files:**
- Modify only files with evidence-backed discrepancies.
- Produce: `tests/visual/output/final-1440.png`

**Interfaces:**
- Consumes: all completed sections
- Produces: verified production build and final screenshot

- [ ] Start from a clean 1440px full-page capture and compare it with the
reference.
- [ ] Ensure the full-page test uses
  `page.screenshot({ path: "tests/visual/output/final-1440.png", fullPage: true })`;
  the Navbar/Hero gate remains an initial-viewport capture with
  `fullPage: false`.
- [ ] Confirm the full-page Chromium test awaits `document.fonts.ready`
  immediately before capture. Reject and regenerate any artifact captured
  without the completed font wait.
- [ ] Treat every visible discrepancy as a bug; make one minimal correction at
a time and recapture.
- [ ] After every recapture, run `npm run visual:diff` against the identically
sized full-page reference and inspect the highlighted mismatch regions.
- [ ] Confirm the three WebP assets exist and decode.
- [ ] Run `npm run format:check`.
- [ ] Run `npm run lint`.
- [ ] Run `npm run typecheck`.
- [ ] Run `npm test`.
- [ ] Run `npm run test:visual`.
- [ ] Run `npm run build`.
- [ ] Run `npm audit --audit-level=high`.
- [ ] Inspect `git diff --check` and `git status --short`.
- [ ] Preserve the final full-page comparison image as visual evidence. Do not
declare acceptance from code or automated checks alone.
- [ ] Preserve all three final artifacts:
  `tests/visual/reference-full-page-1440.png`,
  `tests/visual/output/final-1440.png`, and
  `tests/visual/output/final-diff-1440.png`.
- [ ] Review the diff artifact manually. Do not optimize only for
`mismatchedPixels`; the reference remains the sole visual authority.
- [ ] Compare every visible string against the reference and correct any
wording, punctuation, capitalization, or line-break difference as a visual
defect.
- [ ] Commit verified corrections with
`fix: align final homepage with reference`.
