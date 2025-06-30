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

router.patch('/:id', async (req, res) => {
  try {
    const cursoAtualizado = await Curso.findByIdAndUpdate(
      req.params.id,
      req.body, // atualiza só os campos enviados no body
      { new: true } // retorna o documento atualizado
    );
    if (!cursoAtualizado) return res.status(404).json({ message: 'Curso não encontrado' });
    res.json(cursoAtualizado);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deletar um curso
router.delete('/:id', async (req, res) => {
  try {
    const cursoRemovido = await Curso.findByIdAndDelete(req.params.id);
    if (!cursoRemovido) return res.status(404).json({ message: 'Curso não encontrado' });
    res.json({ message: 'Curso removido com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obter um curso pelo ID
router.get('/:id', async (req, res) => {
  try {
    const curso = await Curso.findById(req.params.id);
    if (!curso) return res.status(404).json({ message: 'Curso não encontrado' });
    res.json(curso);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;