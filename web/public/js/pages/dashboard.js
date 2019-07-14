//[Dashboard Javascript]

//Project:	Fab Admin - Responsive Admin Template
//Primary use:   Used only for the main dashboard (index.html)


$(function () {

  'use strict';

	
    let draw = Chart.controllers.line.prototype.draw;
    Chart.controllers.line = Chart.controllers.line.extend({
        draw: function() {
            draw.apply(this, arguments);
            let ctx = this.chart.chart.ctx;
            let _stroke = ctx.stroke;
            ctx.stroke = function() {
                ctx.save();
                ctx.shadowColor = 'rgba(0, 0, 0, .3)';
                ctx.shadowBlur = 20;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 1;
                _stroke.apply(this, arguments)
                ctx.restore();
            }
        }
    });
	
 var ctx = document.getElementById("total-revenue");
    // ctx.height = 250;
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["2015", "2016", "2017", "2018", "2019"], 
            datasets: [{
                data: [2154, 1000, 2540, 2715, 3895],
                backgroundColor: "rgba(116, 96, 238, .3)", 
                borderWidth: 3,
                borderColor: "#7460ee",
                pointBackgroundColor: "#fff",
                pointBorderColor: "#fc4b6c",
                pointHoverBackgroundColor: "#FFF",
                pointHoverBorderColor: "#fc4b6c",
                pointRadius: 0,
                pointHoverRadius: 5,
                fill: true
            }, {
                data: [2541, 1547, 1658, 2254, 3302],
                backgroundColor: "rgba(38, 198, 218, .3)", 
                borderWidth: 3,
                borderColor: "#26c6da",
                pointBackgroundColor: "#fff",
                pointBorderColor: "#fc4b6c",
                pointHoverBackgroundColor: "#FFF",
                pointHoverBorderColor: "#fc4b6c",
                pointRadius: 0,
                pointHoverRadius: 6,
                fill: true
            }]
        },
        options: {
            responsive: !0,
            maintainAspectRatio: false, 
            legend: {
                display: !1
            },
            scales: {
                xAxes: [{
                    display: !1,
                    gridLines: {
                        display: !1
                    }
                }],
                yAxes: [{
                    display: !1,
                    ticks: {
                        padding: 10,
                        stepSize: 500,
                        max: 4000,
                        min: 1000
                    },
                    gridLines: {
                        display: !0,
                        draw1Border: !1,
                        lineWidth: 0.5,
                        zeroLineColor: "transparent",
                        drawBorder: false
                    }
                }]
            }
        }
    });
	
	
	
        
    $('#to-groth').circleProgress({
        startAngle: -Math.PI / 4 * 3,
        value: 0.8,
        size: 200,
        lineCap: 'round',
        fill: { color: '#7460ee' },
        reverse: false
    });


    $('#to-income').circleProgress({
        startAngle: -Math.PI / 4 * 3,
        value: 0.5,
        size: 200,
        lineCap: 'round',
        fill: { color: '#fc4b6c' },
        reverse: false
    });

	var ctx = document.getElementById("total-income");
    // ctx.height = 110;
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["01 July", "02 July", "03 July", "04 July", "05 July", "06 July", "07 July"], 
            datasets: [{
                data: [58, 25, 54, 71, 89, 95, 48],
                borderWidth: 3,
                borderColor: "#fc4b6c",
                pointBackgroundColor: "#fc4b6c",
                pointBorderColor: "#fc4b6c",
                pointHoverBackgroundColor: "#FFF",
                pointHoverBorderColor: "#fc4b6c",
                pointRadius: 5,
                pointHoverRadius: 6,
                fill: !1
            }, {
                data: [47, 39, 42, 54, 98, 71, 79],
                borderWidth: 3,
                borderColor: "#26c6da",
                pointBackgroundColor: "#26c6da",
                pointBorderColor: "#26c6da",
                pointHoverBackgroundColor: "#FFF",
                pointHoverBorderColor: "#26c6da",
                pointRadius: 5,
                pointHoverRadius: 6,
                fill: !1
            }]
        },
        options: {
            responsive: !0,
            maintainAspectRatio: false, 
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    display: true,
                    gridLines: {
                        display: false, 
                        drawBorder: false
                    }
                }],
                yAxes: [{
                    display: true,
                    ticks: {
                        padding: 10,
                        stepSize: 25,
                        max: 100,
                        min: 0
                    },
                    gridLines: {
                        display: true,
                        draw1Border: !1,
                        lineWidth: 0.5,
                        zeroLineColor: "transparent",
                        drawBorder: false
                    }
                }]
            }
        }
    });

	 $("#walet-status").sparkline([80, 85, 76, 67, 78, 81, 54, 70, 51, 74, 79, 64, 68, 69, 72, 54, 75], {
        type: "bar",
        height: "65",
        barWidth: "3",
        resize: !0,
        barSpacing: "17",
        barColor: "#71D875"
    });
	
	$("#linearea").sparkline([1,2,3,5,4,3,6,4,4,1], {
		type: 'line',
		width: '100%',
		height: '80',
		lineColor: '#26c6da',
		fillColor: 'rgba(38, 198, 218, 0.5)',
		lineWidth: 2,
	});
	
	$("#linearea2").sparkline([1,2,3,5,4,3,6,4,4,1], {
		type: 'line',
		width: '100%',
		height: '80',
		lineColor: '#fc4b6c',
		fillColor: 'rgba(252, 75, 108, 0.5)',
		lineWidth: 2,
	});
	
	
}); // End of use strict

