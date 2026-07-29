# SG Rot-Weiss Frankfurt — Website Concept

A performance-focused, responsive one-page concept for **SG Rot-Weiss Frankfurt 1901 e.V.** built as a zero-dependency static site for Cloudflare Pages.

## Highlights

- Responsive editorial sports design in the club's red/white identity
- Real club content and imagery sourced from the official website
- Interactive mobile navigation, scroll progress, reveal animations and subtle hero tilt
- Accessibility support, semantic HTML and reduced-motion handling
- SEO metadata, favicon, sitemap, robots.txt and Cloudflare security/cache headers
- No framework runtime, no build step and no third-party tracking

## Local preview

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Cloudflare Pages deployment

1. Create a new Pages project and connect this GitHub repository.
2. Use **Framework preset: None**.
3. Leave **Build command** empty.
4. Set **Build output directory** to `/` (repository root).
5. Deploy.

For a custom domain, add it from **Pages → Custom domains** after the first successful deployment.

## Content note

This is a design/prototype implementation. Editorial copy, legal pages, current fixtures and membership documents continue to link to the official club website until a CMS or data migration is approved.
