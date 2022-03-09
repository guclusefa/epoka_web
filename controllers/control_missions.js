var model_missions = require('../models/model_missions');
module.exports = {
    // affichage accueil
    afficher: function (req, res) {
        if (req.session.user_info !== undefined) { // si connecte
            titre = "Validation des missions";
            model_missions.lister(function (lesMissions, lesLieux) {
                res.render('./missions', { titre, valid: req.flash('valid'), erreur: req.flash('erreur'), user_info: req.session.user_info, lesMissions })
            })
        } else {
            res.redirect('./')
        }
    },
    valider: function (req, res) {
        if (req.session.user_info !== undefined) { // si connecte
            id = req.params.id

            model_missions.valider(id, function (data) {
                req.flash('valid', 'Mission validé avec succès');
                res.redirect('../missions')
            })
        } else {
            res.redirect('../')
        }
    },
}