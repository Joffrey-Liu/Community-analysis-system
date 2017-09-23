var radarchat = null;
function Radardraw() {
	radarchat = new Chart(document.getElementById("radar-chart"), {
		type: 'radar',
		data: {
		  labels: ["Food", "Sport", "Activity","pet","landscape"],
		  fontSize: 30,
		  datasets: [
			{
			  label: left_name,
			  fill: true,
			  backgroundColor: "rgba(179,181,198,0.2)",
			  borderColor: "rgba(179,181,198,1)",
			  pointBorderColor: "#fff",
			  pointBackgroundColor: "rgba(179,181,198,1)",
			  pointLabelFontSize: 20,
			  data: [foodcount[0]/all*100,sportcount[0]/all*100,activitycount[0]/all*100,petcount[0]/all*100,landcount[0]/all*100]
			}, {
			  label: right_name,
			  fill: true,
			  backgroundColor: "rgba(255,99,132,0.2)",
			  borderColor: "rgba(255,99,132,1)",
			  pointBorderColor: "#fff",
			  pointBackgroundColor: "rgba(255,99,132,1)",
			  pointBorderColor: "#fff",
			  pointLabelFontSize: 20,
			  data: [foodcount[1]/all*100,sportcount[1]/all*100,activitycount[1]/all*100,petcount[1]/all*100,landcount[1]/all*100]
			}
		  ]
		},
		options: {
		  title: {
			display: true,
			text: '',
			fontSize: 40
		  },
		 legend: {
			display: true,
			labels: {
				fontSize: 20
			}
		},
		 pointLabel: {
				fontSize: 20
			},
		}
	});
	
}