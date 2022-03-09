var db = require("../config/database");
module.exports = {
    // page d'accueil
    lister: function (callback) {
        var sql =`SELECT * FROM distances` 
        db.query(sql, function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    ajouter: function(params, callback){
        var sql = 'INSERT INTO distances (dis_idComA, dis_idComB, dis_km) VALUES (?,?,?)' ;
        db.query(sql, params, function(err,data){
            if(err)throw err;
            return callback(data);
        });
    },

    verifier: function(params, callback){
        var sql = 'SELECT * FROM distances WHERE dis_idComA = ? AND dis_idComB = ?' ;
        db.query(sql, params, function(err,data){
            if(err)throw err;
            return callback(data);
        });
    },

    ficher: function(params, callback){
        var sql = 'SELECT * FROM distances WHERE dis_idComA = ? AND dis_idComB = ?' ;
        db.query(sql, params, function(err,data){
            if(err)throw err;
            return callback(data);
        });
    },
};
