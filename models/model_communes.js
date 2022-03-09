var db = require("../config/database");
module.exports = {
    // page d'accueil
    lister: function (callback) {
        var sql = "SELECT * FROM communes LIMIT 50";
        db.query(sql, function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    communeAgence: function (params, callback) {
        var sql = "SELECT * FROM communes, agences WHERE age_idCom = com_id AND age_id = ?";
        db.query(sql, params, function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    nomCommune: function (params, callback) {
        var sql = "SELECT * FROM communes WHERE com_id = ?";
        db.query(sql, params, function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

};
