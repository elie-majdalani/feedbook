<?php
include("connection.php");
$id=$_get["post_id"];

$query= $mysqli->prepare("select count(*) as likes from likes where post_id = ?");
$query->bind_param("i", $id);
$query->execute();
$result = $query->get_result();
$jason= array();
while($row = $result->fetch_assoc()){
    $jason[] = $row;
}
echo json_encode($jason);

?>