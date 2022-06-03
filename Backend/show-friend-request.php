<?php
include("connection.php");

$user_id = $_GET["id"];


$query = $mysqli->prepare("SELECT users.username FROM relationship INNER JOIN users ON users.id = friend_id WHERE user_id = ? and relation = 0");
$query->bind_param("i", $user_id);
$query->execute();
$array = $query->get_result();
$response = [];
while($toget = $array->fetch_assoc()){
    $response[] = $toget;
} 
$json = json_encode($response);
echo $json;

?>