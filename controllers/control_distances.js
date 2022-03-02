var model_distances = require('../models/model_distances');
module.exports = {
    // affichage accueil
    afficher: function (req, res) {
        titre = "Les distances";
        res.render('./distances', { titre, valid: req.flash('valid'), erreur: req.flash('erreur') })
    },
}