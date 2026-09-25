# Minsi Lu's website

This is a React and Vite website published at [minsilu.github.io](https://minsilu.github.io/). The editable source is in `site/`. The repository root contains the compiled static site so GitHub Pages can continue serving the `main` branch.

```sh
cd site
npm ci
npm run dev    # local development
npm run build  # update the static files in the repository root
```

Commit the source and generated root files together. Edit the profile, publications, teaching, and project list in `site/src/main.jsx`; edit the design in `site/src/styles.css`. The restored project articles live in `site/src/project-content/`, with their images in `site/public/projects/`. The build also preserves redirects from the original `/projects/<name>/` URLs.
