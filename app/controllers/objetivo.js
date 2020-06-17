const logger = require('../../config/util/logger.js');
const connection = require('../persistencia/connectionFactory');
const ObjetivoDAO = require('../persistencia/ObjetivoDAO');


exports.buscaTodos = (req, res, next) => {

  const pro = req.userPro;

  if (pro !== 'S') {
    res.status(401).send("Adquira a versão Pro!");
    return;
  }

  req.assert('descricao', 'Descrição obrigatorio').notEmpty();
  req.assert('valor', 'Valor obrigatorio').notEmpty();

  const idUsuario = req.userId;
  let objetivo = req.body;

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


