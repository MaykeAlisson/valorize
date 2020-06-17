const logger = require('../../config/util/logger.js');
const bcrypt = require('bcryptjs');
const connection = require('../persistencia/connectionFactory');
const UsuarioDAO = require('../persistencia/UsuarioDAO');
const CategoriaDAO = require('../persistencia/CategoriaDAO');

exports.cadastro = (req, res, next) => {

  req.assert('nome', 'Nome obrigatorio').notEmpty();
  req.assert('sexo', 'Sexo obrigatorio').notEmpty();
  req.assert('nascimento', 'Nascimento obrigatorio').notEmpty();
  req.assert('email', 'Email obrigatorio').notEmpty().isEmail();
  req.assert('senha', 'Senha obrigatorio').notEmpty();

  const erros = req.validationErrors();

  if (erros) {
    console.log('Erros de validacao encontados cadastro usuario');
    res.status(400).send(erros);
    return;
  }

  let usuario = req.body;

  // Criptografa Senha
  const password = usuario.senha;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  usuario.senha = hash;
  usuario.ativo = "S";

  const usuarioDAO = new UsuarioDAO(connection);
  const categoriaDAO = new CategoriaDAO(connection);

  usuarioDAO.verificaEmail(usuario.email, function (erro, email) {
    if (erro) {
      logger.info('Erro ao Buscar email usuario: ' + erro);
      res.status(500).json(erro);
      return;
    }

    if (email.length > 0) {
      res.status(400).send('Email já cadastrado');
      return;
    }

    usuarioDAO.cadastro(usuario, function (erro, resultado) {
      if (erro) {
        logger.info('Erro ao Cadastrar usuario: ' + erro);
        res.status(500).json(erro);
        return;
      }
      // cria categorias default
      const insertId = resultado.insertId; // Recupera Id de insert anterior
      categoriaDAO.insertCategoriaDefault(insertId, function (erro, resultado) {
        if (erro) {
          logger.info('Erro ao Cadastrar categorias default para usuario: ' + erro);
          res.status(500).json(erro);
          return;
        }
        res.status(201).send();
      });

    });
  })
};

exports.login = (req, res, next) => {

  req.assert('email', 'Email obrigatorio').notEmpty().isEmail();
  req.assert('senha', 'Senha obrigatorio').notEmpty();

  const erros = req.validationErrors();

  if (erros) {
    console.log('Erros de validacao encontados login usuario');
    res.status(400).send(erros);
    return;
  }

  const email = req.body.email;
  const senha = req.body.senha;

  const usuarioDAO = new UsuarioDAO(connection);

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

      if (!bcrypt.compareSync(senha, db_password)) {
        res.status(400).json({
          success: false,
          message: 'Autenticação do Usuário falhou. E-mail ou Senha incorreta!'
        });
        return;
      }
      usuario = {
        "id": resultado[0].id,
        "nome": resultado[0].nome,
        "pro": resultado[0].pro
      };
    }

    if (usuario === null) {
      res.status(401).json({
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
        "pro": usuario.pro,
        "token": token
      };

      res.status(200).json(response);
    }

  });

};

exports.atualizaPro = (req, res, next) => {

  const idUsuario = req.userId;

  // criar uma chave secreta que seta enviada ao confirma
  // o pagamento e sera utilizado para garantir a segurança
  const key = req.params.key;

  if (key !== 'chave') {
    res.status(400).send("Chave Invalida");
  }

  const usuarioDAO = new UsuarioDAO(connection);

  usuarioDAO.atualizaPro(idUsuario, function (erro, resultado) {
    if (erro) {
      logger.info('Erro ao Atualizar usuario: ' + erro);
      res.status(500).send(erro);
      return;
    }
    res.status(200).send();
  });

};

exports.atualizaSenha = (req, res, next) => {

  let trocaSenha = req.body;

  // Chave secreta enviada no email de recuperação para seguranca

  // Criptografa Senha
  const password = trocaSenha.senha;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  trocaSenha.senha = hash;

  const usuarioDAO = new UsuarioDAO(connection);

  usuarioDAO.atualizaSenha(trocaSenha, function (erro, resultado) {
    if (erro) {
      logger.info('Erro ao Atualizar usuario: ' + erro);
      res.status(500).send(erro);
      return;
    }
    res.status(200).send();
  });

};


