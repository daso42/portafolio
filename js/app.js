/* ══════════════════════════════════════
   CONSTANTES Y HELPERS
══════════════════════════════════════ */
const MESES_CORTO = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];

const SECCIONES = [
  { id: 'proyectos',     label: 'Proyectos' },
  { id: 'experiencia',   label: 'Experiencia' },
  { id: 'investigacion', label: 'Investigación' },
  { id: 'habilidades',   label: 'Habilidades' },
  { id: 'formacion',     label: 'Formación' },
  { id: 'contacto',      label: 'Contacto' },
];

// "2025-09" -> índice de mes absoluto (para calcular posiciones y duraciones)
function mesIndex(s) {
  if (!s) {
    const now = new Date();
    return now.getFullYear() * 12 + now.getMonth();
  }
  const [y, m] = s.split('-').map(Number);
  return y * 12 + (m || 1) - 1;
}

function fmtFecha(s) {
  if (!s) return 'Presente';
  const [y, m] = s.split('-');
  if (!m) return y;
  const mes = MESES_CORTO[parseInt(m, 10) - 1];
  return `${mes.charAt(0).toUpperCase()}${mes.slice(1)} ${y}`;
}

function fmtDuracion(inicio, fin) {
  const total = mesIndex(fin) - mesIndex(inicio) + 1;
  const anios = Math.floor(total / 12);
  const meses = total % 12;
  const partes = [];
  if (anios) partes.push(`${anios} ${anios === 1 ? 'año' : 'años'}`);
  if (meses) partes.push(`${meses} ${meses === 1 ? 'mes' : 'meses'}`);
  return partes.join(' ');
}

function sectionHead(id, kicker, titulo, intro) {
  return `
    <div class="sec-head reveal">
      <p class="kicker">${kicker}</p>
      <h2 class="sec-title" id="h-${id}">${titulo}</h2>
      ${intro ? `<p class="sec-intro">${intro}</p>` : ''}
    </div>
  `;
}

function extLink(url, label, cls = '') {
  return `<a href="${url}" target="_blank" rel="noopener" class="${cls}">${label}</a>`;
}

const ICONOS = {
  sol:  '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6"/></svg>',
  luna: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/></svg>',
  flecha: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>',
};


/* ══════════════════════════════════════
   HEADER + NAVEGACIÓN
══════════════════════════════════════ */
function renderHeader() {
  const p = PORTFOLIO.personal;
  document.getElementById('site-header').innerHTML = `
    <div class="header-inner">
      <a class="brand" href="#inicio">
        <span class="brand-mark">${p.iniciales}</span>
        <span class="brand-name">${p.nombre_corto}</span>
      </a>
      <nav class="nav" aria-label="Navegación principal">
        <ul>
          ${SECCIONES.map(s => `<li><a class="nav-link" href="#${s.id}" data-section="${s.id}">${s.label}</a></li>`).join('')}
        </ul>
      </nav>
      <button class="theme-toggle" id="theme-toggle" type="button" aria-label="Cambiar tema claro u oscuro">
        <span class="icon-sun">${ICONOS.sol}</span>
        <span class="icon-moon">${ICONOS.luna}</span>
      </button>
    </div>
  `;

  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
}

