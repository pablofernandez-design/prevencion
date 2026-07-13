/* Doble Decisión — motor del prototipo
   Un mismo motor para desktop / tablet / mobile.
   El dispositivo se define en window.DEVICE = "desktop" | "tablet" | "mobile" */

(function () {
  "use strict";

  const DEVICE = window.DEVICE || "desktop";
  const CONFIG = {
    desktop: { portrait: [1440, 1024], landscape: [1440, 1024], rotates: false },
    tablet:  { portrait: [744, 1133],  landscape: [1133, 744],  rotates: true },
    mobile:  { portrait: [390, 844],   landscape: [844, 390],   rotates: true },
  }[DEVICE];

  // 8 rondas por defecto; ?rounds=N permite acortar la partida (útil para revisar)
  const ROUNDS = parseInt(new URLSearchParams(location.search).get("rounds"), 10) || 8;
  const OBJECTS = ["🍎","🍌","🍊","🍇","🍓","🍍","🥝","🥑","🍅","🥦","🥕","🍋","🫐","🍑","🌽","🍒"];

  const device = document.getElementById("device");
  device.classList.add(DEVICE);

  const PERIPH_ICON = "⭐️";   // el objeto periférico es siempre una estrella

  // ---------- state ----------
  const state = {
    round: 0,
    scoreCentral: 0,
    scorePeriph: 0,
    roundCentralOK: false,
    stimMs: 500,          // duración del estímulo: 500ms → baja hasta 80ms según aciertos
    plan: [],
  };

  function rand(n){ return Math.floor(Math.random()*n); }
  function pick(arr){ return arr[rand(arr.length)]; }

  function buildPlan(){
    state.plan = [];
    for (let i=0;i<ROUNDS;i++){
      const central = pick(OBJECTS);
      let distractor = pick(OBJECTS);
      while (distractor === central) distractor = pick(OBJECTS);
      state.plan.push({
        central,
        distractor,
        centralLeft: Math.random() < 0.5,      // posición de la respuesta correcta
        zone: rand(8),                          // 0..7 sector donde aparece el periférico
      });
    }
  }

  // ---------- frame sizing ----------
  let orientation = "portrait";
  function setOrientation(o){
    orientation = o;
    const [w,h] = CONFIG[o];
    device.style.width = w + "px";
    device.style.height = h + "px";
    device.classList.toggle("landscape", o === "landscape");
    device.classList.toggle("portrait", o === "portrait");
    fit();
  }
  function fit(){
    const [w,h] = CONFIG[orientation];
    const availW = window.innerWidth - 48;
    const availH = window.innerHeight - 96;
    const scale = Math.min(availW / w, availH / h, 1.2);
    device.style.transform = "scale(" + scale + ")";
  }
  window.addEventListener("resize", fit);

  // ---------- render helpers ----------
  function backSvg(){
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>';
  }
  function backArrow(){
    return '<button class="back" data-action="home" title="Volver">' + backSvg() + '</button>';
  }
  function topbar(label, noBack){
    return '<div class="topbar">' + (noBack ? '' : backArrow()) + '<span class="crumb">' + label + '</span></div>';
  }
  // Barra blanca de breadcrumb (componente "Header Juego") — sólo home / instrucciones / desktop
  function breadcrumb(label){
    return '<div class="topbar floating">' + backArrow() + '<span class="crumb">' + label + '</span></div>';
  }
  // Header de las pantallas de juego (componente "Doble Decisión - Header game").
  // Desktop: barra blanca de breadcrumb + fila transparente (pill + badge).
  // Mobile / Tablet: SÓLO fila transparente con botón circular de volver + pill + badge (sin barra blanca).
  function gameHead(pill, badge){
    const round = badge || ('Ronda ' + (state.round+1) + ' / ' + ROUNDS);
    if (DEVICE === "desktop"){
      return breadcrumb("Juegos / Doble Decisión")
        + '<div class="hgame">'
        + (pill ? '<div class="g-pill">' + pill + '</div>' : '')
        + '<div class="g-round">' + round + '</div>'
        + '</div>';
    }
    return '<div class="hgame solo">'
      + '<button class="cback" data-action="home" title="Volver">' + backSvg() + '</button>'
      + (pill ? '<div class="g-pill">' + pill + '</div>' : '')
      + '<div class="g-round">' + round + '</div>'
      + '</div>';
  }
  function footer(){
    return '<div class="footer"><span class="brand">Qida</span>'
      + '<span class="links"><span>Términos y condiciones</span><span>Privacidad</span><span>Ayuda</span></span></div>';
  }
  let timers = [];
  function clearTimers(){ timers.forEach(clearTimeout); timers = []; }
  function later(fn, ms){ const t = setTimeout(fn, ms); timers.push(t); return t; }

  function render(html){
    clearTimers();
    device.innerHTML = html;
    device.querySelectorAll("[data-action]").forEach(el=>{
      el.addEventListener("click", ()=>handleAction(el.dataset.action, el));
    });
  }

  function handleAction(action, el){
    switch(action){
      case "home": go("home"); break;
      case "instructions": go("instructions"); break;
      case "start": startGame(); break;
      case "rotate-continue": go("round-intro"); break;
      case "play-video": playVideo(el); break;
    }
  }

  // ---------- screens ----------
  const screens = {};

  screens.home = function(){
    setOrientation("portrait");
    render(
      topbar("Juegos / Doble Decisión", true) +
      '<div class="body"><div class="home">' +
        '<div class="home-illus"></div>' +
        '<div class="home-main">' +
          '<h1 class="title">Doble Decisión</h1>' +
          '<p class="sub">Entrena tu mente para reaccionar más rápido y estar más alerta en tu día a día.</p>' +
          '<div class="dcards">' +
            '<div class="dcard"><div class="eyebrow">Nueva partida</div>' +
              '<div class="dtext">Entrena tu atención con una nueva partida de Doble Decisión</div>' +
              '<button class="btn primary block" data-action="start">Comenzar partida</button></div>' +
            '<div class="dcard"><div class="eyebrow">¿Cómo jugar?</div>' +
              '<div class="dtext">Descubre las reglas de juego de Doble Decisión.</div>' +
              '<button class="btn ghost block" data-action="instructions">Ver instrucciones</button></div>' +
          '</div>' +
        '</div>' +
      '</div></div>' +
      footer()
    );
  };

  screens.instructions = function(){
    setOrientation("portrait");
    render(
      topbar(DEVICE === "mobile" ? "Instrucciones" : "Juegos / Doble Decisión / Instrucciones") +
      '<div class="body"><div class="instr">' +
        '<h1 class="page-title">Instrucciones</h1>' +
        '<p class="sub">Descubre las reglas de juego de Doble Decisión.</p>' +
        '<div class="video" data-action="play-video">' +
          '<div class="play"></div>' +
          '<div class="cap">Vídeo · Cómo jugar a Doble Decisión</div>' +
          '<div class="bar"></div>' +
        '</div>' +
        '<div class="cta"><button class="btn primary" data-action="start">Comenzar partida</button>' +
        '<button class="btn ghost" data-action="home">Volver</button></div>' +
      '</div></div>' +
      footer()
    );
  };

  function playVideo(box){
    const bar = box.querySelector(".bar");
    const cap = box.querySelector(".cap");
    const play = box.querySelector(".play");
    if (play) play.style.display = "none";
    cap.textContent = "Reproduciendo vídeo de instrucciones…";
    let p = 0;
    const iv = setInterval(()=>{
      p += 2; bar.style.width = p + "%";
      if (p >= 100){ clearInterval(iv); cap.textContent = "Vídeo finalizado · Pulsa «Comenzar partida»"; }
    }, 80);
  }

  function startGame(){
    buildPlan();
    state.round = 0;
    state.scoreCentral = 0;
    state.scorePeriph = 0;
    state.stimMs = 500;
    if (CONFIG.rotates) go("rotate");
    else go("round-intro");
  }

  screens.rotate = function(){
    setOrientation("portrait");
    render(
      '<div class="screen game"><div class="rotate">' +
        '<div class="phone"></div>' +
        '<h2>Gira la pantalla</h2>' +
        '<p>Para jugar a Doble Decisión coloca tu dispositivo en horizontal.</p>' +
        '<button class="btn primary" data-action="rotate-continue">Continuar</button>' +
      '</div></div>'
    );
  };

  screens["round-intro"] = function(){
    setOrientation("landscape");
    const last = state.round === ROUNDS-1;
    const label = last ? "Ronda final" : ("Ronda " + (state.round+1));
    render(
      '<div class="screen photo"><div class="bg"></div>' +
        gameHead(null) +
        '<div class="center-wrap"><div class="round-card">' + label + '</div></div>' +
      '</div>'
    );
    later(()=>go("countdown"), 1200);
  };

  screens.countdown = function(){
    setOrientation("landscape");
    render(
      '<div class="screen photo"><div class="bg"></div>' +
        gameHead("Fija la vista en el punto central") +
        '<div class="center-wrap"><div class="count-circle">3</div></div>' +
      '</div>'
    );
    const circle = device.querySelector(".count-circle");
    let n = 3;
    function tick(){
      if (n === 0){ go("stimulus"); return; }
      circle.textContent = n;
      circle.style.animation = "none";
      void circle.offsetWidth;            // reinicia la animación pop
      circle.style.animation = "pop 1s ease";
      n--; later(tick, 1000);
    }
    tick();
  };

  // ángulos de los 8 sectores (centro de cada cuña), 0° = derecha, sentido horario
  function zoneAngle(z){ return (z*45 + 22.5) * Math.PI/180; }

  screens.stimulus = function(){
    setOrientation("landscape");
    const r = state.plan[state.round];
    const [w,h] = CONFIG.landscape;
    const ang = zoneAngle(r.zone);
    const rad = Math.min(w,h) * 0.36;
    const px = 50 + Math.cos(ang)*rad/w*100;
    const py = 50 + Math.sin(ang)*rad/h*100;
    // Imagen nítida (sin blur). El icono va tal cual sobre el fondo, sin card blanca.
    render(
      '<div class="screen photo sharp"><div class="bg"></div>' +
        gameHead(null) +
        '<div class="stim-layer"></div>' +
      '</div>'
    );
    const layer = device.querySelector(".stim-layer");
    // 1) Fondo con sólo imagen · 0,5 s
    later(function(){
      // 2) Se muestran los estímulos · stimMs (máx 500ms, baja hasta 80ms según performance)
      layer.innerHTML =
        '<div class="stim-central">' + r.central + '</div>' +
        '<div class="stim-periph" style="left:' + px + '%;top:' + py + '%">' + PERIPH_ICON + '</div>';
      later(function(){
        layer.innerHTML = "";           // ocultar estímulos
        // 3) Fondo con sólo imagen · 2 s
        later(function(){ go("choose-central"); }, 2000);
      }, state.stimMs);
    }, 500);
  };

  screens["choose-central"] = function(){
    setOrientation("landscape");
    const r = state.plan[state.round];
    const left = r.centralLeft ? r.central : r.distractor;
    const right = r.centralLeft ? r.distractor : r.central;
    render(
      '<div class="screen photo"><div class="bg"></div>' +
        gameHead("¿Qué había en el centro?") +
        '<div class="choice-wrap">' +
          '<div class="choice" data-side="L"><div class="obj">' + left + '</div></div>' +
          '<div class="choice" data-side="R"><div class="obj">' + right + '</div></div>' +
        '</div>' +
      '</div>'
    );
    // Hover / pressed = CSS (sólo desktop). Al elegir se muestra success/error en la card.
    device.querySelectorAll(".choice").forEach(c=>{
      c.addEventListener("click", ()=>{
        const chosen = c.dataset.side === "L" ? left : right;
        const ok = chosen === r.central;
        state.roundCentralOK = ok;
        if (ok) state.scoreCentral++;
        device.querySelectorAll(".choice").forEach(x=>x.style.pointerEvents="none");
        c.classList.add(ok ? "success" : "error");
        later(()=>go("choose-peripheral"), 800);
      });
    });
  };

  screens["choose-peripheral"] = function(){
    setOrientation("landscape");
    const r = state.plan[state.round];
    const [w,h] = CONFIG.landscape;
    const cx = w/2, cy = h/2, R = Math.hypot(w,h);
    let sectors = "";
    for (let z=0; z<8; z++){
      const a1 = (z*45) * Math.PI/180;
      const a2 = ((z+1)*45) * Math.PI/180;
      const p1 = (cx + Math.cos(a1)*R) + "," + (cy + Math.sin(a1)*R);
      const p2 = (cx + Math.cos(a2)*R) + "," + (cy + Math.sin(a2)*R);
      sectors += '<polygon class="sector" data-zone="' + z + '" points="' + cx + ',' + cy + ' ' + p1 + ' ' + p2 + '"/>';
    }
    render(
      '<div class="screen photo"><div class="bg"></div>' +
        '<div class="radial"><svg viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none">' + sectors + '</svg></div>' +
        gameHead("¿Dónde estaba el objeto?") +
      '</div>'
    );
    // La grid no se dibuja (sólo el fondo con blur). Desktop: hover blanco 50% + pressed.
    // Al seleccionar se muestra success (verde) o error (rojo) en el momento.
    device.querySelectorAll(".sector").forEach(s=>{
      s.addEventListener("click", ()=>{
        const selected = parseInt(s.dataset.zone,10);
        const ok = selected === r.zone;
        if (ok) state.scorePeriph++;
        // Bloquea el hover una vez seleccionado: sólo se muestra success/error.
        const radial = device.querySelector(".radial");
        if (radial) radial.classList.add("done");
        device.querySelectorAll(".sector").forEach(x=>x.style.pointerEvents="none");
        s.classList.add(ok ? "success" : "error");
        // Adaptar la duración del estímulo: si acierta toda la ronda, baja hasta 80ms.
        if (state.roundCentralOK && ok) state.stimMs = Math.max(80, state.stimMs - 60);
        else state.stimMs = Math.min(500, state.stimMs + 60);
        later(()=>go("round-end"), 800);
      });
    });
  };

  // No hay pantalla de "ronda terminada": sólo la imagen con blur durante 2 s.
  screens["round-end"] = function(){
    setOrientation("landscape");
    const last = state.round === ROUNDS-1;
    render('<div class="screen photo"><div class="bg"></div>' + gameHead(null) + '</div>');
    later(()=>{
      if (last) go("results");
      else { state.round++; go("round-intro"); }
    }, 2000);
  };

  screens.results = function(){
    setOrientation("landscape");   // los resultados finales se ven en horizontal en todos los dispositivos
    const total = state.scoreCentral + state.scorePeriph;
    const pct = Math.round(total / (2*ROUNDS) * 100);
    const msg = pct >= 80 ? "¡Enhorabuena!" : pct >= 50 ? "¡Buen trabajo!" : "¡Sigue practicando!";
    render(
      '<div class="screen photo"><div class="bg"></div>' +
        gameHead("Resultados de la partida", "Fin de la partida") +
        '<div class="center-wrap"><div class="rcard">' +
          '<div class="rcard-row">' +
            '<div class="rtotal">' +
              '<div class="lbl">Puntuación total</div>' +
              '<div class="pct">' + pct + '%</div>' +
              '<div class="msg">' + msg + '<br>Has completado ' + ROUNDS + ' de ' + ROUNDS + '</div>' +
            '</div>' +
            '<div class="rcol">' +
              '<div class="rstat"><div class="lbl">Objeto central</div><div class="val">' + state.scoreCentral + ' de ' + ROUNDS + '</div></div>' +
              '<div class="rstat"><div class="lbl">Objeto periférico</div><div class="val">' + state.scorePeriph + ' de ' + ROUNDS + '</div></div>' +
            '</div>' +
          '</div>' +
          '<div class="rbtns">' +
            '<button class="btn primary" data-action="start">Jugar de nuevo</button>' +
            '<button class="btn ghost" data-action="home">Salir</button>' +
          '</div>' +
        '</div></div>' +
      '</div>'
    );
  };

  function go(name){ (screens[name] || screens.home)(); }

  // ---------- boot ----------
  buildPlan();
  go("home");
})();
