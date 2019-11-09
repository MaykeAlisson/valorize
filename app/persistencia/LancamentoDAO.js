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
  let query = `INSERT INTO valorize.lancamento
               (valor, dia, descricao, tags, note, id_usuario, id_conta, id_categoria, criacao)
               VALUES(${mysql.escape(lancamento.valor)}, ${mysql.escape(lancamento.dia)}, ${mysql.escape(lancamento.descricao)}, ${mysql.escape(lancamento.tags)}, ${mysql.escape(lancamento.note)}, ${mysql.escape(lancamento.id_usuario)}, ${mysql.escape(lancamento.id_conta)}, ${mysql.escape(lancamento.id_categoria)}, CURRENT_TIMESTAMP)`;
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

LancamentoDAO.prototype.deletaPorCategoria = function(idCategoria, callback) {
  let query = `DELETE lancamento 
               WHERE id_categoria = ${mysql.escape(idCategoria)}`;
  this._connection.query(query, callback);
};

LancamentoDAO.prototype.deletaPorConta = function (idConta, callback) {
  let query = `DELETE lancamento
               WHERE id_conta = ${mysql.escape(idConta)}`;
  this._connection.query(query, callback);
};

module.exports = function () {
  return LancamentoDAO;
};
