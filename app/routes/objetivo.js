const router = require('express').Router();
const verifyJWT = require('../../config/jwt').verifyJWT;

const ObjetivoController = require('../controllers/objetivo');


router.get('/v1/objetivo', verifyJWT, ObjetivoController.buscaTodos);

// router.post('/v1/cadastro', verifyJWT, ObjetivoController.cadastro);
//
// router.get('/v1/busca-detalhe', verifyJWT, ObjetivoController.buscaPorId);
//
// router.delete('/v1/delete', verifyJWT, ObjetivoController.deleta);

module.exports = router;

