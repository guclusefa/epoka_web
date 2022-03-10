var model_remboursement = require('../models/model_remboursement');
var model_params = require('../models/model_params');

module.exports = {
    // affichage accueil
    afficher: function (req, res) {
        if (req.session.user_info !== undefined) { // si connecte
            titre = "Remboursement des missions";
            model_remboursement.lister(function (lesMissionsTotal, lesMissions, lesComA, lesComB) {
                for (i in lesMissionsTotal) {
                    lesMissionsTotal[i].comA_nom = lesComA[i].com_nom
                    lesMissionsTotal[i].comB_nom = lesComB[i].com_nom
                }

                for (i in lesMissionsTotal) {
                    for (j in lesMissions) {
                        if (lesMissions[j].mis_id == lesMissionsTotal[i].mis_id) {
                            lesMissionsTotal[i].dis_km = lesMissions[j].dis_km
                        }
                    }
                }

                model_params.afficher(function (lesParams) {
                    lesMissionsTotal.forEach(element => {
                        element.montantAPayer = (element.mis_jour * lesParams[0].indemnite) + (element.dis_km * lesParams[0].taux)
                    });
                    console.log(lesMissionsTotal)
                    res.render('./remboursement', { titre, valid: req.flash('valid'), erreur: req.flash('erreur'), user_info: req.session.user_info, lesMissions: lesMissionsTotal })
                })
            })
        } else {
            res.redirect('./')
        }
    },

    rembourser: function (req, res) {
        if (req.session.user_info !== undefined) { // si connecte
            let params = [
            montant = req.params.montant,
            id = req.params.id
            ]

            model_remboursement.rembourser(params, function (data) {
                req.flash('valid', 'Mission remboursée avec succès');
                res.redirect('/remboursement')
            })
        } else {
            res.redirect('../')
        }
    },
}