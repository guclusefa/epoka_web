var model_connexion = require('../models/model_connexion');
module.exports = {
    // affichage accueil
    afficher: function (req, res) {
        titre = "Connexion";
        res.render('./connexion', { titre })
    },

    // connexion
    connexion: function (req, res) {
        let username = req.body.identification
        let mdp = req.body.motdepasse

        model_connexion.executer_connexion(username, mdp, function (data) {
            console.log(data)
            res.redirect('./connexion')
        })
    },
}