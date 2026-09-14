/* ============================================================
   Qida — Home del portal del cliente · prototipo de cambios
   Todo el estado vive en memoria + localStorage. Sin backend.
   ============================================================ */
(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var LS = 'qida-home-proto';

  /* ---------- Estado ---------- */
  /* visita: nuevo | plan | seguimiento   ·   momento: manana | tarde */
  var state = {
    visita: 'nuevo', momento: 'manana',
    objetivo: 'descanso',
    intereses: ['nutricion', 'memoria', 'descanso'],
    favs: {}, tts: true, push: false, voz: false, big: false,
    goalAnswered: {}, goalClosed: {},
    test: {}, testDone: false, testOutcome: null,
    installSeen: false, verificado: false
  };
  try { Object.assign(state, JSON.parse(localStorage.getItem(LS) || '{}')); } catch (e) {}
  function save() { try { localStorage.setItem(LS, JSON.stringify(state)); } catch (e) {} }
  /* La franja la marca el reloj en cada carga; el selector solo la fuerza durante la sesión. */
  state.momento = new Date().getHours() < 15 ? 'manana' : 'tarde';

  /* ---------- Notas (post-its de la captura) ---------- */
  var NOTES = {
    espacio:   ['Nav', 'Mis informes, mi evolución, mis citas y mis servicios detrás de un único “Espacio personal”.'],
    footer:    ['Footer', 'Footer completo, con Elsa dentro.'],
    banner:    ['Orientadora', 'La primera visita, la Orientadora personal se presenta arriba. A partir de ahí baja al final de la página. Llamar y escribir están siempre en la cabecera.'],
    saludo:    ['Pregunta del día', 'Pregunta sobre el objetivo, con el color de su área. Cambia según la hora y los objetivos: por la mañana sueño, por la tarde actividad física. Al responder desaparece; también se puede cerrar.'],
    elsa:      ['Elsa', 'Chat que resuelve dudas y abre pantallas del portal, arriba como buscador de la app.'],
    plan:      ['Actividades del día', 'Área, icono y actividad. Cada una lleva a la pantalla donde se hace: recetas, juegos o contenidos.'],
    gamif:     ['Evolución', 'Solo aparece a partir del primer seguimiento: con el plan inicial todavía no hay evolución que enseñar.'],
    contenido: ['Contenidos', 'Destacados hacia la sección de contenidos. Genéricos al principio; personalizados cuando ya hay plan o seguimientos.'],
    lectura:   ['Audio', 'Escuchar el artículo pasa al detalle del contenido, no a la home.'],
    recetas:   ['Recetas', 'Favoritas y creador de recetas. El feedback pasa al detalle de cada receta.'],
    'perfil-nav': ['Perfil', 'El perfil vive en la cabecera; ya no hay sección de perfil en la home.'],
    shortcut:  ['App', 'Acceso directo en el móvil y avisos.'],
    push:      ['Avisos', 'Notificaciones: plan del día y citas.'],
    accesos:   ['Accesos directos', 'Contenidos, Juegos y Espacio personal. El Espacio personal pide verificar la identidad en dos pasos antes de entrar.'],
    legal:     ['Servicio legal', 'Encuesta del servicio de información legal, incluido en la póliza.']
  };
  var NOTE_ORDER = Object.keys(NOTES);

  /* ---------- Datos ---------- */
  var AREAS = {
    sueno:     { cat: 'cat-sueno',     label: 'Sueño',            icon: 'i-moon' },
    fisica:    { cat: 'cat-fisica',    label: 'Actividad física', icon: 'i-run' },
    mente:     { cat: 'cat-mente',     label: 'Mente activa',     icon: 'i-brain' },
    nutricion: { cat: 'cat-nutricion', label: 'Nutrición',        icon: 'i-fork' },
    emocional: { cat: 'cat-emocional', label: 'Bienestar emocional', icon: 'i-heart' }
  };

  /* Pregunta del día: por la mañana la del objetivo principal, por la tarde la de actividad física */
  var PREGUNTAS = {
    manana: {
      descanso:  { area: 'sueno',     q: '¿Cómo has dormido hoy?',
                   chips: ['He dormido bien', 'Me he despertado varias veces', 'Me ha costado dormirme'] },
      memoria:   { area: 'mente',     q: '¿Cómo te notas hoy de memoria?', chips: ['Bien', 'Regular', 'Mal'] },
      movilidad: { area: 'fisica',    q: '¿Cómo te has levantado hoy?', chips: ['Con fuerza', 'Normal', 'Cansada'] },
      animo:     { area: 'emocional', q: '¿Cómo estás hoy de ánimo?', chips: ['Bien', 'Regular', 'Mal'] }
    },
    tarde: {
      todos:     { area: 'fisica',    q: '¿Has salido a caminar hoy?', chips: ['Sí', 'Todavía no'] }
    }
  };
  var ACK = 'Gracias, lo anotamos.';

  var OBJETIVOS = {
    descanso:  { label: 'Descanso' },
    memoria:   { label: 'Memoria' },
    movilidad: { label: 'Movilidad' },
    animo:     { label: 'Ánimo' }
  };

  /* Actividades del día */
  var PLAN = [
    { area: 'fisica',
      t: 'Realiza caminatas al aire libre durante 15 minutos, manteniendo un ritmo cómodo, seguro y constante.' },
    { area: 'nutricion',
      t: 'Realiza caminatas al aire libre durante 15 minutos, manteniendo un ritmo cómodo, seguro y constante.' },
    { area: 'mente',
      t: 'Realiza un sudoku desde el Portal del Cliente.',
      cta: 'Acceder', action: 'juegos' }
  ];

  var ARTICULOS = [
    { id:'a1', tema:'descanso',  tag:'Descanso',  t:'Cómo preparar la noche para dormir mejor', img:'https://images.unsplash.com/photo-1520206183501-b80df61043c2?w=600&q=80&auto=format&fit=crop' },
    { id:'a2', tema:'memoria',   tag:'Memoria',   t:'Detección precoz: señales que conviene mirar', img:'https://images.unsplash.com/photo-1447069387593-a5de0862481e?w=600&q=80&auto=format&fit=crop' },
    { id:'a3', tema:'nutricion', tag:'Nutrición', t:'Proteína en cada comida, sin complicarte', img:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80&auto=format&fit=crop' },
    { id:'a4', tema:'movilidad', tag:'Movilidad', t:'Ejercicios de equilibrio para hacer en casa', img:'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80&auto=format&fit=crop' },
    { id:'a5', tema:'animo',     tag:'Ánimo',     t:'La soledad no deseada y cómo abordarla', img:'https://images.unsplash.com/photo-1454418747937-bd95bb945625?w=600&q=80&auto=format&fit=crop' },
    { id:'a6', tema:'nutricion', tag:'Nutrición', t:'Hidratación: cuánta agua necesitas de verdad', img:'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=600&q=80&auto=format&fit=crop' }
  ];
  /* Antes del plan de prevención: contenido general, no personalizado */
  var ARTICULOS_GEN = ['a4', 'a5', 'a6'];

  var RECETAS = [
    { id:'r1', t:'Crema de calabacín', m:'25 min · Cena', img:'https://images.unsplash.com/photo-1547592180-85f173990554?w=500&q=80&auto=format&fit=crop' },
    { id:'r2', t:'Salmón al horno con verduras', m:'30 min · Comida', img:'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&q=80&auto=format&fit=crop' },
    { id:'r3', t:'Gazpacho de temporada', m:'15 min · Comida', img:'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=500&q=80&auto=format&fit=crop' },
    { id:'r4', t:'Tortilla de espinacas', m:'20 min · Cena', img:'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=500&q=80&auto=format&fit=crop' }
  ];
  var RECETAS_GEN = ['r3', 'r4', 'r2'];

  /* Orientadora personal */
  var OP = {
    nombre: 'Sofía Millán',
    profesion: 'Trabajadora social',
    tel: '900 123 456',
    email: 'sofia.millan@qida.es',
    horario: 'L-V de 9:00 a 18:00',
    titulo: 'Trabajadora social',
    colegiado: '12616',
    foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=240&q=80&auto=format&fit=crop'
  };

  var TEMAS = { nutricion:'Nutrición', memoria:'Memoria', descanso:'Descanso', movilidad:'Movilidad', animo:'Ánimo' };

  /* ---------- Toast ---------- */
  function toast(msg) {
    var t = document.createElement('div');
    t.className = 'toast'; t.textContent = msg;
    $('#toasts').appendChild(t);
    setTimeout(function () { t.remove(); }, 2800);
  }

  /* ---------- Pregunta del día sobre el objetivo ---------- */
  function preguntaDeHoy() {
    if (state.momento === 'tarde') return PREGUNTAS.tarde.todos;
    return PREGUNTAS.manana[state.objetivo] || PREGUNTAS.manana.descanso;
  }
  function slotKey() { return state.momento + ':' + preguntaDeHoy().area; }

  var goalTimer = null;
  function renderGoal() {
    var card = $('#goal-card'), p = preguntaDeHoy(), key = slotKey();
    clearTimeout(goalTimer);
    if (state.goalAnswered[key] || state.goalClosed[key]) { card.style.display = 'none'; return; }
    card.style.display = '';
    card.className = 'goal-bar has-note ' + AREAS[p.area].cat;
    $('#goal-in').innerHTML = '<span class="q">' + p.q + '</span>' +
      '<div class="goal-chips">' + p.chips.map(function (c) {
        return '<button class="goal-chip" data-mood="' + c + '">' + c + '</button>';
      }).join('') + '</div>';
  }

  function hideGoal() {
    var card = $('#goal-card');
    clearTimeout(goalTimer);
    card.classList.add('leaving');
    setTimeout(function () { card.style.display = 'none'; card.classList.remove('leaving'); }, 440);
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-mood]');
    if (!b) return;
    state.goalAnswered[slotKey()] = b.dataset.mood; save();
    $('#goal-in').innerHTML = '<div class="goal-thanks">' +
      '<span class="tick"><svg><use href="#i-check"/></svg></span>' + ACK + '</div>';
    goalTimer = setTimeout(hideGoal, 2200);
  });
  $('#goal-x').addEventListener('click', function () {
    state.goalClosed[slotKey()] = true; save(); hideGoal();
  });

  /* ---------- Actividades del día ---------- */
  function renderPlan() {
    $('#plan-grid').innerHTML = PLAN.map(function (p, i) {
      var a = AREAS[p.area];
      return '<article class="plan-card ' + a.cat + '">' +
        '<div class="pc-head"><span class="area">' + a.label + '</span></div>' +
        '<div class="pc-in">' +
        '<h3>' + p.t + '</h3>' +
        (p.cta ? '<a href="#" class="pc-cta" data-plan="' + i + '">' + p.cta +
                 '<svg><use href="#i-chevron-right"/></svg></a>' : '') +
        '</div></article>';
    }).join('');
  }
  document.addEventListener('click', function (e) {
    var c = e.target.closest('[data-plan]'); if (!c) return;
    e.preventDefault();
    var p = PLAN[+c.dataset.plan];
    if (p.action === 'recetas') {
      go('inicio');
      setTimeout(function () { $('#recipe-grid').scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 120);
    } else { go(p.action); }
  });

  /* ---------- Semanas (evolución) ---------- */
  function renderWeeks() {
    var data = [[4, 2, 3], [5, 3, 4], [3, 4, 5], [6, 4, 6]];
    var max = 18;
    $('#weeks').innerHTML = data.map(function (w, i) {
      var tot = w[0] + w[1] + w[2];
      return '<div class="week"><div class="stack">' +
        '<span class="seg fis" style="height:' + (w[2] / max * 100) + '%"></span>' +
        '<span class="seg cog" style="height:' + (w[1] / max * 100) + '%"></span>' +
        '<span class="seg nut" style="height:' + (w[0] / max * 100) + '%"></span>' +
        '</div><span class="lbl">S' + (i + 1) + ' · ' + tot + '</span></div>';
    }).join('');
    $('#ring-pct').textContent = '68%';
    $('#ring-arc').style.strokeDashoffset = 440 - 440 * 0.68;
  }

  /* ---------- Contenidos destacados ---------- */
  function articulo(id) {
    for (var i = 0; i < ARTICULOS.length; i++) if (ARTICULOS[i].id === id) return ARTICULOS[i];
  }
  function renderContent() {
    var list;
    if (state.visita === 'nuevo') {
      list = ARTICULOS_GEN.map(articulo).concat(ARTICULOS.filter(function (a) {
        return ARTICULOS_GEN.indexOf(a.id) < 0;
      }));
    } else {
      list = ARTICULOS.filter(function (a) {
        return state.intereses.indexOf(a.tema) >= 0 || a.tema === state.objetivo;
      });
      ARTICULOS.forEach(function (a) { if (list.indexOf(a) < 0) list.push(a); });
    }
    $('#content-grid').innerHTML = list.slice(0, 6).map(function (a) {
      return '<a href="#" class="ccard" data-go="contenidos">' +
        '<span class="thumb" style="background-image:url(\'' + a.img + '\')"></span>' +
        '<span class="body"><span class="tag">' + a.tag + '</span><h3>' + a.t + '</h3></span></a>';
    }).join('');
  }

  /* ---------- Recetas ---------- */
  function receta(id) {
    for (var i = 0; i < RECETAS.length; i++) if (RECETAS[i].id === id) return RECETAS[i];
  }
  function renderRecipes() {
    var list = state.visita === 'nuevo' ? RECETAS_GEN.map(receta) : RECETAS.slice(0, 3);
    var cards = list.map(function (r) {
      return '<article class="rcard" data-rec="' + r.id + '">' +
        '<div class="thumb" style="background-image:url(\'' + r.img + '\')">' +
          '<button class="heart' + (state.favs[r.id] ? ' is-on' : '') + '" data-fav="' + r.id +
          '" aria-label="Guardar en favoritas"><svg><use href="#i-heart"/></svg></button></div>' +
        '<div class="body"><h4>' + r.t + '</h4><span class="meta">' + r.m + '</span></div></article>';
    }).join('');
    var creator = '<button class="creator-card" data-open="receta">' +
      '<span class="ico"><svg><use href="#i-spark"/></svg></span>' +
      '<h4>Crear una receta</h4>' +
      '<p>Dinos qué tienes en casa y te proponemos una.</p>' +
      '<span class="cc-cta">Empezar<svg><use href="#i-chevron-right"/></svg></span></button>';
    $('#recipe-grid').innerHTML = creator + cards;
  }
  document.addEventListener('click', function (e) {
    var f = e.target.closest('[data-fav]');
    if (f) {
      e.preventDefault(); e.stopPropagation();
      var id = f.dataset.fav;
      state.favs[id] = !state.favs[id]; save(); renderRecipes();
      toast(state.favs[id] ? 'Guardada en tus favoritas' : 'Quitada de favoritas');
      return;
    }
    var r = e.target.closest('[data-rec]');
    if (r) { go('contenidos'); }
  });

  /* ---------- Tu Orientadora personal ---------- */
  function opCred() {
    return '<ul class="op-cred">' +
      '<li>' + OP.titulo + '</li>' +
      '<li>Colegiada ' + OP.colegiado + '</li>' +
      '<li><svg><use href="#i-clock"/></svg>' + OP.horario + '</li>' +
      '</ul>';
  }
  function opAcciones() {
    return '<div class="op-actions">' +
      '<button class="btn btn-primary"><svg width="16" height="16"><use href="#i-message"/></svg>Mensaje</button>' +
      '<a class="btn btn-secondary" href="tel:' + OP.tel.replace(/ /g, '') + '">' +
        '<svg width="16" height="16"><use href="#i-phone"/></svg>Llamar</a>' +
      '</div>';
  }
  function renderOP() {
    var foto = '<span class="op-photo" style="background-image:url(\'' + OP.foto + '\')"></span>';
    function cuerpo(rol) {
      return '<div class="op-body"><div class="op-text">' +
        '<h2>' + OP.nombre + '</h2>' +
        '<p class="op-rol">' + rol + '</p>' + opCred() +
        '</div>' + opAcciones() + '</div>';
    }
    $('#op-top').innerHTML = foto + cuerpo('Tu Orientadora personal · Te acompaño en tu Plan de Prevención');
    $('#op-bottom').innerHTML = foto + cuerpo('Tu Orientadora personal');
  }

  /* ---------- Filas con scroll ---------- */
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-scroll]'); if (!b) return;
    e.preventDefault();
    var row = document.getElementById(b.dataset.scroll);
    var first = row.firstElementChild;
    var step = first ? first.getBoundingClientRect().width + 18 : 300;
    row.scrollBy({ left: step * (+b.dataset.dir), behavior: 'smooth' });
  });
  function syncRowNav() {
    $$('[data-scroll]').forEach(function (b) {
      var row = document.getElementById(b.dataset.scroll);
      if (!row) return;
      var max = row.scrollWidth - row.clientWidth - 2;
      b.disabled = +b.dataset.dir < 0 ? row.scrollLeft <= 2 : row.scrollLeft >= max;
    });
  }
  ['content-grid', 'recipe-grid'].forEach(function (id) {
    var row = document.getElementById(id);
    if (row) row.addEventListener('scroll', syncRowNav, { passive: true });
  });
  window.addEventListener('resize', syncRowNav);

  /* ---------- Estados de la home ---------- */
  function applyState() {
    var v = state.visita;
    $('#op-top').style.display    = v === 'nuevo' ? '' : 'none';
    $('#op-bottom').style.display = v === 'nuevo' ? 'none' : '';
    $('#evo-section').style.display = v === 'seguimiento' ? '' : 'none';
    renderContent();
    renderRecipes();
    renderGoal();
    setTimeout(syncRowNav, 0);
  }

  function buildStateBar() {
    var bar = document.createElement('div');
    bar.className = 'state-bar';
    bar.innerHTML = '<button class="lbl" data-statetoggle>Estado</button>' +
      '<button data-visita="nuevo">1ª visita</button>' +
      '<button data-visita="plan">Con plan</button>' +
      '<button data-visita="seguimiento">Con seguimientos</button>' +
      '<span class="sep"></span>' +
      '<button data-momento="manana">Mañana</button>' +
      '<button data-momento="tarde">Tarde</button>';
    document.body.appendChild(bar);
    if (window.innerWidth <= 720) bar.classList.add('mini');
    syncStateBar();
  }
  function syncStateBar() {
    $$('.state-bar [data-visita]').forEach(function (b) { b.classList.toggle('on', b.dataset.visita === state.visita); });
    $$('.state-bar [data-momento]').forEach(function (b) { b.classList.toggle('on', b.dataset.momento === state.momento); });
  }
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-statetoggle]')) { $('.state-bar').classList.toggle('mini'); return; }
    var v = e.target.closest('.state-bar [data-visita]');
    if (v) { state.visita = v.dataset.visita; save(); syncStateBar(); applyState(); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    var m = e.target.closest('.state-bar [data-momento]');
    if (m) { state.momento = m.dataset.momento; save(); syncStateBar(); renderGoal(); }
  });

  /* ---------- Test de tranquilidad (servicio legal) ---------- */
  var TEST = [
    { id: 'intro', head: 'Test de tranquilidad', step: 0,
      title: '¿Tienes decidido quién cuidará de tus cosas si tú no puedes?',
      body: ['Son 4 preguntas. Al final te decimos si te conviene hablar con un abogado.'],
      next: 'Empezar' },

    { id: 'q1', head: 'Test de tranquilidad', step: 1, type: 'multi',
      kicker: 'Pregunta 1 de 4',
      title: '¿Qué te daría más tranquilidad?',
      hint: 'Puedes marcar varias',
      options: ['Que se respeten mis decisiones',
                'Tener mis asuntos en orden',
                'Ponérselo fácil a mi familia',
                'No me lo había planteado'] },

    { id: 'q2', head: 'Test de tranquilidad', step: 2, type: 'single',
      kicker: 'Pregunta 2 de 4',
      title: '¿Hay alguien de confianza que pueda decidir por ti si tú no puedes?',
      options: ['Sí', 'No lo tengo claro', 'No'] },

    { id: 'q3', head: 'Test de tranquilidad', step: 3, type: 'multi',
      kicker: 'Pregunta 3 de 4',
      title: '¿Qué tienes ya decidido?',
      hint: 'Puedes marcar varias',
      options: ['Quién gestionaría mi dinero',
                'Qué atención médica quiero y cuál no',
                'Dónde quiero vivir si necesito ayuda',
                'Ninguna de estas'] },

    { id: 'q4', head: 'Test de tranquilidad', step: 4, type: 'single',
      kicker: 'Pregunta 4 de 4',
      title: '¿Has hablado con un abogado sobre esto?',
      options: ['Sí, hace poco', 'Sí, hace tiempo', 'No'],
      next: 'Ver el resultado' },

    { id: 'result', head: 'Servicio legal', step: 5,
      title: 'Te conviene hablar con un abogado',
      body: ['Te ayuda a dejar por escrito quién decide por ti y qué atención médica quieres.',
             'Está incluido en tu póliza, sin coste.'] },

    { id: 'cita', head: 'Servicio legal', step: 5,
      title: 'Cita solicitada',
      body: ['Sofía te llamará para darte cita con el abogado.'],
      close: 'Cerrar' },

    { id: 'info', head: 'Servicio legal', step: 5,
      title: 'Solicitud enviada',
      body: ['Sofía te llamará para contarte más.'],
      close: 'Cerrar' }
  ];

  var testIdx = 0;
  function stepById(id) { for (var i = 0; i < TEST.length; i++) if (TEST[i].id === id) return i; return 0; }

  function renderTest() {
    var s = TEST[testIdx];
    $('#test-title').textContent = s.head;
    $('#test-progress').innerHTML = [0, 1, 2, 3, 4].map(function (i) {
      return '<i class="' + (i < s.step ? 'on' : '') + '"></i>';
    }).join('');

    var html = (s.kicker ? '<span class="test-kicker">' + s.kicker + '</span>' : '') +
      '<h4>' + s.title + '</h4>';
    if (s.hint) html += '<p class="test-hint">' + s.hint + '</p>';
    (s.body || []).forEach(function (p) { html += '<p>' + p + '</p>'; });

    if (s.options) {
      var picked = state.test[s.id] || [];
      html += '<div class="opts">' + s.options.map(function (o, i) {
        var on = picked.indexOf(i) >= 0;
        return '<button class="opt' + (on ? ' on' : '') + '" data-opt="' + i + '">' +
          '<span class="box ' + (s.type === 'multi' ? 'sq' : 'ci') + '">' +
          (s.type === 'multi' ? '<svg><use href="#i-check"/></svg>' : '') + '</span>' + o + '</button>';
      }).join('') + '</div>';
    }

    if (s.id === 'result') {
      html += '<div class="test-actions">' +
        '<button class="btn btn-primary" data-testgo="cita">Pedir cita con el abogado</button>' +
        '<button class="btn btn-secondary" data-testgo="info">Quiero saber más</button>' +
        '</div>' +
        '<a href="#" class="test-link" data-testgo="none">No lo necesito</a>';
    }
    $('#test-body').innerHTML = html;

    var foot = '';
    if (s.close) {
      foot = '<span class="spacer"></span><button class="btn btn-secondary" id="test-close">' + s.close + '</button>';
    } else if (s.id === 'result') {
      foot = '';
    } else if (s.id === 'intro') {
      foot = '<span class="spacer"></span><button class="btn btn-primary" data-testnext>Empezar</button>';
    } else {
      foot = '<button class="btn btn-ghost" data-testback><svg width="16" height="16"><use href="#i-arrow-left"/></svg>Atrás</button>' +
        '<button class="btn btn-primary" data-testnext>' + (s.next || 'Siguiente') +
        (s.next ? '' : '<svg width="16" height="16"><use href="#i-arrow-right"/></svg>') + '</button>';
    }
    $('#test-foot').innerHTML = foot;
    $('#test-foot').style.display = foot ? '' : 'none';
    $('#test-body').scrollTop = 0;
  }

  function openTest(idx) {
    testIdx = idx || 0;
    $('.scrim').classList.add('open');
    $('#modal-test').classList.add('open');
    renderTest();
  }

  document.addEventListener('click', function (e) {
    var o = e.target.closest('#test-body [data-opt]');
    if (o) {
      var s = TEST[testIdx], i = +o.dataset.opt;
      var cur = state.test[s.id] || [];
      if (s.type === 'multi') {
        var p = cur.indexOf(i);
        if (p >= 0) cur.splice(p, 1); else cur.push(i);
      } else { cur = [i]; }
      state.test[s.id] = cur; save(); renderTest(); return;
    }
    if (e.target.closest('[data-testnext]')) { testIdx = Math.min(testIdx + 1, TEST.length - 1); renderTest(); return; }
    if (e.target.closest('[data-testback]')) { testIdx = Math.max(testIdx - 1, 0); renderTest(); return; }
    var g = e.target.closest('[data-testgo]');
    if (g) {
      e.preventDefault();
      var to = g.dataset.testgo;
      state.testDone = true; state.testOutcome = to; save(); renderLegal();
      if (to === 'none') { closeAll(); toast('Gracias. Puedes retomar el test cuando quieras.'); return; }
      testIdx = stepById(to); renderTest(); return;
    }
    if (e.target.closest('#test-close')) { closeAll(); }
  });

  function renderLegal() {
    var card = $('#legal-card');
    if (!state.testDone) {
      card.classList.remove('done');
      $('#legal-title').textContent = '¿Tienes decidido quién cuidará de tus cosas si tú no puedes?';
      $('#legal-text').textContent = '4 preguntas para saberlo. El servicio con un abogado está incluido en tu póliza.';
      $('#legal-cta').textContent = 'Empezar';
      return;
    }
    card.classList.add('done');
    if (state.testOutcome === 'cita') {
      $('#legal-title').textContent = 'Sofía te llamará para darte cita con el abogado';
      $('#legal-text').textContent = 'Ya has hecho el test. Puedes volver a ver el resultado.';
    } else if (state.testOutcome === 'info') {
      $('#legal-title').textContent = 'Sofía te llamará para contarte más';
      $('#legal-text').textContent = 'Ya has hecho el test. Puedes volver a ver el resultado.';
    } else {
      $('#legal-title').textContent = 'Ya conoces el servicio legal';
      $('#legal-text').textContent = 'Si cambias de idea, pide cita con el abogado cuando quieras.';
    }
    $('#legal-cta').textContent = 'Ver el resultado';
  }
  $('#legal-cta').addEventListener('click', function () {
    openTest(state.testDone ? stepById('result') : 0);
  });

  /* ---------- Perfil (drawer) ---------- */
  function renderPerfilDrawer() {
    $('#obj-chips').innerHTML = Object.keys(OBJETIVOS).map(function (k) {
      return '<button class="chip' + (state.objetivo === k ? ' is-on' : '') + '" data-obj="' + k + '">' + OBJETIVOS[k].label + '</button>';
    }).join('');
    $('#int-chips').innerHTML = Object.keys(TEMAS).map(function (k) {
      return '<button class="chip' + (state.intereses.indexOf(k) >= 0 ? ' is-on' : '') + '" data-int="' + k + '">' + TEMAS[k] + '</button>';
    }).join('');
    $$('[data-switch]').forEach(function (s) { s.classList.toggle('is-on', !!state[s.dataset.switch]); });
  }
  document.addEventListener('click', function (e) {
    var o = e.target.closest('[data-obj]');
    if (o) { state.objetivo = o.dataset.obj; save(); renderPerfilDrawer(); renderGoal(); renderContent(); return; }
    var t = e.target.closest('[data-int],[data-topic]');
    if (t) {
      var k = t.dataset.int || t.dataset.topic;
      var i = state.intereses.indexOf(k);
      if (i >= 0) state.intereses.splice(i, 1); else state.intereses.push(k);
      save(); renderPerfilDrawer(); renderContent(); return;
    }
    var s = e.target.closest('[data-switch]');
    if (s) {
      var key = s.dataset.switch;
      state[key] = !state[key]; save();
      s.classList.toggle('is-on', state[key]);
      if (key === 'big') document.body.style.fontSize = state.big ? '17px' : '';
      if (key === 'push' && state.push) toast('Avisos activados. Te recordaremos tu plan cada mañana.');
    }
  });
  $('#save-perfil').addEventListener('click', function () { closeAll(); toast('Perfil actualizado. Tu Home se ha adaptado.'); });

  /* ---------- Verificación en dos pasos ---------- */
  var GATED = ['espacio', 'informes', 'evolucion', 'citas', 'servicios'];
  var VERIF = { tel: '600 ** ** 89', email: 'a****@gmail.com' };
  var verifStep = 0, verifCanal = 'sms', verifNext = null, verifCd = null;
  function startCountdown() {
    clearInterval(verifCd);
    var left = 300;
    verifCd = setInterval(function () {
      var el = $('#verif-cd');
      if (!el) { clearInterval(verifCd); return; }
      left--;
      if (left <= 0) { clearInterval(verifCd); el.textContent = 'caducado'; return; }
      el.textContent = Math.floor(left / 60) + ':' + ('0' + (left % 60)).slice(-2);
    }, 1000);
  }

  function renderVerif() {
    $('#verif-progress').innerHTML = [0, 1, 2].map(function (i) {
      return '<i class="' + (i < verifStep ? 'on' : '') + '"></i>';
    }).join('');
    var body = '', foot = '';

    if (verifStep === 0) {
      $('#verif-title').textContent = 'Verifica tu identidad';
      body = '<h4>Antes de entrar, comprobamos que eres tú</h4>' +
        '<p>Te enviamos un código de 6 números. Solo tienes que escribirlo.</p>' +
        '<div class="opts">' +
        '<button class="opt' + (verifCanal === 'sms' ? ' on' : '') + '" data-canal="sms">' +
          '<span class="box ci"></span>Por SMS al ' + VERIF.tel + '</button>' +
        '<button class="opt' + (verifCanal === 'email' ? ' on' : '') + '" data-canal="email">' +
          '<span class="box ci"></span>Por correo a ' + VERIF.email + '</button>' +
        '</div>';
      foot = '<span class="spacer"></span><button class="btn btn-primary" data-verif="enviar">Enviar código</button>';

    } else if (verifStep === 1) {
      $('#verif-title').textContent = 'Escribe el código';
      body = '<h4>Escribe los 6 números</h4>' +
        '<p>Te lo hemos enviado ' + (verifCanal === 'sms' ? 'por SMS al ' + VERIF.tel : 'por correo a ' + VERIF.email) + '.</p>' +
        '<div class="code-row">' + [0,1,2,3,4,5].map(function (i) {
          return '<input class="code" inputmode="numeric" maxlength="1" aria-label="Número ' + (i + 1) + '">';
        }).join('') + '</div>' +
        '<p class="verif-exp"><svg width="15" height="15"><use href="#i-clock"/></svg>' +
          'El código caduca en <b id="verif-cd">5:00</b></p>' +
        '<a href="#" class="test-link" data-verif="reenviar">No me llega el código</a>';
      foot = '<button class="btn btn-ghost" data-verif="atras">' +
        '<svg width="16" height="16"><use href="#i-arrow-left"/></svg>Atrás</button>' +
        '<button class="btn btn-primary" data-verif="comprobar">Verificar</button>';

    } else {
      $('#verif-title').textContent = 'Identidad verificada';
      body = '<h4>Ya tienes acceso a tu información de salud</h4>' +
        '<p>No tendrás que volver a verificarte en este dispositivo.</p>';
      foot = '<span class="spacer"></span><button class="btn btn-primary" data-verif="entrar">Entrar</button>';
    }

    $('#verif-body').innerHTML = body;
    $('#verif-foot').innerHTML = foot;
    if (verifStep === 1) startCountdown(); else clearInterval(verifCd);
    var first = $('#verif-body .code');
    if (first) setTimeout(function () { first.focus(); }, 60);
  }

  function openVerif(next) {
    verifNext = next || 'espacio';
    verifStep = 0;
    $('.scrim').classList.add('open');
    $('#modal-verif').classList.add('open');
    renderVerif();
  }

  function renderVerifUI() {
    var v = state.verificado;
    $('#sc-lock').hidden = v;
    $('#sc-cta-txt').textContent = v ? 'Entrar' : 'Verifica tu identidad';
    $('#mm-lock').hidden = v;
    $('#mm-group-sub').textContent = v
      ? 'Tu información de salud, siempre a mano.'
      : 'Para entrar aquí tienes que verificar tu identidad.';
  }

  document.addEventListener('click', function (e) {
    var canal = e.target.closest('[data-canal]');
    if (canal) { verifCanal = canal.dataset.canal; renderVerif(); return; }
    var b = e.target.closest('[data-verif]');
    if (!b) return;
    e.preventDefault();
    var a = b.dataset.verif;
    if (a === 'enviar') { verifStep = 1; renderVerif(); toast('Código enviado. Puede tardar un minuto.'); }
    else if (a === 'atras') { verifStep = 0; renderVerif(); }
    else if (a === 'reenviar') { toast('Te hemos enviado el código otra vez.'); }
    else if (a === 'comprobar') {
      var code = $$('#verif-body .code').map(function (i) { return i.value.trim(); }).join('');
      if (code.length < 6) { toast('Escribe los 6 números del código.'); return; }
      verifStep = 2; state.verificado = true; save(); renderVerif(); renderVerifUI();
    }
    else if (a === 'entrar') { closeAll(); go(verifNext || 'espacio'); }
  });

  /* saltar de casilla en casilla al escribir el código */
  document.addEventListener('input', function (e) {
    if (!e.target.classList || !e.target.classList.contains('code')) return;
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 1);
    var all = $$('#verif-body .code'), i = all.indexOf(e.target);
    if (e.target.value && i < all.length - 1) all[i + 1].focus();
  });
  document.addEventListener('keydown', function (e) {
    if (!e.target.classList || !e.target.classList.contains('code')) return;
    var all = $$('#verif-body .code'), i = all.indexOf(e.target);
    if (e.key === 'Backspace' && !e.target.value && i > 0) all[i - 1].focus();
  });

  /* ---------- Menú móvil ---------- */
  function openMenu() { $('#mmenu').classList.add('open'); }
  function closeMenu() { $('#mmenu').classList.remove('open'); }
  $('#burger').addEventListener('click', openMenu);
  $('#mmenu-close').addEventListener('click', closeMenu);

  /* ---------- Overlays ---------- */
  function openThing(name) {
    $('.scrim').classList.add('open');
    if (name === 'perfil') { $('#drawer-perfil').classList.add('open'); renderPerfilDrawer(); }
    if (name === 'receta') $('#modal-receta').classList.add('open');
    if (name === 'login')  $('#modal-login').classList.add('open');
  }
  function closeAll() {
    $('.scrim').classList.remove('open');
    closeMenu();
    $('#drawer-perfil').classList.remove('open');
    $$('.modal').forEach(function (m) { m.classList.remove('open'); });
  }
  document.addEventListener('click', function (e) {
    var o = e.target.closest('[data-open]');
    if (o) { e.preventDefault(); openThing(o.dataset.open); return; }
    if (e.target.closest('[data-close-all]')) { e.preventDefault(); closeAll(); }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeAll(); closeNote(); } });

  /* ---------- Navegación ---------- */
  var TITLES = {
    inicio:'Inicio', informes:'Mis informes', evolucion:'Mi evolución', citas:'Mis citas',
    servicios:'Mis servicios', contenidos:'Contenidos', juegos:'Juegos', faq:'Preguntas frecuentes',
    espacio:'Espacio personal'
  };
  function go(route) {
    if (GATED.indexOf(route) >= 0 && !state.verificado) { closeMenu(); openVerif(route); return; }
    closeAll();
    closeMenu();
    $('#navdrop').classList.remove('open');
    var vista = route === 'inicio' ? 'inicio' : (route === 'espacio' ? 'espacio' : 'otra');
    $$('.view').forEach(function (v) { v.classList.toggle('is-active', v.dataset.view === vista); });
    if (vista === 'otra') $('#ph-title').textContent = TITLES[route] || route;
    $$('.mainnav .tab').forEach(function (t) {
      t.classList.toggle('is-active', t.dataset.go === route ||
        (t.closest('.navdrop') && GATED.indexOf(route) >= 0));
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-go]'); if (!a) return;
    e.preventDefault(); go(a.dataset.go);
  });
  $('#navdrop-btn').addEventListener('click', function (e) {
    e.stopPropagation();
    var d = $('#navdrop'); d.classList.toggle('open');
    this.setAttribute('aria-expanded', d.classList.contains('open'));
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('#navdrop')) $('#navdrop').classList.remove('open');
  });

  /* ---------- Banner bienvenida / instalar ---------- */
  if (state.installSeen) $('#install-bar').style.display = 'none';
  $('#install-x').addEventListener('click', function () {
    $('#install-bar').style.display = 'none'; state.installSeen = true; save();
  });
  $('#btn-install').addEventListener('click', function () { toast('Acceso directo añadido a la pantalla de inicio (simulado).'); });
  $('#btn-push').addEventListener('click', function () {
    state.push = true; save();
    toast('Avisos activados: “Amada, hoy toca tu paseo de 20 minutos”.');
  });

  /* ---------- Elsa ---------- */
  var elsaOpen = false;
  function elsaMsg(html, who) {
    var d = document.createElement('div');
    d.className = 'msg ' + (who || 'bot'); d.innerHTML = html;
    $('#elsa-body').appendChild(d);
    $('#elsa-body').scrollTop = 99999;
    return d;
  }
  function elsaTyping(cb) {
    var d = elsaMsg('<span class="typing"><i></i><i></i><i></i></span>');
    setTimeout(function () { d.remove(); cb(); }, 700);
  }
  function elsaAction(label, route) {
    return '<button data-go="' + route + '"><svg><use href="#i-chevron"/></svg>' + label + '</button>';
  }
  var ELSA_RULES = [
    { re: /cita|agend|sofía|sofia|orientad/i, a: function () {
        return 'Tu próxima cita con Sofía es el <strong>14 de septiembre a las 10:30</strong>. ¿Te la abro?' +
          '<span class="act">' + elsaAction('Abrir Mis citas', 'citas') + '</span>'; } },
    { re: /informe|plan de prevenc|resultado/i, a: function () {
        return 'Tienes tu <strong>Plan de Prevención</strong> y dos seguimientos.' +
          '<span class="act">' + elsaAction('Abrir Mis informes', 'informes') + '</span>'; } },
    { re: /evoluci|progreso|gr[áa]fic|c[óo]mo voy|este mes|racha/i, a: function () {
        return 'Este mes llevas un <strong>' + $('#ring-pct').textContent + '</strong> del plan y 12 días de racha.' +
          '<span class="act">' + elsaAction('Abrir Mi evolución', 'evolucion') + '</span>'; } },
    { re: /juego|memoria|pasaporte/i, a: function () {
        return 'Hoy te toca una partida corta de memoria.' +
          '<span class="act">' + elsaAction('Abrir Juegos', 'juegos') + '</span>'; } },
    { re: /receta|comer|cena|comida|nutri/i, a: function () {
        return 'Puedo proponerte una receta con lo que tengas en casa.' +
          '<span class="act"><button data-open="receta"><svg><use href="#i-spark"/></svg>Abrir el creador de recetas</button></span>'; } },
    { re: /dorm|sue[ñn]o|descans/i, a: function () {
        return 'Anoche marcaste que dormiste regular. Te dejo la pauta de relajación de la noche y, si quieres, lo hablamos con Sofía.' +
          '<span class="act">' + elsaAction('Ver contenidos de descanso', 'contenidos') + '</span>'; } },
    { re: /servicio|fisio|ayuda a domicilio/i, a: function () {
        return 'Tienes servicios adicionales disponibles según tu plan.' +
          '<span class="act">' + elsaAction('Abrir Mis servicios', 'servicios') + '</span>'; } }
  ];
  function elsaReply(txt) {
    for (var i = 0; i < ELSA_RULES.length; i++) if (ELSA_RULES[i].re.test(txt)) return ELSA_RULES[i].a();
    return 'Puedo ayudarte con tus citas, tus informes, tu evolución, los juegos o una receta. También puedo abrirte la pantalla directamente.' +
      '<span class="act">' + elsaAction('Ir a Mis citas', 'citas') + elsaAction('Ir a Mis informes', 'informes') + '</span>';
  }
  function elsaSend(txt) {
    if (!txt.trim()) return;
    elsaMsg(txt.replace(/</g, '&lt;'), 'me');
    $('#elsa-text').value = '';
    elsaTyping(function () {
      var html = elsaReply(txt);
      elsaMsg(html);
      if (state.voz && 'speechSynthesis' in window) {
        var u = new SpeechSynthesisUtterance(html.replace(/<[^>]+>/g, ' '));
        u.lang = 'es-ES'; window.speechSynthesis.speak(u);
      }
    });
  }
  /* el panel cuelga de la barra, como el desplegable de un buscador */
  function placeElsa() {
    var p = $('#elsa-panel');
    if (!p.classList.contains('open')) return;
    if (window.innerWidth <= 720) { p.style.cssText = ''; return; }
    var r = $('#ai-bar').getBoundingClientRect();
    var minTop = 64 + 56 + 12;
    var top = Math.max(minTop, r.bottom + 10);
    p.style.transform = 'none';
    p.style.top = top + 'px';
    p.style.left = r.left + 'px';
    p.style.width = Math.min(r.width, 660) + 'px';
    p.style.height = Math.min(560, window.innerHeight - top - 20) + 'px';
  }
  window.addEventListener('scroll', placeElsa, { passive: true });
  window.addEventListener('resize', placeElsa);

  function openElsa() {
    $('#elsa-panel').classList.add('open');
    placeElsa();
    if (!elsaOpen) {
      elsaOpen = true;
      elsaMsg('Hola Amada, soy <strong>Elsa</strong>. Puedo resolverte dudas y abrirte cualquier pantalla del portal. ' +
              'Si prefieres, pulsa el micro y hablamos.');
      $('#elsa-sugg').innerHTML = ['¿Cuándo es mi próxima cita?', '¿Cómo voy este mes?', 'Dame una receta', 'No duermo bien']
        .map(function (s) { return '<button data-sugg="' + s + '">' + s + '</button>'; }).join('');
    }
  }
  $('#footer-elsa').addEventListener('click', function (e) {
    e.preventDefault(); openElsa(); $('#elsa-text').focus();
  });
  $('#elsa-close').addEventListener('click', function () {
    $('#elsa-panel').classList.remove('open');
  });

  /* ---------- Barra de chat del header (buscador de la app) ---------- */
  var PROMPTS = [
    '¿Cuándo es mi próxima cita?',
    '¿Cómo voy este mes?',
    'Dame una receta con lo que tengo en casa',
    'Esta noche he dormido mal…',
    'Enséñame mi Plan de Prevención',
    '¿Qué juego me toca hoy?',
    'Quiero hablar con Sofía'
  ];
  var aiBar = $('#ai-bar'), aiInput = $('#ai-input'), rotIdx = 0, rotTimer = null;

  function phText(p) {
    return window.innerWidth <= 720 ? '“' + p + '”' : 'Pregúntale a Elsa: “' + p + '”';
  }
  function rotatePlaceholder() {
    aiInput.style.transition = 'opacity .25s';
    aiInput.style.opacity = '0';
    setTimeout(function () {
      rotIdx = (rotIdx + 1) % PROMPTS.length;
      aiInput.placeholder = phText(PROMPTS[rotIdx]);
      aiInput.style.opacity = '1';
    }, 250);
  }
  function startRotation() {
    aiInput.placeholder = phText(PROMPTS[rotIdx]);
    clearInterval(rotTimer);
    rotTimer = setInterval(rotatePlaceholder, 3800);
  }
  function stopRotation() { clearInterval(rotTimer); aiInput.style.opacity = '1'; }

  $('#ai-sugg').innerHTML = '<p class="head">Prueba a preguntarle</p>' +
    PROMPTS.slice(0, 5).map(function (p) {
      return '<button data-aisugg="' + p + '"><svg><use href="#i-spark"/></svg>' + p + '</button>';
    }).join('');

  function aiSend(txt) {
    if (!txt.trim()) { aiInput.focus(); return; }
    openElsa();
    elsaSend(txt);
    aiInput.value = '';
    aiInput.blur();
    aiBar.classList.remove('focus');
  }
  aiInput.addEventListener('focus', function () {
    aiBar.classList.add('focus');
    stopRotation();
    aiInput.placeholder = 'Escribe tu pregunta…';
  });
  aiInput.addEventListener('blur', function () {
    setTimeout(function () {
      if (aiBar.contains(document.activeElement)) return;
      aiBar.classList.remove('focus');
      if (!aiInput.value) startRotation();
    }, 160);
  });
  aiInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') aiSend(this.value); });
  $('#ai-go').addEventListener('click', function () { aiSend(aiInput.value); });
  document.addEventListener('mousedown', function (e) {
    var s = e.target.closest('[data-aisugg]'); if (!s) return;
    e.preventDefault(); aiSend(s.dataset.aisugg);
  });
  $('#ai-mic').addEventListener('click', function () {
    var self = this;
    self.classList.add('is-on');
    toast('Escuchando… (modo audio, simulado)');
    setTimeout(function () { self.classList.remove('is-on'); aiSend('¿Cuándo es mi próxima cita?'); }, 1400);
  });
  startRotation();
  $('#elsa-send').addEventListener('click', function () { elsaSend($('#elsa-text').value); });
  $('#elsa-text').addEventListener('keydown', function (e) { if (e.key === 'Enter') elsaSend(this.value); });
  document.addEventListener('click', function (e) {
    var s = e.target.closest('[data-sugg]'); if (s) elsaSend(s.dataset.sugg);
  });
  $('#elsa-mic').addEventListener('click', function () {
    this.classList.toggle('is-on');
    if (this.classList.contains('is-on')) {
      toast('Escuchando… (modo audio, simulado)');
      var self = this;
      setTimeout(function () { self.classList.remove('is-on'); elsaSend('¿Cuándo es mi próxima cita?'); }, 1400);
    }
  });
  $('#elsa-audio').addEventListener('click', function () {
    state.voz = !state.voz; save();
    toast(state.voz ? 'Elsa te responderá también en voz alta.' : 'Respuestas por voz desactivadas.');
  });
  $('#footer-recetas').addEventListener('click', function (e) {
    e.preventDefault(); go('inicio');
    setTimeout(function () { $('#recipe-grid').scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 200);
  });
  /* ---------- Anotaciones ---------- */
  function buildPins() {
    $$('.has-note').forEach(function (el) {
      var key = el.dataset.note;
      if (!NOTES[key] || el.querySelector('.pin')) return;
      var n = NOTE_ORDER.indexOf(key) + 1;
      var pin = document.createElement('span');
      pin.className = 'pin'; pin.textContent = n; pin.dataset.pin = key;
      el.appendChild(pin);
    });
    $('#notes-n').textContent = '(' + NOTE_ORDER.length + ')';
  }
  function closeNote() { $('#note-pop').classList.remove('open'); }
  document.addEventListener('click', function (e) {
    var p = e.target.closest('[data-pin]');
    if (!p) { if (!e.target.closest('#note-pop')) closeNote(); return; }
    e.preventDefault(); e.stopPropagation();
    var n = NOTES[p.dataset.pin];
    var pop = $('#note-pop');
    pop.innerHTML = '<b>' + n[0] + '</b>' + n[1];
    pop.classList.add('open');
    var r = p.getBoundingClientRect();
    var left = Math.min(Math.max(8, r.left), window.innerWidth - 300);
    pop.style.left = left + 'px';
    pop.style.top = Math.min(r.bottom + 8, window.innerHeight - 160) + 'px';
  });
  $('#notes-toggle').addEventListener('click', function () {
    document.body.classList.toggle('notes-on');
    var on = document.body.classList.contains('notes-on');
    this.textContent = on ? '✕ Ocultar cambios ' : '📝 Ver cambios ';
    var s = document.createElement('span'); s.id = 'notes-n'; s.textContent = '(' + NOTE_ORDER.length + ')';
    this.appendChild(s);
    if (on) toast('Cada número marca un cambio propuesto. Pulsa uno para leerlo.');
    else closeNote();
  });

  /* ---------- Init ---------- */
  renderOP(); renderPlan(); renderWeeks(); renderLegal(); renderVerifUI(); applyState(); buildStateBar(); buildPins();
  if (state.big) document.body.style.fontSize = '17px';

  /* atajo: ?reset limpia el estado guardado */
  if (location.search.indexOf('reset') >= 0) { localStorage.removeItem(LS); location.replace(location.pathname); }
})();
