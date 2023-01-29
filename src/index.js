require('dotenv').config();

const express = require('express');

const servidor = express();
servidor.use(express.json());

const rotas = require('./rotas');

servidor.use(rotas);

servidor.listen(3000, function () {
    console.log('Servidor em funcionamento...');
});