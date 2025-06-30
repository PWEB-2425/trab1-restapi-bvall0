const Aluno = require('../models/alunoModel');

exports.listarAlunos = async (req, res) => {
  try {
    const alunos = await Aluno.find();
    res.json(alunos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.criarAluno = async (req, res) => {
  try {
    const aluno = new Aluno(req.body);
    await aluno.save();
    res.status(201).json(aluno);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.buscarAlunoPorId = async (req, res) => {
  try {
    const aluno = await Aluno.findById(req.params.id);
    if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado' });
    res.json(aluno);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.atualizarAluno = async (req, res) => {
  try {
    const alunoAtualizado = await Aluno.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      overwrite: true, // para PUT: substituir todo o documento
    });
    if (!alunoAtualizado) return res.status(404).json({ message: 'Aluno não encontrado' });
    res.json(alunoAtualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletarAluno = async (req, res) => {
  try {
    const alunoRemovido = await Aluno.findByIdAndDelete(req.params.id);
    if (!alunoRemovido) return res.status(404).json({ message: 'Aluno não encontrado' });
    res.json({ message: 'Aluno removido com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
