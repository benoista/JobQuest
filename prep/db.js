// Connection to mysql database
const mysql = require('mysql2');
//Get .env
require('dotenv').config()

const connection = mysql.createConnection({
  host:  process.env.DB_HOST, //Host
  user:  process.env.DB_USER, //user
  password: process.env.DB_PASS, // password
  port: 3306
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
