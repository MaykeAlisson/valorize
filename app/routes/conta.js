module.exports = function (app) {

  const verifyJWT = require('../../config/jwt').verifyJWT;

  app.get('/api/v1/conta', verifyJWT, (req, res, next) => {
    app.app.controllers.conta.busca(app, req, res, next);
  });

  app.post('/api/v1/conta/cadastro', verifyJWT, (req, res, next) => {
    app.app.controllers.conta.cadastro(app, req, res, next);
  });

  app.post('/api/v1/conta/atualiza', verifyJWT, (req, res, next) => {
    app.app.controllers.conta.atualiza(app, req, res, next);
  });

  app.post('/api/v1/conta/deleta', verifyJWT, (req, res, next) => {
    app.app.controllers.conta.deleta(app, req, res, next);
  });

};
