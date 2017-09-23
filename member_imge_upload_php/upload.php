<?php
 
 require_once('dbConnect.php');
 if ($con) {
	echo "connect ";
	
 }
 if($_SERVER['REQUEST_METHOD']=='POST'){

	 $pic_id = $_POST['pic_id'];
	 $image = $_POST['image'];
	 $lat = (float)$_POST['lat'];
	 $lon = (float)$_POST['lon'];
	 $time = $_POST['time'];
	 
	 $time = strtotime($time);
	 
			
	 $fb_name = $_POST['fb_name'];
	 $fb_id = $_POST['fb_id'];
	 $fb_image_url = $_POST['fb_image_url'];
	
	 
	 

	$newformat = date('Y-m-d:H:i:s',$time);

	echo $newformat;
	 
	 
	 $filename_path = md5(time().uniqid()).".jpg"; 
	 $decoded=base64_decode($image); 
	 
	 set_include_path(get_include_path() . PATH_SEPARATOR . 'phpseclib');
	 include('Net/SSH2.php');
	 $ssh = new Net_SSH2('140.138.77.124', 22);
	
	 if (!$ssh->login('root', 'shUHv3$3')) {
	 	exit('Login Failed');
	 }
	
	 echo $ssh->exec('mkdir -p /var/www/html/test/java-docs-samples-master/vision/cloud-client/resources ');
	 echo $ssh->exec('chmod o+w /var/www/html/test/java-docs-samples-master/vision/cloud-client/resources');
	 
	 if( !@file_put_contents("/var/www/html/test/java-docs-samples-master/vision/cloud-client/resources/" . $filename_path,$decoded));
	 {
		 $error = error_get_last();
			echo $error['message'];
	 } 
	 $picture_file = "http://140.138.77.124/test/java-docs-samples-master/vision/cloud-client/resources/" . $filename_path;

	 $sql = "INSERT INTO picture(fb_id, picture, time, lat, lon) VALUES('$fb_id', '$picture_file', '$newformat', $lat, $lon)";
	 
	 $con->query("set character set 'utf8'");
	 if ($con->query($sql) === TRUE) {
		echo "New record created successfully";
	 } else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	 }
	 $local_pic_file = "./resources/" . $filename_path;
	 echo $local_pic_file;
	 

	 //$para = "./resources/281eda67d1711e25a69a42dfa843e532.jpg" . " 123";
	 $para = $local_pic_file . " ". $fb_id;
	 echo $ssh->exec('export PATH=/opt/apache-maven-3.5.0/bin:$PATH; export GOOGLE_APPLICATION_CREDENTIALS=/var/www/html/test/googlecloudvision-2d676e3cdba7.json; cd /var/www/html/test/java-docs-samples-master/vision/cloud-client;' . " mvn exec:java -Dexec.mainClass=com.example.vision.Detect \-DpropertyName=propertyValue \-Dexec.args='$para'");
 
	
	echo "success\n";
 }
else
	echo "not post";

 
 ?>