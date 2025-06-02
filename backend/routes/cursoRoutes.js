const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');

router.get('/', cursoController.getAllCursos);

// Se quiseres, podes adicionar post, put, delete aqui também

module.exports = router;
