module.exports = function (app) {

  const verifyJWT = require('../../config/jwt').verifyJWT;

  app.post('/api/usuario/v1/cadastro', function(req, res) {
    app.app.controllers.usuario.cadastro(app, req, res);
  });

  app.post('/api/usuario/v1/login', function (req, res) {
    app.app.controllers.usuario.login(app, req, res);
  });

  app.post('/api/usuario/v1/atualiza', verifyJWT, (req, res, next) => {
    app.app.controllers.usuario.atualiza(app, req, res);
  });

};
