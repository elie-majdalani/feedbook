<?php
include("connection.php");

$user_id = $_GET["user_id"];
$post_id = $_GET["post_id"];

$query = $mysqli->prepare("SELECT * FROM likes WHERE user_id = ? AND post_id = ?");
$query->bind_param("ii", $user_id, $post_id);
$query->execute();
$result = $query->get_result();
if ($result->num_rows == 0) {
    echo "0";
} else {
    echo "1";
}

?>