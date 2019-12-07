// Import logger
const logger = require('../../config/util/logger.js');

module.exports = {

  home(app, req, res){
    // console.log(req.query.id);
    logger.info('logando route index');
    res.status(200).json({'page': 'home', 'author': 'Mayke Alisson'});
  }

};
