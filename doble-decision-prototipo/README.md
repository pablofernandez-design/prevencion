# Doble Decisión — Prototipo (Portal del Cliente · Qida)

Prototipo interactivo del juego **Doble Decisión** basado en los diseños de Figma,
con una versión por dispositivo.

## Cómo abrirlo

Los navegadores bloquean algunos recursos con `file://`, así que lo más fiable es
servirlo por HTTP:

```bash
cd doble-decision-prototipo
python3 -m http.server 8777
```

Luego abre:
- **Índice / selector** → http://localhost:8777/index.html
- **Desktop** (1440×1024) → http://localhost:8777/desktop.html
- **Tablet** (744×1133 / 1133×744) → http://localhost:8777/tablet.html
- **Mobile** (390×844 / 844×390) → http://localhost:8777/mobile.html

## Flujo implementado

1. **Comenzar partida** (pantalla inicial): título, tarjeta *Nueva partida* y *¿Cómo jugar?*.
2. **Instrucciones**: vídeo con las reglas + *Comenzar partida*.
3. **Girar pantalla** (solo tablet/mobile): el juego se juega en horizontal.
4. **Pantalla de número de ronda** (imagen con blur; en la última: «Ronda final»).
5. **Cuenta atrás** 3 s («Fija la vista en el punto central»).
6. **Estímulo** sobre la imagen **nítida**: 0,5 s solo imagen → iconos (fruta central + ⭐️ periférica)
   durante 500 ms (se reduce hasta 80 ms según los aciertos) → 2 s solo imagen.
7. **¿Qué había en el centro?**: cards con estados normal / hover-pressed (desktop) / success / error.
8. **¿Dónde estaba el objeto?**: 8 zonas invisibles sobre la imagen con blur;
   hover (blanco 50 %) y pressed solo en desktop; al seleccionar, success (verde) o error (rojo).
9. Imagen con blur 2 s (no hay pantalla de «ronda terminada») → siguiente ronda.
10. Tras 8 rondas: **resultados** (imagen con blur de fondo, en horizontal en todos los dispositivos).

Cabeceras: en **desktop** barra blanca de breadcrumb + header de juego transparente;
en **mobile/tablet** solo el header de juego (botón circular de volver + pill + badge, sin barra blanca).

Para el flujo de juego se usan las pantallas **con imagen de fondo** (frutería), no las *dummy*.

## Estructura

- `index.html`, `desktop.html`, `tablet.html`, `mobile.html` — shells por dispositivo (`window.DEVICE`).
- `engine.js` — motor común (estado, transiciones, geometría radial).
- `styles.css` — estilos y tokens de Figma (Primary `#004039`, bg juegos `#F1F7F7`, tipografía Aeonik).
- `assets/fruteria.jpg` — imagen de fondo exportada de Figma.
