// inclure les dépendances et middlewares
const Routeur = require("./routes/routes");
const express = require("express");
const session = require('express-session');
const flash = require('connect-flash');

// activer les dépendances
let app = express();
app.set("view engine", "ejs");

/* bodyparser */
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

/* sessions */
app.use(session({ secret: 'leCodeSecretFlash', saveUninitialized: false, resave: false }));

// les variables qu'on utilse de partout + variables flash
app.use(flash())
app.use(function (req, res, next) {
	valid = req.flash('valid'),
		erreur = req.flash('erreur'),
		user_info = req.session.user_info
	next();
});

//chemins static
app.use(express.static("views"));
app.use("/js", express.static(__dirname + "/assets/js"));
app.use("/css", express.static(__dirname + "/assets/css"));
app.use("/images", express.static(__dirname + "/assets/images"));
app.use("/data", express.static(__dirname + "/assets/data"));

/* port */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Le serveur est actif sur le port : ${PORT}`));

/* routage */
app.use("/", Routeur);