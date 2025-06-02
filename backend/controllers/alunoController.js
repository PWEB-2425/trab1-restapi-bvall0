const Aluno = require('../models/alunoModel');

exports.criarAluno = async (req, res) => {
  try {
    const aluno = new Aluno(req.body);
    await aluno.save();
    res.status(201).json(aluno);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.listarAlunos = async (req, res) => {
  try {
    const alunos = await Aluno.find();
    res.json(alunos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};