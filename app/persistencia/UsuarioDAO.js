function UsuarioDAO(connection) {
  this._connection = connection;
}

const mysql = require('mysql');

UsuarioDAO.prototype.cadastro = function (usuario, callback) {
  let query = `INSERT INTO usuario SET ? `;
  this._connection.query(query, usuario, callback);
};

UsuarioDAO.prototype.login = function (email, callback) {
  let query = `SELECT id, nome, senha 
               FROM usuario WHERE email = ${mysql.escape(email)}`;
  this._connection.query(query, callback);
};

UsuarioDAO.prototype.atualiza = function (idUsuario, usuario, callback) {
  let query = `UPDATE usuario SET nome = ${mysql.escape(usuario.nome)}, email = ${mysql.escape(usuario.email)}, sexo = ${mysql.escape(usuario.sexo)}, nascimento = ${mysql.escape(usuario.nascimento)}, senha = ${mysql.escape(usuario.senha)} WHERE id = ${mysql.escape(idUsuario)}`;
  this._connection.query(query, callback);
};

module.exports = function () {
  return UsuarioDAO;
};
