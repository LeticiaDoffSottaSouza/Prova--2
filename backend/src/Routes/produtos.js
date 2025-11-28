const express = require("express");

const produtosController = require("../Controllers/produtos");

const produtosRoutes = express.Router();

produtosRoutes.get("/listar/produtos", produtosController.listar); //foi
produtosRoutes.get("/buscar/produtos/:id", produtosController.buscar); //foi
produtosRoutes.post("/cadastrar/produtos", produtosController.cadastrar); //foi
produtosRoutes.delete("/excluir/produtos/:id", produtosController.excluir); //foi
produtosRoutes.put("/atualizar/produtos", produtosController.atualizar); //foi

module.exports = produtosRoutes;