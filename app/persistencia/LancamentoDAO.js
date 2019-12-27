function LancamentoDAO(connection) {
  this._connection = connection;
}

const mysql = require('mysql');

LancamentoDAO.prototype.lancamentosMes = function (idUsuario, primeiroDiaMes, ultimoDiaMes, callback) {
  let query = `SELECT lc.id
              , lc.valor
              , date_format(\`dia\`,'%d-%m-%Y') as dia
              , lc.descricao
              , co.descricao AS conta
              , lc.id_conta
              , ca.descricao AS categoria
              , lc.id_categoria
              , ca.operacao
              FROM lancamento lc
              JOIN conta co
              ON co.id = lc.id_conta
              JOIN categoria ca
              ON ca.id = lc.id_categoria
              WHERE lc.id_usuario = ${mysql.escape(idUsuario)}
              AND lc.dia between ${mysql.escape(primeiroDiaMes)} AND ${mysql.escape(ultimoDiaMes)}`;
  this._connection.query(query, callback);
};

LancamentoDAO.prototype.cadastro = function (lancamento, callback) {
  let query = `INSERT INTO valorize.lancamento
               (valor, dia, descricao, tags, note, id_usuario, id_conta, id_categoria, criacao)
               VALUES(${mysql.escape(lancamento.valor)},
               ${mysql.escape(lancamento.dia)},
               ${mysql.escape(lancamento.descricao)},
               ${mysql.escape(lancamento.tags)},
               ${mysql.escape(lancamento.note)},
               ${mysql.escape(lancamento.id_usuario)},
               ${mysql.escape(lancamento.id_conta)},
               ${mysql.escape(lancamento.id_categoria)},
               CURRENT_TIMESTAMP)`;
  this._connection.query(query, callback);
};

LancamentoDAO.prototype.atualiza = function (lancamento, callback) {
  let query = `UPDATE lancamento
               SET valor = ${mysql.escape(lancamento.valor)},
               dia = ${mysql.escape(lancamento.dia)},
               descricao = ${mysql.escape(lancamento.descricao)},
               tags = ${mysql.escape(lancamento.tags)},
               note = ${mysql.escape(lancamento.note)},
               id_usuario = ${mysql.escape(lancamento.id_usuario)},
               id_conta = ${mysql.escape(lancamento.id_conta)},
               id_categoria = ${mysql.escape(lancamento.id_categoria)}
               WHERE id = ${mysql.escape(lancamento.id)}`;
  this._connection.query(query, callback);
};

LancamentoDAO.prototype.deletaPorId = function (idLancamento, idUsuario, callback) {
  let query = `DELETE FROM lancamento
               WHERE id = ${mysql.escape(idLancamento.id)}
               AND id_usuario = ${mysql.escape(idUsuario)}`;
  this._connection.query(query, callback);
};

LancamentoDAO.prototype.deletaPorCategoria = function (idCategoria, idUsuario, callback) {
  let query = `DELETE FROM lancamento
               WHERE id_categoria = ${mysql.escape(idCategoria.id)}
               AND id_usuario = ${mysql.escape(idUsuario)}`;
  this._connection.query(query, callback);
};

LancamentoDAO.prototype.deletaPorConta = function (idConta, idUsuario, callback) {
  let query = `DELETE FROM lancamento
               WHERE id_conta = ${mysql.escape(idConta)}
               AND id_usuario = ${mysql.escape(idUsuario)}`;
  this._connection.query(query, callback);
};

LancamentoDAO.prototype.maiorReceitaMes = function (idUsuario, primeiroDiaMes, ultimoDiaMes, callback) {
  let query = ` select MAX(l.valor) as valor
                from lancamento l
                inner join categoria c
                on l.id_categoria    = c.id
                where c.operacao     = 'CREDIT'
                and l.dia between    ${mysql.escape(primeiroDiaMes)} and ${mysql.escape(ultimoDiaMes)}
                and l.id_usuario     = ${mysql.escape(idUsuario)}
                and c.id_usuario     = ${mysql.escape(idUsuario)}`;
  this._connection.query(query, callback);
};

