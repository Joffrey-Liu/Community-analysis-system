<?php
	include("DBClass.php");
	$objDB = new DBClass();

	//$date = $_POST['date'];
	$GPSset = array();
	$sumGPS = 0;

	$sql = "SHOW COLUMNS FROM ".$_GET[table_name].";";
	$sql2 = "select * from ".$_GET[table_name]." where fb_id = '".$_GET[idone]."'";
	$sql3 = "select * from ".$_GET[table_name]." where fb_id = '".$_GET[idtwo]."'";
	
	$rs = $objDB->Recordset($sql);
	$row = $objDB->GetRows($rs);
	$dataCount = $objDB->RecordCount($rs);
	
	$rs2 = $objDB->Recordset($sql2);
	$row2 = $objDB->GetRows($rs2);
	$dataCount2 = $objDB->RecordCount($rs2);

	$rs3 = $objDB->Recordset($sql3);
	$row3 = $objDB->GetRows($rs3);
	$dataCount3 = $objDB->RecordCount($rs3);
	
	for($i=2; $i<$dataCount; $i++)
	{
		if($row2[0][$row[$i]['Field']] == 0 && $row3[0][$row[$i]['Field']] == 0)
			continue;
		$GPSset[$sumGPS] = array($row[$i]['Field'],$row2[0][$row[$i]['Field']],$row3[0][$row[$i]['Field']]);
		$sumGPS++;
	}


	echo json_encode($GPSset);
?>