var model_distances = require('../models/model_distances');
var model_communes = require('../models/model_communes');

module.exports = {
    // affichage accueil
    afficher: function (req, res) {
        if (req.session.user_info !== undefined && req.session.user_info.sal_isPersonnel == 1) { // si connecte
            titre = "Les distances";
            model_communes.lister(function (lesCommunes) {
                model_distances.lister(function (lesDistances) {
                    console.log(lesDistances)
                    res.render('./distances', { titre, lesCommunes, lesDistances })
                })
            })
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect('/')
        }
    },


    ajouter: function (req, res) {
        if (req.session.user_info !== undefined && req.session.user_info.sal_isPersonnel == 1) { // si connecte
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
                req.flash('erreur', 'Entrez deux communes différentes !');
                res.redirect('./distances')
            }
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect('/')
        }
    },
}