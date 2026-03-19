# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Single-file Streamlit portfolio website (Spanish language) for a Data Science professional. Deployed on Streamlit Cloud at https://portafolio-daso.streamlit.app/ with automatic deployment on push to main.

## Running the App

```bash
streamlit run main.py
```

No additional dependencies beyond `streamlit` (no requirements.txt exists). Hot reload is enabled via `.streamlit/config.toml` (`runOnSave = true`).

## Architecture

**Single entry point:** `main.py` (~484 lines) contains all application logic, data, and styling.

- **Navigation:** Sidebar buttons set `st.session_state.seccion`, and an `if/elif` chain renders the corresponding page section (Inicio, Experiencia, Proyectos, Habilidades, Educación & Certificados, Contacto).
- **Data:** All portfolio content lives in the `PORTFOLIO_DATA` dictionary and `CONTACTO` dictionary at the top of main.py.
- **Styling:** Custom CSS is injected via `st.markdown` with `unsafe_allow_html=True`. Uses gradient theme (red `#ff4b4b` to orange `#ff8700`).
- **Fonts:** Quicksand font family (5 weights) served from `assets/` and configured in `.streamlit/config.toml`.

## Key Notes

- All content is in Spanish.
- There are no tests, linting config, or CI/CD pipelines — deployment is handled entirely by Streamlit Cloud.
- No `requirements.txt` or `pyproject.toml` exists; the only external dependency is `streamlit`.
