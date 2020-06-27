const mysql = require('mysql');

function createDBConnection(){
  return mysql.createPool({
    connectionLimit : 20,
    host: process.env.db_host || 'localhost',
    user: process.env.db_user || 'root',
    password: process.env.db_senha || 'jesus',
    database: 'poupa_grana'
  });
}

module.exports = createDBConnection();
