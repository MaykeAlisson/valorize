// Import Logger
const logger = require('../../config/util/logger.js');

module.exports = {

  buscaTodos(app, req, res) {

    const pro = req.userPro;

    if (pro !== 'S') {
      res.status(401).send("Adquira a versão Pro!");
      return;
    }

    req.assert('descricao', 'Descrição obrigatorio').notEmpty();
    req.assert('porcentagem', 'Porcentagem obrigatorio').notEmpty();

    const idUsuario = req.userId;

    const connection = app.app.persistencia.connectionFactory();
    const objetivoDAO = new app.app.persistencia.ObjetivoDAO(connection);

    objetivoDAO.cadastro(credito, function (erro, resultado) {
      if (erro) {
        logger.info('Erro ao Cadastrar Credito: ' + erro);
        res.status(500).send(erro);
        return;
      }
      res.status(201).send();
    });

  },

};
