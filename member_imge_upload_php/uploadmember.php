<?php
 
 require_once('dbConnect.php');
 if ($con) {
	echo "connect ";
	
 }
 
 if($_SERVER['REQUEST_METHOD']=='POST'){
	$fb_name = $_POST['fb_name'];
	$fb_id = $_POST['fb_id'];
	$fb_image_url = $_POST['fb_image_url'];
	echo  $fb_name . " " .  $fb_id . " " . $fb_image_url . "\n";
	echo "~~~~~~~~~~~~~~~\n";
	$sql = "INSERT INTO member(name, fb_id, picture) VALUES('$fb_name', '$fb_id', '$fb_image_url')";
	$con->query("set character set 'utf8'");
	if($con->query("set names 'utf8'")===TRUE)
		echo "chiness\n";
	else
		echo "englisg\n";
	
	 if ($con->query($sql) === TRUE) {
		echo "New record created successfully in member";
	 } else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	 }
	 
	 $sql = "INSERT INTO food(fb_id) VALUES('$fb_id')";
	 if ($con->query($sql) === TRUE) {
		echo "New record created successfully in food";
	 } else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	 }
	 
	 $sql = "INSERT INTO sport(fb_id) VALUES('$fb_id')";
	 if ($con->query($sql) === TRUE) {
		echo "New record created successfully in sport";
	 } else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	 }
	 
	 $sql = "INSERT INTO activity(fb_id) VALUES('$fb_id')";
	 if ($con->query($sql) === TRUE) {
		echo "New record created successfully in food";
	 } else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	 }
	 
 }
 else
	echo "not post";
 ?>