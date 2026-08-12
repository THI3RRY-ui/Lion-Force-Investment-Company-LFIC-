# Lion Force Investment Company Ltd — Website

Plain HTML/CSS/JS, no build step. Four pages: `index.html` (Home),
`about.html`, `services.html`, `contact.html`.

## Preview locally

Any static file server works, e.g. from this folder:

```
python -m http.server 8000
```

Then open `http://localhost:8000` in a browser. Opening the HTML files
directly by double-clicking also works, but the Google Maps embed on the
Contact page needs `http://` (not `file://`) to load.

## Adding photos

See `assets/images/README.md` for the exact filenames the site expects.
Drop a matching file into `assets/images/` and it appears on the site
immediately — no code edit required.

## Structure

```
index.html / about.html / services.html / contact.html
assets/
  css/style.css   — design tokens, layout, components, animations
  js/main.js      — nav, scroll reveal, sticky header, image placeholders
  images/         — drop real photos here (see README.md inside)
```
