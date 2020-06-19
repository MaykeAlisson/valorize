function CategoriaDAO(connection) {
  this._connection = connection;
}

const mysql = require('mysql');

CategoriaDAO.prototype.busca = function (idUsuario, callback) {
  let query = `SELECT id,
               descricao,
               porcentagem
               FROM categoria
               WHERE id_usuario = ${mysql.escape(idUsuario)}`;
  this._connection.query(query, callback);
};

CategoriaDAO.prototype.cadastro = function (categoria, callback) {
  let query = `INSERT INTO categoria
               (descricao, porcentagem, id_usuario, criacao)
               VALUES(${mysql.escape(categoria.descricao)}, ${mysql.escape(categoria.porcentagem)}, ${mysql.escape(categoria.id_usuario)}, CURRENT_TIMESTAMP)`;
  this._connection.query(query, categoria, callback);
};

CategoriaDAO.prototype.atualiza = function (categoria, callback) {
  let query = `UPDATE categoria
               SET descricao = ${mysql.escape(categoria.descricao)}, porcentagem = ${mysql.escape(categoria.porcentagem)}, id_usuario = ${mysql.escape(categoria.id_usuario)}
               WHERE id = ${mysql.escape(categoria.id)}`;
  this._connection.query(query, callback);
};

CategoriaDAO.prototype.delete = function (idCategoria, idUsuario, callback) {
  let query = `DELETE FROM categoria
               WHERE id = ${mysql.escape(idCategoria.id)}
               AND id_usuario = ${mysql.escape(idUsuario)}`;
  this._connection.query(query, callback);
};

CategoriaDAO.prototype.insertCategoriaDefault = function (idUsuario, callback) {
  let query = `INSERT INTO poupa_grana.categoria (descricao, porcentagem, id_usuario)
              VALUES ?`;
  let values = [
    ['Necessidades Básicas', 50, idUsuario],
    ['Investimento', 20, idUsuario],
    ['Educação', 10, idUsuario],
    ['Doação', 10, idUsuario],
    ['Diversão', 10, idUsuario]
  ];
  this._connection.query(query, [values], callback);
};

CategoriaDAO.prototype.buscaTotalPorcentagemPorUsuario = function (idUsuario, callback) {
  let query = `SELECT sum(c.porcentagem ) as porcentagem
               FROM poupa_grana.categoria c
               WHERE id_usuario = ${mysql.escape(idUsuario)}`;
  this._connection.query(query, callback);
};

CategoriaDAO.prototype.buscaPorcentagemPorCategoria = function (idUsuario, idCategoria, callback) {
  let query = `SELECT c.porcentagem
               FROM poupa_grana.categoria c
               WHERE id_usuario = ${mysql.escape(idUsuario)}
               AND id = ${mysql.escape(idCategoria)}`;
  this._connection.query(query, callback);
};

CategoriaDAO.prototype.buscaPorcentagemTodasCategoria = function (idUsuario, callback) {
  let query = `select descricao
              ,porcentagem
              ,id
              from categoria
              where id_usuario = ${mysql.escape(idUsuario)}`;
  this._connection.query(query, callback);
};


module.exports = CategoriaDAO;

