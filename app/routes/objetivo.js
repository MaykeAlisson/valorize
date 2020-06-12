module.exports = function (app) {

  const verifyJWT = require('../../config/jwt').verifyJWT;

  app.get('/api/objetivo/v1/objetivo', verifyJWT, (req, res, next) =>  {
    app.app.controllers.obetivo.buscaTodos(app, req, res, next);
  });

  app.post('/api/objetivo/v1/cadastro', verifyJWT, (req, res, next) =>  {
    app.app.controllers.obetivo.cadastro(app, req, res, next);
  });

  app.get('/api/objetivo/v1/busca-detalhe', verifyJWT, (req, res, next) =>  {
    app.app.controllers.obetivo.buscaPorId(app, req, res, next);
  });

  app.delete('/api/objetivo/v1/delete', verifyJWT, (req, res, next) =>  {
    app.app.controllers.obetivo.deleta(app, req, res, next);
  });

};
