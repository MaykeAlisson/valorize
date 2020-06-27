const router = require('express').Router();
const verifyJWT = require('../../config/jwt').verifyJWT;
const CategoriaController = require('../controllers/categoria');

router.get('/v1/categoria', verifyJWT, CategoriaController.busca);
router.post('/v1/cadastro', verifyJWT, CategoriaController.cadastro);
router.put('/v1/atualiza', verifyJWT, CategoriaController.atualiza);
router.delete('/v1/deleta', verifyJWT, CategoriaController.deleta);
router.get('/v1/valor-disponivel', verifyJWT, CategoriaController.buscaValorDisponivelPorCategoria);

module.exports = router;

