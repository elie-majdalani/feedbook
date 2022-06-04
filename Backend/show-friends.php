<?php
include("connection.php");

$user_id = $_GET["input"];

$query = $mysqli->prepare("SELECT relationship.*,users.full_name FROM relationship INNER JOIN users ON users.id = relationship.friend_id WHERE relationship.user_id = ?;");
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