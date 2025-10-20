import streamlit as st
from datetime import datetime

st.set_page_config(
    page_title="Diego Santibáñez | Científico de Datos",
    page_icon="💼",
    layout="wide",
    initial_sidebar_state="collapsed"
)

st.markdown("""
    <style>
    .main-header {
        font-size: 3.5rem;
        font-weight: 700;
        text-align: center;
        margin-bottom: 0.5rem;
        background: linear-gradient(120deg, #ff4b4b, #ff8700);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .sub-header {
        font-size: 1.8rem;
        text-align: center;
        color: var(--text-color);
        margin-bottom: 3rem;
        font-weight: 300;
        opacity: 0.8;
    }
    .card {
        background-color: rgba(255, 75, 75, 0.05);
        border: 1px solid rgba(255, 75, 75, 0.2);
        border-radius: 15px;
        padding: 1.5rem;
        margin-bottom: 1.5rem;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        transition: all 0.3s ease;
    }
    .card:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 8px rgba(255, 75, 75, 0.2);
        border-color: rgba(255, 75, 75, 0.4);
    }
    .skill-badge {
        display: inline-block;
        padding: 0.5rem 1rem;
        margin: 0.3rem;
        background-color: rgba(255, 75, 75, 0.15);
        color: #ff4b4b;
        border: 1px solid rgba(255, 75, 75, 0.3);
        border-radius: 25px;
        font-weight: 600;
        font-size: 0.9rem;
        transition: all 0.3s ease;
    }
    .skill-badge:hover {
        background-color: #ff4b4b;
        color: white;
        transform: scale(1.05);
    }
    .soft-skill-badge {
        display: inline-block;
        padding: 0.5rem 1rem;
        margin: 0.3rem;
        background-color: rgba(255, 135, 0, 0.15);
        color: #ff8700;
        border: 1px solid rgba(255, 135, 0, 0.3);
        border-radius: 25px;
        font-weight: 600;
        font-size: 0.9rem;
        transition: all 0.3s ease;
    }
    .soft-skill-badge:hover {
        background-color: #ff8700;
        color: white;
        transform: scale(1.05);
    }
    .timeline-item {
        border-left: 4px solid #ff4b4b;
        padding-left: 2rem;
        margin-bottom: 2.5rem;
        position: relative;
    }
    .timeline-dot {
        position: absolute;
        left: -0.75rem;
        width: 1.3rem;
        height: 1.3rem;
        background-color: #ff4b4b;
        border-radius: 50%;
        border: 3px solid var(--background-color);
        box-shadow: 0 0 0 3px rgba(255, 75, 75, 0.3);
    }
    .contact-icon {
        font-size: 1.5rem;
        margin-right: 0.5rem;
    }
    .cert-card {
        background: linear-gradient(135deg, rgba(255, 75, 75, 0.2) 0%, rgba(255, 135, 0, 0.2) 100%);
        border: 2px solid rgba(255, 75, 75, 0.3);
        color: var(--text-color);
        border-radius: 15px;
        padding: 2rem;
        margin-bottom: 1.5rem;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        transition: all 0.3s ease;
    }
    .cert-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 12px rgba(255, 75, 75, 0.3);
    }
    .cert-card h3 {
        color: #ff4b4b;
        margin-bottom: 0.5rem;
    }
    .cert-card {
        background: linear-gradient(135deg, rgba(255, 75, 75, 0.2) 0%, rgba(255, 135, 0, 0.2) 100%);
        border: 2px solid rgba(255, 75, 75, 0.3);
        color: var(--text-color);
        border-radius: 15px;
        padding: 2rem;
        margin-bottom: 1.5rem;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        transition: all 0.3s ease;
    }
    .cert-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 12px rgba(255, 75, 75, 0.3);
    }
    .cert-card h3 {
        color: #ff4b4b;
        margin-bottom: 0.5rem;
    }
    .stTabs [data-baseweb="tab-list"] {
        gap: 2rem;
        justify-content: center;
    }
    .stTabs [data-baseweb="tab"] {
        height: 4rem;
        font-size: 1.1rem;
        font-weight: 600;
    }
    </style>
""", unsafe_allow_html=True)

