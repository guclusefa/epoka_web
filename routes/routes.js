// création du routeur Express pour ce module
const express = require('express');
const routeur = express.Router();

// exporter controllers
var control_accueil = require('../controllers/control_accueil')
var control_connexion = require('../controllers/control_connexion')
var control_deconnexion = require('../controllers/control_deconnexion')
var control_missions = require('../controllers/control_missions')
var control_distances = require('../controllers/control_distances')
var control_params = require('../controllers/control_params')
var control_compte = require('../controllers/control_compte')


// routage accueil
routeur.get('/', control_accueil.afficher)

// connexion
routeur.get('/connexion', control_connexion.afficher)
routeur.post('/connexion', control_connexion.connexion)
routeur.get('/deconnexion', control_deconnexion.deconnexion)

// missions
routeur.get('/missions', control_missions.afficher)
routeur.get('/valider/:id', control_missions.valider)

// missions
routeur.get('/distances', control_distances.afficher)
routeur.post('/form_distances', control_distances.ajouter)

// missions
routeur.get('/params', control_params.afficher)
routeur.post('/form_params', control_params.modifier)

// missions
routeur.get('/compte', control_compte.afficher)


// routeur
module.exports = routeur;