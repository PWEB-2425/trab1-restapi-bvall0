// backend/models/cursoModel.js
const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  duracao: { type: Number, required: true }, // em anos, por exemplo
});

module.exports = mongoose.model('Curso', cursoSchema);