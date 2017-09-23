<?php
	include("DBClass.php");
	$objDB = new DBClass();

	//$date = $_POST['date'];
	$GPSset = array();
	$sumGPS = 0;
	$lat = "";
	$lon = "";
	$speed = "";
	
	//$sql = "select * from taxi_rawdata where time > '".$_GET['pre_time']."' and time < '".$_GET['now_time']."' order by carno, time asc;";
	$sql = "select * from picture where fb_id = '".$_GET[fb_id]."'";

	$rs = $objDB->Recordset($sql);
	$row = $objDB->GetRows($rs);
	$dataCount = $objDB->RecordCount($rs);

	
	for($i=0; $i<$dataCount; $i++)
	{
		//$GPSset[$sumGPS] = array($row[$i]['CarNo'], $row[$i]['Time'], $row[$i]['lat'], $row[$i]['lon'], $row[$i]['speed']);
		$GPSset[$sumGPS] = array($row[$i]['picture'],$row[$i]['lat'],$row[$i]['lon'],$row[$i]['area']);
		$sumGPS++;
	}


	echo json_encode($GPSset);
?>