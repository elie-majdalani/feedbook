<?php
include("connection.php");

$user_id = $_GET["user_id"];
$friend_id = $_GET["friend_id"];
$query = $mysqli->prepare("select relation FROM relationships WHERE friend_id =? and user_id = ?");
$query->bind_param("ii", $friend_id, $user_id);
$query->execute();
$result = $query->get_result();
$json = json_encode($result->fetch_assoc());
echo $json;

?>