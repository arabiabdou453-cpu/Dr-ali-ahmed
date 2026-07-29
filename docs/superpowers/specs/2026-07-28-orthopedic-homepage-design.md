# Orthopedic Homepage Reverse-Engineering Specification

## Objective

Reproduce the supplied “Dr Ali Ahmed A” orthopedic homepage reference at a
1440px desktop viewport as a functional Next.js website. The screenshots are
the final visual authority. The implementation must not redesign, modernize,
reinterpret, simplify, or embellish the reference.

The acceptance threshold is visual indistinguishability, not similarity or
general polish. A person comparing the reference screenshot with a 1440px
localhost screenshot must not be able to distinguish them visually.

The pink pediatric reference is out of scope.

## Project Classification

This is a small static landing page. It has no authentication, database,
payment processing, or live medical-data submission. The appointment form is a
client-side demonstration and must not imply that an appointment was stored or
sent.

## Technology

- Next.js 15 with the App Router
- Strict TypeScript with no `any` or type-safety bypasses
- Tailwind CSS
- Framer Motion
- Lucide React icons
- Inter typography

## Visual Source of Truth

The two blue orthopedic screenshots supplied by the user are the visual source
of truth:

- The clean 1440px homepage screenshot determines composition and appearance.
- The annotated/specification screenshot provides measurements, palette,
  typography, assets, and section-height guidance.

If written measurements conflict with a clearly visible relationship in the
clean screenshot, the clean screenshot wins.

## Desktop Canvas

- Reference viewport: 1440px wide
- Main content: 1280px maximum width, centered
- Page background: `#F8FAFC`
- Primary blue: `#0057B8`
- Dark navy: `#0B1F3A`
- Text gray: `#64748B`
- White surfaces: `#FFFFFF`
- Standard card radius: 18px
- Standard card shadow: `0 8px 30px rgba(0, 0, 0, 0.08)`

Vertical rhythm, card widths, gaps, text wrapping, and crop positions must be
calibrated against the reference rather than inferred from generic design
defaults.

## Page Structure

### 1. Navbar

- Exactly 82px high with white background and a 1px `#E8EEF5` bottom border.
- Left cluster: 48px circular orthopedic logo, doctor name, and blue subtitle.
- Center: six navigation items with 32px gaps; “Accueil” has a 2px underline.
- Right: 42px bordered WhatsApp control and a 185px by 46px appointment CTA.
- Desktop horizontal alignment must match the reference at 1440px.

### 2. Hero

- Exactly 380px high using a 45% / 55% two-column composition.
- Left content: expertise badge, two-line 56px headline, 18px supporting copy,
  and two 48px-high actions.
- Only “priorité” uses primary blue.
- The hero photograph is not a card and must not read as a separate boxed
  component.
- The photograph occupies exactly 620px by 300px, with the doctor on the
  right and the knee model close to the right edge.
- A left-side white gradient transition blends the photograph into the hero
  background. Crop, focal position, and gradient strength are calibrated
  against the reference.

### 3. Feature Cards

- Four cards only, ordered Expertise, Technologie, Accompagnement, Suivi
  personnalisé.
- Four equal columns with 24px gaps.
- Each desktop card is exactly 280px by 95px.
- Cards overlap the lower hero boundary by the reference amount without
  covering the hero actions.
- Each card uses a 45px blue icon square and the exact supplied copy.

### 4. Specialties

- Centered “Nos spécialités” heading at 32px bold.
- Six equal cards in one desktop row, each 180px high.
- Exact order: Chirurgie du genou, Prothèse de hanche, Traumatologie,
  Arthroscopie, Colonne vertébrale, Médecine sportive.
- Blue outline icons, supplied descriptions, and “En savoir plus →” links.

### 5. Statistics

- One 75px rounded bar with a left-to-right `#0B1F3A` to `#0057B8` gradient.
- Four equal items: 1500+, 15+, 98%, and 5★ with their supplied labels.
- White outline icons and white typography.

### 6. Lower Section

- Three equal desktop columns.
- Left: doctor profile image, title, paragraph, credentials, and detail link.
- Center: appointment form with five 48px-high controls and one booking CTA.
- Right: address, phone, email, opening hours, and local map preview.
- Form interaction remains local. Required fields are validated without
  transmitting or persisting personal data.

