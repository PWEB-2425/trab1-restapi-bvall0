# Projeto REST API - Gestão de Alunos e Cursos

Este projeto consiste numa API RESTful desenvolvida com **Node.js**, **Express** e **MongoDB**, juntamente com um frontend simples para interagir com os dados de **alunos** e **cursos**.

---

## 🗂️ Estrutura do Projeto

```
trab1-restapi-bvall0/
│
├── backend/                  # API RESTful com Express + MongoDB
│   ├── models/               # Modelos Mongoose
│   ├── routes/               # Rotas da API
│   ├── .env                  # Variáveis de ambiente
│   ├── server.js             # Servidor principal
│   └── package.json
│
├── frontend/                 # Página web simples para consumir a API
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── mock-server/             # Mock API com JSON Server 
│   ├── db.json
│   └── package.json
```

---

## 🚀 Deploy Back-End no Render

### 🛠️ Pré-requisitos

- Conta no GitHub
- Conta em [Render](https://render.com/)
- MongoDB Atlas (base de dados online)

### 🌐 URL pública da API

`https://nome-do-teu-servico.onrender.com`  
(Substitui pelo link real gerado pelo Render)

### ⚙️ Configurações do Render

- **Web Service**
- Conectar ao repositório GitHub
- Escolher o diretório `/backend`
- **Build Command:**  
  ```
  npm install
  ```
- **Start Command:**  
  ```
  npm start
  ```
- **Environment Variables:**
  - `PORT=5000`
  - `MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/...?retryWrites=true...`

---

## 💻 Como Correr Localmente

### 1. Clona o repositório

```bash
git clone https://github.com/PWEB-2425/trab1-restapi-bvall0.git
cd trab1-restapi-bvall0
```

### 2. Backend

```bash
cd backend
npm install
npm run dev
```

Criar um ficheiro `.env`:

```
MONGODB_URI=mongodb+srv://bval9088:**********************@cluster0.iqjwizq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
```

### 3. Frontend

```bash
cd ../frontend
```

Abre o `index.html` no navegador.  
Garante que o `script.js` está apontando para a URL da API:

```js
const API_URL = 'https://trab1-restapi-bvall0.onrender.com/';
```

---

## Vercel

Deploy Front-End no Vercel
Passos
Acede a https://vercel.com/

Liga a tua conta GitHub

Cria um novo projeto e escolhe o repositório

Seleciona a branch deploy-frontend

Em Root Directory, coloca: frontend

Framework Preset: Other

Não precisas de configurar build nem output

Finaliza e aguarda o deploy

🔗 URL pública do front-end
https://trab1-restapi-bvall0.vercel.app/


⚠️ No script.js, garante que a variável API_URL está correta, apontando para a URL do backend no Render.


## 🧪 Testar API

### Endpoints principais

| Método | Rota          | Descrição                    |
|--------|---------------|------------------------------|
| GET    | /alunos       | Lista todos os alunos        |
| POST   | /alunos       | Cria novo aluno              |
| GET    | /cursos       | Lista todos os cursos        |
| POST   | /cursos       | Cria novo curso              |
| ...    | ...           | Outras operações (PUT, DEL)  |

Testar via Postman ou navegador (GET).

---

## 📦 Mock Server 

Usado para testes rápidos sem conexão com MongoDB.

### Instalação

```bash
cd mock-server
npm install
```

### Executar

```bash
npm start
```

Abre em:  
`http://localhost:5000`

---

## 📚 Tecnologias Usadas

- Node.js
- Express
- MongoDB + Mongoose
- JSON Server (mock)
- HTML/CSS/JS Vanilla
- Render.com (Deploy)

---

## ✍️ Autor

Bruno Valente (9088)  
Projeto PWEB 2025 – REST API (Trabalho Prático 1)

---