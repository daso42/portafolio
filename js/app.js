/* ══════════════════════════════════════
   CONSTANTS & HELPERS
══════════════════════════════════════ */
const MESES_LARGO = [
  'Enero','Febrero','Marzo','Abril','Mayo','Junio',
  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
];
const MESES_CORTO = [
  'ENE','FEB','MAR','ABR','MAY','JUN',
  'JUL','AGO','SEP','OCT','NOV','DIC'
];

function fmtFecha(s) {
  if (!s) return 'PRESENTE';
  const [y, m] = s.split('-');
  return `${MESES_CORTO[parseInt(m, 10) - 1]} ${y}`;
}

function sectionHeader(label) {
  return `
    <hr class="sh-rule-t">
    <div class="sh-label">${label}</div>
    <hr class="sh-rule-b">
  `;
}


/* ══════════════════════════════════════
   NAVIGATION
══════════════════════════════════════ */
const SECCIONES = [
  { id: 'inicio',      label: 'Inicio' },
  { id: 'experiencia', label: 'Experiencia' },
  { id: 'proyectos',   label: 'Proyectos' },
  { id: 'habilidades', label: 'Habilidades' },
  { id: 'educacion',   label: 'Educacion' },
  { id: 'contacto',    label: 'Contacto' },
];

function renderNav() {
  const nav = document.getElementById('nav-bar');
  nav.className = 'nav-bar';
  nav.innerHTML = SECCIONES.map(s =>
    `<a class="nav-link" data-section="${s.id}" role="button" tabindex="0">${s.label}</a>`
  ).join('');

  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => showSection(link.dataset.section));
    link.addEventListener('keydown', e => { if (e.key === 'Enter') showSection(link.dataset.section); });
  });
}

function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(a => a.classList.remove('active'));
  document.getElementById(`section-${id}`).classList.add('active');
  document.querySelector(`[data-section="${id}"]`).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


/* ══════════════════════════════════════
   MASTHEAD
══════════════════════════════════════ */
function renderMasthead() {
  const now  = new Date();
  const mes  = MESES_LARGO[now.getMonth()];
  const anio = now.getFullYear();
  const p    = PORTFOLIO.personal;

  document.getElementById('masthead').innerHTML = `
    <div class="masthead">
      <div class="masthead-name">DIEGO SANTIBÁÑEZ</div>
      <hr class="rule-heavy">
      <div class="masthead-meta">
        <span>${p.ubicacion}</span>
        <em>${p.especializaciones.join(' · ')}</em>
        <span>${mes} ${anio}</span>
      </div>
      <hr class="rule-light">
      <div class="masthead-tagline">${p.titulo} &mdash; ${p.subtitulo}</div>
    </div>
  `;
}


