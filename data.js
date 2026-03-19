const PORTFOLIO = {
  personal: {
    nombre:           "Diego Santibanez Oyarce",
    titulo:           "Cientifico de Datos",
    subtitulo:        "Egresado UTEM 2025",
    ubicacion:        "Santiago, Chile",
    disponible:       true,
    especializaciones: ["Ciencia de Datos", "Inteligencia Artificial", "Ingenieria"],
    bio: "Egresado de Ingenieria Civil en Ciencia de Datos en Agosto 2025, apasionado por la tecnologia y con un gran interes en el uso de la inteligencia artificial como herramienta para la resolucion de problemas del mundo real. Mi formacion academica me proporciono una solida comprension de algoritmos de aprendizaje automatico, analisis y visualizacion de datos. Me gusta proponerme desafios donde pueda poner en practica mis conocimientos y donde ademas pueda aprender cosas nuevas."
  },

  contacto: {
    email:    "dsantibanezo@utem.cl",
    telefono: "+56 9 8434 1477",
    linkedin: { url: "https://www.linkedin.com/in/diego-santibanez-oyarce/", handle: "diego-santibanez-oyarce" },
    github:   { url: "https://github.com/daso42",                             handle: "daso42" }
  },

  experiencia: [
    {
      cargo:         "Asistente de Investigacion",
      empresa:       "Universidad Tecnologica Metropolitana",
      empresa_sigla: "UTEM",
      categoria:     "INVESTIGACION ACADEMICA",
      fecha_inicio:  "2023-12",
      fecha_fin:     "2025-09",
      bullets: [
        {
          texto:     "Poster en CARLA 2025, Septiembre 2025. Obtencion premio al mejor poster",
          es_premio: true,
          links: [
            { label: "Certificado", url: "https://drive.google.com/file/d/10tcRQonSWMgKQ8FciWOsCobzQAlWCPr9/view?usp=sharing" },
            { label: "Premio",      url: "https://drive.google.com/file/d/1M_MhsoB8BCUO5LITTVvQw0Hi9l7RU4Vj/view?usp=sharing" },
            { label: "Poster",      url: "https://drive.google.com/file/d/14Fc9u_zCtxiKG7RKW3W85Rv6X4OJy5HP/view?usp=drive_link" }
          ]
        },
        {
          texto: "Presentacion poster en \"1ras Jornadas de Ciencia de Datos y Salud Publica\" de la Universidad de Chile, Enero 2024",
          links: [
            { label: "Certificado", url: "https://drive.google.com/file/d/124VDD5x6pBidyC1Wx4ZLehAQixdjZ9dS/view?usp=sharing" },
            { label: "Poster",      url: "https://drive.google.com/file/d/1gRjnIt9xa5CYPhbgGFTKR1o5WV3RB8H6/view?usp=drive_link" }
          ]
        },
        {
          texto: "Flash Talk (5 min) y poster en CARLA 2024, Septiembre 2024",
          links: [
            { label: "Certificado", url: "https://drive.google.com/file/d/1jHc_2fZiakh2G9t8EkiB7Z3l0iuWBJ7n/view?usp=sharing" },
            { label: "Poster",      url: "https://drive.google.com/file/d/1jfS4S75dwoBnUMZ3xeQOFfBzX6HP5gpc/view?usp=drive_link" }
          ]
        },
        {
          texto: "Poster en \"III Congreso Vive la Investigacion 2024\", Octubre 2024",
          links: [
            { label: "Certificado", url: "https://drive.google.com/file/d/1unqW5oOxe5wl84-vmq4Y8AhXmD1sJJL_/view?usp=sharing" },
            { label: "Poster",      url: "https://drive.google.com/file/d/1OEKXi8gl7Z9bGySQ8esoomkDJLPiBLCE/view?usp=drive_link" }
          ]
        },
        {
          texto: "Poster en \"XIV Congreso Argentino de Bioinformatica y Biologia Computacional\", Noviembre 2024",
          links: [
            { label: "Certificado", url: "https://drive.google.com/file/d/1br_Vv35RmHxvyPScFlhDCJxucFz0ckii/view?usp=sharing" },
            { label: "Poster",      url: "https://drive.google.com/file/d/1wLUe3ssEY_XcOgoTbVJj0B5C7plK-G9n/view?usp=drive_link" }
          ]
        },
        {
          texto: "Flash Talk (15 min) en \"III Reunion Anual de la Sociedad Chilena de Bioinformatica\", Nov 2024. Invitacion a publicar manuscrito en Bioinformatics Advances (Oxford University Press)",
          links: [
            { label: "Certificado", url: "https://drive.google.com/file/d/1-dZ_CdZlYkd58OlGr3v92n8pLshnurje/view?usp=sharing" }
          ]
        }
      ]
    },
    {
      cargo:         "Tecnico para Analisis de Datos Avanzado",
      empresa:       "Universidad Tecnologica Metropolitana",
      empresa_sigla: "UTEM",
      categoria:     "ANALISIS DE DATOS",
      fecha_inicio:  "2025-02",
      fecha_fin:     "2025-09",
      bullets: [
        { texto: "Implementacion de web scraping con Python (Selenium y BeautifulSoup) para la extraccion automatizada de datos" },
        { texto: "Creacion de dashboards interactivos utilizando Plotly y Streamlit para visualizar avances del proyecto" },
        { texto: "Diseno y gestion de bases de datos en MariaDB y PostgreSQL para el almacenamiento de datos estructurados" },
        { texto: "Aplicacion de procesamiento de lenguaje natural para analisis y filtrado de datos" }
      ]
    },
    {
      cargo:         "Ayudante de Catedra — Visualizacion de Datos",
      empresa:       "Universidad Tecnologica Metropolitana",
      empresa_sigla: "UTEM",
      categoria:     "DOCENCIA UNIVERSITARIA",
      fecha_inicio:  "2025-03",
      fecha_fin:     "2025-07",
      bullets: [
        { texto: "Ensenanza y mentoria a estudiantes en tecnicas de visualizacion de datos" }
      ]
    },
    {
      cargo:         "Practicante Profesional",
      empresa:       "Contraloria General de la Republica",
      empresa_sigla: null,
      categoria:     "SECTOR PUBLICO",
      fecha_inicio:  "2024-08",
      fecha_fin:     "2025-01",
      bullets: [
        { texto: "Analisis de datos utilizando Impala y Oracle en entornos de produccion institucional" },
        { texto: "Desarrollo de consultas SQL y automatizacion de procesos mediante codigos de Python" }
      ]
    }
  ],

  proyectos: [
    {
      titulo:       "Dashboard de Avance de Proyecto",
      categoria:    "DASHBOARD INTERACTIVO",
      fecha:        "2025",
      destacado:    true,
      descripcion:  "Dashboard interactivo desarrollado con Streamlit para visualizar el avance y estado de los datos utilizados en el proyecto. Integra multiples fuentes de informacion y permite explorar el progreso en tiempo real a traves de visualizaciones dinamicas construidas con Plotly y DuckDB, incluyendo representaciones geograficas con Folium.",
      tecnologias:  ["Python", "Streamlit", "Pandas", "Plotly", "DuckDB", "Folium"],
      link:         "https://dashboarddatalake-fiut-utem.streamlit.app/"
    }
  ],

  habilidades: {
    tecnicas: ["Python", "SQL", "TensorFlow", "scikit-learn", "Pandas", "Jupyter Notebooks", "Visualizacion de datos", "Plotly", "Streamlit", "Web Scraping", "PostgreSQL", "MariaDB", "SpaCy"],
    blandas:  ["Resolucion de Problemas", "Pensamiento Critico", "Adaptabilidad", "Mentoria", "Curiosidad intelectual", "Responsabilidad", "Mentalidad de experimentacion", "Mentalidad analitica"]
  },

  educacion: [
    {
      titulo:           "Ingeniero Civil en Ciencia de Datos",
      institucion:      "Universidad Tecnologica Metropolitana",
      institucion_sigla:"UTEM",
      fecha_inicio:     "2020",
      fecha_fin:        "2025",
      descripcion:      "Formacion integral en algoritmos de aprendizaje automatico, analisis y visualizacion de datos, con enfoque en aplicaciones de inteligencia artificial para problemas del mundo real."
    }
  ],

  certificados: [
    { nombre: "Power BI",                        institucion: "Santander X",             fecha: "2025", link: "https://drive.google.com/file/d/1IOp4gjfLcW8XhqbiwwOd9dzlz8l60P5q/view?usp=drive_link" },
    { nombre: "Ingles B2 Upper Intermediate",    institucion: "Certificacion Internacional", fecha: "2025", link: "https://drive.google.com/file/d/1KT12-fKSs20wCu_AO6c6nEHYi5_v0mK1/view?usp=sharing" },
    { nombre: "AWS Data Center Technician",      institucion: "Amazon Web Services",     fecha: "2024", link: "https://drive.google.com/file/d/1pYCaTdbJQAmruxvoknp92QbIys4Bt7Ws/view?usp=sharing" },
    { nombre: "Introduccion a la Ciencia de Datos", institucion: "Santander Open Academy", fecha: "2025", link: "https://drive.google.com/file/d/1vmeQuzoZEwUTC0Pz7Xl_rlobqXcreX5w/view?usp=sharing" }
  ]
};
