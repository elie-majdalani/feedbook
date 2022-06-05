<?php
include("connection.php");

$user_id = $_GET["id"];
$friend_id = $_GET["friend_id"];
$query = $mysqli->prepare("delete from relationships WHERE (friend_id = ? and user_id = ?) OR (friend_id = ? and user_id = ?)");
$query->bind_param("iiii", $friend_id, $user_id, $user_id, $friend_id);
$query->execute();
?>