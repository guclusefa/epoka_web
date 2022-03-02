// inclure les dépendances et middlewares
const Routeur = require("./routes/routes");
const express = require("express");
const session = require('express-session');
const flash = require('connect-flash');

// activer les dépendances
let app = express();
app.set("view engine", "ejs");
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(session({
	secret:'leCodeSecretFlash',
	saveUninitialized: true,
	resave: true
}));
app.use(function(req, res, next) {
	res.locals = req.session;
	next();
  });
app.use(flash());

//chemins static
app.use(express.static("views"));
app.use("/js", express.static(__dirname + "/assets/js"));
app.use("/css", express.static(__dirname + "/assets/css"));
app.use("/images", express.static(__dirname + "/assets/images"));

app.listen(3000, () => console.log("Le serveur est actif !"));
app.use("/", (Routeur));