var model_compte = require('../models/model_compte');
module.exports = {
    // affichage compte
    afficher: function (req, res) {
        if (req.session.user_info !== undefined) { // si connecte
            titre = "Mon compte";
            res.render('./compte', { titre, valid: req.flash('valid'), erreur: req.flash('erreur'), user_info: req.session.user_info })
        } else {
            res.redirect('./')
        }
    },
}