/**
 * Selects & Tags
 */

'use strict';

$(function() {
  
  const selectPicker = $('.selectpicker'),
    select2 = $('.select2'),
    select2Icons = $('.select2-icons');

  // Bootstrap Select
  // --------------------------------------------------------------------
  if (selectPicker.length) {
    selectPicker.selectpicker();
  }

  // Select2
  // --------------------------------------------------------------------

  // Default
  if (select2.length) {
    select2.each(function() {
      var $this = $(this);
      $this.wrap('<div class="position-relative"></div>').select2({
        placeholder: 'Selecciona un Filtro',
        dropdownParent: $this.parent()
      });
    });
  }
  $("ul.select2-selection__rendered").sortable({
    containment: 'parent',
    update: function(event, ui) {
      let dim = []
      $('ul.select2-selection__rendered > li').each(function(i) {
        if (this.title != "") {
          dim.push(this.title)
        }
      });
      reportes(dim)
    }
  });
  select2.on('change', function() {
    let dim = []
    $('ul.select2-selection__rendered > li').each(function(i) {
      if (this.title != "") {
        dim.push(this.title)
      }
    });
    reportes(dim)
  })
  // Select2 Icons
  if (select2Icons.length) {
    // custom template to render icons
    function renderIcons(option) {
      if (!option.id) {
        return option.text;
      }
      var $icon = "<i class='" + $(option.element).data('icon') + " me-2'></i>" + option.text;

      return $icon;
    }
    select2Icons.wrap('<div class="position-relative"></div>').select2({
      templateResult: renderIcons,
      templateSelection: renderIcons,
      escapeMarkup: function(es) {
        return es;
      }
    });
  }
});

function reportes(dim) {
    $('#reportes').empty();
    $.each(dim, function(key, val) {
      $("#reportes").append("<div id='"+ val +"' class='col-3'></div>");
    });
    $("#reportes").append("<div id='Cliente' class='col-3'></div>");
if(document.querySelector("#Año")){
        var options = {
          series: [{
          data: [400, 430, 448, 470]
        }],
          chart: {
          type: 'bar',
          width: 380,
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: ['2020', '2021', '2022', '2023'],
        }
        };
        var chart = new ApexCharts(document.querySelector("#Año"), options);
        chart.render();
        }
if(document.querySelector("#Trimestre")){
        var options = {
          series: [{
          data: [300, 320, 330, 350]
        }],
          chart: {
          type: 'bar',
          width: 380,
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: ['T1', 'T2', 'T3', 'T4'],
        }
        };

        var chart = new ApexCharts(document.querySelector("#Trimestre"), options);
        chart.render();
        }
if(document.querySelector("#Mes")){
var options = {
          series: [{
          data: [300, 320, 330, 350,300, 320, 330, 350,300, 320, 330, 350]
        }],
          chart: {
          type: 'bar',
          width: 380,
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: ['ENE', 'FEB', 'MAR', 'ABR','MAY', 'JUN', 'JUL', 'AGO','SEP', 'OCT', 'NOV', 'DIC'],
        }
        };

        var chart = new ApexCharts(document.querySelector("#Mes"), options);
        chart.render();
        }
if(document.querySelector("#Zona")){
var options = {
          series: [{
          data: [300, 320, 330, 350]
        }],
          chart: {
          type: 'bar',
          width: 380,
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: ['CDMX', 'NUEVO LEÓN', 'GUADALAJARA', 'COAHUILA'],
        }
        };

        var chart = new ApexCharts(document.querySelector("#Zona"), options);
        chart.render();
        }
if(document.querySelector("#Vendedor")){
var options = {
          series: [{
          data: [300, 320, 330]
        }],
          chart: {
          type: 'bar',
          width: 380,
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: ['HUGO GZZ', 'DANIEL BARBOSA', 'FRYDA POSADAS'],
        }
        };

        var chart = new ApexCharts(document.querySelector("#Vendedor"), options);
        chart.render();
}
if(document.querySelector("#Cliente")){
      var options = {
          series: [44, 55, 13, 43],
          chart: {
          width: 450,
          type: 'pie',
        },
        labels: ['Contacto no interesado', 'Prospecto poco Interesado', 'Prospecto Interesado', 'Cliente'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
        };

        var chart = new ApexCharts(document.querySelector("#Cliente"), options);
        chart.render();
        }   
  
   
}
