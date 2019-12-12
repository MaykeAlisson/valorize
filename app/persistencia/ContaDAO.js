function ContaDAO(connection) {
  this._connection = connection;
}

const mysql = require('mysql');

ContaDAO.prototype.busca = function (idUsuario, callback) {
  let query = `SELECT *
               FROM conta
               WHERE id_usuario = ${mysql.escape(idUsuario)}`;
  this._connection.query(query, callback);
};

ContaDAO.prototype.cadastro = function (conta, callback) {
  let query = `INSERT INTO conta
               (id_usuario, descricao, criacao)
               VALUES(${mysql.escape(conta.id_usuario)}, ${mysql.escape(conta.descricao)}, CURRENT_TIMESTAMP)`;
  this._connection.query(query, callback);
};

ContaDAO.prototype.atualiza = function(conta, callback) {
  let query = `UPDATE valorize.conta
               SET id_usuario = ${mysql.escape(conta.id_usuario)}, descricao = ${mysql.escape(conta.descricao)}
               WHERE id = ${mysql.escape(conta.id)}`;
  this._connection.query(query, callback);
};

ContaDAO.prototype.deleta = function(idConta, callback) {
  let query = `DELETE conta 
               WHRE id = ${mysql.escape(conta.id)}`;
  this._connection.query(query, callback);
};

module.exports = function () {
  return ContaDAO;
};
