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
const sessionMiddleware = session({
  secret: "SalesPlusCrm",
  resave: true,
  saveUninitialized: true
});
app.use(sessionMiddleware);
app.engine(".hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

var crypto = require('crypto');
// Defining algorithm
const algorithm = 'aes-256-cbc';
// Defining key
const key = crypto.randomBytes(32);
// Defining iv
const iv = crypto.randomBytes(16);
// An encrypt function
function decrypt(text) {
	let iv = Buffer.from(text.iv, 'hex');
	let encryptedText =
		Buffer.from(text.encryptedData, 'hex');
	// Creating Decipher
	let key = Buffer.from(text.key, 'hex')
	let decipher = crypto.createDecipheriv(
		'aes-256-cbc', key, iv);
	// Updating encrypted text
	let decrypted = decipher.update(encryptedText);
	decrypted = Buffer.concat([decrypted, decipher.final()]);
	// returns data after decryption
	return decrypted.toString();
}
function encrypt(text) {
	// Creating Cipheriv with its parameter
	let cipher = crypto.createCipheriv(
		'aes-256-cbc', Buffer.from(key), iv);
	// Updating text
	let encrypted = cipher.update(text);
	// Using concatenation
	encrypted = Buffer.concat([encrypted, cipher.final()]);
	// Returning iv and encrypted data
	const res = {
		iv: iv.toString('hex'),
		key: key.toString('hex'),
		encryptedData: encrypted.toString('hex')
	};
	const url = new URLSearchParams(res).toString();
	return url
}
app.get("/", (req, res) => {
	req.session.authenticated = true;
	console.log(req.sessionID)
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
app.get('/activacion', async (req, res) => {
	let iv = req.query.iv
	let key = req.query.key
	let encryptedData = req.query.encryptedData
	let input = {
		iv: iv,
		key: key,
		encryptedData: encryptedData
	}
	let email = decrypt(input)
	res.render("activacion", {email,login: true, title: 'Activacion', script:"activacion.js"})
})
// sendFile will go here
app.get("/:page", function (req, res) {
	console.log(req.session.authenticated)
	let page = req.params.page;
	res.render(page, {
		main: true, title: page, script: page + ".js"
	});
});
app.listen(port);
console.log("Server started at http://localhost:" + port);
