/* Qida Portal — Prototype interactions
   - Hash routing for the 7 sections
   - Sample content rendering for home + contenidos
   - Accordion toggle (Mi evolución, FAQ)
   - Pill filter group (visual-only)
*/

(function () {
  'use strict';

  // -------- Sample content (Spanish, matching screenshots) --------
  const CONTENT = [
    {
      cat: 'Mente activa',
      catKey: 'cognitiva',
      type: 'Vídeo',
      typeIcon: 'i-play',
      title: 'Longevidad consciente: gestión emocional y longevidad cognitiva',
      cta: 'Ver',
      thumb: 'linear-gradient(135deg,#F4EAD8 0%,#E8DCC2 100%)',
    },
    {
      cat: 'Bienestar emocional',
      catKey: 'emocional',
      type: 'Artículo',
      typeIcon: 'i-doc',
      title: 'Aprende a mantener hábitos saludables a largo plazo',
      cta: 'Acceder',
      thumb: 'url(https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80&auto=format&fit=crop)',
    },
    {
      cat: 'Mente activa',
      catKey: 'cognitiva',
      type: 'Artículo',
      typeIcon: 'i-doc',
      title: 'Protege tu cerebro: claves para mantener tu mente saludable',
      cta: 'Acceder',
      thumb: 'url(https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=600&q=80&auto=format&fit=crop)',
    },
    {
      cat: 'Actividad física',
      catKey: 'fisica',
      type: 'Ficha',
      typeIcon: 'i-doc',
      title: 'Rutina de movilidad para empezar el día',
      cta: 'Acceder',
      thumb: 'linear-gradient(135deg,#E1D8F2 0%,#C9BAEB 100%)',
    },
    {
      cat: 'Nutrición',
      catKey: 'nutricion',
      type: 'Artículo',
      typeIcon: 'i-doc',
      title: 'Dieta mediterránea: pilares para un envejecimiento sano',
      cta: 'Acceder',
      thumb: 'url(https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80&auto=format&fit=crop)',
    },
    {
      cat: 'Bienestar emocional',
      catKey: 'emocional',
      type: 'Vídeo',
      typeIcon: 'i-play',
      title: 'Respiración consciente en 5 minutos',
      cta: 'Ver',
      thumb: 'linear-gradient(135deg,#F4D8DD 0%,#EBB9C2 100%)',
    },
  ];

  function contentCardHTML(c) {
    const isImage = c.thumb.startsWith('url(');
    const thumbStyle = isImage
      ? `background-image:${c.thumb};background-size:cover;background-position:center;`
      : `background-image:${c.thumb};`;
    return `
      <article class="content-card">
        <div class="thumb" style="${thumbStyle}">
          <span class="badge-type"><svg width="14" height="14"><use href="#${c.typeIcon}"/></svg></span>
        </div>
        <div class="body">
          <span class="category is-${c.catKey}">${c.cat}</span>
          <span class="type">${c.type}</span>
          <span class="title">${c.title}</span>
        </div>
        <div class="footer">
          <button class="btn btn-primary btn-sm">${c.cta}</button>
        </div>
      </article>
    `;
  }

  function renderContent() {
    const home = document.getElementById('home-content');
    if (home) home.innerHTML = CONTENT.slice(0, 3).map(contentCardHTML).join('');
    const all = document.getElementById('all-content');
    if (all) all.innerHTML = CONTENT.map(contentCardHTML).join('');
  }

  // -------- Habit data + detail rendering --------
  // Each habit has evolution data (quarterly evaluations) + a preview recommendation
  // shown on the Mi evolución cards. Full content (valoración, objetivos, pautas, etc.)
  // is reserved for the habit-detail page accessed via "Ver más recomendaciones".
  const HABITS = {
    'actividad-fisica': {
      num: '01',
      name: 'Actividad Física',
      slug: 'actividad-fisica',
      icon: 'i-running',
      iconClass: 'habit-actividad-fisica',
      score: 3,
      status: 'red',
      statusLabel: 'Área de Acción',
      scaleActive: 1, // 0=Bajo, 1=Moderado, 2=Alto
      evolution: [
        { date: '18 mar 2026', label: 'Inicial', score: 3 }
      ],
      previewRec: {
        title: 'Activación física diaria',
        body: 'Camina a un ritmo suave 15 minutos al día, 5 días por semana, preferiblemente después de comer.'
      },
      valoracion: {
        title: 'Cuestionario internacional de actividad física (IPAQ)',
        desc: 'Indica el tipo y nivel de actividad física que realizas en tu vida cotidiana.',
        date: '02/06/2025',
        result: 'Nivel moderado de actividad física',
        scaleSteps: [
          { label: 'Bajo',     hint: 'Menor actividad', color: 'red' },
          { label: 'Moderado', hint: '',                color: 'amber' },
          { label: 'Alto',     hint: 'Mayor actividad', color: 'green' }
        ],
        message: 'Felicidades por el nivel de actividad física alcanzado. Continúa así, es muy importante para prevenir el inicio o retrasar la evolución de enfermedades neurodegenerativas.'
      },
      objetivos: 'El objetivo principal es <strong>continuar realizando actividad física regular</strong> al mismo nivel (moderado) o superior.',
      pautas: {
        intro: 'Los tipos más importantes de actividad física se pueden clasificar en 4 grandes grupos según la capacidad trabajada:',
        cats: [
          { num: 1, title: 'Aeróbica', desc: 'Movimiento rítmico y sostenido. Ej: andar, correr, nadar, ir en bici, patinar.' },
          { num: 2, title: 'Fuerza y resistencia', desc: 'Ejercicios que refuerzan la musculatura. Ej: subir escaleras, levantar cargas, saltar.' },
          { num: 3, title: 'Flexibilidad', desc: 'Aumentan la amplitud articular. Ej: yoga, taichí, pilates, aquagym.' },
          { num: 4, title: 'Equilibrio y coordinación', desc: 'Previenen caídas. Ej: apoyo en un pie, paso talón-punta, lanzar y coger pelotas.' }
        ],
        table: [
          {
            cap: 'Aeróbica',
            obj: ['Mejorar la capacidad funcional', 'Reducir factores de riesgo cardiovascular', 'Controlar peso y composición corporal'],
            dur: ['Entre 2,5 y 5 horas semanales (moderado)', 'O 75–150 min/semana a intensidad vigorosa', '5 días/semana'],
            tipo: ['Caminar y/o senderismo', 'Trotar, correr, ir en bici, bailar', 'Natación, aquagym, gimnasio', 'Pádel, tenis']
          },
          {
            cap: 'Fuerza y resistencia',
            obj: ['Mejorar capacidad funcional para AVD', 'Mantener masa muscular y densidad ósea'],
            dur: ['2 sesiones semanales como mínimo, no consecutivas', '20–30 min por sesión'],
            tipo: ['Subir y bajar escaleras', 'Levantarse y sentarse en la silla', 'Ejercicios con bandas elásticas', 'Cargar peso ligero']
          },
          {
            cap: 'Flexibilidad',
            obj: ['Mejorar la amplitud articular', 'Reducir rigidez y dolor'],
            dur: ['2–3 veces por semana', '10–20 min por sesión'],
            tipo: ['Yoga', 'Taichí', 'Pilates', 'Estiramientos']
          },
          {
            cap: 'Equilibrio y coordinación',
            obj: ['Mejorar el equilibrio y coordinación', 'Evitar caídas'],
            dur: ['10–15 minutos por sesión', '2–3 veces a la semana'],
            tipo: ['Paso talón-punta', 'Apoyo en un solo pie', 'Lanzar y coger pelotas', 'Saltar', 'Yoga, taichí']
          }
        ]
      },
      enlaces: [
        'Ejercicios de calentamiento',
        'La importancia de la hidratación en la actividad física',
        'Ejercicio físico para realizar en casa',
        'Ejercicio en verano: precauciones',
        'Ejercicio para realizar en el exterior'
      ],
      fichas: [
        { title: 'Aprende a crear hábitos saludables', desc: 'Crea tu propio plan de actividad física' },
        { title: 'Comienza el fortalecimiento muscular', desc: 'Ejercita tu musculatura con ejercicios moderados' },
        { title: 'Mejora tu coordinación y equilibrio', desc: 'Potencia tu condición física mediante la fuerza y la coordinación' },
        { title: '5 razones para lanzarse al agua', desc: 'La natación como forma de actividad física aeróbica de intensidad' },
        { title: 'Ejercicios para realizar desde casa', desc: 'Comienza a activarte y practica estos ejercicios en tu rutina diaria' },
        { title: 'Estiramientos', desc: 'Movimientos para aumentar la flexibilidad y prevenir lesiones musculares' }
      ],
      recordatorios: [
        'El riesgo de lesión se minimiza cuando la actividad física aumenta progresivamente: primero la duración, después la intensidad, finalmente la frecuencia.',
        'Comunica a Daniela Agudelo, tu Orientador/a Personal, cualquier factor de riesgo, síntoma o enfermedad no informada previamente.',
        'Haz siempre ejercicios de calentamiento y estiramientos para reducir el riesgo de lesiones.',
        'Si durante el ejercicio aparece dolor articular o muscular, disnea intensa, mareo, cefalea, dolor torácico o calambres, reduce el ritmo o para y consulta con tu profesional de salud.'
      ],
      porQue: {
        intro: 'Según la <strong>Organización Mundial de la Salud (OMS)</strong>, los beneficios de realizar actividad física regular son múltiples:',
        benefits: [
          'Reducción del riesgo de mortalidad por múltiples causas.',
          'Prevención y control de enfermedades cardiovasculares, diabetes, síndrome metabólico, sobrepeso y obesidad.',
          'Mejora la salud ósea: reduce el riesgo de caídas y fracturas.',
          'Mejora la salud mental y el sueño. Reduce ansiedad y depresión.',
          'Disminuye los síntomas de estrés y aumenta la autoestima.',
          'Mejora de la salud cognitiva.'
        ],
        oms: 'La OMS recomienda firmemente realizar actividad física para mantener una función cognitiva normal y reducir el riesgo de deterioro cognitivo.'
      }
    },
    'bienestar-emocional':   {
      num: '04', name: 'Bienestar Emocional', slug: 'bienestar-emocional',
      icon: 'i-heart', iconClass: 'habit-bienestar-emocional',
      score: 3, status: 'red', statusLabel: 'Área de Acción',
      evolution: [
        { date: '18 mar 2026', label: 'Inicial',  score: 3 }
      ],
      previewRec: {
        title: 'Tiempo para ti',
        body: 'Dedica 10 minutos al día a una actividad que te haga disfrutar: leer, escuchar música o tomar un café tranquilamente.'
      }
    },
    'nutricion':             {
      num: '02', name: 'Nutrición', slug: 'nutricion',
      icon: 'i-apple', iconClass: 'habit-nutricion',
      score: 4, status: 'red', statusLabel: 'Área de Acción',
      evolution: [
        { date: '18 mar 2026', label: 'Inicial', score: 4 }
      ],
      previewRec: {
        title: 'Más fruta y verdura',
        body: 'Añade una pieza de fruta al desayuno y una ración de verdura a la comida o la cena, alternando los días.'
      }
    },
    'mente-activa':          {
      num: '03', name: 'Mente Activa', slug: 'mente-activa',
      icon: 'i-brain', iconClass: 'habit-mente-activa',
      score: 4, status: 'red', statusLabel: 'Área de Acción',
      evolution: [
        { date: '18 mar 2026', label: 'Inicial', score: 4 }
      ],
      previewRec: {
        title: 'Estimulación cognitiva diaria',
        body: 'Realiza una tarea breve de atención, memoria o lenguaje, de lunes a viernes (5–10 minutos).'
      }
    },
    'participacion-social':  {
      num: '05', name: 'Participación Social', slug: 'participacion-social',
      icon: 'i-users', iconClass: 'habit-participacion-social',
      score: 5, status: 'amber', statusLabel: 'Área de Mejora',
      evolution: [
        { date: '18 mar 2026', label: 'Inicial',  score: 5 }
      ],
      previewRec: {
        title: 'Recupera el contacto social',
        body: 'Plantea un encuentro semanal con una amistad cercana, ya sea en persona o por teléfono.'
      }
    },
    'sueno':                 {
      num: 'S',  name: 'Sueño', slug: 'sueno',
      icon: 'i-clock', iconClass: 'habit-sueno',
      score: 6, status: 'amber', statusLabel: 'Área de Mejora',
      evolution: [
        { date: '18 mar 2026', label: 'Inicial',  score: 6 }
      ],
      previewRec: {
        title: 'Rutina antes de dormir',
        body: 'Evita pantallas la última hora del día y mantén un horario fijo para acostarte y levantarte.'
      }
    },
    'auditivo-ocular':       {
      num: '06', name: 'Cuidado Ocular y Auditivo', slug: 'auditivo-ocular',
      icon: 'i-ear', iconClass: 'habit-auditivo-ocular',
      score: 7, status: 'amber', statusLabel: 'Área de Mejora',
      evolution: [
        { date: '18 mar 2026', label: 'Inicial',  score: 7 }
      ],
      previewRec: {
        title: 'Revisiones periódicas',
        body: 'Programa una revisión anual con tu oftalmólogo y otra con tu otorrino para detectar cambios a tiempo.'
      }
    },
    'tabaco-alcohol':        {
      num: '07', name: 'Tabaco y Alcohol', slug: 'tabaco-alcohol',
      icon: 'i-leaf', iconClass: 'habit-tabaco-alcohol',
      score: 10, status: 'green', statusLabel: 'Área de Fortaleza',
      evolution: [
        { date: '18 mar 2026', label: 'Inicial',  score: 10 }
      ],
      previewRec: {
        title: 'Mantén tu fortaleza',
        body: 'No consumes tabaco ni alcohol. Sigue así: es uno de los factores protectores más potentes para tu salud cerebral.'
      }
    }
  };

  // Order in which habits are displayed across the app
  const HABIT_ORDER = [
    'actividad-fisica',
    'bienestar-emocional',
    'nutricion',
    'mente-activa',
    'participacion-social',
    'auditivo-ocular',
    'tabaco-alcohol',
    'sueno'
  ];

  // Seguimiento overrides — applied when the user is in Prototype 2 (Plan de Seguimiento)
  // Reflects the Cuatrimestre 1 follow-up performed on 18 jun 2026.
  const SEGUIMIENTO_OVERRIDES = {
    'actividad-fisica': {
      score: 5, status: 'amber', statusLabel: 'Área de Mejora',
      evolution: [
        { date: '18 mar 2026', label: 'Inicial',     score: 3 },
        { date: '18 jun 2026', label: 'Cuatrimestre 1', score: 5 }
      ]
    },
    'nutricion': {
      score: 5, status: 'amber', statusLabel: 'Área de Mejora',
      evolution: [
        { date: '18 mar 2026', label: 'Inicial',     score: 4 },
        { date: '18 jun 2026', label: 'Cuatrimestre 1', score: 5 }
      ]
    },
    'mente-activa': {
      score: 6, status: 'amber', statusLabel: 'Área de Mejora',
      evolution: [
        { date: '18 mar 2026', label: 'Inicial',     score: 4 },
        { date: '18 jun 2026', label: 'Cuatrimestre 1', score: 6 }
      ]
    },
    'bienestar-emocional': {
      score: 5, status: 'amber', statusLabel: 'Área de Mejora',
      evolution: [
        { date: '18 mar 2026', label: 'Inicial',     score: 3 },
        { date: '18 jun 2026', label: 'Cuatrimestre 1', score: 5 }
      ]
    },
    'participacion-social': {
      score: 5, status: 'amber', statusLabel: 'Área de Mejora',
      evolution: [
        { date: '18 mar 2026', label: 'Inicial',     score: 5 },
        { date: '18 jun 2026', label: 'Cuatrimestre 1', score: 5 }
      ]
    },
    'sueno': {
      score: 7, status: 'amber', statusLabel: 'Área de Mejora',
      evolution: [
        { date: '18 mar 2026', label: 'Inicial',     score: 6 },
        { date: '18 jun 2026', label: 'Cuatrimestre 1', score: 7 }
      ]
    },
    'auditivo-ocular': {
      score: 7, status: 'amber', statusLabel: 'Área de Mejora',
      evolution: [
        { date: '18 mar 2026', label: 'Inicial',     score: 7 },
        { date: '18 jun 2026', label: 'Cuatrimestre 1', score: 7 }
      ]
    },
    'tabaco-alcohol': {
      score: 10, status: 'green', statusLabel: 'Área de Fortaleza',
      evolution: [
        { date: '18 mar 2026', label: 'Inicial',     score: 10 },
        { date: '18 jun 2026', label: 'Cuatrimestre 1', score: 10 }
      ]
    }
  };

  // Returns the merged habit data taking proto-2 (seguimiento) overrides into account.
  function getHabitsForView() {
    const isSeguimiento = document.body.classList.contains('proto-2');
    if (!isSeguimiento) return HABITS;
    const merged = {};
    Object.keys(HABITS).forEach(slug => {
      merged[slug] = { ...HABITS[slug], ...(SEGUIMIENTO_OVERRIDES[slug] || {}) };
    });
    return merged;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  }

  // -------- Mi evolución cards --------
  function renderEvolucion() {
    const list = document.getElementById('evolucion-list');
    if (!list) return;

    const habits = getHabitsForView();
    const cards = HABIT_ORDER.map(slug => {
      const h = habits[slug];
      if (!h) return '';
      const ev = h.evolution || [];
      const last = ev[ev.length - 1] || { score: h.score, date: '—' };
      const first = ev[0] || last;
      const delta = last.score - first.score;
      const hasMultiple = ev.length > 1;

      // Compact evolution row — show ONLY the previous → current step on the card
      let evolutionHtml = '';
      if (hasMultiple) {
        const prev = ev[ev.length - 2];
        const stepDelta = last.score - prev.score;
        const stepWord = Math.abs(stepDelta) === 1 ? 'punto' : 'puntos';
        const stepClass = stepDelta > 0 ? 'up' : (stepDelta < 0 ? 'down' : 'flat');
        const stepText = stepDelta > 0 ? `+${stepDelta} ${stepWord}` : (stepDelta < 0 ? `${stepDelta} ${stepWord}` : 'Sin cambios');
        const arrow = stepDelta > 0 ? '↑' : (stepDelta < 0 ? '↓' : '·');
        evolutionHtml = `
          <div class="ev-mini">
            <span class="ev-mini-track">
              <span class="ev-mini-dot is-past">${prev.score}</span>
              <span class="ev-mini-line"></span>
              <span class="ev-mini-dot is-current status-${scoreToStatus(last.score)}">${last.score}</span>
            </span>
            <span class="ev-mini-delta delta-${stepClass}">${arrow} ${stepText}</span>
          </div>`;
      } else {
        evolutionHtml = `<div class="ev-mini-empty">Valoración inicial · ${escapeHtml(last.date)}</div>`;
      }

      return `
        <article class="ev-card" id="hab-${slug}">
          <header class="ev-card-head">
            <span class="ev-icon ${h.iconClass}"><svg><use href="#${h.icon}"/></svg></span>
            <div class="ev-card-title">
              <h3>${escapeHtml(h.name)}</h3>
            </div>
          </header>

          <div class="ev-level status-${h.status}">
            <div class="ev-level-head">
              <span class="ev-level-score"><strong>${h.score}</strong><span class="of">/10</span></span>
              <span class="ev-level-status">${escapeHtml(h.statusLabel)}</span>
            </div>
            <div class="ev-level-bar">
              ${Array.from({length: 10}, (_, i) =>
                `<span class="ev-level-cell ${i < h.score ? 'is-filled' : ''}"></span>`
              ).join('')}
            </div>
          </div>

          ${evolutionHtml}

          <a href="#/evolucion/habito/${slug}" class="btn ev-card-cta">
            Ver recomendaciones
            <svg width="14" height="14"><use href="#i-chevron"/></svg>
          </a>
        </article>`;
    }).join('');

    list.innerHTML = cards;
  }

  // Map a 0-10 score to a status color
  function scoreToStatus(score) {
    if (score >= 8) return 'green';
    if (score >= 5) return 'amber';
    return 'red';
  }

  function renderHabito(slug) {
    const habits = getHabitsForView();
    const h = habits[slug];
    const breadcrumb = document.getElementById('habito-breadcrumb');
    const content = document.getElementById('habito-content');
    if (!content) return;

    if (!h) {
      breadcrumb.textContent = 'Hábito no encontrado';
      content.innerHTML = `<div class="card"><div class="empty"><p>Este hábito no existe.</p></div></div>`;
      return;
    }
    breadcrumb.textContent = h.name;

    // If full content not yet defined, show placeholder
    if (!h.valoracion) {
      content.innerHTML = `
        <article class="habit-detail ${h.iconClass}">
          <header class="habit-hero">
            <span class="hero-status-chip status-${h.status}">
              <strong class="chip-score">${h.score}</strong><span class="chip-den">/10</span>
              <span class="chip-sep">·</span>
              <span class="chip-label">${h.statusLabel}</span>
            </span>
            <div class="num">Recomendación · ${h.num}</div>
            <div class="habit-title-row">
              <span class="habit-title-icon ${h.iconClass}"><svg><use href="#${h.icon}"/></svg></span>
              <h2>${h.name}</h2>
            </div>
          </header>
          <div class="habit-pending">
            <h3>Contenido en preparación</h3>
            <p>Estamos preparando el contenido detallado para este hábito.<br>Pronto encontrarás aquí valoración, objetivos, pautas, enlaces y recordatorios.</p>
          </div>
        </article>
      `;
      return;
    }

    // Full detail render
    const v = h.valoracion;
    const scaleHtml = v.scaleSteps.map((s, i) => `
      <div class="scale-step ${s.color} ${i === h.scaleActive ? 'is-active' : ''}">
        ${escapeHtml(s.label)}${s.hint ? `<div style="font-size:11px;font-weight:400;opacity:.85;margin-top:2px">${escapeHtml(s.hint)}</div>` : ''}
      </div>`).join('');

    const catsHtml = h.pautas.cats.map(c => `
      <div class="pauta-cat">
        <span class="num">${c.num}</span>
        <div><div class="title">${escapeHtml(c.title)}</div><div class="desc">${escapeHtml(c.desc)}</div></div>
      </div>`).join('');

    const tableHtml = `
      <table class="rec-table">
        <thead><tr><th>Capacidad</th><th>Objetivo</th><th>Duración / Frecuencia</th><th>Tipo de actividad</th></tr></thead>
        <tbody>
          ${h.pautas.table.map(r => `
            <tr>
              <td>${escapeHtml(r.cap)}</td>
              <td><ul>${r.obj.map(x => `<li>${escapeHtml(x)}</li>`).join('')}</ul></td>
              <td><ul>${r.dur.map(x => `<li>${escapeHtml(x)}</li>`).join('')}</ul></td>
              <td><ul>${r.tipo.map(x => `<li>${escapeHtml(x)}</li>`).join('')}</ul></td>
            </tr>`).join('')}
        </tbody>
      </table>`;

    const linksHtml = h.enlaces.map(l => `
      <a href="#" class="link-row"><span>${escapeHtml(l)}</span><span class="acceder">Acceder <svg width="12" height="12"><use href="#i-chevron"/></svg></span></a>
    `).join('');

    const fichasHtml = h.fichas.map(f => `
      <div class="ficha-card">
        <div class="ficha-title">${escapeHtml(f.title)}</div>
        <div class="ficha-desc">${escapeHtml(f.desc)}</div>
        <a href="#" class="ficha-cta">Abrir ficha <svg width="11" height="11"><use href="#i-chevron"/></svg></a>
      </div>`).join('');

    const recordHtml = `<ul>${h.recordatorios.map(r => `<li>${escapeHtml(r)}</li>`).join('')}</ul>`;

    const benefitsHtml = h.porQue.benefits.map(b => `<div class="benefit-item">${escapeHtml(b)}</div>`).join('');

    // Compact evolution row inside the detail page (only with multiple evaluations)
    const ev = h.evolution || [];
    const evHtml = ev.length > 1 ? (() => {
      const last = ev[ev.length - 1];
      const past = ev.slice(0, -1).map(e => `<span class="ev-mini-dot is-past">${e.score}</span>`).join('<span class="ev-mini-line"></span>');
      const lastDot = `<span class="ev-mini-dot is-current status-${scoreToStatus(last.score)}">${last.score}</span>`;
      const delta = last.score - ev[0].score;
      const word = Math.abs(delta) === 1 ? 'punto' : 'puntos';
      const dClass = delta > 0 ? 'up' : (delta < 0 ? 'down' : 'flat');
      const deltaText = delta > 0 ? `+${delta} ${word}` : (delta < 0 ? `${delta} ${word}` : 'Sin cambios');
      const arrow = delta > 0 ? '↑' : (delta < 0 ? '↓' : '·');
      return `
        <section class="habit-evolution">
          <span class="habit-evolution-label">Tu evolución</span>
          <span class="ev-mini-track">${past}<span class="ev-mini-line"></span>${lastDot}</span>
          <span class="ev-mini-delta delta-${dClass}">${arrow} ${deltaText}</span>
        </section>`;
    })() : '';

    content.innerHTML = `
      <article class="habit-detail ${h.iconClass}">
        <header class="habit-hero">
          <div class="hero-topbar">
            <div class="num">Recomendación · ${h.num}</div>
            <span class="hero-status-chip status-${h.status}">
              <strong class="chip-score">${h.score}</strong><span class="chip-den">/10</span>
              <span class="chip-sep">·</span>
              <span class="chip-label">${h.statusLabel}</span>
            </span>
          </div>
          <div class="habit-title-row">
            <span class="habit-title-icon ${h.iconClass}"><svg><use href="#${h.icon}"/></svg></span>
            <h2>${h.name}</h2>
          </div>
        </header>

        ${evHtml}

        <nav class="subsection-nav" id="subsectionNav">
          <a href="#sub-a" class="subsection-link is-active"><span class="step">A</span>Valoración</a>
          <a href="#sub-b" class="subsection-link"><span class="step">B</span>Objetivos</a>
          <a href="#sub-c" class="subsection-link"><span class="step">C</span>Pautas</a>
          <a href="#sub-d" class="subsection-link"><span class="step">D</span>Enlaces</a>
          <a href="#sub-e" class="subsection-link"><span class="step">E</span>Recuerda</a>
          <a href="#sub-f" class="subsection-link"><span class="step">F</span>Por qué</a>
        </nav>

        <section class="subsection" id="sub-a">
          <div class="sub-eyebrow">A · Valoración</div>
          <h3>Resultado de las escalas</h3>
          <div class="valoracion">
            <div class="v-name">${escapeHtml(v.title)}</div>
            <div class="v-row" style="grid-column:1/-1"><span class="lbl">Descripción</span><span class="val">${escapeHtml(v.desc)}</span></div>
            <div class="v-row"><span class="lbl">Fecha de valoración</span><span class="val">${escapeHtml(v.date)}</span></div>
            <div class="v-row"><span class="lbl">Resultado</span><span class="val">${escapeHtml(v.result)}</span></div>
          </div>
          <div class="scale">${scaleHtml}</div>
          <p style="margin-top:18px">${escapeHtml(v.message)}</p>
          <div class="plan-disclaimer"><strong>Nota:</strong> El resultado no representa un diagnóstico médico ni pretende sustituir un servicio de atención médica.</div>
        </section>

        <section class="subsection" id="sub-b">
          <div class="sub-eyebrow">B · Objetivos</div>
          <h3>Objetivo principal</h3>
          <p>${h.objetivos}</p>
        </section>

        <section class="subsection" id="sub-c">
          <div class="sub-eyebrow">C · Pautas clave</div>
          <h3>Tipos de actividad recomendada</h3>
          <p>${escapeHtml(h.pautas.intro)}</p>
          <div class="pautas-cats">${catsHtml}</div>
          <h3 style="margin-top:24px">Recomendaciones específicas</h3>
          ${tableHtml}
        </section>

        <section class="subsection" id="sub-d">
          <div class="sub-eyebrow">D · Enlaces y fichas</div>
          <h3>Enlaces de ampliación</h3>
          <p>Material seleccionado para que profundices en los temas relevantes.</p>
          <div class="links-grid">${linksHtml}</div>
          <h3 style="margin-top:24px">Fichas de trabajo</h3>
          <div class="fichas-grid">${fichasHtml}</div>
        </section>

        <section class="subsection" id="sub-e">
          <div class="sub-eyebrow">E · Recuerda</div>
          <h3>Ten en cuenta que…</h3>
          <div class="recordatorios">${recordHtml}</div>
        </section>

        <section class="subsection" id="sub-f">
          <div class="sub-eyebrow">F · Por qué</div>
          <h3>¿Por qué seguir estas recomendaciones?</h3>
          <p>${h.porQue.intro}</p>
          <div class="benefits">${benefitsHtml}</div>
          <div class="oms-card">
            <div class="oms-eyebrow">Recomendación de la OMS</div>
            <p>${escapeHtml(h.porQue.oms)}</p>
          </div>
        </section>
      </article>
    `;

    // Initialize sub-section nav (smooth-scroll + scroll-spy)
    initSubsectionNav();
  }

  function initSubsectionNav() {
    const nav = document.getElementById('subsectionNav');
    if (!nav) return;
    const links = Array.from(nav.querySelectorAll('.subsection-link'));
    const sections = links.map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);

    nav.addEventListener('click', (e) => {
      const a = e.target.closest('.subsection-link');
      if (!a) return;
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const headerH = document.querySelector('.app-header')?.offsetHeight || 0;
      const tabH = window.innerWidth > 768 ? (document.querySelector('.tab-bar')?.offsetHeight || 0) : 0;
      const navH = nav.offsetHeight;
      const offset = headerH + tabH + navH + 12;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth'
      });
    });

    const onScroll = () => {
      const navBottom = nav.getBoundingClientRect().bottom;
      let active = sections[0];
      for (const sec of sections) {
        if (sec.getBoundingClientRect().top - navBottom < 120) active = sec;
      }
      links.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === '#' + active.id));
    };
    // Remove any prior listener (idempotent on re-render)
    if (window.__subsecScroll) window.removeEventListener('scroll', window.__subsecScroll);
    window.__subsecScroll = onScroll;
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // -------- Routing --------
  const ROUTES = ['inicio', 'informes', 'evolucion', 'citas', 'servicios', 'contenidos', 'faq'];

  function route() {
    // Support both "#/evolucion#hab-x" (anchor jump) and "#/evolucion/habito/x" (detail)
    const raw = location.hash || '';
    // Strip a trailing anchor (#hab-...) before parsing the route
    const [routePart, anchor] = raw.includes('#hab-') ? raw.split(/#hab-/) : [raw, null];
    const parts = (routePart.replace(/^#\//, '') || 'inicio').split('/');
    let r = parts[0];
    if (!ROUTES.includes(r)) r = 'inicio';

    // Sub-route: #/evolucion/habito/<slug> renders the full habit detail
    let viewName = r;
    if (r === 'evolucion' && parts[1] === 'habito' && parts[2]) {
      viewName = 'habito';
      renderHabito(parts[2]);
    }
    // Sub-route: #/informes/area/<slug> renders the full area detail
    if (r === 'informes' && parts[1] === 'area' && parts[2]) {
      viewName = 'area';
      renderArea(parts[2]);
    }

    document.querySelectorAll('.view').forEach(v => {
      v.classList.toggle('is-active', v.dataset.view === viewName);
    });
    document.querySelectorAll('.tab').forEach(t => {
      t.classList.toggle('is-active', t.dataset.route === r);
    });
    document.querySelectorAll('.drawer-link').forEach(t => {
      t.classList.toggle('is-active', t.dataset.route === r);
    });

    // Scroll to anchor (e.g. #hab-actividad-fisica) if present, else to top
    if (anchor && viewName === 'evolucion') {
      // Wait a tick for the section to be visible
      requestAnimationFrame(() => {
        const target = document.getElementById('hab-' + anchor);
        if (target) {
          const headerH = document.querySelector('.app-header')?.offsetHeight || 0;
          const tabH = window.innerWidth > 768 ? (document.querySelector('.tab-bar')?.offsetHeight || 0) : 0;
          window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY - headerH - tabH - 12,
            behavior: 'smooth'
          });
        }
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    }
  }

  window.addEventListener('hashchange', route);

  // ==================== DETALLE DE ÁREA ====================
  const AREAS = {
    'actividad-fisica': { name:'Actividad Física', cat:'cat-fisica', icon:'i-running', fg:'dark', score:'7/10', status:'amber', statusLabel:'MEJORA',
      escalas:[ {t:'Cuestionario internacional de actividad física (IPAQ)', v:'1.100 MET-min/semana', variant:'amber', d:'IPAQ es un cuestionario internacional de actividad física que indica el tipo y nivel de actividad física que realizas en tu vida cotidiana.', rangos:['Bajo (nivel bajo o inactivo): 0 – 600 MET-min/semana.','Moderado: 600 – 1500 MET-min/semana.','Alto: 1500 – 3000 MET-min/semana (o superior).'] } ] },
    'nutricion': { name:'Nutrición', cat:'cat-nutricion', icon:'i-apple', fg:'dark', score:'8/10', status:'green', statusLabel:'SIGUE ASÍ',
      escalas:[ {t:'Índice de Masa Corporal (IMC)', v:'22,0 kg/m²', variant:'green', d:'El IMC es una medida para evaluar si una persona tiene un peso saludable en relación con su altura (kg/m²).', rangos:['<18,5: Peso insuficiente','18,5–24,9: Peso saludable','25–29,9: Sobrepeso','30–34,9: Obesidad tipo I','35–39,9: Obesidad tipo II','40–49,9: Obesidad tipo III','>50: Obesidad tipo IV']},
                {t:'Cuestionario MEDAS: adherencia a la dieta mediterránea', v:'11 / 14 puntos', variant:'green', d:'MEDAS evalúa el grado de adherencia a la dieta mediterránea mediante 14 ítems sobre frecuencia y tipo de alimentos.', rangos:['Baja adherencia (<9 puntos)','Buena adherencia (≥9 puntos)']} ] },
    'mente-activa': { name:'Mente Activa', cat:'cat-mente', icon:'i-brain', fg:'light', score:'9/10', status:'green', statusLabel:'SIGUE ASÍ',
      escalas:[ {t:'Test de Pfeiffer', v:'1 error', variant:'green', d:'Prueba de cribado para detectar posibles signos de deterioro cognitivo (10 preguntas: memoria, atención, razonamiento y cálculo).', rangos:['8–10: posible deterioro cognitivo severo.','5–7: posible deterioro cognitivo moderado.','3–4: posible deterioro cognitivo leve.','0–2: ausencia de posible deterioro cognitivo.']} ] },
    'bienestar-emocional': { name:'Bienestar Emocional', cat:'cat-bienestar', icon:'i-heart', fg:'light', score:'8/10', status:'green', statusLabel:'SIGUE ASÍ',
      escalas:[ {t:'Escala de Ansiedad y Depresión de Goldberg (EADG)', v:'Ansiedad 2 · Depresión 1', variant:'green', d:'Evalúa la presencia y gravedad de los síntomas de ansiedad y depresión (dos subescalas de 9 ítems cada una).', rangos:['Subescala ansiedad — 0–3: probabilidad baja / 4–9: probabilidad alta.','Subescala depresión — 0–1: probabilidad baja / 2–9: probabilidad alta.']} ] },
    'sueno': { name:'Sueño', cat:'cat-sueno', icon:'i-clock', fg:'light', score:'8/10', status:'green', statusLabel:'SIGUE ASÍ', escalas:[] },
    'participacion-social': { name:'Participación Social', cat:'cat-social', icon:'i-users', fg:'light', score:'6/10', status:'amber', statusLabel:'MEJORA', escalas:[] },
    'auditivo-ocular': { name:'Cuidado Ocular y Auditivo', cat:'cat-auditivo', icon:'i-ear', fg:'light', score:'10/10', status:'green', statusLabel:'SIGUE ASÍ', escalas:[] },
    'tabaco-alcohol': { name:'Tabaco y Alcohol', cat:'cat-tabaco', icon:'i-leaf', fg:'light', score:'10/10', status:'green', statusLabel:'SIGUE ASÍ',
      escalas:[ {t:'Test de Fagerström', v:'1 punto', variant:'green', d:'Evalúa la dependencia física y psicológica hacia la nicotina.', rangos:['0–2: dependencia baja a la nicotina.','3–4: dependencia moderada a la nicotina.','5–6: dependencia alta a la nicotina.']},
                {t:'Test de Richmond', v:'9 puntos', variant:'green', d:'Evalúa el grado de motivación para el abandono del tabaco (10 preguntas).', rangos:['0–3: motivación nula o baja.','4–5: motivación dudosa.','6–7: motivación moderada.','8–10: motivación alta.']},
                {t:'AUDIT-C', v:'2 puntos', variant:'green', d:'Cuestionario breve (OMS) para detectar problemas relacionados con el consumo de alcohol (3 preguntas).', rangos:['0–4: Consumo de bajo riesgo','5–12: Consumo de riesgo']} ] },
  };
  // cat-* (report rows) -> area slug
  const CAT_TO_SLUG = { 'cat-fisica':'actividad-fisica','cat-nutricion':'nutricion','cat-mente':'mente-activa','cat-bienestar':'bienestar-emocional','cat-sueno':'sueno','cat-social':'participacion-social','cat-auditivo':'auditivo-ocular','cat-tabaco':'tabaco-alcohol' };

  // Contenido compartido por todas las áreas (recomendaciones, enlaces, fichas, avisos, OMS)
  const REC = [
    { name:'Aeróbica', sub:'Movimiento rítmico y sostenido. Ej: andar, correr, nadar, ir en bici, patinar.',
      obj:['Mejorar la capacidad funcional','Reducir factores de riesgo cardiovascular','Controlar peso y composición corporal'],
      dur:['Entre 2,5 y 5 horas semanales (moderado)','O 75–150 min/semana a intensidad vigorosa','5 días/semana'],
      tipo:['Caminar y/o senderismo','Trotar, correr, ir en bici, bailar','Natación, aquagym, gimnasio','Pádel, tenis'] },
    { name:'Fuerza y resistencia', sub:'Ejercicios que refuerzan la musculatura. Ej: subir escaleras, levantar cargas, saltar.',
      obj:['Mejorar capacidad funcional para AVD','Mantener masa muscular y densidad ósea'],
      dur:['2 sesiones semanales como mínimo, no consecutivas','20–30 min por sesión'],
      tipo:['Subir y bajar escaleras','Levantarse y sentarse en la silla','Ejercicios con bandas elásticas','Cargar peso ligero'] },
    { name:'Flexibilidad', sub:'Aumentan la amplitud articular. Ej: yoga, taichí, pilates, aquagym.',
      obj:['Mejorar la amplitud articular','Reducir rigidez y dolor'],
      dur:['2–3 veces por semana','10–20 min por sesión'],
      tipo:['Yoga','Taichí','Pilates','Estiramientos'] },
    { name:'Equilibrio y coordinación', sub:'Previenen caídas. Ej: apoyo en un pie, paso talón-punta, lanzar y coger pelotas.',
      obj:['Mejorar el equilibrio y coordinación','Evitar caídas'],
      dur:['10–15 minutos por sesión','2–3 veces a la semana'],
      tipo:['Paso talón-punta','Apoyo en un solo pie','Lanzar y coger pelotas','Saltar','Yoga, taichí'] },
  ];
  const ENLACES = ['Ejercicios de calentamiento','La importancia de la hidratación en la actividad física','Ejercicio físico para realizar en casa','Ejercicio en verano: precauciones','Ejercicio para realizar en el exterior'];
  const FICHAS = [['Aprende a crear hábitos saludables','Crea tu propio plan de actividad física'],['Comienza el fortalecimiento muscular','Ejercita tu musculatura con ejercicios moderados'],['Mejora tu coordinación y equilibrio','Potencia tu condición física mediante la fuerza y la coordinación'],['5 razones para lanzarse al agua','La natación como forma de actividad física aeróbica de intensidad'],['Ejercicios para realizar desde casa','Comienza a activarte y practica estos ejercicios en tu rutina diaria'],['Estiramientos','Movimientos para aumentar la flexibilidad y prevenir lesiones musculares']];
  const TENCUENTA = ['El riesgo de lesión se minimiza cuando la actividad física aumenta progresivamente: primero la duración, después la intensidad, finalmente la frecuencia.','Comunica a tu Orientador/a Personal cualquier factor de riesgo, síntoma o enfermedad no informada previamente.','Haz siempre ejercicios de calentamiento y estiramientos para reducir el riesgo de lesiones.','Si durante el ejercicio aparece dolor articular o muscular, disnea intensa, mareo, cefalea, dolor torácico o calambres, reduce el ritmo o para y consulta con tu profesional de salud.'];
  const OMS_BENEFITS = ['Reducción del riesgo de mortalidad por múltiples causas.','Prevención y control de enfermedades cardiovasculares, diabetes, síndrome metabólico, sobrepeso y obesidad.','Mejora la salud ósea: reduce el riesgo de caídas y fracturas.','Mejora la salud mental y el sueño. Reduce ansiedad y depresión.','Disminuye los síntomas de estrés y aumenta la autoestima.','Mejora de la salud cognitiva.'];
  const OMS_REC = 'La OMS recomienda firmemente realizar actividad física para mantener una función cognitiva normal y reducir el riesgo de deterioro cognitivo.';

  const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  function escalaHTML(e){
    return `<div class="area-esc">
      <div class="area-esc-head"><span class="area-esc-t">${esc(e.t)}</span><span class="area-esc-val ${e.variant}">${esc(e.v)}</span></div>
      <p class="area-esc-d">${esc(e.d)}</p>
      <div class="area-esc-f"><span class="area-lbl">Fecha de valoración</span><span>21/09/2026</span></div>
      <div class="area-esc-r"><span class="area-lbl">Rangos e interpretación</span><ul>${e.rangos.map(r=>`<li>${esc(r)}</li>`).join('')}</ul></div>
      <p class="area-esc-note">El resultado no representa un diagnóstico médico ni pretende sustituir un servicio de atención médica.</p>
    </div>`;
  }
  function accHTML(){
    return REC.map(r=>`<details class="area-acc-item">
      <summary><span class="area-acc-tt"><span class="area-acc-name">${esc(r.name)}</span><span class="area-acc-sub">${esc(r.sub)}</span></span><svg class="area-acc-chev" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></summary>
      <div class="area-acc-body">
        <div class="area-acc-col"><span class="area-lbl">Objetivo</span><ul>${r.obj.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>
        <div class="area-acc-col"><span class="area-lbl">Duración / Frecuencia</span><ul>${r.dur.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>
        <div class="area-acc-col"><span class="area-lbl">Tipo de actividad</span><ul>${r.tipo.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>
      </div>
    </details>`).join('');
  }
  function infoHTML(){
    return `<div class="area-links">${ENLACES.map(e=>`<div class="area-link"><span>${esc(e)}</span><span class="area-link-cta">Acceder →</span></div>`).join('')}</div>
      <h3 class="area-h3">Fichas de trabajo</h3>
      <div class="area-fichas">${FICHAS.map(([t,d])=>`<div class="area-ficha"><span class="area-ficha-t">${esc(t)}</span><span class="area-ficha-d">${esc(d)}</span><span class="area-ficha-btn">Abrir ficha →</span></div>`).join('')}</div>`;
  }
  function checkList(items){ return `<ul class="area-checks">${items.map(i=>`<li><span class="area-check">✓</span><span>${esc(i)}</span></li>`).join('')}</ul>`; }

  function renderArea(slug){
    const a = AREAS[slug];
    const host = document.getElementById('area-content');
    const bc = document.getElementById('area-breadcrumb');
    if(!a || !host){ if(host) host.innerHTML = '<p class="area-empty">Área no encontrada.</p>'; return; }
    if(bc) bc.textContent = a.name;
    const escSection = a.escalas.length
      ? a.escalas.map(escalaHTML).join('')
      : '<p class="area-empty">Esta área no incluye escalas de valoración en este informe.</p>';
    host.innerHTML = `<article class="area-detail">
      <div class="area-hero ${a.cat} fg-${a.fg}">
        <div class="area-hero-main"><span class="area-ico"><svg width="26" height="26"><use href="#${a.icon}"/></svg></span><h1 class="area-hero-name">${esc(a.name)}</h1></div>
        <div class="area-hero-meta"><span class="area-hero-score">${esc(a.score)}</span><span class="area-pill ${a.status}">${esc(a.statusLabel)}</span></div>
      </div>
      <div class="area-body">
        <nav class="area-side" aria-label="Secciones"><div class="area-side-inner">
          <a href="javascript:void(0)" data-target="a-escalas" class="area-side-link is-active"><span>Resultado de las escalas</span></a>
          <a href="javascript:void(0)" data-target="a-rec" class="area-side-link"><span>Recomendaciones específicas</span></a>
          <a href="javascript:void(0)" data-target="a-info" class="area-side-link"><span>Información ampliada</span></a>
          <a href="javascript:void(0)" data-target="a-ten" class="area-side-link"><span>Ten en cuenta</span></a>
          <a href="javascript:void(0)" data-target="a-oms" class="area-side-link"><span>Recomendaciones de salud de la OMS</span></a>
        </div></nav>
        <div class="area-doc">
          <section id="a-escalas" class="area-sec"><span class="area-eyebrow">A · Valoración</span><h2 class="area-h2">Resultado de las escalas</h2>${escSection}</section>
          <section id="a-rec" class="area-sec"><span class="area-eyebrow">B · Pautas clave</span><h2 class="area-h2">Recomendaciones específicas</h2><div class="area-acc">${accHTML()}</div></section>
          <section id="a-info" class="area-sec"><span class="area-eyebrow">C · Enlaces y fichas</span><h2 class="area-h2">Información ampliada</h2>${infoHTML()}</section>
          <section id="a-ten" class="area-sec"><span class="area-eyebrow">D · Recuerda</span><h2 class="area-h2">Ten en cuenta</h2>${checkList(TENCUENTA)}</section>
          <section id="a-oms" class="area-sec area-sec--last"><span class="area-eyebrow">E · Por qué</span><h2 class="area-h2">Recomendaciones de salud de la OMS</h2><p class="area-p">Según la Organización Mundial de la Salud (OMS), los beneficios de realizar actividad física regular son múltiples:</p>${checkList(OMS_BENEFITS)}<div class="area-oms-box"><span class="area-lbl">Recomendación de la OMS</span><p>${esc(OMS_REC)}</p></div></section>
        </div>
      </div>
    </article>`;
    // side-nav scroll + active state
    const links = host.querySelectorAll('.area-side-link');
    links.forEach(l=>l.addEventListener('click', ()=>{
      const el = document.getElementById(l.dataset.target);
      if(el){ const hdr=document.querySelector('.app-header')?.offsetHeight||0; window.scrollTo({top: el.getBoundingClientRect().top + window.scrollY - hdr - 16, behavior:'smooth'}); }
      links.forEach(x=>x.classList.toggle('is-active', x===l));
    }));
  }

  // Inyecta el botón terciario "Saber más" en cada área de la sección Resultados (informes inicial y anual)
  function initSaberMas(){
    document.querySelectorAll('.view[data-view="informes"] .rep-habit').forEach(row=>{
      if(row.querySelector('.saber-mas')) return;
      const cat = [...row.classList].find(c=>c.startsWith('cat-'));
      const slug = CAT_TO_SLUG[cat];
      if(!slug) return;
      const inner = row.querySelector('.in') || row;
      const a = document.createElement('a');
      a.className = 'saber-mas';
      a.href = '#/informes/area/' + slug;
      a.innerHTML = 'Saber más <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
      inner.appendChild(a);
    });
  }

  // -------- Accordion (Mi evolución) --------
  document.addEventListener('click', (e) => {
    const summary = e.target.closest('.acc-summary');
    if (summary) {
      e.preventDefault();
      const item = summary.closest('.acc-item');
      item.classList.toggle('is-open');
    }
  });

  // -------- FAQ accordion --------
  document.addEventListener('click', (e) => {
    const summary = e.target.closest('.faq-summary');
    if (summary) {
      e.preventDefault();
      const item = summary.closest('.faq-item');
      item.classList.toggle('is-open');
    }
  });

  // -------- Pill toggle (visual only, within a single .pills group) --------
  document.addEventListener('click', (e) => {
    const pill = e.target.closest('.pill');
    if (pill) {
      const group = pill.closest('.pills');
      group.querySelectorAll('.pill').forEach(p => p.classList.remove('is-active'));
      pill.classList.add('is-active');
    }
  });

  // -------- Categories carousel (Contenidos) --------
  function initCategoriesCarousel() {
    const carousel = document.getElementById('categoriesCarousel');
    if (!carousel) return;
    const controls = document.querySelector('[data-view="contenidos"] .carousel-controls');
    if (!controls) return;
    const prevBtn = controls.querySelector('[data-dir="prev"]');
    const nextBtn = controls.querySelector('[data-dir="next"]');

    const updateButtons = () => {
      const max = carousel.scrollWidth - carousel.clientWidth;
      prevBtn.disabled = carousel.scrollLeft <= 2;
      nextBtn.disabled = carousel.scrollLeft >= max - 2;
    };

    const step = () => {
      // Scroll by ~one card width including gap
      const firstTile = carousel.querySelector('.tile');
      if (!firstTile) return carousel.clientWidth * 0.8;
      const styles = getComputedStyle(carousel.querySelector('.categories-track'));
      const gap = parseFloat(styles.columnGap || styles.gap || '16');
      return firstTile.getBoundingClientRect().width + gap;
    };

    prevBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: -step(), behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: step(), behavior: 'smooth' });
    });
    carousel.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons);
    updateButtons();
  }

  function initPlanNav() {
    const navs = Array.from(document.querySelectorAll('.plan-side'));
    if (!navs.length) return;
    const groups = navs.map(nav => {
      const links = Array.from(nav.querySelectorAll('.plan-side-link'));
      const sections = links.map(l => document.querySelector(l.getAttribute('href')));
      return { links, sections };
    });

    // Smooth-scroll on click; scroll-margin-top on .plan-section handles the sticky header offset
    document.addEventListener('click', (e) => {
      const a = e.target.closest('.plan-side-link');
      if (!a) return;
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // Scroll-spy: highlight the section currently below the sticky header
    const spy = () => {
      const headerH = document.querySelector('.app-header')?.offsetHeight || 0;
      const line = headerH + 120;
      groups.forEach(({ links, sections }) => {
        // Skip navs whose report is not currently visible (offsetParent null)
        if (!sections.some(s => s && s.offsetParent !== null)) return;
        let active = 0;
        sections.forEach((sec, i) => {
          if (sec && sec.offsetParent !== null && sec.getBoundingClientRect().top - line <= 0) active = i;
        });
        links.forEach((l, i) => l.classList.toggle('is-active', i === active));
      });
    };
    window.addEventListener('scroll', spy, { passive: true });
    requestAnimationFrame(spy);
  }

  // -------- Section side-nav for reports (smooth scroll + scroll-spy) --------
  function initRepNav() {
    const navs = Array.from(document.querySelectorAll('.rep-side'));
    if (!navs.length) return;

    document.addEventListener('click', (e) => {
      const a = e.target.closest('.rep-side-link');
      if (!a) return;
      const target = document.getElementById(a.dataset.target);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    const groups = navs.map(nav => {
      const links = Array.from(nav.querySelectorAll('.rep-side-link'));
      const sections = links.map(l => document.getElementById(l.dataset.target));
      return { links, sections };
    });
    const spy = () => {
      const headerH = document.querySelector('.app-header')?.offsetHeight || 0;
      const line = headerH + 140;
      groups.forEach(({ links, sections }) => {
        // only the visible report (its sections are laid out)
        if (!sections.some(s => s && s.offsetParent !== null)) return;
        let active = 0;
        sections.forEach((sec, i) => {
          if (sec && sec.offsetParent !== null && sec.getBoundingClientRect().top - line <= 0) active = i;
        });
        links.forEach((l, i) => l.classList.toggle('is-active', i === active));
      });
    };
    window.addEventListener('scroll', spy, { passive: true });
    window.addEventListener('resize', spy);
    requestAnimationFrame(spy);
  }

  // -------- Mobile drawer --------
  function initDrawer() {
    const drawer = document.getElementById('drawer');
    const toggle = document.getElementById('navToggle');
    if (!drawer || !toggle) return;
    const setOpen = (on) => {
      drawer.classList.toggle('is-open', on);
      drawer.setAttribute('aria-hidden', String(!on));
      toggle.setAttribute('aria-expanded', String(on));
      document.body.classList.toggle('drawer-open', on);
    };
    toggle.addEventListener('click', () => setOpen(!drawer.classList.contains('is-open')));
    drawer.querySelectorAll('[data-drawer-close]').forEach(el => {
      el.addEventListener('click', () => setOpen(false));
    });
    drawer.querySelectorAll('.drawer-link').forEach(el => {
      el.addEventListener('click', () => setOpen(false));
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  // -------- Report selector (4 informes) --------
  // 0 = Plan de Prevención (inicial) · 1 = Plan de Prevención Anual
  // 2 = Seguimiento 1er cuatrimestre · 3 = Seguimiento 2º cuatrimestre
  function initReportSelector() {
    const select = document.getElementById('reportSelect');
    const reports = Array.from(document.querySelectorAll('.rep'));
    if (!reports.length) return;
    function show(idx) {
      reports.forEach(r => { r.hidden = (r.dataset.report !== String(idx)); });
      if (select && select.value !== String(idx)) select.value = String(idx);
      window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    }
    // Estado inicial: Plan de Prevención por defecto; se puede fijar por URL (?report=0..3)
    const p = parseInt(new URLSearchParams(location.search).get('report'), 10);
    const def = (p >= 0 && p < reports.length) ? p : 0;
    show(def);
    if (select) select.addEventListener('change', () => show(parseInt(select.value, 10) || 0));
  }

  // -------- Anexo month tabs (Mes 1–4), scoped per report --------
  function initAnexoTabs() {
    document.addEventListener('click', (e) => {
      const tab = e.target.closest('.rep-anexo-tab');
      if (!tab) return;
      const wrap = tab.closest('[data-anexo]');
      if (!wrap) return;
      const m = tab.dataset.month;
      wrap.querySelectorAll('.rep-anexo-tab').forEach(t => t.classList.toggle('is-active', t === tab));
      wrap.querySelectorAll('.rep-anexo-month').forEach(p => {
        p.hidden = (p.dataset.month !== m);
      });
      // reflect selected month in the "Mes N" pill of this anexo sheet
      const pill = wrap.closest('.rep-sheet')?.querySelector('.rep-mespill');
      if (pill) pill.textContent = 'Mes ' + m;
    });
  }

  // -------- Accessibility: Settings Popover (supports multiple instances) --------
  function initA11yMenus() {
    const menus = document.querySelectorAll('.a11y-menu');
    if (!menus.length) return;

    const closeAll = () => {
      document.querySelectorAll('.a11y-menu').forEach(m => {
        const t = m.querySelector('.a11y-trigger');
        const p = m.querySelector('.a11y-popover');
        const s = m.querySelector('.a11y-scrim');
        if (t) t.setAttribute('aria-expanded', 'false');
        if (p) p.hidden = true;
        if (s) s.hidden = true;
      });
      document.body.classList.remove('a11y-open');
    };

    menus.forEach(menu => {
      const trigger = menu.querySelector('.a11y-trigger');
      const popover = menu.querySelector('.a11y-popover');
      const scrim = menu.querySelector('.a11y-scrim');
      const closeBtn = menu.querySelector('.a11y-popover-close');
      if (!trigger || !popover) return;

      const setOpen = (on) => {
        if (on) closeAll(); // ensure only one is open
        trigger.setAttribute('aria-expanded', String(on));
        popover.hidden = !on;
        if (scrim) scrim.hidden = !on;
        document.body.classList.toggle('a11y-open', on);
      };

      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        setOpen(trigger.getAttribute('aria-expanded') !== 'true');
      });
      if (closeBtn) closeBtn.addEventListener('click', () => setOpen(false));
      if (scrim) scrim.addEventListener('click', () => setOpen(false));

      // Close on outside click
      document.addEventListener('click', (e) => {
        if (popover.hidden) return;
        if (!menu.contains(e.target)) setOpen(false);
      });
    });

    // Close all on Esc
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeAll();
    });
  }

  // -------- Accessibility: Text Size Switcher (synced across instances) --------
  function initTextSizeSwitchers() {
    const switchers = document.querySelectorAll('.a11y-textsize');
    if (!switchers.length) return;

    const apply = (size) => {
      // Sync UI state on every switcher instance
      document.querySelectorAll('.a11y-textsize').forEach(sw => {
        sw.querySelectorAll('.a11y-opt').forEach(b => {
          const on = b.dataset.size === size;
          b.classList.toggle('is-active', on);
          b.setAttribute('aria-checked', String(on));
        });
      });
      if (size === 'normal') document.body.removeAttribute('data-textsize');
      else document.body.setAttribute('data-textsize', size);
    };

    switchers.forEach(switcher => {
      switcher.addEventListener('click', (e) => {
        const btn = e.target.closest('.a11y-opt');
        if (!btn) return;
        apply(btn.dataset.size);
      });
    });
  }

  // -------- Accessibility: High Contrast Toggle (synced across instances) --------
  function initContrastToggles() {
    const toggles = document.querySelectorAll('.a11y-toggle.contrast');
    if (!toggles.length) return;
    toggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        const on = toggle.getAttribute('aria-checked') !== 'true';
        document.querySelectorAll('.a11y-toggle.contrast').forEach(t => {
          t.setAttribute('aria-checked', String(on));
        });
        document.body.classList.toggle('high-contrast', on);
      });
    });
  }

  // -------- "Ver Actividades" toggle (informe ↔ anexo a pantalla completa) --------
  function initActivitiesToggle() {
    const btn = document.getElementById('toggleActivities');
    const view = document.querySelector('.view[data-view="informes"]');
    if (!btn || !view) return;
    const label = btn.querySelector('.ta-label');
    const syncLabel = () => { if (label) label.textContent = view.classList.contains('show-activities') ? 'Ver informe' : 'Ver Actividades'; };
    syncLabel(); // asegura coherencia al cargar (p. ej. restauración bfcache)
    window.addEventListener('pageshow', syncLabel);
    btn.addEventListener('click', () => {
      view.classList.toggle('show-activities');
      syncLabel();
      window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    });
    // Al cambiar de informe, volver a la vista de informe (no de actividades)
    const select = document.getElementById('reportSelect');
    if (select) select.addEventListener('change', () => {
      view.classList.remove('show-activities');
      if (label) label.textContent = 'Ver Actividades';
    });
  }

  // -------- Anexo móvil (Opción A): selector de día + tarjetas por área --------
  // Construye la vista móvil a partir de la rejilla semanal de cada mes.
  function initAnexoResponsive() {
    const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const CORTO = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
    const mk = (tag, cls, txt) => { const n = document.createElement(tag); if (cls) n.className = cls; if (txt != null) n.textContent = txt; return n; };

    document.querySelectorAll('.rep-anexo-month').forEach(month => {
      const grid = month.querySelector('.anx-grid');
      if (!grid || month.querySelector('.anx-mA')) return;
      const areas = Array.prototype.map.call(grid.querySelectorAll('.anx-area'), a => ({
        cat: a.getAttribute('data-cat'),
        name: a.querySelector('.anx-name').textContent,
        status: a.querySelector('.anx-status').textContent,
        days: Array.prototype.map.call(a.querySelectorAll('.anx-db'), d => d.textContent)
      }));
      if (!areas.length) return;

      const mA = mk('div', 'anx-mA');
      const daysBar = mk('div', 'anx-mA-days');
      const dateLine = mk('div', 'anx-mA-date');
      const cards = mk('div', 'anx-mA-cards');
      let sel = 0;

      const render = () => {
        dateLine.textContent = DIAS[sel];
        cards.textContent = '';
        areas.forEach(a => {
          const c = mk('div', 'anx-card cat-' + a.cat);
          const top = mk('div', 'top');
          top.appendChild(mk('span', 'nm', a.name));
          top.appendChild(mk('span', 'chip', a.status));
          c.appendChild(top);
          c.appendChild(mk('p', 'txt', a.days[sel] || ''));
          const done = mk('div', 'anx-done');
          done.appendChild(mk('i'));
          done.appendChild(mk('span', null, 'Marcar como hecho'));
          done.addEventListener('click', () => {
            const on = done.classList.toggle('on');
            done.querySelector('span').textContent = on ? 'Hecho' : 'Marcar como hecho';
          });
          c.appendChild(done);
          cards.appendChild(c);
        });
      };

      CORTO.forEach((lbl, i) => {
        const b = mk('button', null, lbl);
        b.type = 'button';
        b.setAttribute('aria-pressed', i === sel ? 'true' : 'false');
        b.setAttribute('aria-label', DIAS[i]);
        b.addEventListener('click', () => {
          sel = i;
          Array.prototype.forEach.call(daysBar.children, (n, j) => n.setAttribute('aria-pressed', j === sel ? 'true' : 'false'));
          render();
        });
        daysBar.appendChild(b);
      });

      mA.appendChild(daysBar);
      mA.appendChild(dateLine);
      mA.appendChild(cards);
      month.appendChild(mA);
      render();
    });
  }

  // -------- Sticky offsets: mide alturas reales de tab-bar y toolbar --------
  // Mide SOLO la altura de la toolbar (varía al apilarse en móvil o al cambiar el
  // tamaño de texto). El header y el menú de opciones tienen altura fija en CSS.
  function initStickyOffsets() {
    const root = document.documentElement;
    const toolbar = document.querySelector('.view[data-view="informes"] .report-toolbar');
    if (!toolbar) return;
    const update = () => {
      if (toolbar.offsetHeight > 0) root.style.setProperty('--toolbar-h', toolbar.offsetHeight + 'px');
    };
    if ('ResizeObserver' in window) {
      new ResizeObserver(() => requestAnimationFrame(update)).observe(toolbar);
    }
    update();
    window.addEventListener('resize', update, { passive: true });
    window.addEventListener('load', update);
    setTimeout(update, 120);
  }

  // -------- Ocultar header al hacer scroll hacia abajo (móvil/tablet) --------
  function initHideHeaderOnScroll() {
    let lastY = window.scrollY || 0;
    let ticking = false;
    const TH = 6;
    function update() {
      const y = window.scrollY || 0;
      const diff = y - lastY;
      if (Math.abs(diff) > TH) {
        if (y > 90 && diff > 0) document.body.classList.add('hdr-hidden');
        else if (diff < 0 || y <= 90) document.body.classList.remove('hdr-hidden');
        lastY = y;
      }
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
  }

  // -------- Init --------
  document.addEventListener('DOMContentLoaded', () => {
    renderContent();
    renderEvolucion();
    initDrawer();
    initReportSelector();
    initAnexoTabs();
    initRepNav();
    initActivitiesToggle();
    initAnexoResponsive();
    initStickyOffsets();
    initCategoriesCarousel();
    initPlanNav();
    initA11yMenus();
    initTextSizeSwitchers();
    initContrastToggles();
    initHideHeaderOnScroll();
    initSaberMas();
    route();
  });
})();
