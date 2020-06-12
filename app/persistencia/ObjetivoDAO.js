function ObjetivoDAO(connection) {
  this._connection = connection;
}

const mysql = require('mysql');

ObjetivoDAO.prototype.buscaTodos = function (objetivo, callback) {
  let query = ` INSERT INTO poupa_grana.objetivo
                (descricao, valor_objetivo, id_usuario, criacao, tag)
                VALUES('', 0, 0, CURRENT_TIMESTAMP, '');`;
  this._connection.query(query, callback);
};

ObjetivoDAO.prototype.cadastro = function (idUsuario, callback) {
  let query = ` SELECT  id
                ,       descricao
                ,       valor_objetivo
                FROM objetivo
                WHERE id_usuario = ${mysql.escape(idUsuario)}`;
  this._connection.query(query, callback);
};


module.exports = function () {
  return ObjetivoDAO;
};
