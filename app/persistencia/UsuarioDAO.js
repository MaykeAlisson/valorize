function UsuarioDAO(connection) {
  this._connection = connection;
}

const mysql = require('mysql');

UsuarioDAO.prototype.cadastro = function (usuario, callback) {
  let query = `INSERT INTO usuario SET ? `;
  this._connection.query(query, usuario, callback);
};

UsuarioDAO.prototype.login = function (email, senha, callback) {
  let query = `SELECT id, nome 
               FROM usuario WHERE email = ${mysql.escape(email)}  
               AND senha = ${mysql.escape(senha)}`;
  this._connection.query(query, callback);
};

UsuarioDAO.prototype.atualiza = function (usuario, callback) {
  let query = `UPDATE usuario ${mysql.escape(usuario.id)}`;
  this._connection.query(query, callback)
};

module.exports = function () {
  return UsuarioDAO;
};
