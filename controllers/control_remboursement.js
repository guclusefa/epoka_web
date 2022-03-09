var model_missions = require('../models/model_missions');
var model_distances = require('../models/model_distances');


module.exports = {
    // affichage accueil
    afficher: function (req, res) {
        if (req.session.user_info !== undefined) { // si connecte
            titre = "Remboursement des missions";
            model_missions.lister(function (lesMissions, lesLieux) {
                res.render('./remboursement', { titre, valid: req.flash('valid'), erreur: req.flash('erreur'), user_info: req.session.user_info, lesMissions })
            })
        } else {
            res.redirect('./')
        }
    },

    rembourser: function (req, res) {
        if (req.session.user_info !== undefined) { // si connecte
            id = req.params.id

            model_missions.rembourser(id, function (data) {
                req.flash('valid', 'Mission remboursée avec succès');
                res.redirect('../remboursement')
            })
        } else {
            res.redirect('../')
        }
    },
}