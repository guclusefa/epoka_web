var model_params = require('../models/model_params');
module.exports = {
    // affichage accueil
    afficher: function (req, res) {
        titre = "Les parametres";
        res.render('./params', { titre, valid: req.flash('valid'), erreur: req.flash('erreur') })
    },
}