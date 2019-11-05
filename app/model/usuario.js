module.exports = {

  cadastro(usuario){

    // salva usuario no banco e retorna id do usuario salvo
  },

  login(usuario){

    const email = usuario["email"];
    const senha = usuario["senha"];
    const emailBanco = "maykealison@gmail.com";
    const senhaBanco = "12345";
    // verifica se usuario e senha correto no banco
    if(email === emailBanco && senha === senhaBanco){
      const dadosUsuario = {
        id: 1,
        nome: 'Mayke Alisson',
      };

      return dadosUsuario;
    }

    return null

  },

  atualiza(usuario){

    // atualiza o usuario

  },

};
