// Import Logger
const logger = require('../../config/util/logger.js');

module.exports = {

  cadastro(app, req, res) {

    req.assert('descricao', 'Descrição obrigatorio').notEmpty();
    req.assert('valor', 'Valor obrigatorio').notEmpty();

    const erros = req.validationErrors();

    if (erros) {
      console.log('Erros de validacao encontados cadastro Credito');
      res.status(400).send(erros);
      return;
    }

    const idUsuario = req.userId;
    let credito = req.body;

    credito = {...credito, id_usuario: idUsuario};

    const connection = app.app.persistencia.connectionFactory();
    const creditoDAO = new app.app.persistencia.CreditoDAO(connection);

    creditoDAO.cadastro(credito, function (erro, resultado) {
      if (erro) {
        logger.info('Erro ao Cadastrar Credito: ' + erro);
        res.status(500).send(erro);
        return;
      }
      res.status(201).send();
    });

  },

  busca(app, req, res) {
    const utilData = require('../../config/util/UtilDate');

    const primeiroDiaMes = utilData.primeiroDiaMes();
    const ultimoDiaMes = utilData.ultimoDiaMes();

    const idUsuario = req.userId;

    const connection = app.app.persistencia.connectionFactory();
    const creditoDAO = new app.app.persistencia.CreditoDAO(connection);

    creditoDAO.busca(idUsuario, primeiroDiaMes, ultimoDiaMes, function (erro, resultado) {
      if (erro) {
        logger.info('Erro ao Buscar Credito: ' + erro);
        res.status(500).send(erro);
        return;
      }
      res.status(200).json(resultado);
    });
  },

  deleta(app, req, res) {

    req.assert('id', 'Id obrigatorio').notEmpty();

    const erros = req.validationErrors();

    if (erros) {
      console.log('Erros de validacao encontados deleta credito');
      res.status(400).send(erros);
      return;
    }

    const idCredito = req.params.id;
    const idUsuario = req.userId;

    const connection = app.app.persistencia.connectionFactory();
    const creditoDAO = new app.app.persistencia.CreditoDAO(connection);

    creditoDAO.delete(idCredito, idUsuario, function (erro, resultado) {
      if (erro) {
        logger.info('Erro ao deletar Credito: ' + erro);
        res.status(500).send(erro);
        return;
      }
      res.status(200).send();
    });

  },

  totalCreditoMes(app, req, res) {
    const utilData = require('../../config/util/UtilDate');
    const primeiroDiaMes = utilData.primeiroDiaMes();
    const ultimoDiaMes = utilData.ultimoDiaMes();

    const idUsuario = req.userId;

    const connection = app.app.persistencia.connectionFactory();
    const creditoDAO = new app.app.persistencia.CreditoDAO(connection);

    creditoDAO.buscaValorTodosCreditoMes( idUsuario, primeiroDiaMes,ultimoDiaMes,function (erro, resultado) {
      if (erro) {
        logger.info('Erro ao deletar Credito: ' + erro);
        res.status(500).send(erro);
        return;
      }
      res.status(200).json(resultado[0]);
    });

  },


};
