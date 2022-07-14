const express = require('express');

const { cadastrarUsuario } = require('./controladores/usuarios');
const { login } = require('./controladores/login');
const { cadastrarPostagem, atualizarPostagem, excluirPostagem, listarPostagens, listarPostagemUsuario } = require('./controladores/postagens');
const { verificarLogin } = require('./filtros/verificaLogin');

const rotas = express();

// Cadastro de usuario
rotas.post('/usuario', cadastrarUsuario);

// login
rotas.post('/login', login);

//feed principal
rotas.get('/', listarPostagens);

rotas.use(verificarLogin);

//Postagens
rotas.get('/postagens', listarPostagemUsuario);
rotas.post('/postagens', cadastrarPostagem);
rotas.patch('/postagens/:id', atualizarPostagem);
rotas.delete('/postagens/:id', excluirPostagem);

module.exports = rotas;