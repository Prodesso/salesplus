$("#crear").on("click", function() {
	let nombrecompleto = $("#nombrecompleto").val()
	let pass = $("#password").val()
	let email = $("#email").val()
	let jsonObject = { nombrecompleto: nombrecompleto, email: email, password: pass, idOrganizacion: "0", usuarioCreador: "0" }
	socket.emit("Registra", jsonObject)

})
socket.on("usuarioC", (n) => {
	console.log(n)
	socket.emit("usuarioC", n)
});
socket.on("Creado", (n) => {
	console.log(n)
	socket.emit("CorreoActivacion", n)
});
