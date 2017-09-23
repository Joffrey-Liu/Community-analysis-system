function draw3Dchat(chart_id,column_name,leftdata,rightdata,alpha_num ,beta_num,title_text,color1,color2){
	Highcharts.chart(chart_id, {
			chart: {
				type: 'column',
				options3d: {
					enabled: true,
					alpha: alpha_num,
					beta: beta_num,
					viewDistance: 25,
					depth:28
				}
			},

			title: {
				text: title_text,
				 style: {
					fontWeight: 'bold',
					fontSize: '24px'
				}
			},
			colors:[color1,color2],
			xAxis: {
				categories: column_name,
				labels: {
					style: {
						fontSize:'15px'
					}
				}
			},

			yAxis: {
				allowDecimals: false,
				min: 0,
				title: {
					text: 'Number'
				}
			},

			tooltip: {
				headerFormat: '<b>{point.key}</b><br>',
				pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y}'
			},

			plotOptions: {
				column: {
					stacking: 'normal',
					depth: 40
				}
			},

			series: [{
				name: left_name,
				data: leftdata,
				stack: left_name
			}, {
				name: right_name,
				data: rightdata,
				stack: right_name
			}]
		});
}