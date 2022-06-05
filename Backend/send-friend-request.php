<?php
include("connection.php");

$user_id = $_GET["id"];
$friend_id = $_GET["friend_id"];

$query = $mysqli->prepare("SELECT * FROM relationships WHERE user_id = ? and friend_id = ? AND relation = 0");
$query->bind_param("ii", $user_id, $friend_id);
$query->execute();
$query->store_result();
$num_rows = $query->num_rows;
$query->fetch();
$response = [];

if($num_rows == 1){
    $query = $mysqli->prepare("UPDATE relationships SET relation= 1 WHERE friend_id = ? and user_id = ?");
    $query->bind_param("ii", $friend_id, $user_id);
    $query->execute();
    $query = $mysqli->prepare("INSERT INTO relationships (friend_id, user_id, relation)VALUES( ? , ? , 1)");
    $query->bind_param("ii",$user_id, $friend_id);
    $query->execute();
}else{
    $query = $mysqli->prepare("INSERT INTO relationships (friend_id, user_id, relation)VALUES( ? , ? , 0)");
    $query->bind_param("ii", $friend_id, $user_id);
    $query->execute();
}

?>