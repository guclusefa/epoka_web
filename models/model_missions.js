var db = require("../config/database");
module.exports = {
    // page d'accueil
    lister: function (callback) {
        var sql =`SELECT *,
        DATEDIFF(mis_fin, mis_debut)+1 AS mis_jour,
        DATE_FORMAT(mis_debut, '%d/%m/%Y') as mis_debut,
        DATE_FORMAT(mis_fin, '%d/%m/%Y') as mis_fin
        FROM communes, salaries, agences, missions 
        WHERE com_id = age_idCom 
        AND sal_idAgence = age_id 
        AND mis_idSal = sal_id
        ORDER BY mis_id;` 
        var sqlComA =`SELECT * FROM missions, communes WHERE com_id = mis_idSalCom ORDER BY mis_id` 
        var sqlComB =`SELECT * FROM missions, communes WHERE com_id = mis_idCom ORDER BY mis_id` 
        db.query(sql, function (err, data) {
            db.query(sqlComA, function (err, data2) {
                db.query(sqlComB, function (err, data3) {
                    if (err) throw err;
                    return callback(data, data2, data3);
                });
            });
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
};
