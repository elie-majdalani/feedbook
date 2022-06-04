<?php
$img=$_get["img"];
$text=$_get["text"];
$id=$_get["user_id"];

$query = $mysqli->prepare("INSERT INTO posts (img, text) VALUES (?, ?)where user_id = ?");
$query->bind_param("ssi", $img, $text, $id);
$query->execute();

?>