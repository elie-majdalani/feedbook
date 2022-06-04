<?php
include("connection.php");

$user_id = $_GET["user_id"];
$post_id = $_GET["post_id"];

$query = $mysqli->prepare("SELECT * FROM likes WHERE user_id = ? AND post_id = ?");
$query->bind_param("ii", $user_id, $post_id);
$query->execute();
$result = $query->get_result();
if ($result->num_rows == 0) {
    $query = $mysqli->prepare("INSERT INTO likes (user_id, post_id) VALUES (?, ?)");
    $query->bind_param("ii", $user_id, $post_id);
    $query->execute();
} else {
    $query = $mysqli->prepare("DELETE FROM likes WHERE user_id = ? AND post_id = ?");
    $query->bind_param("ii", $user_id, $post_id);
    $query->execute();
}


?>