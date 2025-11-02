const express = require("express");
const { login, logout } = require("../controllers/auth.controller");
const { verifyToken } = require("../middleware/auth.middleware");
const { startQuiz, submitAnswers } = require("../controllers/questions.controller");
const router = express.Router();

// Ruta publica para el login
router.post("/login", login);

router.post("/logout", verifyToken, logout);

router.post("/start", verifyToken, startQuiz);

router.post("/submit", verifyToken, submitAnswers);

module.exports = router;