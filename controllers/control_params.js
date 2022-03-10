var model_params = require('../models/model_params');

module.exports = {
    // affichage accueil
    afficher: function (req, res) {
        if (req.session.user_info !== undefined) { // si connecte
            titre = "Les parametres";
            model_params.afficher(function (data) {
                data = data[0]
                res.render('./params', { titre, valid: req.flash('valid'), erreur: req.flash('erreur'), user_info: req.session.user_info, data })
            })
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect('/')
        }
    },

    modifier: function (req, res) {
        if (req.session.user_info !== undefined) { // si connecte
            let params = [
                indemnite = req.body.indemnite,
                taux = req.body.taux,
            ]
            model_params.modifier(params, function (data) {
                req.flash('valid', 'Parametres modifiés avec succès');
                res.redirect('./params')
            })
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect('/')
        }
    },
}