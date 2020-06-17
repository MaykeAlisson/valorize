const router = require('express').Router();

const IndexController = require('../controllers/index');

router.get('/', IndexController.home);

module.exports = router;
