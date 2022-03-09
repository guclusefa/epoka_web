var model_connexion = require('../models/model_connexion');
module.exports = {

    // affichage accueil
    afficher: function (req, res) {
        if (req.session.user_info == undefined) { // si pas connecte
            titre = "Connexion";
            res.render('./connexion', { titre, valid: req.flash('valid'), erreur: req.flash('erreur'), user_info: req.session.user_info })
        } else {
            res.redirect('./')
        }
    },

    // connexion
    connexion: function (req, res) {
        if (req.session.user_info == undefined) {
            let username = req.body.identification
            let mdp = req.body.motdepasse

            let params = [username, mdp]
            model_connexion.executer_connexion(params, function (data) {
                if (data.length) {
                    req.session.user_info = data[0]
                    req.flash('valid', 'Connexion avec succès');
                    res.redirect('./')
                } else {
                    req.flash('erreur', 'Mauvais identifiant ou mot de passe');
                    res.redirect('./connexion')
                }
            })
        } else {
            res.redirect('./')
        }
    },

    deconnexion: function (req, res) {
        if (req.session.user_info !== undefined) { // si connecte
            delete req.session.user_info
            req.flash('valid', 'Deconnexion avec succès');
        }
        res.redirect('./')
    },
}