const express = require("express");
const { login, logout } = require("../controllers/auth.controller");
const { verifyToken } = require("../middleware/auth.middleware");
const { startQuiz, submitAnswers } = require("../controllers/questions.controller");
const { saveMessage, sendPublications } = require("../controllers/publications.controller");
const { checkBuy, checkExam, payExam } = require("../controllers/verifications.controller")
const router = express.Router();

//          RUTAS LOGIN/LOGOUT

//Ruta de login (Sin proteccion)
router.post("/login", login);

//Ruta de logout (Proteccion por token)
router.post("/logout", verifyToken, logout);

//          RUTAS DE CUESTIONARIO

//Ruta para iniciar cuestionario (Proteccion por token)
router.get("/start", verifyToken, startQuiz);

//Ruta para revisar cuestionario (Proteccion por token)
router.post("/submit", verifyToken, submitAnswers);

//          RUTAS DE FORO DE PUBLICACIONES

//Ruta de captura de publicacion (Proteccion por token)
router.post("/captura", verifyToken, saveMessage);

//Ruta para obtener las publicaciones (Proteccion por token)
router.get("/lectura", verifyToken, sendPublications)

//          RUTAS DE VERIFICACION

module.exports = router;