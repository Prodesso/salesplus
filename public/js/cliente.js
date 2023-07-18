
$(document).on('click', '.nueva-oportunidad', function() {
  let offCanvasElementOP = document.querySelector('#nueva-oportunidad');
  let cliente = $(this).data('nombreCliente')
  let contacto = $(this).data('nombreContacto')
  let titular = $(this).data('titular')
  console.log(titular)
  $("#nombreClienteOP").val(cliente).hide();
  $("#nombreContactoOP").val(contacto).hide();
  $("#titularOP").val(titular).hide();
  let offCanvasElOP = new bootstrap.Offcanvas(offCanvasElementOP);
  // Empty fields on offCanvas open
  (offCanvasElementOP.querySelector('.dt-fields').value = '');
  // Open offCanvas with form
  offCanvasElOP.show();
});
$(document).on('click', '.registrar-seguimiento', function() {
  let offCanvasElementRS = document.querySelector('#addEventSidebar');
  let cliente = $(this).data('nombreCliente')
  let contacto = $(this).data('nombreContacto')
  console.log(this)
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
  let cliente = $(this).data('nombreCliente')
  let contacto = $(this).data('nombreContacto')
  console.log(this)
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
  let cliente = $(this).data('nombreCliente')
  let contacto = $(this).data('nombreContacto')
  console.log(this)
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
$(document).on('click', '.fa-trash', function() {
  id = $(this).data("id")
  $.post('/seguimientoDelete', { id: id },
    function(returnedData) {
    });
  location.reload();
})
const mdl = document.getElementById('ContactoModal');
mdl.addEventListener('show.bs.modal', function(event) {
  $(function() {
    let datas, rO, id
    if (event.relatedTarget != undefined) {
      id = event.relatedTarget.id
      console.log(id)
      datas = $("#" + id).data();
      rO = $("#" + id).data('type');
    } else {
      id = $("#ClienteSelect").val();
      console.log(id)
      datas = $("#" + id).data();
      rO = $("#" + id).data('type');
    }
    if (rO == "readOnly") {
      $("#submitCliente").hide()
    } else {
      $("#submitCliente").show()
      $('#formSubmit').attr('action', $("#" + id).data('url'));
    }
    $.each(datas, function(indexname, value) {
      if (rO == "readOnly" && indexname != "estadoDir" && indexname != "ciudad") {
        if (indexname == "pais" && value != "") {
          $('#' + indexname).val(value).attr("disabled", true);
          cargaEstado(value, $("#" + id).data('estadoDir'), true)
          cargaCiudad(value, $("#" + id).data('estadoDir'), $("#" + id).data('ciudad'), true)
        } else {
          $('#' + indexname).val(value).attr("disabled", true);
        }

      } else if (indexname != "estadoDir" && indexname != "ciudad") {
        if (indexname == "pais" && value != "") {
          $('#' + indexname).val(value).attr("disabled", false);
          cargaEstado(value, $("#" + id).data('estadoDir'), false)
          cargaCiudad(value, $("#" + id).data('estadoDir'), $("#" + id).data('ciudad'), false)
        } else {
          $('#' + indexname).val(value).attr("disabled", false);
        }
      }

    })
  });
});
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
  const phoneMask = document.querySelector('.phone-number-mask'),
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

  $('.dataTables_filter .form-control').removeClass('form-control-sm');
  $('.dataTables_length .form-select').removeClass('form-select-sm');



});
