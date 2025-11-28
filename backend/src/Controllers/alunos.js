const db = require("..//Data/connection");

const listar = async (req, res) => {
    const lista = await db.query("SELECT * FROM alunos");
    res.json(lista[0]).end();
}

const buscar = async (req, res) => {
    const idAluno = req.params.id;
    const aluno = await db.query("SELECT * FROM alunos WHERE id = " + idAluno);
    res.json(aluno[0][0]).end();
}

const cadastrar = async (req, res) => {
    const { nome, turma } = req.body;

    if (!nome || !turma) {
        return res.status(400).json({ msg: "Todos os campos devem estar preenchidos" }).end();
    }
    const novoAluno = await db.query("INSERT INTO alunos VALUES (DEFAULT, ?, ?)", [nome, turma]);

    const aluno = {
        id: novoAluno[0].insertId,
        nome: nome,
        turma: turma
    }
    res.json(aluno).status(201).end();
}

const excluir = async (req, res) => {
    const idAluno = req.params.id;

    try {
        const delAluno = await db.query("DELETE FROM alunos WHERE id = ?", [idAluno]);

        const info = { msg: "" };

        if (delAluno[0].affectedRows === 1) {
            info.msg = "Excluído com sucesso";
        } else if (delAluno[0].affectedRows === 0) {
            info.msg = "Aluno não encontrado";
        }

        res.status(200).json(info).end();
    } catch (error) {
        const info = { msg: "" };

        if (error.errno === 1451) {
            info.msg = "Não foi possível excluir. Aluno possui pedidos cadastrados";
        }

        res.status(500).json(info).end();
    }
};

const atualizar = async (req, res) => {
    const { id, nome, turma } = req.body;

    if (!id || !nome || !turma) {
        return res.status(400).json({ msg: "Todos os campos devem estar preenchidos" }).end();
    }

    try {
        const atualiza = await db.query("UPDATE alunos SET nome = ?, turma = ? WHERE id = ?", [nome, turma, id]);

        const info = { msg: "" };

        if (atualiza[0].affectedRows === 1) {
            info.msg = "Atualizado com sucesso";
        } else if (atualiza[0].affectedRows === 0) {
            info.msg = "Aluno não encontrado";
        }

        res.status(200).json(info).end();
    } catch (error) {
        res.status(500).json({ msg: "Erro ao atualizar aluno" }).end();
    }
};

module.exports = {
    listar,
    buscar,
    cadastrar,
    excluir,
    atualizar
};