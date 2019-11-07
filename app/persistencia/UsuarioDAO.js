function UsuarioDAO(connection) {
  this._connection = connection;
}

const mysql = require('mysql');

UsuarioDAO.prototype.cadastro = function (usuario, callback) {
  this._connection.query('INSERT INTO usuario SET ? ', usuario, callback);
};

UsuarioDAO.prototype.login = function (email, senha , callback){
  this._connection.query('SELECT id, nome FROM usuario WHERE email = ' + mysql.escape(email) + ' AND senha = ' + mysql.escape(senha) + ' ', callback);
};
// login(usuario){
//
//   const email = usuario["email"];
//   const senha = usuario["senha"];
//   const emailBanco = "maykealison@gmail.com";
//   const senhaBanco = "12345";
//   // verifica se usuario e senha correto no banco
//   if(email === emailBanco && senha === senhaBanco){
//     const dadosUsuario = {
//       id: 1,
//       nome: 'Mayke Alisson',
//     };
//
//     return dadosUsuario;
//   }
//
//   return null
//
// },
//
// atualiza(usuario){
//
//   // atualiza o usuario
//
// },


module.exports = function () {
  return UsuarioDAO;
};
