import conversion from "./examen.js";

const login = async (usuario, contrasena) => {
  try {
    const respuesta = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cuenta: usuario,
        contrasena: contrasena,
      }),
    });

    let data;

    try {
      data = await respuesta.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("cuenta", usuario);

      servicios.actualizarSesion();

      Swal.fire({
        title: "Sesión Iniciada Con Éxito!!",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } catch (parseErr) {
      console.warn("Respuesta no  es JSON del servidor", parseErr);
      data = {};
    }
  } catch (error) {
    console.error("Error al llamar a la API:", error);
    alert("Error al llamar al servidor: " + error.message);
  }
};

const logout = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (res.ok) {
      Swal.fire({
        title: "Sesión Cerrada Con Éxito!!",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } else {
      const data = await res.json();
      alert(data?.error ?? `Error al cerrar sesión`);
    }
  } catch (err) {
    console.error("Error al conectar con el servidor:", err);
    alert("Error de conexión");
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("cuenta");
    actualizarSesionLogOut();
  }
};

const comprar = async () => {
  if (!verificarUsuario()) {
    Swal.fire({
      title:
        "Inicia sesión con tu cuenta para poder comprar esta certificación!!",
      confirmButtonText: "Ok",
    });
    return;
  }
  
  if (await verificarExamenComprado()) {
    Swal.fire({
      title: "Ya has comprado esta certificación!! Disfrútala",
      icon: "success",
      confirmButtonText: "Ok",
    });
  } else {
    try {
      const res = await fetch("http://localhost:3000/api/pago", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) {
        Swal.fire({
          title: "¡Compra Exitosa!",
          text: "Tu certificación ha sido activada.",
          icon: "success",
          confirmButtonText: "Genial",
        });
      } else {
        const errorData = await res.json();
        Swal.fire({
          title: "Error en el pago",
          text: errorData.error || "No se pudo procesar el pago.",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    } catch (err) {
      console.error("Error en la conexión de pago:", err);
      Swal.fire({
        title: "Error de conexión",
        text: "No se pudo conectar con el servidor de pagos.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  }
};

const verificarExamenComprado = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/compra", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (res.ok) {
      const datos = await res.json();
      return datos.comprado;
    } else {
      console.error("Error al verificar compra:", await res.text());
      return false;
    }
  } catch (err) {
    console.error("Error de red al verificar compra:", err);
    return false;
  }
};

const verificarUsuario = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  } else {
    return true;
  }
};

const start = async () => {
  try {
    const respuesta = await fetch("http://localhost:3000/api/start", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!respuesta.ok) throw new Error("Error en la respuesta");
    const datos = await respuesta.json();

    console.log(datos.duration);
    iniciarTimer(datos.duration);
    return datos.questions;
  } catch (error) {
    console.error("Error al llamar a la API:", error);
    alert("Error al llamar al servidor: " + error.message);
  }
};

function iniciarTimer(duracion) {
  const timerHTML = document.getElementById("tiempo");

  let timerInterval = setInterval(() => {
    const minutos = Math.floor(duracion / 60);
    const segundos = duracion % 60;

    const minutosChidos = String(minutos).padStart(2, "0");
    const segundosChidos = String(segundos).padStart(2, "0");

    timerHTML.innerText = `Tiempo restante: ${minutosChidos}:${segundosChidos}`;

    if (duracion <= 0) {
      clearInterval(timerInterval);
      timerHTML.innerText = "Tiempo terminado";

      console.log("El tiempo terminó. Enviando respuestas...");

      const respuestasAEnviar = conversion.convertirPreguntas();
      console.log(respuestasAEnviar);
      submit(respuestasAEnviar);
    } else {
      duracion--;
    }
  }, 1000);
}

const submit = async (respuestasUsuario) => {
  const res = await fetch("http://localhost:3000/api/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ answers: respuestasUsuario }),
  });

  const data = await res.json();

  console.log(data);
};

function actualizarSesion() {
  const userName = localStorage.getItem("cuenta");
  if (userName) {
    actualizarSesionLogIn(userName);
  } else {
    actualizarSesionLogOut();
  }
}

function actualizarSesionLogIn() {
  document.getElementById("logInbtn").style.display = "none";
  document.getElementById("logOutbtn").style.display = "inline-block";
}

function actualizarSesionLogOut() {
  document.getElementById("logInbtn").style.display = "inline-block";
  document.getElementById("logOutbtn").style.display = "none";
}

const servicios = {
  login,
  logout,
  comprar,
  start,
  submit,
  actualizarSesion,
  verificarExamenComprado,
  verificarUsuario
};

export default servicios;
