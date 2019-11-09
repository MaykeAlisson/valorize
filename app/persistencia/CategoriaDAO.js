function CategoriaDAO(connection) {
  this._connection = connection;
}

const mysql = require('mysql');

CategoriaDAO.prototype.busca = function (idUsuario, callback) {
  let query = `SELECT *
               FROM categoria
               WHERE id_usuario = ${mysql.escape(idUsuario)}`;
  this._connection.query(query, callback);
};

CategoriaDAO.prototype.cadastro = function (categoria, callback) {
  let query = `INSERT INTO categoria
               (descricao, operacao, id_usuario, criacao)
               VALUES(${mysql.escape(categoria.descricao)}, ${mysql.escape(categoria.operacao)}, ${mysql.escape(categoria.id_usuario)}, CURRENT_TIMESTAMP)`;
  this._connection.query(query, categoria, callback);
};

CategoriaDAO.prototype.atualiza = function (categoria, callback) {
  let query = `UPDATE categoria
               SET descricao = ${mysql.escape(categoria.descricao)}, operacao = ${mysql.escape(categoria.operacao)}, id_usuario = ${mysql.escape(categoria.id_usuario)}
               WHERE id = ${mysql.escape(categoria.id)}`;
  this._connection.query(query, callback);
};

CategoriaDAO.prototype.delete = function (idCategoria, callback) {
  let query = `DELETE categoria
               WHERE id = ${mysql.escape(idCategoria)}`;
  this._connection.query(query, callback);
};

module.exports = function () {
  return CategoriaDAO;
};
