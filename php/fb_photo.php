<?php
$conn = mysqli_connect("35.187.154.90","root","Bigdata") or die("fuckyou");
mysqli_query($conn, "SET NAMES 'utf8'");
mysqli_select_db($conn, "bigdata");
//mysqli_query($conn, "insert into member (name, fb_id, picture) values ('林振宏', 'fuck', 'you')");
$result = mysqli_query($conn, "select * from member;");
$count =0;
$idcount =0;
echo "<table>";

while($row = mysqli_fetch_assoc($result)){
	$image = $row["picture"];
	if($count == 0)
		echo '<tr>';
	echo '<td>';
	echo '<div class="item active">';
	echo '<div class="slidecontainer">';
	echo '<a href="#" role="button">';
	echo '<img src="'.$image.'" class="fbimage" style="width:100%;" id="'.$idcount.'" onClick=\'pick('.$idcount.')\'>';
	echo '<div class="fbmiddle">';
	echo '<button type="button" class="btn btn-info btn-circle btn-lg" onClick=\'pick('.$idcount.')\'>Hit</button>';
	echo '</div>';
	echo '</a>';
	echo '</div>';
	echo '</div>';		
	echo '</td>';
	if($count == 2){
		echo '</tr>';
	}
	$idcount = $idcount+1;
	$count = $count+1;
	if($count>2)
		$count = 0;
}

		echo '</tr>';
		echo "</table>";
?>
<meta charset="utf-8">

		