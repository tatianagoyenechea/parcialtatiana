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

      alert(`Gracias por su contacto, ${nombre}. En breve le estaré respondiendo.`);
    });
  }
});
