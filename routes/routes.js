// création du routeur Express pour ce module
const express = require('express');
const routeur = express.Router();

// exporter controllers
var control_accueil = require('../controllers/control_accueil')
var control_connexion = require('../controllers/control_connexion')
var control_missions = require('../controllers/control_missions')
var control_remboursement = require('../controllers/control_remboursement')
var control_distances = require('../controllers/control_distances')
var control_params = require('../controllers/control_params')
var control_compte = require('../controllers/control_compte')

// routage accueil
routeur.get('/', control_accueil.afficher)

// connexion
routeur.get('/connexion', control_connexion.afficher)
routeur.get('/deconnexion', control_connexion.deconnexion)
routeur.post('/connexion', control_connexion.connexion)

// validation
routeur.get('/missions', control_missions.afficher)
routeur.get('/valider/:id', control_missions.valider)

// remboursement
routeur.get('/remboursement', control_remboursement.afficher)
routeur.get('/rembourser/:id/:montant', control_remboursement.rembourser)

// distances
routeur.get('/distances', control_distances.afficher)
routeur.post('/form_distances', control_distances.ajouter)
routeur.get('/chercher/:s', control_distances.chercher) // test

// params
routeur.get('/params', control_params.afficher)
routeur.post('/form_params', control_params.modifier)

// mon compte
routeur.get('/compte', control_compte.afficher)

// 404
routeur.get('*', function (req, res) {
    res.render('404', { titre: 'Erreur 404' })
});

// routeur
module.exports = routeur;