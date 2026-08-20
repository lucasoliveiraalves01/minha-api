// Nome(s): __________________________
const express = require('express');
const fs = require('fs');
const app = express();
const ARQUIVO = 'alunos.json';
app.use(express.json()); // permite ler o corpo (body) em JSON
// Lê os alunos do arquivo e retorna um array
function lerAlunos() {
return JSON.parse(fs.readFileSync(ARQUIVO, 'utf-8'));
}
// Salva o array de volta no arquivo
function salvarAlunos(alunos) {
fs.writeFileSync(ARQUIVO, JSON.stringify(alunos, null, 2));
}
// GET /alunos -> lista todos (PRONTA)
app.get('/alunos', (req, res) => {
res.json(lerAlunos());
});
// POST /alunos -> matricula um novo aluno (PRONTA)
app.post('/alunos', (req, res) => {
const alunos = lerAlunos();
const novo = { id: Date.now(), ...req.body };
alunos.push(novo);
salvarAlunos(alunos);
res.status(201).json(novo);
});
// GET /alunos/:id -> busca um aluno pelo id
app.get('/alunos/:id', (req, res) => {
const aluno = lerAlunos().find((item) => item.id === Number(req.params.id));

if (!aluno) {
res.status(404).json({ erro: 'Aluno não encontrado' });
return;
}

res.json(aluno);
});

// PUT /alunos/:id -> atualiza um aluno
app.put('/alunos/:id', (req, res) => {
const alunos = lerAlunos();
const indice = alunos.findIndex((item) => item.id === Number(req.params.id));

if (indice === -1) {
res.status(404).json({ erro: 'Aluno não encontrado' });
return;
}

alunos[indice] = { ...alunos[indice], ...req.body, id: alunos[indice].id };
salvarAlunos(alunos);
res.json(alunos[indice]);
});

// DELETE /alunos/:id -> remove um aluno
app.delete('/alunos/:id', (req, res) => {
const alunos = lerAlunos();
const indice = alunos.findIndex((item) => item.id === Number(req.params.id));

if (indice === -1) {
res.status(404).json({ erro: 'Aluno não encontrado' });
return;
}

alunos.splice(indice, 1);
salvarAlunos(alunos);
res.status(204).send();
});

app.listen(3000, () => {
console.log('Academia rodando em http://localhost:3000');
});