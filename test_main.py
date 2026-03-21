import re
import streamlit as st
from datetime import datetime

st.set_page_config(
    page_title="Diego Santibanez | Cientifico de Datos",
    page_icon="",
    layout="wide",
    initial_sidebar_state="collapsed"
)

MESES_CORTO = {
    '01':'ENE','02':'FEB','03':'MAR','04':'ABR',
    '05':'MAY','06':'JUN','07':'JUL','08':'AGO',
    '09':'SEP','10':'OCT','11':'NOV','12':'DIC'
}
MESES_LARGO = {
    1:'Enero',2:'Febrero',3:'Marzo',4:'Abril',5:'Mayo',6:'Junio',
    7:'Julio',8:'Agosto',9:'Septiembre',10:'Octubre',11:'Noviembre',12:'Diciembre'
}

CSS = """
<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Quicksand:wght@400;500;600;700&display=swap');

html, body, [class*="css"] {
    font-family: 'Quicksand', sans-serif;
    -webkit-font-smoothing: antialiased;
}
.stApp { background-color: #f5f6f3; }
section[data-testid="stSidebar"] { display: none; }
header[data-testid="stHeader"] { background: #f5f6f3; border-bottom: 1px solid #e7e2de; }
.block-container { max-width: 1100px; padding-top: 1.5rem; padding-bottom: 3rem; }
div[data-testid="stVerticalBlock"] > div { padding-top: 0; }
.stMarkdown { font-family: 'Quicksand', sans-serif; }

/* ══ MASTHEAD ══ */
.masthead { padding: 1.5rem 0 0; }
.masthead-name {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.5rem, 6vw, 5.5rem);
    font-weight: 900; color: #2f3a55;
    text-align: center; letter-spacing: -0.01em; line-height: 1; margin: 0;
}
.m-amp { color: #8b3535; font-style: italic; }
.rule-h { border: none; border-top: 2.5px solid #2f3a55; margin: 0.4rem 0 0.15rem; }
.rule-l { border: none; border-top: 1px solid #2f3a55; margin: 0.15rem 0 0; }
.masthead-meta {
    display: flex; justify-content: space-between; align-items: center;
    font-size: 0.72rem; color: #6e6f73; font-weight: 500;
    letter-spacing: 0.04em; padding: 0.25rem 0.1rem;
}
.m-tagline {
    font-size: 0.67rem; letter-spacing: 0.22em; text-transform: uppercase;
    color: #2f3a55; font-weight: 700; font-style: italic;
}

/* ══ NAV ══ */
div[data-testid="stHorizontalBlock"]:first-of-type button {
    font-family: 'Quicksand', sans-serif !important;
    font-weight: 700 !important;
    font-size: 0.72rem !important;
    letter-spacing: 0.1em !important;
    text-transform: uppercase !important;
    border-radius: 2px !important;
    padding: 0.38rem 0.5rem !important;
    box-shadow: none !important;
    transition: all 0.2s ease !important;
}
div[data-testid="stHorizontalBlock"]:first-of-type button[kind="secondary"] {
    color: #6e6f73 !important;
    background: transparent !important;
    border: 1px solid transparent !important;
}
div[data-testid="stHorizontalBlock"]:first-of-type button[kind="secondary"]:hover {
    color: #2f3a55 !important;
    background: #e7e2de !important;
    border-color: #e7e2de !important;
}
div[data-testid="stHorizontalBlock"]:first-of-type button[kind="primary"] {
    color: #f5f6f3 !important;
    background: #2f3a55 !important;
    border: 1px solid #2f3a55 !important;
}

/* ══ HERO ══ */
.hero-panel {
    background: #e7e2de; border-radius: 3px;
    padding: 2.2rem 2.4rem 2rem;
}
.hero-status {
    font-size: 0.65rem; font-weight: 700; letter-spacing: 0.14em;
    text-transform: uppercase; color: #6e6f73; margin-bottom: 1.2rem;
}
.h-dot {
    display: inline-block; width: 6px; height: 6px;
    background: #8b3535; border-radius: 50%; margin-right: 0.4rem;
    vertical-align: middle;
}
.hero-name {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.7rem, 2.8vw, 2.6rem); font-weight: 700;
    color: #2f3a55; line-height: 1.1; margin-bottom: 0.35rem;
}
.hero-role {
    font-size: 0.72rem; font-weight: 700; letter-spacing: 0.15em;
    text-transform: uppercase; color: #8b3535; margin-bottom: 1.2rem;
}
.hero-bio {
    font-size: 0.88rem; color: #6e6f73; line-height: 1.85;
    text-align: justify; margin-bottom: 1.6rem;
}
.hero-cta { display: flex; gap: 0.6rem; flex-wrap: wrap; }
.btn-s {
    display: inline-block; padding: 0.48rem 1.2rem; background: #2f3a55;
    color: #f5f6f3 !important; text-decoration: none; font-weight: 700;
    font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase;
    border-radius: 2px;
}
.btn-g {
    display: inline-block; padding: 0.48rem 1.2rem; background: transparent;
    color: #2f3a55 !important; border: 1.5px solid #2f3a55; text-decoration: none;
    font-weight: 700; font-size: 0.72rem; letter-spacing: 0.1em;
    text-transform: uppercase; border-radius: 2px;
}

/* ══ STATS GRID ══ */
.stats-g {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 0.55rem; margin-bottom: 0.55rem;
}
.stat-c {
    background: #f5f6f3; border-radius: 2px;
    padding: 0.9rem 0.7rem; text-align: center;
}
.stat-n {
    font-family: 'Playfair Display', serif; font-size: 2rem; font-weight: 700;
    color: #2f3a55; line-height: 1; display: block;
}
.stat-l {
    font-size: 0.62rem; color: #6e6f73; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase;
    margin-top: 0.2rem; display: block;
}

/* ══ CONTACT MINI ══ */
.cm { background: #2f3a55; border-radius: 2px; padding: 0.9rem 1.1rem; }
.cmr {
    display: flex; align-items: baseline; gap: 0.5rem;
    padding: 0.28rem 0; border-bottom: 1px solid rgba(245,246,243,0.1);
    font-size: 0.78rem;
}
.cmr:last-child { border-bottom: none; }
.cml {
    font-size: 0.58rem; letter-spacing: 0.1em; text-transform: uppercase;
    color: rgba(231,226,222,0.45); min-width: 52px; flex-shrink: 0;
}
.cmv { color: #e7e2de; font-weight: 500; }
.cmv a { color: #e7e2de; text-decoration: none; }
.cmv a:hover { color: #f5f6f3; }

/* ══ SECTION HEADER ══ */
.sh-wrap { margin: 2.5rem 0 1.5rem; }
.sh-label {
    font-size: 0.63rem; font-weight: 700; letter-spacing: 0.22em;
    text-transform: uppercase; color: #6e6f73; text-align: center;
    padding: 0.3rem 0;
}
.sh-rule-t { border: none; border-top: 2px solid #2f3a55; margin: 0 0 2px; }
.sh-rule-b { border: none; border-top: 1px solid #2f3a55; margin: 2px 0 1.5rem; }

/* ══ EXPERIENCE CELLS ══ */
.ec { padding-bottom: 0.5rem; }
.ec-cat {
    font-size: 0.6rem; font-weight: 700; letter-spacing: 0.2em;
    text-transform: uppercase; color: #8b3535; margin-bottom: 0.3rem;
}
.ec-div { border: none; border-top: 1px solid #2f3a55; margin: 0.3rem 0 0.7rem; }
.ec-title {
    font-family: 'Playfair Display', serif; font-size: 1.1rem;
    font-weight: 700; color: #2f3a55; line-height: 1.2; margin-bottom: 0.2rem;
}
.ec-meta {
    font-size: 0.65rem; color: #6e6f73; font-weight: 600;
    letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 0.65rem;
}
.ec-b {
    font-size: 0.83rem; color: #2f3a55; line-height: 1.65;
    text-align: justify; margin-bottom: 0.45rem;
    padding-left: 0.75rem; text-indent: -0.75rem;
}
.ec-dash { color: #8b3535; font-weight: 700; }
.ec-links {
    display: flex; gap: 0.5rem; flex-wrap: wrap;
    margin: 0.1rem 0 0.35rem 0.75rem;
}
.ec-lnk {
    font-size: 0.6rem; font-weight: 700; letter-spacing: 0.1em;
    text-transform: uppercase; color: #8b3535; text-decoration: none;
    border-bottom: 1px solid #8b3535; padding-bottom: 1px;
}
.ec-lnk:hover { color: #2f3a55; border-color: #2f3a55; }
.ec-prize {
    display: inline-block; background: #8b3535; color: #f5f6f3;
    font-size: 0.58rem; font-weight: 700; letter-spacing: 0.08em;
    text-transform: uppercase; padding: 0.1rem 0.4rem; border-radius: 1px;
    margin-right: 0.3rem; vertical-align: middle;
}
.ec-sep { border: none; border-top: 1px solid #e7e2de; margin: 1.2rem 0 1rem; }

/* ══ VER MAS BUTTON ══ */
div[data-testid="stButton"] button {
    background: transparent !important;
    border: 1.5px solid #8b3535 !important;
    color: #8b3535 !important;
    font-size: 0.65rem !important;
    font-weight: 700 !important;
    letter-spacing: 0.12em !important;
    text-transform: uppercase !important;
    padding: 0.28rem 0.8rem !important;
    border-radius: 2px !important;
    box-shadow: none !important;
    min-height: 0 !important;
    line-height: 1.4 !important;
}
div[data-testid="stButton"] button:hover {
    background: #8b3535 !important;
    color: #f5f6f3 !important;
    border-color: #8b3535 !important;
}

/* ══ PROJECTS ══ */
.pj-cat {
    font-size: 0.6rem; font-weight: 700; letter-spacing: 0.2em;
    text-transform: uppercase; color: #8b3535; margin-bottom: 0.3rem;
}
.pj-div { border: none; border-top: 1px solid #2f3a55; margin: 0.3rem 0 1rem; }
.pj-title {
    font-family: 'Playfair Display', serif; font-size: 1.9rem;
    font-weight: 700; color: #2f3a55; line-height: 1.15; margin-bottom: 0.25rem;
}
.pj-year {
    font-size: 0.65rem; color: #6e6f73; font-weight: 600;
    letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 1rem;
}
.pj-desc {
    font-size: 0.92rem; color: #2f3a55; line-height: 1.85;
    text-align: justify; margin-bottom: 1.2rem;
}
.pj-tag {
    display: inline-block; padding: 0.2rem 0.55rem; margin: 0.1rem;
    border: 1.5px solid #2f3a55; color: #2f3a55; font-size: 0.62rem;
    font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    border-radius: 1px;
}
.pj-cta {
    display: inline-block; margin-top: 1rem; padding: 0.5rem 1.1rem;
    background: #2f3a55; color: #f5f6f3 !important;
    text-decoration: none; font-size: 0.7rem; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase; border-radius: 2px;
}
.pj-cta:hover { background: #8b3535; }
.pj-sep { border: none; border-top: 1px solid #e7e2de; margin: 2.5rem 0; }

/* ══ SKILLS ══ */
.sk-label {
    font-size: 0.6rem; font-weight: 700; letter-spacing: 0.2em;
    text-transform: uppercase; color: #6e6f73; margin-bottom: 0.3rem;
}
.sk-rule { border: none; border-top: 1.5px solid #2f3a55; margin: 0.3rem 0 1rem; }
.sk-tag {
    display: inline-block; padding: 0.26rem 0.65rem; margin: 0.16rem;
    border: 1.5px solid #2f3a55; color: #2f3a55;
    font-size: 0.76rem; font-weight: 600; border-radius: 1px;
}
.sk-soft {
    display: inline-block; padding: 0.26rem 0.65rem; margin: 0.16rem;
    border: 1.5px solid #6e6f73; color: #6e6f73;
    font-size: 0.76rem; font-weight: 600; border-radius: 1px;
}

/* ══ EDUCATION ══ */
.ed-label {
    font-size: 0.6rem; font-weight: 700; letter-spacing: 0.2em;
    text-transform: uppercase; color: #6e6f73; margin-bottom: 0.3rem;
}
.ed-rule { border: none; border-top: 1.5px solid #2f3a55; margin: 0.3rem 0 0.8rem; }
.ed-degree {
    font-family: 'Playfair Display', serif; font-size: 1.15rem;
    font-weight: 700; color: #2f3a55; line-height: 1.2; margin-bottom: 0.25rem;
}
.ed-inst {
    font-size: 0.68rem; color: #8b3535; font-weight: 700;
    letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 0.65rem;
}
.ed-body { font-size: 0.84rem; color: #6e6f73; line-height: 1.7; text-align: justify; }
.cert-r { padding: 0.65rem 0; border-bottom: 1px solid #e7e2de; }
.cert-r:last-child { border-bottom: none; }
.cert-t { font-weight: 700; color: #2f3a55; font-size: 0.86rem; margin-bottom: 0.1rem; }
.cert-m { font-size: 0.7rem; color: #6e6f73; margin-bottom: 0.2rem; }
.cert-a {
    font-size: 0.6rem; font-weight: 700; letter-spacing: 0.1em;
    text-transform: uppercase; color: #8b3535; text-decoration: none;
    border-bottom: 1px solid #8b3535; padding-bottom: 1px; display: inline-block;
}
.cert-a:hover { color: #2f3a55; border-color: #2f3a55; }

/* ══ CONTACT ══ */
.ct-item { padding: 0.9rem 0; border-bottom: 1px solid #e7e2de; }
.ct-item:last-child { border-bottom: none; }
.ct-label {
    font-size: 0.6rem; font-weight: 700; letter-spacing: 0.2em;
    text-transform: uppercase; color: #6e6f73; margin-bottom: 0.25rem;
}
.ct-val { font-size: 0.92rem; color: #2f3a55; font-weight: 600; }
.ct-val a { color: #2f3a55; text-decoration: none; }
.ct-val a:hover { color: #8b3535; }

/* ══ FOOTER ══ */
.ft-rule { border: none; border-top: 1px solid #e7e2de; margin: 3rem 0 1rem; }
.ft { text-align: center; font-size: 0.72rem; color: #6e6f73; letter-spacing: 0.06em; padding-bottom: 1rem; }

</style>
"""

