var map;
var output_pic=0;
var in_pic=0;
var picstore;	
var left_id = "1354323564661792";
var right_id = "1375999745824690";
var left_name = "liu";
var right_name = "lia";
var left_GPS = [];
var right_GPS = [];
var left_markers = [];
var right_markers = [];
var left_area = [];
var right_area = [];
var left_photo = [];
var right_photo = [];
var timeout = 600;
var markerClusterleft;
var markerClusterright;
function pick(out)
{	
	showBtn();
	$.ajax({
        type: 'GET',
        url:"getsingle.php",
        dataType: 'json',
		data: {
        },
        success: function (data){
            for (i = 0; i < data.length; i++) {
                document.getElementById(in_pic).src = data[out][2];
				document.getElementById(in_pic).style.width = "100%";
				document.getElementById(in_pic).style.height = "100%";
            }
			if(in_pic=="left_pic"){
				left_id = data[out][1];
				left_name = data[out][0];
				imagewall(left_id,"left_pic");
			}
			else{
				right_id = data[out][1];
				right_name = data[out][0];
				imagewall(right_id,"right_pic");
			}
        },
        error: function(){
            window.alert("Failed~!!");
        }
    });
	$('#myModal').modal('hide');
	
}
function setinpic(input)
{
	in_pic = input;
}

function imagewall(id,which) {
	var left_right;
	var which_container;
	$.ajax({
        type: 'GET',
        url:"imagewall.php",
        dataType: 'json',
		data: {
			fb_id: id
        },
        success: function (data){
			
			
			var count = 0;
			if(which=="left_pic"){
				left_right = "left_photo_wall";
				which_container = "container";
				left_GPS.length=0;
				left_area.length=0;
				left_photo.length=0;
			}
			else{
				left_right = "right_photo_wall";
				which_container = "container2";
				right_GPS.length=0;
				right_area.length=0;
				right_photo.length=0;
			}
			document.getElementById(left_right).innerHTML="";
            for (i = 0; i < data.length; i++) {
				if(which=="left_pic"){
					left_GPS[count] = {lat: parseFloat(data[i][1].toString()), lng: parseFloat(data[i][2].toString())};
					left_area.push(data[i][3]);
				}
				else{
					right_GPS[count] = {lat: parseFloat(data[i][1].toString()), lng: parseFloat(data[i][2].toString())};
					right_area.push(data[i][3]);
				}
				var my = which+"_"+i.toString();
				add(my ,data[i][0], i, left_right);
				if(which=="left_pic"){
					left_photo.push(data[i][0]);
				}
				else
					right_photo.push(data[i][0]);
				count++;
			}
			
			
        },
        error: function(){
            window.alert("Failed~!!");
        }
    });
}

function add(my, s, i, pwid) {  
    var element = document.createElement("IMG");
    element.src = s;
    element.id = my;
    element.type = "IMG";
    element.value = i; 
    element.name = i;
    element.onclick = function()  {clickmarker(my);}
    var foo = document.getElementById(pwid);
    //foo.appendChild(element);
    $('#'+pwid).append(element);
	
    //$('#'+pwid).append(element);
}

function clickmarker(input){
	var res = input.split("_");
	var markernum = parseInt(res[2]);
	clearanimation();
	if(res[0]=="left"){
		var latLng = new google.maps.LatLng(left_GPS[markernum].lat, left_GPS[markernum].lng);
		left_markers[markernum].setAnimation(google.maps.Animation.BOUNCE);
		panTo(map,latLng,5000);
	}
	else{
		var latLng = new google.maps.LatLng(right_GPS[markernum].lat, right_GPS[markernum].lng);
		//alert(right_markers[markernum]);
		right_markers[markernum].setAnimation(google.maps.Animation.BOUNCE);
		panTo(map,latLng,5000);
	}
		
	
}

function clearanimation(){
	for(i=0;i<left_markers.length;i++){
		if (left_markers[i].getAnimation() != null) {
			left_markers[i].setAnimation(null);
		}
	}
	for(i=0;i<right_markers.length;i++){
		if (right_markers[i].getAnimation() != null) {
			right_markers[i].setAnimation(null);
		}
	}
	
}

