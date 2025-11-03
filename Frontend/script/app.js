/*Swal.fire({
    title: 'Error de conexión con el servidor 😭',
    icon: 'error',
    confirmButtonText: 'Ok'
});*/

import servicios from "./servicios.js";

servicios.actualizarSesion();

document.getElementById("logInbtn").onclick = () => {
  servicios.login("Santos@correo.com", "Santos123");
};

document.getElementById("logOutbtn").onclick = () => {
  servicios.logout();
};