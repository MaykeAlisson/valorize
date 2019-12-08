const cluster = require('cluster');
const os = require('os');

const cpus = os.cpus();

if (cluster.isMaster) {
  cpus.forEach(function () {
    cluster.fork();
  });
}else {
  console.log('execultando therd slave');
  require('./app.js');
}


