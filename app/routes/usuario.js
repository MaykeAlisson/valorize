module.exports = function (app) {

  app.post('/api/v1/usuario/login', function (req, res) {
    app.app.controllers.usuario.login(app, req, res);
  });

};
