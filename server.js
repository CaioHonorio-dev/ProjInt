const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.static("public"));

const basePath = "C:/Search";

// rota dinâmica
app.get("/api/:pasta", (req, res) => {

    const pasta = req.params.pasta;
    const pastaCompleta = path.join(basePath, pasta);

    fs.readdir(pastaCompleta, (err, files) => {

        if (err) {
            return res.status(500).json({ erro: "Pasta não encontrada" });
        }

        const arquivos = files.map(file => ({
            title: file,
            localPasta: `/files/${pasta}/${file}`
        }));

        res.json(arquivos);

    });

});

// servir arquivos
app.use("/files", express.static(basePath));

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});