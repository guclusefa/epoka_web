var model_distances = require('../models/model_distances');
var model_communes = require('../models/model_communes');

module.exports = {
    // affichage accueil
    afficher: function (req, res) {
        if (req.session.user_info !== undefined) { // si connecte
            titre = "Les distances";
            model_communes.lister(function (lesCommunes) {
                model_distances.lister(function (lesDistances, lesComA, lesComB) {
                    for (i in lesDistances) {
                        lesDistances[i].comA_nom = lesComA[i].com_nom
                        lesDistances[i].comB_nom = lesComB[i].com_nom
                    }
                    console.log(lesDistances)
                    res.render('./distances', { titre, valid: req.flash('valid'), erreur: req.flash('erreur'), user_info: req.session.user_info, lesCommunes, lesDistances })
                })
            })
        } else {
            res.redirect('./')
        }
    },


    ajouter: function (req, res) {
        if (req.session.user_info !== undefined) { // si connecte
            if (req.body.com_a !== req.body.com_b) {
                if (req.body.com_a < req.body.com_b) {
                    com_a = req.body.com_a
                    com_b = req.body.com_b
                } else {
                    com_a = req.body.com_b
                    com_b = req.body.com_a
                }
                let params = [
                    com_a,
                    com_b,
                    km = req.body.km,
                ]

                model_distances.verifier(params.slice(0, 2), function (data) {
                    if (data == '') {
                        model_distances.ajouter(params, function (data) {
                            req.flash('valid', 'Distance ajouté avec succès');
                            res.redirect('./distances')
                        })
                    } else {
                        req.flash('erreur', 'Distance existe déjà !');
                        res.redirect('./distances')
                    }
                })
            } else {
                req.flash('erreur', 'Bien essayé !');
                res.redirect('./distances')
            }
        } else {
            res.redirect('./')
        }
    },
}