module.exports = {

  cadastro(app, req, res) {

    const usuario = req.body;

    const connection = app.app.persistencia.connectionFactory();
    const usuarioDAO = new app.app.persistencia.UsuarioDAO(connection);
    // Id do usuario que acaba de ser inserido
    usuarioDAO.cadastro(usuario, function (erro, resultado) {
      if (erro) {
        res.status(500).json(erro);
      }
      res.status(201);
    });

  },

  login(app, req, res) {

    const email = req.body.email;
    const senha = req.body.senha;

    const connection = app.app.persistencia.connectionFactory();
    const usuarioDAO = new app.app.persistencia.UsuarioDAO(connection);

    usuarioDAO.login(email, senha, function (erro, resultado) {
      if (erro) {
        res.status(500).send(erro);
      }

      console.log(resultado);

      const usuario = {
        "id": resultado[0].id,
        "nome": resultado[0].nome
      };

      if (usuario === null) {
        res.status(400).json({
          success: false,
          message: 'Autenticação do Usuário falhou. E-mail ou Senha incorreta!'
        });
      } else {
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

    });


  },

  atualiza(app, req, res) {

    const usuario = req.body;

    try {
      app.app.model.usuario.atualiza(usuario);
      res.status(200);
    } catch (e) {
      res.status(500).json(e);
    }


  },

};
