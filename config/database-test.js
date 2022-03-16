var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'mysql-epoka.alwaysdata.net',
    user: 'epoka', 
    password: 'Epoka2022*',  
    database: 'epoka_db' 
});
conn.connect(function (err) {
    if (err) throw err;
    console.log('BDD connecté avec succès !');
});
module.exports = conn;