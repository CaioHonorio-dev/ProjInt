const fs = require("fs");
const path = require("path");

const basePath = "C:/Search";

class ArquivoModel {
    static get basePath() {
        return basePath;
    }

    static caminhoSeguro(...partes) {
        const caminho = path.resolve(basePath, ...partes);
        const baseResolvida = path.resolve(basePath);

        if (
            caminho !== baseResolvida &&
            !caminho.startsWith(baseResolvida + path.sep)
        ) {
            return null;
        }

        return caminho;
    }

    static async listarAnos(nucleo) {
        const pastaNucleo = this.caminhoSeguro(nucleo);

        if (!pastaNucleo || !fs.existsSync(pastaNucleo)) {
            return null;
        }

        const itens = await fs.promises.readdir(pastaNucleo, {
            withFileTypes: true
        });

        return itens
            .filter(item => item.isDirectory())
            .map(item => item.name)
            .filter(nome => /^\d{4}$/.test(nome))
            .sort((a, b) => Number(b) - Number(a));
    }

    static async lerArquivosRecursivamente(pastaAtual) {
        const resultado = [];
        const itens = await fs.promises.readdir(pastaAtual, {
            withFileTypes: true
        });

        for (const item of itens) {
            const caminhoCompleto = path.join(pastaAtual, item.name);

            if (item.isDirectory()) {
                const arquivosInternos = await this.lerArquivosRecursivamente(caminhoCompleto);
                resultado.push(...arquivosInternos);
            } else if (item.isFile()) {
                const relativo = path.relative(basePath, caminhoCompleto);
                const url = relativo
                    .split(path.sep)
                    .map(parte => encodeURIComponent(parte))
                    .join("/");

                resultado.push({
                    title: item.name,
                    localPasta: `/files/${url}`
                });
            }
        }

        return resultado;
    }

    static async listarArquivos(nucleo, ano) {
        const pastaAno = this.caminhoSeguro(nucleo, ano);

        if (!pastaAno || !fs.existsSync(pastaAno)) {
            return null;
        }

        return await this.lerArquivosRecursivamente(pastaAno);
    }
}

module.exports = ArquivoModel;