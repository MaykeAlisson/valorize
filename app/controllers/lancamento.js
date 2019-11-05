module.exports = {

  lancamentosMes(app, req, res) {

    try {
      const primeiroDiaMes = '01-11-2019';
      const ultimoDiaMes = '30-11-2019';
      const idUsuario = req.userId;

      const listaLancamentosMes = app.app.model.lancamento.lancamentosMes(idUsuario, primeiroDiaMes, ultimoDiaMes);
      res.status(200).json(listaLancamentosMes);
    } catch (e) {
      res.status(500).json(e);
    }

  },

  cadastro(app, req, res){

    try {
      const lancamento = req.body;
      app.app.model.lancamento.cadastro(lancamento);
      res.status(201);
    }catch (e) {
      res.status(500).json(e);
    }

  },

  atualiza(app, req, res){

    try {
      const lancamento = req.body;
      app.app.model.lancamento.atualiza(lancamento);
      res.status(200);
    }catch (e) {
      res.status(500).json(e);
    }

  },

  deleta(app, req, res){

    try {
      const idLancamento = req.body;
      app.app.model.lancamento.deletaPorId(idLancamento);
      res.status(200);
    }catch (e) {
      res.status(500).json(e);
    }
  },

};
