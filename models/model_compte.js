var db = require("../config/database");
module.exports = {
    // page d'accueil
    ficher: function (params, callback) {
        var sql = "SELECT * FROM salaries, agences, communes WHERE sal_idAgence = age_id AND age_idCom = com_id AND sal_id = ?";
        db.query(sql, params, function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },
};
