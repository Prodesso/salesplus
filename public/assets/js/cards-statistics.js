/**
 * Statistics Cards
 */

'use strict';

(function() {
  let cardColor, shadeColor, labelColor, headingColor;

  if (isDarkStyle) {
    cardColor = config.colors_dark.cardColor;
    labelColor = config.colors_dark.textMuted;
    headingColor = config.colors_dark.headingColor;
    shadeColor = 'dark';
  } else {
    cardColor = config.colors.cardColor;
    labelColor = config.colors.textMuted;
    headingColor = config.colors.headingColor;
    shadeColor = '';
  }

  // Donut Chart Colors
  const clientesColors = {
    donut: {
      series1: config.colors.secondary,
      series2: config.colors.info,
      series3: config.colors.primary,
      series4: config.colors.success,
    }
  };
  const colors = {
    success: config.colors.success,
    info: config.colors.info,
    warning: config.colors.warning,
    danger: config.colors.danger,
    primary: config.colors.primary,
    secondary: config.colors.secondary
  }
  // Clientes
  // --------------------------------------------------------------------
  const clientesChartEl = document.querySelector('#clientesChart'),
    clientesChartConfig = {
      chart: {
        height: 120,
        parentHeightOffset: 0,
        type: 'donut'
      },
      labels: ['Contacto no Interesado', 'Prospecto poco interesado', 'Prospecto Interesado', 'Cliente'],
      series: [45, 58, 30, 50],
      colors: [
        clientesColors.donut.series1,
        clientesColors.donut.series2,
        clientesColors.donut.series3,
        clientesColors.donut.series4
      ],
      stroke: {
        width: 0
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      grid: {
        padding: {
          top: 15
        }
      },
      plotOptions: {
        pie: {
          donut: {
            size: '80%',
            labels: {
              show: true,
              value: {
                fontSize: '1rem',
                fontFamily: 'Public Sans',
                color: '#000000',
                fontWeight: 500,
                offsetY: -15
              },
              name: {
                offsetY: 20,
                fontFamily: 'Public Sans'
              },
              total: {
                show: true,
                fontSize: '0.7rem',
                label: 'Contactos',
                color: "#000000"
              }
            }
          }
        }
      }
    };
  if (typeof clientesChartEl !== undefined && clientesChartEl !== null) {
    const clientesChart = new ApexCharts(clientesChartEl, clientesChartConfig);
    clientesChart.render();
  }
  // Oportunidades
  // --------------------------------------------------------------------
  const opChartEl = document.querySelector('#opChart'),
    opChartConfig = {
      chart: {
        height: 120,
        parentHeightOffset: 0,
        type: 'donut'
      },
      labels: ['Fria', 'Caliente', 'Aceptada', 'Ganada', 'Perdida'],
      series: [45, 58, 30, 50, 30],
      colors: [
        colors.info,
        colors.warning,
        colors.primary,
        colors.success,
        colors.danger
      ],
      stroke: {
        width: 0
      },
      dataLabels: {
        enabled: false,
        formatter: function(val, opt) {
          return parseInt(val) + '%';
        }
      },
      legend: {
        show: false
      },
      tooltip: {
        theme: false
      },
      grid: {
        padding: {
          top: 15
        }
      },
      plotOptions: {
        pie: {
          donut: {
            size: '75%',
            labels: {
              show: true,
              value: {
                fontSize: '1rem',
                fontFamily: 'Public Sans',
                color: headingColor,
                fontWeight: 500,
                offsetY: -15,
                formatter: function(val) {
                  return parseInt(val) + '%';
                }
              },
              name: {
                offsetY: 20,
                fontFamily: 'Public Sans'
              },
              total: {
                show: true,
                fontSize: '0.7rem',
                label: 'Mes',
                color: labelColor,
                formatter: function(w) {
                  return '100%';
                }
              }
            }
          }
        }
      }
    };
  if (typeof opChartEl !== undefined && opChartEl !== null) {
    const opChart = new ApexCharts(opChartEl, opChartConfig);
    opChart.render();
  }
  // Seguimiento
  // --------------------------------------------------------------------
  const segChartEl = document.querySelector('#segChart'),
    segChartConfig = {
      chart: {
        height: 120,
        parentHeightOffset: 0,
        type: 'donut'
      },
      labels: ['Sin Iniciar', 'Activa', 'Atrasada', 'Completada'],
      series: [45, 58, 30, 50],
      colors: [
        colors.primary,
        colors.info,
        colors.danger,
        colors.success,
      ],
      stroke: {
        width: 0
      },
      dataLabels: {
        enabled: false,
        formatter: function(val, opt) {
          return parseInt(val) + '%';
        }
      },
      legend: {
        show: false
      },
      tooltip: {
        theme: false
      },
      grid: {
        padding: {
          top: 15
        }
      },
      plotOptions: {
        pie: {
          donut: {
            size: '75%',
            labels: {
              show: true,
              value: {
                fontSize: '1rem',
                fontFamily: 'Public Sans',
                color: headingColor,
                fontWeight: 500,
                offsetY: -15,
                formatter: function(val) {
                  return parseInt(val) + '%';
                }
              },
              name: {
                offsetY: 20,
                fontFamily: 'Public Sans'
              },
              total: {
                show: true,
                fontSize: '0.7rem',
                label: 'Mes',
                color: labelColor,
                formatter: function(w) {
                  return '100%';
                }
              }
            }
          }
        }
      }
    };
  if (typeof segChartEl !== undefined && segChartEl !== null) {
    const segChart = new ApexCharts(segChartEl, segChartConfig);
    segChart.render();
  }
  // Ventas
  // --------------------------------------------------------------------
  const sessionAreaChartEl = document.querySelector('#venChart'),
    sessionAreaChartConfig = {
      chart: {
        height: 120,
        type: 'area',
        toolbar: {
          show: false
        },
        sparkline: {
          enabled: true
        }
      },
      markers: {
        size: 6,
        colors: 'transparent',
        strokeColors: 'transparent',
        strokeWidth: 4,
        discrete: [
          {
            fillColor: config.colors.white,
            seriesIndex: 0,
            dataPointIndex: 8,
            strokeColor: config.colors.success,
            strokeWidth: 2,
            size: 6,
            radius: 8
          }
        ],
        hover: {
          size: 7
        }
      },
      grid: {
        show: false,
        padding: {
          right: 8
        }
      },
      colors: [config.colors.success],
      fill: {
        type: 'gradient',
        gradient: {
          shade: shadeColor,
          shadeIntensity: 0.8,
          opacityFrom: 0.8,
          opacityTo: 0.25,
          stops: [0, 95, 100]
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 2,
        curve: 'straight'
      },
      labels: ['E','F','M','A','M','J','J','A','S','O','N','D'],
      series: [
        {
          name: 'Ventas x Mes',
          data: [280, 280, 240, 240, 200, 200, 260, 260, 210,200,250,240]
        }
      ],
      xaxis: {
        show: false,
        lines: {
          show: false
        },
        labels: {
          show: false
        },
        axisBorder: {
          show: false
        }
      },
      yaxis: {
        show: false
      }
    };
  if (typeof sessionAreaChartEl !== undefined && sessionAreaChartEl !== null) {
    const sessionAreaChart = new ApexCharts(sessionAreaChartEl, sessionAreaChartConfig);
    sessionAreaChart.render();
  }

})();
