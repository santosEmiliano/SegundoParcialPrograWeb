const fs = require('fs');
const path = require('path')

const route = path.join(__dirname, '..', 'model', 'publications.json'); //Sacamos ruta porque con .. te pone la del mugre back

const saveMessage = (req, res) => {
    try {
        //Guardamos todo
        const userId = req.userId;
        const mensaje = req.body.mensaje;

        //Chcamos que haya algo
        if (!mensaje) {
            return res.status(400).json({ error: 'No vamos a guardar un mensaje vacio' });
        }

        //Array de publicaciones vacio
        let publicaciones = [];

        //Abrimos el archivo
        if(fs.existsSync(route)) {
            const data = fs.readFileSync(route, 'utf8')
            if (data) publicaciones = JSON.parse(data); //Llenamos el array
        }

        let newId = 0;
        if (publicaciones.length === 0) {
            newId = 1;
        } else {
            const ultPub = publicaciones[publicaciones.length - 1]; //Sacamos el ultimo coso
            newId = ultPub.id + 1;
        }

        //Creamos publicacion
        const publicacion = {
            id: newId,
            userId: userId,
            text: mensaje,
            fecha: new Date().toISOString()
        };

        publicaciones.push(publicacion); //Subimos la nueva publicacion

        const textJSON = JSON.stringify(publicaciones, null, 2);
        fs.writeFileSync(route, textJSON);

        res.status(201).json({
            message: "Publicacion registrada con exito",
            publication: publicacion
        });

    } catch (error) {
        console.error('Error al guardar la publicacion:', error);
        res.status(500).json({ error: 'Error interno del servidor en la captura del mensaje' });
    }
}

const sendPublications = (req, res) => {
    try {
        //Array de publicaciones vacio
        let publicaciones = [];

        //Abrimos el archivo
        if(fs.existsSync(route)) {
            const data = fs.readFileSync(route, 'utf8')
            if (data) publicaciones = JSON.parse(data); //Llenamos el array
        }

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