/*Swal.fire({
    title: 'Error de conexión con el servidor 😭',
    icon: 'error',
    confirmButtonText: 'Ok'
});*/

import servicios from "./servicios.js";

let preguntas;
let respuestasUsuario = {};

window.guardarRespuesta = (preguntaId, valorSeleccionado) => {
  respuestasUsuario[preguntaId] = valorSeleccionado;
  console.log("Respuestas Actuales:", respuestasUsuario);
};

document.addEventListener("DOMContentLoaded", function () {
  servicios.actualizarSesion();

  document.getElementById("logInbtn").onclick = () => {
    servicios.login("Santos", "Santos123");
  };

  document.getElementById("logOutbtn").onclick = () => {
    servicios.logout();
  };

  document.getElementById("btnPreguntas").onclick = async () => {
    preguntas = await servicios.start();

    if (preguntas) {
      localStorage.setItem("question", 0);
      cargarPregunta();
    }
  };

  const cargarPregunta = () => {
    const pregunta = document.getElementById("pregunta");
    pregunta.innerHTML = "";

    const p = preguntas[localStorage.getItem("question")];

    const respuestaGuardada = respuestasUsuario[p.id];

    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
                  <p><strong>${p.id}.</strong> ${p.text}</p>
                  ${p.options
                    .map((opt) => {
                      const isChecked =
                        respuestaGuardada === opt ? "checked" : "";

                      return `
                        <label>
                      <input type="radio" name="q_${p.id}" value="${opt}" onchange="guardarRespuesta(${p.id}, this.value)" ${isChecked}> ${opt}
                    </label><br>
                  `;
                    })
                    .join("")}
                `;
    pregunta.appendChild(div);
    document.getElementById("quizForm").style.display = "block";
  };

  document.getElementById("btnSiguiente").onclick = () => {
    const indice = parseInt(localStorage.getItem("question"), 10);

    if (indice === 7) {
      return;
    } else {
      localStorage.setItem("question", indice + 1);
    }
    cargarPregunta();
  };

  document.getElementById("btnAnterior").onclick = () => {
    const indice = parseInt(localStorage.getItem("question"), 10);

    if (indice === 0) {
      return;
    } else {
      localStorage.setItem("question", indice - 1);
    }
    cargarPregunta();
  };
});
