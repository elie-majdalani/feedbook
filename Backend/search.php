<?php
include("connection.php");

$name = $_GET["searchValue"];


$query = $mysqli->prepare("SELECT * FROM users u where (username LIKE concat('%',?,'%') OR full_name LIKE concat('%',?,'%') OR email LIKE ?)AND  u.id != (SELECT r.friend_id from users u INNER JOIN relationships r ON r.user_id = u.id WHERE r.relation =-1)");
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