st.markdown(CSS, unsafe_allow_html=True)


# --- Data ---

PORTFOLIO_DATA = {
    'nombre': 'Diego Santibanez Oyarce',
    'titulo': 'Cientifico de Datos',
    'bio': (
        'Egresado de Ingenieria Civil en Ciencia de Datos en Agosto 2025, '
        'apasionado por la tecnologia y con un gran interes en el uso de la inteligencia '
        'artificial como herramienta para la resolucion de problemas del mundo real. '
        'Mi formacion academica me proporciono una solida comprension de '
        'algoritmos de aprendizaje automatico, analisis y visualizacion de datos. '
        'Me gusta proponerme desafios donde pueda poner en practica mis '
        'conocimientos y donde ademas pueda aprender cosas nuevas.'
    ),
    'experiencia': [
        {
            'cargo': 'Asistente de Investigacion',
            'empresa': 'Universidad Tecnologica Metropolitana (UTEM)',
            'categoria': 'INVESTIGACION ACADEMICA',
            'fecha_inicio': '2023-12',
            'fecha_fin': '2025-09',
            'descripcion': (
                '- Presentacion poster en "1ras Jornadas de Ciencia de Datos y Salud Publica" de la Universidad de Chile en Enero de 2024\n'
                '    - [Certificado](https://drive.google.com/file/d/124VDD5x6pBidyC1Wx4ZLehAQixdjZ9dS/view?usp=sharing)\n'
                '    - [Poster](https://drive.google.com/file/d/1gRjnIt9xa5CYPhbgGFTKR1o5WV3RB8H6/view?usp=drive_link)\n'
                '- Flash Talk (5 min) y poster en CARLA 2024, Septiembre 2024\n'
                '    - [Certificado](https://drive.google.com/file/d/1jHc_2fZiakh2G9t8EkiB7Z3l0iuWBJ7n/view?usp=sharing)\n'
                '    - [Poster](https://drive.google.com/file/d/1jfS4S75dwoBnUMZ3xeQOFfBzX6HP5gpc/view?usp=drive_link)\n'
                '- Poster en "III Congreso Vive la Investigacion 2024", Octubre 2024\n'
                '    - [Certificado](https://drive.google.com/file/d/1unqW5oOxe5wl84-vmq4Y8AhXmD1sJJL_/view?usp=sharing)\n'
                '    - [Poster](https://drive.google.com/file/d/1OEKXi8gl7Z9bGySQ8esoomkDJLPiBLCE/view?usp=drive_link)\n'
                '- Poster en "XIV Congreso Argentino de Bioinformatica y Biologia Computacional", Noviembre 2024\n'
                '    - [Certificado](https://drive.google.com/file/d/1br_Vv35RmHxvyPScFlhDCJxucFz0ckii/view?usp=sharing)\n'
                '    - [Poster](https://drive.google.com/file/d/1wLUe3ssEY_XcOgoTbVJj0B5C7plK-G9n/view?usp=drive_link)\n'
                '- Flash Talk (15 min) en "III Reunion Anual de la Sociedad Chilena de Bioinformatica", Nov 2024. Invitacion a publicar manuscrito en "Bioinformatics Advances (Oxford University Press)"\n'
                '    - [Certificado](https://drive.google.com/file/d/1-dZ_CdZlYkd58OlGr3v92n8pLshnurje/view?usp=sharing)\n'
                '- Poster en CARLA 2025, Septiembre 2025. Obtencion premio al mejor poster\n'
                '    - [Certificado](https://drive.google.com/file/d/10tcRQonSWMgKQ8FciWOsCobzQAlWCPr9/view?usp=sharing)\n'
                '    - [Premio](https://drive.google.com/file/d/1M_MhsoB8BCUO5LITTVvQw0Hi9l7RU4Vj/view?usp=sharing)\n'
                '    - [Poster](https://drive.google.com/file/d/14Fc9u_zCtxiKG7RKW3W85Rv6X4OJy5HP/view?usp=drive_link)'
            )
        },
        {
            'cargo': 'Tecnico para Analisis de Datos Avanzado',
            'empresa': 'Universidad Tecnologica Metropolitana (UTEM)',
            'categoria': 'ANALISIS DE DATOS',
            'fecha_inicio': '2025-02',
            'fecha_fin': '2025-09',
            'descripcion': (
                '- Implementacion de web scraping con Python (Selenium y BeautifulSoup) para la extraccion automatizada de datos\n'
                '- Creacion de dashboards interactivos utilizando Plotly y Streamlit para visualizar avances del proyecto\n'
                '- Diseno y gestion de bases de datos en MariaDB y PostgreSQL para el almacenamiento de datos estructurados\n'
                '- Aplicacion de procesamiento de lenguaje natural para analisis y filtrado de datos'
            )
        },
        {
            'cargo': 'Ayudante de Catedra — Visualizacion de Datos',
            'empresa': 'Universidad Tecnologica Metropolitana (UTEM)',
            'categoria': 'DOCENCIA UNIVERSITARIA',
            'fecha_inicio': '2025-03',
            'fecha_fin': '2025-07',
            'descripcion': '- Ensenanza y mentoria a estudiantes en tecnicas de visualizacion de datos'
        },
        {
            'cargo': 'Practicante Profesional',
            'empresa': 'Contraloria General de la Republica',
            'categoria': 'SECTOR PUBLICO',
            'fecha_inicio': '2024-08',
            'fecha_fin': '2025-01',
            'descripcion': (
                '- Analisis de datos utilizando Impala y Oracle en entornos de produccion institucional\n'
                '- Desarrollo de consultas SQL y automatizacion de procesos mediante codigos de Python'
            )
        }
    ],
    'proyectos': [
        {
            'titulo': 'Dashboard de Avance de Proyecto',
            'categoria': 'DASHBOARD INTERACTIVO',
            'descripcion': (
                'Dashboard interactivo desarrollado con Streamlit para visualizar '
                'el avance y estado de los datos utilizados en el proyecto. '
                'Integra multiples fuentes de informacion y permite explorar el '
                'progreso en tiempo real a traves de visualizaciones dinamicas '
                'construidas con Plotly y DuckDB, incluyendo representaciones '
                'geograficas con Folium.'
            ),
            'tecnologias': ['Python', 'Streamlit', 'Pandas', 'Plotly', 'DuckDB', 'Folium'],
            'fecha': '2025',
            'link': 'https://dashboarddatalake-fiut-utem.streamlit.app/'
        }
    ],
    'habilidades_duras': [
        'Python', 'SQL', 'TensorFlow', 'scikit-learn', 'Pandas',
        'Jupyter Notebooks', 'Visualizacion de datos', 'Plotly',
        'Streamlit', 'Web Scraping', 'PostgreSQL', 'MariaDB', 'SpaCy'
    ],
    'habilidades_blandas': [
        'Resolucion de Problemas', 'Pensamiento Critico', 'Adaptabilidad',
        'Mentoria', 'Curiosidad intelectual', 'Responsabilidad',
        'Mentalidad de experimentacion', 'Mentalidad analitica'
    ],
    'educacion': [
        {
            'titulo': 'Ingeniero Civil en Ciencia de Datos',
            'institucion': 'Universidad Tecnologica Metropolitana (UTEM)',
            'fecha': '2020 — 2025',
            'descripcion': (
                'Formacion integral en algoritmos de aprendizaje automatico, '
                'analisis y visualizacion de datos, con enfoque en aplicaciones '
                'de inteligencia artificial para problemas del mundo real.'
            )
        }
    ],
    'certificados': [
        {
            'nombre': 'Power BI',
            'institucion': 'Santander X',
            'fecha': '2025',
            'link': 'https://drive.google.com/file/d/1IOp4gjfLcW8XhqbiwwOd9dzlz8l60P5q/view?usp=drive_link'
        },
        {
            'nombre': 'Ingles B2 Upper Intermediate',
            'institucion': 'Certificacion Internacional',
            'fecha': '2025',
            'link': 'https://drive.google.com/file/d/1KT12-fKSs20wCu_AO6c6nEHYi5_v0mK1/view?usp=sharing'
        },
        {
            'nombre': 'AWS Data Center Technician',
            'institucion': 'Amazon Web Services',
            'fecha': '2024',
            'link': 'https://drive.google.com/file/d/1pYCaTdbJQAmruxvoknp92QbIys4Bt7Ws/view?usp=sharing'
        },
        {
            'nombre': 'Introduccion a la Ciencia de Datos',
            'institucion': 'Santander Open Academy',
            'fecha': '2025',
            'link': 'https://drive.google.com/file/d/1vmeQuzoZEwUTC0Pz7Xl_rlobqXcreX5w/view?usp=sharing'
        }
    ]
}

