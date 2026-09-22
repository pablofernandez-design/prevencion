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

  // Bibliografía (común a todas las áreas, según Figma "Saber más")
  const BIBLIO = 'Organización Mundial de la Salud. Reducción del riesgo de deterioro cognitivo y demencia: directrices de la OMS. Ginebra, Suiza: Organización Mundial de la Salud; 2019. Integrated care for older people (ICOPE): Guidance for person-centred assessment and pathways in primary care. Geneva: World Health Organization; 2019 (WHO/FWC/ALC/19.1). Licence: CC BY-NC-SA 3.0 IGO. Livingston G, Huntley J, Liu KY, Costafreda SG, Selbæk G, Alladi S, Ames D, Banerjee S, Burns A, Brayne C, Fox NC, Ferri CP, Gitlin LN, Howard R, Kales HC, Kivimäki M, Larson EB, Nakasujja N, Rockwood K, Samus Q, Shirai K, Singh-Manoux A, Schneider LS, Walsh S, Yao Y, Sommerlad A, Mukadam N. Dementia prevention, intervention, and care: 2024 report of the Lancet standing Commission. Lancet. 2024 Jul 30:S0140-6736(24)01296-0. doi: 10.1016/S0140-6736(24)01296-0. Epub ahead of print. PMID: 39096926. Livingston, G., Huntley, J., Sommerlad, A., Ames, D., Ballard, C., Banerjee, S., ... & Mukadam, N. (2020). Dementia prevention, intervention, and care: 2020 report of the Lancet Commission. The Lancet, 396(10248), 413-446. Yassine, H. N., Samieri, C., Livingston, G., Glass, K., Wagner, M., Tangney, C., ... & Schneider, L. S. (2022). Nutrition state of science and dementia prevention: recommendations of the Nutrition for Dementia Prevention Working Group. The Lancet Healthy Longevity, 3(7), e501-e512. Informe mundial sobre la visión [World report on vision]. Ginebra: Organización Mundial de la Salud; 2020. Licencia: CC BY-NC-SA 3.0 IGO Directrices de la OMS sobre actividad física y hábitos sedentarios: de un vistazo [WHO guidelines on physical activity and sedentary behaviour: at a glance]. Ginebra: Organización Mundial de la Salud; 2020. Licencia: CC BY-NC-SA 3.0 IGO. Ministerio de Sanidad. Alimentación saludable. Disponible en: https://estilosdevidasaludable.sanidad.gob.es/alimentacionSaludable Organización Mundial de la Salud. Tabaco: beneficios para la salud de dejar de fumar. 25 de febrero de 2020.Disponible en : https://www.who.int/es/news-room/questions-and-answers/item/tobacco-health-benefits-of-smoking-cessation Ministerio de Sanidad. Estilos de vida saludables. Prevención del tabaquismo. Disponible en: https://estilosdevidasaludable.sanidad.gob.es/tabaco/home.htm Alcohol. Organización Mundial de la salud. 9 de mayo de 2022. Disponible en: https://www.who.int/es/news-room/fact-sheets/detail/alcohol Estilos de vida saludables. Ministerio de sanidad. Disponible en: https://estilosdevidasaludable.sanidad.gob.es/consumo/falsosMitos/estres/home.htm Global status report on alcohol and health 2018. Geneva: World Health Organization; 2018. Licence: CC BY-NC-SA 3.0 IGO. Manual básico de cuidado del oído y la audición [Basic ear and hearing care resource]. Ginebra: Organización Mundial de la Salud; 2020. Licencia: CC BY-NC-SA 3.0';

  // Nota para áreas cuya valoración es cualitativa (sin escala numérica)
  const NOTE_CUALITATIVA = 'La valoración de esta área se basa en información cualitativa, por lo que los resultados no se expresan mediante la puntuación numérica de una escala.';

  // Pautas clave — contenido específico por área (Figma "Saber más")
  const PAUTAS = {
    'actividad-fisica': { type:'cols',
      intro:'Los tipos más importantes de actividad física se pueden clasificar en 4 grandes grupos según la capacidad trabajada:',
      cards:REC,
      closing:'Los cambios saludables comienzan con sencillos pasos. Nunca ha habido mejor momento para cuidar tu salud. ¡Hagámoslo!' },
    'nutricion': { type:'numbered',
      intro:'En base a las indicaciones de la OMS, se facilitan 12 recomendaciones y consejos nutricionales prácticos para mantener una alimentación saludable:',
      items:['Verduras y hortalizas','Fruta','Legumbres','Frutos secos','Cereales integrales','Aceite de oliva virgen','Pescado y huevos','Carne roja procesada','Sal','Azúcar','Bebidas','Lácteos'] },
    'mente-activa': { type:'titled',
      intro:'Te recomendamos realizar de forma habitual actividades que permitan mantener la mente activa y entrenar diferentes habilidades cognitivas:',
      closing:'Se aconseja alternar las distintas propuestas y mantener una práctica regular, de manera que la actividad sea variada y pueda incorporarse con facilidad a la rutina diaria.',
      cards:[
        {t:'Lectura',b:'Leer libros, prensa, revistas u otros textos y comentar o resumir después su contenido.'},
        {t:'Escritura',b:'Redactar pequeños textos, relatos, cartas, recuerdos o experiencias personales.'},
        {t:'Pasatiempos',b:'Realizar crucigramas, sudokus, sopas de letras, puzles, acertijos y otros juegos de lógica.'},
        {t:'Juegos de mesa',b:'Jugar a cartas, dominó, ajedrez, damas u otros juegos que impliquen seguir reglas y tomar decisiones.'},
        {t:'Cálculo',b:'Realizar operaciones sencillas, series numéricas o pequeños problemas relacionados con situaciones cotidianas.'},
        {t:'Juegos de palabras',b:'Realizar actividades de vocabulario, formar palabras, buscar sinónimos o encontrar palabras relacionadas.'},
        {t:'Aprendizaje',b:'Adquirir nuevos conocimientos o aprender habilidades nuevas, como un idioma o una actividad diferente.'},
        {t:'Juegos interactivos',b:'Utilizar de forma habitual las diferentes propuestas disponibles en el Portal del Cliente, variando los ejercicios y su nivel de dificultad.'},
        {t:'Fichas de estimulación',b:'Completar los materiales disponibles en la plataforma de contenidos, siguiendo las indicaciones y adaptando la dificultad cuando sea necesario.'} ] },
    'bienestar-emocional': { type:'titled',
      intro:'A continuación, se recogen una serie de recomendaciones orientadas a promover y mantener el bienestar emocional:',
      cards:[
        {t:'Conexiones sociales',b:'Mantener relaciones sociales y establecer conexiones con otras personas es fundamental para el bienestar emocional.'},
        {t:'Hábitos saludables',b:'Hacer ejercicio físico de manera regular, llevar una dieta equilibrada y saludable, evitar el consumo de alcohol y tabaco, serían ejemplos de hábitos saludables que pueden mejorar la salud emocional.'},
        {t:'Motivación',b:'Identificar actividades, intereses y objetivos que resulten significativos puede favorecer la motivación y la satisfacción personal. Es recomendable reservar tiempo para aquellas actividades que proporcionen interés, disfrute o sensación de realización.'},
        {t:'Objetivos alcanzables',b:'Plantear objetivos alcanzables y adaptados a las circunstancias personales ayuda a evitar la frustración y el desánimo.'},
        {t:'Emociones positivas',b:'Prestar atención a las experiencias agradables y reconocer los propios logros puede contribuir al bienestar emocional. Se recomienda valorar los pequeños avances, disfrutar de los momentos positivos y dedicar tiempo a actividades gratificantes.'},
        {t:'Manejo del estrés',b:'Desarrollar estrategias para afrontar el estrés y gestionar las emociones puede facilitar la adaptación a las demandas de la vida cotidiana. Técnicas como la respiración, la relajación, la meditación o el mindfulness pueden ser recursos útiles.'},
        {t:'Lista de actividades para una mente sana', list:['Yoga.','Taichí.','Pilates.','Meditación.','Musicoterapia o terapia artística.','Contacto social: quedar para comer con un amigo/a de forma regular; visitar a familiares, participar en eventos, acudir a un club social, etc.'] } ] },
    'sueno': { type:'titled',
      intro:'A continuación, te recomendamos las siguientes pautas de higiene del sueño:',
      cards:[
        {t:'Horario',b:'Establece un horario regular tanto para irte a dormir como para despertarte.'},
        {t:'Desconexión digital',b:'Evita realizar otras actividades en la cama como ver la TV, escuchar la radio, usar dispositivos móviles.'},
        {t:'Sustancias excitantes',b:'Evita la ingesta de bebidas estimulantes que contengan cafeína, teína o cacao y evita el tabaco, el alcohol y las cenas copiosas.'},
        {t:'Actividad física',b:'Haz ejercicio regularmente, pero no 3 horas antes de dormir.'},
        {t:'Indumentaria',b:'Usa ropa de cama cómoda y acogedora.'},
        {t:'Entorno',b:'Duerme en ambientes tranquilos y no ruidosos, con adecuada temperatura, ventilación y oscuridad.'} ] },
    'participacion-social': { type:'titled',
      intro:'A continuación, se proponen una serie de recomendaciones orientadas a establecer una rutina significativa que favorezca la conexión con otras personas y la realización de actividades gratificantes:',
      cards:[
        {t:'Contacto social',b:'Mantener contacto regular con familiares, amistades y otras personas del entorno, mediante encuentros presenciales, llamadas u otras formas de comunicación.'},
        {t:'Participación social y voluntariado',b:'Apuntarte a algún club, voluntariado o formar parte de alguna asociación ligada a tus intereses.'},
        {t:'Rutas culturales',b:'Puedes encontrar una variedad de opciones turísticas en la página web de tu comunidad.'},
        {t:'Visitar espacios al aire libre',b:'Hay numerosas posibilidades para disfrutar de parques, plazas, jardines, rutas verdes y realizar actividades al aire libre.'} ] },
    'tabaco-alcohol': { type:'grouped',
      intro:'A continuación, se recogen algunas recomendaciones relacionadas con el consumo de alcohol y tabaco, orientadas a favorecer hábitos saludables:',
      groups:[
        {t:'Tabaco', blocks:[
          {h:'Evitar el consumo de tabaco', b:'Se recomienda no fumar ni utilizar productos de tabaco, evitando también mantener este hábito en espacios cotidianos.'},
          {h:'Vivir en un ambiente libre de humo', b:'No existe un nivel seguro de exposición al humo del tabaco. Se recomienda evitar los espacios donde se fuma y procurar que no se fume en casa ni en el coche, protegiendo así tanto la propia salud como la de las personas del entorno.'} ]},
        {t:'Alcohol', blocks:[
          {h:'Evitar el consumo de alcohol', b:'Se recomienda evitar el consumo de bebidas alcohólicas como parte de un estilo de vida saludable.'} ]} ] },
    'auditivo-ocular': { type:'grouped',
      groups:[
        {intro:'A continuación, te recomendamos una serie de pautas para cuidar tu capacidad auditiva:', t:'Capacidad auditiva', blocks:[
          {h:'Higiene auditiva', list:[
            'Mantener una correcta higiene auditiva, es decir, un cuidado óptimo de tus oídos, evitando que se puedan dañar por prácticas perjudiciales que mantenemos en el tiempo.',
            'Lava y seca tus oídos con una toalla. Deja algo de cera para protegerte.',
            'Evita introducir objetos o bastoncillos de algodón para evitar tapones o lesiones.',
            'Evita los sonidos fuertes o ruidos de alta intensidad.',
            'Utiliza protección auditiva en entornos ruidosos.',
            'No escuches música a alto volumen a través de auriculares. Mantén el volumen por debajo del 60% del máximo y limita el tiempo de exposición.',
            'Usa tapones cuando practiques deportes acuáticos y evita nadar en agua sucia.',
            'Acude a un profesional de la salud si el oído supura líquido o si tienes un tapón o cuerpo extraño.',
            'No uses aceite, hierbas o remedios caseros, solo medicamentos prescritos por un profesional de salud.'] },
          {h:'Seguimiento y valoración periódica', b:'Un seguimiento y valoración periódica para la prevención, la identificación y el tratamiento oportuno de la pérdida de audición.'},
          {h:'Conciencia e información', b:'Tomar conciencia de la importancia de la pérdida de audición e informarse acerca de los beneficios de la rehabilitación auditiva (ver enlaces de ampliación).'},
          {h:'Medicación', b:'Revisar la medicación con tu profesional de la salud de referencia para detectar posibles ototoxicidades.'} ]},
        {intro:'A continuación, te proponemos una serie de pautas para cuidar tu capacidad ocular:', t:'Capacidad ocular', blocks:[
          {h:'Higiene ocular', b:'Mantener una correcta higiene ocular ayuda a mejorar el bienestar visual:', list:[
            'Mantén una buena hidratación ocular con lágrimas artificiales.',
            'Mantén un ambiente ventilado y una temperatura confortable.',
            'Mantén una buena iluminación, trabaja con luz natural. De utilizar luz artificial, evita la luz directamente a los ojos y las sombras, que producen fatiga ocular.',
            'Evitar fumar ya que es un factor de riesgo para desarrollar degeneración macular.',
            'Realiza una alimentación rica en vitamina A (lácteos, carne, pescado, huevos, legumbres, verduras como zanahorias).',
            'Evita la visualización prolongada de medios electrónicos.',
            'Descansar la vista cada 20 minutos.',
            'Realiza actividades al aire libre para reducir el estrés visual.',
            'Lávate las manos frecuentemente y evita frotar los ojos y usar cosméticos.',
            'Protege tus ojos de la luz solar usando gafas de sol con filtro UV y sombreros.',
            'Acude a revisiones periódicas con profesionales de la salud.'] },
          {h:'Seguimiento y valoración periódica', b:'Un seguimiento y valoración periódica para la prevención, la identificación y el tratamiento oportuno de la pérdida de visión.'},
          {h:'Conciencia e información', b:'Tomar conciencia de la importancia de la pérdida de visión y fomentar la prevención de las afecciones oculares y la deficiencia visual, a través de una atención oftalmológica integrada y centrada en la persona.'} ]} ] },
  };
  // Color sólido de cada área (fondo del panel del header)
  const AREA_COLOR = { 'actividad-fisica':'#FEC646','nutricion':'#9EC938','mente-activa':'#16AA9C','bienestar-emocional':'#C763B0','sueno':'#5E56B0','participacion-social':'#DF353F','auditivo-ocular':'#EE5A20','tabaco-alcohol':'#4BA8DF' };

  // Tintes exactos de cada área (fondo del panel derecho del header + fondo del icono)
  const AREA_TINT = { 'actividad-fisica':'#FCF6E3','nutricion':'#F2F7E5','mente-activa':'#E4F3F1','bienestar-emocional':'#F7ECF4','sueno':'#ECEBF5','participacion-social':'#FBEDEE','auditivo-ocular':'#FDF0E9','tabaco-alcohol':'#EAF4FB' };
  // Iconos exactos exportados de Figma (64x64, incluyen su fondo tinte)
  const AREA_ICONS = {
    'actividad-fisica':'<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="64" height="64" rx="24" fill="#FCF6E3"/><path d="M28 45C27.8026 44.999 27.6099 44.9396 27.4461 44.8293C27.2824 44.719 27.155 44.5626 27.08 44.38L22.33 33H18V31H23C23.1974 31.001 23.3901 31.0604 23.5539 31.1707C23.7176 31.2811 23.845 31.4374 23.92 31.62L28 41.28L36.06 19.65C36.1315 19.4586 36.2599 19.2937 36.428 19.1775C36.5961 19.0613 36.7957 18.9993 37 19C37.2062 19.0036 37.4063 19.0709 37.5728 19.1926C37.7393 19.3144 37.864 19.4846 37.93 19.68L41.72 31H46V33H41C40.7904 33 40.5858 32.9352 40.4154 32.8132C40.2449 32.6911 40.1171 32.5186 40.05 32.32L37 23L28.94 44.35C28.8685 44.5414 28.7401 44.7063 28.572 44.8225C28.4039 44.9387 28.2043 45.0007 28 45Z" fill="#333333"/></svg>',
    'nutricion':'<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="64" height="64" rx="24" fill="#F2F7E5"/><path d="M27 18H25V28H27V18Z" fill="#333333"/><path d="M30 27C30 28.0609 29.5786 29.0783 28.8284 29.8284C28.0783 30.5786 27.0609 31 26 31C24.9391 31 23.9217 30.5786 23.1716 29.8284C22.4214 29.0783 22 28.0609 22 27V18H20V27C20.0014 28.4169 20.5042 29.7875 21.4194 30.8692C22.3345 31.9509 23.6029 32.6739 25 32.91V46H27V32.91C28.3971 32.6739 29.6655 31.9509 30.5806 30.8692C31.4958 29.7875 31.9986 28.4169 32 27V18H30V27Z" fill="#333333"/><path d="M38 18H37V46H39V36H42C42.5304 36 43.0391 35.7892 43.4142 35.4142C43.7893 35.0391 44 34.5304 44 34V24C44.0309 23.2037 43.8969 22.4097 43.6063 21.6678C43.3157 20.9258 42.8749 20.252 42.3114 19.6885C41.748 19.1251 41.0741 18.6842 40.3322 18.3937C39.5902 18.1031 38.7962 17.969 38 18ZM42 34H39V20.09C41.88 20.65 42 23.63 42 24V34Z" fill="#333333"/></svg>',
    'mente-activa':'<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="64" height="64" rx="24" fill="#E4F3F1"/><path d="M46 29C46 27.5555 45.7155 26.1251 45.1627 24.7905C44.6099 23.4559 43.7996 22.2433 42.7782 21.2218C41.7567 20.2004 40.5441 19.3901 39.2095 18.8373C37.8749 18.2845 36.4445 18 35 18H27C24.6131 18 22.3239 18.9482 20.636 20.636C18.9482 22.3239 18 24.6131 18 27V30C18 31.3261 18.5268 32.5979 19.4645 33.5355C20.4021 34.4732 21.6739 35 23 35H24.1C24.3305 36.1294 24.9442 37.1444 25.8371 37.8733C26.73 38.6022 27.8473 39.0002 29 39H30.38L34.38 46L36.11 45L32.11 38.11C31.9491 37.7857 31.7032 37.5112 31.3985 37.3157C31.0938 37.1203 30.7418 37.0111 30.38 37H29C28.2044 37 27.4413 36.6839 26.8787 36.1213C26.3161 35.5587 26 34.7956 26 34C26 33.2044 26.3161 32.4413 26.8787 31.8787C27.4413 31.3161 28.2044 31 29 31H30V29H29C27.8473 28.9998 26.73 29.3978 25.8371 30.1267C24.9442 30.8556 24.3305 31.8706 24.1 33H23C22.2044 33 21.4413 32.6839 20.8787 32.1213C20.3161 31.5587 20 30.7956 20 30V28H22C22.7956 28 23.5587 27.6839 24.1213 27.1213C24.6839 26.5587 25 25.7956 25 25V24H23V25C23 25.2652 22.8946 25.5196 22.7071 25.7071C22.5196 25.8946 22.2652 26 22 26H20.08C20.3203 24.3354 21.1518 22.813 22.4225 21.7112C23.6932 20.6094 25.3182 20.002 27 20H33V22C33 22.2652 32.8946 22.5196 32.7071 22.7071C32.5196 22.8946 32.2652 23 32 23H30V25H32C32.7956 25 33.5587 24.6839 34.1213 24.1213C34.6839 23.5587 35 22.7956 35 22V20C36.6741 20.0023 38.3143 20.4714 39.7364 21.3547C41.1584 22.238 42.306 23.5004 43.05 25H42C41.2044 25 40.4413 25.3161 39.8787 25.8787C39.3161 26.4413 39 27.2044 39 28V29H41V28C41 27.7348 41.1054 27.4804 41.2929 27.2929C41.4804 27.1054 41.7348 27 42 27H43.77C43.9233 27.6556 44.0004 28.3267 44 29V30C44 31.3261 43.4732 32.5979 42.5355 33.5355C41.5979 34.4732 40.3261 35 39 35H36V37H39C40.038 36.9986 41.0628 36.7663 42 36.32V37C42 37.7956 41.6839 38.5587 41.1213 39.1213C40.5587 39.6839 39.7956 40 39 40H38V42H39C40.3261 42 41.5979 41.4732 42.5355 40.5355C43.4732 39.5979 44 38.3261 44 37V34.89C45.2798 33.5838 45.9977 31.8287 46 30V29Z" fill="#333333"/></svg>',
    'bienestar-emocional':'<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="64" height="64" rx="24" fill="#F7ECF4"/><path d="M32 18C29.2311 18 26.5243 18.8211 24.222 20.3594C21.9197 21.8978 20.1253 24.0843 19.0657 26.6424C18.0061 29.2006 17.7288 32.0155 18.269 34.7313C18.8092 37.447 20.1426 39.9416 22.1005 41.8995C24.0584 43.8574 26.553 45.1908 29.2687 45.731C31.9845 46.2712 34.7994 45.9939 37.3576 44.9343C39.9157 43.8747 42.1022 42.0803 43.6406 39.778C45.1789 37.4757 46 34.7689 46 32C46 28.287 44.525 24.726 41.8995 22.1005C39.274 19.475 35.713 18 32 18ZM32 44C29.6266 44 27.3066 43.2962 25.3332 41.9776C23.3598 40.6591 21.8217 38.7849 20.9135 36.5922C20.0052 34.3995 19.7676 31.9867 20.2306 29.6589C20.6936 27.3311 21.8365 25.1929 23.5147 23.5147C25.193 21.8365 27.3312 20.6936 29.6589 20.2306C31.9867 19.7676 34.3995 20.0052 36.5922 20.9134C38.7849 21.8217 40.6591 23.3598 41.9776 25.3332C43.2962 27.3065 44 29.6266 44 32C44 35.1826 42.7357 38.2348 40.4853 40.4853C38.2348 42.7357 35.1826 44 32 44Z" fill="#333333"/><path d="M27.5 27C27.0055 27 26.5222 27.1467 26.1111 27.4214C25.7 27.6961 25.3795 28.0866 25.1903 28.5434C25.0011 29.0002 24.9516 29.5029 25.048 29.9878C25.1445 30.4728 25.3826 30.9182 25.7322 31.2678C26.0819 31.6175 26.5273 31.8556 27.0123 31.952C27.4972 32.0485 27.9999 31.999 28.4567 31.8098C28.9135 31.6206 29.304 31.3001 29.5787 30.889C29.8534 30.4779 30 29.9945 30 29.5C30.0027 29.171 29.9398 28.8447 29.8151 28.5402C29.6904 28.2357 29.5064 27.9591 29.2737 27.7264C29.041 27.4937 28.7644 27.3096 28.4599 27.185C28.1553 27.0603 27.829 26.9974 27.5 27Z" fill="#333333"/><path d="M36.5 27C36.0055 27 35.5222 27.1467 35.1111 27.4214C34.7 27.6961 34.3795 28.0866 34.1903 28.5434C34.0011 29.0002 33.9516 29.5029 34.048 29.9878C34.1445 30.4728 34.3826 30.9182 34.7322 31.2678C35.0819 31.6175 35.5273 31.8556 36.0123 31.952C36.4972 32.0485 36.9999 31.999 37.4567 31.8098C37.9135 31.6206 38.304 31.3001 38.5787 30.889C38.8534 30.4779 39 29.9945 39 29.5C39.0027 29.171 38.9398 28.8447 38.8151 28.5402C38.6904 28.2357 38.5064 27.9591 38.2737 27.7264C38.041 27.4937 37.7644 27.3096 37.4599 27.185C37.1553 27.0603 36.829 26.9974 36.5 27Z" fill="#333333"/><path d="M32.0004 40C33.3808 39.9978 34.737 39.6383 35.9374 38.9567C37.1377 38.275 38.1412 37.2944 38.8504 36.1101L37.1404 35.1101C36.6067 35.9963 35.853 36.7295 34.9524 37.2385C34.0518 37.7474 33.0349 38.0149 32.0004 38.0149C30.9659 38.0149 29.949 37.7474 29.0484 37.2385C28.1478 36.7295 27.394 35.9963 26.8604 35.1101L25.1504 36.1101C25.8596 37.2944 26.8631 38.275 28.0634 38.9567C29.2637 39.6383 30.62 39.9978 32.0004 40Z" fill="#333333"/></svg>',
    'sueno':'<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="64" height="64" rx="24" fill="#ECEBF5"/><path d="M41 26H33C32.4698 26.0006 31.9614 26.2115 31.5865 26.5865C31.2115 26.9614 31.0006 27.4698 31 28V34H20V24H18V40H20V36H44V40H46V31C45.9984 29.6744 45.4712 28.4035 44.5338 27.4662C43.5965 26.5288 42.3256 26.0016 41 26ZM44 34H33V28H41C41.7954 28.0009 42.5579 28.3172 43.1204 28.8796C43.6828 29.4421 43.9991 30.2046 44 31V34Z" fill="#333333"/><path d="M25.5 27C25.7967 27 26.0867 27.088 26.3334 27.2528C26.58 27.4176 26.7723 27.6519 26.8858 27.926C26.9994 28.2001 27.0291 28.5017 26.9712 28.7926C26.9133 29.0836 26.7704 29.3509 26.5607 29.5607C26.3509 29.7704 26.0836 29.9133 25.7926 29.9712C25.5017 30.0291 25.2001 29.9994 24.926 29.8858C24.6519 29.7723 24.4176 29.58 24.2528 29.3334C24.088 29.0867 24 28.7967 24 28.5C24.0005 28.1023 24.1586 27.721 24.4398 27.4398C24.721 27.1586 25.1023 27.0004 25.5 27ZM25.5 25C24.8078 25 24.1311 25.2053 23.5555 25.5899C22.9799 25.9744 22.5313 26.5211 22.2664 27.1606C22.0015 27.8001 21.9322 28.5039 22.0673 29.1828C22.2023 29.8617 22.5356 30.4854 23.0251 30.9749C23.5146 31.4644 24.1383 31.7977 24.8172 31.9327C25.4961 32.0678 26.1999 31.9985 26.8394 31.7336C27.4789 31.4687 28.0256 31.0201 28.4101 30.4445C28.7947 29.8689 29 29.1922 29 28.5C29 27.5717 28.6313 26.6815 27.9749 26.0251C27.3185 25.3687 26.4283 25 25.5 25Z" fill="#333333"/></svg>',
    'participacion-social':'<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="64" height="64" rx="24" fill="#FBEDEE"/><path d="M42 30H40V32H42C42.7954 32.0009 43.5579 32.3172 44.1204 32.8796C44.6828 33.4421 44.9991 34.2046 45 35V39H47V35C46.9985 33.6744 46.4712 32.4035 45.5338 31.4662C44.5965 30.5288 43.3256 30.0015 42 30Z" fill="#333333"/><path d="M40 20C40.5933 20 41.1734 20.1759 41.6667 20.5056C42.1601 20.8352 42.5446 21.3038 42.7716 21.8519C42.9987 22.4001 43.0581 23.0033 42.9424 23.5853C42.8266 24.1672 42.5409 24.7018 42.1213 25.1213C41.7018 25.5409 41.1672 25.8266 40.5853 25.9424C40.0033 26.0581 39.4001 25.9987 38.852 25.7716C38.3038 25.5446 37.8352 25.1601 37.5056 24.6667C37.1759 24.1734 37 23.5933 37 23C37 22.2044 37.3161 21.4413 37.8787 20.8787C38.4413 20.3161 39.2044 20 40 20ZM40 18C39.0111 18 38.0444 18.2932 37.2222 18.8427C36.3999 19.3921 35.759 20.173 35.3806 21.0866C35.0022 22.0002 34.9031 23.0055 35.0961 23.9755C35.289 24.9454 35.7652 25.8363 36.4645 26.5355C37.1637 27.2348 38.0546 27.711 39.0246 27.9039C39.9945 28.0969 40.9998 27.9978 41.9134 27.6194C42.8271 27.241 43.6079 26.6001 44.1574 25.7779C44.7068 24.9556 45 23.9889 45 23C45 21.6739 44.4732 20.4021 43.5355 19.4645C42.5979 18.5268 41.3261 18 40 18Z" fill="#333333"/><path d="M39 46H37V44C36.9991 43.2046 36.6828 42.4421 36.1204 41.8796C35.5579 41.3172 34.7954 41.0009 34 41H30C29.2046 41.0009 28.4421 41.3172 27.8796 41.8796C27.3172 42.4421 27.0009 43.2046 27 44V46H25V44C25.0016 42.6744 25.5288 41.4035 26.4662 40.4662C27.4035 39.5288 28.6744 39.0016 30 39H34C35.3256 39.0016 36.5965 39.5288 37.5338 40.4662C38.4712 41.4035 38.9984 42.6744 39 44V46Z" fill="#333333"/><path d="M32 29C32.5933 29 33.1734 29.1759 33.6667 29.5056C34.1601 29.8352 34.5446 30.3038 34.7716 30.8519C34.9987 31.4001 35.0581 32.0033 34.9424 32.5853C34.8266 33.1672 34.5409 33.7018 34.1213 34.1213C33.7018 34.5409 33.1672 34.8266 32.5853 34.9424C32.0033 35.0581 31.4001 34.9987 30.852 34.7716C30.3038 34.5446 29.8352 34.1601 29.5056 33.6667C29.1759 33.1734 29 32.5933 29 32C29 31.2044 29.3161 30.4413 29.8787 29.8787C30.4413 29.3161 31.2044 29 32 29ZM32 27C31.0111 27 30.0444 27.2932 29.2222 27.8427C28.3999 28.3921 27.759 29.173 27.3806 30.0866C27.0022 31.0002 26.9031 32.0055 27.0961 32.9755C27.289 33.9454 27.7652 34.8363 28.4645 35.5355C29.1637 36.2348 30.0546 36.711 31.0246 36.9039C31.9945 37.0969 32.9998 36.9978 33.9134 36.6194C34.8271 36.241 35.6079 35.6001 36.1574 34.7779C36.7068 33.9556 37 32.9889 37 32C37 30.6739 36.4732 29.4021 35.5355 28.4645C34.5979 27.5268 33.3261 27 32 27Z" fill="#333333"/><path d="M24 30H22C20.6744 30.0016 19.4035 30.5288 18.4662 31.4662C17.5288 32.4035 17.0016 33.6744 17 35V39H19V35C19.0009 34.2046 19.3172 33.4421 19.8796 32.8796C20.4421 32.3172 21.2046 32.0009 22 32H24V30Z" fill="#333333"/><path d="M24 20C24.5933 20 25.1734 20.1759 25.6667 20.5056C26.1601 20.8352 26.5446 21.3038 26.7716 21.8519C26.9987 22.4001 27.0581 23.0033 26.9424 23.5853C26.8266 24.1672 26.5409 24.7018 26.1213 25.1213C25.7018 25.5409 25.1672 25.8266 24.5853 25.9424C24.0033 26.0581 23.4001 25.9987 22.852 25.7716C22.3038 25.5446 21.8352 25.1601 21.5056 24.6667C21.1759 24.1734 21 23.5933 21 23C21 22.2044 21.3161 21.4413 21.8787 20.8787C22.4413 20.3161 23.2044 20 24 20ZM24 18C23.0111 18 22.0444 18.2932 21.2222 18.8427C20.3999 19.3921 19.759 20.173 19.3806 21.0866C19.0022 22.0002 18.9031 23.0055 19.0961 23.9755C19.289 24.9454 19.7652 25.8363 20.4645 26.5355C21.1637 27.2348 22.0546 27.711 23.0246 27.9039C23.9945 28.0969 24.9998 27.9978 25.9134 27.6194C26.827 27.241 27.6079 26.6001 28.1573 25.7779C28.7068 24.9556 29 23.9889 29 23C29 21.6739 28.4732 20.4021 27.5355 19.4645C26.5979 18.5268 25.3261 18 24 18Z" fill="#333333"/></svg>',
    'auditivo-ocular':'<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="64" height="64" rx="24" fill="#FDF0E9"/><path d="M34 46V44C36.6512 43.997 39.193 42.9424 41.0677 41.0677C42.9424 39.193 43.997 36.6512 44 34H46C45.9965 37.1815 44.731 40.2317 42.4814 42.4814C40.2317 44.731 37.1815 45.9965 34 46Z" fill="#333333"/><path d="M34 42V40C35.5908 39.9983 37.1159 39.3656 38.2407 38.2407C39.3656 37.1159 39.9983 35.5908 40 34H42C41.9976 36.121 41.1539 38.1544 39.6542 39.6542C38.1544 41.1539 36.121 41.9976 34 42Z" fill="#333333"/><path d="M34 38V36C34.5302 35.9994 35.0386 35.7885 35.4135 35.4135C35.7885 35.0386 35.9994 34.5302 36 34H38C37.9989 35.0605 37.5771 36.0773 36.8272 36.8272C36.0773 37.5771 35.0605 37.9989 34 38Z" fill="#333333"/><path d="M26 18C23.6139 18.0026 21.3262 18.9517 19.639 20.639C17.9517 22.3262 17.0026 24.6139 17 27H19C19 25.1435 19.7375 23.363 21.0503 22.0503C22.363 20.7375 24.1435 20 26 20C27.8565 20 29.637 20.7375 30.9497 22.0503C32.2625 23.363 33 25.1435 33 27C33.0035 28.2394 32.6822 29.458 32.0679 30.5344C31.4536 31.6108 30.5678 32.5074 29.499 33.1348L29 33.4229V36.4961C29.0048 36.8972 28.9274 37.2951 28.7724 37.6651C28.6175 38.0351 28.3883 38.3695 28.0991 38.6475C27.5223 39.2682 26.7705 39.699 25.9434 39.8829C25.1163 40.0668 24.2528 39.9952 23.4673 39.6775C22.7465 39.3659 22.1306 38.8535 21.6931 38.2014C21.2557 37.5493 21.015 36.7851 21 36H19C19.018 37.174 19.3736 38.318 20.0242 39.2954C20.6749 40.2728 21.5932 41.0422 22.6694 41.5117C23.3992 41.8315 24.1871 41.9971 24.9839 41.998C26.6629 41.9627 28.2649 41.2873 29.4624 40.11C29.9522 39.6448 30.3413 39.084 30.6058 38.4624C30.8702 37.8408 31.0044 37.1716 31 36.4961V34.5537C32.2338 33.718 33.2438 32.5922 33.9412 31.2752C34.6386 29.9582 35.0021 28.4902 35 27C34.9974 24.6139 34.0483 22.3262 32.361 20.639C30.6738 18.9517 28.3861 18.0026 26 18Z" fill="#333333"/><path d="M25.2803 24.0825C25.7226 23.9743 26.1837 23.9681 26.6287 24.0642C27.0737 24.1603 27.4911 24.3562 27.8494 24.6372C28.2076 24.9181 28.4974 25.2768 28.6968 25.6861C28.8962 26.0954 29 26.5447 29.0003 27H31.0003C31.002 26.2481 30.8333 25.5056 30.507 24.8282C30.1806 24.1508 29.7051 23.5562 29.116 23.0889C28.5207 22.6173 27.8264 22.2863 27.0852 22.1206C26.3439 21.955 25.5748 21.959 24.8353 22.1323C23.9337 22.3415 23.1088 22.7994 22.4543 23.4539C21.7998 24.1084 21.3419 24.9333 21.1326 25.835C20.8898 26.8715 20.982 27.9584 21.396 28.9392C21.8099 29.9201 22.5243 30.7443 23.4363 31.2935C23.9037 31.5573 24.2939 31.9388 24.5682 32.4001C24.8426 32.8613 24.9915 33.3863 25.0003 33.9229V36H27.0003V33.9229C26.9932 33.0401 26.7553 32.1746 26.3102 31.4123C25.8652 30.6499 25.2284 30.0173 24.4632 29.5771C23.9513 29.2726 23.5415 28.8228 23.286 28.2847C23.0305 27.7467 22.9409 27.1448 23.0285 26.5556C23.1161 25.9665 23.377 25.4167 23.778 24.9763C24.179 24.5359 24.702 24.2248 25.2803 24.0825Z" fill="#333333"/></svg>',
    'tabaco-alcohol':'<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="64" height="64" rx="24" fill="#EAF4FB"/><path d="M41 27H31C30.7348 27 30.4804 27.1054 30.2929 27.2929C30.1054 27.4804 30 27.7348 30 28V32C30.0024 33.4166 30.5055 34.7868 31.4205 35.8683C32.3354 36.9498 33.6033 37.673 35 37.91V44H32V46H40V44H37V37.91C38.3967 37.673 39.6646 36.9498 40.5795 35.8683C41.4945 34.7868 41.9976 33.4166 42 32V28C42 27.7348 41.8946 27.4804 41.7071 27.2929C41.5196 27.1054 41.2652 27 41 27ZM40 32C40 33.0609 39.5786 34.0783 38.8284 34.8284C38.0783 35.5786 37.0609 36 36 36C34.9391 36 33.9217 35.5786 33.1716 34.8284C32.4214 34.0783 32 33.0609 32 32V29H40V32Z" fill="#333333"/><path d="M30.9998 17H25.9998C25.7346 17 25.4803 17.1054 25.2927 17.2929C25.1052 17.4804 24.9998 17.7348 24.9998 18V25.3706C24.0282 25.9398 23.2334 26.7673 22.7038 27.7611C22.1742 28.7549 21.9305 29.876 21.9998 31V45C21.9998 45.2652 22.1052 45.5196 22.2927 45.7071C22.4803 45.8946 22.7346 46 22.9998 46H27.9998V44H23.9998V31C23.9998 27.8125 26.2308 26.98 26.3162 26.9487L26.9998 26.7207V19H29.9998V24H31.9998V18C31.9998 17.7348 31.8945 17.4804 31.7069 17.2929C31.5194 17.1054 31.265 17 30.9998 17Z" fill="#333333"/></svg>',
  };
  const TEN_ICONS = [
    '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 21.75C8.85193 21.7493 8.70739 21.7047 8.5846 21.622C8.46181 21.5392 8.36626 21.422 8.31 21.285L4.7475 12.75H1.5V11.25H5.25C5.39807 11.2507 5.54261 11.2953 5.6654 11.378C5.78819 11.4608 5.88374 11.578 5.94 11.715L9 18.96L15.045 2.7375C15.0986 2.59395 15.195 2.47028 15.321 2.38312C15.447 2.29596 15.5968 2.24951 15.75 2.25C15.9047 2.25271 16.0547 2.30316 16.1796 2.39447C16.3044 2.48577 16.398 2.61344 16.4475 2.76L19.29 11.25H22.5V12.75H18.75C18.5928 12.7504 18.4394 12.7014 18.3115 12.6099C18.1837 12.5184 18.0878 12.389 18.0375 12.24L15.75 5.25L9.705 21.2625C9.65137 21.4061 9.55505 21.5297 9.429 21.6169C9.30296 21.704 9.15324 21.7505 9 21.75Z" fill="white"/></svg>',
    '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.305 21.75L12 21L15 15.75H19.5C19.8978 15.75 20.2794 15.592 20.5607 15.3107C20.842 15.0294 21 14.6478 21 14.25V5.25C21 4.85218 20.842 4.47064 20.5607 4.18934C20.2794 3.90804 19.8978 3.75 19.5 3.75H4.5C4.10218 3.75 3.72064 3.90804 3.43934 4.18934C3.15804 4.47064 3 4.85218 3 5.25V14.25C3 14.6478 3.15804 15.0294 3.43934 15.3107C3.72064 15.592 4.10218 15.75 4.5 15.75H11.25V17.25H4.5C3.70435 17.25 2.94129 16.9339 2.37868 16.3713C1.81607 15.8087 1.5 15.0456 1.5 14.25V5.25C1.5 4.45435 1.81607 3.69129 2.37868 3.12868C2.94129 2.56607 3.70435 2.25 4.5 2.25H19.5C20.2956 2.25 21.0587 2.56607 21.6213 3.12868C22.1839 3.69129 22.5 4.45435 22.5 5.25V14.25C22.5 15.0456 22.1839 15.8087 21.6213 16.3713C21.0587 16.9339 20.2956 17.25 19.5 17.25H15.87L13.305 21.75Z" fill="white"/><path d="M18 6.75H6V8.25H18V6.75Z" fill="white"/><path d="M13.5 11.25H6V12.75H13.5V11.25Z" fill="white"/></svg>',
    '<svg viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.5 0C8.4233 0 6.39323 0.615814 4.66652 1.76957C2.9398 2.92332 1.59399 4.5632 0.79927 6.48182C0.0045495 8.40045 -0.203386 10.5116 0.201759 12.5484C0.606904 14.5852 1.60693 16.4562 3.07538 17.9246C4.54383 19.3931 6.41476 20.3931 8.45156 20.7982C10.4884 21.2034 12.5996 20.9955 14.5182 20.2007C16.4368 19.406 18.0767 18.0602 19.2304 16.3335C20.3842 14.6068 21 12.5767 21 10.5C21 7.71523 19.8938 5.04451 17.9246 3.07538C15.9555 1.10625 13.2848 0 10.5 0ZM10.5 19.5C8.71997 19.5 6.97992 18.9722 5.49987 17.9832C4.01983 16.9943 2.86628 15.5887 2.18509 13.9442C1.5039 12.2996 1.32567 10.49 1.67294 8.74419C2.0202 6.99836 2.87737 5.39471 4.13604 4.13604C5.39472 2.87737 6.99836 2.0202 8.74419 1.67293C10.49 1.32567 12.2996 1.5039 13.9442 2.18508C15.5887 2.86627 16.9943 4.01983 17.9832 5.49987C18.9722 6.97991 19.5 8.71997 19.5 10.5C19.5 12.8869 18.5518 15.1761 16.864 16.864C15.1761 18.5518 12.887 19.5 10.5 19.5Z" fill="white"/><path d="M9 14.5605L5.25 10.8098L6.30975 9.75L9 12.4395L14.6888 6.75L15.75 7.81125L9 14.5605Z" fill="white"/></svg>',
    '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.7496 21.7531H2.24961C1.94961 21.7531 1.79961 21.6031 1.64961 21.4531C1.49961 21.1531 1.49961 21.0031 1.64961 20.7031L11.3996 2.70315C11.5496 2.25315 11.9996 2.10315 12.2996 2.40315C12.4496 2.40315 12.5996 2.55315 12.5996 2.70315L22.3496 20.7031C22.4996 21.0031 22.4996 21.1531 22.3496 21.4531C22.3496 21.6031 22.0496 21.7531 21.7496 21.7531ZM3.44961 20.2531H20.3996L11.9996 4.50315L3.44961 20.2531Z" fill="white"/><path d="M11.2496 9.75315H12.7496V15.0031H11.2496V9.75315ZM11.9996 16.9531C11.3996 16.9531 10.7996 17.4031 10.7996 18.1531C10.7996 18.9031 11.2496 19.3531 11.9996 19.3531C12.5996 19.3531 13.1996 18.9031 13.1996 18.1531C13.1996 17.4031 12.5996 16.9531 11.9996 16.9531Z" fill="white"/></svg>',
  ];
  const OMS_CHECK = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="12" fill="#336661"/><path d="M6.8 12.4 L10.3 15.9 L17.2 8.6" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';

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
  function accHTML(cards){
    return (cards||REC).map(r=>`<details class="area-acc-item">
      <summary><span class="area-acc-tt"><span class="area-acc-name">${esc(r.name)}</span><span class="area-acc-sub">${esc(r.sub)}</span></span><svg class="area-acc-chev" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></summary>
      <div class="area-acc-body">
        <div class="area-acc-col"><span class="area-lbl">Objetivo</span><ul>${r.obj.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>
        <div class="area-acc-col"><span class="area-lbl">Duración / Frecuencia</span><ul>${r.dur.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>
        <div class="area-acc-col"><span class="area-lbl">Tipo de actividad</span><ul>${r.tipo.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>
      </div>
    </details>`).join('');
  }
  const CHEV = '<svg class="area-chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';
  function subheadHTML(txt){ return `<div class="area-subhead"><span class="area-subhead-bar"></span><span>${esc(txt)}</span></div>`; }
  function infoHTML(){
    const enlaces = ENLACES.map(e=>`<div class="area-link"><span class="area-link-t">${esc(e)}</span><a href="javascript:void(0)" class="area-link-cta">Acceder ${CHEV}</a></div>`).join('');
    const fichas = FICHAS.map(([t,d])=>`<div class="area-ficha"><span class="area-ficha-t">${esc(t)}</span><span class="area-ficha-d">${esc(d)}</span><a href="javascript:void(0)" class="area-ficha-btn">Abrir ficha ${CHEV}</a></div>`).join('');
    return `<div class="area-info-block">${subheadHTML('Enlaces de ampliación')}<p class="area-p">Material seleccionado para que profundices en los temas relevantes.</p><div class="area-links">${enlaces}</div></div>
      <div class="area-info-block">${subheadHTML('Fichas')}<div class="area-fichas">${fichas}</div></div>`;
  }
  function tenHTML(){
    return `<ul class="area-checks">${TENCUENTA.map((i,ix)=>`<li><span class="area-badge">${TEN_ICONS[ix]||TEN_ICONS[0]}</span><span>${esc(i)}</span></li>`).join('')}</ul>`;
  }
  function omsHTML(){
    return `<ul class="area-checks area-checks--oms">${OMS_BENEFITS.map(i=>`<li><span class="area-omscheck">${OMS_CHECK}</span><span>${esc(i)}</span></li>`).join('')}</ul>`;
  }
  // Pautas clave — render específico por tipo de layout de cada área
  function pautaBlockHTML(b){
    return `<div class="area-pblock"><span class="area-pblock-h">${esc(b.h)}</span>${b.b?`<p class="area-pcard-b">${esc(b.b)}</p>`:''}${b.list?`<ul class="area-pcard-list">${b.list.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:''}</div>`;
  }
  function pautasHTML(slug){
    const p = PAUTAS[slug];
    if(!p) return '';
    let html = '';
    if(p.intro) html += `<p class="area-p">${esc(p.intro)}</p>`;
    if(p.type==='cols'){
      html += `<div class="area-acc">${accHTML(p.cards)}</div>`;
    } else if(p.type==='numbered'){
      html += `<div class="area-pnum">${p.items.map((t,i)=>`<div class="area-pnum-row"><span class="area-pnum-n">${i+1}</span><span class="area-pnum-t">${esc(t)}</span></div>`).join('')}</div>`;
    } else if(p.type==='titled'){
      html += `<div class="area-pcards">${p.cards.map(c=>`<div class="area-pcard"><span class="area-pcard-t">${esc(c.t)}</span>${c.b?`<p class="area-pcard-b">${esc(c.b)}</p>`:''}${c.list?`<ul class="area-pcard-list">${c.list.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:''}</div>`).join('')}</div>`;
    } else if(p.type==='grouped'){
      html += `<div class="area-pcards">${p.groups.map(g=>`${g.intro?`<p class="area-p">${esc(g.intro)}</p>`:''}<div class="area-pcard area-pgroup"><span class="area-pcard-t">${esc(g.t)}</span>${g.blocks.map(pautaBlockHTML).join('')}</div>`).join('')}</div>`;
    }
    if(p.closing) html += `<p class="area-p area-p-closing">${esc(p.closing)}</p>`;
    return html;
  }

  function renderArea(slug){
    const a = AREAS[slug];
    const host = document.getElementById('area-content');
    const bc = document.getElementById('area-breadcrumb');
    if(!a || !host){ if(host) host.innerHTML = '<p class="area-empty">Área no encontrada.</p>'; return; }
    if(bc) bc.textContent = a.name;
    const escSection = a.escalas.length
      ? a.escalas.map(escalaHTML).join('')
      : `<div class="area-esc-cuali">${esc(NOTE_CUALITATIVA)}</div>`;
    host.innerHTML = `<article class="area-detail">
      <div class="area-hero">
        <div class="area-hero-panel" style="background:${AREA_COLOR[slug]||'#004039'}">
          <div class="area-hero-left"><span class="area-ico">${AREA_ICONS[slug]||''}</span><h1 class="area-hero-name">${esc(a.name)}</h1></div>
          <div class="area-tag-badge" style="background:${AREA_TINT[slug]||'#F4F7F6'}"><span class="area-tag ${a.status}">${esc(a.statusLabel)}</span></div>
        </div>
      </div>
      <div class="area-body">
        <nav class="area-side" aria-label="Secciones"><div class="area-side-inner">
          <a href="javascript:void(0)" data-target="a-escalas" class="area-side-link is-active"><span>Resultado de las escalas</span></a>
          <a href="javascript:void(0)" data-target="a-pautas" class="area-side-link"><span>Pautas clave</span></a>
          <a href="javascript:void(0)" data-target="a-info" class="area-side-link"><span>Información ampliada</span></a>
          <a href="javascript:void(0)" data-target="a-ten" class="area-side-link"><span>Ten en cuenta</span></a>
          <a href="javascript:void(0)" data-target="a-oms" class="area-side-link"><span>Recomendaciones de salud de la OMS</span></a>
          <a href="javascript:void(0)" data-target="a-biblio" class="area-side-link"><span>Bibliografía</span></a>
        </div></nav>
        <div class="area-doc">
          <section id="a-escalas" class="area-card"><h2 class="area-h2">Resultado de las escalas</h2>${escSection}</section>
          <section id="a-pautas" class="area-card"><h2 class="area-h2">Pautas clave</h2>${pautasHTML(slug)}</section>
          <section id="a-info" class="area-card"><h2 class="area-h2">Información ampliada</h2>${infoHTML()}</section>
          <section id="a-ten" class="area-card"><h2 class="area-h2">Ten en cuenta</h2>${tenHTML()}</section>
          <section id="a-oms" class="area-card"><h2 class="area-h2">Recomendaciones de salud de la OMS</h2><p class="area-p">Según la Organización Mundial de la Salud (OMS), los beneficios de realizar actividad física regular son múltiples:</p>${omsHTML()}<p class="area-p">${esc(OMS_REC)}</p></section>
          <section id="a-biblio" class="area-card"><h2 class="area-h2">Bibliografía</h2><p class="area-biblio">${esc(BIBLIO)}</p></section>
        </div>
      </div>
    </article>`;
    const links = [...host.querySelectorAll('.area-side-link')];
    links.forEach(l=>l.addEventListener('click', ()=>{
      const el = document.getElementById(l.dataset.target);
      if(el){ const hdr=document.querySelector('.app-header')?.offsetHeight||0; window.scrollTo({top: el.getBoundingClientRect().top + window.scrollY - hdr - 28, behavior:'smooth'}); }
      links.forEach(x=>x.classList.toggle('is-active', x===l));
    }));
    // scroll-spy: resalta la sección visible
    if(window.__areaSpy) window.removeEventListener('scroll', window.__areaSpy);
    const secs = links.map(l=>document.getElementById(l.dataset.target)).filter(Boolean);
    const spy = ()=>{
      const off = (document.querySelector('.app-header')?.offsetHeight||0) + 130;
      let idx = 0;
      secs.forEach((s,i)=>{ if(s.getBoundingClientRect().top <= off) idx = i; });
      links.forEach((x,i)=>x.classList.toggle('is-active', i===idx));
    };
    window.__areaSpy = spy;
    window.addEventListener('scroll', spy, { passive:true });
    requestAnimationFrame(spy);
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
