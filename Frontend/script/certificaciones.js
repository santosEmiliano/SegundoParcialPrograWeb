import servicios from "./servicios.js";

document.addEventListener("DOMContentLoaded", () => {
  const btnPagar = document.getElementById("btnPagar");

  if (btnPagar) {
    btnPagar.onclick = (e) => {
      e.preventDefault();
      servicios.comprar();
    };
  }

  const botonesAgotado = document.querySelectorAll(".btnError");

  const alertaAgotado = () => {
    Swal.fire({
      title: "Este curso estará ddisponible a partir del 31 de diciembre de 2025",
      icon: "error",
      confirmButtonText: "Ok",
    });
  };

  botonesAgotado.forEach((b) => {
    b.addEventListener("click", alertaAgotado);
  });

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