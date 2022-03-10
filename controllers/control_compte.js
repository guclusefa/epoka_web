var model_compte = require('../models/model_compte');
module.exports = {
    // affichage compte
    afficher: function (req, res) {
        if (req.session.user_info !== undefined) { // si connecte
            titre = "Mon compte";
            model_compte.ficher(req.session.user_info.sal_id, function (data) {
                info = data[0]
                if(info.sal_isResponsable) {
                    info.statue = "Responsable"
                } else if (info.sal_isPersonnel) {
                    info.statue = "Personnel"
                } else {
                    info.statue = "Journaliste"
                }
                res.render('./compte', { titre, valid: req.flash('valid'), erreur: req.flash('erreur'), user_info: req.session.user_info, info })
            })
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect('/')
        }
    },
}