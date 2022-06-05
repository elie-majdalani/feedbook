<?php
include("connection.php");
$id=$_GET["post_id"];

$query = $mysqli->prepare("DELETE FROM posts WHERE id = ?");
$query->bind_param("i", $id);
$query->execute();
?>