function panTo(map, dest, delay) {
	map.setZoom(16);
    var GOOGLE_PAN_DELAY = 500,
        /* the native Google Maps milliseconds */
        cycles = delay / GOOGLE_PAN_DELAY,
        interval = delay / cycles,
        origin = map.getCenter(),
        waypoints = [],
        temp,
        latx,
        lngx;

    // compute the change in lat/long, and divide across N cycles
    latx = (dest.lat() - origin.lat()) / cycles;
    lngx = (dest.lng() - origin.lng()) / cycles;

    // starting at origin, add N-1 intermediate waypoints that are equidistance apart
    temp = origin;
    for (var i = 0; i < cycles - 1; i++) {
        temp = new google.maps.LatLng(temp.lat() + latx, temp.lng() + lngx);
        waypoints.push(temp);
    }
    // make sure the last waypoint is the actual dest
    waypoints.push(dest);

    function pan() {
        var waypoint;

        if (waypoints.length === 0) return;

        waypoint = waypoints.shift();

        map.panTo(waypoint);
		map.setCenter(waypoint);
        window.setTimeout(pan, 10); 
    }

    pan();
}
var c = 1;
function geo(coord){
	geocoder.geocode({
	  'latLng': coord
	}, function(results, status) {
		if (status === google.maps.GeocoderStatus.OK) {
			if (results) {
				// 將取得的資訊傳入 marker 訊息泡泡
				//alert(results[6].formatted_address + " "+c + " "+left_GPS.length);
				c++;
			}
		} else {
			setTimeout(function() { geo(coord); }, (timeout * 3));
			//alert("Reverse Geocoding failed because: " + status);
		}
	});
}


function setMatker(){
	if(left_markers.length>0){
		for (var i = 0; i < left_markers.length; i++) {
			left_markers[i].setMap(null);
		}
			
	}
		
	if(right_markers.length>0){
		for (var i = 0; i < right_markers.length; i++) {
			right_markers[i].setMap(null);
		}	
	}
	left_markers = [];
	right_markers = [];
	left_markers.length=0;
	right_markers.length=0;
	var coord;
	for(i=0; i<left_GPS.length; i++) {
		var marker = new google.maps.Marker({
		  position: new google.maps.LatLng(left_GPS[i].lat,left_GPS[i].lng),
		  animation: google.maps.Animation.DROP,
		  icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
		  map: map
		});
		
		var contentString = "<div><img src="+left_photo[i]+"  style='margin:auto;width:247px;height:247px;'></div>";
		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});
		attachSecretMessage(marker,infowindow)
		/*if(left_GPS[i].lat!=-1&&left_GPS[i].lng!=-1){
			left_markers.push(marker);
			
		}*/
		left_markers.push(marker);
	}
	
	
        // Add a marker clusterer to manage the markers.
	/*markerClusterleft = new MarkerClusterer(map, left_markers,
		{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});*/
	//alert(c + " "+left_GPS.length);
	//var coord = new google.maps.LatLng(25.056301, 121.493075);
			//var markerPosition = left_markers[i].getPosition();
	
			
	for(i=0; i<right_GPS.length; i++) {
		var marker = new google.maps.Marker({
		  position: new google.maps.LatLng(right_GPS[i].lat,right_GPS[i].lng),
		  animation: google.maps.Animation.DROP,
		  icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
		  map: map
		});
		var contentString = "<div><img src="+right_photo[i]+"  style='margin:auto;width:247px;height:247px;'></div>";
		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});
		attachSecretMessage(marker,infowindow)
		/*if(right_GPS[i].lat!=-1&&right_GPS[i].lng!=-1){
			right_markers.push(marker);
		}*/
		right_markers.push(marker);
	}
	/*markerClusterright = new MarkerClusterer(map, right_markers,
		{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});*/
	
	
}

function attachSecretMessage(marker,infowindow){
	marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
  map.addListener('click', function(e) {
		if (infowindow) {
			infowindow.close();
		}
	});
}
