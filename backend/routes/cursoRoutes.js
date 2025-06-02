const express = require('express');
const router = express.Router();
const Curso = require('../models/Curso'); // ou controller, se tiver

// Retornar todos os cursos
router.get('/', async (req, res) => {
  const cursos = await Curso.find();
  res.json(cursos);
});

// ✅ Retornar curso por ID
router.get('/:id', async (req, res) => {
  const curso = await Curso.findById(req.params.id);
  if (!curso) return res.status(404).json({ error: 'Curso não encontrado' });
  res.json(curso);
});

module.exports = router;
