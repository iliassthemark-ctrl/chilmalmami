# Radio Sabor Landing — Quick Edit Map

This file shows where to find the most important elements in the project.

## 1) Main text content (titles, dates, labels)

- Browser tab title: `index.html` line 7 (`<title>...</title>`)
- Navbar brand title: `index.html` line 26 (`.navbar-logo`)
- Hero "Next Event" text/date: `index.html` line 53
- Hero main title: `index.html` lines 55–57 (`.hero-title`)
- Events section title "Save the Date": `index.html` line 120
- Event card dates: `index.html` lines 140, 166, 193 (`.event-card-date`)
- About title: `index.html` line 256

## 2) Colors and background (detailed)

### A) Core palette (defined in `index.css` `:root`, lines 9–40)

#### Background colors
- `--bg-primary: #0a0014` (main page background)
- `--bg-secondary: #0d0019` (section backgrounds)
- `--bg-tertiary: #130022` (defined, currently not used)
- `--bg-card: #110020` (cards)
- `--bg-glass: rgba(255, 255, 255, 0.04)` (glass UI)
- `--bg-glass-hover: rgba(255, 255, 255, 0.08)` (defined, currently not used)

#### Text colors
- `--text-primary: #ffffff`
- `--text-secondary: rgba(255, 255, 255, 0.75)`
- `--text-muted: rgba(255, 255, 255, 0.45)`

#### Accent / neon colors
- `--neon-magenta: #ff2d95`
- `--neon-cyan: #00f0ff`
- `--neon-purple: #b14dff`
- `--neon-gold: #ffe14d` (defined, currently not used)
- `--neon-orange: #ff6b2b` (defined, currently not used)
- `--neon-pink: #ff5ecb` (defined, currently not used)
- `--neon-lime: #a8ff00` (defined, currently not used)

#### Gradients
- `--gradient-primary: linear-gradient(135deg, #ff2d95, #b14dff)`
- `--gradient-secondary: linear-gradient(135deg, #00f0ff, #b14dff)`
- `--gradient-warm: linear-gradient(135deg, #ff6b2b, #ff2d95)` (defined, currently not used)
- `--gradient-party: linear-gradient(135deg, #ff2d95, #b14dff, #00f0ff)` (defined, currently not used)
- `--gradient-bg-glow`: layered radial ambient background glow

#### Glow shadows
- `--glow-magenta`: pink multi-layer glow (widely used)
- `--glow-cyan`: cyan glow (defined, currently not used)
- `--glow-purple`: purple glow (used on `.respect-value:hover`)

### B) Where these colors are used most

#### Global background
- `body` background: `index.css` lines 81–84
  - `background-color: var(--bg-primary)`
  - `background-image: var(--gradient-bg-glow)`

#### Section backgrounds
- `.community-signup`: `index.css` line 545 uses `var(--bg-secondary)`
- `.respect`: `index.css` line 968 uses `var(--bg-secondary)`
- `.footer`: `index.css` line 1207 uses `var(--bg-secondary)`
- `.newsletter-card`: `index.css` line 1068 uses `var(--bg-card)`

#### Main accents
- Section labels use magenta: `index.css` line 122 (`var(--neon-magenta)`)
- Hero/event date uses cyan: `index.css` line 722 (`var(--neon-cyan)`)
- Most CTA gradients use primary gradient:
  - Navbar logo: line 183
  - Navbar CTA: line 234
  - Main button `.btn-primary`: line 432
  - Signup button: line 633
  - Event badge: line 731

#### Text hierarchy
- Primary white text (`var(--text-primary)`) for key headings/buttons
- Secondary text (`var(--text-secondary)`) for descriptions/subtitles
- Muted text (`var(--text-muted)`) for helper/meta labels

### C) Hard-coded colors outside tokens

In `app.js` there are a few direct colors (not token-based):
- Success state for signup button: line 84
  - `linear-gradient(135deg, #00c853, #00e676)`
- Success glow: line 85
  - `0 0 20px rgba(0, 200, 83, 0.4)`
- Desktop cursor glow: line 175
  - `radial-gradient(circle, rgba(255, 140, 0, 0.06) 0%, transparent 70%)`

### D) Quick edit recipes

- Change full site background mood:
  - edit `--bg-primary` (line 11)
  - optionally edit `--gradient-bg-glow` (lines 34–37)
- Change all pink-purple buttons at once:
  - edit `--gradient-primary` (line 30)
- Make subtitles stronger/lighter:
  - edit `--text-secondary` (line 19)
- Change date badge color globally:
  - edit `--neon-cyan` (line 23)

## 3) Hero area styles

- Hero badge style (where "Next Event" appears): `index.css` line 330 (`.hero-badge`)
- Hero title style: `index.css` line 368 (`.hero-title`)
- Gradient text inside hero title: `index.css` line 379 (`.hero-title .gradient-text`)

## 4) Buttons

- Hero primary button markup ("Get Tickets"): `index.html` line 68 (`.btn-primary`)
- Hero secondary button markup ("Learn More"): `index.html` line 78 (`.btn-secondary`)
- Primary button style: `index.css` line 421 (`.btn-primary`)
- Secondary button style: `index.css` line 458 (`.btn-secondary`)

## 5) Forms and email signup

- Community form markup: `index.html` line 106 (`.signup-form`)
- Community email input: `index.html` line 107 (`#communityEmail`)
- Signup form styles: `index.css` line 601
- Signup button styles: `index.css` line 630
- Form submit behavior (success state/reset): `app.js` line 74 (`handleSignup`)

## 6) Scroll and navigation behavior

- Navbar scroll state logic (`.scrolled` class toggle): `app.js` lines 9–16
- Threshold used for navbar effect: `app.js` line 11 (`currentScroll > 60`)
- Mobile menu toggle: `app.js` lines 20–29
- Smooth anchor scrolling: `app.js` lines 57–69

## 7) If you want to change only dates/time quickly

Edit these first in `index.html`:

- Hero next event date: line 53
- Event card dates: lines 140, 166, 193
