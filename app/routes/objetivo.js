const router = require('express').Router();
const verifyJWT = require('../../config/jwt').verifyJWT;

const ObjetivoController = require('../controllers/objetivo');

router.post('/v1/cadastro', verifyJWT, ObjetivoController.cadastro);

router.get('/v1/objetivo', verifyJWT, ObjetivoController.buscaTodos);

router.get('/v1/busca-detalhada', verifyJWT, ObjetivoController.buscaDetalhada);

router.put('/v1/objetivo/:id', verifyJWT, ObjetivoController.update);
//
// router.delete('/v1/delete', verifyJWT, ObjetivoController.deleta);

module.exports = router;

