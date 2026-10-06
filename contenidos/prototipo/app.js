/* Prototipo Contenidos · Portal del Cliente
   Sigue los diseños de Figma (página Contenidos): página principal, listados por tipo y selector de categorías
   (pantalla completa en mobile, modal en tablet y desktop). Se navega por el propio flujo.
   No incluye el detalle de cada contenido. */

const A = "assets/";

// ---------- Datos (los de Figma) ----------
// tint = fondo de «Novedades - Categorías · Tag de novedades»
const CATS = [
  { n: "Actividad física", f: "actividad-fisica", tint: "#f8f4e8" },
  { n: "Mente activa", f: "mente-activa", tint: "#dbeeec" },
  { n: "Alcohol", f: "alcohol", tint: "#e7f0f5" },
  { n: "Sueño", f: "sueno", tint: "#ebeaf3" },
  { n: "Alimentación", f: "alimentacion", tint: "#ecf1e0" },
  { n: "Tabaco", f: "tabaco", tint: "#e7f0f5" },
  { n: "Detección precoz", f: "deteccion-precoz", tint: "#e3f4f6" },
  { n: "Cuidado auditivo", f: "cuidado-auditivo", tint: "#f6e9e3" },
  { n: "Bienestar emocional", f: "bienestar-emocional", tint: "#f0e5ee" },
  { n: "Participación social", f: "participacion-social", tint: "#f5e6e6" },
  { n: "Neuroinfo", f: "neuroinfo", tint: "#e8eaf6" },
  { n: "Cuidado ocular", f: "cuidado-ocular", tint: "#f6e9e3" },
  { n: "Nuevas líneas de investigación", f: "nuevas-lineas", tint: "#f8e7ec" },
];
const CAT = Object.fromEntries(CATS.map(c => [c.n, c]));

const TYPES = {
  articulos: { name: "Artículos", icon: "type-articulo.svg", sub: "Aprende y cuida tu salud a tu ritmo.", filter: true },
  fichas: { name: "Fichas", icon: "type-ficha.svg", filter: true },
  recetas: { name: "Recetas saludables", icon: "type-receta.svg", filter: false },
  videos: { name: "Vídeos", icon: "type-video.svg", filter: true },
};
const ORDER = ["articulos", "fichas", "recetas", "videos"];

const ITEMS = [
  { type: "articulos", cat: "Actividad física", title: "La importancia de la detección temprana en el adulto mayor", date: "26/08/2026", cta: "Saber más", img: "deteccion-temprana.png" },
  { type: "articulos", cat: "Neuroinfo", title: "La tecnología como facilitadora de las actividades de la vida diaria", date: "26/08/2026", cta: "Saber más", img: "tecnologia.png" },
  { type: "fichas", cat: "Bienestar emocional", title: "8 estrategias efectivas para la autorregulación emocional", date: "26/08/2026", cta: "Ver ficha", img: null },
  { type: "fichas", cat: "Mente activa", title: "Ejercicio de atención y concentración", date: "26/08/2026", cta: "Ver ficha", img: null },
  { type: "recetas", cat: "Alimentación", title: "Tacos de pescado con repollo y salsa de yogur", date: "26/08/2026", cta: "Ver receta", img: "tacos.jpg" },
  { type: "recetas", cat: "Alimentación", title: "Gazpacho de sandía: receta ligera de verano", date: "26/08/2026", cta: "Ver receta", img: "gazpacho.png" },
  { type: "videos", cat: "Detección precoz", title: "[Webinar] El Alzheimer: causas, detección y prevención", date: "26/08/2026", cta: "Ver vídeo", img: "webinar-alzheimer.png" },
];
// Novedades de la página principal (Figma): 3 en desktop, 2 en tablet y mobile.
// El texto del botón cambia: en mobile los dos son «Saber más».
const NOVEDADES = [
  { ...ITEMS[0], cta: "Acceder", ctaM: "Saber más" },
  { ...ITEMS[1] },
  { ...ITEMS[5], cta: "Acceder", onlyDesktop: true },
];

// ---------- Estado (solo en memoria: cada carga empieza sin filtros) ----------
// filtros[tipo]: [] = todas las categorías. sel: selector abierto { type, draft:Set }.
const S = { filtros: {}, sel: null, drawer: false };

