require('dotenv').config();
const mysql = require('mysql');

const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;

const connection = mysql.createConnection({
    host: host,
    port: port,
    user: user,
    password: password,
    database: database
});
  

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database with threadId: ' + connection.threadId);
});

module.exports = connection;