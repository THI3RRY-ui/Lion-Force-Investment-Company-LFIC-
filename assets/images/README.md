# Image placeholders

Drop files into this folder using the **exact filenames** below — the site
already points at these paths, so each photo appears automatically as soon
as it lands here (no code changes needed). Until a file exists, the site
shows a soft labeled placeholder instead of a broken image icon.

| Filename | Used on | Suggested size | Notes |
|---|---|---|---|
| `logo.png` | Header + footer, every page | Square, ideally 500×500+ | The company logo. Transparent background (PNG) works best since it sits directly on the header/footer, no colored badge behind it. |
| `hero-home.jpg` | Home — hero background | 1920×1080 (landscape) | Wide establishing shot: office, a project site, or the team at work. This one gets a slow zoom animation, so avoid busy text/logos near the edges. |
| `office-buea.jpg` | Home + About — "Who We Are" | 1000×1250 (portrait, 4:5) | The Clerks Quarters office/storefront, or a team photo. |
| `founder-bate-joel-enow.jpg` | About — Leadership | 800×800 (square, 1:1) | Portrait of Bate Joel Enow, headshot-style. |
| `about-hero.jpg` | About — page banner | 1920×800 (wide) | Can reuse a similar shot to the home hero, ideally a different angle. |
| `services-hero.jpg` | Services — page banner | 1920×800 (wide) | Something that reads as "operations" — a site, warehouse, or vehicles. |
| `contact-hero.jpg` | Contact — page banner | 1920×800 (wide) | Exterior of the office, a street view of Clerks Quarters, or a welcoming shot. |
| `service-real-estate.jpg` | Services — Real Estate & Investment | 1000×750 (4:3) | Land, a property, or a site visit. |
| `service-general-commerce.jpg` | Services — General Commerce | 1000×750 (4:3) | Goods, a shop floor, or a transaction in progress. |
| `service-contracts-supplies.jpg` | Services — Contracts & Supplies | 1000×750 (4:3) | Stacked supplies, materials, or a delivery. |
| `service-import-export.jpg` | Services — Import & Export | 1000×750 (4:3) | Shipping containers, cargo, or a port/warehouse. |
| `service-wood-metal.jpg` | Services — Wood Processing & Metal Works | 1000×750 (4:3) | Timber, metal fabrication, or a workshop. |
| `service-manpower-hr.jpg` | Services — Manpower & HR | 1000×750 (4:3) | A team, interview, or workplace setting. |
| `service-logistics.jpg` | Services — Logistics & Transportation | 1000×750 (4:3) | A truck, loading, or transport in motion. |

**14 files total** (13 photos + the logo). JPG or PNG both work — just match
the filename exactly (case-sensitive) **and** make sure the file is actually
in that format, not just named that way. If a photo isn't square/landscape/
portrait as suggested, it will still work; it's just cropped to fill the
frame (`object-fit: cover`).

**A note on phone photos:** iPhones save photos as HEIC by default, which
no desktop browser can display — a file named `photo.jpg` that's actually
HEIC underneath will silently fail to show up. Before dropping a photo in
here, either turn off HEIC in the iPhone's Camera settings (Settings →
Camera → Formats → "Most Compatible") before taking the shot, or re-export
the photo as JPEG/PNG from Photos (Share → Save As, or open it in any photo
editor and "Save As" JPEG) before copying it into this folder.
