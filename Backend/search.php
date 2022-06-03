<?php
include("connection.php");

$name = $_GET["name"];


$query = $mysqli->prepare("SELECT * FROM users where (username LIKE concat('%',?,'%') OR full_name LIKE concat('%',?,'%') OR email LIKE ?)");

//SELECT r.name , r.id , cu.cuisine,u.email, c.review, c.date from restaurants as r INNER JOIN comments c on r.id=c.restaurants_id INNER join users u on u.id=c.users_id INNER JOIN restaurant_has_cuisines rhc on r.id= rhc.restaurant_id INNER JOIN cuisines cu on rhc.cuisine_id = cu.id where r.id=2 GROUP by cu.cuisine;

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
