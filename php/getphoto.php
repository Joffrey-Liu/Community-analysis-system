<?php
$conn = mysqli_connect("35.187.154.90","root","Bigdata");
mysqli_query($conn, "SET NAMES 'utf8'");
mysqli_select_db($conn, "bigdata");
$result = mysqli_query($conn, "select * from picture;");
while($row = mysqli_fetch_assoc($result)){
	$image = $row["picture"];
    echo '<div class="myitem">';
    echo '<img src="'.$image.'" itemprop="thumbnail" alt="Image description" onClick=\'alert('.$count.')\' />';
	echo "</div>";
}
?>
<meta charset="utf-8">