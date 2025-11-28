const express = require("express");

const app = express();
const port = 3000;

const alunoRoutes = require('./src/Routes/alunos');
const pedidoRoutes = require('./src/Routes/pedidos');
const produtoRoutes = require('./src/Routes/produtos');

app.use(express.json());

app.use(alunoRoutes);
app.use(pedidoRoutes);
app.use(produtoRoutes);

app.listen(port, () => {
    console.log('listening on ' + port);
})