CONTACTO = {
    'email': 'dsantibanezo@utem.cl',
    'linkedin': 'https://www.linkedin.com/in/diego-santibanez-oyarce/',
    'github': 'https://github.com/daso42',
    'telefono': '+56 9 8434 1477'
}


# --- Helpers ---

def fmt_fecha(s):
    if s is None:
        return 'PRESENTE'
    y, m = s.split('-')
    return f'{MESES_CORTO[m]} {y}'


def parse_exp_bullets(text):
    lines = text.split('\n')
    bullets = []
    current = None
    for line in lines:
        if not line.strip():
            continue
        stripped = line.strip()
        if line.startswith('    '):
            if current is not None:
                m = re.search(r'\[([^\]]+)\]\(([^)]+)\)', stripped)
                if m:
                    current['links'].append({'label': m.group(1), 'url': m.group(2)})
        elif stripped.startswith('- '):
            if current is not None:
                bullets.append(current)
            raw = stripped[2:]
            is_prize = 'premio al mejor' in raw.lower()
            display = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', raw)
            current = {'text': display, 'links': [], 'is_prize': is_prize}
    if current is not None:
        bullets.append(current)
    return bullets


def render_bullet_html(b):
    prize = '<span class="ec-prize">★ Premio</span> ' if b['is_prize'] else ''
    html = f'<div class="ec-b"><span class="ec-dash">—</span> {prize}{b["text"]}</div>'
    if b['links']:
        lnks = ' '.join([
            f'<a href="{l["url"]}" target="_blank" class="ec-lnk">{l["label"]}</a>'
            for l in b['links']
        ])
        html += f'<div class="ec-links">{lnks}</div>'
    return html


