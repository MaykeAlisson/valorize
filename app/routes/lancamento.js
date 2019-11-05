module.exports = function (app) {

  const verifyJWT = require('../../config/jwt').verifyJWT;

  app.get('/api/v1/lancamentos-mes', verifyJWT, (req, res, next) => {
    app.app.controllers.lancamento.lancamentosMes(app, req, res, next);
  });

  app.post('/api/v1/lancamento', verifyJWT, (req, res, next) => {
    app.app.controllers.lancamento.cadastro(app, req, res, next);
  });

  app.post('/api/v1/lancamento/atualiza', verifyJWT, (req, res, next) => {
    app.app.controllers.lancamento.atualiza(app, req, res, next);
  });

  app.post('/api/v1/lancamento/deleta', verifyJWT, (req, res, next) => {
    app.app.controllers.lancamento.deleta(app, req, res, next);
  });

};
