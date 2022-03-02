var model_compte = require('../models/model_compte');
module.exports = {
    // affichage compte
    afficher: function (req, res) {
        titre = "Mon compte";
        res.render('./compte', { titre })
    },
}