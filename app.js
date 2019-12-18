//  Importando server.js
const app = require('./config/server');
const port = 9000;

// Config servidor
app.listen(port, function () {
  // console.log(`Servidor online na porta: ${port}`);
  console.log('Umbler listening on port %s', port);
});

