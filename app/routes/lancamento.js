const router = require('express').Router();
const verifyJWT = require('../../config/jwt').verifyJWT;

const LancamentoController = require('../controllers/lancamento');

router.get('/v1/lancamento', verifyJWT, LancamentoController.lancamentosMes);

router.post('/v1/cadastro', verifyJWT, LancamentoController.cadastro);

router.delete('/v1/deleta/:lancamento', verifyJWT, LancamentoController.deleta);

router.get('/v1/lancamentos/:categoria', verifyJWT, LancamentoController.lancamentosPorCategoria);

module.exports = router;


