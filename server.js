const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());


// ==========================================
// PASTA PRINCIPAL DO REPOSITÓRIO
// ==========================================

const basePath = "C:/Search";


// ==========================================
// SERVIR ARQUIVOS
// ==========================================

app.use(
    "/files",
    express.static(basePath)
);


// ==========================================
// FUNÇÃO DE SEGURANÇA
// ==========================================

function caminhoSeguro(...partes) {

    const caminho =
        path.resolve(basePath, ...partes);

    const baseResolvida =
        path.resolve(basePath);


    if (
        caminho !== baseResolvida &&
        !caminho.startsWith(
            baseResolvida + path.sep
        )
    ) {

        return null;

    }


    return caminho;
}


// ==========================================
// LISTAR ANOS DO NÚCLEO
// ==========================================

app.get(
    "/api/:nucleo/anos",
    async (req, res) => {

        try {

            const nucleo =
                req.params.nucleo;


            const pastaNucleo =
                caminhoSeguro(nucleo);


            if (!pastaNucleo) {

                return res
                    .status(400)
                    .json({
                        erro: "Caminho inválido."
                    });

            }


            const itens =
                await fs.promises.readdir(
                    pastaNucleo,
                    {
                        withFileTypes: true
                    }
                );


            const anos = itens
                .filter(item =>
                    item.isDirectory()
                )
                .map(item =>
                    item.name
                )
                .filter(nome =>
                    /^\d{4}$/.test(nome)
                )
                .sort((a, b) =>
                    Number(b) - Number(a)
                );


            res.json(anos);

        }

        catch (erro) {

            console.error(
                "Erro ao ler os anos:",
                erro
            );


            res.status(500).json({
                erro:
                    "Não foi possível ler os anos."
            });

        }

    }
);


// ==========================================
// LER ARQUIVOS RECURSIVAMENTE
// ==========================================

async function lerArquivosRecursivamente(
    pastaAtual
) {

    const resultado = [];


    const itens =
        await fs.promises.readdir(
            pastaAtual,
            {
                withFileTypes: true
            }
        );


    for (const item of itens) {

        const caminhoCompleto =
            path.join(
                pastaAtual,
                item.name
            );


        // Se for pasta,
        // entra nela também

        if (item.isDirectory()) {

            const arquivosInternos =
                await lerArquivosRecursivamente(
                    caminhoCompleto
                );

            resultado.push(
                ...arquivosInternos
            );

        }


        // Se for arquivo,
        // adiciona ao resultado

        else if (item.isFile()) {

            const relativo =
                path.relative(
                    basePath,
                    caminhoCompleto
                );


            const url =
                relativo
                    .split(path.sep)
                    .map(parte =>
                        encodeURIComponent(parte)
                    )
                    .join("/");


            resultado.push({

                title: item.name,

                localPasta:
                    `/files/${url}`

            });

        }

    }


    return resultado;
}


// ==========================================
// LISTAR ARQUIVOS DE UM ANO
// ==========================================

app.get(
    "/api/:nucleo/:ano",
    async (req, res) => {

        try {

            const {
                nucleo,
                ano
            } = req.params;


            // Valida o ano

            if (
                !/^\d{4}$/.test(ano)
            ) {

                return res
                    .status(400)
                    .json({
                        erro:
                            "Ano inválido."
                    });

            }


            const pastaAno =
                caminhoSeguro(
                    nucleo,
                    ano
                );


            if (!pastaAno) {

                return res
                    .status(400)
                    .json({
                        erro:
                            "Caminho inválido."
                    });

            }


            const arquivos =
                await lerArquivosRecursivamente(
                    pastaAno
                );


            res.json(arquivos);

        }

        catch (erro) {

            console.error(
                "Erro ao ler arquivos:",
                erro
            );


            res.status(500).json({
                erro:
                    "Não foi possível ler os arquivos."
            });

        }

    }
);


// ==========================================
// ARQUIVOS DO FRONTEND
// ==========================================

app.use(
    express.static(
        path.join(
            __dirname,
            "public"
        )
    )
);


// ==========================================
// INICIAR SERVIDOR
// ==========================================

const PORT = 3000;

app.listen(PORT, () => {

    console.log(
        `Servidor rodando em:
        http://localhost:${PORT}`
    );

});