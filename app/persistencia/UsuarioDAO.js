function UsuarioDAO(connection) {
  this._connection = connection;
}

const mysql = require('mysql');

UsuarioDAO.prototype.verificaEmail = function (email, callback) {
  let query = `SELECT id
               FROM usuario
               WHERE email = ${mysql.escape(email)} `;
  this._connection.query(query, callback);
};

UsuarioDAO.prototype.cadastro = function (usuario, callback) {
  let query = `INSERT INTO usuario SET ? `;
  this._connection.query(query, usuario, callback);
};

UsuarioDAO.prototype.login = function (email, callback) {
  let query = `SELECT id, nome, senha, pro
               FROM usuario WHERE email = ${mysql.escape(email)}`;
  this._connection.query(query, callback);
};

UsuarioDAO.prototype.atualizaPro = function (idUsuario, callback) {
  let query = `UPDATE usuario SET pro = 'S' WHERE id = ${mysql.escape(idUsuario)}`;
  this._connection.query(query, callback);
};

UsuarioDAO.prototype.atualizaSenha = function (trocaSenha, callback) {
  let query = `UPDATE usuario SET senha = ${mysql.escape(trocaSenha.senha)} WHERE email = ${mysql.escape(trocaSenha.email)}`;
  this._connection.query(query, callback);
};

module.exports = function () {
  return UsuarioDAO;
};
