var db = require("../config/database");
module.exports = {
    // page d'accueil
    lister: function (callback) {
        var sql = `SELECT * , 
        DATEDIFF(mis_fin, mis_debut)+1 AS mis_jour, 
        DATE_FORMAT(mis_debut, '%d/%m/%Y') as mis_debut, 
        DATE_FORMAT(mis_fin, '%d/%m/%Y') as mis_fin, 
        cA.com_nom as comA_nom, 
        cB.com_nom as comB_nom 
        FROM missions, salaries, communes as cA, communes as cB 
        WHERE mis_idSal = sal_id 
        AND mis_idSalCom = cA.com_id 
        AND mis_idCom = cB.com_id 
        AND mis_validee = 1;`
        
        var sql2 = `SELECT * , DATEDIFF(mis_fin, mis_debut)+1 AS mis_jour, DATE_FORMAT(mis_debut, '%d/%m/%Y') as mis_debut, DATE_FORMAT(mis_fin, '%d/%m/%Y') as mis_fin, cA.com_nom as comA_nom, cB.com_nom as comB_nom, (((DATEDIFF(mis_fin, mis_debut)+1) * indemnite) + (dis_km * taux)) as montantAPayer FROM missions, salaries, distances, parametres, communes as cA, communes as cB WHERE mis_idSal = sal_id AND mis_idSalCom = cA.com_id AND mis_idCom = cB.com_id AND ((dis_idComA = mis_idSalCom AND dis_idComB = mis_idCom) OR (dis_idComA = mis_idCom AND dis_idComB = mis_idSalCom)) AND mis_validee = 1; `
        db.query(sql, function (err, data) {
            db.query(sql2, function (err, data2) {
                if (err) throw err;
                return callback(data, data2);
            });

        });
    },

    rembourser: function (params, callback) {
        var sql = `UPDATE missions
        SET mis_payee = 1,
        mis_montant = ?
        WHERE mis_id = ?`
        db.query(sql, params, function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },
};