def render_exp_card(exp, idx):
    key = f"exp_open_{idx}"
    if key not in st.session_state:
        st.session_state[key] = False
    is_open = st.session_state[key]

    bullets = parse_exp_bullets(exp['descripcion'])
    bullets_to_show = bullets if is_open else bullets[:2]
    bullets_html = ''.join(render_bullet_html(b) for b in bullets_to_show)

    empresa_short = re.sub(r'\s*\([^)]*\)', '', exp['empresa']).strip()

    st.markdown(
        f'<div class="ec">'
        f'<div class="ec-cat">{exp["categoria"]}</div>'
        f'<hr class="ec-div">'
        f'<div class="ec-title">{exp["cargo"]}</div>'
        f'<div class="ec-meta">{empresa_short} · {fmt_fecha(exp["fecha_inicio"])} — {fmt_fecha(exp["fecha_fin"])}</div>'
        f'{bullets_html}'
        f'</div>',
        unsafe_allow_html=True
    )

    if len(bullets) > 2:
        label = "VER MENOS ↑" if is_open else "VER MAS →"
        if st.button(label, key=f"btn_{idx}"):
            st.session_state[key] = not is_open
            st.rerun()


SECCIONES = ['Inicio', 'Experiencia', 'Proyectos', 'Habilidades', 'Educacion', 'Contacto']

