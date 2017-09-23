<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Theme Made By www.w3schools.com - No Copyright -->
  <title>相簿脫光光</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <link href="//fonts.googleapis.com/css?family=Sofia" rel="stylesheet">
  <script src="./progressbar/dist/progressbar.js"></script>
  <script src="./js/mybar.js"></script>
  <script src="./js/fbphoto_slider.js"></script>
  <script src="./js/photo_pick.js"></script>
  <script src="./js/Mychart.js"></script>
  <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
  <script src="http://d3js.org/d3.v3.min.js"></script>
  <script src="./js/d3.layout.cloud.js"></script>
  <script src="./js/mytextcloud.js"></script>
  <script src="./js/radarchart.js"></script>
  <script src="./js/3Dchart.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.6.0/Chart.js"></script>
  <script src="https://code.highcharts.com/highcharts.js"></script>
  <script src="https://code.highcharts.com/highcharts-3d.js"></script>
  <script src="https://code.highcharts.com/modules/exporting.js"></script>
  <link href="https://fonts.googleapis.com/css?family=Raleway:400,300,600,800,900" rel="stylesheet" type="text/css">
  <script src="//masonry.desandro.com/masonry.pkgd.min.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/jquery.imagesloaded/3.0.4/jquery.imagesloaded.js"></script>
  <script src="https://www.amcharts.com/lib/3/ammap.js"></script>
  <script src="https://www.amcharts.com/lib/3/maps/js/taiwanHigh.js"></script>
  <script src="https://www.amcharts.com/lib/3/themes/light.js"></script>
  <script src="./js/map.js"></script>
  <link rel="stylesheet" href="./css/mystyle.css">
  <link rel="stylesheet" href="./dist/css/swiper.min.css">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <style>
	#left_photo_wall {
		   /* Prevent vertical gaps */
		   line-height: 0;
		   width: 100%;
		   -webkit-column-count: 4;
		   -webkit-column-gap:   0px;
		   -moz-column-count:    4;
		   -moz-column-gap:      0px;
		   column-count:         4;
		   column-gap:           0px;
		  
		}

		#left_photo_wall img {
		  /* Just in case there are inline attributes */
		  width: 100% !important;
		  height: auto !important;
		 
		}
		#left_photo_wall img:hover {
			background: white;
			box-shadow: 		5px 5px 5px #333;			
			-webkit-box-shadow:	5px 5px 5px #333;
			-moz-box-shadow:	5px 5px 5px #333;
			-webkit-transform:scale(1.2);
			transform:scale(1.2);
			z-index:1;
		}
		
		#right_photo_wall {
		   /* Prevent vertical gaps */
		   line-height: 0;
		   width: 100%;
		   -webkit-column-count: 4;
		   -webkit-column-gap:   0px;
		   -moz-column-count:    4;
		   -moz-column-gap:      0px;
		   column-count:         4;
		   column-gap:           0px;
		  
		}

		#right_photo_wall img {
		  /* Just in case there are inline attributes */
		  width: 100% !important;
		  height: auto !important;
		 
		}
		#right_photo_wall img:hover {
			background: white;
			box-shadow: 		5px 5px 5px #333;			
			-webkit-box-shadow:	5px 5px 5px #333;
			-moz-box-shadow:	5px 5px 5px #333;
			-webkit-transform:scale(1.2);
			transform:scale(1.2);
			z-index:1;
		}
		
		
		::-webkit-scrollbar {
			width: 12px;
		   
		}

		::-webkit-scrollbar-track {
			-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
			border-radius: 10px;
			background: #d6d6d6;
		}
		 
		::-webkit-scrollbar-thumb {
			border-radius: 10px;
			-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
			background: #c1c1c1;
		}

		::-webkit-scrollbar-button {
		  width: 0px;
		  height: 0px;
		}
		::-webkit-scrollbar-thumb {
		  /*background: #e1e1e1;*/
		  background: #c1c1c1;
		  border: 0px none #ffffff;
		  border-radius: 50px;
		}
		::-webkit-scrollbar-thumb:hover {
		  /*background: rgba(255,255,255,.5);*/
		  background: #6c5e59;
		}
		::-webkit-scrollbar-thumb:active {
		  /*background: #fff;*/
		  background: #6c5e59;
		}
		::-webkit-scrollbar-thumb:inactive {
		  hide;
		}

		::-webkit-scrollbar-track:hover {
		  /*background: #c0c0c0;*/
		  background: #d6d6d6;
		}
		::-webkit-scrollbar-track:active {
		  /*background: #333333;*/
		  background: #d6d6d6;
		}
		::-webkit-scrollbar-corner {
		  background: transparent;
		}
	
	
	#loading {
			width: 100%;
			height: 100%;
			top: 0px;
			left: 0px;
			position: fixed;
			opacity: 0.8;
			background-color: #fff;
			z-index: 99;
			text-align: center;
		}

		#loading-image {
			position: absolute;
			margin: auto;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			width: 25%;
			height: 25%;
			z-index: 100;
		}
		#food3Dchart {
			height: 400px; 
			min-width: 310px; 
			max-width: 900px;
			margin: 0 auto;
			border: 5px solid #666;
			border-radius: 50px;
			padding: 20px;
			
		}
		#test {
			height: 400px; 
			min-width: 310px; 
			max-width: 900px;
			margin: 0 auto;
			
		}
		#test2 {
			height: 400px; 
			min-width: 310px; 
			max-width: 900px;
			margin: 0 auto;
			
		}
		#mapdiv {
			  background: #fff;
			  width: 100%;
			  height: 500px;
		}
		.table {
			border-bottom:0px !important;
		}
		.table th, .table td {
			border: 1px !important;
			margin-top: 10px;
		}
		.fixed-table-container {
			border:0px !important;
		}
		#foodline {
		  margin: 20px;
		  margin-top: 40px;
		  width: 400px;
		  height: 8px;
		  position: relative;
		}
		#sportline {
		  margin: 20px;
		  margin-top: 70px;
		  width: 400px;
		  height: 8px;
		  position: relative;
		}
		#activityline {
		  margin: 20px;
		  margin-top: 70px;
		  width: 400px;
		  height: 8px;
		  position: relative;
		}
		#petline {
		  margin: 20px;
		  margin-top: 70px;
		  width: 400px;
		  height: 8px;
		  position: relative;
		}
		#landscapeline {
		  margin: 20px;
		  margin-top: 70px;
		  width: 400px;
		  height: 8px;
		  position: relative;
		}
  </style>
