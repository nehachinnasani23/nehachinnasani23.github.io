# Learn with Neha

Premium education and technology platform for Neha Chinnasani.

## Structure

- `content.js` stores learning paths, videos, topics, resources, articles, projects, links, and brand metadata.
- `app.js` renders reusable page templates and detail pages from the shared content model.
- `styles.css` contains the responsive premium visual system.
- `*.html` files are static page entry points that work on GitHub Pages without a build step.
- `sitemap.xml` and `robots.txt` are included for search engine readiness.

## Future Integrations

- YouTube API: replace `videos` in `content.js` with fetched channel data.
- Medium RSS: replace `articles` in `content.js` with parsed feed data.
- GitHub API: replace project repository links and metadata with live repository data.
- CMS: move `content.js` data into a headless CMS or JSON endpoint while keeping the same templates.
- Analytics: add the provider script in the shared HTML head or through a shared include when migrated to a framework.
