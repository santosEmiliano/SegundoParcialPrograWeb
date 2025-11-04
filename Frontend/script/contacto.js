import servicios from "./servicios.js";

document.addEventListener("DOMContentLoaded", () => {
  
  const formulario = document.getElementById("formularioContacto");

  formulario.addEventListener("submit", (e) => {
    
    e.preventDefault(); 

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const comentario = document.getElementById("comentario").value;

    servicios.mandarComentario(comentario, correo);

    Swal.fire({
      title: "¡Gracias!",
      text: "Tu mensaje ha sido enviado.",
      icon: "success"
    });

    formulario.reset();
  });

});