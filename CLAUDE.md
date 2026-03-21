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

The site has three files:

- **`index.html`** — shell with DOM placeholders and script/style imports.
- **`data.js`** — single `PORTFOLIO` object with all content (personal info, experience, projects, skills, education, certificates). Edit this file to update portfolio content.
- **`js/app.js`** — renders all sections from `PORTFOLIO` data into the DOM. Navigation is handled client-side via `showSection()` toggling CSS classes.
- **`css/styles.css`** — all styling. Uses CSS variables (`--navy`, `--burg`, `--cream`, `--offwhite`, `--gray`). Desktop applies `zoom: 1.3` on `.container`.

## Key Notes

- All content is in Spanish.
- Fonts: Playfair Display (serif headings) + Quicksand (body), loaded from Google Fonts.
- Color theme: navy `#2f3a55`, burgundy `#8b3535`, cream `#e7e2de`, off-white `#f5f6f3`.
- `test_main.py` is a Streamlit version (experimental). Navigation uses `st.button` + `st.session_state.seccion`. To run: `streamlit run test_main.py`.
- No build step, no dependencies, no CI/CD.
