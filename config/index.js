const mysql= require('mysql2');

const connection= mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mino1234',
    database: 'todos_db',
}).promise();

module.exports = connection; 

//connect our server with database