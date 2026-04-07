#!/usr/bin/env node

/**
 * Blog post scheduler.
 *
 * Scans content/drafts/ for posts whose article:published_time <= today,
 * copies them to blog/, and injects a card into blog/index.html.
 *
 * Usage:
 *   node scripts/publish.mjs            # publish posts due today or earlier
 *   node scripts/publish.mjs --dry-run  # preview without changing anything
 */

import { readFileSync, writeFileSync, copyFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, basename } from 'path';

const ROOT = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const DRAFTS_DIR = join(ROOT, 'content', 'drafts');
const BLOG_DIR = join(ROOT, 'blog');
const INDEX_PATH = join(BLOG_DIR, 'index.html');

const dryRun = process.argv.includes('--dry-run');

// ── Helpers ──────────────────────────────────────────────────────────────────

function extractMeta(html, pattern) {
  const match = html.match(pattern);
  return match ? match[1].trim() : null;
}

function formatDate(isoDate) {
  const d = new Date(isoDate);
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

const TAG_STYLES = {
  Feelings: 'background: var(--mauve);',
  Patterns: 'background: var(--tomato); color: white;',
  Identity: 'background: var(--orange);',
  Unsnag:   'background: var(--blush);',
};

function buildCard(filename, title, excerpt, tag, dateStr) {
  const style = TAG_STYLES[tag] || 'background: var(--mauve);';
  return `    <a href="${filename}" class="post-card" data-tag="${tag}">
      <div class="post-card-meta">
        <span class="post-card-tag" style="${style}">${tag}</span>
        <span class="post-card-date">${dateStr}</span>
      </div>
      <h2>${title}</h2>
      <p>${excerpt}</p>
      <span class="post-card-read">Read →</span>
    </a>`;
}

// ── Main ─────────────────────────────────────────────────────────────────────

const today = new Date();
today.setHours(23, 59, 59, 999); // include all of today

const indexHtml = readFileSync(INDEX_PATH, 'utf-8');
let published = 0;
let newCards = [];

const dirs = readdirSync(DRAFTS_DIR).filter(name => {
  const full = join(DRAFTS_DIR, name);
  return statSync(full).isDirectory() && existsSync(join(full, 'blog-post.html'));
});

for (const dir of dirs) {
  const slug = dir; // directory name = slug
  const destFilename = `${slug}.html`;
  const destPath = join(BLOG_DIR, destFilename);

  // Skip if already published
  if (existsSync(destPath)) {
    continue;
  }

  // Also skip if already in index (safety check)
  if (indexHtml.includes(`href="${destFilename}"`)) {
    continue;
  }

  const draftPath = join(DRAFTS_DIR, dir, 'blog-post.html');
  const html = readFileSync(draftPath, 'utf-8');

  // Extract metadata
  const publishTime = extractMeta(html, /article:published_time"\s+content="([^"]+)"/);
  if (!publishTime) {
    console.log(`⏭  ${dir}: no published_time found, skipping`);
    continue;
  }

  const publishDate = new Date(publishTime);
  if (publishDate > today) {
    console.log(`⏳ ${dir}: scheduled for ${publishDate.toISOString().slice(0, 10)}, not yet`);
    continue;
  }

  // Extract card content
  const rawTitle = extractMeta(html, /<title>([^<]+)<\/title>/);
  const title = rawTitle
    ? rawTitle.replace(/\s*[—–-]\s*Unsnag\s*(Blog)?\s*$/i, '').trim()
    : dir.replace(/-/g, ' ');
  const excerpt = extractMeta(html, /og:description"\s+content="([^"]+)"/) || '';
  const tag = extractMeta(html, /class="article-tag">([^<]+)</) || 'Feelings';
  const dateStr = formatDate(publishTime);

  console.log(`${dryRun ? '🔍' : '✅'} ${dir}: ${dryRun ? 'would publish' : 'publishing'} → ${destFilename}`);

  if (!dryRun) {
    // Copy the blog post
    copyFileSync(draftPath, destPath);
  }

  // Build the card HTML
  newCards.push(buildCard(destFilename, title, excerpt, tag, dateStr));
  published++;
}

// Inject new cards into index.html (prepend to posts-grid so newest appear first)
if (newCards.length > 0 && !dryRun) {
  const marker = '<div class="posts-grid">';
  const injection = newCards.join('\n\n');
  const updatedIndex = indexHtml.replace(marker, `${marker}\n\n${injection}\n`);
  writeFileSync(INDEX_PATH, updatedIndex, 'utf-8');
  console.log(`\n📝 Updated index.html with ${newCards.length} new card(s)`);
}

if (published === 0) {
  console.log('\nNothing to publish today.');
} else {
  console.log(`\n${dryRun ? 'Would publish' : 'Published'} ${published} post(s).`);
}
