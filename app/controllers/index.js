module.exports = {

  home(app, req, res){
    // console.log(req.query.id);
    res.status(200).json({'page': 'home', 'author': 'Mayke Alisson'});
  }

};
