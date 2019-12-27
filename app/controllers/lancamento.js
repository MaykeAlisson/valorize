// Import Logger
const logger = require('../../config/util/logger.js');

module.exports = {

  lancamentosMes(app, req, res) {
    const utilData = require('../../config/util/UtilDate');

    const primeiroDiaMes = utilData.primeiroDiaMes();
    const ultimoDiaMes = utilData.ultimoDiaMes();
    const idUsuario = req.userId;

    const connection = app.app.persistencia.connectionFactory();
    const lancamentoDAO = new app.app.persistencia.LancamentoDAO(connection);

    lancamentoDAO.lancamentosMes(idUsuario, primeiroDiaMes, ultimoDiaMes, function (erro, resultado) {
      if (erro) {
        logger.info('Erro ao Buscar lancamento mes atual: ' + erro);
        res.status(500).send();
        return;
      }
      res.status(200).json(resultado);
    });

  },

  cadastro(app, req, res) {

    req.assert('valor', 'Valor obrigatorio').notEmpty();
    req.assert('descricao', 'Descrição obrigatorio').notEmpty();
    req.assert('dia', 'Dia obrigatorio').notEmpty();
    req.assert('id_conta', 'Id_Conta obrigatorio').notEmpty().isEmail();
    req.assert('id_categoria', 'Id_Categoria obrigatorio').notEmpty();

    const erros = req.validationErrors();

    if (erros){
      console.log('Erros de validacao encontados cadastro lancamento');
      res.status(400).send(erros);
      return;
    }

    const idUsuario = req.userId;
    let lancamento = req.body;

    lancamento = {...lancamento, id_usuario: idUsuario};

    const connection = app.app.persistencia.connectionFactory();
    const lancamentoDAO = new app.app.persistencia.LancamentoDAO(connection);

    lancamentoDAO.cadastro(lancamento, function (erro, resultado) {
      if (erro) {
        logger.info('Erro ao Cadastrar  lancamento: ' + erro);
        res.status(500).send(erro);
        return;
      }
      res.status(201).send();
    });

  },

  atualiza(app, req, res) {

    req.assert('id', 'Id obrigatorio').notEmpty();
    req.assert('valor', 'Valor obrigatorio').notEmpty();
    req.assert('descricao', 'Descrição obrigatorio').notEmpty();
    req.assert('dia', 'Dia obrigatorio').notEmpty();
    req.assert('id_conta', 'Id_Conta obrigatorio').notEmpty().isEmail();
    req.assert('id_categoria', 'Id_Categoria obrigatorio').notEmpty();

    const erros = req.validationErrors();

    if (erros){
      console.log('Erros de validacao encontados atualiza lancamento');
      res.status(400).send(erros);
      return;
    }

    const idUsuario = req.userId;
    let lancamento = req.body;

    lancamento = {...lancamento, id_usuario: idUsuario};

    const connection = app.app.persistencia.connectionFactory();
    const lancamentoDAO = new app.app.persistencia.LancamentoDAO(connection);

    lancamentoDAO.atualiza(lancamento, function (erro, resultado) {
      if (erro) {
        logger.info('Erro ao Atualizar lancamento: ' + erro);
        res.status(500).send();
        return;
      }
      res.status(200).send();
    });

  },

  deleta(app, req, res) {

    req.assert('id', 'Id obrigatorio').notEmpty();

    const erros = req.validationErrors();

    if (erros){
      console.log('Erros de validacao encontados deleta lancamento');
      res.status(400).send(erros);
      return;
    }

    const idLancamento = req.body;
    const idUsuario = req.userId;

    const connection = app.app.persistencia.connectionFactory();
    const lancamentoDAO = new app.app.persistencia.LancamentoDAO(connection);

    lancamentoDAO.deletaPorId(idLancamento, idUsuario, function (erro, resultado) {
      if (erro) {
        logger.info('Erro ao Deletar lancamento por id: ' + erro);
        res.status(500).send(erro);
        return;
      }
      res.status(200).send();
    });

  },

  deletaPorCategoria(app, req, res) {

    req.assert('id', 'Id obrigatorio').notEmpty();

    const erros = req.validationErrors();

    if (erros){
      console.log('Erros de validacao encontados deletaPorCategoria lancamento');
      res.status(400).send(erros);
      return;
    }

    const idCategoria = req.body;
    const idUsuario = req.userId;

    const connection = app.app.persistencia.connectionFactory();
    const lancamentoDAO = new app.app.persistencia.LancamentoDAO(connection);

    lancamentoDAO.deletaPorCategoria(idCategoria, idUsuario, function (erro, resultado) {
      if (erro) {
        logger.info('Erro ao Deletar lancamento por Categoria: ' + erro);
        res.status(500).send(erro);
        return;
      }
      res.status(200).send();
    });

  },

  maiorReceitaMes(app, req, res){
    const utilData = require('../../config/util/UtilDate');

    const primeiroDiaMes = utilData.primeiroDiaMes();
    const ultimoDiaMes = utilData.ultimoDiaMes();

    const idUsuario = req.userId;

    const connection = app.app.persistencia.connectionFactory();
    const lancamentoDAO = new app.app.persistencia.LancamentoDAO(connection);

    lancamentoDAO.maiorReceitaMes(idUsuario, primeiroDiaMes, ultimoDiaMes, function(erro, resultado){
      if (erro) {
        logger.info('Erro ao Buscar aior Receita: ' + erro);
        res.status(500).send(erro);
        return;
      }
      res.status(200).json(resultado);
    });
  },

  todasReceitasMes(app, req, res){
    const utilData = require('../../config/util/UtilDate');

    const primeiroDiaMes = utilData.primeiroDiaMes();
    const ultimoDiaMes = utilData.ultimoDiaMes();

    const idUsuario = req.userId;

    const connection = app.app.persistencia.connectionFactory();
    const lancamentoDAO = new app.app.persistencia.LancamentoDAO(connection);

    lancamentoDAO.todasReceitasMes(idUsuario, primeiroDiaMes, ultimoDiaMes, function(erro, resultado){
      if (erro) {
        logger.info('Erro ao Buscar todas receitas' + erro);
        res.status(500).send(erro);
        return;
      }
      res.status(200).json(resultado);
    });
  },

  todasDespesasMes(app, req, res){
    const utilData = require('../../config/util/UtilDate');

    const primeiroDiaMes = utilData.primeiroDiaMes();
    const ultimoDiaMes = utilData.ultimoDiaMes();

    const idUsuario = req.userId;

    const connection = app.app.persistencia.connectionFactory();
    const lancamentoDAO = new app.app.persistencia.LancamentoDAO(connection);

    lancamentoDAO.todasDespesasMes(idUsuario, primeiroDiaMes, ultimoDiaMes, function(erro, resultado){
      if (erro) {
        logger.info('Erro ao Buscar todas despesas Mes: ' + erro);
        res.status(500).send(erro);
        return;
      }
      res.status(200).json(resultado);
    });
  },


  listaTagsPorUsuario(app, req, res){

    const idUsuario = req.userId;

    const connection = app.app.persistencia.connectionFactory();
    const lancamentoDAO = new app.app.persistencia.LancamentoDAO(connection);

    lancamentoDAO.todasTagsPorUsuario(idUsuario, function(erro, resultado){
      if (erro) {
        logger.info('Erro ao Listar todas tags por usuario: ' + erro);
        res.status(500).send(erro);
        return;
      }
      res.status(200).json(resultado);
    });
  },

  receitaMes(app, req, res){

    const utilData = require('../../config/util/UtilDate');

    const primeiroDiaMes = utilData.primeiroDiaMes();
    const ultimoDiaMes = utilData.ultimoDiaMes();

    const idUsuario = req.userId;

    const connection = app.app.persistencia.connectionFactory();
    const lancamentoDAO = new app.app.persistencia.LancamentoDAO(connection);

    lancamentoDAO.buscaReceitaMes(idUsuario, primeiroDiaMes,ultimoDiaMes,function(erro, resultado){
      if (erro) {
        logger.info('Erro ao Buscar receita mes corrente por usuario: ' + erro);
        res.status(500).send(erro);
        return;
      }
      res.status(200).json(resultado);
    });

  },

  despesaMes(app, req, res){
    const utilData = require('../../config/util/UtilDate');

    const primeiroDiaMes = utilData.primeiroDiaMes();
    const ultimoDiaMes = utilData.ultimoDiaMes();

    const idUsuario = req.userId;

    const connection = app.app.persistencia.connectionFactory();
    const lancamentoDAO = new app.app.persistencia.LancamentoDAO(connection);

    lancamentoDAO.buscaDespesaMes(idUsuario, primeiroDiaMes,ultimoDiaMes,function(erro, resultado){
      if (erro) {
        logger.info('Erro ao Buscar despesa mes corrente por usuario: ' + erro);
        res.status(500).send(erro);
        return;
      }
      res.status(200).json(resultado);
    });
  },

};
