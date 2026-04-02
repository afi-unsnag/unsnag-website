---
name: unsnag-design-system
description: Builds UI for Unsnag using the correct fonts, colors, shadows, and component patterns. Use whenever creating or updating any Unsnag website, app screen, or marketing asset.
---

# Unsnag Design System Skill

You are building UI for **Unsnag** — a guided emotional processing app for emotionally self-aware women who are stuck in patterns they can't break. The brand is warm, grounded, and serious. It looks like a tool, not a wellness app.

Before writing a single line of code, internalize everything below. This is the complete visual system. Do not deviate from it.

---

## Fonts

Always load both fonts from Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet">
```

**Bricolage Grotesque** — headings only
- Logo, page titles, step headlines, display/marketing copy
- Bold or extrabold weight
- Chunky, confident, slightly quirky — commands attention without coldness
- Logo is always lowercase: `unsnag` — never `Unsnag`, never `UNSNAG`
- Page headings: 32–36px bold
- Step headlines: 28–32px bold
- Marketing display copy: heaviest weight available

**DM Sans** — everything else
- Body copy, subtext, captions, button labels, anything under ~20px
- Body copy: regular weight, 16–18px
- Supporting subtext: color `#4A4640`
- Step labels (UNLOAD, NAME, SENSE, NOTICE, ASK, GO): all-caps, letter-spacing: 0.1em, ~13px — quiet and orienting
- Button text: semi-bold, sentence case for primary CTAs; lowercase for secondary links

**Typography rules — enforce strictly:**
- Maximum two type sizes per composition. Hierarchy comes from weight and spacing, not a size cascade.
- Headlines are complete thoughts: `'Just feel it. Don't fix it.'` — not `'Feeling.'`
- Body copy centered on mobile, left-aligned on web/desktop.
- Never serif, never handwritten, never any font outside this pairing.

---

## Color Palette

Define as CSS custom properties on `:root`. Use token names exactly as written.

```css
:root {
  /* Foundation */
  --cream: #FAF7F2;           /* Primary background — always, never pure white */
  --cream-dark: #F0EBE3;      /* Cards, input fields, secondary surfaces */
  --warm-dark: #2D2A26;       /* Primary text, logo, borders, shadows — never pure black */
  --warm-dark-light: #4A4640; /* Secondary text, supporting copy */

  /* Primary accent: Mauve — action, momentum, go */
  --mauve: #E2C6FD;           /* Primary CTA fill */
  --mauve-dark: #C9A4E8;      /* Pressed/hover state for mauve buttons */
  --mauve-light: #F0DEFF;     /* Subtle tints, highlighted backgrounds */

  /* Secondary accents — specific roles, not decorative */
  --blush: #FFBCF2;           /* Occasional warmth, marketing/social use */
  --blush-dark: #E8A0D8;      /* Hover/pressed state for blush surfaces */
  --orange: #FFA846;          /* Stat cards, 'for later' states — something waiting */
  --tomato: #FF6B4C;          /* Emotion tags in Name step, accountability borders */

  /* Neutrals */
  --warm-gray: #B8B2A8;       /* Secondary text, inactive states, timestamps */
  --warm-gray-light: #E8E3DB; /* Borders on unselected tags, dividers, separators */
}
```

**Color rules — enforce strictly:**
- Background is ALWAYS `--cream`. Never `#FFFFFF`, never any other color.
- Card/input surfaces use `--cream-dark`.
- All text uses `--warm-dark` (primary) or `--warm-dark-light` (secondary).
- Mauve is the only CTA color. Every primary action button uses `--mauve` fill.
- Tomato and Orange have fixed semantic roles — do not use them decoratively.
- No neon, no gradients, no high-saturation color outside the defined palette.
- Maximum 1 in 5 social posts uses a non-cream background color. On the website, cream is always the background.

---

## Shadow System

Unsnag uses flat offset shadows only — **no blur, no spread, ever**. This creates physical weight, not floating. It is one of the most distinctive elements of the brand. Apply it consistently to all interactive and card elements.

```css
:root {
  --shadow-chunky:         3px 3px 0px 0px var(--warm-dark);
  --shadow-chunky-sm:      2px 2px 0px 0px var(--warm-dark);
  --shadow-chunky-lg:      4px 4px 0px 0px var(--warm-dark);
  --shadow-chunky-mauve:   3px 3px 0px 0px var(--mauve-dark);
  --shadow-chunky-pressed: 1px 1px 0px 0px var(--warm-dark);
}
```

| Token | Use |
|---|---|
| `--shadow-chunky` | Default — most cards and buttons |
| `--shadow-chunky-sm` | Tags, chips, compact components |
| `--shadow-chunky-lg` | Hero elements, primary CTAs needing extra presence |
| `--shadow-chunky-mauve` | Mauve buttons on mauve backgrounds |
| `--shadow-chunky-pressed` | Active/pressed state — button visually sinks, then returns |

**Interaction pattern for buttons:**
```css
.btn-primary {
  box-shadow: var(--shadow-chunky-lg);
  transform: translate(0, 0);
  transition: box-shadow 80ms ease, transform 80ms ease;
}
.btn-primary:active {
  box-shadow: var(--shadow-chunky-pressed);
  transform: translate(2px, 2px);
}
```

