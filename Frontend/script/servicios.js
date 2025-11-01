const start = async () => {
  try {
    const respuesta = await fetch("http://localhost:3000/api/questions");
    if (!respuesta.ok) throw new Error("Error en la respuesta");
    const datos = await respuesta.json();
  } catch (error) {
    console.error("Error al llamar a la API:", error);
    alert("Error al llamar al servidor: " + error.message);
  }
};

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
    } catch (parseErr) {
      console.warn("Respuesta no  es JSON del servidor", parseErr);
      data = {};
    }

    console.log(data);

    localStorage.setItem('token', JSON.stringify(data.token));
  } catch (error) {
    console.error("Error al llamar a la API:", error);
    alert("Error al llamar al servidor: " + error.message);
  }
};

const servicios = {
  start, 
  login
};

export default servicios;