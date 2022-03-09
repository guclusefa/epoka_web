var db = require("../config/database");
module.exports = {
    // page d'accueil
    afficher: function (callback) {
        var sql = "SELECT * FROM parametres";
        db.query(sql, function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    modifier: function(params, callback){
        var sql = 'UPDATE parametres SET indemnite = ?, taux = ?' ;
        db.query(sql, params, function(err,data){
            if(err)throw err;
            return callback(data);
        });
    },
};
