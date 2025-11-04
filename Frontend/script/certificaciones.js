import servicios from "./servicios.js";

document.addEventListener("DOMContentLoaded", () => {
  const btnPagar = document.getElementById("btnPagar");
  const btnDescargar = document.getElementById("btnDescargarCertificado");

  if (btnPagar) {
    btnPagar.onclick = (e) => {
      e.preventDefault();
      servicios.comprar();
    };
  }

  const botonesAgotado = document.querySelectorAll(".btnError");

  const alertaAgotado = () => {
    Swal.fire({
      title: "Este curso estará disponible a partir del 31 de diciembre de 2025",
      icon: "error",
      confirmButtonText: "Ok",
    });
  };

  botonesAgotado.forEach((b) => {
    b.addEventListener("click", alertaAgotado);
  });

  // Funcion anonima para verificar si el usuario esta logeado, ya paso, aprobo o no
  (async () => {
    if (servicios.verificarUsuario()) {
      // Si el usuario está logueado, checamos si ya pasó
      const yaPaso = await servicios.verificarExamenRealizado();
    
      if (yaPaso) {
         // SÍ APROBÓ: Mostramos "Descargar"
         if (btnDescargar) btnDescargar.style.display = 'block';
      } else {
        // NO HA APROBADO: "Descargar" esta oculto
        if (btnDescargar) btnDescargar.style.display = 'none';
      }
    } else {
      // NO ESTÁ LOGUEADO: "Descargar" esta oculto
      if (btnDescargar) btnDescargar.style.display = 'none';
    }
  })();

  // Mandamos a llamar a la funcion para descargar Certificado
  if (btnDescargar) {
    btnDescargar.onclick = () => {
     servicios.descargarCertificado();
    };
  }

  document.getElementById("btnIniciarExamen").onclick = async () => {
    if (servicios.verificarUsuario()) {
      if (await servicios.verificarExamenComprado()) {
        
        if (!(await servicios.verificarExamenRealizado())) {
          window.location.href = "examen.html";
        } else {
          Swal.fire({
            title: "¡Examen ya realizado!",
            text: "Ya has completado esta certificación con anterioridad.",
            icon: "info",
            confirmButtonText: "Ok",
          });
        }

      } else {
        Swal.fire({
          title: "Debes comprar la certificación primero!",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    } else {
      Swal.fire({
        title: "Debes iniciar sesión y comprar el examen primero!",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };
});