var db = require("../config/database");
module.exports = {
    // page d'accueil
    lister: function (callback) {
        var sql =`SELECT *,
        DATEDIFF(mis_fin, mis_debut)+1 AS mis_jour,
        DATE_FORMAT(mis_debut, '%d/%m/%Y') as mis_debut,
        DATE_FORMAT(mis_fin, '%d/%m/%Y') as mis_fin
        FROM missions, salaries, communes
        WHERE mis_idSal = sal_id
        AND mis_idCom = com_id` 
        db.query(sql, function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    distancier: function (callback) {
        var sql =`SELECT * FROM distances
        WHERE dis_idComA = ?
        AND dis_idComB = ?` 
        db.query(sql, function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    valider: function (params, callback) {
        var sql =`UPDATE missions
        SET mis_validee = 1
        WHERE mis_id = ?` 
        db.query(sql, params, function(err,data){
            if(err)throw err;
            return callback(data);
        });
    },

    rembourser: function (params, callback) {
        var sql =`UPDATE missions
        SET mis_payee = 1
        WHERE mis_id = ?` 
        db.query(sql, params, function(err,data){
            if(err)throw err;
            return callback(data);
        });
    },
};
