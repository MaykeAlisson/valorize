module.exports = function (app) {

  const verifyJWT = require('../../config/jwt').verifyJWT;

  app.get('/api/v1/categoria', verifyJWT, (req, res, next) => {
    app.app.controllers.categoria.busca(app, req, res, next);
  });

  app.post('/api/v1/categoria/cadastro', verifyJWT, (req, res, next) => {
    app.app.controllers.categoria.cadastro(app, req, res, next);
  });

  app.post('/api/v1/categoria/atualiza', verifyJWT, (req, res, next) => {
    app.app.controllers.categoria.atualiza(app, req, res, next);
  });

  app.post('/api/v1/categoria/deleta', verifyJWT, (req, res, next) => {
    app.app.controllers.categoria.deleta(app, req, res, next);
  });

};
