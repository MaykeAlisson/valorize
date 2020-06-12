// Import Logger
const logger = require('../../config/util/logger.js');

module.exports = {

  buscaTodos(app, req, res) {

    const idUsuario = req.userId;

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

};
