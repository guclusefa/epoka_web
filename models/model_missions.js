var db = require("../config/database");
module.exports = {
    // page d'accueil
    lister: function (callback) {
        var sql = `SELECT *, 
        DATEDIFF(mis_fin, mis_debut)+1 AS mis_jour, 
        DATE_FORMAT(mis_debut, '%d/%m/%Y') as mis_debut, 
        DATE_FORMAT(mis_fin, '%d/%m/%Y') as mis_fin, 
        cA.com_nom as comA_nom, 
        cB.com_nom as comB_nom 
        FROM missions, salaries, communes as cA, communes as cB 
        WHERE cA.com_id = mis_idSalCom 
        AND cB.com_id = mis_idCom 
        AND mis_idSal = sal_id;`
        db.query(sql, function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    valider: function (params, callback) {
        var sql = `UPDATE missions
        SET mis_validee = 1
        WHERE mis_id = ?`
        db.query(sql, params, function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },
};
