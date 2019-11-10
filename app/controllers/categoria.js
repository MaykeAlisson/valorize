module.exports = {

  cadastro(app, req, res) {

    const idUsuario = req.userId;
    let categoria = req.body;

    categoria = {...categoria, id_usuario: idUsuario};

    const connection = app.app.persistencia.connectionFactory();
    const categoriaDAO = new app.app.persistencia.CategoriaDAO(connection);

    categoriaDAO.cadastro(categoria, function (erro, resultado) {
      if (erro) {
        res.status(500).send(erro);
      }
      res.status(201).send();
    });

  },

  busca(app, req, res) {

    const idUsuario = req.userId;

    const connection = app.app.persistencia.connectionFactory();
    const categoriaDAO = new app.app.persistencia.CategoriaDAO(connection);

    categoriaDAO.busca(idUsuario, function (erro, resultado) {
      if (erro) {
        res.status(500).send(erro);
      }
      res.status(200).json(resultado);
    });
  },

  atualiza(app, req, res) {

    const idUsuario = req.userId;
    let categoria = req.body;

    categoria = {...categoria, id_usuario: idUsuario};

    const connection = app.app.persistencia.connectionFactory();
    const categoriaDAO = new app.app.persistencia.CategoriaDAO(connection);

    categoriaDAO.atualiza(categoria, function (erro, resultado) {
      if (erro) {
        res.status(500).send(erro);
      }
      res.status(200).send();
    });

  },

  deleta(app, req, res) {

    const idCategoria = req.body;
    const idUsuario = req.userId;

    const connection = app.app.persistencia.connectionFactory();
    const categoriaDAO = new app.app.persistencia.CategoriaDAO(connection);
    const lancamentoDAO = new app.app.persistencia.LancamentoDAO(connection);

    lancamentoDAO.deletaPorCategoria(idCategoria, idUsuario, function (erro, resultado) {
      if (erro) {
        res.status(500).send(erro);
      }

      categoriaDAO.delete(idCategoria, function (erro, resultado) {
        if (erro) {
          res.status(500).send(erro);
        }
        res.status(200).send();
      });

    });

  },


};
