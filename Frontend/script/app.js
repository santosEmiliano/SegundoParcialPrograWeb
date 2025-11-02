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

  document.getElementById("btnPreguntas").onclick = async () => {
    const preguntas = await servicios.start();

    if (preguntas) {
      localStorage.setItem("question", 0);
      cargarPreguntas(preguntas);
    }
  };

  const cargarPreguntas = (preguntas) => {
    const pregunta = document.getElementById("pregunta");
    pregunta.innerHTML = "";

    const p = preguntas[localStorage.getItem("question")];

    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
                  <p><strong>${p.id}.</strong> ${p.text}</p>
                  ${p.options
                    .map(
                      (opt) => `
                    <label>
                      <input type="radio" name="q_${p.id}" value="${opt}"> ${opt}
                    </label><br>
                  `
                    )
                    .join("")}
                `;
    pregunta.appendChild(div);
    document.getElementById("quizForm").style.display = "block";
  };
});
