/* Prototipo Contenidos · Portal del Cliente
   Sigue los diseños de Figma (página Contenidos): página principal, listados por tipo, selector de categorías
   (pantalla completa en mobile, modal en tablet y desktop) y Mitos vs Realidad (listado, pregunta «¿Qué opinas
   sobre esto?» y artículo con el resultado). Se navega por el propio flujo.
   No incluye el detalle de los artículos, fichas, recetas y vídeos normales. */

const A = "assets/";

// ---------- Datos (los de Figma) ----------
// dot = color del punto de «Novedades - Categorías · Tag de novedades»
const CATS = [
  { n: "Actividad física", f: "actividad-fisica", dot: "#FEC646" },
  { n: "Mente activa", f: "mente-activa", dot: "#16AA9C" },
  { n: "Alcohol", f: "alcohol", dot: "#4BA8DF" },
  { n: "Sueño", f: "sueno", dot: "#5E56B0" },
  { n: "Alimentación", f: "alimentacion", dot: "#9EC938" },
  { n: "Tabaco", f: "tabaco", dot: "#4BA8DF" },
  { n: "Detección precoz", f: "deteccion-precoz", dot: "#0E9AA7" },
  { n: "Cuidado auditivo", f: "cuidado-auditivo", dot: "#EE5A20" },
  { n: "Bienestar emocional", f: "bienestar-emocional", dot: "#C763B0" },
  { n: "Participación social", f: "participacion-social", dot: "#DF353F" },
  { n: "Neuroinfo", f: "neuroinfo", dot: "#3F51B5" },
  { n: "Cuidado ocular", f: "cuidado-ocular", dot: "#EE5A20" },
  { n: "Nuevas líneas de investigación", f: "nuevas-lineas", dot: "#9E2B4E" },
];
const MITOS_CAT = "Mitos vs Realidad";
const DOT = Object.fromEntries([...CATS.map(c => [c.n, c.dot]), [MITOS_CAT, "#EFB810"]]);

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

