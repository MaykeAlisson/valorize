function LancamentoDAO(connection) {
  this._connection = connection;
}

const mysql = require('mysql');

LancamentoDAO.prototype.lancamentosMes = function (idUsuario, primeiroDiaMes, ultimoDiaMes, callback) {
  let query = `SELECT *
               FROM lancamento
               WHERE id_usuario = ${mysql.escape(idUsuario)}
               AND dia BETWEEN ${mysql.escape(primeiroDiaMes)} AND ${mysql.escape(ultimoDiaMes)}`;
  this._connection.query(query, callback);
};

LancamentoDAO.prototype.cadastro = function (lancamento, callback) {
  let query = `INSERT INTO lancamento SET ?`;
  this._connection.query(query, callback);
};

LancamentoDAO.prototype.atualiza = function (lancamento, callback) {
  let query = `UPDATE lancamento ${mysql.escape(lancamento.id)}`;
  this._connection.query(query, callback);
};

LancamentoDAO.prototype.deletaPorId = function (idLancamento, callback) {
  let query = `DELETE lancamento
               WHERE id = ${mysql.escape(idLancamento)}`;
  this._connection.query(query, callback);
};

LancamentoDAO.

  //
  // deletaPorId(idLancamento){
  //   // deleta pelo id do lancamento
  // },
  //
  // deletaPorCategoria(idCategoria){
  //   //deleta toda lancamento onde idCategoria
  // },
  //
  // deletaPorIdConta(idConta){
  //   // deleta toda lancamento onde idConta
  // },


module.exports = function () {
  return LancamentoDAO;
};