PORTFOLIO_DATA = {
    'nombre': 'Diego Santibáñez Oyarce',
    'titulo': 'Científico de datos',
    'bio': '''
    Egresado de Ingeniería Civil en Ciencia de datos en Agosto 2025, apasionado por la tecnología y con un gran interés en el uso de la inteligencia 
    artificial como herramienta para la resolución de problemas del mundo real. Mi formación académica me proporcionó una sólida comprensión de 
    algoritmos de aprendizaje automático, análisis y visualización de datos. Me gusta proponerme desafíos donde pueda poner en práctica mis 
    conocimientos y donde además pueda aprender cosas nuevas.
    ''',
    'experiencia': [
        {
            'cargo': 'Asistente de investigación',
            'empresa': 'Universidad Tecnológica Metropolitana (UTEM)',
            'fecha_inicio': '2023-12',
            'fecha_fin': '2025-09',
            'descripcion': '''
                - Presentación poster en "1ras Jornadas de Ciencia de Datos y Salud Pública" de la Universidad de Chile en Enero de 2024
                    - [Certificado de participación](https://drive.google.com/file/d/124VDD5x6pBidyC1Wx4ZLehAQixdjZ9dS/view?usp=sharing)
                    - [link poster](https://drive.google.com/file/d/1gRjnIt9xa5CYPhbgGFTKR1o5WV3RB8H6/view?usp=drive_link)
                - Flash Talk (5 minutos) y presentación de poster en Carla2024 en Septiembre 2024
                    - [Certificado de participación](https://drive.google.com/file/d/1jHc_2fZiakh2G9t8EkiB7Z3l0iuWBJ7n/view?usp=sharing)
                    - [link poster](https://drive.google.com/file/d/1jfS4S75dwoBnUMZ3xeQOFfBzX6HP5gpc/view?usp=drive_link)
                - Presentación poster en "III Congreso Vive la Investigación 2024" en Octubre 2024
                    - [Certificado de participación](https://drive.google.com/file/d/1unqW5oOxe5wl84-vmq4Y8AhXmD1sJJL_/view?usp=sharing)
                    - [link poster](https://drive.google.com/file/d/1OEKXi8gl7Z9bGySQ8esoomkDJLPiBLCE/view?usp=drive_link)
                - Presentación de poster en "XIV Congreso Argentino de Bioinformática y Biología Computacional" en Noviembre de 2024
                    - [Certificado de participación](https://drive.google.com/file/d/1br_Vv35RmHxvyPScFlhDCJxucFz0ckii/view?usp=sharing)
                    - [link poster](https://drive.google.com/file/d/1wLUe3ssEY_XcOgoTbVJj0B5C7plK-G9n/view?usp=drive_link)
                - Flash Talk (15 minutos) en "III Reunión Anual de la Sociedad Chilena de Bioinformática" en Noviembre de 2024. Invitación a publicar un manuscrito en revista "Bioinformatics Advances (Oxford University Press)".
                    - [Certificado de participación](https://drive.google.com/file/d/1-dZ_CdZlYkd58OlGr3v92n8pLshnurje/view?usp=sharing)
                - Presentación de poster en Carla2025 en Septiembre 2025. Obtención premio al mejor poster.
                    - [Certificado de participación](https://drive.google.com/file/d/10tcRQonSWMgKQ8FciWOsCobzQAlWCPr9/view?usp=sharing)
                    - [Premio al mejor poster](https://drive.google.com/file/d/1M_MhsoB8BCUO5LITTVvQw0Hi9l7RU4Vj/view?usp=sharing)
                    - [link poster](https://drive.google.com/file/d/14Fc9u_zCtxiKG7RKW3W85Rv6X4OJy5HP/view?usp=drive_link)
                '''
        },
        {
            'cargo': 'Técnico para análisis de datos avanzado',
            'empresa': 'Universidad Tecnológica Metropolitana (UTEM)',
            'fecha_inicio': '2025-02',
            'fecha_fin': '2025-09',
            'descripcion': '''
                - Implementación de web scrapping con Python (Selenium y BeautifulSoup) para la extracción automatizada de datos
                - Creación de dashboard interactivos utilizando Plotly y Streamlit para visualizar avances del proyecto
                - Diseño y gestión de bases de datos en MariaDB y PostgreSQL para el almacenamiento de datos estructurados
                - Aplicación de procesamiento de lenguaje natural para análisis y filtrado de datos
                '''
        },
        {
            'cargo': 'Ayudante de Cátedra - Visualización de Datos',
            'empresa': 'Universidad Tecnológica Metropolitana (UTEM)',
            'fecha_inicio': '2025-03',
            'fecha_fin': '2025-07',
            'descripcion': '''
                - Enseñanza y mentoría a estudiantes en técnicas de visualización de datos
                '''
        },
        {
            'cargo': 'Practicante Profesional',
            'empresa': 'Contraloría General de la República',
            'fecha_inicio': '2024-08',
            'fecha_fin': '2025-01',
            'descripcion': '''
                - Análisis de datos utilizando Impala y Oracle
                - Desarrollo de consultas SQL y automatización de procesos mediante códigos de Python
                '''
        }
    ],
    'habilidades_duras': [
        'Python', 
        'SQL',
        'TensorFlow', 
        'scikit-learn', 
        'Pandas',
        'Jupyter Notebooks',
        'Visualización de datos',
        'Plotly',
        'Streamlit',
        'Web Scraping',
        'PostgreSQL',
        'MariaDB'
    ],
    'habilidades_blandas': [
        'Resolución de Problemas',
        'Pensamiento Crítico', 
        'Adaptabilidad',
        'Mentoría',
        'Curiosidad intelectual',
        'Responsabilidad',
        'Mentalidad de experimentación',
        'Mentalidad analítica'
    ],
    'educacion': [
        {
            'titulo': 'Ingeniero Civil en Ciencia de Datos',
            'institucion': 'Universidad Tecnológica Metropolitana (UTEM)',
            'fecha': '2020 - 2025',
            'descripcion': 'Formación integral en algoritmos de aprendizaje automático, análisis y visualización de datos, con enfoque en aplicaciones de inteligencia artificial para problemas del mundo real.'
        }
    ],
    'certificados': [
        {
            'nombre': 'Inglés B2 Upper Intermediate',
            'institucion': 'Certificación Internacional',
            'fecha': '2025',
            'link': 'https://drive.google.com/file/d/1KT12-fKSs20wCu_AO6c6nEHYi5_v0mK1/view?usp=sharing'
        },
        {
            'nombre': 'AWS Data Center Technician',
            'institucion': 'Amazon Web Services',
            'fecha': '2024',
            'link': 'https://drive.google.com/file/d/1pYCaTdbJQAmruxvoknp92QbIys4Bt7Ws/view?usp=sharing'
        }
    ]
}


