var db = require("../config/database");
module.exports = {
    // page d'accueil
    lister: function (callback) {
        var sql = "SELECT * FROM communes";
        db.query(sql, function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    verifier: function (params, callback) {
        var sql = 'SELECT com_id FROM communes WHERE com_id = ?';
        db.query(sql, params, function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },

    /* test */
    chercher: function (params, callback) {
        var sql = 'SELECT * FROM communes WHERE com_nom LIKE ?' + '"%"';

        db.query(sql, params, function (err, data) {
            if (err) throw err;
            return callback(data);
        });
    },
};
