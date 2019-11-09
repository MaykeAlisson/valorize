module.exports = {

  cadastro(app, req, res) {

    const usuario = req.body;

    const connection = app.app.persistencia.connectionFactory();
    const usuarioDAO = new app.app.persistencia.UsuarioDAO(connection);

    usuarioDAO.cadastro(usuario, function (erro, resultado) {
      if (erro) {
        res.status(500).json(erro);
      }
      res.status(201).send();
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

      let usuario;

      if (resultado.length === 0) {
        usuario = null;
      } else {
        usuario = {
          "id": resultado[0].id,
          "nome": resultado[0].nome
        };
      }

      if (usuario === null) {
        res.status(400).json({
          success: false,
          message: 'Autenticação do Usuário falhou. E-mail ou Senha incorreta!'
        });
      } else {
        require("dotenv-safe").config();
        const jwt = require('jsonwebtoken');
        const token = jwt.sign({usuario}, process.env.SECRET, {
          expiresIn: '12h'
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

    const idUsuario = req.userId;
    const usuario = req.body;

    const connection = app.app.persistencia.connectionFactory();
    const usuarioDAO = new app.app.persistencia.UsuarioDAO(connection);

    usuarioDAO.atualiza(idUsuario, usuario, function (erro, resultado) {
      if (erro) {
        res.status(500).send(erro);
      }
      res.status(200).send();
    });

  },

};
