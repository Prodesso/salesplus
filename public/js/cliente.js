let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

$(document).on('click', '.nueva-oportunidad', function() {
	let offCanvasElementOP = document.querySelector('#nueva-oportunidad');
	let offCanvasElOP = new bootstrap.Offcanvas(offCanvasElementOP);
	// Empty fields on offCanvas open
	(offCanvasElementOP.querySelector('.dt-fields').value = '');
	// Open offCanvas with form
	offCanvasElOP.show();
});
$(document).on('click', '.registrar-seguimiento', function() {
	let offCanvasElementRS = document.querySelector('#addEventSidebar');
	let cliente = $(this).data('id')
	console.log(cliente)
	$("#nombreClienteRS").val(cliente).hide();
	$("#nombreContactoRS").val(contacto).hide();

	let offCanvasElRS = new bootstrap.Offcanvas(offCanvasElementRS);
	// Empty fields on offCanvas open
	// Open offCanvas with form
	console.log('RS')
	offCanvasElRS.show();
});
$(document).on('click', '.agregar-nota', function() {
	let offCanvasElementAN = document.querySelector('#agregar-nota');
	let cliente = $(this).data('id')
	console.log(cliente)
	$("#nombreClienteAN").val(cliente).hide();
	$("#nombreContactoAN").val(contacto).hide();

	let offCanvasElAN = new bootstrap.Offcanvas(offCanvasElementAN);
	// Empty fields on offCanvas open
	// Open offCanvas with form
	console.log('AN')
	offCanvasElAN.show();
});
$(document).on('click', '.enviar-mensaje', function() {
	let offCanvasElementEM = document.querySelector('#enviar-mensaje');
	let cliente = $(this).data('id')
	console.log(cliente)
	$("#nombreClienteEM").val(cliente).hide();
	$("#nombreContactoEM").val(contacto).hide();

	let offCanvasElEM = new bootstrap.Offcanvas(offCanvasElementEM);
	// Empty fields on offCanvas open

	// Open offCanvas with form
	console.log('EM')
	offCanvasElEM.show();
});
$(function() {
	$.get("https://countriesnow.space/api/v0.1/countries/positions", function(res) {
		var paises = res.data
		console.log('A')
		$('#pais').empty()
		$('#pais').append('<option value="SELECT">--SELECCIONA UN PAIS--</option>');
		for (var i = 0; i < paises.length; i++) {
			$('#pais').append('<option value="' + paises[i].name + '">' + paises[i].name + '</option>');
		}
	});
	$("#pais").change(function() {
		cargaEstado(null, null, null)
	});
	$("#estadoDir").change(function() {
		cargaCiudad(null, null, null, null)
	});
})
function cargaEstado(pais, estado, dis) {
	if (pais == null) {
		pais = $('#pais').val()
	}
	$.ajax({
		url: "https://countriesnow.space/api/v0.1/countries/states",
		type: 'POST',
		dataType: 'json',
		contentType: 'application/json',
		processData: false,
		data: '{"country": "' + pais + '"}',
		success: function(res) {
			$('#estadoDir').empty()
			$('#estadoDir').append('<option value="SELECT">--SELECCIONA UN ESTADO--</option>');
			var estados = res.data.states
			for (var j = 0; j < estados.length; j++) {
				$('#estadoDir').append('<option value="' + estados[j].name + '">' + estados[j].name + '</option>');
			}
			if (estado != null) {
				$('#estadoDir').val(estado).attr('disabled', dis)
			}
		},
		error: function() {
			alert("Cannot get data");
		}
	})
}
function cargaCiudad(pais, estado, ciudad, dis) {
	if (pais == null) {
		pais = $('#pais').val()
	}
	if (estado == null) {
		estado = $('#estadoDir').val()
	}
	$.ajax({
		url: "https://countriesnow.space/api/v0.1/countries/state/cities",
		type: 'POST',
		dataType: 'json',
		contentType: 'application/json',
		processData: false,
		data: '{"country": "' + pais + '", "state":"' + estado + '"}',
		success: function(res) {
			$('#ciudad').empty()
			$('#ciudad').append('<option value="SELECT">--SELECCIONA UNA CIUDAD--</option>');
			var ciudades = res.data
			for (var j = 0; j < ciudades.length; j++) {
				$('#ciudad').append('<option value="' + ciudades[j] + '">' + ciudades[j] + '</option>');
			}
			if (ciudad != null) {
				$('#ciudad').val(ciudad).attr('disabled', dis)
			}
		},
		error: function() {
			alert("Cannot get data");
		}
	})

}
function validator(object, value) {
	console.log('Entre')
	return Object.keys(object).filter(key => object[key] === value);
}
$(document).on('click', '.btnD', function() {
	id = $(this).data("bs-id")
	console.log(id)
	Swal.fire({
		title: '¿Estas seguro de Eliminar el Cliente?',
		text: "No podra revertirse!",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Borrar!'
	}).then((result) => {
		if (result.isConfirmed) {
			socket.emit("clienteD", id)
		}
	})

})
$(function() {
	var urlParams = new URLSearchParams(window.location.search); //get all parameters
	var id = urlParams.get('id'); //extract the foo parameter - this will return NULL if foo isn't a parameter
	if (id) { //check if foo parameter is set to anything
		$('#ClienteSelect').val("e" + id)
		$('#ContactoModal').modal('show');
	}
	const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
	tooltipTriggerList.map(function(tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl);
	});
	const phoneMask1 = document.querySelector('.phone-number-mask1'),
		whatsappMask1 = document.querySelector('.whatsapp-number-mask1'),
		phoneMask = document.querySelector('.phone-number-mask'),
		whatsappMask = document.querySelector('.whatsapp-number-mask'),
		numeralMask = document.querySelector('.numeral-mask')
	// Phone Number
	if (phoneMask) {
		new Cleave(phoneMask, {
			phone: true,
			phoneRegionCode: 'US'
		});
	}
	if (whatsappMask) {
		new Cleave(whatsappMask, {
			phone: true,
			phoneRegionCode: 'US'
		});
	}
	if (phoneMask1) {
		new Cleave(phoneMask1, {
			phone: true,
			phoneRegionCode: 'US'
		});
	}
	if (whatsappMask1) {
		new Cleave(whatsappMask1, {
			phone: true,
			phoneRegionCode: 'US'
		});
	}

	$('.dataTables_filter .form-control').removeClass('form-control-sm');
	$('.dataTables_length .form-select').removeClass('form-select-sm');



});
$('#ContactoModal').on('shown.bs.modal', function(e) {
	moment.locale("es-mx");         // es-mx
	var link = $(e.relatedTarget) // Button that triggered the modal
	var id = link.data('bs-id')
	console.log(id)// Extract info from data-* attributes
	socket.emit('clienteR', id);
	$("#saveCliente").attr("data-bs-id", id)
	socket.on('clienteR', function(d) {
		//Datos del Contacto
		$("#nombreContacto").val(d.nombrecontacto)
		$("#puestoContacto").val(d.puesto)
		$("#eMailContacto").val(d.email)
		$("#telefonoContacto").val(d.telefono)
		$("#whatsappContacto").val(d.whatsapp)
		$("#nombreCliente").val(d.empresa)
		$("#estatus").val(d.estatus)
		$("#fuente").val(d.fuente)
		$("#vendedor").val(d.vendedor)
		//Direccion
		$("#calle").val(d.calle)
		$("#numero").val(d.numero)
		$("#codigoPostal").val(d.codigopostal)
		$("#pais").val(d.pais)
		if (d.pais != null) {
			cargaEstado(d.pais, d.estado, false)
		}
		if (d.estado != null) {
			cargaCiudad(d.pais, d.estado, d.ciudad, false)
		}
		//Datos de la Empresa
		$("#giro").val(d.giro)
		$("#paginaWeb").val(d.pagina)
		$("#rfcCliente").val(d.rfc)
		$("#razonSocial").val(d.razonsocial)
		$("#empleados").val(d.numeroempleado)
		$("#facebook").val(d.facebook)
		$("#instagram").val(d.instagram)
		$("#linkedin").val(d.linkedin)
	})
})
$('#ClienteModal').on('shown.bs.modal', function(e) {
	console.log('Modal')
	moment.locale("es-mx");         // es-mx
	var link = $(e.relatedTarget) // Button that triggered the modal
	var id = link.data('bs-id')
	console.log(id)// Extract info from data-* attributes
	socket.emit('clienteR', id);
	var modal = $(this)
	socket.on('clienteR', function(d) {
		console.log(d)
		id = d._id
		let initials = [...d.empresa.matchAll(rgx)] || [];
		init = ((initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')).toUpperCase();
		let op = "$50,000", ven = "$150,000", per = "$20,000", vendedor = "Hugo Gzz"
		$("#ClientModalInitials").text(init)
		$("#ClientModalinitialsContacto").text(init + "-" + d.empresa)
		$("#ClientModalstatusContacto").text(d.estatus)
		$("#ClientModalpaisContacto").text(d.pais)
		$("#ClientModalstatusContacto2").text(d.estatus)
		$("#ClientModalpaisContacto2").text(d.pais)
		$("#ClientModalfechaContacto").text(d.estatus + " desde " + moment(d.fechaCreacion).format('LL'))
		$("#ClientModalnombreContacto").text(d.nombrecontacto)
		$("#ClientModalpuestoContacto").text(d.puesto)
		$("#ClientModaltelefonoContacto").text(d.telefono)
		$("#ClientModalwhatsappContacto").text(d.whatsapp)
		$("#ClientModalemailContacto").text(d.email)
		$("#ClientModalresOportunidades").text(op)
		$("#ClientModalresVentas").text(ven)
		$("#ClientModalresPerdidas").text(per)
	})
})
socket.emit("Session")
socket.on("userAuth", (user) => {
	socket.emit('usuarioRol', "Vendedor");
	socket.on('usuarioRol', function(data) {
		let whiteList = ""
		$.each(data, function(key, value) {
			whiteList = whiteList + value.nombrecompleto + ","
		})
		console.log(whiteList)
		$("#vendedor2").attr("data-whiteList", whiteList)
		$("#vendedor2").attr("data-whiteList", whiteList)
	})
	socket.emit('roles');
	socket.on('roles', function(data) {

	})
	socket.emit('clientes', user._id);
	socket.on('clientes', function(data) {
		let dt_responsive_table = $('.dt-cliente')
		dt_responsive_table.DataTable().clear().destroy();
		$('.dt-cliente tbody').empty()
		$(data).each(function(e, d) {
			if (d._id) {
				id = d._id
				let initials = [...d.empresa.matchAll(rgx)] || [];
				init = ((initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')).toUpperCase();
				let op = "$50,000", ven = "$150,000", per = "$20,000", vendedor = "Hugo Gzz"
				let row = '<tr id="' + id + '"><td><div class="d-flex justify-content-start align-items-center"><div class="avatar-wrapper"><div class="avatar  avatar-md me-2 avatar-primary"><span class="avatar-initial rounded-circle bg-label primary">' +
					init +
					'</span></div></div><div class="d-flex flex-column"><span class="text-truncate"><a href="#" data-bs-toggle="modal" data-bs-target="#ClienteModal" data-bs-id="' + id + '" class="text-body text-truncate fw-semibold">' +
					d.empresa + '</a></span><small class="text-truncate text-muted">' +
					d.puesto + '</small></div></div></td>' +
					'<td><div class="d-flex flex-column"><span class="text-truncate">' +
					d.nombrecontacto + '</span><small class="text-truncate text-muted">' + d.email + '</small></div></td>' +
					'<td><div class="d-flex flex-column"><small class="text-truncate text-muted"><a class=" badge badge-center rounded-pill bg-label-info" href="javascript:void(0);"><i class="bx bx-phone-call me-1"></i></a>' +
					d.telefono +
					'</small><small class="text-truncate text-muted"><a class=" badge badge-center rounded-pill bg-label-success" href="https://wa.me/+521' + d.whatsapp.replace(/\s+/g, '') + '"><i class="bx bxl-whatsapp me-1"></i></a>' +
					d.whatsapp + '</small></div></td>' +
					'<td>' + d.fuente + '</td>' +
					'<td><span class="badge bg-label-' + (d.estatus === "Contacto no calificado" ? "danger" : d.estatus === "Prospecto poco interesado" ? "warning" : d.estatus === "Prospecto interesado" ? "info" : "success") + ' ">' +
					d.estatus + '</span></td>' +
					'<td><div class="d-flex flex-column"><small class="text-truncate text-primary">' +
					op +
					'</small><small class="text-truncate text-success">' +
					ven +
					'</small><small class="text-truncate text-danger">' +
					per +
					'</small></div></td><td>' +
					d.vendedor +
					'</td><td><a data-bs-toggle="modal" data-bs-target="#ContactoModal" class="badge badge-center rounded-pill bg-label-warning"  data-bs-id="' + id + '"><i class="bx bx-edit-alt me-1"></i></a>' +
					'<a href="#" class="btnD badge badge-center rounded-pill bg-label-danger" data-id="' + id + '"><i class="bx bx-trash me-1"></i></a>' +
					'<button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded"></i></button>' +
					'<div class="dropdown-menu">' +
					'<li><a href="#" class="dropdown-item enviar-mensaje" data-id="' + id + '">Enviar Mensaje</a></li>' +
					'<li><a href="#" class="dropdown-item nueva-oportunidad" data-id="' + id + '">Crear Oportunidad</a></li>' +
					'<li><a href="#" class="dropdown-item registrar-seguimiento" data-id="' + id + '">Registrar Seguimiento</a></li>' +
					'<li><a href="#" class="dropdown-item agregar-nota" data-id="' + id + '">Agregar Nota</a></li></div></td></tr>'
				$('.dt-cliente tbody').append(row)
			}
		})
		if (dt_responsive_table.length) {
			var dt_responsive = dt_responsive_table.DataTable({
				language: {
					"decimal": "",
					"emptyTable": "No hay información",
					"info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
					"infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
					"infoFiltered": "(Filtrado de _MAX_ total entradas)",
					"infoPostFix": "",
					"thousands": ",",
					"lengthMenu": "Mostrar _MENU_ Entradas",
					"loadingRecords": "Cargando...",
					"processing": "Procesando...",
					"search": "Buscar:",
					"zeroRecords": "Sin resultados encontrados",
					"paginate": {
						"first": "Primero",
						"last": "Ultimo",
						"next": "Siguiente",
						"previous": "Anterior"
					}
				},
				responsive: {
					details: {
						display: $.fn.dataTable.Responsive.display.modal({
							header: function(row) {
								var data = row.data();
								return 'Detalles';
							}
						}),
						type: 'column',
						renderer: function(api, rowIdx, columns) {
							var data = $.map(columns, function(col, i) {
								return col.title !== 'x' // ? Do not show row in modal popup if title is blank (for check box)
									? '<tr data-dt-row="' +
									col.rowIndex +
									'" data-dt-column="' +
									col.columnIndex +
									'">' +
									'<td>' +
									col.title +
									':' +
									'</td> ' +
									'<td>' +
									col.data +
									'</td>' +
									'</tr>'
									: '';
							}).join('');

							return data ? $('<table class="table"/><tbody />').append(data) : false;
						}
					}
				},
				dom: '<"card-header flex-column flex-md-row"<"head-label text-center"><"dt-action-buttons text-end pt-3 pt-md-0"B>><"row"<"col-sm-12 col-md-6"l><"col-sm-12         col-md-6 d-flex justify-content-center justify-content-md-end"f>>t<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
				buttons: [
					{
						extend: 'collection',
						className: 'btn btn-label-primary dropdown-toggle me-2',
						text: '<i class="bx bx-export me-sm-1"></i> <span class="d-none d-sm-inline-block">Exportar</span>',
						buttons: [
							{
								extend: 'print',
								text: '<i class="bx bx-printer me-1" ></i>Print',
								className: 'dropdown-item',
								exportOptions: {
									columns: [1, 2, 3, 4, 5],
									// prevent avatar to be display
									format: {
										body: function(inner, coldex, rowdex) {
											if (inner.length <= 0) return inner;
											var el = $.parseHTML(inner);
											var result = '';
											$.each(el, function(index, item) {
												if (item.classList !== undefined && item.classList.contains('user-name')) {
													result = result + item.lastChild.firstChild.textContent;
												} else if (item.innerText === undefined) {
													result = result + item.textContent;
												} else result = result + item.innerText;
											});
											return result;
										}
									}
								},
								customize: function(win) {
									//customize print view for dark
									$(win.document.body)
										.css('color', config.colors.headingColor)
										.css('border-color', config.colors.borderColor)
										.css('background-color', config.colors.bodyBg);
									$(win.document.body)
										.find('table')
										.addClass('compact')
										.css('color', 'inherit')
										.css('border-color', 'inherit')
										.css('background-color', 'inherit');
								}
							},
							{
								extend: 'excel',
								text: '<i class="bx bxs-file-export me-1"></i>Excel',
								className: 'dropdown-item',
								exportOptions: {
									columns: [1, 2, 3, 4, 5],
									// prevent avatar to be display
									format: {
										body: function(inner, coldex, rowdex) {
											if (inner.length <= 0) return inner;
											var el = $.parseHTML(inner);
											var result = '';
											$.each(el, function(index, item) {
												if (item.classList !== undefined && item.classList.contains('user-name')) {
													result = result + item.lastChild.firstChild.textContent;
												} else if (item.innerText === undefined) {
													result = result + item.textContent;
												} else result = result + item.innerText;
											});
											return result;
										}
									}
								}
							},
							{
								extend: 'pdf',
								text: '<i class="bx bxs-file-pdf me-1"></i>Pdf',
								className: 'dropdown-item',
								exportOptions: {
									columns: [1, 2, 3, 4, 5],
									// prevent avatar to be display
									format: {
										body: function(inner, coldex, rowdex) {
											if (inner.length <= 0) return inner;
											var el = $.parseHTML(inner);
											var result = '';
											$.each(el, function(index, item) {
												if (item.classList !== undefined && item.classList.contains('user-name')) {
													result = result + item.lastChild.firstChild.textContent;
												} else if (item.innerText === undefined) {
													result = result + item.textContent;
												} else result = result + item.innerText;
											});
											return result;
										}
									}
								}
							},
							{
								extend: 'copy',
								text: '<i class="bx bx-copy me-1" ></i>Copy',
								className: 'dropdown-item',
								exportOptions: {
									columns: [1, 2, 3, 4, 5,],
									// prevent avatar to be display
									format: {
										body: function(inner, coldex, rowdex) {
											if (inner.length <= 0) return inner;
											var el = $.parseHTML(inner);
											var result = '';
											$.each(el, function(index, item) {
												if (item.classList !== undefined && item.classList.contains('user-name')) {
													result = result + item.lastChild.firstChild.textContent;
												} else if (item.innerText === undefined) {
													result = result + item.textContent;
												} else result = result + item.innerText;
											});
											return result;
										}
									}
								}
							}
						]
					},
					{
						text: '<i class="bx bx-plus me-sm-1"></i> <span class="d-none d-sm-inline-block">Agregar</span>',
						className: 'nuevo-contacto btn btn-primary'
					}
				]
			});
		}
		let newRecord = document.querySelector('.nuevo-contacto'),
			offCanvasElement = document.querySelector('#nuevo-contacto')
		if (newRecord) {
			newRecord.addEventListener('click', function() {
				offCanvasEl = new bootstrap.Offcanvas(offCanvasElement);
				// Empty fields on offCanvas open
				(offCanvasElement.querySelector('.dt-fields').value = '');
				// Open offCanvas with form
				offCanvasEl.show();
			});
		}
	});
	$("#clientec").on("click", function() {
		console.log('guarda')
		let nombrecontacto = $("#nombrecontacto2").val();
		let puesto = $("#puesto2").val();
		let email = $("#email2").val();
		let telefono = $("#telefono2").val();
		let whatsapp = $("#whatsapp2").val();
		let empresa = $("#empresa2").val();
		let estado = $("#estatus2").val();
		let fuente = document.querySelector("#fuente2").value;
		let vendedor = $("#vendedor2").val();
		let jsonObject = {
			nombrecontacto: nombrecontacto,
			puesto: puesto,
			email: email,
			telefono: telefono,
			whatsapp: whatsapp,
			empresa: empresa,
			estatus: estado,
			fuente: fuente,
			vendedor: vendedor,
			usuarioCreador: user._id,
			idOrganizacion: user.idOrganizacion
		}
		let valid = validator(jsonObject, "")
		console.log(valid.length)
		if (valid.length == 0) {
			socket.emit('clienteC', jsonObject);
			$("#vendedor2").val()
			$("#nombrecontacto2").val()
			$("#puesto2").val()
			$("#email2").val()
			$("#telefono2").val()
			$("#whatsapp2").val()
			$("#empresa2").val()
			$("#estatus2").val()
			$("#vendedor2").val()
		} else {
			socket.emit("toastr", { type: "error", message: "Favor de llenar todos los Campos requeridos" });
			$.each(valid, function(index, item) {
				$("#nuevo-contacto").offcanvas('show')
				console.log(item)
				$("#" + item + "2").addClass('is-invalid');
			});

		}


	});
	$("#clienteg").on("click", function() {
		console.log(user)
		if ($("#clienteadd").valid()) {   // test for validity
			let nombrecontacto = $("#nombrecontacto2").val();
			let puesto = $("#puesto2").val();
			let email = $("#email2").val();
			let telefono = $("#telefono2").val();
			let whatsapp = $("#whatsapp2").val();
			let empresa = $("#empresa2").val();
			let estado = $("#estatus2").val();
			let fuente = document.querySelector("#fuente2").value;
			let vendedor = $("#vendedor2").val();
			let jsonObject = {
				nombrecontacto: nombrecontacto,
				puesto: puesto,
				email: email,
				telefono: telefono,
				whatsapp: whatsapp,
				empresa: empresa,
				estatus: estado,
				fuente: fuente,
				vendedor: vendedor,
				usuarioCreador: user._id,
				idOrganizacion: user.idOrganizacion
			}
			socket.emit('clienteC', jsonObject);
			$("#vendedor2").val()
			$("#nombrecontacto2").val()
			$("#puesto2").val()
			$("#email2").val()
			$("#telefono2").val()
			$("#whatsapp2").val()
			$("#empresa2").val()
			$("#estatus2").val()
			$("#vendedor2").val()
		} else {
			// do stuff if form is not valid
		}
		socket.emit("Creado", function(data) {
			alert("Creado")
			console.log(data)
			$('#ContactoModal').modal('show');
		});
	});
	$("#saveCliente").on("click", function(e) {
		var id = $("#saveCliente").data('bs-id')
		nombrecontacto = $("#nombreContacto").val()
		puesto = $("#puestoContacto").val()
		email = $("#eMailContacto").val()
		telefono = $("#telefonoContacto").val()
		whatsapp = $("#whatsappContacto").val()
		empresa = $("#nombreCliente").val()
		estatus = $("#estatus").val()
		fuente = $("#fuente").val()
		vendedor = $("#vendedor").val()
		//Direccion
		calle = $("#calle").val()
		numero = $("#numero").val()
		codigopostal = $("#codigoPostal").val()
		pais = $("#pais").val()
		estado = $("#estadoDir").val()
		ciudad = $("#ciudad").val()
		//Datos de la Empresa
		giro = $("#giro").val()
		pagina = $("#paginaWeb").val()
		rfc = $("#rfcCliente").val()
		razonsocial = $("#razonSocial").val()
		numeroempleado = $("#empleados").val()
		facebook = $("#facebook").val()
		instagram = $("#instagram").val()
		linkedin = $("#linkedin").val()
		let jsonObject = {
			_id: id,
			nombrecontacto,
			puesto,
			email,
			telefono,
			whatsapp,
			empresa,
			estatus,
			fuente,
			vendedor,
			calle,
			numero,
			codigopostal,
			pais,
			estado,
			ciudad,
			giro,
			pagina,
			rfc,
			razonsocial,
			numeroempleado,
			facebook,
			instagram,
			linkedin
		}
		console.log(jsonObject)
		socket.emit('clienteU', jsonObject);
		socket.on('clienteU', (data) => {
			socket.emit('clientes', user._id);
		});
		$("#ClienteModal").modal('hide');
	});
	$("#guardarNota").on("click", function() {
		let idCliente = $("#nombreClienteAN").val();
		let Nota = $("#nota").val();
		let Fecha = new Date()
		let jsonObject = {
			tipo: "Nota",
			titulo: "Nota creada el " + Fecha,
			fechainicio: Fecha,
			descripcion: Nota,
			estatus: "Activa",
			fechacierre: Fecha,
			usuarioCreador: user._id,
			idOrganizacion: user.idOrganizacion
		}
		$("#nota").empty();
		$("#nombreClienteAN").empty();
		socket.emit('seguimientoC', jsonObject);

	});
	$("#guardaSeguimiento").on("click", function() {
		let idCliente = $("#nombreClienteRS").val();
		let Titulo = $("#Titulo").val();
		let TipoSeguimiento = $("#TipoSeguimiento").val();
		let FechaInicio = $("#FechaInicio").val();
		let FechaTermino = $("#FechaTermino").val();
		let Descripcion = $("#Descripcion").val();
		let jsonObject = {
			tipo: TipoSeguimiento,
			titulo: Titulo,
			fechainicio: FechaInicio,
			descripcion: Descripcion,
			estatus: "Activa",
			fechacierre: FechaTermino,
			usuarioCreador: user._id,
			idOrganizacion: user.idOrganizacion
		}
		socket.emit('seguimientoC', jsonObject);

	});
});
function timeSeguimiento(data) {
	$.each(data, function(i, item) {
		icono = (item.tipo == "llamada" ? "fa-phone" : (item.tipo == "email" ? "fa-envelope" : (item.tipo == "visita" ? "fa-map-marker" : "fa-comments")))
		clase = (item.status == "Activa" ? "timeline-point-primary" : (item.status == "Vencida" ? "timeline-point-danger" : item.status == "Completa" ? "timeline-point-success" : "timeline-point-secondary"))
		$("#ClientModaltimeline").append('<li class="timeline-item timeline-item-transparent"><span class="timeline-point ' + clase + '"></span>' +
			'<div class="timeline-event"><div class="timeline-header mb-1">' +
			'<h6 class="mb-0"><i class="fas ' + icono + '"></i> ' + item.titulo + '</h6><small class="text-muted"><a href="#" data-bs-toggle="tooltip" data-bs-title="' + item.tooltip + '">' + item.fecha + '</a></small>' +
			'</div><p class="mb-2">' + item.descripcion + '</p></div></li>')
	})
	$("#ClientModaltimeline").append('<li class="timeline-end-indicator"><i class="bx bx-check-circle"></i></li>')
	document.querySelectorAll('[data-bs-toggle="tooltip"]')
		.forEach(tooltip => {
			console.log(tooltip);
			new bootstrap.Tooltip(tooltip)
		})
	const verticalExample = document.getElementById('ClientModaltimelinecard')
	new PerfectScrollbar(verticalExample, {
		wheelPropagation: false
	});

}
$(document).ready(function() {
	$('<script/>', {
		type: 'text/javascript', src:
			'../../assets/js/forms-tagify.js'
	}).appendTo('html');
});
$(document).ready(function() {
	$('<script/>', {
		type: 'text/javascript', src:
			'../../assets/js/form-wizard-numbered.js'
	}).appendTo('html');
});