</head>
<body >
<div id="loading" style="display: none;">
			<!--img id="loading-image" src="http://cdn.nirmaltv.com/images/generatorphp-thumb.gif" alt="Loading..." /-->
			<img id="loading-image" src="image/you.gif" alt="Loading..." />
			<p style="margin-top:29%;">loading.....</p>
</div>
<div class="container-fluid bg-1 text-center" style="background-image:url(image/chalk-bg.jpg)">
	<div class="row">
		<div class="col-md-12">
			 <svg width="200" height="200">
				<rect id="rectangle" x="2" y="2" height="180" width="180" fill="none" stroke="#ED6A5A" stroke-width="4"></rect>
			 </svg>
			  <svg width="200" height="200">
				<circle id="triangle" cx="100" cy="100" r="95" stroke="#FFEA82" stroke-width="4" fill="none"></circle>
			 </svg>
			 <svg width="200" height="200">
				 <polygon id="circle" fill="none" stroke="#0Fa0ce" stroke-width="4" points="90,10, 10,180 ,180,180"/><polygon>
			 </svg>
			
		</div>
  </div>
    <header>
		<h1 style="color:white;opacity:0.8;">
			<text_animation>相簿<text_animation><text_animation><color_animation>脫</color_animation><text_animation><text_animation>光光</text_animation>
		</h1>
	</header>
