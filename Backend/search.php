<?php
include("connection.php");

$name = $_GET["name"];


$query = $mysqli->prepare("SELECT * FROM users where (username LIKE concat('%',?,'%') OR full_name LIKE concat('%',?,'%') OR email LIKE ?)");
$query->bind_param("sss", $name,$name,$name);
$query->execute();
$array = $query->get_result();
$response = [];
while($toget = $array->fetch_assoc()){
    $response[] = $toget;
} 
$json = json_encode($response);
echo $json;

?>
