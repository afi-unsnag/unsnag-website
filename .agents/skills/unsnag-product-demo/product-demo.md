---
name: unsnag-product-demo
description: Builds animated HTML product demos of the Unsnag app UI for embedding on the launch site. Use whenever you need to show the app in action — a specific process step, the full UNSNAG flow, or a single moment like naming an emotion or choosing a Go action.
---

# Unsnag Product Demo Skill

You are building an **animated HTML product demo** of the Unsnag app — a guided emotional processing app. The demo will be embedded on the Unsnag launch website to show the product in action without a screen recording.

Before writing a single line of code, internalize everything below.

---

## What You Are Building

A self-contained HTML file that:
- Renders a realistic mobile app UI using Unsnag's exact design system
- Animates one specific moment in the UNSNAG process (one step, one interaction, one screen)
- Loops smoothly and automatically — no user interaction required
- Feels like watching someone actually use the app
- Outputs clean, embeddable HTML with no external dependencies except Google Fonts

**One demo = one moment.** Never try to animate the entire 6-step flow in a single demo. Pick one screen and show it beautifully.

---

## The UNSNAG Process — Know Every Screen

| Step | Name | What the screen shows |
|---|---|---|
| U | Unload | A text input area. The user types freely. Copy above it says something like "What's going on? Don't edit yourself." A primary CTA button: "I got it all out" |
| N | Name | A grid of emotion tags (e.g. Shame, Anger, Guilt, Fear, Sadness, Overwhelm). User taps one. It activates in Tomato (#FF6B4C). CTA: "That's the one" |
| S | Sense | A simple body outline or body-part selector. Copy: "Where do you feel this in your body?" Options like: chest, throat, stomach, shoulders. User selects one. |
| N | Notice | A 90-second timer. Large countdown. Copy: "Just notice it. Don't fix it. Don't analyze it. Let it be there." Timer counts down with a subtle progress ring. |
| A | Ask | A prompt: "What does this feeling want to say?" A text input below it. The user types a short response. |
| G | Go | Two columns: "What I usually do" (the pattern) vs "What I'll do instead" (the new step). The new step is simple — "send the text I've been avoiding" or "go for a 10-minute walk." CTA: "I'll do this" |

---

## Unsnag Design System — Apply Exactly

### Fonts
```html
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet">
```
- Headings / step titles: Bricolage Grotesque, bold
- Everything else: DM Sans
- Step labels (UNLOAD, NAME, etc.): DM Sans, all-caps, letter-spacing: 0.1em, 13px, color #B8B2A8

### Colors
```css
--cream: #FAF7F2;
--cream-dark: #F0EBE3;
--warm-dark: #2D2A26;
--warm-dark-light: #4A4640;
--mauve: #E2C6FD;
--mauve-dark: #C9A4E8;
--mauve-light: #F0DEFF;
--tomato: #FF6B4C;
--orange: #FFA846;
--warm-gray: #B8B2A8;
--warm-gray-light: #E8E3DB;
```

### Shadows — flat offset only, never blurred
```css
--shadow-chunky:    3px 3px 0px 0px #2D2A26;
--shadow-chunky-sm: 2px 2px 0px 0px #2D2A26;
--shadow-chunky-lg: 4px 4px 0px 0px #2D2A26;
--shadow-pressed:   1px 1px 0px 0px #2D2A26;
```

### Key component patterns

**Primary button:**
```css
background: #E2C6FD;
border: 2px solid #2D2A26;
border-radius: 12px;
box-shadow: 4px 4px 0px 0px #2D2A26;
font-family: 'DM Sans'; font-weight: 600;
padding: 14px 28px;
color: #2D2A26;
```

**Card / screen surface:**
```css
background: #FAF7F2;
border: 2px solid #2D2A26;
border-radius: 24px;
box-shadow: 4px 4px 0px 0px #2D2A26;
```

**Emotion tag (unselected):**
```css
background: #F0EBE3;
border: 2px solid #E8E3DB;
border-radius: 20px;
box-shadow: 2px 2px 0px 0px #2D2A26;
font-family: 'DM Sans'; font-size: 14px;
padding: 8px 16px;
color: #2D2A26;
```

**Emotion tag (selected):**
```css
border-color: #FF6B4C;
color: #FF6B4C;
background: #FAF7F2;
```

---

## Animation Rules

### The cursor
Always use an **SVG arrow cursor** — not a circle dot. This matches the production demos on the site.

```html
<div class="cursor" id="cursor">
  <svg width="17" height="23" viewBox="0 0 17 23" fill="none">
    <path d="M1 1L1 19.5L5.5 15L10 22L13 20.5L8.5 13.5L14.5 13.5L1 1Z" fill="white" stroke="#2D2A26" stroke-width="1.5" stroke-linejoin="round"/>
  </svg>
</div>
```

```css
.cursor {
  position: absolute;
  z-index: 100;
  pointer-events: none;
  opacity: 0;
}
.cursor svg { display: block; transition: transform 0.1s; }
.cursor.tap svg { transform: scale(0.85); }
```

- Show/hide with `opacity` (start hidden, show when needed)
- Use `moveCursor(x, y, duration)` pattern with `cubic-bezier(0.4, 0, 0.2, 1)`
- Add `.tap` class briefly (150ms) for press effect
- Hide cursor during typing (set `opacity: 0`), show again for button taps
- Use `getPos(el)` helper to find button positions relative to the phone frame

### Screen transitions
Use **slide transitions** between screens — not fade. Screen 1 slides left, Screen 2 slides in from right.

```css
.screen-view {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex; flex-direction: column;
  transition: transform 300ms ease, opacity 300ms ease;
  overflow-y: auto;
}
.screen-view.hidden-left { transform: translateX(-100%); opacity: 0; }
.screen-view.hidden-right { transform: translateX(100%); opacity: 0; }
```

### Results reveal pattern
For AI insight/results screens, reveal elements **sequentially** with staggered fade-ins:
1. AI badge fades in → 300ms wait
2. Heading fades in → 300ms wait
3. Subtext fades in → 400ms wait
4. First card fades in → 300ms wait
5. Bullet items fade in one by one → 200ms between each
6. Second card fades in → same bullet pattern
7. Hold on results for 5 seconds before looping

Each element uses `opacity: 0; transition: opacity 0.4s;` and gets a `.visible` class.

### Timing feel
- Cursor travel: 600–900ms per movement
- Pause before tap: 300–500ms
- Typing speed: 22-30ms per character with slight random variance
- Text cursor: blinking `<span class="text-cursor"></span>` appended after typed text
- Element appear/fade: 300-400ms ease
- Between scenes: 800ms pause before looping
- Scroll to reveal: use `scrollTo({ top: N, behavior: 'smooth' })` when content extends below fold
- Total loop: 15-25 seconds for demos with typing + results

### Insight card pattern
Used in both the app's AI Insight step and the Yours or Not free tool.

```css
.insight-card { width: 100%; border-radius: 12px; padding: 18px; margin-bottom: 14px; opacity: 0; transition: opacity 0.4s; }
.insight-card.visible { opacity: 1; }
.card-yours { border: 2px solid var(--tomato); }
.card-not-yours { border: 2px solid var(--orange); }
.card-header { font-family: 'Bricolage Grotesque', serif; font-size: 15px; font-weight: 700; margin-bottom: 10px; }
.card-yours .card-header { color: var(--tomato); }
.card-not-yours .card-header { color: #C87A00; }
.card-bullet { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 8px; opacity: 0; transition: opacity 0.3s; }
.card-bullet.visible { opacity: 1; }
.bullet-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; margin-top: 5px; }
.card-yours .bullet-dot { background: var(--tomato); }
.card-not-yours .bullet-dot { background: var(--orange); }
```

Cards use **colored borders only** (not filled backgrounds). "What's yours" = tomato border/dots. "What's not yours" = orange border/dots.

### AI badge
Shows above insight results to indicate AI-generated content.

```css
.ai-badge {
  display: inline-flex; gap: 4px;
  background: var(--mauve-light); border: 1px solid var(--mauve-dark);
  border-radius: 20px; padding: 4px 12px;
  font-family: 'DM Sans'; font-size: 10px; font-weight: 600;
  text-transform: uppercase; color: var(--warm-dark-light);
}
```
Content: `&#x2726; AI` or `&#x2726; AI Insight`

### What to animate
Show exactly one of these moments per demo:

**Option A — Emotion tag selection (Name step)**
1. Screen shows 6–8 emotion tags, all unselected
2. Cursor enters, moves toward one tag (e.g. "Shame")
3. Pauses, taps — tag activates in Tomato
4. Brief pause
5. Cursor moves to CTA button "That's the one"
6. Button depresses (shadow goes to 1px 1px), then releases
7. Fade to loop

**Option B — Unload typing (Unload step)**
1. Empty text area with placeholder copy
2. Cursor clicks into the field
3. Text types out character by character (typewriter effect)
4. Cursor moves to CTA
5. Button tap
6. Fade to loop

**Option C — Notice timer (Notice step)**
1. Large countdown timer visible — starts at 1:30
2. Progress ring slowly fills
3. Copy reads: "Just notice it. Don't fix it."
4. Timer ticks down 10–15 seconds of real time (then loops)
5. Subtle breathing animation on the timer circle

**Option D — Go step (Go step)**
1. Two cards visible: "What I usually do" and "What I'll do instead"
2. "What I usually do" is pre-filled with a pattern response
3. Cursor moves to "What I'll do instead" card
4. A simple action types in: "Send the text I've been avoiding"
5. CTA "I'll do this" appears
6. Button tap, loop

---

## Phone Frame

Two modes depending on where the demo will be used:

### Mode A — Embedded on website (no phone frame)
For demos embedded in iframes on the landing page. Full viewport, no chrome.

```css
.phone-frame { width: 100%; height: 100vh; background: none; border-radius: 0; padding: 0; position: relative; }
.phone-notch { display: none; }
.phone-screen { background: var(--cream); border-radius: 0; overflow: hidden; height: 100vh; position: relative; display: flex; flex-direction: column; }
```

### Mode B — Social media / Instagram (with phone frame)
For 1080x1350 Instagram posts/reels or standalone downloads. Centered phone on cream background.

```css
html, body { width: 1080px; height: 1350px; overflow: hidden; display: flex; align-items: center; justify-content: center; background: var(--cream); }
.phone-frame {
  width: 390px;
  background: #1a1a1a;
  border-radius: 52px;
  padding: 14px;
  box-shadow: 0 24px 60px rgba(0,0,0,0.2);
  position: relative;
}
.phone-notch {
  width: 120px; height: 32px;
  background: #1a1a1a;
  border-radius: 0 0 20px 20px;
  margin: 0 auto 4px;
}
.phone-screen {
  background: var(--cream);
  border-radius: 42px;
  overflow: hidden;
  height: 740px;
  position: relative;
}
```

---

## Output Requirements

- Single self-contained HTML file — all CSS and JS inline, no external files except Google Fonts
- No `<body>` background color — the demo floats on whatever the site background is
- Phone frame centered in the output
- Loop automatically and indefinitely
- Works in all modern browsers
- Embed-ready: the whole thing should work dropped into a `<div>` on the landing page

**Option E — Yours or Not (free tool demo)**
1. Screen 1: "Describe what's bothering you" with empty textarea
2. Cursor taps textarea, types a relatable situation
3. "Show me" CTA appears, cursor taps it
4. Slide transition to results screen
5. AI badge, heading, subtext fade in sequentially
6. "Yours to feel" card appears with 3 bullets fading in
7. "Not yours to feel" card appears with 3 bullets fading in
8. Hold on results, fade out, loop
9. Top bar shows "unsnag" wordmark (no progress dots — this isn't the full app flow)

Reference implementation: `content/drafts/product-demo/instagram/yours-or-not-demo.html`

---

## What This Demo Is Not

- Not a clickable prototype — the user watches, they don't interact
- Not a full app walkthrough — one screen, one moment
- Not a screen recording — it's built in HTML/CSS so it scales perfectly on any device
- Not generic — every color, font, shadow, and interaction must match the Unsnag design system exactly

---

## Example Prompt to Use This Skill

```
/unsnag-product-demo "Build the Name step demo — show the cursor selecting 'Shame' from the emotion tags, then tapping 'That's the one'"
```

```
/unsnag-product-demo "Build the Notice step demo — show the 90-second countdown timer with a breathing animation"
```

```
/unsnag-product-demo "Build the Unload step demo — show text typing into the input field, then the CTA button being tapped"
```
