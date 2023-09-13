$("#entrar").on("click", function() {
	let email = $("#email").val()
	let pass = $("#password").val()
	let jsonObject = { email: email, password: pass }
	socket.emit("login", jsonObject)
	socket.on("auth", () => {
		location.href = "dashboard";
	});
});