import servicios from "./servicios.js";

servicios.login("Santos", "Santos123");

Swal.fire({
    title: 'Error de conexión con el servidor 😭',
    icon: 'error',
    confirmButtonText: 'Ok'
});
