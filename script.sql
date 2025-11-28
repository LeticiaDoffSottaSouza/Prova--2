DROP DATABASE IF EXISTS lanches_cantina;
CREATE DATABASE lanches_cantina;

USE lanches_cantina;

CREATE TABLE alunos(
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    turma VARCHAR(30) NOT NULL
);

CREATE TABLE produtos(
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    valor DECIMAL(10, 2) NOT NULL
);

CREATE TABLE pedidos(
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
    data DATETIME NOT NULL,
    quantidade INT NOT NULL,
    id_aluno INTEGER NOT NULL,
    id_produto INTEGER NOT NULL,
    FOREIGN KEY (id_aluno) REFERENCES alunos(id),
    FOREIGN KEY (id_produto) REFERENCES produtos(id)
);

INSERT INTO alunos VALUES (DEFAULT, "Alice", "2 EM B");
INSERT INTO alunos VALUES (DEFAULT, "Natalia", "2 EM A");
INSERT INTO alunos VALUES (DEFAULT, "Pietra", "2 EM B");

INSERT INTO produtos VALUES (DEFAULT, "Bolo", "50.00");
INSERT INTO produtos VALUES (DEFAULT, "Salgados", "30.00");
INSERT INTO produtos VALUES (DEFAULT, "Suco", "10.00");

INSERT INTO pedidos VALUES (DEFAULT, "2025/10/06", 2, 1, 1);
INSERT INTO pedidos VALUES (DEFAULT, "2024/03/12", 1, 3, 2);
INSERT INTO pedidos VALUES (DEFAULT, "2025/11/09", 2, 2, 3);

SELECT pr.nome as produto, SUM(p.quantidade) as total_pedidos, COUNT(p.id) as numero_pedidos FROM pedidos p INNER JOIN produtos pr ON p.id_produto = pr.id GROUP BY pr.id, pr.nome ORDER BY total_pedidos DESC

SELECT a.nome as aluno, a.turma, SUM(p.quantidade * pr.valor) as total_gasto FROM pedidos p INNER JOIN alunos a ON p.id_aluno = a.id INNER JOIN produtos pr ON p.id_produto = pr.id GROUP BY a.id, a.nome, a.turma ORDER BY total_gasto DESC

SELECT SUM(p.quantidade * pr.valor) as total_faturado FROM pedidos p INNER JOIN produtos pr ON p.id_produto = pr.id