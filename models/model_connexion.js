var db = require("../config/database");
module.exports = {
    // page d'accueil
    executer_connexion: function(username, callback){
        var sql = 'SELECT * FROM salaries WHERE sal_id = ?' ;
        db.query(sql, username, function(err,data){
            if(err)throw err;
            return callback(data);
        });
    },
};