# --- Session state ---
if 'seccion' not in st.session_state:
    st.session_state.seccion = 'Inicio'


# --- Masthead (always visible) ---
now = datetime.now()
fecha_masthead = f"{MESES_LARGO[now.month]} {now.year}"

st.markdown(
    f'<div class="masthead">'
    f'<div class="masthead-name">DIEGO <span class="m-amp">&amp;</span> SANTIBANEZ</div>'
    f'<hr class="rule-h">'
    f'<div class="masthead-meta">'
    f'<span>Santiago, Chile</span>'
    f'<span style="font-style:italic;">Ciencia de Datos · Inteligencia Artificial · Ingenieria</span>'
    f'<span>{fecha_masthead}</span>'
    f'</div>'
    f'<hr class="rule-l">'
    f'<div style="text-align:center;padding:0.25rem 0;">'
    f'<span class="m-tagline">Cientifico de Datos — Egresado UTEM 2025</span>'
    f'</div>'
    f'</div>',
    unsafe_allow_html=True
)

# --- Nav ---
cols = st.columns(len(SECCIONES))
for i, s in enumerate(SECCIONES):
    with cols[i]:
        if st.button(s, key=f"nav_{s}", use_container_width=True,
                     type="primary" if s == st.session_state.seccion else "secondary"):
            st.session_state.seccion = s
            st.rerun()


