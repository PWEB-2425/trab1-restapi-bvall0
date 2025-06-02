const express = require('express');
const router = express.Router();
const Curso = require('../models/cursoModel');

// Listar cursos
router.get('/', async (req, res) => {
  try {
    const cursos = await Curso.find();
    res.json(cursos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Criar curso
router.post('/', async (req, res) => {
  const curso = new Curso({
    nome: req.body.nome,
    duracao: req.body.duracao,
    descricao: req.body.descricao
  });

  try {
    const novoCurso = await curso.save();
    res.status(201).json(novoCurso);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;