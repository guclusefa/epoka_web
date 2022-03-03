var model_params = require('../models/model_params');
module.exports = {
    // affichage accueil
    afficher: function (req, res) {
        if (req.session.user_info !== undefined) { // si connecte
            titre = "Les parametres";
            res.render('./params', { titre, valid: req.flash('valid'), erreur: req.flash('erreur'), user_info: req.session.user_info })
        } else {
            res.redirect('./')
        }
    },
}