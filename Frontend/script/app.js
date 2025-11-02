/*Swal.fire({
    title: 'Error de conexión con el servidor 😭',
    icon: 'error',
    confirmButtonText: 'Ok'
});*/

import servicios from "./servicios.js";

document.addEventListener("DOMContentLoaded", function () {
  servicios.actualizarSesion();

  document.getElementById("logInbtn").onclick = () => {
    servicios.login("Santos", "Santos123");
  };

  document.getElementById("logOutbtn").onclick = () => {
    servicios.logout();
  };
});
