var model_missions = require('../models/model_missions');

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

            model_missions.valider(id, function (data) {
                req.flash('valid', 'Mission validé avec succès');
                res.redirect('../missions')
            })
        } else {
            req.flash('erreur', "Vous n'êtes pas autorisé");
            res.redirect('../')
        }
    },
}