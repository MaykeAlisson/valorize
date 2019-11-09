module.exports = {

  busca(app, req, res) {

    const idUsuario = req.userId;

    const connection = app.app.persistencia.connectionFactory();
    const contaDAO = new app.app.persistencia.ContaDAO(connection);

    contaDAO.busca(idUsuario, function (erro, resultado) {
      if (erro) {
        res.status(500).send();
      }
      res.status(200).json(resultado);
    });

  },

  cadastro(app, req, res) {

    const idUsuario = req.userId;
    let conta = req.body;

    conta = {...conta, id_usuario: idUsuario};

    const connection = app.app.persistencia.connectionFactory();
    const contaDAO = new app.app.persistencia.ContaDAO(connection);

    contaDAO.cadastro(conta, function (erro, resultado) {
      if (erro) {
        res.status(500).send(erro);
      }
      res.status(201).send();
    });

  },

  atualiza(app, req, res) {

    const idUsuario = req.userId;
    let conta = req.body;

    conta = {...conta, id_usuario: idUsuario};

    const connection = app.app.persistencia.connectionFactory();
    const contaDAO = new app.app.persistencia.ContaDAO(connection);

    contaDAO.atualiza(conta, function (erro, resultado) {
      if (erro){
        res.status(500).send(erro)
      }
      res.status(200).send();
    });

  },

  // Todo nao implementado aguardando lancamentos para poder testar em cascata
  deleta(app, req, res) {

    try {
      const idConta = req.body;
      app.app.model.lancamento.deletaPorIdConta(idConta);
      app.app.model.conta.deleta(idConta);
      res.status(200);
    } catch (e) {
      res.status(500).json(e);
    }
  },

};
