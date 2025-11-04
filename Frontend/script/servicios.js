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

      if (respuesta.ok) {
        servicios.actualizarSesion();
        Swal.fire({
          title: "Sesión Iniciada Con Éxito!!",
          icon: "success",
          confirmButtonText: "Ok",
        });
      } else {
        Swal.fire({
          title: "Credenciales incorrectas! 👹",
          icon: "error", 
          confirmButtonText: "Ok",
        });
      }
    } catch (parseErr) {
      console.warn("Respuesta no  es JSON del servidor", parseErr);
      data = {};
    }
  } catch (error) {
    console.error("Error al llamar a la API:", error);
    Swal.fire({
      title: "Error al llamar al servidor°",
      icon: "error",
      confirmButtonText: "Ok",
    });
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
      Swal.fire({
        title: data?.error ?? `Error al cerrar sesión`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  } catch (err) {
    console.error("Error al conectar con el servidor:", err);
    Swal.fire({
      title: "Error de conexión",
      icon: "error",
      confirmButtonText: "Ok",
    });
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
    return datos;
  } catch (error) {
    console.error("Error al llamar a la API:", error);
    Swal.fire({
      title: data?.error ?? "Error al llamar al servidor: " + error.message,
      icon: "error",
      confirmButtonText: "Ok",
    });
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
  try {
    const res = await fetch("http://localhost:3000/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ answers: respuestasUsuario }),
    });

    const data = await res.json();

    if (!res.ok) {
      await Swal.fire({
        title: "Error del servidor",
        text: `${res.error}`,
        icon: "error",
        confirmButtonText: "Entendido",
      });
    }

    if (data.approved) {
      await Swal.fire({
        title: "¡Felicidades! Has Aprobado",
        text: `Tu calificación fue: ${data.score} de ${data.total}.`,
        icon: "success",
        confirmButtonText: "Genial",
      });
    } else {
      await Swal.fire({
        title: "Has Reprobado 😥",
        text: `Tu calificación fue: ${data.score} de ${data.total}. Necesitabas 7 para aprobar.`,
        icon: "error",
        confirmButtonText: "Entendido",
      });
    }

    window.location.href = "certificaciones.html";
  } catch (err) {
    console.error("Error de red al enviar el examen:", err);
    Swal.fire({
      title: "Error de Conexión",
      text: "No se pudieron enviar tus respuestas. Revisa tu conexión.",
      icon: "error",
    });
    return;
  }
};

const mandarComentario = async (_comentario, _correo) => {
  try {
    const res = await fetch("http://localhost:3000/api/captura", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mensaje: _comentario,
        correo: _correo,
      }),
    });

    if (res.ok) {
      Swal.fire({
        title: "Tu comentario fue guardado, gracias por confiar en nosotros!!",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } else {
      const errorData = await res.json();
      Swal.fire({
        title: "Error al enviar",
        text: errorData.error || "No se pudo guardar el comentario.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  } catch (err) {
    console.error("Error de red al mandar comentario:", err);
    return false;
  }
};

function actualizarSesion() {
  const userName = localStorage.getItem("cuenta");
  if (userName) {
    actualizarSesionLogIn(userName);
  } else {
    actualizarSesionLogOut();
  }
}

const verificarExamenRealizado = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/pasado", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      return data.examen;
    }
  } catch (err) {
    console.error("Error al verificar si ya se hizo el examen:", err);
    Swal.fire({
      title: "Error de Conexión",
      text: "No se pudieron enviar tus respuestas. Revisa tu conexión.",
      icon: "error",
    });
    return;
  }
};

function actualizarSesionLogIn(nombreUsuario) {
  document.getElementById("userName").style.display = "inline-block";
  document.getElementById("userName").innerHTML = `${nombreUsuario}`;
  document.getElementById("userIcon").style.display = "inline-block";
  document.getElementById("logInbtn").style.display = "none";
  document.getElementById("logOutbtn").style.display = "inline-block";
}

function actualizarSesionLogOut() {
  document.getElementById("userName").style.display = "none";
  document.getElementById("userIcon").style.display = "none";
  document.getElementById("logInbtn").style.display = "inline-block";
  document.getElementById("logOutbtn").style.display = "none";
}

const descargarCertificado = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/certificate", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!res.ok) {
      // Si el servidor da un error 
      const errData = await res.json();
      Swal.fire('Error', errData.error || 'No se pudo generar el certificado.', 'error');
      return;
    }

    // Convertir la respuesta en un Blob (datos binarios del PDF)
    const blob = await res.blob();

    // Crear una URL temporal en el navegador para ese Blob
    const url = window.URL.createObjectURL(blob);

    // Crear un link <a> invisible para iniciar la descarga
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `Certificado-REACT.pdf`; // Nombre del archivo AQUI YO PENSABA PONER EL NOMBRE DEL USUARIO PERO NO LO ENCONTRE XD
    document.body.appendChild(a);
    a.click();

    // Limpiar la URL temporal
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

  } catch (err) {
    console.error("Error al descargar certificado:", err);
    Swal.fire('Error de Red', 'No se pudo conectar con el servidor para la descarga.', 'error');
  }
};


const servicios = {
  login,
  logout,
  comprar,
  start,
  submit,
  actualizarSesion,
  verificarExamenComprado,
  verificarUsuario,
  mandarComentario,
  verificarExamenRealizado,
  descargarCertificado
};

export default servicios;