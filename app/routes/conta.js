module.exports = function (app) {

  const verifyJWT = require('../../config/jwt').verifyJWT;

  app.get('/api/conta/v1/conta', verifyJWT, (req, res, next) => {
    app.app.controllers.conta.busca(app, req, res, next);
  });

  app.post('/api/conta/v1/cadastro', verifyJWT, (req, res, next) => {
    app.app.controllers.conta.cadastro(app, req, res, next);
  });

  app.post('/api/conta/v1/atualiza', verifyJWT, (req, res, next) => {
    app.app.controllers.conta.atualiza(app, req, res, next);
  });

  app.post('/api/conta/v1/deleta', verifyJWT, (req, res, next) => {
    app.app.controllers.conta.deleta(app, req, res, next);
  });

};
