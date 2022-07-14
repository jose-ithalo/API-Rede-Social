const conexao = require('../conexao');
const secreto = require('../secreto');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email, !senha) {
        return res.status(400).json({ mensagem: 'Preencha todos os campos' });
    }

    try {

        const veficarEmail = 'select * from usuarios where email = $1';
        const { rows, rowCount } = await conexao.query(veficarEmail, [email]);

        if (rowCount === 0) {
            return res.status(404).json('Usuário não encontrado.')
        }

        const usuario = rows[0];

        const senhaVerificada = await bcrypt.compare(senha, usuario.senha);

        if (!senhaVerificada) {
            return res.status(400).json('Senha e E-mail não confere.');
        }

        const token = jwt.sign({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        }, secreto, { expiresIn: '1d' });

        const { senha: senhaUsuario, ...dadosUsuario } = usuario;

        return res.status(200).json({
            usuario: dadosUsuario,
            token
        });

    } catch (error) {
        return res.status(400).json(error.message);
    }

}

module.exports = {
    login
}