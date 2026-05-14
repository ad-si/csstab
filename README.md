# CSStab

A small, fast website for looking up CSS properties and selectors.
Pick a category, sort columns by clicking the headers,
and scan the table for what you need.

Live site: https://csstab.ad-si.com


## What's Included

- **Properties** — CSS 2.1 properties plus a curated set of modern additions
  (e.g. `accent-color`, `aspect-ratio`, `backdrop-filter`, `gap`,
  flex/grid layout, logical properties, container queries).
  Columns: name, allowed values, initial value, applies to,
  inherited, percentages, media.
- **Selectors** — Selectors from Levels 1 through 4
  (type, class, attribute, structural and logical pseudo-classes,
  pseudo-elements, shadow DOM selectors, etc.).
  Columns: pattern, meaning, level.

Every column is sortable.
The first column shows the original row number,
so you can always restore the default order.


## Local Development

Install dependencies:

```sh
npm install
```

Compile the stylesheet:

```sh
npm run build
```

Then open `index.html` in a browser, or serve the directory with any
static file server, e.g.:

```sh
npx http-server .
```

Other scripts:

```sh
npm run lint    # Lint JS sources with ESLint
npm test        # Currently runs the linter
npm run clean   # Remove the generated css/ directory
```


## Deployment

Pushes to `master` trigger `.github/workflows/deploy.yml`,
which builds the Sass, assembles a `_site/` directory
(`index.html` + `css/` + `js/`), and publishes it to GitHub Pages.
