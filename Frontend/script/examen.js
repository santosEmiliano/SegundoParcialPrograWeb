import servicios from "./servicios.js";

let preguntas;
let respuestasUsuario = {};

window.guardarRespuesta = (preguntaId, valorSeleccionado) => {
  respuestasUsuario[preguntaId] = valorSeleccionado;
};

const cargarPreguntas = async () => {
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
                  <p>${p.text}</p>
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

document.addEventListener("DOMContentLoaded", () => {
    
  const quizForm = document.getElementById("quizForm");
  const btnSiguiente = document.getElementById("btnSiguiente");
  const btnAnterior = document.getElementById("btnAnterior");
  const btnEnviar = document.getElementById("enviarRespuestas");

  if (quizForm) {
    
    cargarPreguntas();

    if(btnSiguiente) {
      btnSiguiente.onclick = () => {
        const indice = parseInt(localStorage.getItem("question"), 10);

        if (indice === 7) {
          return;
        } else {
          localStorage.setItem("question", indice + 1);
        }
        cargarPregunta();
      };
    }
    
    if(btnAnterior) {
      btnAnterior.onclick = () => {
        const indice = parseInt(localStorage.getItem("question"), 10);

        if (indice === 0) {
          return;
        } else {
          localStorage.setItem("question", indice - 1);
        }
        cargarPregunta();
      };
    }
    
    if(btnEnviar) {
      btnEnviar.onclick = (e) => {
        e.preventDefault();
        servicios.submit(convertirPreguntas());
      };
    }
  }
});

function convertirPreguntas() {
  const ids = Object.keys(respuestasUsuario);

  const answersParaServidor = ids.map((preguntaIdString) => {
    const preguntaId = parseInt(preguntaIdString, 10);

    const respuestaSeleccionada = respuestasUsuario[preguntaIdString];

    return {
      id: preguntaId,
      answer: respuestaSeleccionada,
    };
  });

  return answersParaServidor;
}

const funciones = {
  convertirPreguntas,
};

export default funciones;