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
Always animate a visible cursor (a small filled circle, ~10px, color #2D2A26) that:
- Moves across the screen to simulate a real user tapping
- Pauses briefly before tapping (like a real hesitation)
- Scales down slightly on tap to simulate press
- Uses `cubic-bezier(0.4, 0, 0.2, 1)` for smooth movement

```css
.cursor {
  width: 10px; height: 10px;
  background: #2D2A26;
  border-radius: 50%;
  position: absolute;
  pointer-events: none;
  transition: transform 0.1s ease;
  z-index: 100;
}
.cursor.tapping { transform: scale(0.7); }
```

### Timing feel
- Cursor travel: 600–900ms per movement
- Pause before tap: 300–500ms
- Element appear/fade: 300ms ease
- Between scenes: 800ms pause before looping
- Total loop: aim for 6–10 seconds — long enough to read, short enough to stay engaging

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

Wrap the demo in a realistic phone frame:

```html
<div class="phone-frame">
  <div class="phone-notch"></div>
  <div class="phone-screen">
    <!-- app content here -->
  </div>
</div>
```

```css
.phone-frame {
  width: 320px;
  background: #1a1a1a;
  border-radius: 44px;
  padding: 12px;
  box-shadow: 0 24px 60px rgba(0,0,0,0.3);
  position: relative;
}
.phone-notch {
  width: 100px; height: 28px;
  background: #1a1a1a;
  border-radius: 0 0 18px 18px;
  margin: 0 auto 8px;
}
.phone-screen {
  background: #FAF7F2;
  border-radius: 36px;
  overflow: hidden;
  min-height: 580px;
  position: relative;
  padding: 24px 20px;
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