# ═══════════════════════════════════════════════
# SECTIONS
# ═══════════════════════════════════════════════

if st.session_state.seccion == 'Inicio':

    num_exp   = len(PORTFOLIO_DATA['experiencia'])
    num_hard  = len(PORTFOLIO_DATA['habilidades_duras'])
    num_proj  = len(PORTFOLIO_DATA['proyectos'])
    num_certs = len(PORTFOLIO_DATA['certificados'])

    col_hero, col_right = st.columns([5, 3])

    with col_hero:
        st.markdown(
            f'<div class="hero-panel">'
            f'<div class="hero-status"><span class="h-dot"></span>Disponible para nuevas oportunidades</div>'
            f'<div class="hero-name">{PORTFOLIO_DATA["nombre"]}</div>'
            f'<div class="hero-role">{PORTFOLIO_DATA["titulo"]}</div>'
            f'<div class="hero-bio">{PORTFOLIO_DATA["bio"]}</div>'
            f'<div class="hero-cta">'
            f'<a href="mailto:{CONTACTO["email"]}" class="btn-s">Contactar</a>'
            f'<a href="{CONTACTO["linkedin"]}" target="_blank" class="btn-g">LinkedIn</a>'
            f'<a href="{CONTACTO["github"]}" target="_blank" class="btn-g">GitHub</a>'
            f'</div>'
            f'</div>',
            unsafe_allow_html=True
        )

    with col_right:
        st.markdown(
            f'<div class="stats-g">'
            f'<div class="stat-c"><span class="stat-n">{num_exp}</span><span class="stat-l">Experiencias laborales</span></div>'
            f'<div class="stat-c"><span class="stat-n">{num_hard}</span><span class="stat-l">Habilidades tecnicas</span></div>'
            f'<div class="stat-c"><span class="stat-n">{num_proj}</span><span class="stat-l">Proyecto destacado</span></div>'
            f'<div class="stat-c"><span class="stat-n">{num_certs}</span><span class="stat-l">Certificaciones</span></div>'
            f'</div>'
            f'<div class="cm">'
            f'<div class="cmr"><span class="cml">Email</span><span class="cmv"><a href="mailto:{CONTACTO["email"]}">{CONTACTO["email"]}</a></span></div>'
            f'<div class="cmr"><span class="cml">LinkedIn</span><span class="cmv"><a href="{CONTACTO["linkedin"]}" target="_blank">diego-santibanez-oyarce</a></span></div>'
            f'<div class="cmr"><span class="cml">GitHub</span><span class="cmv"><a href="{CONTACTO["github"]}" target="_blank">daso42</a></span></div>'
            f'<div class="cmr"><span class="cml">Fono</span><span class="cmv">{CONTACTO["telefono"]}</span></div>'
            f'</div>',
            unsafe_allow_html=True
        )


