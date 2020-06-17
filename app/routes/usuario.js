const router = require('express').Router();
const verifyJWT = require('../../config/jwt').verifyJWT;
const UsuarioController = require('../controllers/usuario');

router.post('/v1/cadastro', UsuarioController.cadastro);

router.post('/v1/login', UsuarioController.login);

router.put('/v1/atualiza_pro/:key', verifyJWT, UsuarioController.atualizaPro);

router.post('/v1/atualiza_senha', UsuarioController.atualizaSenha);

module.exports = router;

