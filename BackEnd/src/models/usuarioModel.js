const db = require("../config/database");

class UsuarioModel {
    static async buscarPorEmail(email) {
        const query = "SELECT * FROM usuarios WHERE email = $1";
        const result = await db.query(query, [email]);
        return result.rows[0];
    }
}

module.exports = UsuarioModel;