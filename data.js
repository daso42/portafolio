const PORTFOLIO = {
  personal: {
    nombre:           "Diego Santibáñez Oyarce",
    nombre_corto:     "Diego Santibáñez",
    iniciales:        "DS",
    titulo:           "Científico de Datos",
    subtitulo:        "Ingeniero Civil en Ciencia de Datos · UTEM 2025",
    ubicacion:        "Santiago, Chile",
    disponible:       true,
    // Ruta a tu foto (ej: "assets/foto.jpg"). Si queda en null se muestran tus iniciales.
    foto:             null,
    // Ruta a tu CV en PDF (ej: "assets/CV_Diego_Santibanez.pdf"). Si queda en null no se muestra el botón.
    cv:               null,
    frase: "Trabajo con LLMs, procesamiento de lenguaje natural y pipelines de datos para convertir información en herramientas útiles.",
    especializaciones: ["Ciencia de Datos", "Inteligencia Artificial", "Ingeniería"],
    bio: "Ingeniero Civil en Ciencia de Datos titulado en 2025, apasionado por la tecnología y con un gran interés en el uso de la inteligencia artificial como herramienta para la resolución de problemas del mundo real. Mi formación académica me proporcionó una sólida comprensión de algoritmos de aprendizaje automático, análisis y visualización de datos. Me gusta proponerme desafíos donde pueda poner en práctica mis conocimientos y donde además pueda aprender cosas nuevas."
  },

  contacto: {
    email:    "dsantibanezo@utem.cl",
    telefono: "+56 9 8434 1477",
    linkedin: { url: "https://www.linkedin.com/in/diego-santibanez-oyarce/", handle: "diego-santibanez-oyarce" },
    github:   { url: "https://github.com/daso42",                             handle: "daso42" }
  },

  // Franja de logros bajo la portada
  destacados: [
    { valor: "1°",  titulo: "Premio al mejor póster",        detalle: "CARLA 2025" },
    { valor: "OUP", titulo: "Invitación a publicar",         detalle: "Bioinformatics Advances" },
    { valor: "6",   titulo: "Presentaciones científicas",    detalle: "Chile y Argentina, 2024–2025" },
    { valor: "5",   titulo: "Experiencias profesionales",    detalle: "Industria, investigación y docencia" }
  ],

  experiencia: [
    {
      cargo:         "Data Scientist — NLP y Automatización de Datos",
      corto:         "Data Scientist",
      empresa:       "Red CUECH",
      empresa_sigla: "CUECH",
      categoria:     "Ciencia de datos",
      fecha_inicio:  "2025-12",
      fecha_fin:     "2026-01",
      bullets: [
        { texto: "Desarrollo de sistema automático de clasificación de textos científicos usando LLMs (Llama 3.1, GPT-OSS, Qwen3)" },
        { texto: "Implementación de prompt engineering con técnicas de Chain-of-Thought para optimizar la precisión de clasificación" },
        { texto: "Diseño de pipelines ETL para procesar datos provenientes de 4 fuentes distintas" },
        { texto: "Desarrollo de RPA (Automatización Robótica de Procesos) con navegador headless para extracción automática de datos bibliométricos" },
        { texto: "Creación de dashboard interactivo con Streamlit y Plotly para análisis de datos" }
      ]
    },
    {
      cargo:         "Asistente de Investigación",
      corto:         "Asistente de Investigación",
      empresa:       "Universidad Tecnológica Metropolitana",
      empresa_sigla: "UTEM",
      categoria:     "Investigación académica",
      fecha_inicio:  "2023-12",
      fecha_fin:     "2025-08",
      ver_investigacion: true,
      bullets: [
        { texto: "Presentación de resultados en 6 congresos y jornadas científicas en Chile y Argentina (2024–2025)" },
        { texto: "Premio al mejor póster en CARLA 2025", es_premio: true },
        { texto: "Invitación a publicar manuscrito en Bioinformatics Advances (Oxford University Press)" }
      ]
    },
    {
      cargo:         "Técnico para Análisis de Datos Avanzado",
      corto:         "Técnico en Análisis de Datos",
      empresa:       "Universidad Tecnológica Metropolitana",
      empresa_sigla: "UTEM",
      categoria:     "Análisis de datos",
      fecha_inicio:  "2025-02",
      fecha_fin:     "2025-09",
      bullets: [
        { texto: "Implementación de web scraping con Python (Selenium y BeautifulSoup) para la extracción automatizada de datos" },
        { texto: "Creación de dashboards interactivos utilizando Plotly y Streamlit para visualizar avances del proyecto" },
        { texto: "Diseño y gestión de bases de datos en MariaDB y PostgreSQL para el almacenamiento de datos estructurados" },
        { texto: "Aplicación de procesamiento de lenguaje natural para análisis y filtrado de datos" }
      ]
    },
    {
      cargo:         "Ayudante de Cátedra — Visualización de Datos",
      corto:         "Ayudante de Cátedra",
      empresa:       "Universidad Tecnológica Metropolitana",
      empresa_sigla: "UTEM",
      categoria:     "Docencia universitaria",
      fecha_inicio:  "2025-03",
      fecha_fin:     "2025-07",
      bullets: [
        { texto: "Enseñanza y mentoría a estudiantes en técnicas de visualización de datos" }
      ]
    },
    {
      cargo:         "Practicante Profesional",
      corto:         "Práctica profesional",
      empresa:       "Contraloría General de la República",
      empresa_sigla: "CGR",
      categoria:     "Sector público",
      fecha_inicio:  "2024-08",
      fecha_fin:     "2025-01",
      bullets: [
        { texto: "Análisis de datos utilizando Impala y Oracle en entornos de producción institucional" },
        { texto: "Desarrollo de consultas SQL y automatización de procesos mediante código Python" }
      ]
    }
  ],

  // Presentaciones científicas (sección Investigación y marcas en la línea de tiempo)
  investigacion: [
    {
      fecha:  "2025-09",
      tipo:   "Póster",
      evento: "CARLA 2025",
      premio: "Premio al mejor póster",
      links: [
        { label: "Certificado", url: "https://drive.google.com/file/d/10tcRQonSWMgKQ8FciWOsCobzQAlWCPr9/view?usp=sharing" },
        { label: "Premio",      url: "https://drive.google.com/file/d/1M_MhsoB8BCUO5LITTVvQw0Hi9l7RU4Vj/view?usp=sharing" },
        { label: "Póster",      url: "https://drive.google.com/file/d/14Fc9u_zCtxiKG7RKW3W85Rv6X4OJy5HP/view?usp=drive_link" }
      ]
    },
    {
      fecha:  "2024-11",
      tipo:   "Flash Talk (15 min)",
      evento: "III Reunión Anual de la Sociedad Chilena de Bioinformática",
      nota:   "Invitación a publicar manuscrito en Bioinformatics Advances (Oxford University Press)",
      links: [
        { label: "Certificado", url: "https://drive.google.com/file/d/1-dZ_CdZlYkd58OlGr3v92n8pLshnurje/view?usp=sharing" }
      ]
    },
    {
      fecha:  "2024-11",
      tipo:   "Póster",
      evento: "XIV Congreso Argentino de Bioinformática y Biología Computacional",
      links: [
        { label: "Certificado", url: "https://drive.google.com/file/d/1br_Vv35RmHxvyPScFlhDCJxucFz0ckii/view?usp=sharing" },
        { label: "Póster",      url: "https://drive.google.com/file/d/1wLUe3ssEY_XcOgoTbVJj0B5C7plK-G9n/view?usp=drive_link" }
      ]
    },
    {
      fecha:  "2024-10",
      tipo:   "Póster",
      evento: "III Congreso Vive la Investigación 2024",
      links: [
        { label: "Certificado", url: "https://drive.google.com/file/d/1unqW5oOxe5wl84-vmq4Y8AhXmD1sJJL_/view?usp=sharing" },
        { label: "Póster",      url: "https://drive.google.com/file/d/1OEKXi8gl7Z9bGySQ8esoomkDJLPiBLCE/view?usp=drive_link" }
      ]
    },
    {
      fecha:  "2024-09",
      tipo:   "Flash Talk (5 min) y póster",
      evento: "CARLA 2024",
      links: [
        { label: "Certificado", url: "https://drive.google.com/file/d/1jHc_2fZiakh2G9t8EkiB7Z3l0iuWBJ7n/view?usp=sharing" },
        { label: "Póster",      url: "https://drive.google.com/file/d/1jfS4S75dwoBnUMZ3xeQOFfBzX6HP5gpc/view?usp=drive_link" }
      ]
    },
    {
      fecha:  "2024-01",
      tipo:   "Póster",
      evento: "1ras Jornadas de Ciencia de Datos y Salud Pública, Universidad de Chile",
      links: [
        { label: "Certificado", url: "https://drive.google.com/file/d/124VDD5x6pBidyC1Wx4ZLehAQixdjZ9dS/view?usp=sharing" },
        { label: "Póster",      url: "https://drive.google.com/file/d/1gRjnIt9xa5CYPhbgGFTKR1o5WV3RB8H6/view?usp=drive_link" }
      ]
    }
  ],

  proyectos: [
    {
      titulo:       "Dashboard de Avance de Proyecto",
      categoria:    "Dashboard interactivo",
      fecha:        "2025",
      destacado:    true,
      descripcion:  "Dashboard interactivo desarrollado con Streamlit para visualizar el avance y estado de los datos utilizados en el proyecto. Integra múltiples fuentes de información y permite explorar el progreso en tiempo real a través de visualizaciones dinámicas construidas con Plotly y DuckDB, incluyendo representaciones geográficas con Folium.",
      tecnologias:  ["Python", "Streamlit", "Pandas", "Plotly", "DuckDB", "Folium"],
      link:         "https://dashboarddatalake-fiut-utem.streamlit.app/",
      // Opcionales: repo (link a GitHub) e imagen (ej: "assets/proyectos/dashboard.png")
      repo:         null,
      imagen:       null
    }
  ],

  habilidades: {
    tecnicas: [
      { grupo: "Datos",            items: ["Python", "SQL", "Pandas", "NumPy", "Web Scraping"] },
      { grupo: "Machine Learning", items: ["scikit-learn", "XGBoost", "TensorFlow"] },
      { grupo: "NLP y LLMs",       items: ["SpaCy", "NLTK", "Ollama", "Claude API", "Gemini API"] },
      { grupo: "Bases de datos",   items: ["PostgreSQL", "DuckDB", "MariaDB"] },
      { grupo: "Visualización",    items: ["Plotly", "Streamlit"] },
      { grupo: "Herramientas",     items: ["n8n", "Docker", "Git/GitHub"] }
    ],
    blandas: ["Resolución de problemas", "Pensamiento crítico", "Adaptabilidad", "Mentoría", "Curiosidad intelectual", "Responsabilidad", "Mentalidad de experimentación", "Mentalidad analítica"]
  },

  educacion: [
    {
      titulo:           "Ingeniero Civil en Ciencia de Datos",
      institucion:      "Universidad Tecnológica Metropolitana",
      institucion_sigla:"UTEM",
      fecha_inicio:     "2020",
      fecha_fin:        "2025",
      descripcion:      "Formación integral en algoritmos de aprendizaje automático, análisis y visualización de datos, con enfoque en aplicaciones de inteligencia artificial para problemas del mundo real."
    }
  ],

  certificados: [
    { nombre: "Claude Code in Action",               institucion: "Anthropic Education",         fecha: "2026", link: "https://verify.skilljar.com/c/c4d27tz5j2ue" },
    { nombre: "Power BI",                            institucion: "Santander X",                 fecha: "2025", link: "https://drive.google.com/file/d/1IOp4gjfLcW8XhqbiwwOd9dzlz8l60P5q/view?usp=drive_link" },
    { nombre: "Inglés B2 Upper Intermediate",        institucion: "Certificación Internacional", fecha: "2025", link: "https://drive.google.com/file/d/1KT12-fKSs20wCu_AO6c6nEHYi5_v0mK1/view?usp=sharing" },
    { nombre: "Introducción a la Ciencia de Datos",  institucion: "Santander Open Academy",      fecha: "2025", link: "https://drive.google.com/file/d/1vmeQuzoZEwUTC0Pz7Xl_rlobqXcreX5w/view?usp=sharing" },
    { nombre: "AWS Data Center Technician",          institucion: "Amazon Web Services",         fecha: "2024", link: "https://drive.google.com/file/d/1pYCaTdbJQAmruxvoknp92QbIys4Bt7Ws/view?usp=sharing" }
  ]
};