elif st.session_state.seccion == 'Experiencia':

    st.markdown(
        '<div class="sh-wrap">'
        '<hr class="sh-rule-t">'
        '<div class="sh-label">Trayectoria Profesional</div>'
        '<hr class="sh-rule-b">'
        '</div>',
        unsafe_allow_html=True
    )

    exps = PORTFOLIO_DATA['experiencia']
    col1, col2, col3 = st.columns(3)

    with col1:
        render_exp_card(exps[0], 0)

    with col2:
        render_exp_card(exps[1], 1)
        st.markdown('<hr class="ec-sep">', unsafe_allow_html=True)
        render_exp_card(exps[2], 2)

    with col3:
        render_exp_card(exps[3], 3)


elif st.session_state.seccion == 'Proyectos':

    st.markdown(
        '<div class="sh-wrap">'
        '<hr class="sh-rule-t">'
        '<div class="sh-label">Proyectos Destacados</div>'
        '<hr class="sh-rule-b">'
        '</div>',
        unsafe_allow_html=True
    )

    for i, p in enumerate(PORTFOLIO_DATA['proyectos']):
        if i > 0:
            st.markdown('<hr class="pj-sep">', unsafe_allow_html=True)

        tags_html = ''.join([f'<span class="pj-tag">{t}</span>' for t in p['tecnologias']])

        st.markdown(
            f'<div class="pj-cat">{p["categoria"]} · {p["fecha"]}</div>'
            f'<hr class="pj-div">'
            f'<div class="pj-title">{p["titulo"]}</div>'
            f'<div class="pj-year">AÑO: {p["fecha"]}</div>'
            f'<div class="pj-desc">{p["descripcion"]}</div>'
            f'<div>{tags_html}</div>'
            f'<a href="{p["link"]}" target="_blank" class="pj-cta">Ver Proyecto →</a>',
            unsafe_allow_html=True
        )


elif st.session_state.seccion == 'Habilidades':

    st.markdown(
        '<div class="sh-wrap">'
        '<hr class="sh-rule-t">'
        '<div class="sh-label">Competencias</div>'
        '<hr class="sh-rule-b">'
        '</div>',
        unsafe_allow_html=True
    )

    col1, col2 = st.columns(2)

    with col1:
        tags_html = ''.join([f'<span class="sk-tag">{s}</span>' for s in PORTFOLIO_DATA['habilidades_duras']])
        st.markdown(
            '<div class="sk-label">Habilidades Tecnicas</div>'
            '<hr class="sk-rule">'
            f'<div>{tags_html}</div>',
            unsafe_allow_html=True
        )

    with col2:
        soft_html = ''.join([f'<span class="sk-soft">{s}</span>' for s in PORTFOLIO_DATA['habilidades_blandas']])
        st.markdown(
            '<div class="sk-label">Habilidades Blandas</div>'
            '<hr class="sk-rule">'
            f'<div>{soft_html}</div>',
            unsafe_allow_html=True
        )