const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
// ---------- Vista (mobile · tablet · desktop) ----------
// Se elige con el FAB; la primera vez se deduce del ancho de la ventana.
const VIEWS = [["mobile", "Mobile"], ["tablet", "Tablet"], ["desktop", "Desktop"]];
let view;
try { view = localStorage.getItem("proto-contenidos-vista"); } catch (e) {}
if (!VIEWS.some(v => v[0] === view)) view = innerWidth < 744 ? "mobile" : innerWidth < 1200 ? "tablet" : "desktop";
document.documentElement.dataset.view = view;
const isMobile = () => view === "mobile";
let fabOpen = false;
function renderFab() {
  let el = document.getElementById("fab");
  if (!el) { el = document.createElement("div"); el.id = "fab"; el.className = "fab"; document.body.appendChild(el); }
  el.hidden = !!S.sel && isMobile(); // no tapar «Aplicar categoría»
  el.innerHTML = `${fabOpen ? `<div class="fab-menu" role="menu" aria-label="Vista del prototipo">${VIEWS.map(([k, l]) => `<button role="menuitemradio" aria-checked="${k === view}" data-view="${k}"><img src="${A}dev-${k}.svg" alt="">${l}</button>`).join("")}</div>` : ""}
    <button class="fab-btn" id="fab-btn" aria-label="Cambiar vista del prototipo (ahora ${view})" aria-expanded="${fabOpen}"><img src="${A}fab-devices.svg" alt=""></button>`;
}
function setView(v) {
  view = v; document.documentElement.dataset.view = v;
  try { localStorage.setItem("proto-contenidos-vista", v); } catch (e) {}
  S.drawer = false; fabOpen = false; render(); scrollTo(0, 0);
}
const filtro = t => S.filtros[t] || [];
const visibles = t => { const f = filtro(t); return ITEMS.filter(i => i.type === t && (!f.length || f.includes(i.cat))); };

// ---------- Piezas comunes ----------
function chrome() {
  const item = (href, icon, label, on) => `<a href="${href}" class="${on ? "on" : ""}" ${on ? 'aria-current="page"' : ""}><img src="${A}${icon}" alt="">${label}</a>`;
  const items = [
    item("#espacio-personal", "nav-user.svg", "Espacio personal", false),
    item("#contenidos", "nav-grid.svg", "Contenidos", true),
    item("#juegos", "nav-games.svg", "Juegos", false),
  ].join("");
  return `
  <header>
    <div class="portal-header">
      <a href="#contenidos" aria-label="Qida · Contenidos"><img class="logo" src="${A}logo-qida.svg" alt="Qida"><img class="logo-m" src="${A}logo-qida-mobile.svg" alt="Qida"></a>
      <div class="icons" aria-hidden="true">
        <img src="${A}help.svg" alt=""><img src="${A}phone.svg" alt=""><img src="${A}chat.svg" alt=""><img src="${A}settings.svg" alt=""><img class="avatar" src="${A}avatar.svg" alt="">
      </div>
      <div class="m-icons">
        <button class="only-m" data-toast="Aquí se abriría el chat con Qida." aria-label="Chat"><img src="${A}m-chat.svg" alt=""></button>
        <button class="only-m" data-toast="Aquí se llamaría a Qida." aria-label="Llamar"><img src="${A}m-phone.svg" alt=""></button>
        <button id="menu-btn" aria-label="${S.drawer ? "Cerrar" : "Abrir"} menú" aria-expanded="${S.drawer}"><img src="${A}m-menu.svg" alt=""></button>
      </div>
    </div>
    <nav class="nav" aria-label="Principal">${items}</nav>
    ${S.drawer ? `<nav class="drawer" aria-label="Menú">${items}</nav>` : ""}
  </header>`;
}

function titleBlock(crumbs, title, sub, back) {
  const sep = `<img src="${A}chevron-right.svg" alt="" aria-hidden="true">`;
  const nav = `<nav class="crumbs" aria-label="Migas de pan">${crumbs.map((c, i) => (i === crumbs.length - 1 ? `<span class="cur" aria-current="page">${c[0]}</span>` : `<a href="${c[1]}">${c[0]}</a>${sep}`)).join("")}</nav>`;
  const b = back ? `<a class="back" href="${back}" aria-label="Volver"><img src="${A}chevron-left.svg" alt=""></a>` : "";
  return `<div class="wrap title-block">${nav}<div class="heading"><h1 class="t-h3">${b}${title}</h1>${sub ? `<p class="sub">${sub}</p>` : ""}</div></div>`;
}

