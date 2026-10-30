# Aryan in ASCII

A portfolio drawn entirely in text characters: boxes, buttons, planets, an arcade of 13 games (plus a hidden one), achievements, a recruiter mode and live theme colors. No build step and no dependencies apart from the JetBrains Mono web font.

```
.
├── index.html      page shell
├── css/style.css   theme tokens and styles
├── js/main.js      everything else: content, layout, games, space background
├── favicon.svg
└── .nojekyll       tells GitHub Pages to serve files as they are
```

## Run it locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy to GitHub Pages

**As your main site (`aryan-curiel.github.io`)**

1. Copy these files into the root of the `aryan-curiel.github.io` repository (this replaces the current site, so keep a branch or tag of the old one if you want it).
2. Commit and push to the default branch.
3. In the repository, go to **Settings → Pages** and make sure the source is "Deploy from a branch", with the default branch and `/ (root)`.
4. After a minute the site is live at `https://aryan-curiel.github.io/`.

**As a separate project (`aryan-curiel.github.io/ascii`)**

1. Create a new repository, for example `ascii`, and push these files to it.
2. Enable Pages in **Settings → Pages** the same way.
3. It is served at `https://aryan-curiel.github.io/ascii/`. All paths are relative, so nothing needs changing.

## Edit the content

Everything is in `js/main.js`, near the top:

| Constant | What it holds |
| --- | --- |
| `EMAIL` | public email for the contact box (still a placeholder) |
| `LINKS` | LinkedIn and GitHub |
| `PROFILE` | name, title, summary |
| `EXPERIENCE` | one entry per role |
| `SKILLS`, `EDUCATION`, `LANGS` | skills by group, education, languages |
| `TIMELINE` | the compact career timeline |
| `WORDS` | skill words used by snake, breakout, invaders and the roguelike |

## Useful links

- `https://aryan-curiel.github.io/#recruiter` opens straight into recruiter mode (plain CV, no games).
- Theme, high scores and achievements are saved in each visitor's browser (`localStorage`).