</div>



<div class="container-fluid bg-3 text-center">    
  <div class="row">
    <div class="col-sm-4">
      <p style="font-family: 'cwTeXHei', sans-serif; font-weight: bold;">脫光對象</p>
		<div class="imgcontainer">
			<a href="#myModal" role="button" class="btn" data-toggle="modal" onclick="setinpic('left_pic')">
				<img src="image/man.png" class="img-circle" id="left_pic" alt="Image" onclick="setinpic('left_pic')">
				<div class="middle">
					<div class="text">Click</div>
				</div>
			</a>
		</div>
    </div>
    <div class="col-sm-4"> 
	  <p style="font-family: 'cwTeXHei', sans-serif; font-weight: bold;">脫光趴數</p>
	  <div class="round-button" style="margin:auto; margin-top:15%; display: blcok" id="runbtn">
		<div class="round-button-circle" style="margin-left:-8%;">
			<a href="#round-button" class="round-button">
			<div class="glow"><p style="font-family: 'cwTeXHei', sans-serif; font-weight: bold;">脫</p></div>
			</a>
		</div>
	  </div>
      <div id="circlebar" style="display: none"></div>
    </div>
    <div class="col-sm-4"> 
      <p style="font-family: 'cwTeXHei', sans-serif; font-weight: bold;">脫光對象</p>
		<div class="imgcontainer">
			<a href="#myModal" role="button" class="btn" data-toggle="modal" onclick="setinpic('right_pic')">
				<img src="image/woman.png" class="img-circle" id="right_pic" alt="Image" onclick="setinpic('right_pic')">
				<div class="middle">
					<div class="text">Click</div>
				</div>
			</a>
		</div>
    </div>
  </div>

  <div class="row" id="radartitle" style="display:none; margin-top:5%;">
	<div class="col-sm-5">
		<div style="background: #1abc9c; margin-top:3%;height:50px;border: 5px ;border-radius: 5px 50px 50px 5px;padding: 20px;">&nbsp;</div>
	</div>
	<div class="col-sm-2">
		<img src="image/satellite-dish.png" alt="Image" style="margin-top:-15%;">
		<img src="image/radar_font.png" style="width:60%;height:55%;margin-top:1%;" alt="Image">
	</div>
	<div class="col-sm-5">
		<div style="background: #1abc9c;height:50px; margin-top:3%; border: 5px ;border-radius: 50px 5px 5px 50px;padding: 20px;">&nbsp;</div>
	</div>
 </div>
  <div class="row" id="radarrow" style="display:none;  margin-top:2%;animation: fadein 4s; -webkit-animation: fadein 4s;">
	<div class="col-sm-6">
		<div id="canvas-holder" style="width:100%; margin:auto;">
			<canvas id="radar-chart"></canvas>
		</div>
	</div>
	<div class="col-sm-6">
		<table class="table table-borderless">
		<thead></thead>
		<tbody>
			<tr>
				<div>
					<td><img src="image/cutlery.png" alt="Image" style="float:left;margin-right:10px;"></td>
					<td><div id="foodline"></div></td>
				</div>
			</tr>
			<tr>
				<div>
					<td><img src="image/trophy.png" alt="Image" style="float:left;margin-right:10px;"></td>
					<td><div id="sportline"style="float:left;margin-right:10px;"></div></td>
				</div>
			<tr>
			<tr>
				<div>
					<td><img src="image/swings.png" alt="Image" style="float:left;margin-right:10px;"></td>
					<td><div id="activityline"style="float:left;margin-right:10px;"></div></td>
				</div>
			</tr>
			<tr>
				<div>
					<td><img src="image/dog.png" alt="Image" style="float:left;margin-right:10px;"></td>
					<td><div id="petline"style="float:left;margin-right:10px;"></div></td>
				</div>
			</tr>
			<tr>
				<div>
					<td><img src="image/eiffel-tower.png" alt="Image" style="float:left;margin-right:10px;"></td>
					<td><div id="landscapeline"style="float:left;margin-right:10px;"></div></td>
				</div>
			</tr>
		<tbody>
		</table>
	</div>
  </div>
  
  <div class="row" id="bartitle" style="display:none; margin-top:5%;">
	<div class="col-sm-5">
		<div style="background: #1abc9c; margin-top:3%;height:50px;border: 5px ;border-radius: 5px 50px 50px 5px;padding: 20px;">&nbsp;</div>
	</div>
	<div class="col-sm-2">
		<img src="image/bikini.png" alt="Image" style="margin-top:-12%;">
		<img src="image/inside_b_font.png" style="width:60%;height:55%;margin-top:1%;" alt="Image">
	</div>
	<div class="col-sm-5">
		<div style="background: #1abc9c;height:50px; margin-top:3%; border: 5px ;border-radius: 50px 5px 5px 50px;padding: 20px;">&nbsp;</div>
	</div>
	</div>
  <div class="row" id="datarow" style="display: none; margin-top:5%; animation: fadein 4s; -webkit-animation: fadein 4s;">
	<div class="row">
		<div class="col-sm-4">	
			<img src="image/cutlery.png" alt="Image">
			<!--div id="food3Dchart" style="height: 400px; margin:auto;box-shadow: 5px 5px 5px #333;"></div-->
			<div id="food3Dchart" style="height: 400px; margin-top:15px;  border: 5px solid #666;border-radius: 50px;padding: 20px;"></div>
		</div>
		<div class="col-sm-4">
			<img src="image/trophy.png" alt="Image">
			<div id="sport3Dchart" style="height: 400px; margin-top:15px; border: 5px solid #666;border-radius: 50px;padding: 20px;"></div>
		</div>
		<div class="col-sm-4">
			<img src="image/swings.png" alt="Image">
			<div id="activity3Dchart" style="height: 400px;margin-top:15px; border: 5px solid #666;border-radius: 50px;padding: 20px;"></div>
		</div>
	</div>
	<div class="row" style="margin-top: 15px;">
		<div class="col-sm-2">
			<p>&nbsp;</p>
		</div>
		<div class="col-sm-4">	
			<img src="image/dog.png" alt="Image">
			<!--div id="food3Dchart" style="height: 400px; margin:auto;box-shadow: 5px 5px 5px #333;"></div-->
			<div id="pet3Dchart" style="height: 400px; margin-top:15px; border: 5px solid #666;border-radius: 50px;padding: 20px;"></div>
		</div>
		<div class="col-sm-4">	
			<img src="image/eiffel-tower.png" alt="Image">
			<!--div id="food3Dchart" style="height: 400px; margin:auto;box-shadow: 5px 5px 5px #333;"></div-->
			<div id="landscape3Dchart" style="height: 400px; margin-top:15px; border: 5px solid #666;border-radius: 50px;padding: 20px;"></div>
		</div>
		<div class="col-sm-2">
			<p>&nbsp;</p>
		</div>
	</div>
  </div>
  
  
   <div class="row"  id="phototitle" style="display:none; margin-top:5%; animation: fadein 4s; -webkit-animation: fadein 4s;">
	<div class="col-sm-5">
		<div style="background: #1abc9c; margin-top:3%;height:50px;border: 5px ;border-radius: 5px 50px 50px 5px;padding: 20px;">&nbsp;</div>
	</div>
	<div class="col-sm-2">
		<img src="image/photo-camera (1).png" alt="Image" style="margin-top:-15%;">
		<img src="image/photo_font.png" style="width:60%;height:55%;margin-top:1%;" alt="Image">
	</div>
	<div class="col-sm-5">
		<div style="background: #1abc9c;height:50px; margin-top:3%; border: 5px ;border-radius: 50px 5px 5px 50px;padding: 20px;">&nbsp;</div>	
	</div>
  </div>
	 <div class="row" id="maprow" style="display:block;margin-top:20px;">
	<div class="col-sm-2">
		<!--div id="container" ></div>
			<div id="images" >
			</div-->
			<div style = "height:600px; overflow-y:scroll; padding: 10px;">
				<section id="left_photo_wall"></section>
			</div>
	</div>
	<div class="col-sm-8">
		<div id="googleMap" style="width:100%;height:600px; margin:auto;"></div>
		<div class="row" style="margin-top:3%;">
			<style>
				.circleimage:hover  {
				  transform: scale(1.1);
				}
			</style>
			<a  href="#googleMap" role="button">
				<img src="image/circle01.png" class="circleimage" style="width:10%;height:10%;opacity: 0.7;" alt="Image" onclick="twenty_range()">
			</a>
			<a  href="#googleMap" role="button">
				<img src="image/circle02.png" class="circleimage" style="width:10%;height:10%;opacity: 0.7;" alt="Image" onclick="forty_range()">
			</a>
			<a  href="#googleMap" role="button">
				<img src="image/circle03.png" class="circleimage" style="width:10%;height:10%;opacity: 0.7;" alt="Image" onclick="sixty_range()">
			</a>
			<a  href="#googleMap" role="button">
				<img src="image/circle04.png" class="circleimage" style="width:10%;height:10%;margin-left:2%;opacity: 0.7;" alt="Image" onclick="eighty_range()">
			</a>
			<a  href="#googleMap" role="button">
				<img src="image/circle05.png" class="circleimage" style="width:10%;height:10%;margin-left:3%;opacity: 0.7;" alt="Image" onclick="hundred_range()">
			</a>
		</div>
	</div>
	<div class="col-sm-2">
		<div style = "height:600px; overflow-y:scroll; padding: 10px;">
				<section id="right_photo_wall"></section>
			</div>
	</div>
	</div>
	</div>
  <!--div class="row">
	<div class="col-sm-1">
	</div>
	<div class="col-sm-10">
		<div id="mapdiv"></div>
	</div>
	<div class="col-sm-1">
	</div>
  </div-->

	
  </div>
	<style>

	footer {
		position: relative;
		height: 50px;
		width: 100%;
		background-color: #1abc9c;
	}

	p.copyright {
		position: absolute;
		width: 100%;
		color: #fff;
		line-height: 40px;
		font-size: 1.0em;
		text-align: center;
		bottom:0;
	}
		
