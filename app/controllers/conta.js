module.exports = {

  busca(app, req, res) {

    try {
      const idUsuario = req.userId;
      const listaConta = app.app.model.conta.busca(idUsuario);
      res.status(200).json(listaConta);
    } catch (e) {
      res.status(500).json(e);
    }

  },

  cadastro(app, req, res){

    try {
      const conta =  req.body;
      app.app.model.conta.cadastro(conta);
      res.status(201);
    }catch (e) {
      res.status(500).json(e);
    }

  },

  atualiza(app, req, res){

    try {
      const conta = req.body;
      app.app.model.conta.atualiza(conta);
      res.status(200);
    }catch (e) {
      res.status(500).json(e);
    }

  },

  deleta(app, req, res){

    try {
      const idConta = req.body;
      app.app.model.lancamento.deletaPorIdConta(idConta);
      app.app.model.conta.deleta(idConta);
      res.status(200);
    }catch (e) {
      res.status(500).json(e);
    }
  },

};
