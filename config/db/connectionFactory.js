const mysql = require('mysql');

function createDBConnection(){
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'jesus',
    database: 'valorize'
  });
}

module.exports = function () {
  return createDBConnection;
};
