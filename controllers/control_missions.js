var model_missions = require('../models/model_missions');
module.exports = {
    // affichage accueil
    afficher: function (req, res) {
        if (req.session.user_info !== undefined) { // si connecte
            titre = "Les missions";
            res.render('./missions', { titre, valid: req.flash('valid'), erreur: req.flash('erreur'), user_info: req.session.user_info })
        } else {
            res.redirect('./')
        }
    },
}