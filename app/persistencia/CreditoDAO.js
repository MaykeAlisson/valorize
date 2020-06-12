function CreditoDAO(connection) {
  this._connection = connection;
}

const mysql = require('mysql');

CreditoDAO.prototype.busca = function (idUsuario, primeiroDiaMes, ultimoDiaMes, callback) {
  let query = `SELECT *
               FROM credito
               WHERE id_usuario = ${mysql.escape(idUsuario)}
               AND criacao BETWEEN ${mysql.escape(primeiroDiaMes)} and ${mysql.escape(ultimoDiaMes)}`;
  this._connection.query(query, callback);
};

CreditoDAO.prototype.cadastro = function (credito, callback) {
  let query = `INSERT INTO credito
               (descricao, valor, id_usuario, criacao)
               VALUES(${mysql.escape(credito.descricao)}, ${mysql.escape(credito.valor)}, ${mysql.escape(credito.id_usuario)}, CURRENT_TIMESTAMP)`;
  this._connection.query(query, callback);
};

CreditoDAO.prototype.delete = function (idCredito, idUsuario, callback) {
  let query = `DELETE FROM credito
               WHERE id = ${mysql.escape(idCredito)}
               AND id_usuario =  ${mysql.escape(idUsuario)}`;
  this._connection.query(query, callback);
};

CreditoDAO.prototype.buscaValorTodosCreditoMes = function (idUsuario, primeiroDiaMes, ultimoDiaMes, callback) {
  let query = `SELECT coalesce(sum(valor), 0) as credito
               FROM credito
               WHERE id_usuario = ${mysql.escape(idUsuario)}
               AND criacao BETWEEN ${mysql.escape(primeiroDiaMes)} and ${mysql.escape(ultimoDiaMes)}`;
  this._connection.query(query, callback);
};

CreditoDAO.prototype.buscaCreditoMesPassadoEAtual = function (idUsuario, primeiroDiaMes, ultimoDiaMes, primeiroDiaMesAnterior, ultimoDiaMesAnterior, callback) {
  let query = `select
              (
                 SELECT sum(valor)
                 FROM credito
                 WHERE id_usuario = ${mysql.escape(idUsuario)}
                 AND criacao BETWEEN ${mysql.escape(primeiroDiaMes)} and ${mysql.escape(ultimoDiaMes)}
              ) as cred_atual
              ,(
                 SELECT sum(valor)
                 FROM credito
                 WHERE id_usuario = ${mysql.escape(idUsuario)}
                 AND criacao BETWEEN ${mysql.escape(primeiroDiaMesAnterior)} and ${mysql.escape(ultimoDiaMesAnterior)}
              ) as cred_anterior`;
  this._connection.query(query, callback);
};

module.exports = function () {
  return CreditoDAO;
};
