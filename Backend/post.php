<?php
include("connection.php");
$img=$_GET["img"];
$text=$_GET["text"];
$id=$_GET["user_id"];

$query = $mysqli->prepare("INSERT INTO posts (image, text, user_id) VALUES (?, ?, ?) ");
$query->bind_param("ssi", $img, $text, $id);
$query->execute();
?>