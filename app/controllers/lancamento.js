module.exports = {

  lancamentosMes(app, req, res) {

    const primeiroDiaMes = '2019-11-01';
    const ultimoDiaMes = '2019-11-30';
    const idUsuario = req.userId;

    const connection = app.app.persistencia.connectionFactory();
    const lancamentoDAO = new app.app.persistencia.LancamentoDAO(connection);

    lancamentoDAO.lancamentosMes(idUsuario, primeiroDiaMes, ultimoDiaMes, function (erro, resultado) {
      if (erro) {
        res.status(500).send();
      }
      res.status(200).json(resultado);
    });

  },

  cadastro(app, req, res) {

    const idUsuario = req.userId;
    let lancamento = req.body;

    lancamento = {...lancamento, id_usuario: idUsuario};

    const connection = app.app.persistencia.connectionFactory();
    const lancamentoDAO = new app.app.persistencia.LancamentoDAO(connection);

    lancamentoDAO.cadastro(lancamento, function (erro, resultado) {
      if (erro) {
        res.status(500).send(erro);
      }
      res.status(201).send();
    });

  },

  atualiza(app, req, res) {

    try {
      const lancamento = req.body;
      app.app.model.lancamento.atualiza(lancamento);
      res.status(200);
    } catch (e) {
      res.status(500).json(e);
    }

  },

  deleta(app, req, res) {

    try {
      const idLancamento = req.body;
      app.app.model.lancamento.deletaPorId(idLancamento);
      res.status(200);
    } catch (e) {
      res.status(500).json(e);
    }
  },

};
