var model_missions = require('../models/model_missions');
var model_communes = require('../models/model_communes');
var model_distances = require('../models/model_distances');
var model_params = require('../models/model_params');
module.exports = {
    // affichage accueil
    afficher: function (req, res) {
        if (req.session.user_info !== undefined) { // si connecte
            titre = "Remboursement des missions";
            model_missions.lister(function (lesMissions) {

                for (i in lesMissions) {
                    agence = lesMissions[i].sal_idAgence
                    console.log("agence : " + agence)
                    model_communes.communeAgence(agence, function (communeAgence) {
                        lesMissions[i].com_agence_id = communeAgence[0].com_id
                        lesMissions[i].com_agence_nom = communeAgence[0].com_nom

                        if (communeAgence[0].com_id < lesMissions[i].mis_idCom) {
                            com_a = communeAgence[0].com_id
                            com_b = lesMissions[i].mis_idCom
                        } else {
                            com_a = lesMissions[i].mis_idCom
                            com_b = communeAgence[0].com_id
                        }

                        params = [com_a, com_b]

                        model_distances.ficher(params, function (distance) {
                            if (distance.length) {
                                lesMissions[i].distancier = 1
                                lesMissions[i].distance = distance[0].dis_km
                                model_params.afficher(function (lesParametres) {
                                    lesMissions[i].montantKM = distance[0].dis_km * lesParametres[0].taux
                                    lesMissions[i].montantJour = lesMissions[i].mis_jour * lesParametres[0].indemnite
                                    montantTotal = lesMissions[i].montantKM + lesMissions[i].montantJour
                                    lesMissions[i].montantTotal = montantTotal
                                })
                            } else {
                                lesMissions[i].distancier = 0

                            }
                        })
                    })

                }
                console.log(lesMissions)
                res.render('./remboursement', { titre, valid: req.flash('valid'), erreur: req.flash('erreur'), user_info: req.session.user_info, lesMissions })
            })
        } else {
            res.redirect('./')
        }
    },
    rembourser: function (req, res) {
        if (req.session.user_info !== undefined) { // si connecte
            id = req.params.id

            model_missions.rembourser(id, function (data) {
                req.flash('valid', 'Mission remboursée avec succès');
                res.redirect('../remboursement')
            })
        } else {
            res.redirect('../')
        }
    },
}