// Import Logger
const logger = require('../../config/util/logger.js');

module.exports = {

  busca(app, req, res) {

    const idUsuario = req.userId;

    const connection = app.app.persistencia.connectionFactory();
    const contaDAO = new app.app.persistencia.ContaDAO(connection);

    contaDAO.busca(idUsuario, function (erro, resultado) {
      if (erro) {
        logger.info('Erro ao Buscar Conta: ' + erro);
        res.status(500).send(erro);
        return;
      }
      res.status(200).json(resultado);
    });

  },

  cadastro(app, req, res) {

    req.assert('descricao', 'Descrição obrigatorio').notEmpty();

    const erros = req.validationErrors();

    if (erros){
      console.log('Erros de validacao encontados cadastro conta');
      res.status(400).send(erros);
      return;
    }

    const idUsuario = req.userId;
    let conta = req.body;

    conta = {...conta, id_usuario: idUsuario};

    const connection = app.app.persistencia.connectionFactory();
    const contaDAO = new app.app.persistencia.ContaDAO(connection);

    contaDAO.cadastro(conta, function (erro, resultado) {
      if (erro) {
        logger.info('Erro ao Cadastrar Conta: ' + erro);
        res.status(500).send(erro);
        return;
      }
      res.status(201).send();
    });

  },

  atualiza(app, req, res) {

    req.assert('id', 'Id obrigatorio').notEmpty();
    req.assert('descricao', 'Descrição obrigatorio').notEmpty();

    const erros = req.validationErrors();

    if (erros){
      console.log('Erros de validacao encontados atualiza conta');
      res.status(400).send(erros);
      return;
    }

    const idUsuario = req.userId;
    let conta = req.body;

    conta = {...conta, id_usuario: idUsuario};

    const connection = app.app.persistencia.connectionFactory();
    const contaDAO = new app.app.persistencia.ContaDAO(connection);

    contaDAO.atualiza(conta, function (erro, resultado) {
      if (erro){
        logger.info('Erro ao Atualizar Conta: ' + erro);
        res.status(500).send(erro);
        return;
      }
      res.status(200).send();
    });

  },

  deleta(app, req, res) {

    req.assert('id', 'Id obrigatorio').notEmpty();

    const erros = req.validationErrors();

    if (erros){
      console.log('Erros de validacao encontados deleta conta');
      res.status(400).send(erros);
      return;
    }

    const idConta = req.body;
    const idUsuario = req.userId;

    const connection = app.app.persistencia.connectionFactory();
    const contaDAO = new app.app.persistencia.ContaDAO(connection);
    const lancamentoDAO = new app.app.persistencia.LancamentoDAO(connection);

    lancamentoDAO.deletaPorConta(idConta, idUsuario, function (erro, resultado) {
      if (erro) {
        logger.info('Erro ao Deletar lancamento por Conta: ' + erro);
        res.status(500).send(erro);
        return;
      }

      contaDAO.deleta(idConta, idUsuario, function (erro, resultado) {
        if (erro){
          logger.info('Erro ao Deletar Conta: ' + erro);
          res.status(500).send(erro);
          return;
        }
        res.status(200).send();
      });
    });

  },

};
