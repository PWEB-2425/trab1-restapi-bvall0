require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json'); // ajuste o caminho se precisar

const alunoRoutes = require('./routes/alunoRoutes');
const cursoRoutes = require('./routes/cursoRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Rotas da API
app.use('/alunos', alunoRoutes);
app.use('/cursos', cursoRoutes);

// Rota do Swagger para documentação
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware para erros 404
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint não encontrado' });
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Servidor a correr na porta ${process.env.PORT}`);
      console.log(`Swagger UI disponível em http://localhost:${process.env.PORT}/api-docs`);
    });
  })
  .catch(err => {
    console.error('Erro ao ligar à base de dados', err);
    process.exit(1);
  });