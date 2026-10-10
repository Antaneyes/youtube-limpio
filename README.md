# YouTube Limpio

Extensión para Firefox (Manifest V2) y Chrome (Manifest V3) que oculta en YouTube:

- **Suscripciones**: la sección «Más relevantes».
- **Inicio**: las secciones de noticias («Últimas noticias»), «Jugables» y las promociones de miembros.

Solo usa un content script (`content.js` + `content.css`) en `www.youtube.com`; no pide permisos ni recoge datos.

## Ficheros

- `src/content.js`, `src/content.css`: código de la extensión, común a los dos navegadores.
- `manifest.firefox.json`: Manifest V2, ID `yt-limpio@josh.local`, Firefox ≥ 140.
- `manifest.chrome.json`: Manifest V3 (Chrome ya no admite V2); mismo content script.
- `build.sh`: genera `build/firefox/` y `build/chrome/` (para cargar sin empaquetar) y `dist/yt-limpio-<versión>-<navegador>.zip`.
- `firmadas/`: versiones firmadas por Mozilla (`yt-limpio-<versión>.xpi`), listas para instalar de forma permanente. No se suben a git.

## Probar y publicar

Al cambiar de versión, subir `version` en los dos manifest y ejecutar `./build.sh`.

**Firefox**
1. Prueba temporal: `about:debugging#/runtime/this-firefox` → *Cargar complemento temporal…* → `build/firefox/manifest.json`.
2. Firmar: subir `dist/yt-limpio-<versión>-firefox.zip` a [addons.mozilla.org](https://addons.mozilla.org/developers/) como complemento autodistribuido y guardar el `.xpi` firmado en `firmadas/yt-limpio-<versión>.xpi`.

**Chrome**
- `chrome://extensions` → *Modo de desarrollador* → *Cargar descomprimida* → `build/chrome/`. Queda instalada de forma permanente sin firmar.
