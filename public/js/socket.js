var socket = io.connect("https://salesplusapi.danielbarbosa34.repl.co", {
	transports: ["websocket"]
});
socket.on("connect",() => {
	socket.on("disconnect", () => {
	location.href = "./login";
});
})


