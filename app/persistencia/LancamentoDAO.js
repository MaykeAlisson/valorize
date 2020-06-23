function LancamentoDAO(connection) {
  this._connection = connection;
}

const mysql = require('mysql');

LancamentoDAO.prototype.lancamentosMes = function (idUsuario, primeiroDiaMes, ultimoDiaMes, callback) {
  let query = `SELECT lc.id
              , lc.valor
              , lc.criacao
              , lc.descricao
              , ca.descricao AS categoria
              , lc.id_categoria
              , lc.tag
              FROM lancamento lc
              JOIN categoria ca
              ON ca.id = lc.id_categoria
              WHERE lc.id_usuario = ${mysql.escape(idUsuario)}
              AND lc.criacao between ${mysql.escape(primeiroDiaMes)} AND ${mysql.escape(ultimoDiaMes)}`;
  this._connection.query(query, callback);
};

LancamentoDAO.prototype.cadastro = function (lancamento, callback) {
  let query = `INSERT INTO poupa_grana.lancamento
               (valor, descricao, id_usuario, id_categoria, tag, criacao)
               VALUES(${mysql.escape(lancamento.valor)},
               ${mysql.escape(lancamento.descricao)},
               ${mysql.escape(lancamento.id_usuario)},
               ${mysql.escape(lancamento.id_categoria)},
               ${mysql.escape(lancamento.tag)},
               CURRENT_TIMESTAMP)`;
  this._connection.query(query, callback);
};

LancamentoDAO.prototype.atualiza = function (lancamento, callback) {
  let query = `UPDATE lancamento
               SET valor = ${mysql.escape(lancamento.valor)},
               descricao = ${mysql.escape(lancamento.descricao)},
               id_usuario = ${mysql.escape(lancamento.id_usuario)},
               id_categoria = ${mysql.escape(lancamento.id_categoria)},
               tag = ${mysql.escape(lancamento.tag)},
               WHERE id = ${mysql.escape(lancamento.id)}
               AND id_usuario = ${mysql.escape(lancamento.id)}`;
  this._connection.query(query, callback);
};

LancamentoDAO.prototype.deletaPorId = function (idLancamento, idUsuario, callback) {
  let query = `DELETE FROM lancamento
               WHERE id = ${mysql.escape(idLancamento)}
               AND id_usuario = ${mysql.escape(idUsuario)}`;
  this._connection.query(query, callback);
};

LancamentoDAO.prototype.deletaPorCategoria = function (idCategoria, idUsuario, callback) {
  let query = `DELETE FROM lancamento
               WHERE id_categoria = ${mysql.escape(idCategoria.id)}
               AND id_usuario = ${mysql.escape(idUsuario)}`;
  this._connection.query(query, callback);
};

LancamentoDAO.prototype.lancamentoMesAtual = function(idUsuario, idCategoria, primeiroDiaMes, ultimoDiaMes, callback){
  let query = ` SELECT sum(lc.valor) as lanc_mesAtual
                FROM lancamento lc
                where lc.id_usuario = ${mysql.escape(idUsuario)}
                and lc.id_categoria = ${mysql.escape(idCategoria)}
                AND lc.criacao BETWEEN ${mysql.escape(primeiroDiaMes)} AND ${mysql.escape(ultimoDiaMes)}
              `;
  this._connection.query(query, callback);
};

LancamentoDAO.prototype.lancamentosPorCategoria = function (idUsuario, idCategoria, primeiroDiaMes, ultimoDiaMes, callback) {
  let query = `SELECT valor
              , descricao
              , id_categoria
              , tag
              , criacao
               FROM lancamento lc
               WHERE lc.id_usuario = ${mysql.escape(idUsuario)}
               AND lc.id_categoria = ${mysql.escape(idCategoria)}
               AND lc.criacao between ${mysql.escape(primeiroDiaMes)} AND ${mysql.escape(ultimoDiaMes)}`;
  this._connection.query(query, callback);
};

LancamentoDAO.prototype.lancamentosPorTag = function (idUsuario, tag, callback) {
  let query = ` SELECT SUM(valor) vlr_atual FROM lancamento l
                WHERE id_usuario = ${mysql.escape(idUsuario)}
                AND tag = ${mysql.escape(tag)}`;
  this._connection.query(query, callback);
};


module.exports = LancamentoDAO;

