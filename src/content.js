// Títulos de las secciones a ocultar, por página (en minúsculas).
const SECCIONES = {
  subscriptions: ["más relevantes", "mas relevantes", "most relevant"],
  home: [
    "últimas noticias", "ultimas noticias", "noticias destacadas",
    "latest news", "top news", "breaking news",
    "jugables", "playables",
    "saca más partido a las suscripciones"
  ]
};

// Contenedores de sección que YouTube usa en los feeds.
const CONTENEDORES = "ytd-rich-section-renderer, ytd-shelf-renderer, ytd-rich-shelf-renderer";
const TITULOS = "#title, #title-text, h2, [role='heading']";

function limpiar() {
  for (const [pagina, titulos] of Object.entries(SECCIONES)) {
    const browse = document.querySelector(`ytd-browse[page-subtype="${pagina}"]`);
    if (!browse) continue;
    for (const seccion of browse.querySelectorAll(CONTENEDORES)) {
      if (seccion.hasAttribute("data-yt-limpio-oculto")) continue;
      for (const t of seccion.querySelectorAll(TITULOS)) {
        if (titulos.includes(t.textContent.trim().toLowerCase())) {
          // Ocultar la sección más externa para no dejar huecos ni separadores.
          const exterior = seccion.closest("ytd-rich-section-renderer") || seccion;
          exterior.setAttribute("data-yt-limpio-oculto", "");
          break;
        }
      }
    }
  }
}

let pendiente = false;
new MutationObserver(() => {
  if (pendiente) return;
  pendiente = true;
  requestAnimationFrame(() => { pendiente = false; limpiar(); });
}).observe(document.documentElement, { childList: true, subtree: true });

document.addEventListener("yt-navigate-finish", limpiar);
