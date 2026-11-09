// ===== PARTE 1: REPRODUCTOR =====
// Buscamos los elementos en la página (si no existen, valen null)
const player = document.getElementById("player");
const tituloVideo = document.getElementById("titulo-video");

// Función que cambia el video del iframe
function cargarVideo(id, titulo) {
  player.src = "https://www.youtube-nocookie.com/embed/" + id;
  if (titulo) {
    tituloVideo.textContent = titulo;
  }
}

// Solo corre si estamos en reproductor.html (es decir, si existe el iframe)
if (player) {

  // 1) Botones: al hacer clic, cambian el video
  const botones = document.querySelectorAll("button[data-id]");
  botones.forEach(function (boton) {
    boton.addEventListener("click", function () {
      cargarVideo(boton.dataset.id, boton.dataset.titulo);
    });
  });

  // 2) Galería: leer el ID que viene en la dirección (?v=ID)
  const parametros = new URLSearchParams(window.location.search);
  const idDesdeGaleria = parametros.get("v");

  if (idDesdeGaleria) {
    // Buscamos el botón con ese ID para obtener el título
    const botonCoincide = document.querySelector('button[data-id="' + idDesdeGaleria + '"]');
    const titulo = botonCoincide ? botonCoincide.dataset.titulo : "Video seleccionado";
    cargarVideo(idDesdeGaleria, titulo);
  }
}

// ===== PARTE 2: FORMULARIO DE CONTACTO =====
const formulario = document.getElementById("formulario");

if (formulario) {
  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault(); // evita que la página se recargue

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();
    const aviso = document.getElementById("mensaje-form");

    if (nombre === "" || email === "" || mensaje === "") {
      aviso.textContent = "⚠️ Completá todos los campos.";
      aviso.style.color = "orange";
    } else {
      aviso.textContent = "✅ ¡Gracias " + nombre + "! Tu mensaje fue enviado.";
      aviso.style.color = "lightgreen";
      formulario.reset();
    }
  });
}
