const logger = require('../../config/util/logger.js');
const utilData = require('../../config/util/UtilDate');
const connection = require('../persistencia/connectionFactory');
const CreditoDAO = require('../persistencia/CreditoDAO');


exports.cadastro = (req, res, next) => {

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

    const creditoDAO = new CreditoDAO(connection);

    creditoDAO.cadastro(credito, function (erro, resultado) {
      if (erro) {
        logger.info('Erro ao Cadastrar Credito: ' + erro);
        res.status(500).send(erro);
        return;
      }
      res.status(201).send();
    });

  };

exports.busca = (req, res, next) => {

    const primeiroDiaMes = utilData.primeiroDiaMes();
    const ultimoDiaMes = utilData.ultimoDiaMes();

    const idUsuario = req.userId;

    const creditoDAO = new CreditoDAO(connection);

    creditoDAO.busca(idUsuario, primeiroDiaMes, ultimoDiaMes, function (erro, resultado) {
      if (erro) {
        logger.info('Erro ao Buscar Credito: ' + erro);
        res.status(500).send(erro);
        return;
      }
      res.status(200).json(resultado);
    });
  };

exports.deleta = (req, res, next) => {

    req.assert('id', 'Id obrigatorio').notEmpty();

    const erros = req.validationErrors();

    if (erros) {
      console.log('Erros de validacao encontados deleta credito');
      res.status(400).send(erros);
      return;
    }

    const idCredito = req.params.id;
    const idUsuario = req.userId;

    const creditoDAO = new CreditoDAO(connection);

    creditoDAO.delete(idCredito, idUsuario, function (erro, resultado) {
      if (erro) {
        logger.info('Erro ao deletar Credito: ' + erro);
        res.status(500).send(erro);
        return;
      }
      res.status(200).send();
    });

  };

exports.totalCreditoMes = (req, res, next) => {

    const primeiroDiaMes = utilData.primeiroDiaMes();
    const ultimoDiaMes = utilData.ultimoDiaMes();

    const idUsuario = req.userId;

    const creditoDAO = new CreditoDAO(connection);

    creditoDAO.buscaValorTodosCreditoMes( idUsuario, primeiroDiaMes,ultimoDiaMes,function (erro, resultado) {
      if (erro) {
        logger.info('Erro ao deletar Credito: ' + erro);
        res.status(500).send(erro);
        return;
      }
      res.status(200).json(resultado[0]);
    });

  };



