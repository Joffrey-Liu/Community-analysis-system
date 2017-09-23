$(document).ready(function(){
	var dataPoints = [{
					latitude: 24.9696,
					longitude: 121.2683,
					type: 'bubble',
					color: '#244999',

					fixedSize: false,
					alpha: 0.5,
					height: 50,
					width: 50,
					scale: 0.5,
					"labelShiftY": 2,
					"zoomLevel": 5,
					label: "New York",
					description: "讚讚讚",
					centered: false
			},
			{
					latitude: 25.034007,
					longitude: 121.564002,
					type: 'bubble',
					color: '#244999',

					fixedSize: false,
					alpha: 0.5,
					height: 50,
					width: 50,
					scale: 0.5,
					label: "101",
					"labelShiftY": 2,
					"zoomLevel": 5,
					description: "好酷",
					"color": "#CC0000",
					centered: false
			}
			];
			var map = AmCharts.makeChart( "mapdiv", {
			  "type": "map",
			  "theme": "light",
			  "dataProvider": {
				"map": "taiwanHigh",
				"images": dataPoints,
				"areas": [
				  { "id":"TW-KHQ", "value":"3", "color":"#d22532", "callout": true }, 
				  { "id":"TW-PIF", "value":"3", "color":"#d22532", "callout": true },
				  { "id":"TW-TNQ", "value":"29", "color":"#244999" },
				  { "id":"TW-HSQ", "value":"16", "color":"#d22532" },
				  { "id":"TW-HSZ", "value":"4", "color":"#d22532", "callout": true },
				  { "id":"TW-ILA", "value":"4", "color":"#d22532" },
				  { "id":"TW-KEE", "value":"20", "color":"#244999" },
				  { "id":"TW-MIA", "value":"11", "color":"#244999" },
				  { "id":"TW-TPE", "value":"6", "color":"#244999" },
				  { "id":"TW-TPQ", "value":"6", "color":"#d22532" },
				  { "id":"TW-TAO", "value":"8", "color":"#d22532" },
				  { "id":"TW-CHA", "value":"8", "color":"#d22532" },
				  { "id":"TW-CYQ", "value":"4", "color":"#244999" },
				  { "id":"TW-CYI", "value":"10", "color":"#d22532", "callout": true },
				  { "id":"TW-HUA", "value":"11", "color":"#244999", "callout": true },
				  { "id":"TW-NAN", "value":"16", "color":"#244999" },
				  { "id":"TW-TXQ", "value":"10", "color":"#d22532" },
				  { "id":"TW-YUN", "value":"6", "color":"#d22532" },
				  { "id":"TW-TTT", "value":"10", "color":"#d22532" },
				  { "id":"TW-PEN", "value":"3", "color":"#244999" },
				  { "id":"TW-1676511", "value":"5", "color":"#d22532" },
				  { "id":"TW-6724655", "value":"6", "color":"#244999" }
				]
			  },
			  "areasSettings": {
				"autoZoom": true,
				"selectedColor": "#CC0000"
			  },
			  "imagesSettings": {
				"labelColor": "#fff",
				"labelPosition": "middle"
			  },
			  "defs": {
		            "filter":[
		              {
		                "id": "shadow",
		                "width": "150%",
		                "height": "150%",
		                "feOffset": {
		                  "result": "offOut",
		                  "in": "SourceAlpha",
		                  "dx": "10",
		                  "dy": "10"
		                },
		                "feGaussianBlur": {
		                  "result": "blurOut",
		                  "in": "offOut",
		                  "stdDeviation": "10"
		                },
		                "feBlend": {
		                  "in": "SourceGraphic",
		                  "in2": "blurOut",
		                  "mode": "normal"
		                }
		              }
		            ]
		        }
			} );
});