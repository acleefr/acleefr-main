// ==========================================
// ARTHUR CLÉMENT - MINIMALIST WORKSTATION LOGIC
// ==========================================

// Global state
let currentTheme = localStorage.getItem('theme') || 'sand';
let activePostSlug = null;
let blogPosts = [];

// Parse YAML-style frontmatter from a markdown file
function parseFrontmatter(slug, raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { slug, title: slug, date: '', excerpt: '', content: raw };

  const meta = {};
  match[1].split('\n').forEach(line => {
    const colon = line.indexOf(':');
    if (colon === -1) return;
    const key = line.slice(0, colon).trim();
    const val = line.slice(colon + 1).trim();
    meta[key] = val;
  });

  return {
    slug,
    title: meta.title || slug,
    date: meta.date || '',
    excerpt: meta.excerpt || '',
    content: match[2].trim()
  };
}

// Simple Markdown Parser
function parseMarkdown(mdText) {
  let html = mdText
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^\* (.*$)/gim, '<li>$1</li>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');

  html = html.replace(/(<li>.*<\/li>)/gims, '<ul>$1</ul>');

  html = html.split('\n').map(line => {
    const t = line.trim();
    if (t.startsWith('<h') || t.startsWith('<ul') || t.startsWith('<li') ||
        t.startsWith('<block') || t === '<hr>' || t === '') {
      return t === '---' ? '<hr>' : line;
    }
    return `<p>${line}</p>`;
  }).join('');

  return html;
}

// Render Blog Column Content
function renderBlogColumn() {
  const container = document.getElementById('blog-column-content');
  if (!container) return;

  if (activePostSlug === null) {
    let listHtml = '<div class="blog-list">';
    blogPosts.forEach(post => {
      listHtml += `
        <article class="blog-card" onclick="viewPost('${post.slug}')">
          <div class="blog-card-date">${post.date}</div>
          <h2 class="blog-card-title">${post.title}</h2>
          <p class="blog-card-excerpt">${post.excerpt}</p>
          <span class="blog-card-more">Read article →</span>
        </article>
      `;
    });
    listHtml += '</div>';
    container.innerHTML = listHtml;
  } else {
    const post = blogPosts.find(p => p.slug === activePostSlug);
    if (!post) { activePostSlug = null; renderBlogColumn(); return; }

    const isHTML = post.content.trim().startsWith('<p') || post.content.trim().startsWith('<div');
    const parsedBody = isHTML ? post.content : parseMarkdown(post.content);

    container.innerHTML = `
      <div class="blog-post-view">
        <span class="back-to-blog" onclick="backToFeed()">← back_to_feed()</span>
        <div style="font-family: var(--font-mono); font-size:12px; color: var(--text-muted); margin-bottom: 8px;">
          ${post.date}
        </div>
        <h1 style="margin-top: 0; line-height: 1.2; font-size: 22px;">${post.title}</h1>
        <div style="margin-top: 24px;">
          ${parsedBody}
        </div>
      </div>
    `;
  }

  container.scrollTop = 0;
}

// Navigation
window.viewPost = function(slug) { activePostSlug = slug; renderBlogColumn(); };
window.backToFeed = function() { activePostSlug = null; renderBlogColumn(); };

// Parse projects.md — blank-line-separated key: value blocks
function parseProjects(text) {
  return text.trim().split(/\n{2,}/).map(block => {
    const obj = {};
    block.split('\n').forEach(line => {
      const idx = line.indexOf(':');
      if (idx === -1) return;
      obj[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
    });
    return obj;
  }).filter(p => p.name && p.url);
}

function renderProjects(projects) {
  const container = document.getElementById('projects-column-content');
  if (!container) return;
  container.innerHTML = '<div class="project-list-v2">' +
    projects.map(p => `
      <div class="project-item">
        <a href="${p.url}" target="_blank" class="project-name-link">${p.name} →</a>
        ${p.description ? `<p class="project-description">${p.description}</p>` : ''}
      </div>`
    ).join('') +
    '</div>';
}

async function loadProjects() {
  try {
    const res = await fetch('projects.md');
    const text = await res.text();
    renderProjects(parseProjects(text));
  } catch (err) {
    console.error('Failed to load projects:', err);
    const container = document.getElementById('projects-column-content');
    if (container) container.innerHTML = '';
  }
}

// Load posts from /posts directory
async function loadPosts() {
  try {
    const indexRes = await fetch('posts/index.json');
    const slugs = await indexRes.json();

    const posts = await Promise.all(
      slugs.map(async slug => {
        const res = await fetch(`posts/${slug}.md`);
        const text = await res.text();
        return parseFrontmatter(slug, text);
      })
    );

    blogPosts = posts;
    renderBlogColumn();
  } catch (err) {
    console.error('Failed to load posts:', err);
    container.innerHTML = '<p style="color:var(--text-muted)">Could not load posts.</p>';
  }
}

// Set application theme
function setTheme(themeName) {
  if (themeName === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.getElementById('theme-toggle-action').textContent = 'theme: dark';
  } else {
    document.documentElement.removeAttribute('data-theme');
    document.getElementById('theme-toggle-action').textContent = 'theme: sand';
  }
  currentTheme = themeName;
  localStorage.setItem('theme', themeName);
}

// Initial Setup
document.addEventListener('DOMContentLoaded', () => {
  setTheme(currentTheme);
  const toggleBtn = document.getElementById('theme-toggle-action');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      setTheme(currentTheme === 'sand' ? 'dark' : 'sand');
    });
  }

  loadProjects();
  loadPosts();
});
