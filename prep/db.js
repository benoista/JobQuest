// Connection to mysql database
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '127.0.0.1', //Host
  user: 'root', //user
  password: '', // password
  database: 'jobboard', // Database name
});

// Error check
connection.connect((err) => {
  if (err) {
    console.error('Error no connection to Mysql :', err.stack);
    return;
  }
  console.log('Connected to Mysql');
});

module.exports = connection;
