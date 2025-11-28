const db = require("../Data/connection");

const listar = async (req, res) => {
    const lista = await db.query("SELECT * FROM produtos");
    res.json(lista[0]).end();
}

const buscar = async (req, res) => {
    const idProduto = req.params.id;
    const produto = await db.query("SELECT * FROM produtos WHERE id = " + idProduto);
    res.json(produto[0][0]).end();
}

const cadastrar = async (req, res) => {
    const { nome, valor } = req.body;

    if (!nome || !valor) {
        return res.status(400).json({ msg: "Todos os campos devem estar preenchidos" }).end();
    }

    if (valor <= 0) {
        return res.status(400).json({ msg: "O valor do produto deve ser maior que 0" }).end();
    }

    const novoProduto = await db.query("INSERT INTO produtos VALUES (DEFAULT, ?, ?)", [nome, valor]);

    const produto = {
        id: novoProduto[0].insertId,
        nome: nome,
        valor: valor
    }
    res.json(produto).status(201).end();
}

const excluir = async (req, res) => {
    const idProduto = req.params.id;

    try {
        const delProduto = await db.query("DELETE FROM produtos WHERE id = ?", [idProduto]);

        const info = { msg: "" };

        if (delProduto[0].affectedRows === 1) {
            info.msg = "Excluído com sucesso";
        } else if (delProduto[0].affectedRows === 0) {
            info.msg = "Produto não encontrado";
        }

        res.status(200).json(info).end();
    } catch (error) {
        const info = { msg: "" };

        if (error.errno === 1451) {
            info.msg = "Não foi possível excluir. Produto possui pedidos cadastrados";
        }

        res.status(500).json(info).end();
    }
};

const atualizar = async (req, res) => {
    const { id, nome, valor } = req.body;

    if (!id || !nome || !valor) {
        return res.status(400).json({ msg: "Todos os campos devem estar preenchidos" }).end();
    }

    if (valor <= 0) {
        return res.status(400).json({ msg: "O valor do produto deve ser maior que 0" }).end();
    }

    try {
        const atualiza = await db.query("UPDATE produtos SET nome = ?, valor = ? WHERE id = ?", [nome, valor, id]);

        const info = { msg: "" };

        if (atualiza[0].affectedRows === 1) {
            info.msg = "Atualizado com sucesso";
        } else if (atualiza[0].affectedRows === 0) {
            info.msg = "Produto não encontrado";
        }

        res.status(200).json(info).end();
    } catch (error) {
        res.status(500).json({ msg: "Erro ao atualizar produto" }).end();
    }
};

module.exports = {
    listar,
    buscar,
    cadastrar,
    excluir,
    atualizar
};