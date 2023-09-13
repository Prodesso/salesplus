socket.emit("Session")
socket.on("userAuth", (data) => {
	console.log(data)
	$("#usuario").text(data.nombrecompleto)
	let dash = data.dashboard
	let prMeta = (dash.ventas.ventas / dash.ventas.meta) * 100
	let kVentasTot = dash.ventas.ventas / 1000
	let kfmonto = dash.oportunidades.frias.monto / 1000
	let kcalmonto = dash.oportunidades.calientes.monto / 1000
	let kgmonto = dash.oportunidades.ganadas.monto / 1000
	let kpmonto = dash.oportunidades.perdidas.monto / 1000
	let qtyf = dash.oportunidades.frias.qty
	let qtyc = dash.oportunidades.calientes.qty
	let qtyg = dash.oportunidades.ganadas.qty
	let qtyp = dash.oportunidades.perdidas.qty
	let qtyno = dash.contactos.Noint.qty
	let qtypoco = dash.contactos.PocoInt.qty
	let qtyint = dash.contactos.Interesado.qty
	let qtycli = dash.contactos.Cliente.qty
	let qtycnt = qtyno + qtypoco + qtyint + qtycli

	$("#ventas").text("$ " + kVentasTot.toString() + " KMXN")
	$("#meta").text(Math.round(prMeta) + " %")
	$("#fmonto").text("$ " + kfmonto.toString() + " KMXN")
	$("#fqty").text(Math.round(qtyf))
	$("#calmonto").text("$ " + kcalmonto.toString() + " KMXN")
	$("#calqty").text(Math.round(qtyc))
	$("#gmonto").text("$ " + kgmonto.toString() + " KMXN")
	$("#gqty").text(Math.round(qtyg))
	$("#pmonto").text("$ " + kpmonto.toString() + " KMXN")
	$("#pqty").text(Math.round(qtyp))
	$("#qtycont").text(Math.round(qtycnt))
	$("#qtycont1").text(Math.round(qtycnt))
	$("#qtycnt").text(Math.round(qtycnt))
	$("#qtyno").text(Math.round(qtyno))
	$("#qtypoco").text(Math.round(qtypoco))
	$("#qtyint").text(Math.round(qtyint))
	$("#qtycli").text(Math.round(qtycli))
	chartVentasSemanales(dash.ventasSem)
	chartClientes(dash.contactos)
	chartConversion(dash.oportunidades)
	timeSeguimiento(dash.seguimiento)
	Marketing(dash.marketing)
});
function timeSeguimiento(data) {
	$.each(data, function(i, item) {
		icono = (item.tipo == "llamada" ? "fa-phone" : (item.tipo == "email" ? "fa-envelope" : (item.tipo == "visita" ? "fa-map-marker" : "fa-comments")))
		clase = (item.status == "Activa" ? "timeline-point-primary" : (item.status == "Vencida" ? "timeline-point-danger" : item.status == "Completa" ? "timeline-point-success" : "timeline-point-secondary"))
		$("#timeline").append('<li class="timeline-item timeline-item-transparent"><span class="timeline-point ' + clase + '"></span>' +
			'<div class="timeline-event"><div class="timeline-header mb-1">' +
			'<h6 class="mb-0"><i class="fas ' + icono + '"></i> ' + item.titulo + '</h6><small class="text-muted"><a href="#" data-bs-toggle="tooltip" data-bs-title="' + item.tooltip + '">' + item.fecha + '</a></small>' +
			'</div><p class="mb-2">' + item.descripcion + '</p></div></li>')
	})
	$("#timeline").append('<li class="timeline-end-indicator"><i class="bx bx-check-circle"></i></li>')
	document.querySelectorAll('[data-bs-toggle="tooltip"]')
		.forEach(tooltip => {
			console.log(tooltip);
			new bootstrap.Tooltip(tooltip)
		})
	const verticalExample = document.getElementById('timelinecard')
	new PerfectScrollbar(verticalExample, {
		wheelPropagation: false
	});

}
function Marketing(data) {
	$.each(data, function(i, item) {
		clase = (item.estado == "Activa" ? "success" : (item.estado == "Pendiente" ? "secondary" : item.estado == "Cerrada" ? "primary" : "info"))
		$("#marketing > tbody").append('<tr><td>' + item.titulo + '</td><td>' + item.enviada + '</td><td>' + item.leida + '</td><td><span class="badge bg-label-' + clase + '"> ' + item.estado + ' </span></td><td></td></tr>')
	})
}
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
		series3: config.colors.warning,
		series4: config.colors.danger,
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
function chartVentasSemanales(data) {
	let g = []
	let p = []
	$.each(data, function(i, item) {
		g.push(item.g)
		p.push(item.p)
	})
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
					data: g
				},
				{
					name: 'Perdidas',
					data: p
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
}
// Clientes
// --------------------------------------------------------------------
function chartClientes(data) {
	const clientesChartEl = document.querySelector('#cliChart'),
		clientesChartConfig = {
			chart: {
				height: 200,
				parentHeightOffset: 0,
				type: 'donut'
			},
			labels: ['Contacto no Interesado', 'Prospecto poco interesado', 'Prospecto Interesado', 'Cliente'],
			series: [data.Noint.qty, data.PocoInt.qty, data.Interesado.qty, data.Cliente.qty],
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
}

// Conversion
// --------------------------------------------------------------------
function chartConversion(data) {
	let qtyf = data.frias.qty
	let qtyc = data.calientes.qty
	let qtyg = data.ganadas.qty
	let qtyp = data.perdidas.qty
	let qtyt = qtyf + qtyc + qtyg + qtyp
	let porc = Math.round((qtyg / qtyt != 0 ? qtyt:1) )
	console.log(porc)
	const salesStatsEl = document.querySelector('#salesStats'),
		salesStatsOptions = {
			chart: {
				height: 340,
				type: 'radialBar'
			},
			series: [porc],
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
}


