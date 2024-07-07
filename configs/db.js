const mysql=require('mysql2');

const database= mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'nem104_b37'
})
module.exports=database;