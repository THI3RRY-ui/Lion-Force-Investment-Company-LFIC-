# Lion Force Investment Company Ltd , Website

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
immediately , no code edit required.

## Structure

```
index.html / about.html / services.html / contact.html
assets/
  css/style.css   , design tokens, layout, components, animations
  js/main.js      , nav, scroll reveal, sticky header, image placeholders
  images/         , drop real photos here (see README.md inside)
```


----------------------------

why have i placed 4 more vids in my videos folders in gallery, yet they arent showing on the site and i name them well as in gallery-video-0x.jpg, where x is the next number aand its not going, knowing fully well that's what am asking for when i said i wanted it all good to display cards for either photos or videos first by seeing the items in the folder then display them, rather than hardcoding that the section is to show a fixed number of values, meaning rather than placing 8 of them expecting 8 for either photos or videos, it should place one line that for e,g videos will recognize the gallery-video-xx, where xx is video number from 01 to any end 2 digit number, same for photos, so it shows cards based on number of photos or vids in cards


---------------------------


