var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '',  
    database: 'epoka_db' 
});
conn.connect(function (err) {
    if (err) throw err;
    console.log('BDD connecté avec succès !');
});
module.exports = conn;
