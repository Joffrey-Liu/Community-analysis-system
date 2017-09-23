 var compare;
 var foodbar;
 var sportbar;
 var activitybar;
 var petbar;
 var landscapebar;
 var run = 0;

 $(document).ready(function() {
	var bar = new ProgressBar.Path('#rectangle', {
	  easing: 'easeInOut',
	  duration: 1400
	});

	bar.set(0);
	bar.animate(1.0);  // Number from 0.0 to 1.0

	var bar2 = new ProgressBar.Path('#triangle', {
	  easing: 'easeInOut',
	  duration: 1400
	});

	bar2.set(0);
	bar2.animate(1.0);  // Number from 0.0 to 1.0
	
	var bar3 = new ProgressBar.Path('#circle', {
	  easing: 'easeInOut',
	  duration: 1400
	});

	bar3.set(0);
	bar3.animate(1.0);  // Number from 0.0 to 1.0
	
	
	Initcompare();
	Initfood();
	Initsport();
	Initactivity();
	Initpet();
	Initlandscape();
	  // Number from 0.0 to 1.0
	
	
	
});

function Initcompare(){
	compare = new ProgressBar.Circle(circlebar, {
	  color: '#aaa',
	  trailColor: '#eee',
	  // This has to be the same size as the maximum width to
	  // prevent clipping
	  strokeWidth: 4,
	  trailWidth: 1,
	  easing: 'easeInOut',
	  duration: 1400,
	  text: {
		autoStyleContainer: false
	  },
	  from: { color: '#FFEA82', width: 1 },
	  to: { color: '#ED6A5A', width: 4 },
	  // Set default step function for all animate calls
	  step: function(state, circle) {
		circle.path.setAttribute('stroke', state.color);
		circle.path.setAttribute('stroke-width', state.width);
			
		var value = Math.round(circle.value() * 100);
		if (value === 0) {
		  circle.setText('');
		} else {
		  circle.setText(value+'%');
		}
		circle.text.style.color = state.color;
	  }
	});
	compare.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
	compare.text.style.fontSize = '4rem';
	//compare.animate(run);  // Number from 0.0 to 1.0
}

function Initfood(){
	foodbar = new ProgressBar.Line(foodline, {
	  strokeWidth: 4,
	  easing: 'easeInOut',
	  duration: 1400,
	  color: '#FFEA82',
	  trailColor: '#eee',
	  trailWidth: 1,
	  svgStyle: {width: '100%', height: '100%'},
	  text: {
		style: {
		  // Text color.
		  // Default: same as stroke color (options.color)
		  color: '#666',
		  position: 'absolute',
		  right: '0',
		  top: '30px',
		  padding: 0,
		  margin: 0,
		  transform: null
		},
		autoStyleContainer: false
	  },
	  from: {color: '#FFEA82'},
	  to: {color: '#ED6A5A'},
	  step: (state, foodbar) => {
		foodbar.path.setAttribute('stroke', state.color);
		foodbar.setText(Math.round(foodbar.value() * 100) + ' %');
	  }
	});
	foodbar.text.style.fontSize = '4rem';
}

function Initsport(){
	// Number from 0.0 to 1.0
	sportbar = new ProgressBar.Line(sportline, {
	  strokeWidth: 4,
	  easing: 'easeInOut',
	  duration: 1400,
	  color: '#FFEA82',
	  trailColor: '#eee',
	  trailWidth: 1,
	  svgStyle: {width: '100%', height: '100%'},
	  text: {
		style: {
		  // Text color.
		  // Default: same as stroke color (options.color)
		  color: '#666',
		  position: 'absolute',
		  right: '0',
		  top: '30px',
		  padding: 0,
		  margin: 0,
		  transform: null
		},
		autoStyleContainer: false
	  },
	  from: {color: '#FFEA82'},
	  to: {color: '#ED6A5A'},
	  step: (state, sportbar) => {
		sportbar.path.setAttribute('stroke', state.color);
		sportbar.setText(Math.round(sportbar.value() * 100) + ' %');
	  }
	});
	sportbar.text.style.fontSize = '4rem';
}

function Initactivity(){
	activitybar = new ProgressBar.Line(activityline, {
	  strokeWidth: 4,
	  easing: 'easeInOut',
	  duration: 1400,
	  color: '#FFEA82',
	  trailColor: '#eee',
	  trailWidth: 1,
	  svgStyle: {width: '100%', height: '100%'},
	  text: {
		style: {
		  // Text color.
		  // Default: same as stroke color (options.color)
		  color: '#666',
		  position: 'absolute',
		  right: '0',
		  top: '30px',
		  padding: 0,
		  margin: 0,
		  transform: null
		},
		autoStyleContainer: false
	  },
	  from: {color: '#FFEA82'},
	  to: {color: '#ED6A5A'},
	  step: (state, activitybar) => {
		activitybar.path.setAttribute('stroke', state.color);
		activitybar.setText(Math.round(activitybar.value() * 100) + ' %');
	  }
	});
	activitybar.text.style.fontSize = '4rem';
}

function Initpet(){
	petbar = new ProgressBar.Line(petline, {
	  strokeWidth: 4,
	  easing: 'easeInOut',
	  duration: 1400,
	  color: '#FFEA82',
	  trailColor: '#eee',
	  trailWidth: 1,
	  svgStyle: {width: '100%', height: '100%'},
	  text: {
		style: {
		  // Text color.
		  // Default: same as stroke color (options.color)
		  color: '#666',
		  position: 'absolute',
		  right: '0',
		  top: '30px',
		  padding: 0,
		  margin: 0,
		  transform: null
		},
		autoStyleContainer: false
	  },
	  from: {color: '#FFEA82'},
	  to: {color: '#ED6A5A'},
	  step: (state, petbar) => {
		petbar.path.setAttribute('stroke', state.color);
		petbar.setText(Math.round(petbar.value() * 100) + ' %');
	  }
	});
	petbar.text.style.fontSize = '4rem';
}

function Initlandscape(){
	landscapebar = new ProgressBar.Line(landscapeline, {
	  strokeWidth: 4,
	  easing: 'easeInOut',
	  duration: 1400,
	  color: '#FFEA82',
	  trailColor: '#eee',
	  trailWidth: 1,
	  svgStyle: {width: '100%', height: '100%'},
	  text: {
		style: {
		  // Text color.
		  // Default: same as stroke color (options.color)
		  color: '#666',
		  position: 'absolute',
		  right: '0',
		  top: '30px',
		  padding: 0,
		  margin: 0,
		  transform: null
		},
		autoStyleContainer: false
	  },
	  from: {color: '#FFEA82'},
	  to: {color: '#ED6A5A'},
	  step: (state, landscapebar) => {
		landscapebar.path.setAttribute('stroke', state.color);
		landscapebar.setText(Math.round(landscapebar.value() * 100) + ' %');
	  }
	});
	landscapebar.text.style.fontSize = '4rem';
}

function Runbar()
{ 
	//showBar();
	run = 0;
	var number = Math.floor(Math.random() * 100) + 1
	number = number * 0.01;
	//compare.animate(number);
	//drawfoodchart();
}

function showBar()
{
	document.getElementById("runbtn").style.display = "none";
	document.getElementById("circlebar").style.display = "block";
}

function showBtn()
{
	compare.animate(0);
	foodbar.animate(0);
	sportbar.animate(0);
	activitybar.animate(0);
	petbar.animate(0);
	landscapebar.animate(0);
	document.getElementById("runbtn").style.display = "block";
	document.getElementById("circlebar").style.display = "none";
}