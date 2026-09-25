# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static HTML/CSS/JS portfolio website (Spanish language) for a Data Science professional (`index.html`). There is also a Streamlit prototype (`test_main.py`) used for experimentation.

## Deployment

El sitio se despliega automáticamente en **GitHub Pages** al hacer push a `main`.
URL: `https://daso42.github.io/portafolio/`

## Running locally

```bash
python -m http.server 8080
```

Access at `http://localhost:8080`. On the local network use the machine's IPv4 address (e.g. `http://192.168.x.x:8080`).

## Architecture

Single-page site with scroll navigation (no build step):

- **`index.html`** — shell: sticky header, one `<section>` per block (`#inicio`, `#proyectos`, `#experiencia`, `#investigacion`, `#habilidades`, `#formacion`, `#contacto`), Open Graph meta, and an inline script that applies the saved theme before paint.
- **`data.js`** — single `PORTFOLIO` object with all content: `personal` (incl. optional `foto` and `cv` paths), `contacto`, `destacados` (hero stats strip), `experiencia`, `investigacion` (conference presentations), `proyectos` (optional `repo`, `imagen`), `habilidades` (technical skills grouped), `educacion`, `certificados`. Edit this file to update content.
- **`js/app.js`** — renders every section from `PORTFOLIO`. Includes the career chart (CSS Gantt built from `experiencia` + `investigacion` dates), scroll-spy for the nav (IntersectionObserver), light/dark toggle (saved in `localStorage`), and reveal-on-scroll animations.
- **`css/styles.css`** — all styling. Color tokens on `:root` (`--bg`, `--surface`, `--ink`, `--accent`, ...) redefined for dark mode via `prefers-color-scheme` and `[data-theme]`. Breakpoints at 900px, 700px and 480px. No `zoom` scaling.
- **`assets/favicon.svg`** — favicon.
- **`test/`** — standalone HTML design mockups, not part of the site.

## Key Notes

- All content is in Spanish.
- Fonts: Playfair Display (serif headings), Quicksand (body) and IBM Plex Mono (labels, dates), loaded from Google Fonts.
- Color theme: navy `#2f3a55`, burgundy `#8b3535`, cream `#e7e2de`, off-white `#f5f6f3`.
- `main.py` / `test_main.py` are older Streamlit versions (not part of the static site). Navigation uses `st.button` + `st.session_state.seccion`. To run: `streamlit run test_main.py`.
- No build step, no dependencies, no CI/CD.
