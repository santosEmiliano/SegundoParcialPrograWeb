const sessions = new Map();

exports.verifyToken = (req, res, next) => {
    // Sacas la parte de authorization de header
    const authHeader = req.headers.authorization;

    // Verificar que si este ahi y este bien
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
        error: 'Token no dado o incorrecto',
        formato_esperado: 'Authorization: Bearer <token>' 
    });
    }

    // Quitar el token del header
    const token = authHeader.substring(7);

    // Verificar si el token ya esta
    const userId = sessions.get(token);

    if (!userId) {
    return res.status(401).json({ 
        error: 'Token inválido o expirado' 
    });
    }

    // Si no esta le hacemos la token
    req.userId = userId;
    req.token = token;

    // Continuar con la siguiente función
    next();
};

//Creamos un token en esto
exports.createSession = (userId) => {
  const crypto = require('crypto');
  // Usar crypto.randomUUID cuando esté disponible (Node 14.17+).
  // Si no está disponible, hacer fallback a randomBytes para compatibilidad.
  const token = (typeof crypto.randomUUID === 'function')
    ? crypto.randomUUID()
    : crypto.randomBytes(32).toString('hex');
  sessions.set(token, userId);
  return token;
};

//Lo borramos aca
exports.deleteSession = (token) => {
  return sessions.delete(token);
};