 var foodchart_left;
 var foodchart_right;
 var foodcount = [0,0];
 var foodleft = [];
 var foodright = [];
 var sportcount = [0,0];
 var sportleft = [];
 var sportright = [];
 var activitycount = [0,0];
 var activityleft = [];
 var activityright = [];
 var petcount = [0,0];
 var petleft=[];
 var petright=[];
 var landcount = [0,0];
 var landleft=[];
 var landright=[];
 var foodcloumn = [];
 var sportcloumn = [];
 var activitycloumn = [];
 var petcloumn =[];
 var landcloumn = [];
 var all =0;
 var food_finish = false;
 var sport_finish = false;
 var activity_finish = false;
 var pet_finish = false;
 var land_finish = false;
 var alldata_finish = null;
 var area_Circle = [];
 var twenty_circle = [];
 var forty_circle = [];
 var sixty_circle = [];
 var eighty_circle = [];
 var hundred_circle = [];
 var circle_range;
$(document).ready(function(){
	food_finish = false;
	sport_finish = false;
	activity_finish = false;
	$('#runbtn').click(function() {
		document.getElementById("loading").style.display = "block";
		if(left_markers.length>0){
			for (var i = 0; i < left_markers.length; i++) {
				left_markers[i].setMap(null);
			}
			//markerClusterleft.clearMarkers();
		}
		
		if(right_markers.length>0){
			for (var i = 0; i < right_markers.length; i++) {
				right_markers[i].setMap(null);
			}	
			//markerClusterright.clearMarkers();
		}
		
		if(area_Circle.length>0){
			for(var i=0;i<area_Circle.length;i++){
				area_Circle[i].setMap(null);
			}
		}
		if(radarchat!=null)
			radarchat.destroy();
		food_finish = false;
		sport_finish = false;
		activity_finish = false;
		pet_finish = false;
		land_finish = false;
		foodcount[0] = 0;
		foodcount[1] = 0;

		foodleft = [];
		foodright = [];
		sportcount[0] = 0;
		sportcount[1] = 0;
		sportleft = [];
		sportright = [];
		activitycount[0] = 0;
		activitycount[1] = 0;
		activityleft = [];
		activityright = [];
		petcount[0] = 0;
		petcount[1] =0;
		petleft = [];
		petright = [];
		landcount[0] = 0;
		landcount[1] =0;
		landleft = [];
		landright = [];
		foodcloumn = [];
		sportcloumn = [];
		activitycloumn = [];
		petcloumn = [];
		landcloumn = [];
		left_result = [];
		right_result = [];
		area_Circle =[];
		
		getdata("food");
		getdata("sport");
		getdata("activity");
		getdata("pet");
		getdata("landscape");
		runtime();
		document.getElementById("datarow").style.display = "block";
		document.getElementById("radartitle").style.display = "block";
		document.getElementById("bartitle").style.display = "block";
		document.getElementById("phototitle").style.display = "block";
		document.getElementById("maprow").style.display = "block";
		//document.getElementById("textcloud").style.display = "block";
		//textcloud();
	
		
	});
});

