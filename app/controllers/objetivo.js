const logger = require('../../config/util/logger.js');
const connection = require('../persistencia/connectionFactory');
const utilObject = require('../../config/util/utilObject');
const utilNumber = require('../../config/util/UtilNumber');
const ObjetivoDAO = require('../persistencia/ObjetivoDAO');
const LancamentoDAO = require('../persistencia/LancamentoDAO');


exports.cadastro = (req, res, next) => {

  const pro = req.userPro;

  if (pro !== 'S') {
    res.status(401).send("Adquira a versão Pro!");
    return;
  }

  req.assert('descricao', 'Descrição obrigatorio').notEmpty();
  req.assert('valor_objetivo', 'Valor obrigatorio').notEmpty();
  req.assert('tag', 'Tag obrigatoria').notEmpty();

  const idUsuario = req.userId;
  let objetivo = req.body;
  objetivo.id_usuario = idUsuario;

  const objetivoDAO = new ObjetivoDAO(connection);

  objetivoDAO.cadastro(objetivo, function (erro, resultado) {
    if (erro) {
      logger.info('Erro ao Cadastrar Objetivo: ' + erro);
      res.status(500).send(erro);
      return;
    }
    res.status(201).send();
  });
};

exports.buscaTodos = (req, res, next) => {

  const pro = req.userPro;

  if (pro !== 'S') {
    res.status(401).send("Adquira a versão Pro!");
    return;
  }

  const idUsuario = req.userId;

  const objetivoDAO = new ObjetivoDAO(connection);

  objetivoDAO.buscaPorUsuario(idUsuario, function (erro, resultado) {
    if (erro) {
      logger.info('Erro ao Busca Objetivo por usuario: ' + erro);
      res.status(500).send(erro);
      return;
    }
    res.status(200).json(resultado);
  });
};

exports.buscaDetalhada = (req, res, next) => {

  const pro = req.userPro;

  if (pro !== 'S') {
    res.status(401).send("Adquira a versão Pro!");
    return;
  }

  const idUsuario = req.userId;
  const objetivoDAO = new ObjetivoDAO(connection);
  const lancamentoDAO = new LancamentoDAO(connection);

  let resultObjetivos = [];
  let objetivos = [];

  objetivoDAO.buscaDetalhada(idUsuario, function (erro, resultado) {
    if (erro) {
      logger.info('Erro ao Busca Objetivo Detalhada: ' + erro);
      res.status(500).send(erro);
      return;
    }

    resultObjetivos = resultado;

    const lancamentosTag = (position) => new Promise((resolve, reject) => {

      let vlr_atual;
      let tag = resultObjetivos[position].tag;

      lancamentoDAO.lancamentosPorTag(idUsuario, tag, function (erro, vlr) {
        if (erro) {
          logger.info('Erro ao Buscar lancamentosPorTag ' + erro);
          reject(erro);
        }else{
          vlr_atual = vlr[0].vlr_atual;

          if (utilObject.isEmpty(vlr_atual)) {
            vlr_atual = 0;
          }

          resolve(vlr_atual);
        }
      });
    });
    const buscaLancamentoTag = async () => {

      try {
        for (let prop in resultObjetivos) {
          let jsonObj = {};
          jsonObj.id = resultObjetivos[prop].id;
          jsonObj.descricao = resultObjetivos[prop].descricao;
          jsonObj.objetivo = resultObjetivos[prop].valor_objetivo;

          const resposta = await lancamentosTag(prop);
          jsonObj.valor_atual = resposta.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
          objetivos.push(jsonObj);
        }
        res.status(200).json(objetivos);
        return;
      }catch (erro) {
        console.log(erro);
        res.status(500).send(erro);
        return;
      }
    }
    buscaLancamentoTag();
  });
};

exports.update = (req, res, next) => {

  const pro = req.userPro;

  if (pro !== 'S') {
    res.status(401).send("Adquira a versão Pro!");
    return;
  }

  req.assert('id', 'Id obrigatorio').notEmpty();
  req.assert('descricao', 'Descrição obrigatorio').notEmpty();
  req.assert('valor_objetivo', 'Valor obrigatorio').notEmpty();
  req.assert('tag', 'Tag obrigatoria').notEmpty();

  const erros = req.validationErrors();

  if (erros) {
    console.log('Erros de validacao encontados busca objetivo por id');
    res.status(400).send(erros);
    return;
  }

  const idUsuario = req.userId;
  const idObjetivo = req.params.id;
  const objetivo = req.body;

  const objetivoDAO = new ObjetivoDAO(connection);

  objetivoDAO.update(idUsuario, idObjetivo, objetivo, function (erro, resultado) {
    if (erro) {
      logger.info('Erro ao Atualizar Objetivo: ' + erro);
      res.status(500).send(erro);
      return;
    }

    res.status(200).send();

  });

};