const tag = cat => { const c = CAT[cat]; return `<span class="tag" style="--tint:${c.tint}"><img src="${A}cat/${c.f}.svg" alt="">${esc(cat)}</span>`; };

function contentCard(i) {
  const T = TYPES[i.type];
  const cta = i.ctaM ? `<span class="cta-d">${i.cta}</span><span class="cta-m">${i.ctaM}</span>` : i.cta;
  return `<article class="ccard${i.onlyDesktop ? " only-d" : ""}">
    <div class="img" ${i.img ? `style="background-image:url('${A}${i.img}')"` : ""}>
      <span class="badge"><img src="${A}${T.icon}" alt="${T.name}"></span>
    </div>
    <div class="body">
      <div class="top">${tag(i.cat)}<h3 class="t-title-sm">${esc(i.title)}</h3></div>
      <div class="foot"><span class="t-sm c-700">${i.date}</span>
        <button class="cta" data-toast="Aquí se abriría «${esc(i.title)}». El detalle no forma parte de este prototipo.">${cta}<img src="${A}arrow-right.svg" alt=""></button></div>
    </div>
  </article>`;
}

// ---------- Página principal ----------
function pantallaHub() {
  return `${chrome()}
  <main class="page hub" id="main">
    ${titleBlock([["Inicio", "#inicio"], ["Contenidos"]], "Contenidos", "Aprende y cuida tu salud a tu ritmo.")}
    <div class="wrap content">
      <div class="types">${ORDER.map(t => `<a class="type-card" href="#${t}"><img src="${A}${TYPES[t].icon}" alt=""><span>${TYPES[t].name}</span></a>`).join("")}</div>
      <section class="novedades"><h2 class="t-title-md">Novedades</h2><div class="grid">${NOVEDADES.map(contentCard).join("")}</div></section>
    </div>
  </main>`;
}

// ---------- Listado ----------
function fieldLabel(t) {
  const f = filtro(t);
  if (!f.length || f.length === CATS.length) return `<span>Todas las categorías</span>`;
  if (f.length === 1) return `<span>${tag(f[0])}</span>`;
  return `<span>${f.length} categorías seleccionadas</span>`;
}

function pantallaLista(t) {
  const T = TYPES[t], list = visibles(t);
  const vacio = `<div class="empty"><p class="t-title-md">No hay contenidos de estas categorías</p><p class="t-sm c-700">Prueba con otras categorías.</p></div>`;
  return `${chrome()}
  <main class="page" id="main">
    ${titleBlock([["Inicio", "#inicio"], ["Contenidos", "#contenidos"], [T.name]], T.name, T.sub, "#contenidos")}
    <div class="wrap content">
      ${T.filter ? `<button class="field" id="open-sel" aria-haspopup="dialog">${fieldLabel(t)}<img src="${A}chevron-right.svg" alt=""></button>` : ""}
      ${list.length ? `<div class="grid">${list.map(contentCard).join("")}</div>` : vacio}
    </div>
  </main>`;
}

// ---------- Selector de categorías ----------
function selectorInner() {
  const { draft } = S.sel;
  const all = draft.size === CATS.length;
  return `<button class="check" role="checkbox" aria-checked="${all}" id="sel-all"><span class="cb"><span class="box"></span></span>Seleccionar todo</button>
    <div class="cats">${CATS.map(c => `<button class="cat" aria-pressed="${draft.has(c.n)}" data-cat="${esc(c.n)}"><img src="${A}cat/${c.f}.svg" alt=""><span class="txt"><span class="t-md-m">${c.n}</span><span class="t-sm c-700">10 contenidos</span></span></button>`).join("")}</div>`;
}
const applyBtn = cls => `<button class="btn btn-primary ${cls}" id="sel-apply" ${S.sel.draft.size ? "" : "disabled"}>Aplicar categoría</button>`;

function selectorMobile() {
  return `<div class="sel-screen" role="dialog" aria-modal="true" aria-labelledby="sel-title">
    <div class="sel-head"><button id="sel-close" aria-label="Volver"><img src="${A}chevron-left.svg" alt=""></button><h1 class="t-h3" id="sel-title">Categorías</h1></div>
    <div class="sel-body">${selectorInner()}</div>
    <div class="sel-foot">${applyBtn("btn-block")}</div>
  </div>`;
}
function selectorModal() {
  return `<div class="overlay" id="overlay"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="sel-title" tabindex="-1">
    <div class="modal-head"><h2 class="t-title-md" id="sel-title">Categorías</h2><button class="icon-btn" id="sel-close" aria-label="Cerrar"><img src="${A}close.svg" alt=""></button></div>
    <div class="modal-body">${selectorInner()}</div>
    <div class="modal-foot">${applyBtn("")}</div>
  </div></div>`;
}

