module.exports = function (app) {

  const verifyJWT = require('../../config/jwt').verifyJWT;

  app.get('/api/credito/v1/credito', verifyJWT, (req, res, next) => {
    app.app.controllers.credito.busca(app, req, res, next);
  });

  app.post('/api/credito/v1/credito', verifyJWT, (req, res, next) => {
    app.app.controllers.credito.cadastro(app, req, res, next);
  });

  app.delete('/api/credito/v1/deleta/:id', verifyJWT, (req, res, next) => {
    app.app.controllers.credito.deleta(app, req, res, next);
  });

  app.get('/api/credito/v1/total-credito-mes', verifyJWT, (req, res, next) => {
    app.app.controllers.credito.totalCreditoMes(app, req, res, next);
  });

};
