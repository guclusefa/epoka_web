module.exports = {
    // affichage accueil
    deconnexion: function (req, res) {
        delete req.session.user_info
        req.flash('valid', 'Deconnexion avec succès');
        res.redirect('./')
    },
}