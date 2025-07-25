document.addEventListener("DOMContentLoaded", () => {
  // --- LÓGICA DEL FORMULARIO DE CONTACTO ---
  const form = document.getElementById("formContacto");
  const mensajeEstado = document.getElementById("mensajeEstado");

  // Verificamos que el formulario exista en la página actual antes de continuar
  if (form && mensajeEstado) {
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
        validar: (v) => v.length === 0 || v.length >= 4, // Permite campo vacío o con al menos 4 caracteres
        mensaje: "El asunto es opcional, pero si lo escribís, debe tener al menos 4 caracteres."
      },
      mensaje: {
        el: document.getElementById("mensaje"),
        errorEl: document.getElementById("error-mensaje"),
        validar: (v) => v.length >= 10,
        mensaje: "El mensaje debe tener al menos 10 caracteres."
      }
    };

    // Función para mostrar mensajes de estado (éxito o error)
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

      // Limpiar bordes y errores después de un envío exitoso
      Object.values(campos).forEach(({ el, errorEl }) => {
        el.classList.remove("border-green-500", "border-red-500");
        errorEl.classList.add("hidden");
      });
    });
  }

  // --- LÓGICA DEL MODO OSCURO (MEJORADA) ---
  const modoBtn = document.getElementById('modo-btn');
  const body = document.body;

  // Función para aplicar el tema (oscuro o claro)
  const aplicarTema = (tema) => {
    if (tema === 'dark') {
      body.classList.add('dark');
      modoBtn.textContent = '☀️ Modo claro';
    } else {
      body.classList.remove('dark');
      modoBtn.textContent = '🌙 Modo oscuro';
    }
  };
  
  // Toggle para cambiar de modo al hacer clic
  modoBtn.addEventListener('click', () => {
    const esModoOscuro = body.classList.toggle('dark');
    const nuevoTema = esModoOscuro ? 'dark' : 'light';
    localStorage.setItem('theme', nuevoTema); // Guardamos la preferencia en el navegador
    aplicarTema(nuevoTema);
  });

  // Aplicar el tema guardado al cargar la página
  const temaGuardado = localStorage.getItem('theme') || 'light';
  aplicarTema(temaGuardado);
});

document.addEventListener("DOMContentLoaded", () => {
  // ... (Tu código existente para el formulario y modo oscuro) ...

  // --- LÓGICA DEL MENÚ HAMBURGUESA ---
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) { // Verificar si los elementos existen
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('hidden'); // Alterna la clase 'hidden' para mostrar/ocultar el menú
    });
  }
});