LancamentoDAO.prototype.maiorDespesaMes = function (idUsuario, primeiroDiaMes, ultimoDiaMes, callback) {
  let query = ` select MAX(l.valor) as valor
                from lancamento l
                inner join categoria c
                on l.id_categoria    = c.id
                where c.operacao     = 'DEBIT'
                and l.dia between    ${mysql.escape(primeiroDiaMes)} and ${mysql.escape(ultimoDiaMes)}
                and l.id_usuario     = ${mysql.escape(idUsuario)}
                and c.id_usuario     = ${mysql.escape(idUsuario)}`;
  this._connection.query(query, callback);
};

LancamentoDAO.prototype.todasReceitasMes = function (idUsuario, primeiroDiaMes, ultimoDiaMes, callback) {
  let query = ` select  l.descricao
              , l.valor
              , c.descricao as categoria
              , co.descricao as conta
              , date_format(\`dia\`,'%d-%m-%Y') as data
              from lancamento l
              inner join categoria c
              on l.id_categoria   = c.id
              inner join conta co
              on l.id_conta = co.id
              where c.operacao        = 'CREDIT'
              and l.dia between       ${mysql.escape(primeiroDiaMes)} and ${mysql.escape(ultimoDiaMes)}
              and l.id_usuario        = ${mysql.escape(idUsuario)}
              and c.id_usuario        = ${mysql.escape(idUsuario)}`;
  this._connection.query(query, callback);
};


LancamentoDAO.prototype.todasDespesasMes = function (idUsuario, primeiroDiaMes, ultimoDiaMes, callback) {
  let query = ` select  l.descricao
              , l.valor
              , c.descricao as categoria
              , co.descricao as conta
              , date_format(\`dia\`,'%d-%m-%Y') as data
              from lancamento l
              inner join categoria c
              on l.id_categoria   = c.id
              inner join conta co
              on l.id_conta = co.id
              where c.operacao        = 'DEBIT'
              and l.dia between       ${mysql.escape(primeiroDiaMes)} and ${mysql.escape(ultimoDiaMes)}
              and l.id_usuario        = ${mysql.escape(idUsuario)}
              and c.id_usuario        = ${mysql.escape(idUsuario)}`;
  this._connection.query(query, callback);
};

LancamentoDAO.prototype.todasTagsPorUsuario = function (idUsuario, callback) {
  let query = ` select DISTINCT
                tags
                from  lancamento
                where id_usuario = ${mysql.escape(idUsuario)}`;
  this._connection.query(query, callback);
};

LancamentoDAO.prototype.buscaReceitaMes = function (idUsuario, primeiroDiaMes, ultimoDiaMes, callback){
  let query = ` select SUM(l.valor) as receita
                from lancamento l
                  inner join categoria c
                  on l.id_categoria   = c.id
                where c.operacao        = 'CREDIT'
                and l.dia between       ${mysql.escape(primeiroDiaMes)} and ${mysql.escape(ultimoDiaMes)}
                and l.id_usuario        = ${mysql.escape(idUsuario)}
                and c.id_usuario        = ${mysql.escape(idUsuario)}`;
  this._connection.query(query, callback);
};

LancamentoDAO.prototype.buscaDespesaMes = function (idUsuario, primeiroDiaMes, ultimoDiaMes, callback){
  let query = ` select SUM(l.valor) as despesa
                from lancamento l
                  inner join categoria c
                  on l.id_categoria   = c.id
                where c.operacao        = 'DEBIT'
                and l.dia between       ${mysql.escape(primeiroDiaMes)} and ${mysql.escape(ultimoDiaMes)}
                and l.id_usuario        = ${mysql.escape(idUsuario)}
                and c.id_usuario        = ${mysql.escape(idUsuario)}`;
  this._connection.query(query, callback);
};

module.exports = function () {
  return LancamentoDAO;
};
