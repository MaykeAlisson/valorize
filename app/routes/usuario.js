module.exports = function (app) {

  const verifyJWT = require('../../config/jwt').verifyJWT;

  app.post('/api/usuario/v1/cadastro', function(req, res) {
    app.app.controllers.usuario.cadastro(app, req, res);
  });

  app.post('/api/usuario/v1/login', function (req, res) {
    app.app.controllers.usuario.login(app, req, res);
  });

  app.put('/api/usuario/v1/atualiza_pro/:key', verifyJWT, (req, res, next) => {
    app.app.controllers.usuario.atualizaPro(app, req, res,next);
  });

  app.post('/api/usuario/v1/atualiza_senha', (req, res) => {
    app.app.controllers.usuario.atualizaSenha(app, req, res);
  });


};
