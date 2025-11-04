const usuarios = require("../model/users.json");
const examenesRealizados = new Map();


const checkBuy = (req, res) => {
    let bandera;
    try {
        const userBuscado = usuarios.find(u => u.cuenta === req.userId);
        if (!userBuscado) return res.status(404).json({ error: "La cuenta del usuario no ha sido encontrado"});

        bandera=userBuscado.comprado;

        if(!userBuscado.comprado) return res.status(402).json({
            message: "Pago no realizado, favor de pagar antes de intentar el examen",
            comprado: bandera
        })

    } catch (error) {
        console.error('Error en la actualizacion de estado de usuario:', error);
        return res.status(500).json({ error: 'Error interno del servidor en la lectura de la lista de mensajes' });
    }

    return res.status(200).json({
        message: "Pago realizado, suerte con su examen ;)",
        comprado: bandera
    });
}

const checkExam = (req, res) => {
    try {
        const yaRealizado = examenesRealizados.has(req.userId);
        
        if(!yaRealizado) return res.status(200).json({
            message: "Examen no aprobado, favor de mejorar",
            examen: false // El usuario NO lo ha realizado
        })

    } catch (error) {
        console.error('Error en la actualizacion de estado de usuario:', error);
        return res.status(500).json({ error: 'Error interno del servidor en la lectura de la lista de mensajes' });
    }

    return res.status(200).json({
        message: "Examen aprobado, deja de tryhardear ;)",
        examen: true // El usuario SÍ lo ha realizado
    });
}

const passedRegister = (userId) => {
    try {
        examenesRealizados.set(userId, new Date());

        console.log(`Usuario ${userId} marcado como 'examen: true' en la memoria.`);

    } catch (error) {
        console.error('Error en la actualizacion de estado de usuario:', error);
    }
}
 
const payExam = (req, res) => {
    let bandera;
    try {
        const userBuscado = usuarios.find(u => u.cuenta === req.userId);
        if (!userBuscado) return res.status(404).json({ error: "La cuenta del usuario no ha sido encontrado"});

        userBuscado.comprado = true;
        bandera = userBuscado.comprado

    } catch (error) {
        console.error('Error fatal al calificar o registrar el examen:', error);
        return res.status(500).json({ error: 'Error interno del servidor al procesar el examen' });
    }

    return res.status(200).json({
        message: "Pago validado",
        comprado: bandera
    });
}

// Funcion para verificar si un usuario paso
const hasUserPassed = (userId) =>{
    return examenesRealizados.has(userId);
}

// Funcion para obtener la fecha
const getExamDate = (userId) =>{
    return examenesRealizados.get(userId);
}

module.exports = { checkBuy, checkExam, passedRegister, payExam, hasUserPassed, getExamDate }