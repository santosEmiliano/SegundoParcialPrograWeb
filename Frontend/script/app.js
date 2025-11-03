import servicios from "./servicios.js";

document.addEventListener("DOMContentLoaded", () => {

  servicios.actualizarSesion();

  document.getElementById("logInbtn").onclick = () => {
    servicios.login("Santos@correo.com", "Santos123");
  };

  document.getElementById("logOutbtn").onclick = () => {
    servicios.logout();
  };
});