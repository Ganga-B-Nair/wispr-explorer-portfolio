# Ganga B Nair — The Explorer's Portfolio

An adventure-map portfolio: a playful loading screen, a hero welcome, and an
interactive explorer's map where each land is one of the fields I explore. My
cartoon self walks the trail and swaps gear to match each domain.

## Prompt log

I dictated every prompt used to build this site with Wispr Flow. They're all
recorded, unedited, in [`PROMPT_LOG.md`](PROMPT_LOG.md).

## Run it locally

No build step and nothing to install. From this folder:

```bash
# Python (already on D:\python-3-11)
python -m http.server 5500
```

Then open http://localhost:5500. (Opening `index.html` directly also mostly
works, but a local server is closer to how it runs once deployed.)

## Put it on GitHub

```bash
git init
git add .
git commit -m "Explorer portfolio: loader, hero and adventure map"
git branch -M main
git remote add origin https://github.com/Ganga-B-Nair/wispr-explorer-portfolio.git
git push -u origin main
```

## Deploy

- **GitHub Pages:** go to Settings → Pages → Deploy from branch → `main` / root.
- **Vercel / Netlify:** import the repo. Framework: "Other", with no build command and the output dir set to `/`.

## Project structure

```
index.html          markup: loader, hero, map, Wispr Line, island page template
css/style.css       all styling and animations
js/lands.js         ✏️ the words on every island page (edit this!)
js/main.js          loader, map trail, explorer movement, island pages + router
js/wispr.js         the scroll-driven train track ("The Wispr Line")
js/music.js         original adventure theme, synthesised with Web Audio
assets/img/         character cut-outs (WebP) and favicon
```

## Pages

The site is one HTML file. Each "page" has its own link, and the music keeps
playing as you move between them.

| Link                   | What it shows                                |
|------------------------|----------------------------------------------|
| `/`                    | Hero, then the map, then the Wispr Line       |
| `/#map`                | Jumps to the map                             |
| `/#wispr`              | Jumps to "How I found Wispr Flow"            |
| `/#land-uiux` etc.     | An island's own page                         |

Island ids: `start`, `web`, `uiux`, `ai`, `cyber`, `hack`, `robotics`,
`music`, `writing`, `anchor`, `startup`, `treasure`.

## Editing content

- **Island pages:** edit `js/lands.js`. Each land has a tagline, story
  paragraphs, project cards, skills, a fun fact and theme colours. The map's
  side journal reads from the same file, so you only write things once.
- **The Wispr Line:** the station text is plain HTML inside
  `<section id="wispr">` in `index.html`.
- **Map positions, names and gear:** edit the `STOPS` array at the top of `js/main.js`.
- **Map art:** each landmark is a `<g class="lm" data-stop="...">` in `index.html`.
- **Accessories:** each one is a `<symbol id="acc-...">` in the sprite at the top of `index.html`.
- **Music:** the melody and chords are plain arrays in `js/music.js`.
