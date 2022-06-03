<?php
include("connection.php");

$user_id = $_GET["id"];
$friend_id = $_GET["friend_id"];
$query = $mysqli->prepare("UPDATE relationship SET relation= 1 WHERE friend_id = ? and user_id = ?");
$query->bind_param("ii", $friend_id, $user_id);
$query->execute();
$query = $mysqli->prepare("INSERT INTO relationship (friend_id, user_id, relation)VALUES( ? , ? , 1)");
$query->bind_param("ii",$user_id, $friend_id);
$query->execute();
?>