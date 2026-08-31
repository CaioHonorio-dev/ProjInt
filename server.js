const express = require("express");
const cors = require("cors");
const path = require("path");
const ArquivoModel = require("./BackEnd/src/Models/ArquivoModel");
const arquivoRoutes = require("./BackEnd/src/routes/arquivoRoutes");
const authRoutes = require("./BackEnd/src/routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/files", express.static(ArquivoModel.basePath));

app.use("/api/auth", authRoutes);
app.use("/api", arquivoRoutes);

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
    console.log(`Diretório do Drive: ${ArquivoModel.basePath}`);
});