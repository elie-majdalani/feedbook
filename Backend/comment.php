<?php
include("connection.php");
$text=$_GET["text"];
$user_id=$_GET["user_id"];
$post_id=$_GET["post_id"];


$query = $mysqli->prepare("INSERT INTO comments (text, user_id, post_id) VALUES (?, ?, ?)");
$query->bind_param("sii", $text, $user_id, $post_id);
$query->execute();
?>