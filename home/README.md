# Home del Portal del Cliente — prototipo

Prototipo local de la **home** del portal del cliente
(`stage.customer-portal.fe.vcxws.qida.es/home`).

## Cómo abrirlo

Abre `index.html` en el navegador, o sirve la carpeta:

```bash
python3 -m http.server 8777
```

Luego entra en `http://localhost:8777/index.html`.

- **Estado** (abajo a la derecha): cambia entre los tres estados de la home y
  entre mañana y tarde.
- **📝 Ver cambios** (abajo a la izquierda): numera cada cambio propuesto y
  muestra la nota al pulsar.
- `index.html?reset` borra el estado guardado.

## Orden de la home

1. Bienvenida (saludo)
2. Elsa
3. Encuesta rápida del día
4. Tu plan de hoy
5. Tu evolución *(solo con seguimientos)*
6. Accesos a Contenidos, Juegos y Espacio personal
7. Test de tranquilidad
8. Contenidos para ti
9. Recetas
10. Orientadora personal

La OP es la excepción: en la primera visita sube justo detrás de la bienvenida
para presentarse, y a partir de ahí va al final.

## Estados de la home

Siempre presentes: saludo, chat de Elsa, pregunta del día, actividades del día,
encuesta legal, contenidos, recetas e info de la Orientadora personal (OP).
Llamar y escribir a la OP están además en la cabecera, en todas las pantallas.

| | 1ª visita | Con plan de prevención | Con seguimientos |
|---|---|---|---|
| Info de la OP | arriba, presentándose | al final de la página | al final de la página |
| Evolución | no aparece | no aparece | aparece |
| Contenidos | genéricos | según intereses | según intereses |
| Recetas | genéricas | según intereses | según intereses |

La evolución no se muestra hasta el primer seguimiento: con el plan inicial no
hay nada que comparar.

## Pregunta del día

Una sola pregunta, con el color de su área, que desaparece al responder (o con
la X). Cambia según la hora y los objetivos del cliente:

- **Mañana** (antes de las 15 h) → "¿Cómo has dormido hoy?", con tres respuestas
  de sueño: *He dormido bien* · *Me he despertado varias veces* · *Me ha costado
  dormirme*. Área **Sueño**: línea `#5E56B0`, fondo `#EDEBF6`.
- **Tarde** → "¿Has salido a caminar hoy?" (*Sí* · *Todavía no*). Área
  **Actividad física**: línea `#FEC646`, fondo `#FFFBEF`.

La franja la marca el reloj en cada carga; el selector de estado solo la fuerza
mientras dure la sesión.

## Actividades del día

Tarjeta blanca de esquinas grandes y sombra suave, sin borde. El color del área
va en una **banda superior tintada** con el nombre de la sección en mayúsculas
y en Neutral/900 (el color lo pone el fondo, no el texto). Sin icono, sin
valoración, sin nivel, sin tiempo y sin "marcar como hecho". Cuando la
actividad se hace en el portal, la acción va abajo a la derecha: hoy solo Mente
activa, con **Abrir el sudoku ›**.

Las alternativas que se valoraron están en `variantes.html`, por si hay que
volver sobre ello.

Colores de área, de los informes de Qida:

| Área | Barra | Fondo |
|---|---|---|
| Actividad física | `#FEC646` | `#FFFBEF` |
| Nutrición | `#9EC938` | `#F3F8E7` |
| Mente activa | `#16AA9C` | `#E2F5F3` |
| Sueño | `#5E56B0` | `#EDEBF6` |
| Bienestar emocional | `#C763B0` | `#F7ECF4` |

## Criterio de contenido

Cliente de 60 años en adelante: texto directo, sin subtítulos explicativos ni
tono infantil, y sin agrandar la tipografía. Cada sección lleva su título y lo
justo para actuar. Se han quitado los subtítulos de sección, las descripciones
de las tarjetas de contenido, las etiquetas de "por tu objetivo" y el feedback
de recetas (va en el detalle de cada receta).

## Los cambios marcados en "Ver cambios"

| # | Cambio |
|---|---|
| 1 | Informes, evolución, citas y servicios bajo un único "Espacio personal" |
| 2 | Footer completo, con Elsa dentro |
| 3 | La OP se presenta arriba la primera visita y luego baja al final |
| 4 | Encuesta rápida del día, con el color de su área |
| 5 | Elsa: chat que resuelve dudas y abre pantallas, arriba como buscador |
| 6 | Actividades del día que llevan a la pantalla donde se hacen |
| 7 | Evolución y gamificación, a partir del primer seguimiento |
| 8 | Contenidos destacados, genéricos o personalizados según el estado |
| 9 | Escuchar el artículo pasa al detalle del contenido |
| 10 | Recetas: favoritas y creador de recetas |
| 11 | El perfil vive en la cabecera; fuera la sección de perfil de la home |
| 12 | Acceso directo a la app en el móvil |
| 13 | Avisos push |
| 14 | Encuesta del servicio legal |
| 15 | Accesos directos a Contenidos, Juegos y Espacio personal |

