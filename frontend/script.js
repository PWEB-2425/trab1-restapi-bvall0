// URL base da API (JSON-server)
const API_BASE = 'http://localhost:3000';

// Variáveis globais para armazenar cursos e estado de edição
let cursos = [];
let editandoAlunoId = null;

/**
 * Função principal que inicia a aplicação
 * Carrega cursos e alunos após o DOM estar pronto (defer garante isso)
 */
async function iniciar() {
  await carregarCursos();
  await carregarAlunos();

  // Configura eventos dos botões e formulário
  configurarEventos();
}

/**
 * Carrega a lista de cursos da API e preenche o select #curso
 */
async function carregarCursos() {
  const cursoSelect = document.getElementById('curso');
  try {
    const resposta = await fetch(`${API_BASE}/cursos`);
    if (!resposta.ok) throw new Error(`Erro ao buscar cursos: ${resposta.status}`);
    cursos = await resposta.json();

    // Limpa opções e preenche com cursos
    cursoSelect.innerHTML = '';
    cursos.forEach(curso => {
      const option = document.createElement('option');
      option.value = String(curso.id);
      option.textContent = curso.nomeDoCurso;
      cursoSelect.appendChild(option);
    });
  } catch (erro) {
    alert('Erro ao carregar cursos: ' + erro.message);
    console.error(erro);
  }
}

/**
 * Carrega a lista de alunos da API e popula a tabela #alunos-tbody
 */
async function carregarAlunos() {
  const tbody = document.getElementById('alunos-tbody');
  try {
    const resposta = await fetch(`${API_BASE}/alunos`);
    if (!resposta.ok) throw new Error(`Erro ao buscar alunos: ${resposta.status}`);
    const alunos = await resposta.json();

    tbody.innerHTML = ''; // limpa tabela

    alunos.forEach(aluno => {
      // Busca o nome do curso pelo id armazenado no aluno.curso
      
      const cursoNome = cursos.find(c => Number(c.id) === Number(aluno.curso))?.nomeDoCurso || 'Desconhecido';


      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${aluno.nome}</td>
        <td>${aluno.apelido}</td>
        <td>${cursoNome}</td>
        <td>${aluno.anoCurricular}</td>
        <td>${aluno.idade}</td>
        <td>
          <button class="editar-btn" data-id="${aluno.id}">Editar</button>
          <button class="apagar-btn" data-id="${aluno.id}">Apagar</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (erro) {
    alert('Erro ao carregar alunos: ' + erro.message);
    console.error(erro);
  }
}

/**
 * Configura eventos de botões de editar, apagar e do formulário
 */
function configurarEventos() {
  const tbody = document.getElementById('alunos-tbody');
  const form = document.getElementById('aluno-form');
  const cancelarBtn = document.getElementById('cancelar-btn');
  const formTitle = document.getElementById('form-title');

  // Delegação para botões da tabela
  tbody.addEventListener('click', async (e) => {
    if (e.target.classList.contains('editar-btn')) {
      const id = e.target.dataset.id;
      await preencherFormularioParaEditar(id);
    }
    if (e.target.classList.contains('apagar-btn')) {
      const id = e.target.dataset.id;
      apagarAluno(id);
    }
  });

  // Envio do formulário para criar ou editar aluno
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const alunoData = {
      nome: form.nome.value.trim(),
      apelido: form.apelido.value.trim(),
      curso: parseInt(form.curso.value),
      anoCurricular: parseInt(form.anoCurricular.value),
      idade: parseInt(form.idade.value)
    };

    try {
      let resposta;
      if (editandoAlunoId) {
        // Editar aluno existente
        resposta = await fetch(`${API_BASE}/alunos/${editandoAlunoId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(alunoData)
        });
      } else {
        // Criar novo aluno
        resposta = await fetch(`${API_BASE}/alunos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(alunoData)
        });
      }

      if (!resposta.ok) throw new Error(`Erro ao salvar aluno: ${resposta.status}`);

      alert(editandoAlunoId ? 'Aluno editado com sucesso!' : 'Aluno adicionado com sucesso!');
      resetarFormulario();
      await carregarAlunos();
    } catch (erro) {
      alert(erro.message);
      console.error(erro);
    }
  });

  // Botão cancelar edição
  cancelarBtn.addEventListener('click', () => {
    resetarFormulario();
  });
}

/**
 * Preenche o formulário com os dados do aluno para edição
 * @param {string} id - ID do aluno a editar
 */
async function preencherFormularioParaEditar(id) {
  const form = document.getElementById('aluno-form');
  const cancelarBtn = document.getElementById('cancelar-btn');
  const formTitle = document.getElementById('form-title');

  try {
    const resposta = await fetch(`${API_BASE}/alunos/${id}`);
    if (!resposta.ok) throw new Error(`Erro ao buscar aluno: ${resposta.status}`);
    const aluno = await resposta.json();

    form.nome.value = aluno.nome;
    form.apelido.value = aluno.apelido;
    form.curso.value = String(aluno.curso);
    form.anoCurricular.value = aluno.anoCurricular;
    form.idade.value = aluno.idade;

    editandoAlunoId = id;
    formTitle.textContent = 'Editar Aluno';
    cancelarBtn.style.display = 'inline-block';
  } catch (erro) {
    alert(erro.message);
    console.error(erro);
  }
}

/**
 * Apaga um aluno após confirmação do usuário
 * @param {string} id - ID do aluno a apagar
 */
async function apagarAluno(id) {
  if (!confirm('Tem certeza que quer apagar este aluno?')) return;

  try {
    const resposta = await fetch(`${API_BASE}/alunos/${id}`, { method: 'DELETE' });
    if (!resposta.ok) throw new Error(`Erro ao apagar aluno: ${resposta.status}`);

    alert('Aluno apagado com sucesso!');
    if (editandoAlunoId === id) resetarFormulario();
    await carregarAlunos();
  } catch (erro) {
    alert(erro.message);
    console.error(erro);
  }
}

/**
 * Reseta o formulário para estado de criação de novo aluno
 */
function resetarFormulario() {
  const form = document.getElementById('aluno-form');
  const cancelarBtn = document.getElementById('cancelar-btn');
  const formTitle = document.getElementById('form-title');

  form.reset();
  editandoAlunoId = null;
  formTitle.textContent = 'Adicionar Aluno';
  cancelarBtn.style.display = 'none';
}

// Inicia a aplicação
iniciar();