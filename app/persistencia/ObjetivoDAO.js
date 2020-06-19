function ObjetivoDAO(connection) {
  this._connection = connection;
}

const mysql = require('mysql');

ObjetivoDAO.prototype.cadastro = function (objetivo, callback) {
  let query = ` INSERT INTO objetivo SET ? ;`;
  this._connection.query(query, objetivo, callback);
};

module.exports = ObjetivoDAO;

