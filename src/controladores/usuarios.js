const conexao = require('../conexao');
const bcrypt = require('bcrypt');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome, !email, !senha) {
        return res.status(400).json({ mensagem: 'Preencha todos os campos' });
    }

    try {

        const consultaEmail = 'select * from usuarios where email = $1';
        const { rowCount: quantidadeUsuarios } = await conexao.query(consultaEmail, [email]);

        if (quantidadeUsuarios > 0) {
            return res.status(400).json('E-mail já cadastrado.')
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);
        const query = 'insert into usuarios (nome, email, senha) values ($1, $2, $3)';
        const usuarioCadastrado = await conexao.query(query, [nome, email, senhaCriptografada]);

        if (usuarioCadastrado === 0) {
            return res.status(400).json('Não foi possível cadastrar o Usuário.')
        }

        return res.status(200).json('Usuario cadastrado com sucesso!');


    } catch (error) {
        return res.status(400).json(error.message);
    }

}


module.exports = {
    cadastrarUsuario
};