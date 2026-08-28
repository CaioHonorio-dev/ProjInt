const express = require("express");
const router = express.Router();
const ArquivoController = require("../controllers/arquivoController");

router.get("/:nucleo/anos", ArquivoController.listarAnos);
router.get("/:nucleo/:ano", ArquivoController.listarArquivos);

module.exports = router;