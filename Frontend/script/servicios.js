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
  const token = localStorage.getItem("token");

  if (!token) {
    alert("No te has logueado 😡");
    return;
  } else {
    alert("Todo joya, ya te logueaste 💋");
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

    return datos.questions;
  } catch (error) {
    console.error("Error al llamar a la API:", error);
    alert("Error al llamar al servidor: " + error.message);
  }
};

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
};

export default servicios;
