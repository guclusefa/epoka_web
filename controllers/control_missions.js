var model_missions = require('../models/model_missions');

// que si resonsable
module.exports = {
    // affichage desmissions
    afficher: function (req, res) {
        if (req.session.user_info !== undefined && req.session.user_info.sal_isResponsable == 1) { // si connecte & responsable
            titre = "Validation des missions";
            model_missions.lister(req.session.user_info.sal_id, function (lesMissions) {
                res.render('./missions', { titre, lesMissions })
            })
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect('/')
        }
    },
    // validation des mission
    valider: function (req, res) {
        if (req.session.user_info !== undefined && req.session.user_info.sal_isResponsable == 1) { // si connecte & responsable
            id = req.params.id


            model_missions.lister(req.session.user_info.sal_id, function (lesMissions) {
                // si le responsable a des missions
                if (lesMissions.length > 0) {
                    // verirication
                    // check si mission fait parties des mission du respionsable
                    // check si mission deja validé ou non
                    verif = false
                    verif_a_validee = true
                    lesMissions.forEach(element => {
                        if (element.mis_id == id) {
                            verif = true
                            if (element.mis_validee == 1) verif_a_validee = false
                        }
                    });

                    // si mission id est une mission de notre subordonee
                    if (verif) {
                        // si mission n'ezst pas déjà validé
                        if (verif_a_validee) {
                            model_missions.valider(id, function (data) {
                                req.flash('valid', 'Mission validé avec succès');
                                res.redirect('../missions')
                            })
                        } else {
                            req.flash('erreur', 'Mission déjà validé');
                            res.redirect('../missions')
                        }
                    } else {
                        req.flash('erreur', 'Pas autorisé a validé cette mission');
                        res.redirect('../missions')
                    }
                } else {
                    req.flash('erreur', 'Vous n\'avez aucune mission à valider');
                    res.redirect('../missions')
                }
            })

        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect('../')
        }
    },
}