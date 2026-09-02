# CHILLMALMAMI — How to update the site

This is a step-by-step guide for making changes to https://chillmalmami.com.

The site is a plain HTML/CSS/JS project hosted on **GitHub Pages** and served through your **IONOS** domain. There is **no build step** — you edit a file, push to GitHub, and 30–60 seconds later the change is live.

---

## Table of contents

1. [The basic workflow (do this every time)](#1-the-basic-workflow-do-this-every-time)
2. [Common changes with examples](#2-common-changes-with-examples)
3. [Troubleshooting](#3-troubleshooting)
4. [Quick command reference](#4-quick-command-reference)
5. [Project structure](#5-project-structure)

---

## 1. The basic workflow (do this every time)

Every change follows the same 4 steps.

### Step 1 — Edit the file(s) locally

Open the project in VS Code:
```
/Users/iliass/Desktop/radio-sabor-landing
```

Edit whatever HTML/CSS/JS file you need. Save with **Cmd+S**.

### Step 2 — Preview locally in the browser

Double-click `index.html` in Finder to open it in your browser, or right-click in VS Code → **Open with Live Server** (if the extension is installed).

Check that your change looks right **before** pushing.

> **Tip**: if you don't see your change, do a hard refresh: **Cmd+Shift+R**.

### Step 3 — Push to GitHub

Open the Terminal in VS Code (**Ctrl+`**) and run these 3 commands, one after another:

```bash
git add -A
git commit -m "Short description of what you changed"
git push origin main
```

**Explanation of each command:**
- `git add -A` — stages every change you made (new files, edited files, deleted files)
- `git commit -m "..."` — takes a snapshot of the change with a description
- `git push origin main` — uploads the change to GitHub

### Step 4 — Wait ~1 minute, then check the live site

Open https://chillmalmami.com in your browser.  
Do a hard refresh: **Cmd+Shift+R**.

If you don't see the change after 2 minutes:
1. Go to https://github.com/iliassthemark-ctrl/chilmalmami/actions
2. Look at the top job — it should be green ✅
3. If it's yellow ⏳ wait a bit more
4. If it's red ❌ click it to see the error

---

## 2. Common changes with examples

### 🗓️ Change the next event date

Open `index.html` and find the event card you want to update (e.g. the first one):

```html
<div class="event-card-date">03 / 10 / 2026</div>
```

Change the date. **Format must be `DD / MM / YYYY`** (with the spaces around the `/`) or the countdown won't parse it.

The countdown on the homepage and the "Next Event" badge will **automatically update** to the nearest future date across all 3 event cards. You don't need to touch the countdown code.

### 📝 Change event details on eventone/eventtwo/eventthree pages

Open the corresponding file: `eventone.html`, `eventtwo.html`, or `eventthree.html`.

Common things to update:
- Event **title** — look for `<h1>` in the hero section
- Event **date** — look for the date text near the hero
- **Venue** — search for the venue name in the file
- **Ticket link** — search for `href="` and the current ticket URL, replace with new one
- **Lineup** — find the section with DJ/artist names

### 🖼️ Add a new image

1. Drop the image file into the project folder (`/Users/iliass/Desktop/radio-sabor-landing/`)
2. **IMPORTANT**: shrink it before committing. Open Terminal in the project folder and run:
   ```bash
   sips -Z 2000 -s formatOptions 82 YOUR_IMAGE.jpg
   ```
   (Replace `YOUR_IMAGE.jpg` with the real filename. For PNG use just `sips -Z 2000 YOUR_IMAGE.png`)
3. Reference the image in your HTML like:
   ```html
   <img src="YOUR_IMAGE.jpg" alt="Description of the image" />
   ```
4. Follow the [basic workflow](#1-the-basic-workflow-do-this-every-time) to push.

> ⚠️ **Never** commit an image bigger than ~1 MB. Big images make the site load slow and can hit hosting limits.

### 📄 Add a new event page

Easiest way: **copy an existing one**.

```bash
cp eventthree.html eventfour.html
```

Then open `eventfour.html` and:
- Change the `<title>`, meta description, canonical URL, and OG tags to match the new event
- Update the hero image, title, date, venue, description
- Update the lineup, tickets, gallery images

Then in `index.html`, add a new event card OR change one of the existing 3 to point at `eventfour.html`:
```html
<article class="event-card" data-event-target="eventfour.html">
```

Also add the new page to `sitemap.xml`:
```xml
<url>
  <loc>https://chillmalmami.com/eventfour.html</loc>
  <lastmod>2026-12-01</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.9</priority>
</url>
```

### 🎨 Change colors or fonts (CSS)

- **Homepage look** → edit `index.css`
- **Records + event pages look** → edit `styles.css`

Main color variables live near the top of each CSS file:
- `--golden-accent: #FBBF24;` in `index.css` (yellow)
- `--accent-warm: #FBBF24;` in `styles.css`
- `--dark-bg: #0F172A;` (dark navy)

Change these to change the site's theme.

> ⚠️ After changing CSS, **increase the cache-buster number** on the `<link>` tag in every HTML file, otherwise visitors' browsers may keep showing the old CSS. Example:
> ```html
> <link rel="stylesheet" href="index.css?v=9">
> ```
> Change `?v=9` to `?v=10`, etc.

### 📞 Publish the Impressum (legal — required in Germany)

1. Open `impressum.html` and replace the placeholder text with your real legal info:
   - Your full name
   - Your address
   - Your email
   - Your phone (recommended but not always required)
2. Un-hide the Impressum links: in each of these 5 files, find the line:
   ```html
   <!-- <a href="impressum.html">Impressum</a> -->
   ```
   Remove the `<!-- ` at the start and ` -->` at the end so it becomes:
   ```html
   <a href="impressum.html">Impressum</a>
   ```
   Files to update: `index.html`, `records.html`, `eventone.html`, `eventtwo.html`, `eventthree.html`
3. In `impressum.html`, remove or edit the yellow **TODO** placeholder banner at the top.
4. In `robots.txt`, remove the line `Disallow: /impressum.html` so search engines can index it (optional).
5. Follow the [basic workflow](#1-the-basic-workflow-do-this-every-time) to push.

### 🎁 Add or change YouTube / Spotify embeds (records page)

Open `records.html` and find the section (`records-youtube` or `records-spotify`). Each embed is a `<iframe>`.

To add a new YouTube video:
1. On YouTube, click **Share** → **Embed** → copy the `<iframe>` code
2. Paste it into the appropriate section in `records.html`

Same idea for Spotify: **Share** → **Embed track/playlist** → copy → paste.

---

## 3. Troubleshooting

### "I pushed but I don't see the change on the live site"

- Wait 60 seconds after pushing (GitHub Pages rebuild time)
- Hard refresh: **Cmd+Shift+R** in your browser
- Check https://github.com/iliassthemark-ctrl/chilmalmami/actions — look for a green checkmark
- Try opening the site in **Incognito/Private** mode (bypasses all cache)

### "I get an error when I try to `git push`"

Most common: someone (or GitHub Pages itself, e.g. for the CNAME file) changed the remote. Run:
```bash
git pull --rebase origin main
git push origin main
```

### "I broke the site — can I go back?"

Yes. Each `git commit` is a snapshot. To undo the **last commit** (before pushing):
```bash
git reset --soft HEAD~1
```
That keeps your changed files but removes the commit — you can now edit and re-commit.

To undo **after** you already pushed a broken commit:
```bash
git revert HEAD
git push origin main
```
This creates a new commit that reverses the last one. Safer than force-pushing.

### "SSL error / can't reach site"

- If it worked before and stops working: check https://github.com/iliassthemark-ctrl/chilmalmami/settings/pages — HTTPS should still be enforced and DNS should be green.
- If DNS check turns red: verify IONOS DNS records still point to GitHub Pages IPs (see below).

### IONOS DNS records (for reference)

Your domain `chillmalmami.com` needs these DNS records at IONOS:

| Type | Host | Points to |
|------|------|-----------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | iliassthemark-ctrl.github.io |

Don't delete these or the site will go down.

---

## 4. Quick command reference

Open Terminal in VS Code (**Ctrl+`**), then:

```bash
# See what files you changed
git status

# See the exact changes
git diff

# Push a change
git add -A
git commit -m "Description of change"
git push origin main

# Pull latest changes from GitHub (if you edited on github.com directly)
git pull origin main

# See recent commits
git log --oneline -10

# Optimize a big image before committing (macOS built-in)
sips -Z 2000 -s formatOptions 82 IMAGE.jpg   # for JPEG
sips -Z 2000 IMAGE.png                        # for PNG
```

---

## 5. Project structure

```
radio-sabor-landing/
├── index.html          Homepage
├── records.html        Records label page
├── eventone.html       Event page 1 (Accra - Sandbox Beach)
├── eventtwo.html       Event page 2 (March - CBE & YUCA)
├── eventthree.html     Event page 3 (Sunset Groove - MS Rheinfantasie)
├── impressum.html      Legal Impressum (currently hidden, WIP)
│
├── index.css           Homepage styles
├── styles.css          Records + event page styles
│
├── app.js              Homepage JS (countdown, gallery, event cards)
├── script.js           Sub-page JS
│
├── CNAME               Tells GitHub Pages the custom domain (do not delete)
├── robots.txt          Tells search engines what to crawl
├── sitemap.xml         List of pages for Google
├── .gitignore          Files git should ignore
│
├── last.png            Logo / favicon
├── chillmalmamiimg.png Homepage hero image
├── obenoffbar.jpg      Event 1 hero
├── DSC09329.jpg        Event 2 hero
├── DSC09169.jpg        Event 3 hero
├── ...other images...  Gallery images, etc.
│
└── _originals_backup/  Original hi-res images (LOCAL ONLY, not on GitHub)
```

---

## 6. Where things live (external accounts)

- **Code (source of truth)**: https://github.com/iliassthemark-ctrl/chilmalmami
- **Hosting**: GitHub Pages (free, automatic)
- **Domain**: IONOS (registrar for `chillmalmami.com`)
- **Old backup remote**: `gitlab` remote points to https://gitlab.com/iliassthemark/chillmalmami (not auto-updated — push there manually with `git push gitlab main` if you want a backup)

---

**Last updated**: 2026-09-02
