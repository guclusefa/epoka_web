var model_distances = require('../models/model_distances');
module.exports = {
    // affichage accueil
    afficher: function (req, res) {
        if (req.session.user_info !== undefined) { // si connecte
            titre = "Les distances";
            res.render('./distances', { titre, valid: req.flash('valid'), erreur: req.flash('erreur'), user_info: req.session.user_info })
        } else {
            res.redirect('./')
        }
    },
}