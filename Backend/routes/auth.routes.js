const express = require("express");
const { login } = require("../controllers/auth.controller");
const router = express.Router();

// Ruta publica para el login
router.post("/login", login);

module.exports = router;