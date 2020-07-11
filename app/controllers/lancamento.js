const logger = require('../../config/util/logger.js');
const utilData = require('../../config/util/UtilDate');
const connection = require('../persistencia/connectionFactory');
const LancamentoDAO = require('../persistencia/LancamentoDAO');
const CategoriaDAO = require('../persistencia/CategoriaDAO');
const {isEmpty} = require("../../config/util/utilObject");


exports.lancamentosMes = (req, res, next) => {

  const primeiroDiaMes = utilData.primeiroDiaMes();
  const ultimoDiaMes = utilData.ultimoDiaMes();
  const idUsuario = req.userId;

  const lancamentoDAO = new LancamentoDAO(connection);

  lancamentoDAO.lancamentosMes(idUsuario, primeiroDiaMes, ultimoDiaMes, function (erro, resultado) {
    if (erro) {
      logger.info('Erro ao Buscar lancamento mes atual: ' + erro);
      res.status(500).send(erro);
      return;
    }
    res.status(200).json(resultado);
  });

};

exports.cadastro = (req, res, next) => {

  req.assert('valor', 'Valor obrigatorio').notEmpty();
  req.assert('descricao', 'Descrição obrigatorio').notEmpty();
  req.assert('id_categoria', 'Id_Categoria obrigatorio').notEmpty();

  const erros = req.validationErrors();

  if (erros) {
    console.log('Erros de validacao encontados cadastro lancamento');
    res.status(400).send(erros);
    return;
  }

  const idUsuario = req.userId;
  let lancamento = req.body;

  lancamento = {...lancamento, id_usuario: idUsuario};

  const lancamentoDAO = new LancamentoDAO(connection);
  const categoriaDAO = new CategoriaDAO(connection);

  categoriaDAO.categoriaPertenceUsuario(idUsuario, lancamento.id_categoria, function (erro, id) {
    if (erro) {
      logger.info('Erro ao ferificar se conta pertence a usuario: ' + erro);
      res.status(500).send(erro);
      return;
    }

    if (isEmpty(id)){
      res.status(400).send(`Conta com o id ${lancamento.id_categoria} não pertence ao usuario`);
      return;
    }

    lancamentoDAO.cadastro(lancamento, function (erro, resultado) {
      if (erro) {
        logger.info('Erro ao Cadastrar  lancamento: ' + erro);
        res.status(500).send(erro);
        return;
      }
      res.status(201).send();
    });
  });

};

exports.deleta = (req, res, next) => {

  req.assert('lancamento', 'Informe o lançamento').notEmpty();

  const erros = req.validationErrors();

  if (erros) {
    console.log('Erros de validacao encontados deleta lancamento');
    res.status(400).send(erros);
    return;
  }

  const idLancamento = req.params.lancamento;
  const idUsuario = req.userId;

  const lancamentoDAO = new LancamentoDAO(connection);

  lancamentoDAO.deletaPorId(idLancamento, idUsuario, function (erro, resultado) {
    if (erro) {
      logger.info('Erro ao Deletar lancamento por id: ' + erro);
      res.status(500).send(erro);
      return;
    }
    res.status(200).send();
  });

};

exports.deletaPorCategoria = (req, res, next) => {

  req.assert('id', 'Id obrigatorio').notEmpty();

  const erros = req.validationErrors();

  if (erros) {
    console.log('Erros de validacao encontados deletaPorCategoria lancamento');
    res.status(400).send(erros);
    return;
  }

  const idCategoria = req.body;
  const idUsuario = req.userId;

  const lancamentoDAO = new LancamentoDAO(connection);

  lancamentoDAO.deletaPorCategoria(idCategoria, idUsuario, function (erro, resultado) {
    if (erro) {
      logger.info('Erro ao Deletar lancamento por Categoria: ' + erro);
      res.status(500).send(erro);
      return;
    }
    res.status(200).send();
  });

};

exports.lancamentosPorCategoria = (req, res, next) => {

  req.assert('categoria', 'Id categoria obrigatorio').notEmpty();

  const erros = req.validationErrors();

  if (erros) {
    console.log('Erros de validacao encontados lancamentosPorCategoria lancamento');
    res.status(400).send(erros);
    return;
  }

  const idCategoria = req.params.categoria;
  const primeiroDiaMes = utilData.primeiroDiaMes();
  const ultimoDiaMes = utilData.ultimoDiaMes();
  const idUsuario = req.userId;

  const lancamentoDAO = new LancamentoDAO(connection);

  lancamentoDAO.lancamentosPorCategoria(idUsuario, idCategoria, primeiroDiaMes, ultimoDiaMes, function (erro, resultado) {
    if (erro) {
      logger.info('Erro ao Buscar lancamento mes atual por categoria: ' + erro);
      res.status(500).send();
      return;
    }
    res.status(200).json(resultado);
  });

};

