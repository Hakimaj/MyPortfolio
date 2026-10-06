# Adbulhakim Jejaw Biadgo — Portfolio

A neo-brutalist portfolio site built with **Vite + React 18 + TypeScript + Tailwind CSS v4**.

Design language cloned from the layout reference: hard 2px borders, offset "pressable"
shadows, a yellow/sage accent palette, Cabinet Grotesk display type over Satoshi body
type, outlined display headings, dot/grid texture backgrounds, and a vertical
experience timeline. All content comes from your CV.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
```

| Script           | Purpose                              |
| ---------------- | ------------------------------------ |
| `npm run dev`    | Dev server with HMR                  |
| `npm run build`  | Type-check (`tsc -b`) + production build |
| `npm run preview`| Serve the production build locally  |
| `npm run lint`   | oxlint                               |

## Editing your content

All copy lives in `src/data/` — you should rarely need to touch components.

| File                       | Contains                                                     |
| -------------------------- | ------------------------------------------------------------ |
| `src/data/profile.ts`      | Name, roles, bio, contact links, languages, nav links, stats |
| `src/data/projects.ts`     | The 6 projects, including full case-study text and GitHub URLs |
| `src/data/timeline.ts`     | Experience & education entries for the timeline              |
| `src/data/skills.ts`       | Skill proficiency levels, categories, and stack groups       |
| `src/data/certificates.ts` | Certification list and verification links                    |

### Adding a project

Append an entry to the `projects` array in `src/data/projects.ts`:

```ts
{
  slug: 'my-project',              // becomes /project/my-project
  title: 'My Project',
  period: '01/2026 – 06/2026',
  category: 'Full Stack',           // auto-appears as a filter button
  accent: 'yellow',                // yellow | red | sage | orange | green | white
  featured: true,                  // false still shows under "All"
  summary: 'One or two lines for the card.',
  fullDescription: 'Longer intro for the case-study header.',
  challenge: 'What made it hard.',
  solution: 'What you built.',
  results: ['Measurable outcome', '…'],
  tags: ['React', 'FastAPI'],       // card chips
  technologies: ['React', 'Python', 'MySQL'], // "Built with" list
  github: 'https://github.com/…',  // optional
}
```

Filter buttons and the "More work" list are derived automatically — no extra wiring.

### Theming

The page opens on the **light** palette (yellow hero) and only switches to dark when
the visitor pulls the lamp cord in the nav. It deliberately does *not* follow the OS
`prefers-color-scheme` — otherwise the page comes up dark for anyone with dark mode
switched on.

Three band classes drive every section, matching the reference exactly:

| Class      | Section                                        | Light     | Dark      |
| ---------- | ---------------------------------------------- | --------- | --------- |
| `.bg-hero` | Hero, Contact                                  | `#ffe17c` | `#4a1d1d` |
| `.bg-band` | Stats, Skills, Work, Footer                    | `#171e19` | `#020817` |
| `.bg-paper`| What I Do, Experience, Certificates            | `#ffffff` | `#111827` |

Each has a matching foreground helper — `.on-hero`, `.on-band`, `.on-paper`,
`.on-plate` — so you never hard-code a colour in a component. Accent plates use
`.bg-plate` (yellow) and `.bg-plate-alt` (sage), which also retint in dark mode.

Two utilities exist for contrast, because `#ffe17c` is unreadable as text on white:

- `.accent-ink` — deeper gold for accent *text* on the light bands, amber in dark
- `text-black` — keeps labels dark when they sit on a yellow plate in both themes

### The lamp cord

`src/components/LampToggle.tsx` is the theme control — you **pull** it, like the
reference. It's a small verlet rope simulation:

- 17 points, the first pinned to the nav, held together by distance constraints
- gravity `1250`, damping `0.94`, drawn as a smooth quadratic curve through the points
- drag the bulb down and the rope stretches; past **220px** (20 segment-lengths) the
  theme flips and the cord springs back, capped at `286px`
- the bulb glows while the dark theme is active

Grabbing works with mouse or touch (pointer events, `touch-action: none`). There is
no click handler — a drag ending on the bulb would otherwise fire a second toggle —
but the cord is focusable and toggles on Enter/Space for keyboard users. Below `md`
the cord is hidden and the mobile drawer gets a plain button.

Change `TOGGLE_STRETCH` / `MAX_STRETCH` at the top of the file to make the pull
longer or shorter.

### The hero portrait

The hero shows a tilted "browser window" card. Drop a photo at `public/me.jpg` and it
appears automatically; until then a light `AJ` monogram stands in.

## Contact form

`src/components/Contact.tsx` composes a prefilled `mailto:` link and hands off to the
visitor's mail client — no backend required. To deliver in-browser instead, replace
the body of `handleSubmit` with a `fetch()` to a form endpoint (Formspree, Resend,
a serverless function) and keep the same `status` state for the UI feedback.

**About the dotted background:** the section carries a dot pattern, so the form sits on
a solid plate and the inputs are solid fills. That way the dots stop at the card edge
and never show through the fields. Inputs use the `.field` class in `index.css` —
opaque fill, 2px border, bold text, hard offset shadow on focus. If you restyle them,
keep the fill opaque: a transparent input is what makes text unreadable on a
patterned band.

## Accessibility & motion

- `useReducedMotion` disables entrance animations and smooth scrolling entirely for
  visitors with `prefers-reduced-motion: reduce`.
- `useLenis` provides inertial scrolling otherwise, and self-disables on reduced motion.
- Semantic landmarks, `aria-label`s on icon-only controls, visible focus rings, and a
  live region for form status.

## Deploying

`vercel.json` rewrites all routes to `index.html` so the client-side router works on
refresh.

```bash
npm i -g vercel
vercel
```

## Note on the reference

This is an original implementation of the reference's *design system* (palette, type
scale, shadow language, section rhythm, interaction patterns). Structure and content
are driven entirely by `src/data/`; no copy, images or assets were taken from the
reference site.# MyPortfolio