// ---------- Mitos vs Realidad ----------
// Contenido de la sección «Todos los mitos» de Figma. Los textos entre ** van en negrita.
// esMito: la respuesta correcta a «¿Qué opinas sobre esto?» (los 10 del documento son mitos).
const MITO_AUTOR = "Equipo de orientación personal - Qida", MITO_FECHA = "02/11/2026";
const MITOS = [
  { id: "01", titulo: "Perder memoria es normal al cumplir años", esMito: true,
    mito: "«Es normal que, a medida que cumplimos años, aparezcan problemas importantes de memoria, porque forma parte inevitable del envejecimiento.»",
    realidad: ["Con la edad es habitual notar algunos cambios leves en la memoria, como tardar algo más en recordar un nombre o una información concreta.", "Sin embargo, una pérdida de memoria importante, que dificulta el día a día,** no es una consecuencia normal de hacerse mayor.**", "**Por ejemplo, olvidar dónde hemos dejado las llaves es normal; no recordar para qué sirven, no.\n\nLos problemas de memoria pueden tener causas muy distintas, y algunas tienen tratamiento: **la falta de vitamina B12, los problemas de tiroides, la depresión, el efecto de algunos medicamentos o dormir mal. Por eso es importante consultarlo."],
    enSuLugar: ["No esperemos siempre a encontrarnos mal para consultar. Es importante **seguir las revisiones recomendadas según nuestra edad, situación y factores de riesgo**, además de consultar cuando aparezca un síntoma nuevo, persistente o que nos preocupe."],
    cierre: "Prevenir no significa buscar enfermedades; significa cuidar nuestra salud antes de que aparezcan problemas." },
  { id: "02", titulo: "Una copa de vino al día es buena para el corazón", esMito: true,
    mito: "«Una copa de vino al día es beneficiosa para la salud cardiovascular gracias a sus antioxidantes.»",
    realidad: ["Actualmente, la evidencia científica no respalda el consumo de alcohol para mejorar o proteger la salud cardiovascular.", "El alcohol está relacionado con un mayor riesgo de diferentes enfermedades, entre ellas diversos tipos de cáncer, enfermedades hepáticas y cardiovasculares.", "La **Organización Mundial de la Salud (OMS)** señala que no existe un nivel de consumo de alcohol completamente libre de riesgo para la salud, especialmente en relación con el cáncer."],
    enSuLugar: ["Si queremos cuidar nuestra salud cardiovascular, podemos apostar por **actividad física regular, una alimentación equilibrada, no fumar y mantener una buena calidad del sueño**."],
    cierre: "Cuidar nuestra salud también empieza por cuestionar lo que creemos saber." },
  { id: "03", titulo: "El pan engorda", esMito: true,
    mito: "«Si quiero perder peso o mantenerme saludable, tengo que dejar de comer pan.»",
    realidad: ["El pan no provoca por sí solo un aumento de peso.", "Puede formar parte perfectamente de una alimentación equilibrada. Lo que influye es el conjunto de la dieta, la cantidad que consumimos y, especialmente, con qué acompañamos el pan.", "Además, elegir panes integrales permite aumentar el consumo de **fibra y cereales integrales**."],
    enSuLugar: ["No es necesario eliminar el pan. Podemos elegir **pan integral, controlar las cantidades y acompañarlo de alimentos saludables**, como verduras, aceite de oliva, pescado, huevo o legumbres."],
    cierre: "Más que eliminar alimentos, aprendamos a elegirlos y combinarlos mejor." },
  { id: "04", titulo: "El zumo de fruta es igual de saludable que comer fruta", esMito: true,
    mito: "«Si el zumo es natural y está recién exprimido, tiene los mismos beneficios que comer una pieza de fruta.»",
    realidad: ["Aunque el zumo puede aportar vitaminas y minerales, no equivale nutricionalmente a consumir la fruta entera.", "Al exprimir la fruta se pierde buena parte de su estructura y fibra, y es más fácil consumir una cantidad elevada de azúcar en poco tiempo. Además, los azúcares presentes en los zumos de frutas se consideran **azúcares libres** según las recomendaciones internacionales.", "La fruta entera, en cambio, proporciona **fibra y mayor sensación de saciedad**."],
    enSuLugar: ["Siempre que sea posible, **prioricemos la fruta entera**. El zumo puede consumirse ocasionalmente, pero no debería sustituir habitualmente a la fruta."],
    cierre: "Cuando podemos elegir, mejor comer la fruta que beberla." },
  { id: "05", titulo: "El móvil me ayuda a relajarme antes de dormir", esMito: true,
    mito: "«Mirar un rato el móvil en la cama me ayuda a desconectar y me facilita quedarme dormido.»",
    realidad: ["El uso de dispositivos electrónicos antes de dormir puede dificultar el descanso, especialmente cuando utilizamos contenido estimulante o mantenemos una exposición prolongada a pantallas.", "Además, revisar mensajes, redes sociales o noticias puede mantener nuestro cerebro activo cuando debería comenzar a prepararse para dormir."],
    enSuLugar: ["Podemos intentar crear un **ritual de desconexión 30-60 minutos antes de acostarnos**: reducir el uso de pantallas, leer, escuchar música tranquila, preparar el día siguiente o realizar ejercicios de relajación."],
    cierre: "Desconectar de la pantalla también puede ayudarnos a conectar con el descanso." },
  { id: "06", titulo: "Si voy al médico, seguro que me encuentra algo", esMito: true,
    mito: "«Mientras me encuentre bien, es mejor no ir al médico. Si voy a hacerme pruebas, pueden encontrarme alguna enfermedad que antes no sabía que tenía.»",
    realidad: ["Evitar las consultas no evita que pueda existir un problema de salud.", "Las revisiones y los controles sanitarios permiten valorar factores de riesgo, detectar algunos problemas en fases tempranas y recibir recomendaciones para prevenir enfermedades.", "Además, **no todas las consultas terminan en un diagnóstico ni todas las pruebas son necesarias**. Los profesionales sanitarios valoran cuándo una revisión, una prueba o un seguimiento están indicados."],
    enSuLugar: ["No esperemos siempre a encontrarnos mal para consultar. Es importante **seguir las revisiones recomendadas según nuestra edad, situación y factores de riesgo**, además de consultar cuando aparezca un síntoma nuevo, persistente o que nos preocupe."],
    cierre: "Prevenir no significa buscar enfermedades; significa cuidar nuestra salud antes de que aparezcan problemas." },
  { id: "07", titulo: "Oigo peor, pero como me apaño, no pasa nada", esMito: true,
    mito: "«Si puedo seguir las conversaciones más o menos, no merece la pena preocuparme por una pequeña pérdida de audición.»",
    realidad: ["La pérdida de audición puede aparecer progresivamente, y muchas personas se acostumbran a ella sin darse cuenta de cuánto está afectando a su día a día.", "No escuchar bien puede dificultar las conversaciones, favorecer el aislamiento y afectar a la participación social y a la calidad de vida.", "Además, una pérdida auditiva puede tener diferentes causas y **conviene valorar su origen y evolución**."],
    enSuLugar: ["Si tenemos que pedir que nos repitan las cosas, subir mucho el volumen de la televisión o tenemos dificultades para seguir conversaciones, es recomendable **realizar una valoración auditiva**."],
    cierre: "Oír bien no es un lujo: es una parte importante de comunicarnos y mantener nuestra autonomía." },
  { id: "08", titulo: "La depresión es solo estar triste", esMito: true,
    mito: "«Todo el mundo está triste alguna vez. La depresión es simplemente estar de bajón y se pasa cuando recuperas el ánimo.»",
    realidad: ["La tristeza es una emoción normal que puede aparecer ante diferentes situaciones. La depresión, sin embargo, es un problema de salud que va más allá de estar triste.", "Puede afectar al estado de ánimo, pero también al interés por las actividades, el sueño, el apetito, la energía, la concentración y la capacidad para desenvolverse en el día a día.", "No se trata simplemente de «poner de nuestra parte»."],
    enSuLugar: ["Si el malestar emocional **se mantiene en el tiempo, es intenso o empieza a interferir en nuestra vida cotidiana**, es importante hablar con un profesional sanitario.", "Pedir ayuda no es una señal de debilidad, sino una forma de empezar a cuidarnos."],
    cierre: "No todo malestar emocional es depresión, pero todo sufrimiento merece ser escuchado." },
  { id: "09", titulo: "Si me encuentro mejor, puedo dejar la medicación", esMito: true,
    mito: "«Si los síntomas han desaparecido, significa que ya estoy bien y puedo dejar el tratamiento por mi cuenta.»",
    realidad: ["Que nos encontremos mejor no significa necesariamente que el tratamiento deba finalizar.", "Algunos medicamentos necesitan mantenerse durante un tiempo determinado y otros no deben suspenderse de manera brusca, ya que puede provocar problemas o que reaparezcan los síntomas.", "La duración del tratamiento depende de cada situación y debe ser valorada por un profesional sanitario."],
    enSuLugar: ["No modifiquemos ni suspendamos un tratamiento por nuestra cuenta. Si tenemos dudas, efectos secundarios o pensamos que ya no necesitamos tomarlo, **consultemos con nuestro médico o farmacéutico**."],
    cierre: "Sentirnos mejor es una buena noticia; terminar un tratamiento correctamente también forma parte de cuidarnos." },
  { id: "10", titulo: "Hablar de estas cosas trae mala suerte", esMito: true,
    mito: "«Si empiezo a hablar de incapacidad o de lo que quiero que ocurra en el futuro, parece que estoy llamando a la desgracia.»",
    realidad: ["Hablar sobre nuestros deseos y preferencias no provoca que ocurra nada.", "Además, hoy contamos con **herramientas jurídicas que nos permiten dejar reflejados nuestros deseos, preferencias y decisiones para el futuro**, de manera que puedan ser tenidos en cuenta si algún día no podemos expresarlos por nosotros mismos.", "Evitar estos temas puede hacer que, ante una situación inesperada, las personas que nos rodean tengan que tomar decisiones **sin conocer claramente qué hubiéramos querido**.", "Conversar sobre estos asuntos puede ser una oportunidad para **conocernos mejor, expresar nuestros valores y facilitar que nuestras preferencias sean respetadas**."],
    enSuLugar: ["Podemos abordar estas conversaciones **con naturalidad y sin dramatismo**, empezando por algo sencillo: qué cosas son importantes para nosotros, qué decisiones nos gustaría dejar previstas y **qué herramientas jurídicas podemos utilizar para dejar constancia de nuestros deseos**."],
    cierre: "Cuidar nuestra salud también empieza por cuestionar lo que creemos saber." },
];
const MITO = Object.fromEntries(MITOS.map(m => [m.id, m]));
const AVISO = "La información contenida en este artículo es de carácter meramente informativo y en ningún caso constituye ni pretende constituir algún tipo de asesoramiento u orientación, ya sea de carácter médico, técnico o jurídico.";
// Mensajes después de «¿Qué opinas sobre esto?» (Specs de Figma)
const resultado = (m, respuesta) => {
  const acierto = (respuesta === "mito") === m.esMito, es = m.esMito ? "un mito" : "una realidad";
  return { acierto, texto: `${acierto ? "¡Has acertado! Es" : "No es así: es"} ${es}. Te contamos por qué a continuación.` };
};

