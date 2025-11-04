import servicios from "./servicios.js";

document.addEventListener("DOMContentLoaded", () => {
  
  const logInBtn = document.getElementById("logInbtn");
  const logOutBtn = document.getElementById("logOutbtn");

  const loginModal = document.getElementById("loginModal");
  const closeModal = document.getElementById("closeModal");
  const formLogin = document.getElementById("formLogin");

  servicios.actualizarSesion();

  if (logOutBtn) {
    logOutBtn.onclick = () => {
      servicios.logout();
    };
  }

  if (logInBtn && loginModal) {
    logInBtn.onclick = () => {
      loginModal.style.display = "block";
    };
  }

  if (closeModal && loginModal) {
    closeModal.onclick = () => {
      loginModal.style.display = "none";
    };
  }

  window.onclick = (event) => {
    if (event.target === loginModal) {
      loginModal.style.display = "none";
    }
  };

  if (formLogin && loginModal) {
    formLogin.addEventListener("submit", (e) => {
      e.preventDefault(); 

      const usuario = document.getElementById("login").value;
      const contrasena = document.getElementById("password").value;

      servicios.login(usuario, contrasena);

      loginModal.style.display = "none";

      formLogin.reset();
    });
  }
});