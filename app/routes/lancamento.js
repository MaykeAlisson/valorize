module.exports = function (app) {

  const verifyJWT = require('../../config/jwt').verifyJWT;

  app.get('/api/lancamento/v1/lancamento', verifyJWT, (req, res, next) => {
    app.app.controllers.lancamento.lancamentosMes(app, req, res, next);
  });

  app.post('/api/lancamento/v1/cadastro', verifyJWT, (req, res, next) => {
    app.app.controllers.lancamento.cadastro(app, req, res, next);
  });

  app.delete('/api/lancamento/v1/deleta/:lancamento', verifyJWT, (req, res, next) => {
    app.app.controllers.lancamento.deleta(app, req, res, next);
  });

  app.get('/api/lancamento/v1/lancamentos/:categoria', verifyJWT, (req, res, next) => {
    app.app.controllers.lancamento.lancamentosPorCategoria(app, req, res, next);
  });

};
