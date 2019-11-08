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
  let query = `INSERT INTO conta SET ? `;
  this._connection.query(query, callback);
};

ContaDAO.prototype.atualiza = function(conta, callback) {
  let query = `UPDATE conta ${mysql.escape(conta.id)}`;
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