</style>
<footer>
<p style="text-align:center;width:100%;">@相簿脫光光    2017</p>
</footer>
  
</div>



<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                  <p style="font-family: 'cwTeXHei', sans-serif; font-weight: bold; text-align:center">點選FB頭貼進行配對</p>
            </div>
            <div class="modal-body">
				<?php include 'fb_photo.php';?>
					
				<!--div id="myCarousel" class="carousel slide" data-ride="carousel">
   
				<div class="carousel-inner">
				  
				</div>

				<a class="left carousel-control" href="#myCarousel" data-slide="prev">
				  <span class="glyphicon glyphicon-chevron-left"></span>
				  <span class="sr-only">Previous</span>
				</a>
				<a class="right carousel-control" href="#myCarousel" data-slide="next">
				  <span class="glyphicon glyphicon-chevron-right"></span>
				  <span class="sr-only">Next</span>
				</a>
			  </div-->
			</div>
        </div>
    </div>
</div>

<script>
//網頁滑動效果
$("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
</script>
<script>
var geocoder;
function myMap() {
	//geocoder = new google.maps.Geocoder();
	var mapProp= {
		center:new google.maps.LatLng(24.9696,121.2683),
		zoom:10,
	};
	map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
}
</script>
<script src="https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js"></script>
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB6pqovakyNJz1AlnJIGBW-6RUSK_eFf0w&callback=myMap"></script>
</body>


</html>