function temaActual() {
  const forzado = document.documentElement.dataset.theme;
  if (forzado) return forzado;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function toggleTheme() {
  const nuevo = temaActual() === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = nuevo;
  try { localStorage.setItem('theme', nuevo); } catch (e) {}
}

// Resalta en el menú la sección visible
function initScrollSpy() {
  const links = new Map(
    [...document.querySelectorAll('.nav-link')].map(a => [a.dataset.section, a])
  );
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(a => a.removeAttribute('aria-current'));
      const link = links.get(e.target.id);
      if (link) {
        link.setAttribute('aria-current', 'true');
        // En móvil el menú se desplaza horizontalmente: centrar el enlace activo
        const ul = link.closest('ul');
        if (ul.scrollWidth > ul.clientWidth) {
          ul.scrollTo({ left: link.offsetLeft - (ul.clientWidth - link.offsetWidth) / 2 });
        }
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  document.querySelectorAll('main > section').forEach(s => obs.observe(s));
}


/* ══════════════════════════════════════
   INICIO (HERO + DESTACADOS)
══════════════════════════════════════ */
function renderInicio() {
  const p = PORTFOLIO.personal;
  const c = PORTFOLIO.contacto;
  const edu = PORTFOLIO.educacion[0];

  const avatar = p.foto
    ? `<img class="avatar-img" src="${p.foto}" alt="Foto de ${p.nombre}">`
    : `<span class="avatar-initials" aria-hidden="true">${p.iniciales}</span>`;

  const ficha = [
    ['Rol',       p.titulo],
    ['Base',      p.ubicacion],
    ['Formación', `${edu.institucion_sigla} ${edu.fecha_fin}`],
    ['Enfoque',   p.especializaciones.join(', ')],
  ].map(([k, v]) => `<div class="ficha-row"><dt>${k}</dt><dd>${v}</dd></div>`).join('');

  const destacados = PORTFOLIO.destacados.map(d => `
    <li class="stat">
      <span class="stat-valor">${d.valor}</span>
      <span class="stat-titulo">${d.titulo}</span>
      <span class="stat-detalle">${d.detalle}</span>
    </li>
  `).join('');

  document.getElementById('inicio').innerHTML = `
    <div class="wrap hero">
      <div class="hero-main">
        <p class="kicker">${p.titulo} &middot; ${p.ubicacion}</p>
        <h1 class="hero-name">${p.nombre}</h1>
        <p class="hero-frase">${p.frase}</p>
        ${p.disponible ? '<p class="badge-disponible"><span class="dot" aria-hidden="true"></span>Disponible para nuevas oportunidades</p>' : ''}
        <div class="hero-cta">
          ${p.cv ? `<a href="${p.cv}" class="btn btn-solid" download>Descargar CV</a>` : ''}
          <a href="mailto:${c.email}" class="btn ${p.cv ? 'btn-ghost' : 'btn-solid'}">Contactar</a>
          ${extLink(c.linkedin.url, 'LinkedIn', 'btn btn-ghost')}
          ${extLink(c.github.url, 'GitHub', 'btn btn-ghost')}
        </div>
      </div>
      <aside class="hero-card" aria-label="Ficha resumen">
        <div class="avatar">${avatar}</div>
        <dl class="ficha">${ficha}</dl>
      </aside>
    </div>
    <div class="wrap">
      <ul class="stats reveal" aria-label="Logros destacados">${destacados}</ul>
      <div class="about reveal">
        <p class="kicker">Sobre mí</p>
        <p class="about-text">${p.bio}</p>
      </div>
    </div>
  `;
}


/* ══════════════════════════════════════
   PROYECTOS
══════════════════════════════════════ */
function buildProyecto(p) {
  const media = p.imagen
    ? `<img src="${p.imagen}" alt="Captura de ${p.titulo}" loading="lazy">`
    : `<span class="proj-placeholder" aria-hidden="true">${p.tecnologias.slice(0, 3).join(' · ')}</span>`;

  const links = [
    p.link ? extLink(p.link, `Ver proyecto ${ICONOS.flecha}`, 'proj-link') : '',
    p.repo ? extLink(p.repo, `Código ${ICONOS.flecha}`, 'proj-link') : '',
  ].join('');

  return `
    <article class="proj ${p.destacado ? 'proj-destacado' : ''} reveal">
      <div class="proj-media">${media}</div>
      <div class="proj-body">
        <p class="proj-meta">
          ${p.destacado ? '<span class="tag-accent">Destacado</span>' : ''}
          <span>${p.categoria}</span><span aria-hidden="true">/</span><span>${p.fecha}</span>
        </p>
        <h3 class="proj-title">${p.titulo}</h3>
        <p class="proj-desc">${p.descripcion}</p>
        <ul class="chips" aria-label="Tecnologías">${p.tecnologias.map(t => `<li>${t}</li>`).join('')}</ul>
        <div class="proj-links">${links}</div>
      </div>
    </article>
  `;
}

function renderProyectos() {
  const lista = [...PORTFOLIO.proyectos].sort((a, b) => (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0));
  document.getElementById('proyectos').innerHTML = `
    <div class="wrap">
      ${sectionHead('proyectos', '01', 'Proyectos')}
      <div class="proj-grid">${lista.map(buildProyecto).join('')}</div>
    </div>
  `;
}


/* ══════════════════════════════════════
   EXPERIENCIA (GRÁFICO DE TRAYECTORIA + LÍNEA DE TIEMPO)
══════════════════════════════════════ */
function buildTrayectoria() {
  const exps = [...PORTFOLIO.experiencia].sort((a, b) => mesIndex(a.fecha_inicio) - mesIndex(b.fecha_inicio));
  const eventos = PORTFOLIO.investigacion;

  const inicios = exps.map(e => mesIndex(e.fecha_inicio)).concat(eventos.map(e => mesIndex(e.fecha)));
  const fines   = exps.map(e => mesIndex(e.fecha_fin) + 1).concat(eventos.map(e => mesIndex(e.fecha) + 1));
  const min = Math.min(...inicios);
  const max = Math.max(...fines);
  const pct = m => ((m - min) / (max - min)) * 100;

  const ticks = [];
  for (let y = Math.ceil(min / 12); y * 12 < max; y++) {
    ticks.push(`<span class="gantt-tick" style="left:${pct(y * 12)}%"><span>${y}</span></span>`);
  }

  const filas = exps.map(e => {
    const ini = mesIndex(e.fecha_inicio);
    const fin = mesIndex(e.fecha_fin) + 1;
    const rango = `${fmtFecha(e.fecha_inicio)} – ${fmtFecha(e.fecha_fin)}`;
    return `
      <div class="gantt-row">
        <div class="gantt-label">${e.corto} <span>${e.empresa_sigla || ''}</span></div>
        <div class="gantt-track">
          <span class="gantt-bar" style="left:${pct(ini)}%;width:${pct(fin) - pct(ini)}%"
                title="${e.cargo}: ${rango}"></span>
        </div>
      </div>
    `;
  }).join('');

  // Marcas de congresos; si dos caen el mismo mes se apilan
  const porMes = {};
  const marcas = eventos.map((ev, i) => {
    const m = mesIndex(ev.fecha);
    const n = porMes[m] = (porMes[m] || 0) + 1;
    const cls = ev.premio ? 'gantt-evt is-premio' : 'gantt-evt';
    return `<a class="${cls}" href="#inv-${i}" style="left:${pct(m + 0.5)}%;--stack:${n - 1}"
               title="${ev.evento} (${fmtFecha(ev.fecha)})" aria-label="${ev.evento}, ${fmtFecha(ev.fecha)}"></a>`;
  }).join('');

  return `
    <figure class="gantt reveal">
      <figcaption>
        <span class="kicker">Trayectoria</span>
        <span class="gantt-legend">
          <span><i class="lg-bar"></i>Cargo</span>
          <span><i class="lg-evt"></i>Congreso</span>
          <span><i class="lg-evt is-premio"></i>Premio</span>
        </span>
      </figcaption>
      <div class="gantt-body">
        ${filas}
        <div class="gantt-row gantt-row-evt">
          <div class="gantt-label">Congresos <span>${eventos.length}</span></div>
          <div class="gantt-track">${marcas}</div>
        </div>
        <div class="gantt-row gantt-axis">
          <div class="gantt-label"></div>
          <div class="gantt-track">${ticks.join('')}</div>
        </div>
      </div>
    </figure>
  `;
}

const VISIBLES = 3;

function buildExp(exp, idx) {
  const bullet = b => `<li class="${b.es_premio ? 'is-premio' : ''}">${b.texto}</li>`;
  const visibles = exp.bullets.slice(0, VISIBLES).map(bullet).join('');
  const resto    = exp.bullets.slice(VISIBLES).map(bullet).join('');
  const sigla    = exp.empresa_sigla ? ` (${exp.empresa_sigla})` : '';

  return `
    <li class="tl-item reveal">
      <div class="tl-date">
        <span>${fmtFecha(exp.fecha_inicio)} – ${fmtFecha(exp.fecha_fin)}</span>
        <span class="tl-dur">${fmtDuracion(exp.fecha_inicio, exp.fecha_fin)}</span>
      </div>
      <div class="tl-body">
        <p class="tl-cat">${exp.categoria}</p>
        <h3 class="tl-title">${exp.cargo}</h3>
        <p class="tl-org">${exp.empresa}${sigla}</p>
        <ul class="tl-bullets">${visibles}</ul>
        ${resto ? `
          <ul class="tl-bullets" id="exp-mas-${idx}" hidden>${resto}</ul>
          <button class="link-btn" type="button" aria-expanded="false" aria-controls="exp-mas-${idx}">
            Ver ${exp.bullets.length - VISIBLES} más
          </button>` : ''}
        ${exp.ver_investigacion ? '<a class="link-btn" href="#investigacion">Ver presentaciones &darr;</a>' : ''}
      </div>
    </li>
  `;
}

function renderExperiencia() {
  const exps = [...PORTFOLIO.experiencia].sort((a, b) =>
    (mesIndex(b.fecha_fin) - mesIndex(a.fecha_fin)) || (mesIndex(b.fecha_inicio) - mesIndex(a.fecha_inicio))
  );

  const sec = document.getElementById('experiencia');
  sec.innerHTML = `
    <div class="wrap">
      ${sectionHead('experiencia', '02', 'Experiencia')}
      ${buildTrayectoria()}
      <ol class="timeline">${exps.map(buildExp).join('')}</ol>
    </div>
  `;

  sec.querySelectorAll('button[aria-controls]').forEach(btn => {
    const texto = btn.textContent.trim();
    btn.addEventListener('click', () => {
      const lista = document.getElementById(btn.getAttribute('aria-controls'));
      const abierto = btn.getAttribute('aria-expanded') === 'true';
      lista.hidden = abierto;
      btn.setAttribute('aria-expanded', String(!abierto));
      btn.textContent = abierto ? texto : 'Ver menos';
    });
  });
}


/* ══════════════════════════════════════
   INVESTIGACIÓN
══════════════════════════════════════ */
function renderInvestigacion() {
  const items = PORTFOLIO.investigacion.map((ev, i) => `
    <li class="inv-item ${ev.premio ? 'is-premio' : ''} reveal" id="inv-${i}">
      <p class="inv-date">${fmtFecha(ev.fecha)}</p>
      <div class="inv-body">
        <p class="inv-tipo">${ev.tipo}${ev.premio ? ` <span class="tag-accent">${ev.premio}</span>` : ''}</p>
        <h3 class="inv-evento">${ev.evento}</h3>
        ${ev.nota ? `<p class="inv-nota">${ev.nota}</p>` : ''}
        <div class="inv-links">${ev.links.map(l => extLink(l.url, `${l.label} ${ICONOS.flecha}`, 'mini-link')).join('')}</div>
      </div>
    </li>
  `).join('');

  document.getElementById('investigacion').innerHTML = `
    <div class="wrap">
      ${sectionHead('investigacion', '03', 'Investigación',
        'Presentaciones en congresos y jornadas científicas realizadas como asistente de investigación en la UTEM.')}
      <ol class="inv-list">${items}</ol>
    </div>
  `;
}


/* ══════════════════════════════════════
   HABILIDADES
══════════════════════════════════════ */
function renderHabilidades() {
  const h = PORTFOLIO.habilidades;
  const grupos = h.tecnicas.map(g => `
    <div class="sk-group reveal">
      <h3 class="sk-title">${g.grupo}</h3>
      <ul class="chips">${g.items.map(i => `<li>${i}</li>`).join('')}</ul>
    </div>
  `).join('');

  document.getElementById('habilidades').innerHTML = `
    <div class="wrap">
      ${sectionHead('habilidades', '04', 'Habilidades')}
      <div class="sk-grid">${grupos}</div>
      <div class="sk-soft reveal">
        <h3 class="sk-title">Habilidades blandas</h3>
        <p>${h.blandas.join(' <span aria-hidden="true">·</span> ')}</p>
      </div>
    </div>
  `;
}


/* ══════════════════════════════════════
   FORMACIÓN
══════════════════════════════════════ */
function renderFormacion() {
  const edu = PORTFOLIO.educacion.map(e => `
    <article class="edu reveal">
      <p class="kicker">${e.fecha_inicio} – ${e.fecha_fin}</p>
      <h3 class="edu-title">${e.titulo}</h3>
      <p class="edu-inst">${e.institucion}${e.institucion_sigla ? ` (${e.institucion_sigla})` : ''}</p>
      <p class="edu-desc">${e.descripcion}</p>
    </article>
  `).join('');

  const certs = PORTFOLIO.certificados.map(c => `
    <li class="cert">
      <a href="${c.link}" target="_blank" rel="noopener">
        <span class="cert-name">${c.nombre}</span>
        <span class="cert-meta">${c.institucion}</span>
        <span class="cert-year">${c.fecha}</span>
        <span class="cert-arrow">${ICONOS.flecha}</span>
      </a>
    </li>
  `).join('');

  document.getElementById('formacion').innerHTML = `
    <div class="wrap">
      ${sectionHead('formacion', '05', 'Formación')}
      <div class="form-grid">
        <div>${edu}</div>
        <div class="reveal">
          <h3 class="sk-title">Certificaciones</h3>
          <ul class="cert-list">${certs}</ul>
        </div>
      </div>
    </div>
  `;
}


/* ══════════════════════════════════════
   CONTACTO + FOOTER
══════════════════════════════════════ */
function renderContacto() {
  const c = PORTFOLIO.contacto;
  const canales = [
    ['Email',    `<a href="mailto:${c.email}">${c.email}</a>`],
    ['Teléfono', `<a href="tel:${c.telefono.replace(/\s/g, '')}">${c.telefono}</a>`],
    ['LinkedIn', extLink(c.linkedin.url, c.linkedin.handle)],
    ['GitHub',   extLink(c.github.url, c.github.handle)],
  ].map(([k, v]) => `<div class="ct-row"><dt>${k}</dt><dd>${v}</dd></div>`).join('');

  document.getElementById('contacto').innerHTML = `
    <div class="wrap contact reveal">
      <div>
        <p class="kicker">06</p>
        <h2 class="contact-title" id="h-contacto">¿Conversamos?</h2>
        <p class="contact-text">Si tienes un proyecto, una vacante o una idea que involucre datos, escríbeme.</p>
        <a href="mailto:${c.email}" class="btn btn-solid">Escribir un email</a>
      </div>
      <dl class="ct-list">${canales}</dl>
    </div>
  `;
}

function renderFooter() {
  const p = PORTFOLIO.personal;
  document.getElementById('footer').innerHTML = `
    <div class="wrap footer-inner">
      <span>${p.nombre} &middot; ${p.titulo}</span>
      <span>${p.ubicacion} &middot; ${new Date().getFullYear()}</span>
    </div>
  `;
}


/* ══════════════════════════════════════
   ANIMACIÓN AL HACER SCROLL
══════════════════════════════════════ */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        obs.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  els.forEach(el => obs.observe(el));
}


/* ══════════════════════════════════════
   INIT
══════════════════════════════════════ */
function init() {
  renderHeader();
  renderInicio();
  renderProyectos();
  renderExperiencia();
  renderInvestigacion();
  renderHabilidades();
  renderFormacion();
  renderContacto();
  renderFooter();

  document.documentElement.classList.add('js-ready');
  initReveal();
  initScrollSpy();

  // Si la página se abrió con un #hash, volver a saltar ahora que el contenido existe
  const destino = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (destino) destino.scrollIntoView();
}

document.addEventListener('DOMContentLoaded', init);
