# aclee.fr

Personal website for Arthur Clément. Plain HTML/CSS/JS — no framework, no build step.

## Structure

```
index.html          — page layout and all static content
styles.css          — styles (sand/dark themes via CSS variables)
app.js              — blog feed logic (loads markdown posts)
me.jpeg             — profile photo
posts/
  index.json        — ordered list of post slugs
  *.md              — one file per article (frontmatter + markdown body)
```

## Writing a New Article

Create a file in `posts/` with a slug as the filename:

```markdown
---
title: Your Title Here
date: Month DD, YYYY
excerpt: Short summary shown in the feed (1–2 sentences).
---

Article body in standard markdown.
```

Then add the slug to `posts/index.json` at the top (newest first).

## Running Locally

The blog feed uses `fetch()` to load markdown files, so it needs a local server — opening `index.html` directly via `file://` won't work for the blog.

```bash
npx serve .
# or
python3 -m http.server
```

## Deployment

Static files only. Drop onto any host that serves static content.
