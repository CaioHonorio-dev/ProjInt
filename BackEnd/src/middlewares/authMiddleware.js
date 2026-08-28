const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "chave_secreta_senai";

function autenticarToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ erro: "Acesso negado." });
    }

    jwt.verify(token, JWT_SECRET, (erro, usuario) => {
        if (erro) {
            return res.status(403).json({ erro: "Token inválido ou expirado." });
        }

        req.usuario = usuario;
        next();
    });
}

module.exports = { autenticarToken, JWT_SECRET };