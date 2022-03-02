// création du routeur Express pour ce module
const express = require('express');
const routeur = express.Router();

// exporter controllers
var control_accueil = require('../controllers/control_accueil')
var control_connexion = require('../controllers/control_connexion')
var control_missions = require('../controllers/control_missions')
var control_distances = require('../controllers/control_distances')
var control_params = require('../controllers/control_params')
var control_compte = require('../controllers/control_compte')


// routage accueil
routeur.get('/', control_accueil.afficher)

// connexion
routeur.get('/connexion', control_connexion.afficher)
routeur.post('/connexion', control_connexion.connexion)

// missions
routeur.get('/missions', control_missions.afficher)

// missions
routeur.get('/distances', control_distances.afficher)

// missions
routeur.get('/params', control_params.afficher)

// missions
routeur.get('/compte', control_compte.afficher)


// routeur
module.exports = routeur;