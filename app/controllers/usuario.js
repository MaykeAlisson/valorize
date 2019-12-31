// Import Logger
const logger = require('../../config/util/logger.js');

module.exports = {

  cadastro(app, req, res) {
    const bcrypt = require('bcryptjs');

    req.assert('nome', 'Nome obrigatorio').notEmpty();
    req.assert('sexo', 'Sexo obrigatorio').notEmpty();
    req.assert('nascimento', 'Nascimento obrigatorio').notEmpty();
    req.assert('email', 'Email obrigatorio').notEmpty().isEmail();
    req.assert('senha', 'Senha obrigatorio').notEmpty();

    const erros = req.validationErrors();

    if (erros){
      console.log('Erros de validacao encontados cadastro usuario');
      res.status(400).send(erros);
      return;
    }

    let usuario = req.body;

    const password = usuario.senha;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    usuario.senha = hash;

    const connection = app.app.persistencia.connectionFactory();
    const usuarioDAO = new app.app.persistencia.UsuarioDAO(connection);

    usuarioDAO.cadastro(usuario, function (erro, resultado) {
      if (erro) {
        logger.info('Erro ao Cadastrar usuario: ' + erro);
        res.status(500).json(erro);
        return;
      }
      res.status(201).send();
    });

  },

  login(app, req, res) {
    const bcrypt = require('bcryptjs');

    req.assert('email', 'Email obrigatorio').notEmpty().isEmail();
    req.assert('senha', 'Senha obrigatorio').notEmpty();

    const erros = req.validationErrors();

    if (erros){
      console.log('Erros de validacao encontados login usuario');
      res.status(400).send(erros);
      return;
    }

    const email = req.body.email;
    const senha = req.body.senha;

    const connection = app.app.persistencia.connectionFactory();
    const usuarioDAO = new app.app.persistencia.UsuarioDAO(connection);

    usuarioDAO.login(email, function (erro, resultado) {
      if (erro) {
        logger.info('Erro ao realizar Login usuario: ' + erro);
        res.status(500).send(erro);
        return;
      }

      let usuario;

      if (resultado.length === 0) {
        usuario = null;
      } else {
        const db_password = resultado[0].senha; // Veio da base de dados.

        if(!bcrypt.compareSync(senha, db_password)){
          res.status(400).json({
            success: false,
            message: 'Autenticação do Usuário falhou. E-mail ou Senha incorreta!'
          });
          return;
        }
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

    req.assert('nascimento', 'Nascimento obrigatorio').notEmpty();
    req.assert('email', 'Email obrigatorio').notEmpty().isEmail();
    req.assert('nome', 'Nome obrigatorio').notEmpty();
    req.assert('senha', 'Senha obrigatorio').notEmpty();
    req.assert('sexo', 'Sexo obrigatorio').notEmpty();

    const erros = req.validationErrors();

    if (erros){
      console.log('Erros de validacao encontados atualiza usuario');
      res.status(400).send(erros);
      return;
    }

    const idUsuario = req.userId;
    const usuario = req.body;

    const connection = app.app.persistencia.connectionFactory();
    const usuarioDAO = new app.app.persistencia.UsuarioDAO(connection);

    usuarioDAO.atualiza(idUsuario, usuario, function (erro, resultado) {
      if (erro) {
        logger.info('Erro ao Atualizar usuario: ' + erro);
        res.status(500).send(erro);
        return;
      }
      res.status(200).send();
    });

  },

};
