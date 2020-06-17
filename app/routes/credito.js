const router = require('express').Router();
const verifyJWT = require('../../config/jwt').verifyJWT;

const CreditoController = require('../controllers/credito');

router.get('/v1/credito', verifyJWT, CreditoController.busca);

router.post('/v1/credito', verifyJWT, CreditoController.cadastro);

router.delete('/v1/deleta/:id', verifyJWT, CreditoController.deleta);

router.get('/v1/total-credito-mes', verifyJWT, CreditoController.totalCreditoMes);

module.exports = router;