/* ══════════════════════════════════════
   INICIO
══════════════════════════════════════ */
function renderInicio() {
  const p = PORTFOLIO.personal;
  const c = PORTFOLIO.contacto;

  const numExp  = PORTFOLIO.experiencia.length;
  const numProj = PORTFOLIO.proyectos.length;
  const numCert = PORTFOLIO.certificados.length;

  document.getElementById('section-inicio').innerHTML = `
    <div class="hero-grid">
      <div class="hero-panel">
<div class="hero-name">${p.nombre}</div>
        <div class="hero-role">${p.titulo}</div>
        <div class="hero-bio">${p.bio}</div>
        <div class="hero-cta">
          <a href="mailto:${c.email}" class="btn-solid">Contactar</a>
          <a href="${c.linkedin.url}" target="_blank" rel="noopener" class="btn-ghost">LinkedIn</a>
          <a href="${c.github.url}"   target="_blank" rel="noopener" class="btn-ghost">GitHub</a>
        </div>
      </div>
      <div class="hero-right">
        <div class="stats-grid">
          <div class="stat-cell">
            <span class="stat-num">${numExp}</span>
            <span class="stat-label">Experiencias laborales</span>
          </div>
          <div class="stat-cell">
            <span class="stat-num">${numProj}</span>
            <span class="stat-label">Proyectos</span>
          </div>
          <div class="stat-cell">
            <span class="stat-num">${numCert}</span>
            <span class="stat-label">Certificaciones</span>
          </div>
        </div>
        <div class="contact-mini">
          <div class="cm-row">
            <span class="cm-label">Email</span>
            <span class="cm-value"><a href="mailto:${c.email}">${c.email}</a></span>
          </div>
          <div class="cm-row">
            <span class="cm-label">LinkedIn</span>
            <span class="cm-value"><a href="${c.linkedin.url}" target="_blank" rel="noopener">${c.linkedin.handle}</a></span>
          </div>
          <div class="cm-row">
            <span class="cm-label">GitHub</span>
            <span class="cm-value"><a href="${c.github.url}" target="_blank" rel="noopener">${c.github.handle}</a></span>
          </div>
          <div class="cm-row">
            <span class="cm-label">Fono</span>
            <span class="cm-value">${c.telefono}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}


/* ══════════════════════════════════════
   EXPERIENCIA
══════════════════════════════════════ */
function buildBullet(b) {
  const prize = b.es_premio
    ? '<span class="exp-prize">&#9733; Premio</span> '
    : '';
  const links = (b.links && b.links.length)
    ? `<div class="exp-links">${b.links.map(l =>
        `<a href="${l.url}" target="_blank" rel="noopener" class="exp-link">${l.label}</a>`
      ).join('')}</div>`
    : '';
  const cls = b.es_premio ? 'exp-bullet exp-bullet-prize' : 'exp-bullet';
  return `<div class="${cls}"><span class="exp-dash">&mdash;</span> ${prize}${b.texto}</div>${links}`;
}

function buildExpCard(exp, idx) {
  const sigla   = exp.empresa_sigla ? ` &middot; ${exp.empresa_sigla}` : '';
  const meta    = `${exp.empresa}${sigla} &middot; ${fmtFecha(exp.fecha_inicio)} &mdash; ${fmtFecha(exp.fecha_fin)}`;
  const first2  = exp.bullets.slice(0, 2).map(buildBullet).join('');
  const rest    = exp.bullets.slice(2).map(buildBullet).join('');
  const hasMore = exp.bullets.length > 2;

  return `
    <div class="exp-card">
      <div class="exp-title">${exp.cargo}</div>
      <div class="exp-meta">${meta}</div>
      <div>${first2}</div>
      ${hasMore ? `
        <div class="exp-extra" id="exp-extra-${idx}">${rest}</div>
        <button class="exp-toggle-btn" id="exp-btn-${idx}" data-idx="${idx}">VER MAS &rarr;</button>
      ` : ''}
    </div>
  `;
}

function renderExperiencia() {
  const exps = PORTFOLIO.experiencia;

  document.getElementById('section-experiencia').innerHTML = `
    ${sectionHeader('Trayectoria Profesional')}
    <div class="exp-grid">
      ${exps.map((exp, i) => buildExpCard(exp, i)).join('')}
    </div>
  `;

  document.getElementById('section-experiencia').querySelectorAll('.exp-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => toggleExp(btn.dataset.idx));
  });
}

function toggleExp(idx) {
  const extra = document.getElementById(`exp-extra-${idx}`);
  const btn   = document.getElementById(`exp-btn-${idx}`);
  const open  = extra.classList.toggle('visible');
  btn.innerHTML = open ? 'VER MENOS &uarr;' : 'VER MAS &rarr;';
}


/* ══════════════════════════════════════
   PROYECTOS
══════════════════════════════════════ */
function renderProyectos() {
  const proyectos = PORTFOLIO.proyectos.map(p => `
    <div class="project">
      <div class="proj-cat">
        ${p.destacado ? '<span class="proj-badge">Destacado</span> ' : ''}${p.categoria} &middot; ${p.fecha}
      </div>
      <hr class="proj-divider">
      <div class="proj-title">${p.titulo}</div>
      <div class="proj-year">A&Ntilde;O: ${p.fecha}</div>
      <div class="proj-desc">${p.descripcion}</div>
      <div class="proj-tags">${p.tecnologias.map(t => `<span class="proj-tag">${t}</span>`).join('')}</div>
      <a href="${p.link}" target="_blank" rel="noopener" class="proj-cta">Ver Proyecto &rarr;</a>
    </div>
  `).join('');

  document.getElementById('section-proyectos').innerHTML = `
    ${sectionHeader('Proyectos')}
    ${proyectos}
  `;
}


/* ══════════════════════════════════════
   HABILIDADES
══════════════════════════════════════ */
function renderHabilidades() {
  const tech = PORTFOLIO.habilidades.tecnicas.map(s => `<span class="sk-tag">${s}</span>`).join('');
  const soft = PORTFOLIO.habilidades.blandas.map(s => `<span class="sk-soft">${s}</span>`).join('');

  document.getElementById('section-habilidades').innerHTML = `
    ${sectionHeader('Competencias')}
    <div class="skills-grid">
      <div>
        <div class="sk-label">Habilidades Tecnicas</div>
        <hr class="sk-rule">
        <div>${tech}</div>
      </div>
      <div>
        <div class="sk-label">Habilidades Blandas</div>
        <hr class="sk-rule">
        <div>${soft}</div>
      </div>
    </div>
  `;
}


/* ══════════════════════════════════════
   EDUCACION
══════════════════════════════════════ */
function renderEducacion() {
  const edu   = PORTFOLIO.educacion[0];
  const certs = PORTFOLIO.certificados;

  const certNames = certs.map(c => c.nombre).join(', ');
  const sigla = edu.institucion_sigla ? ` &middot; ${edu.institucion_sigla}` : '';

  const certRows = certs.map(c => `
    <div class="cert-row">
      <div class="cert-name">${c.nombre}</div>
      <div class="cert-meta">${c.institucion} &middot; ${c.fecha}</div>
      <a href="${c.link}" target="_blank" rel="noopener" class="cert-link">Ver Certificado &rarr;</a>
    </div>
  `).join('');

  document.getElementById('section-educacion').innerHTML = `
    ${sectionHeader('Educacion &amp; Certificados')}
    <div class="edu-main">
      <div class="ed-label">Formacion Principal</div>
      <hr class="ed-rule">
      <div class="ed-degree">${edu.titulo}</div>
      <div class="ed-inst">${edu.institucion}${sigla} &middot; ${edu.fecha_inicio} &mdash; ${edu.fecha_fin}</div>
      <div class="ed-body">${edu.descripcion}</div>
    </div>
    <hr class="certs-divider">
    <div class="certs-label">Certificaciones</div>
    <div class="cert-list">${certRows}</div>
  `;
}


/* ══════════════════════════════════════
   CONTACTO
══════════════════════════════════════ */
function renderContacto() {
  const c = PORTFOLIO.contacto;

  const items = [
    { label: 'Email',    value: `<a href="mailto:${c.email}">${c.email}</a>` },
    { label: 'Telefono', value: c.telefono },
    { label: 'LinkedIn', value: `<a href="${c.linkedin.url}" target="_blank" rel="noopener">${c.linkedin.handle}</a>` },
    { label: 'GitHub',   value: `<a href="${c.github.url}"   target="_blank" rel="noopener">${c.github.handle}</a>` },
  ].map(i => `
    <div class="ct-item">
      <div class="ct-label">${i.label}</div>
      <div class="ct-value">${i.value}</div>
    </div>
  `).join('');

  document.getElementById('section-contacto').innerHTML = `
    ${sectionHeader('Contacto')}
    <div class="contact-grid">${items}</div>
  `;
}


/* ══════════════════════════════════════
   FOOTER
══════════════════════════════════════ */
function renderFooter() {
  const now  = new Date();
  const mes  = MESES_LARGO[now.getMonth()];
  const anio = now.getFullYear();

  document.getElementById('footer').textContent =
    `Diego Santibanez Oyarce · Cientifico de Datos · Santiago, Chile · ${mes} ${anio}`;
}


/* ══════════════════════════════════════
   INIT
══════════════════════════════════════ */
function init() {
  renderMasthead();
  renderNav();
  renderInicio();
  renderExperiencia();
  renderProyectos();
  renderHabilidades();
  renderEducacion();
  renderContacto();
  renderFooter();
  showSection('inicio');
}

document.addEventListener('DOMContentLoaded', init);
