<?php
include("connection.php");
$id=$_GET["user_id"];

$query = $mysqli->prepare("select friend_id from relationships where relation=1 and user_id = ?");
$query->bind_param("i", $id);
$query->execute();
// get the ids from the above query and place it in an array of ids
$query->bind_result($friend_id);
$ids = array();
while($query->fetch()) {
    $ids[] = $friend_id;
}
$ids=implode(",",$ids);
$query = $mysqli->prepare("select posts.id,posts.image,posts.text,users.full_name from posts INNER JOIN users ON posts.user_id = users.id where users.id in (?);");
$query->bind_param("s", $ids);
$query->execute();
$result = $query->get_result();
$jason= array();
while($row = $result->fetch_assoc()){
    $jason[] = $row;
}
echo json_encode($jason);
?>