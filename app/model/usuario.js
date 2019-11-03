module.exports = {

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
        id_perfil: 3
      };

      return dadosUsuario;
    }

    return null

  },

};
