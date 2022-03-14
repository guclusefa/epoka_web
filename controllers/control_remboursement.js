var model_remboursement = require('../models/model_remboursement');

module.exports = {
    // affichage remboursement
    afficher: function (req, res) {
        if (req.session.user_info !== undefined && req.session.user_info.sal_isPersonnel == 1) { // si connecte
            titre = "Remboursement des missions";

            model_remboursement.lister(function (lesMissionsTotal, lesMissions) {
                // toute les missions + les missions ou une distance est connue
                for (i in lesMissionsTotal) {
                    for (j in lesMissions) {
                        if (lesMissions[j].mis_id == lesMissionsTotal[i].mis_id) {
                            lesMissionsTotal[i].dis_km = lesMissions[j].dis_km
                            lesMissionsTotal[i].montantAPayer= lesMissions[j].montantAPayer
                        }
                    }
                }
                lesMissions = lesMissionsTotal
                res.render('./remboursement', { titre, lesMissions })
            })
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect('/')
        }
    },

    // remboursement
    rembourser: function (req, res) {
        if (req.session.user_info !== undefined && req.session.user_info.sal_isPersonnel == 1) { // si connecte
            let params = [
                montant = req.params.montant,
                id = req.params.id
            ]

            model_remboursement.rembourser(params, function (data) {
                req.flash('valid', 'Mission remboursée avec succès');
                res.redirect('/remboursement')
            })
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect('/')
        }
    },
}