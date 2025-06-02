const Curso = require('../models/cursoModel');

exports.getAllCursos = async (req, res) => {
  try {
    const cursos = await Curso.find(); // pega todos os cursos do MongoDB
    res.json(cursos);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno' });
  }
};