var model_accueil = require('../models/model_accueil');
module.exports = {
    // affichage accueil
    afficher: function (req, res) {
        titre = "Accueil";
        res.render('./accueil', { titre, valid: req.flash('valid'), erreur: req.flash('erreur'), user_info: req.session.user_info })
    },
}