## Accesos rápidos

Sección con tres tarjetas del mismo ancho y la misma altura — **Contenidos**,
**Juegos** y **Espacio personal** — con el formato de tarjeta de Apple: título,
mosaico de tres imágenes (cuatro iconos en Espacio personal) y la acción abajo.
En móvil van apiladas a todo el ancho; desde 721 px, en tres columnas.

En Espacio personal el candado va en un cuadro a la derecha del título y la
acción es **Verifica tu identidad**; al verificarse, el candado desaparece y
pasa a **Entrar**.

Las imágenes de Juegos se leen de `img/juegos-sudoku.jpg`,
`img/juegos-compra.jpg` y `img/juegos-viajes.jpg` (ver `img/LEEME.txt`).

**Espacio personal pide doble verificación.** Mientras no se ha verificado, la
tarjeta y el grupo del menú llevan el distintivo *Necesita verificación*, y
cualquier entrada a informes, evolución, citas, servicios o perfil abre el flujo:

1. **Elige dónde recibir el código** — SMS al móvil o correo (los dos datos
   aparecen enmascarados).
2. **Escribe los 6 números** — con avance automático entre casillas, pegado del
   código completo y enlace de reenvío.
3. **Identidad verificada** — "Ya tienes acceso a tu información de salud", el
   mismo mensaje que la home *tras verificar* de Figma. Al cerrar, el portal
   lleva a donde el cliente quería entrar.

Verificado, la tarjeta pierde el candado y abre la pantalla **Espacio personal**
con las cuatro entradas de Figma: Mis informes, Mi evolución, Mis citas y Mis
servicios.

## Versión móvil

Basada en [Mobile Friendly](https://www.figma.com/design/9mwxipYeuLVTb32sbAhPKy/Portal-del-Cliente?node-id=1113-2932),
manteniendo la estructura y los estados de la home:

- **Cabecera** con logo, mensaje, llamar y menú de hamburguesa.
- **Menú** a pantalla completa con Inicio, Contenidos, Juegos y Preguntas
  frecuentes; el grupo Espacio personal con su candado y su explicación; Mi
  perfil, cerrar sesión y, abajo, Mensaje y Llamar.
- **Accesos directos** en 2 + 1 y **contenidos en carrusel** horizontal.
- **Ficha de la OP** con foto, horario, título académico y número de colegiado.
- **Elsa fija abajo**, a la altura del pulgar, siempre visible; sus sugerencias
  se despliegan hacia arriba y el chat ocupa la pantalla sin taparla.

## Contenidos y recetas

Las dos secciones son filas horizontales con scroll: la tarjeta siguiente asoma
por el borde, hay barra de desplazamiento y flechas en la cabecera, que se
desactivan al llegar a cada extremo. En recetas, **Crear una receta** va la
primera y en verde Qida, para que sea lo primero que se ve.

## Encuesta del servicio legal

Diseño de partida en Figma:
[pantalla del servicio](https://www.figma.com/design/9mwxipYeuLVTb32sbAhPKy/Portal-del-Cliente?node-id=873-11070)
y [flujo del test](https://www.figma.com/design/9mwxipYeuLVTb32sbAhPKy/Portal-del-Cliente?node-id=918-2258).

El flujo es el de Figma (intro → 4 preguntas → resultado → confirmación), pero
**los textos se han reescrito más directos** para este cliente: preguntas
cortas, sin lenguaje jurídico y con una sola idea por pantalla.

## Qué es real y qué está simulado

Funciona: los tres estados, la pregunta del día por franja horaria, la
navegación de las actividades, la doble verificación del Espacio personal,
favoritas de recetas, el creador de recetas, el test legal completo, el chat de
Elsa abriendo pantallas y la persistencia en `localStorage`.

Simulado: el envío real del código (vale cualquier combinación de 6 números), el
alta con Google, el acceso directo a la app, el envío de avisos, el micro de
Elsa y las pantallas distintas de la home.

## Archivos

- `index.html` — estructura de la home y overlays
- `styles.css` — tokens heredados de `PRV_Customer Portal v3.3` + paleta de áreas
- `app.js` — estado, render e interacciones