function runtime(){
	alldata_finish = setInterval(function() {
		if(food_finish == true && sport_finish == true &&activity_finish == true && pet_finish == true && land_finish == true){
			/*
			alert("Foodleft"+foodleft);
			alert("Foodright"+foodright);
			alert("sportright"+sportleft);
			alert("sportleft"+sportright);
			alert("activityleft"+activityleft);
			alert("activityright"+activityright);
			*/
			draw3Dchat("food3Dchart",foodcloumn,foodleft,foodright,0,0,"Food",'#32789B','#DF9C47');
			draw3Dchat("sport3Dchart",sportcloumn,sportleft,sportright,0,0,"Sport",'#4874A3', '#ED561B');
			draw3Dchat("activity3Dchart",activitycloumn,activityleft,activityright,0,0,"Activity",'#ED7757', '#EABD43');
			draw3Dchat("pet3Dchart",petcloumn,petleft,petright,0,0,"Pet",'#57A6BC', '#EAC93E');
			draw3Dchat("landscape3Dchart",landcloumn,landleft,landright,0,0,"Landscape",'#71B471', '#F98585');
			analysis();
			Radardraw();	
			document.getElementById("loading").style.display = "none";
			setMatker();
			document.getElementById("radarrow").style.display = "block";
			food_finish = false;
			sport_finish = false;
			activity_finish = false;
			pet_finish = false;
			clearInterval(alldata_finish);
		}
		},5);
}
/*完成*/
function analysis(){
	var food_temp=(foodcount[0]+foodcount[1])-(Math.abs(foodcount[0]-foodcount[1]));//food
	var sport_temp=(sportcount[0]+sportcount[1])-(Math.abs(sportcount[0]-sportcount[1]));//sport
	var activity_temp=(activitycount[0]+activitycount[1])-(Math.abs(activitycount[0]-activitycount[1]));//activity
	var pet_temp=(petcount[0]+petcount[1])-(Math.abs(petcount[0]-petcount[1]));//pet
	var land_temp=(landcount[0]+landcount[1])-(Math.abs(landcount[0]-landcount[1]));//land
	var food_single, sport_single, activity_single, pet_single, land_single;
	var weight = {food_ana: food_temp, sport_ana: sport_temp, activity_ana: activity_temp, pet_ana: pet_temp, land_ana: land_temp};
	//alert("arr "+weight.food_ana[0]+" "+weight.sport_ana[1]+" "+weight.activity_ana[0]);

	var result = Object.keys(weight).sort(function(a, b){
		return weight[b] - weight[a];
	})
	
	//alert("teat!!!!!!");
	var total=0;
	var total_parents=0;
	var total_child =0;
	var sum_parents;
	var sum_child;
	sum_parents=new Array(5);
	sum_child=new Array(5);
	for(i=0;i<5;i++){
		sum_child[i]=0;
		sum_parents[i]=0;
	}
	for(i=4;i>=0;i--){
		weight[result[i]]=30-5*i;
		if(result[i]=="food_ana"){
				sum_parents[0] = weight[result[i]]*(food_temp/(foodcount[0]+foodcount[1]));
			for(j=0;j<foodleft.length;j++){
				if(foodleft[j]>foodright[j])
					sum_child[0]+=foodright[j]*2;
				else
					sum_child[0]+=foodleft[j]*2;
			}
			food_single=(sum_child[0]/(foodcount[0]+foodcount[1]));
			sum_child[0]=weight[result[i]]*(sum_child[0]/(foodcount[0]+foodcount[1]));
			if(isNaN(food_single))
				food_single=0;
			if(isNaN(sum_child[0]))
				sum_child[0]=0;
			if((foodcount[0]+foodcount[1])==0)
				sum_parents[0]=0;
			if(left_id==right_id){
				if(isNaN(sum_child[0]))
					sum_child[0]=weight[result[i]];
				if((foodcount[0]+foodcount[1])==0)
					sum_parents[0]=weight[result[i]];
			}
		}
		else if(result[i]=="sport_ana"){
				sum_parents[1] = weight[result[i]]*(sport_temp/(sportcount[0]+sportcount[1]));
			for(j=0;j<sportleft.length;j++){
				if(sportleft[j]>sportright[j])
					sum_child[1]+=sportright[j]*2;
				else
					sum_child[1]+=sportleft[j]*2;
			}
			sport_single=(sum_child[1]/(sportcount[0]+sportcount[1]));
			sum_child[1]=weight[result[i]]*(sum_child[1]/(sportcount[0]+sportcount[1]));
			if(isNaN(sport_single))
				sport_single=0;
			if(isNaN(sum_child[1]))
				sum_child[1]=0;
			if((sportcount[0]+sportcount[1])==0)
				sum_parents[1]=0;
			if(left_id==right_id){
				if(isNaN(sum_child[1]))
					sum_child[1]=weight[result[i]];;
				if((sportcount[0]+sportcount[1])==0)
					sum_parents[1]=weight[result[i]];
			}
		}
		else if(result[i]=="activity_ana"){
				sum_parents[2] = weight[result[i]]*(activity_temp/(activitycount[0]+activitycount[1]));
			for(j=0;j<activityleft.length;j++){
				if(activityleft[j]>activityright[j])
					sum_child[2]+=activityright[j]*2;
				else
					sum_child[2]+=activityleft[j]*2;
			}
			activity_single=(sum_child[2]/(activitycount[0]+activitycount[1]));
			sum_child[2]=weight[result[i]]*(sum_child[2]/(activitycount[0]+activitycount[1]));
			if(isNaN(activity_single))
				activity_single=0;
			if(isNaN(sum_child[2]))
				sum_child[2]=0;
			if((activitycount[0]+activitycount[1])==0)
				sum_parents[2]=0;
			if(left_id==right_id){
				if(isNaN(sum_child[2]))
					sum_child[2]=weight[result[i]];
				if((activitycount[0]+activitycount[1])==0)
					sum_parents[2]=weight[result[i]];
			}
		}
		else if(result[i]=="pet_ana"){
				sum_parents[3] = weight[result[i]]*(pet_temp/(petcount[0]+petcount[1]));
			for(j=0;j<petleft.length;j++){
				if(petleft[j]>petright[j])
					sum_child[3]+=petright[j]*2;
				else
					sum_child[3]+=petleft[j]*2;
			}
			pet_single=(sum_child[3]/(petcount[0]+petcount[1]));
			sum_child[3]=weight[result[i]]*(sum_child[3]/(petcount[0]+petcount[1]));
			if(isNaN(pet_single))
				pet_single=0;
			if(isNaN(sum_child[3]))
				sum_child[3]=0;
			if((petcount[0]+petcount[1])==0)
				sum_parents[3]=0;
			if(left_id==right_id){
				if(isNaN(sum_child[3]))
				sum_child[3]=weight[result[i]];
				if((petcount[0]+petcount[1])==0)
				sum_parents[3]=weight[result[i]];
			}
		}
		else if(result[i]=="land_ana"){
			sum_parents[4] = weight[result[i]]*(land_temp/(landcount[0]+landcount[1]));
			for(j=0;j<landleft.length;j++){
				if(landleft[j]>landright[j])
					sum_child[4]+=landright[j]*2;
				else
					sum_child[4]+=landleft[j]*2;
			}
			land_single=(sum_child[4]/(landcount[0]+landcount[1]));
			sum_child[4]=weight[result[i]]*(sum_child[4]/(landcount[0]+landcount[1]));
			if(isNaN(land_single))
				land_single=0;
			if(isNaN(sum_child[4]))
				sum_child[4]=0;
			if((landcount[0]+landcount[1])==0)
				sum_parents[4]=0;
			if(left_id==right_id){
				if(isNaN(sum_child[4]))
				sum_child[4]=weight[result[i]];
				if((landcount[0]+landcount[1])==0)
				sum_parents[4]=weight[result[i]];
			}
		}
		
	}
	total_child=sum_child[0]+sum_child[1]+sum_child[2]+sum_child[3]+sum_child[4];
	total_parents=sum_parents[0]+sum_parents[1]+sum_parents[2]+sum_parents[3]+sum_parents[4];
	total=total_parents*0.4+total_child*0.6;
	showBar();
	if(total == 0)
		compare.animate(1*0.01);
	else
		compare.animate(total*0.01);
	foodbar.animate(food_single);
	sportbar.animate(sport_single);
	activitybar.animate(activity_single);
	petbar.animate(pet_single);
	landscapebar.animate(land_single);
	/*alert("Total_Parents: "+total_parents);
	alert("Total_Child: "+total_child);
	alert("Total: "+total);*/
	GPS_analysis();
}
/*GPS*/
function GPS_analysis(){
	var left_arry;
	var right_arry;
	left_arry=new Array(left_GPS.length);
	right_arry=new Array(right_GPS.length);
	
	var ana=new Array(22);
	var city = new Array(22);
	var area_mother={Taipei:0, Taoyuan:0, Keelung:0, New_Taipei:0, Hsinchu_City:0, Hsinchu_County:0,
					Miaoli_County:0, Taichung:0, Changhua_County:0, Yunlin_County:0, Chiayi_City:0,
					Chiayi_County:0, Tainan:0, Kaohsiung:0, Pingtung_County:0, Taitung_County:0,
					Hualien_County:0, Yilan_County:0, Nantou_County:0};
	var area_child = {Taipei:0, Taoyuan:0, Keelung:0, New_Taipei:0, Hsinchu_City:0, Hsinchu_County:0,
					Miaoli_County:0, Taichung:0, Changhua_County:0, Yunlin_County:0, Chiayi_City:0,
					Chiayi_County:0, Tainan:0, Kaohsiung:0, Pingtung_County:0, Taitung_County:0,
					Hualien_County:0, Yilan_County:0, Nantou_County:0};
					
	var area_lat = {Taipei:0, Taoyuan:0, Keelung:0, New_Taipei:0, Hsinchu_City:0, Hsinchu_County:0,
					Miaoli_County:0, Taichung:0, Changhua_County:0, Yunlin_County:0, Chiayi_City:0,
					Chiayi_County:0, Tainan:0, Kaohsiung:0, Pingtung_County:0, Taitung_County:0,
					Hualien_County:0, Yilan_County:0, Nantou_County:0};
	var area_lng = {Taipei:0, Taoyuan:0, Keelung:0, New_Taipei:0, Hsinchu_City:0, Hsinchu_County:0,
					Miaoli_County:0, Taichung:0, Changhua_County:0, Yunlin_County:0, Chiayi_City:0,
					Chiayi_County:0, Tainan:0, Kaohsiung:0, Pingtung_County:0, Taitung_County:0,
					Hualien_County:0, Yilan_County:0, Nantou_County:0};
	
	for(i=0;i<left_GPS.length;i++){
		left_arry[i]=false;
	}
	for(i=0;i<right_GPS.length;i++){
		right_arry[i]=false;
	}
	for(i=0;i<right_GPS.length;i++){
		area_mother[right_area[i]]++;
	}
	for(i=0;i<left_GPS.length;i++){
		area_mother[left_area[i]]++;
	}
	
	if(left_GPS.length<right_GPS.length){
		for(i=0;i<left_GPS.length;i++){
			for(j=0;j<right_GPS.length;j++){
				if(left_area[i]==right_area[j] && left_arry[i]== false && right_arry[j]==false){
					if(distanceInKmBetweenEarthCoordinates(left_GPS[i].lat, left_GPS[i].lng, right_GPS[j].lat, right_GPS[j].lng)<1){
						area_child[left_area[i]]+=2;
						left_arry[i]=true;
						right_arry[j]=true;
						area_lat[left_area[i]]+=left_GPS[i].lat+right_GPS[j].lat;
						area_lng[left_area[i]]+=left_GPS[i].lng+right_GPS[j].lng;
						break;
					}
				}
			}
		}
	}
	else{
		for(i=0;i<right_GPS.length;i++){
			for(j=0;j<left_GPS.length;j++){
				if(left_area[j]==right_area[i] && left_arry[j]== false && right_arry[i]==false){
					if(distanceInKmBetweenEarthCoordinates(left_GPS[j].lat, left_GPS[j].lng, right_GPS[i].lat, right_GPS[i].lng)<1){
						area_child[right_area[i]]+=2;
						left_arry[j]=true;
						right_arry[i]=true;
						area_lat[left_area[j]]+=left_GPS[j].lat+right_GPS[i].lat;
						area_lng[left_area[j]]+=left_GPS[j].lng+right_GPS[i].lng;
						break;
					}
				}
			}
		}
	}
	//alert("Child: "+ area_child["Taoyuan"]);
	//alert("Mother: "+ area_mother["Taoyuan"]);
	var area_ana = {Taipei:(area_child["Taipei"]/area_mother["Taipei"]), Taoyuan:(area_child["Taoyuan"]/area_mother["Taoyuan"]), 
					Keelung:(area_child["Keelung"]/area_mother["Keelung"]), New_Taipei:(area_child["New_Taipei"]/area_mother["New_Taipei"]), 
					Hsinchu_City:(area_child["Hsinchu_City"]/area_mother["Hsinchu_City"]), Hsinchu_County:(area_child["Hsinchu_County"]/area_mother["Hsinchu_County"]),
					Miaoli_County:(area_child["Miaoli_County"]/area_mother["Miaoli_County"]), Taichung:(area_child["Taichung"]/area_mother["Taichung"]), 
					Changhua_County:(area_child["Changhua_County"]/area_mother["Changhua_County"]), Yunlin_County:(area_child["Yunlin_County"]/area_mother["Yunlin_County"]), 
					Chiayi_City:(area_child["Chiayi_City"]/area_mother["Chiayi_City"]),Chiayi_County:(area_child["Chiayi_County"]/area_mother["Chiayi_County"]), 
					Tainan:(area_child["Tainan"]/area_mother["Tainan"]), Kaohsiung:(area_child["Kaohsiung"]/area_mother["Kaohsiung"]), 
					Pingtung_County:(area_child["Pingtung_County"]/area_mother["Pingtung_County"]), Taitung_County:(area_child["Taitung_County"]/area_mother["Taitung_County"]),
					Hualien_County:(area_child["Hualien_County"]/area_mother["Hualien_County"]), Yilan_County:(area_child["Yilan_County"]/area_mother["Yilan_County"]), 
					Nantou_County:(area_child["Nantou_County"]/area_mother["Nantou_County"])};
	for(var key in area_ana){
		if(isNaN(area_ana[key]))
			area_ana[key]=0;
	}
	
	var area_gps_lat = {Taipei:(area_lat["Taipei"]/area_child["Taipei"]), Taoyuan:(area_lat["Taoyuan"]/area_child["Taoyuan"]), 
					Keelung:(area_lat["Keelung"]/area_child["Keelung"]), New_Taipei:(area_lat["New_Taipei"]/area_child["New_Taipei"]), 
					Hsinchu_City:(area_lat["Hsinchu_City"]/area_child["Hsinchu_City"]), Hsinchu_County:(area_lat["Hsinchu_County"]/area_child["Hsinchu_County"]),
					Miaoli_County:(area_lat["Miaoli_County"]/area_child["Miaoli_County"]), Taichung:(area_lat["Taichung"]/area_child["Taichung"]), 
					Changhua_County:(area_lat["Changhua_County"]/area_child["Changhua_County"]), Yunlin_County:(area_lat["Yunlin_County"]/area_child["Yunlin_County"]), 
					Chiayi_City:(area_lat["Chiayi_City"]/area_child["Chiayi_City"]),Chiayi_County:(area_lat["Chiayi_County"]/area_child["Chiayi_County"]), 
					Tainan:(area_lat["Tainan"]/area_child["Tainan"]), Kaohsiung:(area_lat["Kaohsiung"]/area_child["Kaohsiung"]), 
					Pingtung_County:(area_lat["Pingtung_County"]/area_child["Pingtung_County"]), Taitung_County:(area_lat["Taitung_County"]/area_child["Taitung_County"]),
					Hualien_County:(area_lat["Hualien_County"]/area_child["Hualien_County"]), Yilan_County:(area_lat["Yilan_County"]/area_child["Yilan_County"]), 
					Nantou_County:(area_lat["Nantou_County"]/area_child["Nantou_County"])};
	var area_gps_lng = {Taipei:(area_lng["Taipei"]/area_child["Taipei"]), Taoyuan:(area_lng["Taoyuan"]/area_child["Taoyuan"]), 
					Keelung:(area_lng["Keelung"]/area_child["Keelung"]), New_Taipei:(area_lng["New_Taipei"]/area_child["New_Taipei"]), 
					Hsinchu_City:(area_lng["Hsinchu_City"]/area_child["Hsinchu_City"]), Hsinchu_County:(area_lng["Hsinchu_County"]/area_child["Hsinchu_County"]),
					Miaoli_County:(area_lng["Miaoli_County"]/area_child["Miaoli_County"]), Taichung:(area_lng["Taichung"]/area_child["Taichung"]), 
					Changhua_County:(area_lng["Changhua_County"]/area_child["Changhua_County"]), Yunlin_County:(area_lng["Yunlin_County"]/area_child["Yunlin_County"]), 
					Chiayi_City:(area_lng["Chiayi_City"]/area_child["Chiayi_City"]),Chiayi_County:(area_lng["Chiayi_County"]/area_child["Chiayi_County"]), 
					Tainan:(area_lng["Tainan"]/area_child["Tainan"]), Kaohsiung:(area_lat["Kaohsiung"]/area_lng["Kaohsiung"]), 
					Pingtung_County:(area_lng["Pingtung_County"]/area_child["Pingtung_County"]), Taitung_County:(area_lng["Taitung_County"]/area_child["Taitung_County"]),
					Hualien_County:(area_lng["Hualien_County"]/area_child["Hualien_County"]), Yilan_County:(area_lng["Yilan_County"]/area_child["Yilan_County"]), 
					Nantou_County:(area_lng["Nantou_County"]/area_child["Nantou_County"])};
	for(var key in area_gps_lat){
		if(isNaN(area_gps_lat[key]))
			area_gps_lat[key]=-1;
	}
	for(var key in area_gps_lng){
		if(isNaN(area_gps_lng[key]))
			area_gps_lng[key]=-1;
	}
	/*-------------------*/
	twenty_circle = [];
	forty_circle = [];
	sixty_circle = [];
	eighty_circle = [];
	hundred_circle = [];
	var circle_color;
	/*-------------------*/	
	for(var key in area_gps_lat){
		if(area_gps_lng[key]==-1 || area_gps_lat[key]==-1)
			continue;
		if(area_ana[key]<=1 && area_ana[key]>0.8){
			circle_color = "#DB5D81";
		}
		else if(area_ana[key]<=0.8 && area_ana[key]>0.6){
			circle_color = "#27A7B1";
		}
		else if(area_ana[key]<=0.6 && area_ana[key]>0.4){
			circle_color = "#83C039";
		}
		else if(area_ana[key]<=0.4&& area_ana[key]>0.2){
			circle_color = "#F29336";
		}
		else if(area_ana[key]<=0.2 && area_ana[key]>0){
			circle_color = "#EBCE50";
		}
		var populationOptionsAgain = {
		  strokeColor: "#c4c4c4",
		  strokeOpacity: 0.35,
		  strokeWeight: 0,
		  fillColor: circle_color,
		  fillOpacity: 0.7,
		  map: map,
		  center: {lat: area_gps_lat[key], lng: area_gps_lng[key]}, 
		  radius: area_ana[key]*20000
		};
		var cityCircle = new google.maps.Circle(populationOptionsAgain);
		area_Circle.push(cityCircle);
		
		
		
		if(area_ana[key]<=1 && area_ana[key]>0.8){
			hundred_circle.push(cityCircle);
		}
		else if(area_ana[key]<=0.8 && area_ana[key]>0.6){
			eighty_circle.push(cityCircle);
		}
		else if(area_ana[key]<=0.6 && area_ana[key]>0.4){
			sixty_circle.push(cityCircle);
		}
		else if(area_ana[key]<=0.4&& area_ana[key]>0.2){
			forty_circle.push(cityCircle);
		}
		else if(area_ana[key]<=0.2 && area_ana[key]>0){
			twenty_circle.push(cityCircle);
		}
		
	}
	//hundred_circle.push(0);
	circle_range = {twenty: twenty_circle, forty: forty_circle, sixty: sixty_circle, eighty: eighty_circle, hundred: hundred_circle};
	//circle_range.hundred[0].setMap(null);
	
}
var twenty_click = false;
var forty_click = false;
var sixty_click = false;
var eighty_click = false;
var hundred_click = false;
function twenty_range(){
	if(!twenty_click){
		for(i = 0;i<circle_range.twenty.length;i++)
			circle_range.twenty[i].setMap(null);
		twenty_click = true;
	}
	else{
		for(i = 0;i<circle_range.twenty.length;i++)
			circle_range.twenty[i].setMap(map);
		twenty_click = false;
	}
}
function forty_range(){
	if(!forty_click){
		for(i = 0;i<circle_range.forty.length;i++)
			circle_range.forty[i].setMap(null);
		forty_click = true;
	}
	else{
		for(i = 0;i<circle_range.forty.length;i++)
			circle_range.forty[i].setMap(map);
		forty_click = false;
	}
	
}
function sixty_range(){
	if(!sixty_click){
		for(i = 0;i<circle_range.sixty.length;i++)
			circle_range.sixty[i].setMap(null);
		sixty_click = true;
	}
	else{
		for(i = 0;i<circle_range.sixty.length;i++)
			circle_range.sixty[i].setMap(map);
		sixty_click = false;
	}
	
}
function eighty_range(){
	if(!eighty_click){
		for(i = 0;i<circle_range.eighty.length;i++)
			circle_range.eighty[i].setMap(null);
		eighty_click = true;
	}
	else{
		for(i = 0;i<circle_range.eighty.length;i++)
			circle_range.eighty[i].setMap(map);
		eighty_click = false;
	}
	
}
function hundred_range(){
	if(!hundred_click){
		for(i = 0;i<circle_range.hundred.length;i++)
			circle_range.hundred[i].setMap(null);
		hundred_click = true;
	}
	else{
		for(i = 0;i<circle_range.hundred.length;i++)
			circle_range.hundred[i].setMap(map);
		hundred_click = false;
	}
	
}


