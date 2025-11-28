const express = require("express");

const alunosController = require("../Controllers/alunos");

const alunosRoutes = express.Router();

alunosRoutes.get("/listar/alunos", alunosController.listar); //foi
alunosRoutes.get("/buscar/alunos/:id", alunosController.buscar); //foi
alunosRoutes.post("/cadastrar/alunos", alunosController.cadastrar); //foi
alunosRoutes.delete("/excluir/alunos/:id", alunosController.excluir); //foi
alunosRoutes.put("/atualizar/alunos", alunosController.atualizar); //foi

module.exports = alunosRoutes;