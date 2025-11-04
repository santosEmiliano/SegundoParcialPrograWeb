const usuarios = require("../model/users.json");
let publicaciones = [];

const saveMessage = (req, res) => {
    try {
        //Guardamos todo
        const userId = req.userId;
        const mensaje = req.body.mensaje;

        //Chcamos que haya algo
        if (!mensaje) {
            return res.status(400).json({ error: 'No vamos a guardar un mensaje vacio' });
        }

        let newId = 0;
        if (publicaciones.length === 0) {
            newId = 1;
        } else {
            const ultPub = publicaciones[publicaciones.length - 1]; //Sacamos el ultimo coso
            newId = ultPub.id + 1;
        }

        const userBuscado = usuarios.find(u => u.cuenta === userId);

        //Creamos publicacion
        const publicacion = {
            id: newId,
            nombre: userBuscado.nombre,
            correo : userId,
            text: mensaje,
            fecha: new Date().toISOString()
        };

        publicaciones.push(publicacion); //Subimos la nueva publicacion

        console.log("--- Nueva publicación registrada ---");
        console.log(publicaciones);

        res.status(201).json({
            message: "Publicacion registrada con exito",
            publication: publicaciones
        });

    } catch (error) {
        console.error('Error al guardar la publicacion:', error);
        res.status(500).json({ error: 'Error interno del servidor en la captura del mensaje' });
    }
}

const sendPublications = (req, res) => {
    try {
        //Enviamos la lista de publicaciones
        res.status(200).json({
            message: "Publicaciones enviadas con exito",
            publicaciones: publicaciones
        });
    } catch (error) {
        console.error('Error en la lectura de las publicaciones:', error);
        res.status(500).json({ error: 'Error interno del servidor en la lectura de la lista de mensajes' });
    }
}

module.exports = { saveMessage, sendPublications }