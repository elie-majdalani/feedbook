<?php
include("connection.php");

$user_id = $_GET["user_id"];
$query = $mysqli->prepare("select * FROM users WHERE id = ?");
$query->bind_param("i", $user_id);
$query->execute();
$result = $query->get_result();
$json = json_encode($result->fetch_assoc());
echo $json;

?>