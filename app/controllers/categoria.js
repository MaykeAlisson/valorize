module.exports = {

  cadastro(app, req, res) {

    const idUsuario = req.userId;
    let categoria = req.body;

    categoria = {...categoria, id_usuario: idUsuario};

    console.log(categoria);

    const connection = app.app.persistencia.connectionFactory();
    const categoriaDAO = new app.app.persistencia.CategoriaDAO(connection);

    categoriaDAO.cadastro(categoria, function (erro, resultado) {
      if (erro){
        res.status(500).send(erro);
      }
      res.status(201).send();
    });

  },

  busca(app, req, res) {

    const idUsuario = req.userId;
    const listaCategoria = app.app.model.categoria.busca(idUsuario);
    res.status(200).json(listaCategoria);

    res.status(500).json(e);

  },

  atualiza(app, req, res) {

    try {
      const categoria = req.body;
      app.app.model.categoria.atualiza(categoria);
      res.status(200);
    } catch (e) {
      res.status(500).json(e);
    }
  },

  deleta(app, req, res) {

    try {
      const idCategoria = req.body;
      app.app.model.lancamento.deletaPorCategoria(idCategoria);
      app.app.model.categoria.delete(idCategoria);
      res.status(200);
    } catch (e) {
      res.status(500).json(e);
    }
  },


};
