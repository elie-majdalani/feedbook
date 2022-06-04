<?php
$id=$_get["post_id"];

$query = $mysqli->prepare("DELETE FROM posts WHERE id = ?");
$query->bind_param("i", $id);
$query->execute();

?>