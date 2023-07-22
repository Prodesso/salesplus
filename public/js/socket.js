var socket = io.connect("https://salesplusapi.danielbarbosa34.repl.co", {
	withCredentials: true,
	transports: ["websocket"]
});
socket.on("connect", () => {
	socket.on("disconnect", () => {
		location.href = "./";
	});
	socket.on("toastr", (data) => {
		showToast(data.type, data.message)
	});
})


