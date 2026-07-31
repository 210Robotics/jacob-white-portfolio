# Design QA — Jacob White Portfolio

Final result: **passed**

## Comparison setup

- Reference: `C:\Users\z005591d\.codex\generated_images\019fb45e-1559-7ca1-90e9-50e99aa63a86\call_LwD0FXg7UQtwaAdMXjZnP2Uk.png`
- Implementation: `C:\Users\z005591d\.codex\visualizations\2026\07\30\019fb45e-1559-7ca1-90e9-50e99aa63a86\jacob-portfolio-home-final.png`
- Side-by-side comparison: `C:\Users\z005591d\.codex\visualizations\2026\07\30\019fb45e-1559-7ca1-90e9-50e99aa63a86\design-comparison-final.png`
- Native review viewport: 1440 × 1000
- Mobile review viewport: 390 × 844

## Visible comparison

1. **Layout:** Preserves the slim navigation, two-column hero, proof strip, and two-column selected-work grid from the accepted concept.
2. **Palette:** Matches the near-black base and restrained teal accent. Teal remains limited to key hierarchy, focus, and action states.
3. **Typography:** Uses the same oversized editorial headline treatment with a teal “think,” compact uppercase labels, and muted supporting copy.
4. **Project imagery:** Uses only Jacob's real CAD images extracted from the supplied portfolio source PDF. No generated image is shipped with the site.
5. **Motion and interaction:** The layered CAD stack responds subtly to pointer movement, cards use restrained elevation and border transitions, and reduced-motion preferences are respected.

## Copy and content differences

- The concept's unsupported “Available for full-time roles” line was replaced with Jacob's confirmed engineering positioning and editable availability text.
- Project labels and dates use confirmed portfolio content rather than the mock's illustrative values.

## Intentional deviations

- Source CAD pages are shown with `object-fit: contain` and their full page framing. This avoids cropping and honors the user's explicit request that the complete image fit inside each frame.
- Projects without a confirmed public image use a quiet “Visual documentation in progress” state instead of invented or AI-generated imagery.
- The live implementation retains richer project summaries and admin-managed content beneath the concept's first viewport.

## Verification

- No horizontal overflow at desktop or mobile widths.
- Homepage, projects, gallery, résumé, and admin routes render.
- Gallery carousel and lightbox open successfully; lightbox images use `object-fit: contain`.
- Mobile navigation opens and includes the Admin route.
- Clerk-disabled state fails closed and displays setup instructions; no admin content is exposed.
- Browser console error count: 0.
- Typecheck, lint, tests, and production build pass.

## July 30 image and interaction refinement

- Reprocessed the four supplied CAD renders deterministically into 1600 × 900 transparent PNGs. No generative model, invented geometry, or replacement image was used.
- Removed source-page backgrounds, headings, and excess whitespace while preserving the original CAD assemblies and their full silhouettes.
- Replaced light image panels with quiet charcoal presentation surfaces across the hero, cards, project details, blog, gallery, and lightbox.
- Added Jacob's verified public headshot to the About page.
- Added route-aware desktop navigation, project filter counts with a live result announcement, gallery position counters, disabled end states, lightbox previous/next controls, and keyboard arrow navigation.
- Confirmed the configured admin email is `jmwhite407@gmail.com`; `ADMIN_USER_ID` remains the strongest optional restriction when present.

## July 31 CMS and interaction pass

- Final desktop proof: `C:\Users\z005591d\.codex\visualizations\2026\07\30\019fb45e-1559-7ca1-90e9-50e99aa63a86\portfolio-home-desktop-final.png`
- Final mobile proof: `C:\Users\z005591d\.codex\visualizations\2026\07\30\019fb45e-1559-7ca1-90e9-50e99aa63a86\portfolio-home-mobile-final.png`
- Gallery proof: `C:\Users\z005591d\.codex\visualizations\2026\07\30\019fb45e-1559-7ca1-90e9-50e99aa63a86\portfolio-gallery-final.png`
- Skills proof: `C:\Users\z005591d\.codex\visualizations\2026\07\30\019fb45e-1559-7ca1-90e9-50e99aa63a86\portfolio-skills-final.png`

### Mismatch ledger

1. **Hero depth:** The earlier reference used a static stacked render. The implementation keeps the same silhouette but adds click, arrow, dot, keyboard-focus, and pointer-parallax states so the stack communicates that it is interactive.
2. **Color intensity:** The reference used a brighter cyan. The implementation shifts the primary action from cyan into restrained emerald and keeps most surfaces neutral, matching the requested less-bright teal-on-black direction.
3. **Image treatment:** Source CAD objects now sit on consistent charcoal presentation surfaces with their complete silhouettes visible. This intentionally avoids decorative crops and generated filler.
4. **Content density:** The homepage carries six current priority projects below the fold while the animated hero only includes the four projects with confirmed visual assets. This keeps the first viewport calm and avoids empty frames.
5. **Portrait use:** The supplied portrait appears as an editorial profile image and in a separate people gallery. It is not composited, regenerated, or background-replaced.
6. **Mobile behavior:** The desktop navigation collapses into a right-side sheet; a Playwright regression test caught and verified the fix for link navigation after the sheet closes.

### Automated interaction evidence

- Playwright desktop and Pixel 7 projects pass project cycling, project deep-link changes, research modal, certification tab, gallery lightbox, protected admin redirect, mobile navigation, and horizontal-overflow checks.
- The production build, TypeScript, ESLint, and Vitest checks pass with Clerk middleware, Neon content, and Blob uploads configured.