// ---------- Router y render ----------
let current = "contenidos";
function route() {
  const r = (location.hash || "#contenidos").slice(1);
  if (r === "contenidos" || TYPES[r]) { current = r; return render(); }
  const msg = { inicio: "La página de inicio", "espacio-personal": "Espacio personal", juegos: "Juegos" }[r];
  toast(`${msg || "Esa sección"} no forma parte de este prototipo.`);
  history.replaceState(null, "", "#" + current);
  render();
}
function render() {
  const app = document.getElementById("app");
  const sel = S.sel;
  if (sel && isMobile()) app.innerHTML = selectorMobile();
  else app.innerHTML = (current === "contenidos" ? pantallaHub() : pantallaLista(current)) + (sel ? selectorModal() : "");
  document.body.classList.toggle("lock", !!sel && !isMobile());
  renderFab();
  document.title = `${current === "contenidos" ? "Contenidos" : TYPES[current].name} · Portal del Cliente (prototipo)`;
}
function rerenderKeepScroll(focusSel) {
  const body = document.querySelector(".modal-body"), top = body ? body.scrollTop : 0, y = scrollY;
  render(); scrollTo(0, y);
  const nb = document.querySelector(".modal-body"); if (nb) nb.scrollTop = top;
  if (focusSel) document.querySelector(focusSel)?.focus();
}
function openSel() {
  S.sel = { type: current, draft: new Set(filtro(current)) };
  render(); scrollTo(0, 0);
  (document.querySelector(".modal") || document.querySelector("#sel-close"))?.focus();
}
function closeSel() { S.sel = null; render(); document.getElementById("open-sel")?.focus(); }

let toastT;
function toast(msg) { const t = document.getElementById("toast"); t.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => (t.hidden = true), 3200); }

document.addEventListener("click", e => {
  if (e.target.closest("#fab-btn")) { fabOpen = !fabOpen; renderFab(); if (fabOpen) document.querySelector(".fab-menu button[aria-checked=true]")?.focus(); return; }
  const vw = e.target.closest(".fab-menu [data-view]"); if (vw) { setView(vw.dataset.view); return; }
  if (fabOpen && !e.target.closest("#fab")) { fabOpen = false; renderFab(); }
  const tg = e.target.closest("[data-toast]"); if (tg) { e.preventDefault(); toast(tg.dataset.toast); return; }
  if (e.target.closest("#menu-btn")) { S.drawer = !S.drawer; render(); return; }
  if (e.target.closest("#open-sel")) { openSel(); return; }
  if (e.target.closest("#sel-close") || e.target.id === "overlay") { closeSel(); return; }
  const c = e.target.closest("[data-cat]");
  if (c && S.sel) { const d = S.sel.draft, n = c.dataset.cat; d.has(n) ? d.delete(n) : d.add(n); rerenderKeepScroll(`[data-cat="${CSS.escape(n)}"]`); return; }
  if (e.target.closest("#sel-all") && S.sel) { const d = S.sel.draft; if (d.size === CATS.length) d.clear(); else CATS.forEach(x => d.add(x.n)); rerenderKeepScroll("#sel-all"); return; }
  if (e.target.closest("#sel-apply") && S.sel) {
    // Con todas marcadas se guarda la lista completa: al reabrir el selector salen todas seleccionadas.
    S.filtros[S.sel.type] = CATS.map(x => x.n).filter(n => S.sel.draft.has(n));
    S.sel = null; render(); scrollTo(0, 0); document.getElementById("open-sel")?.focus(); return;
  }
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && fabOpen) { fabOpen = false; renderFab(); document.getElementById("fab-btn")?.focus(); return; }
  if (e.key === "Escape") { if (S.sel) closeSel(); else if (S.drawer) { S.drawer = false; render(); } }
  if (e.key === "Tab" && S.sel) { // el foco no sale del selector
    const root = document.querySelector(".modal, .sel-screen"); if (!root) return;
    const f = [...root.querySelectorAll("button:not([disabled])")]; if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
  }
});
window.addEventListener("hashchange", () => { S.drawer = false; S.sel = null; route(); scrollTo(0, 0); });
route();