CONTACTO = {
    'email': 'dsantibanezo@utem.cl',
    'linkedin': 'https://www.linkedin.com/in/diego-santibanez-oyarce/',
    'github': 'https://github.com/daso42',
    'telefono': '+56 9 8434 1477'
}


def calcular_duracion(fecha_inicio, fecha_fin):
    inicio = datetime.strptime(fecha_inicio, '%Y-%m')
    fin = datetime.now() if fecha_fin is None else datetime.strptime(fecha_fin, '%Y-%m')
    meses = (fin.year - inicio.year) * 12 + fin.month - inicio.month
    anos = meses // 12
    meses_restantes = meses % 12
    
    if anos > 0:
        if meses_restantes > 0:
            return f"{anos} año{'s' if anos > 1 else ''} y {meses_restantes} mes{'es' if meses_restantes > 1 else ''}"
        return f"{anos} año{'s' if anos > 1 else ''}"
    return f"{meses} mes{'es' if meses > 1 else ''}"

st.markdown(f"<h1 class='main-header'>{PORTFOLIO_DATA['nombre']}</h1>", unsafe_allow_html=True)
st.markdown(f"<p class='sub-header'>{PORTFOLIO_DATA['titulo']}</p>", unsafe_allow_html=True)

tab1, tab2, tab3, tab4, tab5 = st.tabs(["Inicio", "Experiencia", "Habilidades", "Educación & Certificados", "Contacto"])

