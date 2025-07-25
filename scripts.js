// Transición suave al entrar a la página
// Efecto fade-in al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  // FADE IN al cargar
  document.body.classList.remove("opacity-0");

  // FADE OUT al hacer clic en un link
  document.querySelectorAll("a").forEach((enlace) => {
    const esInterno = enlace.hostname === window.location.hostname;

    if (esInterno) {
      enlace.addEventListener("click", function (e) {
        e.preventDefault();
        const urlDestino = this.href;

        document.body.classList.add("opacity-0");

        // Esperar a que termine la animación antes de cambiar de página
        setTimeout(() => {
          window.location.href = urlDestino;
        }, 500); // debe coincidir con la duración en Tailwind (500ms)
      });
    }
  });
});



// Validación del formulario de contacto
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formContacto");

  if (form) {
    form.addEventListener("submit", function(event) {
      const nombre = document.getElementById("nombre").value.trim();
      const email = document.getElementById("email").value.trim();
      const mensaje = document.getElementById("mensaje").value.trim();

      if (!nombre || !email || !mensaje) {
        alert("Por favor complete todos los campos obligatorios.");
        event.preventDefault();
        return;
      }

      // Validación básica de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Por favor ingrese un email válido.");
        event.preventDefault();
        return;
      }

      alert(`Su correo fue enviado, ${nombre}. En breve le estaré respondiendo.`);
    });
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formContacto");
  const mensajeEstado = document.getElementById("mensajeEstado");

  const campos = {
    nombre: {
      el: document.getElementById("nombre"),
      errorEl: document.getElementById("error-nombre"),
      validar: (v) => v.length >= 3,
      mensaje: "El nombre debe tener al menos 3 caracteres."
    },
    email: {
      el: document.getElementById("email"),
      errorEl: document.getElementById("error-email"),
      validar: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      mensaje: "Ingresá un correo válido."
    },
    asunto: {
      el: document.getElementById("asunto"),
      errorEl: document.getElementById("error-asunto"),
      validar: (v) => v.length === 0 || v.length >= 4,
      mensaje: "El asunto debe tener al menos 4 caracteres si se completa."
    },
    mensaje: {
      el: document.getElementById("mensaje"),
      errorEl: document.getElementById("error-mensaje"),
      validar: (v) => v.length >= 10,
      mensaje: "El mensaje debe tener al menos 10 caracteres."
    }
  };

  function mostrarMensaje(texto, tipo) {
    mensajeEstado.textContent = texto;
    mensajeEstado.className = `mt-4 text-center font-semibold transition-opacity duration-500 ${
      tipo === "error" ? "text-red-600" : "text-green-600"
    }`;
    mensajeEstado.style.opacity = "1";
    setTimeout(() => {
      mensajeEstado.style.opacity = "0";
    }, 4000);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let esValido = true;

    Object.values(campos).forEach(({ el, errorEl, validar, mensaje }) => {
      const valor = el.value.trim();
      if (!validar(valor)) {
        esValido = false;
        el.classList.add("border-red-500");
        el.classList.remove("border-green-500");
        errorEl.textContent = mensaje;
        errorEl.classList.remove("hidden");
      } else {
        el.classList.add("border-green-500");
        el.classList.remove("border-red-500");
        errorEl.textContent = "";
        errorEl.classList.add("hidden");
      }
    });

    if (!esValido) {
      mostrarMensaje("Por favor, corregí los errores antes de enviar.", "error");
      return;
    }

    mostrarMensaje("¡Gracias por tu contacto! El mensaje fue enviado.", "exito");
    form.reset();

    // Limpiar bordes y errores
    Object.values(campos).forEach(({ el, errorEl }) => {
      el.classList.remove("border-green-500", "border-red-500");
      errorEl.classList.add("hidden");
    });
  });
});

