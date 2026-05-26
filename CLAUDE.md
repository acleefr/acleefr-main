# aclee.fr — Personal Website

## Project Overview
Static personal website for Arthur Clément (aclee.fr). Three-column layout: left bio/career, center blog feed, right projects/socials. No build step — plain HTML, CSS, JS served directly.

## Files
- `index.html` — full page markup (all content lives here)
- `styles.css` — all styles including dark/sand theme via CSS variables
- `app.js` — blog feed logic: loads posts from `posts/` directory
- `me.jpeg` — profile photo
- `posts/index.json` — ordered list of post slugs (controls display order)
- `posts/*.md` — one markdown file per article with frontmatter

## Adding a New Article
1. Create `posts/your-slug.md` with this header:
   ```
   ---
   title: Your Title
   date: Month DD, YYYY
   excerpt: One or two sentence summary shown in the feed.
   ---

   Article body in markdown...
   ```
2. Add `"your-slug"` to `posts/index.json` at the desired position (top = newest)

## Key Conventions

### Project cards (right column)
- Display only the subdomain/short name — never the full `aclee.fr` domain (e.g., `coalition`, not `coalition.aclee.fr`)
- All items are linked `<a class="project-card">`; no more static cards

### Career sections (left column)
- "Currently at" section comes before "Previously at"
- Currently at: Diabolocom
- Previously at: Buildrz, SFR, French Defense Dept., Zeborne

### Themes
- Two themes: `sand` (light, default) and `dark`, toggled via the button in the right column
- Theme persisted in `localStorage`

### Blog
- No WordPress or network dependency — posts load from local `posts/*.md` files via `fetch()`
- Requires a web server (won't work via `file://` protocol locally)
- Markdown parsed client-side via `parseMarkdown()` in `app.js`
- Article view shows date only — no link to original post

## Social / External Links
- X (prev. Twitter): x.com/acleefr
- Instagram: instagram.com/arthur.clemnt
- imagesalbumcovers: instagram.com/imagesalbumcovers
- LinkedIn: linkedin.com/in/acleefr
- GitHub: github.com/acleefr
