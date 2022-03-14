var model_connexion = require('../models/model_connexion');
module.exports = {

    // affichage accueil
    afficher: function (req, res) {
        if (req.session.user_info == undefined) { // si pas connecte
            titre = "Connexion";
            res.render('./connexion', { titre })
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect('/')
        }
    },

    // connexion
    connexion: function (req, res) {
        if (req.session.user_info == undefined) { // si pas connecte
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
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect('/')
        }
    },

    // deconexion
    deconnexion: function (req, res) {
        if (req.session.user_info !== undefined) { // si connecte
            delete req.session.user_info
            req.flash('valid', 'Deconnexion avec succès');
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
        }
        res.redirect('/')
    },
}