---

## Component Patterns

### Primary CTA Button
```css
.btn-primary {
  background: var(--mauve);
  color: var(--warm-dark);
  font-family: 'DM Sans', sans-serif;
  font-weight: 600;
  font-size: 16px;
  border: 2px solid var(--warm-dark);
  border-radius: 12px;
  padding: 14px 28px;
  box-shadow: var(--shadow-chunky-lg);
  cursor: pointer;
  transition: box-shadow 80ms ease, transform 80ms ease;
}
.btn-primary:hover {
  background: var(--mauve-dark);
}
.btn-primary:active {
  box-shadow: var(--shadow-chunky-pressed);
  transform: translate(2px, 2px);
}
```

### Secondary / Ghost Button
```css
.btn-secondary {
  background: transparent;
  color: var(--warm-dark-light);
  font-family: 'DM Sans', sans-serif;
  font-weight: 500;
  font-size: 15px;
  text-transform: lowercase;
  border: none;
  padding: 10px 16px;
  cursor: pointer;
}
```

### Card
```css
.card {
  background: var(--cream-dark);
  border: 2px solid var(--warm-dark);
  border-radius: 16px;
  padding: 24px;
  box-shadow: var(--shadow-chunky);
}
```

### Emotion Tag (Name step)
```css
.emotion-tag {
  background: var(--cream-dark);
  border: 2px solid var(--warm-gray-light);
  border-radius: 20px;
  padding: 6px 14px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  color: var(--warm-dark);
  box-shadow: var(--shadow-chunky-sm);
}
.emotion-tag.selected {
  border-color: var(--tomato);
  background: var(--cream);
  color: var(--tomato);
}
```

### Step Label
```css
.step-label {
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--warm-gray);
}
```

### Input Field
```css
.input {
  background: var(--cream-dark);
  border: 2px solid var(--warm-gray-light);
  border-radius: 12px;
  padding: 14px 18px;
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  color: var(--warm-dark);
  width: 100%;
  outline: none;
  transition: border-color 120ms ease;
}
.input:focus {
  border-color: var(--warm-dark);
}
```

---

## Spacing & Layout

Unsnag uses generous space. Breathing room is a feature, not an oversight — it gives the user permission to slow down, which is exactly what the product asks of them.

```css
:root {
  --space-xs:  8px;
  --space-sm:  16px;
  --space-md:  24px;
  --space-lg:  40px;
  --space-xl:  64px;
  --space-2xl: 96px;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;

  --max-width-content: 480px;  /* Mobile-first, generous margins */
  --max-width-web: 1080px;
}
```

- Mobile: single column, centered, 20–24px horizontal padding
- Web: max 1080px, generous section padding (`--space-xl` minimum top/bottom)
- Never fill every corner. White (cream) space is doing work.
- No overcrowded compositions. If there's no breathing room, it's off-brand.

---

## Color as Meaning — Do Not Break These Signals

| Color | What it means | Where it appears |
|---|---|---|
| Cream / Cream Dark | Safety, ground, space to land | Always the background — the container |
| Mauve | Momentum, action, readiness | Primary CTAs, active states, the color of 'go' |
| Tomato | Emotional activation, honesty | Emotion tags in Name step, accountability card borders |
| Orange | Holding, accumulating, waiting | 'For later' states, saved but not yet processed |
| Warm Dark | Presence, weight, reality | Text, borders, shadows — the anchor |

---

## What This Brand Never Looks Like

Reject any output that contains:
- Pure white (`#FFFFFF`) as a background surface — always use `--cream`
- Soft blurred drop shadows — shadows are flat offset, no blur, ever
- Pastel illustration or decorative iconography
- Dark, clinical, or sterile UI
- Motivational poster energy: sunrise mountains, cursive script
- Overcrowded compositions with no breathing room
- Neon, gradient, or high-saturation color outside the palette
- Decorative, handwritten, or serif fonts
- Mauve, Tomato, or Orange used decoratively outside their semantic roles

---

## Quick Reference Cheat Sheet

```
Background:    #FAF7F2  (cream)
Cards:         #F0EBE3  (cream-dark)
Text primary:  #2D2A26  (warm-dark)
Text secondary:#4A4640  (warm-dark-light)
CTA button:    #E2C6FD  (mauve)
CTA pressed:   #C9A4E8  (mauve-dark)
Emotion tags:  #FF6B4C  (tomato)
For later:     #FFA846  (orange)
Borders:       #E8E3DB  (warm-gray-light)
Muted text:    #B8B2A8  (warm-gray)

Shadows: flat offset only — no blur, no spread
  default:   3px 3px 0px 0px #2D2A26
  small:     2px 2px 0px 0px #2D2A26
  large:     4px 4px 0px 0px #2D2A26
  mauve:     3px 3px 0px 0px #C9A4E8
  pressed:   1px 1px 0px 0px #2D2A26

Fonts:
  Headings:  Bricolage Grotesque (bold/extrabold)
  Body:      DM Sans (regular/semibold)
  Logo:      always lowercase — unsnag
```
