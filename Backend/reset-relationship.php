<?php
include("connection.php");

$user_id = $_GET["id"];
$friend_id = $_GET["friend_id"];
$query = $mysqli->prepare("UPDATE relationships SET relation= 0 WHERE friend_id = ? and user_id = ?");
$query->bind_param("ii", $friend_id, $user_id);
$query->execute();
?>