const logger = require('../../config/util/logger.js');
const utilData = require('../../config/util/UtilDate');
const utilObject = require('../../config/util/utilObject');
const utilNumber = require('../../config/util/UtilNumber');

const connection = require('../persistencia/connectionFactory');
const CategoriaDAO = require('../persistencia/CategoriaDAO');
const LancamentoDAO = require('../persistencia/LancamentoDAO');
const CreditoDAO = require('../persistencia/CreditoDAO');

exports.cadastro = (req, res, next) => {

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

  const categoriaDAO = new CategoriaDAO(connection)


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


};

exports.busca = (req, res, next) => {

  const idUsuario = req.userId;

  const categoriaDAO = new CategoriaDAO(connection);

  categoriaDAO.busca(idUsuario, function (erro, resultado) {
    if (erro) {
      logger.info('Erro ao Buscar Categoria: ' + erro);
      res.status(500).send(erro);
      return;
    }
    res.status(200).json(resultado);
  });
};

exports.atualiza = (req, res, next) => {

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

  const categoriaDAO = new CategoriaDAO(connection);

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

};


exports.deleta = (req, res, next) => {

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

  const categoriaDAO = new CategoriaDAO(connection);
  const lancamentoDAO = new LancamentoDAO(connection);

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

};

exports.buscaValorDisponivelPorCategoria = (req, res, next) => {

  const primeiroDiaMes = utilData.primeiroDiaMes();
  const ultimoDiaMes = utilData.ultimoDiaMes();
  const idUsuario = req.userId;

  const categoriaDAO = new CategoriaDAO(connection);
  const creditoDAO = new CreditoDAO(connection);
  const lancamentoDAO = new LancamentoDAO(connection);

  let jsonObj = {};
  let resultCategorias = [];
  let creditoMesAtual;
  let tamanhoListaCategoria = 0;

  creditoDAO.buscaCreditoMesAtual(idUsuario, primeiroDiaMes, ultimoDiaMes, function (erro, creditos) {
    if (erro) {
      logger.info('Erro ao Buscar Credito para retorno de valor categoria' + erro);
      res.status(500).send(erro);
      return;
    }

    creditoMesAtual = creditos[0].credito_mes;

    categoriaDAO.buscaPorcentagemTodasCategoria(idUsuario, function (erro, listCategorias) {
      if (erro) {
        logger.info('Erro ao Buscar buscaPorcentagemTodasCategoria para retorno de valor categoria' + erro);
        res.status(500).send(erro);
        return;
      }

      resultCategorias = listCategorias;

      if (utilObject.isEmpty(creditoMesAtual)) {
        creditoMesAtual = 0;
      }

      if (resultCategorias.length > 0) {
        tamanhoListaCategoria = resultCategorias.length;
      }

      const lancamentosMesAtual = (idCategoria, position) => new Promise((resolve, reject) => {

        let lancamentoMesAtual;
        let disponivelMesAtual = creditoMesAtual * (resultCategorias[position].porcentagem);
        let disponivel;

        lancamentoDAO.lancamentoMesAtual(idUsuario, idCategoria, primeiroDiaMes, ultimoDiaMes, function (erro, lancamentos) {
          if (erro) {
            logger.info('Erro ao Buscar buscaPorcentagemTodasCategoria para retorno de valor categoria' + erro);
            reject(erro);
          } else {
            lancamentoMesAtual = lancamentos[0].lanc_mesAtual;

            if (utilObject.isEmpty(lancamentoMesAtual)) {
              lancamentoMesAtual = 0;
            }

            let disponivelMesAtualTrunc = Math.trunc(disponivelMesAtual);
            let lancamentoMesAtualTrunc = parseInt(lancamentoMesAtual.toString().replace('.', ''));
            disponivel = (disponivelMesAtualTrunc - lancamentoMesAtualTrunc);

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

            const resposta = await lancamentosMesAtual(id, prop);

            jsonObj[descricao] = utilNumber.mascaraMoney(resposta);
          }

          res.status(200).json(jsonObj);
          return;
        } catch (error) {
          console.log(error);
          res.status(500).send(error);
          return;
        }
      };
      buscaLancamentos();
    });
  });
};