function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}

function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
  var earthRadiusKm = 6371;

  var dLat = degreesToRadians(lat2-lat1);
  var dLon = degreesToRadians(lon2-lon1);

  lat1 = degreesToRadians(lat1);
  lat2 = degreesToRadians(lat2);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return earthRadiusKm * c;
}


function getdata(table){
	google.charts.load('current', {packages: ['corechart', 'bar']});
	google.charts.setOnLoadCallback(drawfoodchart);
	function drawfoodchart() {
			var mychartdata;
			$.ajax({
				type: 'GET',
				url:"food_column.php",
				dataType: 'json',
				data: {
					idone: left_id,
					idtwo: right_id,
					table_name: table
				},
				success: function (data){
						/*mychartdata = new google.visualization.DataTable();
						mychartdata.addColumn('string', table);
						mychartdata.addColumn('number', left_name.toString());
						mychartdata.addColumn('number', right_name.toString());
						mychartdata.addRows(data.length);*/
						for(i=0; i < data.length; i++) {
							var j = 0;
							/*mychartdata.setCell(i, j, data[i][0]);
							mychartdata.setCell(i, j+1, data[i][1]);
							mychartdata.setCell(i, j+2, data[i][2]);*/
							if(table=="food"){
								foodcloumn.push(data[i][0]);
								foodcount[0]+= parseInt(data[i][1]);
								foodcount[1]+= parseInt(data[i][2]);
								foodleft.push(parseInt(data[i][1]));
								foodright.push(parseInt(data[i][2]));
								all+=foodcount[0]+foodcount[1];
							}
							else if(table=="sport") {
								sportcloumn.push(data[i][0]);
								sportcount[0]+= parseInt(data[i][1]);
								sportcount[1]+= parseInt(data[i][2]);
								sportleft.push(parseInt(data[i][1]));
								sportright.push(parseInt(data[i][2]));
								all+=sportcount[0]+sportcount[1];
							}
							else if(table=="activity") {
								activitycloumn.push(data[i][0]);
								activitycount[0]+= parseInt(data[i][1]);
								activitycount[1]+= parseInt(data[i][2]);
								activityleft.push(parseInt(data[i][1]));
								activityright.push(parseInt(data[i][2]));
								all+=activitycount[0]+activitycount[1];
							}
							else if(table=="pet") {
								petcloumn.push(data[i][0]);
								petcount[0]+= parseInt(data[i][1]);
								petcount[1]+= parseInt(data[i][2]);
								petleft.push(parseInt(data[i][1]));
								petright.push(parseInt(data[i][2]));
								all+=petcount[0]+petcount[1];
							}
							else if(table="landscape"){
								landcloumn.push(data[i][0]);
								landcount[0]+= parseInt(data[i][1]);
								landcount[1]+= parseInt(data[i][2]);
								landleft.push(parseInt(data[i][1]));
								landright.push(parseInt(data[i][2]));
								all+=landcount[0]+landcount[1];
							}
								
						}
						if(table=="food")
							food_finish = true;
						else if(table=="sport")
							sport_finish = true;
						else if(table=="activity")
							activity_finish = true;
						else if (table=="pet")
							pet_finish = true;
						else if(table=="landscape")
							land_finish = true;
					
							
						
						var options = {
							height: 600,
							backgroundColor: { fill:'transparent' },
							chart: {
								//title: 'Year-by-year coffee consumption',
								//subtitle: 'This data is not real'
							}
						};
						// Instantiate and draw our chart, passing in some options.
						/*var chart = new google.charts.Bar(document.getElementById(div_id));
						chart.draw(mychartdata, google.charts.Bar.convertOptions(options));*/
				},
				error: function(){
					window.alert("Failed~!!");
				}
			}); 
			
	}
}
