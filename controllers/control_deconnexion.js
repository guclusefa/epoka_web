module.exports = {
    // affichage accueil
    deconnexion: function (req, res) {
        if (req.session.user_info !== undefined) { // si connecte
            delete req.session.user_info
            req.flash('valid', 'Deconnexion avec succès');
        }
        res.redirect('./')
    },
}