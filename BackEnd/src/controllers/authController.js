const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UsuarioModel = require("../models/usuarioModel");
const { JWT_SECRET } = require("../middlewares/authMiddleware");

class AuthController {
    static async login(req, res) {
        try {
            const { email, senha } = req.body;

            if (!email || !senha) {
                return res.status(400).json({ erro: "E-mail e senha são obrigatórios." });
            }

            const user = await UsuarioModel.buscarPorEmail(email);

            if (!user) {
                return res.status(401).json({ erro: "E-mail ou senha inválidos." });
            }

            const senhaValida = await bcrypt.compare(senha, user.senha);
            if (!senhaValida) {
                return res.status(401).json({ erro: "E-mail ou senha inválidos." });
            }

            const token = jwt.sign(
                { id: user.id, nome: user.nome, email: user.email },
                JWT_SECRET,
                { expiresIn: "8h" }
            );

            return res.json({ token, usuario: { nome: user.nome, email: user.email } });
        } catch (erro) {
            console.error("Erro no login:", erro);
            return res.status(500).json({ erro: "Erro interno no servidor." });
        }
    }
}

module.exports = AuthController;