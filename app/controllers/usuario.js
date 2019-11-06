module.exports = {

  cadastro(app, req, res) {

    // const usuario = {
    //   nome: req.body.nome,
    //   sexo: req.body.sexo,
    //   nascimento: req.body.nascimento,
    //   email: req.body.email,
    //   senha: req.body.senha
    // };

    const usuario = req.body;

    // try {
        const connection = app.app.persistencia.connectionFactory();
           const usuarioDAO = new app.app.persistencia.UsuarioDAO(connection);
       // Id do usuario que acaba de ser inserido
      usuarioDAO.cadastro(usuario, function(erro, resultado){
        if (erro){
          res.status(500).json(erro);
        }
        console.log("retonrno query");
        res.status(201).json(resultado);
      });
      // res.status(201);
    //  }catch (e) {
    //   res.status(500).json(e);
    // }

  },

  login(app, req, res){

    try {
      const usuario = app.app.model.usuario.login(req.body);

      if (usuario === null){
        res.status(400).json({
          success: false,
          message: 'Autenticação do Usuário falhou. E-mail ou Senha incorreta!'
        });
      }else{
        require("dotenv-safe").config();
        const jwt = require('jsonwebtoken');
        const token = jwt.sign({usuario}, process.env.SECRET, {
          expiresIn: '6h'
        });

        const response = {
          "idUser": usuario.id,
          "userName": usuario.nome,
          "token": token
        };

        res.status(200).json(response);
      }
    }catch (e) {
      res.status(500).json(e);
    }

  },

  atualiza(app, req, res){

    const usuario = req.body;

    try {
      app.app.model.usuario.atualiza(usuario);
      res.status(200);
    }catch (e) {
      res.status(500).json(e);
    }


  },

};
