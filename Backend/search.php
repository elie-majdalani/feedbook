<?php
include("connection.php");

$name = $_GET["searchValue"];
$id = $_GET["user_id"];


$query = $mysqli->prepare("SELECT users.*,relationships.relation FROM users LEFT JOIN relationships on users.id = relationships.friend_id AND relationships.user_id=? WHERE (users.id != ? OR users.id = NULL) AND users.id NOT IN ( SELECT relationships.friend_id FROM relationships WHERE relationships.user_id = ? AND relationships.relation = '-1') AND (users.username LIKE CONCAT('%',?,'%')  OR users.full_name LIKE CONCAT('%',?,'%') OR users.email LIKE CONCAT('%',?,'%'));");
$query->bind_param("iiisss", $id,$id,$id,$name,$name,$name);
$query->execute();
$array = $query->get_result();
$response = [];
while($toget = $array->fetch_assoc()){
    $response[] = $toget;
} 
$json = json_encode($response);
echo $json;

?>
