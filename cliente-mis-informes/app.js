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

  // -------- Prototype FAB toggle (cycles through the 3 plan states) --------
  // Plan inicial (proto-1) → Plan de seguimiento cuatrimestral (proto-2) → Plan de seguimiento anual (proto-3)
  function initProtoFab() {
    const states = [
      { cls: 'proto-1', name: 'Plan inicial',                       report: 'Plan de Prevención y Reducción de Riesgos',     date: '18 de marzo de 2026' },
      { cls: 'proto-2', name: 'Plan de seguimiento cuatrimestral',  report: 'Plan de Seguimiento Cuatrimestral · Cuatrimestre 1', date: '18 de junio de 2026' },
      { cls: 'proto-3', name: 'Plan de seguimiento anual',          report: 'Plan de Seguimiento Anual',                     date: '18 de marzo de 2027' }
    ];
    const fab = document.getElementById('protoFab');
    const label = fab ? fab.querySelector('.proto-fab-label') : null;
    const select = document.getElementById('reportSelect');
    const rsName = document.getElementById('rsName');
    const rsDate = document.getElementById('rsDate');
    // Estado inicial: por defecto el último plan recibido; se puede fijar por URL (?plan=0|1|2)
    const planParam = parseInt(new URLSearchParams(location.search).get('plan'), 10);
    let idx = (planParam >= 0 && planParam < states.length) ? planParam : states.length - 1;
    function apply() {
      const s = states[idx];
      document.body.classList.remove('proto-1', 'proto-2', 'proto-3');
      document.body.classList.add(s.cls);
      if (label) label.textContent = s.name;
      if (rsName) rsName.textContent = s.report;
      if (rsDate) rsDate.textContent = s.date;
      if (select && select.value !== String(idx)) select.value = String(idx);
      // Re-render evolución cards so seguimiento data is reflected
      renderEvolucion();
    }
    apply(); // "Plan inicial" por defecto al cargar
    if (fab) fab.addEventListener('click', () => { idx = (idx + 1) % states.length; apply(); });
    if (select) select.addEventListener('change', () => { idx = parseInt(select.value, 10) || 0; apply(); });
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

  // -------- Init --------
  document.addEventListener('DOMContentLoaded', () => {
    renderContent();
    renderEvolucion();
    initDrawer();
    initProtoFab();
    initCategoriesCarousel();
    initPlanNav();
    initA11yMenus();
    initTextSizeSwitchers();
    initContrastToggles();
    route();
  });
})();
