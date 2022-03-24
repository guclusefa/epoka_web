var model_remboursement = require('../models/model_remboursement');

// que si un personnel
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
                            lesMissionsTotal[i].montantAPayer = lesMissions[j].montantAPayer
                        }
                    }
                }
                lesMissions = lesMissionsTotal
                console.log(lesMissions)
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

            model_remboursement.lister(function (lesMissionsTotal, lesMissions) {
                if (lesMissions.length > 0) {
                    // verification
                    verif = false
                    verif_a_payee = true
                    lesMissions.forEach(element => {
                        if (element.mis_id == id) {
                            verif = true
                            if (element.mis_payee == 1) verif_a_payee = false
                        }
                    });

                    model_remboursement.getRemboursementMontant(req.params.id, function (montantRemboursement) {
                        // si le montant est le montant a rembourser
                        if (req.params.montant == montantRemboursement[0].montantAPayer) {
                            // check if mission peut etre payee
                            if (verif) {
                                // check if mission n'est pas deja paye
                                if (verif_a_payee) {
                                    model_remboursement.rembourser(params, function (data) {
                                        req.flash('valid', 'Mission remboursée avec succès');
                                        res.redirect('/remboursement')
                                    })
                                } else {
                                    req.flash('erreur', 'Cette mission est déjà remboursée');
                                    res.redirect('/remboursement')
                                }
                            } else {
                                req.flash('erreur', 'Cette mission ne peut pas être remboursée pour le moment');
                                res.redirect('/remboursement')
                            }
                        } else {
                            req.flash('erreur', 'Le montant n\'est pas valide !');
                            res.redirect('/remboursement')
                        }
                    })
                } else {
                    req.flash('erreur', 'Aucune mission a remboursé');
                    res.redirect('/remboursement')
                }
            })

        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect('/')
        }
    },
}