const db = require("../config/database");

class UsuarioModel {
    static async buscarPorEmail(email) {
        const [rows] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
        return rows[0];
    }
}

module.exports = UsuarioModel;