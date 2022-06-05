<?php
include("connection.php");
$id=$_GET["user_id"];

$query = $mysqli->prepare("select * from posts where user_id = ?");
$query->bind_param("i", $id);
$query->execute();
$result = $query->get_result();
$jason= array();
while($row = $result->fetch_assoc()){
    $jason[] = $row;
}
echo json_encode($jason);
?>