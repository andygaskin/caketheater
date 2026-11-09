# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Static deployment with client-rendered categories and cake details

Run `npm run generate` and deploy the contents of `.output/public`, including
`200.html`. The homepage and contact page are prerendered. Category listings and cake
detail pages fetch data in the browser from the live PHP API; `npm run dev`
continues to use the local mocks and does not require PHP/MySQL.

In the document-root `.htaccess`, after legacy redirects and rules that serve
existing files/directories, add:

```apache
# Let Nuxt handle cake detail URLs, including direct visits and refreshes.
RewriteRule ^cakes/[^/]+/?$ /200.html [L]
# Category listings, including Latest and numbered pages.
RewriteRule ^categories/[^/]+(?:/latest)?(?:/page/[0-9]+)?/?$ /200.html [L]
```

Remove old generated category and cake detail directories from the server when deploying
this change, since existing directories take precedence over this fallback.
Keep the PHP API and uploaded cake images on the server. Only the static homepage
requires regeneration to include new cakes.

Deploy the updated `public/api/category.php` together with the frontend: its response
is now `{ cakes, total, page, pageSize }`. It accepts `slug`, `page` (1-based), and
`sort` (`popular` or `latest`), returning 24 cakes per page. Popular sorts by score;
Latest sorts by creation date. Both use the cake ID to break ties.

Category URLs are `/categories/birthday`, `/categories/birthday/page/2`,
`/categories/birthday/latest`, and `/categories/birthday/latest/page/2`.
Check these with direct visits, refresh, Back/Forward, sorting, and pagination.
Development uses the existing mock collection, reversed for Latest because it has
no timestamps or scores; production uses database sorting and counts.

After deployment, check a direct cake URL, refresh it, navigate from the
homepage, and try an unknown slug. Also check that an API failure shows a retry
button. Cake-specific metadata updates in the browser; social previews may not
include it, and missing cakes display an in-app error rather than an HTTP 404.
