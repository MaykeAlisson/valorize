module.exports = {

  cadastro(app, req, res) {

    const usuario = {
      nome: req.body.nome,
      sexo: req.body.sexo,
      nascimento: req.body.nascimento,
      id_perfil: req.body.id_perfil,
      id_servico: req.body.id_servico
    };

    try {
      // Id do usuario que acaba de ser inserido
      const id_usuario = app.app.model.usuario.cadastro(usuario);
      endereco.id_usuario = id_usuario;
      telefone.id_usuario = id_usuario;
      login.id_usuario = id_usuario;
      app.app.model.endereco.cadastro(endereco);
      app.app.model.telefone.cadastro(telefone);
      app.app.model.login.cadastro(login);
      res.status(301).redirect('/');
    }catch (e) {
      res.status(500).json(e);
    }

  },

  login(app, req, res){

    const usuario = app.app.model.usuario.login(req.body);

    if (usuario === null){
      res.status(500).json({
        success: false,
        message: 'Autenticação do Usuário falhou. E-mail ou Senha incorreta!'
      });
    }else{
      require("dotenv-safe").config();
      const jwt = require('jsonwebtoken');
      const token = jwt.sign({usuario}, process.env.SECRET, {
        expiresIn: '6h'
      });

      res.status(200).send(token);
    }

  },

};
