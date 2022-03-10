var model_missions = require('../models/model_missions');

module.exports = {
    // affichage accueil
    afficher: function (req, res) {
        if (req.session.user_info !== undefined && req.session.user_info.sal_isResponsable == 1) { // si connecte
            titre = "Validation des missions";
            model_missions.lister(function (lesMissions) {
                res.render('./missions', { titre, valid: req.flash('valid'), erreur: req.flash('erreur'), user_info: req.session.user_info, lesMissions })
            })
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect('/')
        }
    },
    valider: function (req, res) {
        if (req.session.user_info !== undefined && req.session.user_info.sal_isResponsable == 1) { // si connecte
            id = req.params.id

            model_missions.valider(id, function (data) {
                req.flash('valid', 'Mission validé avec succès');
                res.redirect('../missions')
            })
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect('../')
        }
    },
}