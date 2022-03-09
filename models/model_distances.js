var db = require("../config/database");
module.exports = {
    // page d'accueil
    lister: function (callback) {
        var sql =`SELECT * FROM distances` 
        db.query(sql, function (err, data) {
            if (err) throw err;
            for (i in data) {
                coma = data[i].dis_idComA
                comb = data[i].dis_idComB

                sql_coma = `SELECT com_nom FROM communes WHERE com_id = ${coma}` 
                sql_comb = `SELECT com_nom FROM communes WHERE com_id = ${comb}` 

                data[i].dis_nomA = "test"
                data[i].dis_nomB = "test"
            }
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
