/**
 * Dashboard CRM
 */

'use strict';

(function() {
  let cardColor, headingColor, labelColor, legendColor, shadeColor, borderColor, heatMap1, heatMap2, heatMap3, heatMap4;

  if (isDarkStyle) {
    cardColor = config.colors_dark.cardColor;
    headingColor = config.colors_dark.headingColor;
    labelColor = config.colors_dark.textMuted;
    legendColor = config.colors_dark.bodyColor;
    borderColor = config.colors_dark.borderColor;
    shadeColor = 'dark';
    heatMap1 = '#4f51c0';
    heatMap2 = '#595cd9';
    heatMap3 = '#8789ff';
    heatMap4 = '#c3c4ff';
  } else {
    cardColor = config.colors.white;
    headingColor = config.colors.headingColor;
    labelColor = config.colors.textMuted;
    legendColor = config.colors.bodyColor;
    borderColor = config.colors.borderColor;
    shadeColor = '';
    heatMap1 = '#e1e2ff';
    heatMap2 = '#c3c4ff';
    heatMap3 = '#a5a7ff';
    heatMap4 = '#696cff';
  }
  const clientesColors = {
    donut: {
      series1: config.colors.secondary,
      series2: config.colors.info,
      series3: config.colors.primary,
      series4: config.colors.success,
    }
  };
  // Donut Chart Colors
  const chartColors = {
    donut: {
      series1: config.colors.success,
      series2: 'rgba(113, 221, 55, 0.6)',
      series3: 'rgba(113, 221, 55, 0.4)',
      series4: 'rgba(113, 221, 55, 0.2)'
    }
  };

  // Radial bar chart functions
  function radialBarChart(color, value) {
    const radialBarChartOpt = {
      chart: {
        height: 55,
        width: 45,
        type: 'radialBar'
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '25%'
          },
          dataLabels: {
            show: false
          },
          track: {
            background: config.colors_label.secondary
          }
        }
      },
      colors: [color],
      grid: {
        padding: {
          top: -15,
          bottom: -15,
          left: -5,
          right: -15
        }
      },
      series: [value],
      labels: ['Progress']
    };
    return radialBarChartOpt;
  }

  // Progress Chart
  // --------------------------------------------------------------------
  // All progress chart
  const chartProgressList = document.querySelectorAll('.chart-progress');
  if (chartProgressList) {
    chartProgressList.forEach(function(chartProgressEl) {
      const color = config.colors[chartProgressEl.dataset.color],
        series = chartProgressEl.dataset.series;
      const optionsBundle = radialBarChart(color, series);
      const chart = new ApexCharts(chartProgressEl, optionsBundle);
      chart.render();
    });
  }


  // Ventas Semanales
  // --------------------------------------------------------------------
  const salesActivityChartEl = document.querySelector('#salesActivityChart'),
    salesActivityChartConfig = {
      chart: {
        type: 'bar',
        height: 275,
        stacked: true,
        toolbar: {
          show: false
        }
      },
      series: [
        {
          name: 'Ganadas',
          data: [75, 50, 55, 60, 48, 82, 59]
        },
        {
          name: 'Perdidas',
          data: [25, 29, 32, 35, 34, 18, 30]
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '40%',
          borderRadius: 8,
          startingShape: 'rounded',
          endingShape: 'rounded'
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 6,
        lineCap: 'round',
        colors: [cardColor]
      },
      legend: {
        show: false
      },
      colors: [config.colors.success, config.colors.danger],
      fill: {
        opacity: 1
      },
      grid: {
        show: false,
        strokeDashArray: 7,
        padding: {
          top: -10,
          bottom: -12,
          left: 0,
          right: 0
        }
      },
      xaxis: {
        categories: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
        labels: {
          show: true,
          style: {
            colors: labelColor,
            fontSize: '13px'
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        show: false
      },
      responsive: [
        {
          breakpoint: 1440,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 10,
                columnWidth: '50%'
              }
            }
          }
        },
        {
          breakpoint: 1300,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 11,
                columnWidth: '55%'
              }
            }
          }
        },
        {
          breakpoint: 1200,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 10,
                columnWidth: '45%'
              }
            }
          }
        },
        {
          breakpoint: 1040,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 10,
                columnWidth: '50%'
              }
            }
          }
        },
        {
          breakpoint: 992,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 12,
                columnWidth: '40%'
              }
            },
            chart: {
              type: 'bar',
              height: 320
            }
          }
        },
        {
          breakpoint: 768,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 11,
                columnWidth: '25%'
              }
            }
          }
        },
        {
          breakpoint: 576,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 10,
                columnWidth: '35%'
              }
            }
          }
        },
        {
          breakpoint: 440,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 10,
                columnWidth: '45%'
              }
            }
          }
        },
        {
          breakpoint: 360,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 8,
                columnWidth: '50%'
              }
            }
          }
        }
      ],
      states: {
        hover: {
          filter: {
            type: 'none'
          }
        },
        active: {
          filter: {
            type: 'none'
          }
        }
      }
    };
  if (typeof salesActivityChartEl !== undefined && salesActivityChartEl !== null) {
    const salesActivityChart = new ApexCharts(salesActivityChartEl, salesActivityChartConfig);
    salesActivityChart.render();
  }
  // Clientes
  // --------------------------------------------------------------------
  const clientesChartEl = document.querySelector('#cliChart'),
    clientesChartConfig = {
      chart: {
        height: 200,
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
  // Conversion
  // --------------------------------------------------------------------
  const salesStatsEl = document.querySelector('#salesStats'),
    salesStatsOptions = {
      chart: {
        height: 340,
        type: 'radialBar'
      },
      series: [75],
      labels: ['Ventas'],
      plotOptions: {
        radialBar: {
          startAngle: 0,
          endAngle: 360,
          strokeWidth: '70',
          hollow: {
            margin: 50,
            size: '75%',
            image: assetsPath + 'img/icons/misc/arrow-star.png',
            imageWidth: 65,
            imageHeight: 55,
            imageOffsetY: -35,
            imageClipped: false
          },
          track: {
            strokeWidth: '50%',
            background: borderColor
          },
          dataLabels: {
            show: true,
            name: {
              offsetY: 60,
              show: true,
              color: labelColor,
              fontSize: '15px'
            },
            value: {
              formatter: function(val) {
                return parseInt(val) + '%';
              },
              offsetY: 20,
              color: headingColor,
              fontSize: '32px',
              show: true
            }
          }
        }
      },
      fill: {
        type: 'solid',
        colors: config.colors.success
      },
      stroke: {
        lineCap: 'round'
      },
      states: {
        hover: {
          filter: {
            type: 'none'
          }
        },
        active: {
          filter: {
            type: 'none'
          }
        }
      }
    };
  if (typeof salesStatsEl !== undefined && salesStatsEl !== null) {
    const salesStats = new ApexCharts(salesStatsEl, salesStatsOptions);
    salesStats.render();
  }
})();
