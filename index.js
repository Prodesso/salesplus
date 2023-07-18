const express = require("express");
const path = require("path");
const { create } = require("express-handlebars");
var cors = require('cors')

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
app.engine(".hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");



app.get("/", (req, res) => {
	res.redirect("/login");
});
app.get("/login", (req, res) => {
	res.render("login", { layout: "login" });
});
app.get("/registro", (req, res) => {
	res.render("registro", { layout: "login" });
});
app.get("/recupera", (req, res) => {
	res.render("recupera", { layout: "login" });
});
app.get("/resetea", (req, res) => {
	res.render("resetea", { layout: "login" });
});
app.get("/home", function(req, res) {
	res.redirect("/dashboard");
});
// sendFile will go here
app.get("/:page", function(req, res) {
	let page = req.params.page;
	res.render(page);
});
app.listen(port);
console.log("Server started at http://localhost:" + port);
