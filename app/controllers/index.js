exports.home = (req, res, next) => {
  res.status(200).json({'page': 'home', 'author': 'Mayke Alisson'});
};


