module.exports = function (app) {

  const verifyJWT = require('../../config/jwt').verifyJWT;

  app.get('/api/categoria/v1/categoria', verifyJWT, (req, res, next) => {
    app.app.controllers.categoria.busca(app, req, res, next);
  });

  app.post('/api/categoria/v1/cadastro', verifyJWT, (req, res, next) => {
    app.app.controllers.categoria.cadastro(app, req, res, next);
  });

  app.put('/api/categoria/v1/atualiza', verifyJWT, (req, res, next) => {
    app.app.controllers.categoria.atualiza(app, req, res, next);
  });

  app.delete('/api/categoria/v1/deleta', verifyJWT, (req, res, next) => {
    app.app.controllers.categoria.deleta(app, req, res, next);
  });

  app.get('/api/categoria/v1/valor-disponivel', verifyJWT, (req, res, next) => {
    app.app.controllers.categoria.buscaValorDisponivelPorCategoria(app, req, res, next);
  });

};
