var model_missions = require('../models/model_missions');
module.exports = {
    // affichage accueil
    afficher: function (req, res) {
        titre = "Les missions";
        res.render('./missions', { titre, valid: req.flash('valid'), erreur: req.flash('erreur') })
    },
}