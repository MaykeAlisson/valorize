module.exports = {

  busca(app, req, res){

    try {
      const idUsuario = req.userId;
      const listaCategoria = app.app.model.categoria.busca(idUsuario);
      res.status(200).json(listaCategoria);
    }catch (e) {
      res.status(500).json(e);
    }

  },

  cadastro(app, req, res){

    try {
      const categoria = req.body;
      app.app.model.categoria.cadastro(categoria);
      res.status(201);
    }catch (e) {
      res.status(500).json(e);
    }

  },

  atualiza(app, req, res){

    try {
      const categoria = req.body;
      app.app.model.categoria.atualiza(categoria);
      res.status(200);
    }catch (e) {
      res.status(500).json(e);
    }
  },

  deleta(app, req, res){

    try {
      const idCategoria = req.body;
      app.app.model.lancamento.deletaPorCategoria(idCategoria);
      app.app.model.categoria.delete(idCategoria);
      res.status(200);
    }catch (e) {
      res.status(500).json(e);
    }
  },


};
