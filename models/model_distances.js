var db = require("../config/database");
module.exports = {
    // page d'accueil
    lister: function (callback) {
        var sql =`SELECT * FROM distances ORDER BY dis_id` 
        var sqlComA =`SELECT * FROM distances, communes WHERE com_id = dis_idComA ORDER BY dis_id` 
        var sqlComB =`SELECT * FROM distances, communes WHERE com_id = dis_idComB ORDER BY dis_id` 
        db.query(sql, function (err, data) {
            if (err) throw err;
            db.query(sqlComA, function (err, data2) {
                if (err) throw err;
                db.query(sqlComB, function (err, data3) {
                    if (err) throw err;
                    return callback(data, data2, data3);
                });
            });
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
};
