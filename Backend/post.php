<?php
include("connection.php");
$img=$_GET["img"];
$text=$_GET["text"];
$id=$_GET["user_id"];

$query = $mysqli->prepare("INSERT INTO posts (img, text) VALUES (?, ?)where user_id = ?");
$query->bind_param("ssi", $img, $text, $id);
$query->execute();

?>