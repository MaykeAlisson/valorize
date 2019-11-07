function ContaDAO(connection) {
  this._connection = connection;
}

const mysql = require('mysql');

ContaDAO.prototype.busca = function(idUsuario, callback){
  let query = `SELECT *
               FROM conta
               WHERE id_usuario = ${mysql.escape(idUsuario)}`;
};
  // busca(idUsuario) {
  //   // vai no banco de busca todas categoria deste uausrio e retorna as mesmas
  // },
  //
  // cadastro(conta){
  //   // salva conta no banco
  // },
  //
  // atualiza(conta){
  //   // atualiza conta
  // },
  //
  // deleta(idConta){
  //   // deleta conta onde id =
  // },

module.exports = function () {
  return ContaDAO;
};
