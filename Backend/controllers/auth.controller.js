const users = require("../model/users.json");
const { createSession } = require("../middleware/auth.middleware");

exports.login = (req, res) => {
    // Extrae 'cuenta' del body de la petición (protección contra body undefined)
    const { cuenta } = req.body || {};
    // Acepta 'contrasena' o 'contraseña' (con/sin ñ) usando optional chaining
    const contrasena = req.body?.contrasena ?? req.body?.["contraseña"];

    // Valida que vengan ambos campos requeridos
    if (!cuenta || !contrasena) {
    // Responde 400 Bad Request si faltan datos
    return res.status(400).json({
        error: "Faltan campos obligatorios: 'cuenta' y 'contrasena'.",
        ejemplo: { cuenta: "tuNombre", contrasena: "tuContra" }
    });
    }

    // Busca un usuario que coincida exactamente con cuenta Y contraseña
    const match = users.find(u => u.cuenta === cuenta && u.contrasena === contrasena);

    // Si no encuentra coincidencia, credenciales incorrectas
    if (!match) {
    // Responde 401 Unauthorized
    return res.status(401).json({ error: "Credenciales inválidas." });
    }

    // Login exitoso: generar token de sesión
    const token = createSession(match.cuenta); // Usamos 'cuenta' como userId

    console.log(`[LOGIN] Usuario: ${match.cuenta} | Token: ${token} | Procede el login`);

    return res.status(200).json({
    mensaje: "Acceso permitido",
    usuario: { cuenta: match.cuenta }, // Devuelve solo la cuenta, NO la contraseña
    token: token // Token de sesión para usar en peticiones protegidas
    });
};