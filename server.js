const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const open = require("open");

const app = express();

app.use(cors());
app.use(express.static("public"));

const basePath = "C:/Search";

// redireciona a raiz do site para a página inicial
app.get("/", (req, res) => {
  res.redirect("/index.html");
});

// rota dinâmica da API
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
  open("http://localhost:3000");
});