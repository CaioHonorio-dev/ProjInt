const ArquivoModel = require("../models/arquivoModel");

class ArquivoController {
    static async listarAnos(req, res) {
        try {
            const { nucleo } = req.params;
            const anos = await ArquivoModel.listarAnos(nucleo);

            if (!anos) {
                return res.status(400).json({ erro: "Caminho inválido." });
            }

            return res.json(anos);
        } catch (erro) {
            console.error("Erro ao ler os anos:", erro);
            return res.status(500).json({ erro: "Não foi possível ler os anos." });
        }
    }

    static async listarArquivos(req, res) {
        try {
            const { nucleo, ano } = req.params;

            if (!/^\d{4}$/.test(ano)) {
                return res.status(400).json({ erro: "Ano inválido." });
            }

            const arquivos = await ArquivoModel.listarArquivos(nucleo, ano);

            if (!arquivos) {
                return res.status(400).json({ erro: "Caminho inválido." });
            }

            return res.json(arquivos);
        } catch (erro) {
            console.error("Erro ao ler arquivos:", erro);
            return res.status(500).json({ erro: "Não foi possível ler os arquivos." });
        }
    }
}

module.exports = ArquivoController;