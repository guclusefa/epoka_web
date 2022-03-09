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
};
