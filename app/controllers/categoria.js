// Import Logger
const logger = require('../../config/util/logger.js');

module.exports = {

  cadastro(app, req, res) {

    const pro = req.userPro;

    if (pro !== 'S') {
      res.status(401).send("Adquira a versão Pro!");
      return;
    }

    req.assert('descricao', 'Descrição obrigatorio').notEmpty();
    req.assert('porcentagem', 'Porcentagem obrigatorio').notEmpty();

    const erros = req.validationErrors();

    if (erros) {
      console.log('Erros de validacao encontados cadastro categoria');
      res.status(400).send(erros);
      return;
    }

    const idUsuario = req.userId;
    let categoria = req.body;
    const porcentagem = req.body.porcentagem;

    categoria = {...categoria, id_usuario: idUsuario};

    const connection = app.app.persistencia.connectionFactory();
    const categoriaDAO = new app.app.persistencia.CategoriaDAO(connection);

    categoriaDAO.buscaTotalPorcentagemPorUsuario(idUsuario, function (erro, resultado) {
      if (erro) {
        logger.info('Erro ao Buscar porcentagem total das categorias do usuario: ' + erro);
        res.status(500).send(erro);
        return;
      }

      const porcentagemTotal = porcentagem + resultado[0].porcentagem;

      if (porcentagemTotal > 100) {
        res.status(400).send("Por Favor redistribua as porcentagem das categorias para que não ultrapasse 100%");
        return;
      }

      categoriaDAO.cadastro(categoria, function (erro, resultado) {
        if (erro) {
          logger.info('Erro ao Cadastrar Categoria: ' + erro);
          res.status(500).send(erro);
          return;
        }
        res.status(201).send();
      });
    });


  },

  busca(app, req, res) {

    const idUsuario = req.userId;

    const connection = app.app.persistencia.connectionFactory();
    const categoriaDAO = new app.app.persistencia.CategoriaDAO(connection);

    categoriaDAO.busca(idUsuario, function (erro, resultado) {
      if (erro) {
        logger.info('Erro ao Buscar Categoria: ' + erro);
        res.status(500).send(erro);
        return;
      }
      res.status(200).json(resultado);
    });
  },

  atualiza(app, req, res) {

    const pro = req.userPro;

    if (pro !== 'S') {
      res.status(401).send("Adquira a versão Pro!");
      return;
    }

    req.assert('id', 'Id obrigatorio').notEmpty();
    req.assert('descricao', 'Descrição obrigatorio').notEmpty();
    req.assert('porcentagem', 'Porcentagem obrigatorio').notEmpty();

    const erros = req.validationErrors();

    if (erros) {
      console.log('Erros de validacao encontados atualiza categoria');
      res.status(400).send(erros);
      return;
    }

    const idUsuario = req.userId;
    let categoria = req.body;

    categoria = {...categoria, id_usuario: idUsuario};

    const connection = app.app.persistencia.connectionFactory();
    const categoriaDAO = new app.app.persistencia.CategoriaDAO(connection);

    categoriaDAO.buscaTotalPorcentagemPorUsuario(idUsuario, function (erro, resultado) {
      if (erro) {
        logger.info('Erro ao Buscar porcentagem total das categorias do usuario: ' + erro);
        res.status(500).send(erro);
        return;
      }

      const porcentagemTotal = resultado[0].porcentagem;

      if (porcentagemTotal >= 100) {
        categoriaDAO.buscaPorcentagemPorCategoria(idUsuario, categoria.id, function (erro, porcentagemCategoria) {
          if (erro) {
            logger.info('Erro ao Buscar porcentagem por categoria atualiza categoria: ' + erro);
            res.status(500).send(erro);
            return;
          }

          let porcentagemAtual = porcentagemCategoria[0].porcentagem;

          if (categoria.porcentagem > porcentagemAtual) {
            res.status(400).send("Por Favor redistribua as porcentagem das categorias para que não ultrapasse 100%");
            return;
          } else {
            categoriaDAO.atualiza(categoria, function (erro, resultado) {
              if (erro) {
                logger.info('Erro ao Atualizar Categoria onde % maior que 100: ' + erro);
                res.status(500).send(erro);
                return;
              }
              res.status(200).send();
            });
          }

        });
      } else {
        categoriaDAO.buscaPorcentagemPorCategoria(idUsuario, categoria.id, function (erro, porcentagemCategoria) {
          if (erro) {
            logger.info('Erro ao Buscar porcentagem por categoria atualiza categoria: ' + erro);
            res.status(500).send(erro);
            return;
          }

          let porcentagemAtual = porcentagemCategoria[0].porcentagem;
          let porcentagemParcial = porcentagemTotal - porcentagemAtual;
          let novaPorcentagemTotal = porcentagemParcial + categoria.porcentagem;

          if (novaPorcentagemTotal > 100) {
            res.status(400).send("Por Favor redistribua as porcentagem das categorias para que não ultrapasse 100%");
            return;
          } else {
            categoriaDAO.atualiza(categoria, function (erro, resultado) {
              if (erro) {
                logger.info('Erro ao Atualizar Categoria ondde % menor que 100: ' + erro);
                res.status(500).send(erro);
                return;
              }
              res.status(200).send();
            });
          }
        });
      }

    });

  },


  deleta(app, req, res) {

    const pro = req.userPro;

    if (pro !== 'S') {
      res.status(401).send("Adquira a versão Pro!");
      return;
    }

    req.assert('id', 'Id obrigatorio').notEmpty();

    const erros = req.validationErrors();

    if (erros) {
      console.log('Erros de validacao encontados deleta categoria');
      res.status(400).send(erros);
      return;
    }

    const idCategoria = req.body;
    const idUsuario = req.userId;

    const connection = app.app.persistencia.connectionFactory();
    const categoriaDAO = new app.app.persistencia.CategoriaDAO(connection);
    const lancamentoDAO = new app.app.persistencia.LancamentoDAO(connection);

    lancamentoDAO.deletaPorCategoria(idCategoria, idUsuario, function (erro, resultado) {
      if (erro) {
        logger.info('Erro ao Deletar lancamento por Categoria: ' + erro);
        res.status(500).send(erro);
        return;
      }

      categoriaDAO.delete(idCategoria, idUsuario, function (erro, resultado) {
        if (erro) {
          logger.info('Erro ao deletar Categoria: ' + erro);
          res.status(500).send(erro);
          return;
        }
        res.status(200).send();
      });

    });

  },

   buscaValorDisponivelPorCategoria(app, req, res) {
    const utilData = require('../../config/util/UtilDate');
    const utilObject = require('../../config/util/utilObject');
    const utilNumber = require('../../config/util/UtilNumber');

    const primeiroDiaMesAnterior = utilData.primeiroDiaMesAnterior();
    const ultimoDiaMesAnterior = utilData.ultimoDiaMesAnterior();
    const primeiroDiaMes = utilData.primeiroDiaMes();
    const ultimoDiaMes = utilData.ultimoDiaMes();
    const idUsuario = req.userId;

    const connection = app.app.persistencia.connectionFactory();
    const categoriaDAO = new app.app.persistencia.CategoriaDAO(connection);
    const creditoDAO = new app.app.persistencia.CreditoDAO(connection);
    const lancamentoDAO = new app.app.persistencia.LancamentoDAO(connection);

    let jsonObj = {};
    let resultCategorias = [];
    let creditoMesAtual;
    let creditoMesAnterior;
    let tamanhoListaCategoria = 0;
     let lop = 0;


    creditoDAO.buscaCreditoMesPassadoEAtual(idUsuario, primeiroDiaMes, ultimoDiaMes, primeiroDiaMesAnterior,ultimoDiaMesAnterior,  function (erro, creditos) {
      if (erro) {
        logger.info('Erro ao Buscar Credito para retorno de valor categoria' + erro);
        res.status(500).send(erro);
        return;
      }

      creditoMesAtual = creditos[0].cred_atual;
      creditoMesAnterior = creditos[0].cred_anterior;

      categoriaDAO.buscaPorcentagemTodasCategoria(idUsuario, function (erro, listCategorias) {
        if (erro) {
          logger.info('Erro ao Buscar buscaPorcentagemTodasCategoria para retorno de valor categoria' + erro);
          res.status(500).send(erro);
          return;
        }

        resultCategorias = listCategorias;

        if (utilObject.isEmpty(creditoMesAtual)){
          creditoMesAtual = 0;
        }

        if (utilObject.isEmpty(creditoMesAnterior)){
          creditoMesAnterior = 0;
        }

        if (resultCategorias.length > 0){
          tamanhoListaCategoria = resultCategorias.length;
        }

        const lancamentosMesPassEAtual = (idCategoria, position) => new Promise((resolve, reject) => {

          let lancamentoMesPassado;
          let lancamentoMesAtual;
          let disponivelMesPassado = creditoMesAnterior * (resultCategorias[position].porcentagem);
          let disponivelMesAtual = creditoMesAtual * (resultCategorias[position].porcentagem);
          let sobraMesPassado;
          let disponivel;

          lancamentoDAO.lancamentoMesAtualEPassado(idUsuario, idCategoria, primeiroDiaMes, ultimoDiaMes, primeiroDiaMesAnterior, ultimoDiaMesAnterior, function (erro, lancamentos) {
            if (erro) {
              logger.info('Erro ao Buscar buscaPorcentagemTodasCategoria para retorno de valor categoria' + erro);
              reject(erro);
            }else{
              lancamentoMesAtual = lancamentos[0].lanc_mesAtual;
              lancamentoMesPassado = lancamentos[0].lanc_mesPassado;

              if (utilObject.isEmpty(lancamentoMesAtual)){
                lancamentoMesAtual = 0;
              }

              if (utilObject.isEmpty(lancamentoMesPassado)){
                lancamentoMesPassado = 0;
              }

              sobraMesPassado = disponivelMesPassado - lancamentoMesPassado;

              if (sobraMesPassado < 0){
                let disponivelMesAtualTrunc = Math.trunc(disponivelMesAtual);
                let lancamentoMesAtualTrunc = parseInt(lancamentoMesAtual.toString().replace('.',''));
                let sobraMesPassadoTrunc =  Math.trunc(sobraMesPassado);
                disponivel = (disponivelMesAtualTrunc - lancamentoMesAtualTrunc) - sobraMesPassadoTrunc;
              }else{
                let disponivelMesAtualTrunc = Math.trunc(disponivelMesAtual);
                let lancamentoMesAtualTrunc = parseInt(lancamentoMesAtual.toString().replace('.',''));
                let sobraMesPassadoTrunc =  Math.trunc(sobraMesPassado);
                disponivel = (disponivelMesAtualTrunc - lancamentoMesAtualTrunc) + sobraMesPassadoTrunc;
              }

              resolve(parseInt(disponivel));

            }
          })
        });

        // async
        const buscaLancamentos = async () => {

          try {
            for (var prop in resultCategorias) {
              let id = resultCategorias[prop].id;
              let descricao = resultCategorias[prop].descricao;

              const resposta = await lancamentosMesPassEAtual(id, prop);

              jsonObj[descricao] = utilNumber.mascaraMoney(resposta);
            }

            res.status(200).json(jsonObj);
            return;
          }catch (error) {
            console.log(error);
            res.status(500).send(error);
            return;
          }
        };
        buscaLancamentos();
      });
    });
  },

};
