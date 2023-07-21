socket.emit("Session")
socket.on("userAuth", (data) => {
    console.log('here')
    $("#usuario").text(data.nombrecompleto)
    $("#venta").text(data.venta)
    $("#meta").text(data.meta)
});