with tab1:
    col1, col2 = st.columns([2, 1])
    
    with col1:
        st.markdown("## Sobre Mí")
        st.write(PORTFOLIO_DATA['bio'])
        
        st.markdown("### Destacados")
        col_a, col_b, col_c = st.columns(3)
        with col_a:
            st.metric("Años de Experiencia", "1")
        with col_b:
            st.metric("Presentaciones en congresos", "7")
        with col_c:
            st.metric("Certificaciones", f"{len(PORTFOLIO_DATA['certificados'])}")
    
    with col2:
        st.markdown("## Contacto Rápido")
        st.markdown(f"""
        <div class='card'>
        {CONTACTO['email']}<br><br>
        {CONTACTO['telefono']}<br><br>
        <a href='{CONTACTO['linkedin']}' target='_blank'>LinkedIn</a><br><br>
        <a href='{CONTACTO['github']}' target='_blank'>GitHub</a>
        </div>
        """, unsafe_allow_html=True)

with tab2:
    st.markdown("## Trayectoria Profesional")
    st.markdown("---")
    
    for exp in PORTFOLIO_DATA['experiencia']:
        with st.container():
            
            col1, col2 = st.columns([3, 1])
            
            with col1:
                st.markdown(f"### {exp['cargo']}")
                st.markdown(f"**{exp['empresa']}**")
            
            with col2:
                fecha_fin_display = "Presente" if exp['fecha_fin'] is None else exp['fecha_fin']
                st.markdown(f"{exp['fecha_inicio']} - {fecha_fin_display}")
                st.caption(f"{calcular_duracion(exp['fecha_inicio'], exp['fecha_fin'])}")
            
            st.markdown(exp['descripcion'])
            
            st.markdown("</div>", unsafe_allow_html=True)
            st.markdown("---")

with tab3:
    st.markdown("## Habilidades")
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("### Habilidades Técnicas")
        st.markdown("<br>", unsafe_allow_html=True)
        for skill in PORTFOLIO_DATA['habilidades_duras']:
            st.markdown(f"<span class='skill-badge'>{skill}</span>", unsafe_allow_html=True)
    
    with col2:
        st.markdown("### Habilidades Blandas")
        st.markdown("<br>", unsafe_allow_html=True)
        for skill in PORTFOLIO_DATA['habilidades_blandas']:
            st.markdown(f"<span class='soft-skill-badge'>{skill}</span>", unsafe_allow_html=True)

with tab4:
    st.markdown("## Formación Académica")
    
    for edu in PORTFOLIO_DATA['educacion']:
        st.markdown(f"""
        <div class='card'>
        <h3>{edu['titulo']}</h3>
        <h4>{edu['institucion']}</h4>
        <p><strong>{edu['fecha']}</strong></p>
        <p>{edu['descripcion']}</p>
        </div>
        """, unsafe_allow_html=True)
    
    st.markdown("---")
    st.markdown("## Certificaciones Profesionales")
    
    for cert in PORTFOLIO_DATA['certificados']:
        with st.expander(f"{cert['nombre']} - {cert['institucion']}", expanded=True):
            col1, col2 = st.columns([3, 1])
            
            with col1:
                st.markdown(f"**{cert['institucion']}**")
            
            with col2:
                st.markdown(f"{cert['fecha']}")
                st.markdown(f"[Ver Certificado]({cert['link']})")

with tab5:
    st.markdown("## ¡Hablemos!")
    
    col1, col2 = st.columns([1, 1])
    
    with col1:
        st.markdown(f"""
        <div class='card'>
        <h3>Email</h3>
        <p><a href='mailto:{CONTACTO['email']}'>{CONTACTO['email']}</a></p>
        </div>
        """, unsafe_allow_html=True)
        
        st.markdown(f"""
        <div class='card'>
        <h3>Teléfono</h3>
        <p>{CONTACTO['telefono']}</p>
        </div>
        """, unsafe_allow_html=True)
    
    with col2:
        st.markdown(f"""
        <div class='card'>
        <h3>LinkedIn</h3>
        <p><a href='{CONTACTO['linkedin']}' target='_blank'>Ver perfil profesional</a></p>
        </div>
        """, unsafe_allow_html=True)
        
        st.markdown(f"""
        <div class='card'>
        <h3>GitHub</h3>
        <p><a href='{CONTACTO['github']}' target='_blank'>Ver repositorios</a></p>
        </div>
        """, unsafe_allow_html=True)
    
    st.markdown("---")