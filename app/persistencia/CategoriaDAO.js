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
  let query = `INSERT INTO categoria ? `;
  this._connection.query(query, categoria, callback);
};

CategoriaDAO.prototype.atualiza = function (categoria, callback) {
  let query = `UPDATE usuario ${mysql.escape(categoria.id)}`;
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
