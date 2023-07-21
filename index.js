const express = require("express");
const path = require("path");
const { create } = require("express-handlebars");
var cors = require('cors')
const session = require("express-session");
const app = express();
const port = process.env.PORT || 8080;
app.use(express.static("public"));
var dir = __dirname;
app.set("dir", dir);
app.set("views", path.join(app.get("dir"), "views"));
app.use(cors())
var hbs = create({
	defaultLayout: "main",
	layoutsDir: path.join(app.get("views"), "layouts"),
	partialsDir: path.join(app.get("views"), "partials"),
	extname: ".hbs",
	runtimeOptions: {
		allowProtoPropertiesByDefault: true,
		allowProtoMethodsByDefault: true,
	},
});
app.use(session({
	secret: 'salesPlusCRM',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: true }
}))
app.engine(".hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
	req.session.authenticated = true;
	res.render("login", {
		login: true, title: "LogIn", script: "login.js"
	});
});
app.get("/registro", (req, res) => {
	res.render("registro", {
		login: true, title: "Registro", script: "registro.js"
	});
});
app.get("/recupera", (req, res) => {
	res.render("recupera", {
		login: true, title: "Recupera", script: "recupera.js"
	});
});
app.get("/resetea", (req, res) => {
	res.render("resetea", {
		login: true, title: "Resetea", script: "resetea.js"
	});
});
// sendFile will go here
app.get("/:page", function (req, res) {
	let page = req.params.page;
	res.render(page, {
		main: true, title: page, script: page + ".js"
	});
});
app.listen(port);
console.log("Server started at http://localhost:" + port);