// ---------- Estado (solo en memoria: al recargar se vuelve a empezar) ----------
// filtros[tipo]: [] = todas las categorías. sel: selector abierto { type, draft:Set }.
// mitos[id]: { respuesta: "mito" | "realidad" | "saltada", alertaVista } · pregunta: id del mito con el modal abierto.
const S = { filtros: {}, sel: null, drawer: false, mitos: {}, pregunta: null };

const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const rich = s => esc(s).replace(/\*\*([\s\S]*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br>");
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
// Header (Figma 3077:38283): desktop blanco con la navegación en línea y el botón de perfil;
// mobile y tablet: «Mobile + tablet» de 56 px con mensajes, llamar y menú.
function chrome() {
  const nav = [["#espacio-personal", "h-user.svg", "Espacio personal", false, true], ["#contenidos", "h-grid.svg", "Contenidos", true], ["#juegos", "h-games.svg", "Juegos", false]];
  const item = ([href, icon, label, on, drop]) => `<a href="${href}" class="nav-item${on ? " on" : ""}" ${on ? 'aria-current="page"' : ""}><span class="ni"><img src="${A}${icon}" alt="">${label}</span>${drop ? `<img class="chev" src="${A}chevron-down.svg" alt="">` : ""}</a>`;
  return `
  <header class="hdr">
    <div class="hdr-in">
      <a href="#contenidos" class="hdr-logo" aria-label="Qida · Contenidos"><img src="${A}logo-qida-primary.svg" alt="Qida"></a>
      <nav class="hdr-nav" aria-label="Principal">${nav.map(item).join("")}</nav>
      <div class="hdr-actions">
        <div class="hdr-icons">
          <button class="icon-btn" data-toast="Aquí se abrirían los mensajes." aria-label="Mensajes" title="Mensajes"><img src="${A}h-chat.svg" alt=""></button>
          <button class="icon-btn" data-toast="Aquí se llamaría a Qida." aria-label="Llamar" title="Llamar"><img src="${A}h-phone.svg" alt=""></button>
          <button class="icon-btn hdr-menu" id="menu-btn" aria-label="${S.drawer ? "Cerrar" : "Abrir"} menú" aria-expanded="${S.drawer}"><img src="${A}h-menu.svg" alt=""></button>
        </div>
        <button class="profile" data-toast="Aquí se abriría el menú de la cuenta." aria-label="Cuenta de Nombre Apellidos" aria-haspopup="menu"><span class="avatar">NA</span><span class="pname">Nombre Apellidos</span></button>
      </div>
    </div>
    ${S.drawer ? `<nav class="drawer" aria-label="Menú">${nav.map(item).join("")}</nav>` : ""}
  </header>`;
}

function crumbsHtml(crumbs) {
  const sep = `<img src="${A}chevron-right.svg" alt="" aria-hidden="true">`;
  return `<nav class="crumbs" aria-label="Migas de pan">${crumbs.map((c, i) => (i === crumbs.length - 1 ? `<span class="cur" aria-current="page">${c[0]}</span>` : `<a href="${c[1]}">${c[0]}</a>${sep}`)).join("")}</nav>`;
}
function titleBlock(crumbs, title, sub, back) {
  const b = back ? `<a class="back" href="${back}" aria-label="Volver"><img src="${A}chevron-left.svg" alt=""></a>` : "";
  return `<div class="wrap title-block">${crumbsHtml(crumbs)}<div class="heading"><h1 class="t-h3">${b}${title}</h1>${sub ? `<p class="sub">${sub}</p>` : ""}</div></div>`;
}

// Novedades - Categorías · Tag de novedades: punto de color de 12 px y nombre en mayúsculas
const tag = cat => `<span class="tag"><span class="dot" style="background:${DOT[cat]}"></span>${esc(cat)}</span>`;

function contentCard(i) {
  const cta = i.ctaM ? `<span class="cta-d">${i.cta}</span><span class="cta-m">${i.ctaM}</span>` : i.cta;
  const action = i.mito ? `data-mito="${i.mito}"` : `data-toast="Aquí se abriría «${esc(i.title)}». El detalle no forma parte de este prototipo."`;
  return `<article class="ccard${i.onlyDesktop ? " only-d" : ""}">
    <div class="img" ${i.img ? `style="background-image:url('${A}${i.img}')"` : ""}></div>
    <div class="body">
      <div class="top">${tag(i.cat)}<h3 class="t-title-sm">${esc(i.title)}</h3></div>
      <div class="foot"><span class="t-sm c-700">${i.date}</span>
        <button class="cta" ${action}>${cta}<img src="${A}arrow-right.svg" alt=""></button></div>
    </div>
  </article>`;
}
const mitoCard = (m, comillas) => contentCard({ mito: m.id, cat: MITOS_CAT, title: comillas ? `«${m.titulo}»` : m.titulo, date: MITO_FECHA, cta: "Saber más", img: null });

// ---------- Página principal ----------
function pantallaHub() {
  const tipos = [...ORDER.map(t => [t, TYPES[t].icon, TYPES[t].name]), ["mitos", "type-mitos.svg", "Mitos vs Realidad"]];
  return `${chrome()}
  <main class="page hub" id="main">
    ${titleBlock([["Inicio", "#inicio"], ["Contenidos"]], "Contenidos", "Aprende y cuida tu salud a tu ritmo.")}
    <div class="wrap content">
      <div class="types">${tipos.map(([t, icon, name]) => `<a class="type-card" href="#${t}"><img src="${A}${icon}" alt=""><span>${name}</span></a>`).join("")}</div>
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

// Listado de Mitos vs Realidad: la lista entera de mitos (en Figma, «Contenidos - Artículos», con el título «Artículos»)
function pantallaMitos() {
  return `${chrome()}
  <main class="page mitos" id="main">
    ${titleBlock([["Inicio", "#inicio"], ["Contenidos", "#contenidos"], [MITOS_CAT]], MITOS_CAT, null, "#contenidos")}
    <div class="wrap content"><div class="grid">${MITOS.map(m => mitoCard(m, false)).join("")}</div></div>
  </main>`;
}

// ---------- Artículo Mitos vs Realidad ----------
const minutos = m => Math.max(1, Math.round([m.mito, ...m.realidad, ...m.enSuLugar, m.cierre].join(" ").split(/\s+/).length / 200));
const corto = m => { const w = m.titulo.split(" "); return w.length > 6 ? w.slice(0, 6).join(" ") + "…" : m.titulo; };
function tarjeta(tipo, icono, titulo, cuerpo) {
  const iconHtml = tipo === "ensulugar" ? `<span class="ic-ensulugar"><img src="${A}ensulugar-arrow.svg" alt=""></span>` : `<img src="${A}${icono}" alt="">`;
  return `<section class="mvr mvr-${tipo}"><div class="mvr-head">${iconHtml}<h2>${titulo}</h2></div><div class="mvr-body">${cuerpo}</div></section>`;
}
function pantallaMito(id) {
  const m = MITO[id], st = S.mitos[id];
  // La alerta solo sale la primera vez que se entra después de responder (se marca como vista al salir).
  let alerta = "";
  if (st && st.respuesta !== "saltada" && !st.alertaVista) {
    const r = resultado(m, st.respuesta);
    alerta = `<div class="alert ${r.acierto ? "alert-ok" : "alert-ko"}" role="status"><img src="${A}${r.acierto ? "alert-success.svg" : "alert-error.svg"}" alt=""><p>${r.texto}</p></div>`;
  }
  const [r0, ...rN] = m.realidad;
  const idx = MITOS.findIndex(x => x.id === id), otros = [1, 2, 3].map(k => MITOS[(idx + k) % MITOS.length]);
  return `${chrome()}
  <main class="page detalle" id="main">
    <div class="wrap cuerpo">
      ${crumbsHtml([["Inicio", "#inicio"], ["Contenidos", "#contenidos"], ["Mitos vs Realidad", "#mitos"], [corto(m)]])}
      <a class="back-row" href="#mitos"><img src="${A}chevron-left.svg" alt="">Mitos vs Realidad</a>
      <div class="cab">
        ${tag(MITOS_CAT)}
        <h1 class="cab-title">«${esc(m.titulo)}»</h1>
        <div class="meta"><span class="autor">${MITO_AUTOR}</span><span class="fecha">${MITO_FECHA}<span class="lectura"><img src="${A}time.svg" alt="">${minutos(m)} min de lectura</span></span></div>
      </div>
      <div class="md">
        ${alerta}
        <div class="art-img" role="img" aria-label="Imagen del artículo"></div>
        <div class="fila">
          ${tarjeta("mito", "mito-x.svg", "MITO", `<p class="lead">${rich(m.mito)}</p>`)}
          ${tarjeta("realidad", "realidad-check.svg", "REALIDAD", `<p class="lead">${rich(r0)}</p>${rN.map(p => `<p>${rich(p)}</p>`).join("")}`)}
        </div>
        <div class="fila">
          ${tarjeta("ensulugar", "", "EN SU LUGAR...", m.enSuLugar.map(p => `<p>${rich(p)}</p>`).join(""))}
          <section class="mvr-cierre"><p>${rich(m.cierre)}</p></section>
        </div>
        <p class="aviso">${AVISO}</p>
      </div>
    </div>
    <section class="wrap otros">
      <h2 class="t-title-sm">Otros mitos que te pueden interesar</h2>
      <div class="otros-lista">${otros.map((o, k) => mitoCard(o, true).replace('class="ccard', `class="ccard${k === 2 ? " no-tablet" : ""}`)).join("")}</div>
    </section>
  </main>`;
}

// Modal «¿Qué opinas sobre esto?» (Figma: Mitos vs Realidad - Popup pregunta)
function preguntaModal() {
  const m = MITO[S.pregunta];
  return `<div class="overlay" id="overlay-pregunta"><div class="modal modal-pregunta" role="dialog" aria-modal="true" aria-labelledby="preg-title" aria-describedby="preg-title" tabindex="-1">
    <div class="preg-top">
      <div class="modal-head">${tag(MITOS_CAT)}<button class="icon-btn" id="preg-close" aria-label="Saltar la pregunta y ver el artículo"><img src="${A}h-close.svg" alt=""></button></div>
      <div class="preg-txt"><p class="preg-q">¿Qué opinas sobre esto?</p><p class="preg-title" id="preg-title">«${esc(m.titulo)}»</p></div>
    </div>
    <div class="preg-btns"><button class="btn-lg btn-mito" data-respuesta="mito">Mito</button><button class="btn-lg btn-realidad" data-respuesta="realidad">Realidad</button></div>
  </div></div>`;
}
// El modal sale encima del propio artículo, con el fondo desenfocado para no ver la solución.
// Se abre siempre que se entra en un mito sin responder ni saltar (ver route()).
function abrirMito(id) { location.hash = "#mito-" + id; }
function responder(respuesta) {
  const id = S.pregunta; S.mitos[id] = { respuesta, alertaVista: false }; S.pregunta = null;
  render(); scrollTo(0, 0);
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
const valida = r => r === "contenidos" || r === "mitos" || TYPES[r] || (/^mito-\d\d$/.test(r) && MITO[r.slice(5)]);
function route() {
  const r = (location.hash || "#contenidos").slice(1);
  if (valida(r)) {
    current = r;
    const id = r.startsWith("mito-") ? r.slice(5) : null;
    S.pregunta = id && !S.mitos[id] ? id : null;
    render();
    if (S.pregunta) document.querySelector(".modal-pregunta")?.focus();
    return;
  }
  const msg = { inicio: "La página de inicio", "espacio-personal": "Espacio personal", juegos: "Juegos" }[r];
  toast(`${msg || "Esa sección"} no forma parte de este prototipo.`);
  history.replaceState(null, "", "#" + current);
  render();
}
function pantalla() {
  if (current === "contenidos") return pantallaHub();
  if (current === "mitos") return pantallaMitos();
  if (current.startsWith("mito-")) return pantallaMito(current.slice(5));
  return pantallaLista(current);
}
function titulo() {
  if (current === "contenidos") return "Contenidos";
  if (current === "mitos") return "Mitos vs Realidad";
  if (current.startsWith("mito-")) return MITO[current.slice(5)].titulo;
  return TYPES[current].name;
}
function render() {
  const app = document.getElementById("app");
  const sel = S.sel;
  if (sel && isMobile()) app.innerHTML = selectorMobile();
  else app.innerHTML = pantalla() + (sel ? selectorModal() : "") + (S.pregunta ? preguntaModal() : "");
  document.body.classList.toggle("lock", (!!sel && !isMobile()) || !!S.pregunta);
  renderFab();
  document.title = `${titulo()} · Portal del Cliente (prototipo)`;
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
  // Mitos vs Realidad
  const mi = e.target.closest("[data-mito]"); if (mi) { abrirMito(mi.dataset.mito); return; }
  const rs = e.target.closest("[data-respuesta]"); if (rs && S.pregunta) { responder(rs.dataset.respuesta); return; }
  if ((e.target.closest("#preg-close") || e.target.id === "overlay-pregunta") && S.pregunta) { responder("saltada"); return; }
  // Selector de categorías
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
  if (e.key === "Escape") { if (S.pregunta) responder("saltada"); else if (S.sel) closeSel(); else if (S.drawer) { S.drawer = false; render(); } }
  if (e.key === "Tab" && (S.sel || S.pregunta)) { // el foco no sale del modal
    const root = document.querySelector(".modal, .sel-screen"); if (!root) return;
    const f = [...root.querySelectorAll("button:not([disabled])")]; if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
  }
});
window.addEventListener("hashchange", () => {
  if (current.startsWith("mito-") && S.mitos[current.slice(5)]) S.mitos[current.slice(5)].alertaVista = true;
  S.drawer = false; S.sel = null; S.pregunta = null; route(); scrollTo(0, 0);
});
route();
