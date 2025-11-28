const express = require("express");

const pedidosController = require("../Controllers/pedidos");

const pedidosRoutes = express.Router();

pedidosRoutes.get("/listar/pedidos", pedidosController.listar); //foi
pedidosRoutes.get("/buscar/pedidos/:id", pedidosController.buscar); //foi
pedidosRoutes.post("/cadastrar/pedidos", pedidosController.cadastrar); //foi
pedidosRoutes.delete("/excluir/pedidos/:id", pedidosController.excluir); //foi
pedidosRoutes.put("/atualizar/pedidos", pedidosController.atualizar); //foi
pedidosRoutes.get("/pedido/produtos", pedidosController.totalPedPorProduto); //foi
pedidosRoutes.get("/gasto/aluno", pedidosController.totalGastoPorAluno); //foi
pedidosRoutes.get("/faturamento", pedidosController.totalFat); 

module.exports = pedidosRoutes;