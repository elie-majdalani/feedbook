<?php
include("connection.php");

$user_id = $_GET["input"];

$query = $mysqli->prepare("SELECT relationships.*,users.full_name FROM relationships INNER JOIN users ON users.id = relationships.friend_id WHERE relationships.user_id = ?;");
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