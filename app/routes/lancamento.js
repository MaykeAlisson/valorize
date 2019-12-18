module.exports = function (app) {

  const verifyJWT = require('../../config/jwt').verifyJWT;

  app.get('/api/lancamento/v1/lancamento', verifyJWT, (req, res, next) => {
    app.app.controllers.lancamento.lancamentosMes(app, req, res, next);
  });

  app.post('/api/lancamento/v1/cadastro', verifyJWT, (req, res, next) => {
    app.app.controllers.lancamento.cadastro(app, req, res, next);
  });

  app.post('/api/lancamento/v1/atualiza', verifyJWT, (req, res, next) => {
    app.app.controllers.lancamento.atualiza(app, req, res, next);
  });

  app.post('/api/lancamento/v1/deleta', verifyJWT, (req, res, next) => {
    app.app.controllers.lancamento.deleta(app, req, res, next);
  });

  app.get('/api/lancamento/v1/maior-receita-mes', verifyJWT, (req, res, next) => {
    app.app.controllers.lancamento.maiorReceitaMes(app, req, res, next);
  });

  app.get('/api/lancamento/v1/todas-receita-mes', verifyJWT, (req, res, next) => {
    app.app.controllers.lancamento.todasReceitasMes(app, req, res, next);
  });

  app.get('/api/lancamento/v1/todas-despesas-mes', verifyJWT, (req, res, next) => {
    app.app.controllers.lancamento.todasDespesasMes(app, req, res, next);
  });

  app.get('/api/lancamento/v1/tag', verifyJWT, (req, res, next) => {
    app.app.controllers.lancamento.listaTagsPorUsuario(app, req, res, next);
  });

};
