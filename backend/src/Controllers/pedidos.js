const db = require("../Data/connection");

const listar = async (req, res) => {
    const lista = await db.query("SELECT * FROM pedidos");
    res.json(lista[0]).end();
}

const buscar = async (req, res) => {
    const idPedido = req.params.id;
    const pedido = await db.query("SELECT * FROM pedidos WHERE id = " + idPedido);
    res.json(pedido[0][0]).end();
}

const cadastrar = async (req, res) => {
    const { data, quantidade, id_aluno, id_produto } = req.body;

    if (!data || !quantidade || !id_aluno || !id_produto) {
        return res.status(400).json({ msg: "Todos os campos devem estar preenchidos" }).end();
    }

    if (quantidade < 1) {
        return res.status(400).json({ msg: "A quantidade deve ser de no mínimo 1" }).end();
    }

    const novoPedido = await db.query("INSERT INTO pedidos VALUES (DEFAULT, ?, ?, ?, ?)", [data, quantidade, id_aluno, id_produto]);

    const pedido = {
        id: novoPedido[0].insertId,
        data: data,
        quantidade: quantidade,
        id_aluno: id_aluno,
        id_produto: id_produto
    }
    res.json(pedido).status(201).end();
}

const excluir = async (req, res) => {
    const idPedido = req.params.id;

    try {
        const delPedido = await db.query("DELETE FROM pedidos WHERE id = ?", [idPedido]);

        const info = { msg: "" };

        if (delPedido[0].affectedRows === 1) {
            info.msg = "Excluído com sucesso";
        } else if (delPedido[0].affectedRows === 0) {
            info.msg = "Pedido não encontrado";
        }

        res.status(200).json(info).end();
    } catch (error) {
        res.status(500).json({ msg: "Erro ao excluir pedido" }).end();
    }
};

const atualizar = async (req, res) => {
    const { id, data, quantidade, id_aluno, id_produto } = req.body;

    if (!id || !data || !quantidade || !id_aluno || !id_produto) {
        return res.status(400).json({ msg: "Todos os campos devem estar preenchidos" }).end();
    }

    if (quantidade < 1) {
        return res.status(400).json({ msg: "A quantidade deve ser de no mínimo 1" }).end();
    }

    try {
        const atualiza = await db.query("UPDATE pedidos SET data = ?, quantidade = ?, id_aluno = ?, id_produto = ? WHERE id = ?", [data, quantidade, id_aluno, id_produto, id]);

        const info = { msg: "" };

        if (atualiza[0].affectedRows === 1) {
            info.msg = "Atualizado com sucesso";
        } else if (atualiza[0].affectedRows === 0) {
            info.msg = "Pedido não encontrado";
        }

        res.status(200).json(info).end();
    } catch (error) {
        res.status(500).json({ msg: "Erro ao atualizar pedido" }).end();
    }
};

const totalPedPorProduto = async (req, res) => {
    const relatorio = await db.query("SELECT pr.nome as produto, SUM(p.quantidade) as total_pedidos, COUNT(p.id) as numero_pedidos FROM pedidos p INNER JOIN produtos pr ON p.id_produto = pr.id GROUP BY pr.id, pr.nome ORDER BY total_pedidos DESC");
    res.json(relatorio[0]).end();
}

const totalGastoPorAluno = async (req, res) => {
    const relatorio = await db.query(" SELECT a.nome as aluno, a.turma, SUM(p.quantidade * pr.valor) as total_gasto FROM pedidos p INNER JOIN alunos a ON p.id_aluno = a.id INNER JOIN produtos pr ON p.id_produto = pr.id GROUP BY a.id, a.nome, a.turma ORDER BY total_gasto DESC");
    res.json(relatorio[0]).end();
}

const totalFat = async (req, res) => {
    const relatorio = await db.query("SELECT SUM(p.quantidade * pr.valor) as total_faturado FROM pedidos p INNER JOIN produtos pr ON p.id_produto = pr.id");
    res.json(relatorio[0][0]).end();
}

module.exports = {
    listar,
    buscar,
    cadastrar,
    excluir,
    atualizar,
    totalPedPorProduto,
    totalGastoPorAluno,
    totalFat
};