elif st.session_state.seccion == 'Educacion':

    st.markdown(
        '<div class="sh-wrap">'
        '<hr class="sh-rule-t">'
        '<div class="sh-label">Educacion &amp; Certificados</div>'
        '<hr class="sh-rule-b">'
        '</div>',
        unsafe_allow_html=True
    )

    col1, col2 = st.columns(2)

    with col1:
        st.markdown('<div class="ed-label">Formacion Principal</div><hr class="ed-rule">', unsafe_allow_html=True)
        for edu in PORTFOLIO_DATA['educacion']:
            st.markdown(
                f'<div class="ed-degree">{edu["titulo"]}</div>'
                f'<div class="ed-inst">{edu["institucion"]} · {edu["fecha"]}</div>'
                f'<div class="ed-body">{edu["descripcion"]}</div>',
                unsafe_allow_html=True
            )

    with col2:
        num_c = len(PORTFOLIO_DATA['certificados'])
        nombres = ', '.join([c['nombre'] for c in PORTFOLIO_DATA['certificados']])
        st.markdown(
            f'<div class="ed-label">Educacion Complementaria</div>'
            f'<hr class="ed-rule">'
            f'<div class="ed-degree">{num_c} Certificaciones Obtenidas</div>'
            f'<div class="ed-inst" style="margin-bottom:0.8rem;">Cursos y certificaciones profesionales</div>'
            f'<div class="ed-body">{nombres} — programas que complementan y amplian la formacion academica principal.</div>',
            unsafe_allow_html=True
        )

    st.markdown(
        '<hr style="border:none;border-top:2px solid #2f3a55;margin:2rem 0 1.2rem;">'
        '<div class="sh-label" style="text-align:left;margin-bottom:0.8rem;">CERTIFICACIONES</div>',
        unsafe_allow_html=True
    )

    certs_html = ''.join([
        f'<div class="cert-r">'
        f'<div class="cert-t">{c["nombre"]}</div>'
        f'<div class="cert-m">{c["institucion"]} · {c["fecha"]}</div>'
        f'<a href="{c["link"]}" target="_blank" class="cert-a">Ver Certificado</a>'
        f'</div>'
        for c in PORTFOLIO_DATA['certificados']
    ])
    st.markdown(f'<div style="max-width:560px;">{certs_html}</div>', unsafe_allow_html=True)


elif st.session_state.seccion == 'Contacto':

    st.markdown(
        '<div class="sh-wrap">'
        '<hr class="sh-rule-t">'
        '<div class="sh-label">Contacto</div>'
        '<hr class="sh-rule-b">'
        '</div>',
        unsafe_allow_html=True
    )

    col1, col2 = st.columns([3, 2])

    with col1:
        st.markdown(
            '<div style="font-family:\'Playfair Display\',serif;font-size:2rem;'
            'font-weight:700;color:#2f3a55;margin-bottom:0.5rem;">Hablemos.</div>'
            '<div style="font-size:0.88rem;color:#6e6f73;line-height:1.8;max-width:420px;'
            'text-align:justify;margin-bottom:1.5rem;">'
            'Estoy disponible para nuevas oportunidades en ciencia de datos, '
            'analisis e inteligencia artificial. No dudes en escribirme.'
            '</div>',
            unsafe_allow_html=True
        )

        contacts = [
            ('Email',    f'<a href="mailto:{CONTACTO["email"]}">{CONTACTO["email"]}</a>'),
            ('Telefono', CONTACTO['telefono']),
            ('LinkedIn', f'<a href="{CONTACTO["linkedin"]}" target="_blank">diego-santibanez-oyarce</a>'),
            ('GitHub',   f'<a href="{CONTACTO["github"]}" target="_blank">daso42</a>'),
        ]
        items_html = ''.join([
            f'<div class="ct-item">'
            f'<div class="ct-label">{label}</div>'
            f'<div class="ct-val">{value}</div>'
            f'</div>'
            for label, value in contacts
        ])
        st.markdown(f'<div style="max-width:400px;">{items_html}</div>', unsafe_allow_html=True)


# --- Footer ---
st.markdown('<hr class="ft-rule">', unsafe_allow_html=True)
st.markdown(
    f'<div class="ft">Diego Santibanez Oyarce · Cientifico de Datos · Santiago, Chile · {fecha_masthead}</div>',
    unsafe_allow_html=True
)
