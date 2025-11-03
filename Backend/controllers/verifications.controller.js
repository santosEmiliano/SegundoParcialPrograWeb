const fs = require('fs');
const path = require('path')

const route = path.join(__dirname, '..', 'model', 'users.json'); //Sacamos ruta porque con .. te pone la del mugre back

const checkBuy = (req, res) => {
    let usuarios = [];
    let bandera;
    try {
        if(fs.existsSync(route)) {
            const data = fs.readFileSync(route, 'utf8')
            if (data) usuarios = JSON.parse(data); //Llenamos el array
        }
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
    let usuarios = [];
    let bandera;
    try {
        if(fs.existsSync(route)) {
            const data = fs.readFileSync(route, 'utf8')
            if (data) usuarios = JSON.parse(data); //Llenamos el array
        }
        const userBuscado = usuarios.find(u => u.cuenta === req.userId);
        if (!userBuscado) return res.status(404).json({ error: "La cuenta del usuario no ha sido encontrado"});

        bandera=userBuscado.examen;

        if(!userBuscado.examen) return res.status(403).json({
            message: "Examen no aprobado, favor de mejorar",
            comprado: bandera
        })

    } catch (error) {
        console.error('Error en la actualizacion de estado de usuario:', error);
        return res.status(500).json({ error: 'Error interno del servidor en la lectura de la lista de mensajes' });
    }

    return res.status(200).json({
        message: "Examen aprobado, deja de tryhardear ;)",
        comprado: bandera
    });
}

const passedRegister = (userId) => {
    let usuarios = [];

    try {
        if(fs.existsSync(route)) {
            const data = fs.readFileSync(route, 'utf8')
            if (data) usuarios = JSON.parse(data); //Llenamos el array
        }
        const userBuscado = usuarios.find(u => u.cuenta === userId);
        if (!userBuscado) return;

        userBuscado.examen = true;

        const textJSON = JSON.stringify(usuarios, null, 2);
        fs.writeFileSync(route, textJSON);

        console.log(`Usuario ${userId} marcado como 'examen: true'.`);

    } catch (error) {
        console.error('Error en la actualizacion de estado de usuario:', error);
    }
}

const payExam = (req, res) => {
    let usuarios = [];
    let bandera;
    try {
        if(fs.existsSync(route)) {
            const data = fs.readFileSync(route, 'utf8')
            if (data) usuarios = JSON.parse(data); //Llenamos el array
        }
        const userBuscado = usuarios.find(u => u.cuenta === req.userId);
        if (!userBuscado) return res.status(404).json({ error: "La cuenta del usuario no ha sido encontrado"});

        userBuscado.comprado = true;
        bandera = userBuscado.comprado

        const textJSON = JSON.stringify(usuarios, null, 2);
        fs.writeFileSync(route, textJSON);

    } catch (error) {
        console.error('Error fatal al calificar o registrar el examen:', error);
        return res.status(500).json({ error: 'Error interno del servidor al procesar el examen' });
    }

    return res.status(200).json({
        message: "Pago validado",
        comprado: bandera
    });
}

module.exports = { checkBuy, checkExam, passedRegister, payExam }