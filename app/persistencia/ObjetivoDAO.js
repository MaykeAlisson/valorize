function ObjetivoDAO(connection) {
  this._connection = connection;
}

const mysql = require('mysql');

ObjetivoDAO.prototype.cadastro = function (objetivo, callback) {
  let query = ` INSERT INTO objetivo SET ? ;`;
  this._connection.query(query, objetivo, callback);
};

ObjetivoDAO.prototype.buscaPorUsuario = function (idUsuario, callback) {
  let query = `select id
              ,       descricao
              ,       valor_objetivo
              ,       tag
              from  objetivo
              where id_usuario = ${mysql.escape(idUsuario)}; `;
  this._connection.query(query, callback);
};

ObjetivoDAO.prototype.buscaDetalhada = function (idUsuario, callback) {
  let query = `select id
              ,       descricao
              ,       valor_objetivo
              ,       tag
              from  objetivo
              where id_usuario = ${mysql.escape(idUsuario)}; `;
  this._connection.query(query, callback);
};

ObjetivoDAO.prototype.update = function (idUsuario, idObjetivo, objetivo, callback) {
  let query = `UPDATE objetivo
               SET descricao = ${mysql.escape(objetivo.descricao)},
               valor_objetivo = ${mysql.escape(objetivo.valor_objetivo)},
               tag = ${mysql.escape(objetivo.tag)}
               WHERE id = ${mysql.escape(idObjetivo)}
               AND id_usuario = ${mysql.escape(idUsuario)};`;
  this._connection.query(query, callback);
};


module.exports = ObjetivoDAO;