### 7. Footer Feature Strip

- Five horizontal items matching the reference: Soins de qualité,
  Rendez-vous rapides, Accompagnement, Sécurité & Hygiène, and Facilités de
  paiement.
- Preserve the reference icon scale, dividers, typography, and strip height.

## Asset Contract

The following files must exist before any component references them:

- `public/images/hero-doctor.webp`
- `public/images/doctor-profile.webp`
- `public/images/clinic-map.webp`

Assets are generated or prepared first, then inspected for correct format,
dimensions, composition, and readability. Rendering must never begin with a
missing source.

Images use intentional empty alternative text where they are decorative, so
the browser never exposes visible fallback text. A missing or invalid image is
a failed validation condition, not a state the page is allowed to render.

## Responsive Behavior

Desktop fidelity at 1440px is the primary acceptance target. Tablet and mobile
layouts adapt without horizontal overflow:

- Navigation collapses to an accessible mobile control.
- Multi-column card rows reduce to two columns and then one column.
- Hero content and image stack while retaining content order.
- Statistics and footer items wrap cleanly.
- Text remains readable, controls remain reachable, and focus indicators remain
  visible.

Responsive changes must preserve the desktop proportions at and above the
reference breakpoint.

## Motion

Framer Motion is limited to subtle initial reveals and reference-compatible
hover feedback. Motion must not change final geometry or introduce visual
elements absent from the reference. `prefers-reduced-motion` is respected.

## Security and Data Handling

- No secret or private environment variable is used in client code.
- Appointment values remain local and are not logged, stored, or transmitted.
- Inputs have explicit types, length constraints, and client-side validation.
- Next.js security headers include content-type protection, referrer policy,
  frame restrictions, permissions policy, and a content security policy
  compatible with the actual asset sources.
- Dependency installation is reviewed and the final dependency tree is audited.

## Required Implementation and Validation Order

Work proceeds strictly in this sequence:

1. Navbar
2. Hero
3. Feature cards
4. Specialties
5. Statistics
6. Lower section
7. Footer feature strip

The Navbar and Hero form a hard implementation gate. The remaining page must
not be implemented until both match the reference at 1440px. The Hero receives
the highest visual-calibration priority because it occupies the largest portion
of the viewport and contains the most composition-sensitive asset.

Before moving to the next section:

1. Run the application.
2. Capture a 1440px-wide screenshot of the implemented state.
3. Compare it with the orthopedic reference.
4. Correct dimensions, spacing, alignment, typography, shadows, gradients,
   image crop, and wrapping.
5. Capture a fresh screenshot and repeat until no material discrepancy remains
   in that section.

The first render is never considered accepted. At least one comparison and
correction pass is required for every major section.

Any observable difference in hero image composition, image crop, text wrapping,
card position, section height, spacing, alignment, typography scale, shadows,
or gradients is a defect and must be corrected before the affected section is
accepted.

## Verification

Before completion:

- Confirm all required image files exist and decode successfully.
- Run formatting validation.
- Run ESLint.
- Run strict TypeScript type checking.
- Run automated tests, including asset-presence and form-validation coverage.
- Run a production build.
- Run a dependency audit.
- Capture a final 1440px full-page screenshot.
- Compare the final screenshot against the reference and perform a final visual
  correction pass.

No check may be skipped or weakened to make the implementation pass.

## Acceptance Criteria

- At 1440px, a person viewing the supplied orthopedic reference and the final
  localhost screenshot cannot visually distinguish them.
- Every section follows the required order and measured geometry.
- The hero photograph blends into the page rather than appearing as a card.
- All three local images exist and render without fallback or broken states.
- There are no additions, redesigns, or stylistic reinterpretations.
- No observable discrepancy remains in image composition or crop, text
  wrapping, card position, section height, spacing, alignment, typography
  scale, shadows, or gradients.
- Keyboard navigation, focus visibility, reduced motion, and responsive layouts
  work without changing the desktop reference appearance.
- Lint, typecheck, tests, production build, and dependency audit pass with fresh
  output.
