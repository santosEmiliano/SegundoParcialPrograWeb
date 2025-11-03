import servicios from "./servicios.js";

document.addEventListener("DOMContentLoaded", () => {
  
  const btnPagar = document.getElementById("btnPagar");
  
  if (btnPagar) {
    btnPagar.onclick = (e) => {
      e.preventDefault();
      servicios.comprar();
    };
  }

  const botonesAgotado = document.querySelectorAll(".btnAgotado");

  const alertaAgotado = () => {
    Swal.fire({
      title: "Error en la compra: Cupo agotado!",
      icon: "error",
      confirmButtonText: "Ok",
    });
  };

  botonesAgotado.forEach((b) => {
    b.addEventListener("click", alertaAgotado);
  });

});