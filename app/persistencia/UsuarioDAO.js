function UsuarioDAO(connection){
  console.log("to no usuario dao");
  this._connection = connection;
}

UsuarioDAO.prototype.cadastro = function(usuario, callback){
  console.log("UsuarioDAO" + usuario);
    this._connection.query('INSERT INTO usuario SET ? ', usuario, callback);
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
