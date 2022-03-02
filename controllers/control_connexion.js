var model_connexion = require('../models/model_connexion');
module.exports = {
    // affichage accueil
    afficher: function (req, res) {
        titre = "Connexion";
        res.render('./connexion', { titre, valid: req.flash('valid'), erreur: req.flash('erreur') })
    },

    // connexion
    connexion: function (req, res) {
        let username = req.body.identification
        let mdp = req.body.motdepasse

        let params = [username, mdp]
        model_connexion.executer_connexion(params, function (data) {
            if (data.length) {
                req.flash('valid', 'Connexion avec succès');
                res.redirect('./')
            } else {
                req.flash('erreur', 'Mauvais identifiant ou mot de passe');
                res.redirect('./connexion')
            }
        })
    },
}