<?php
include("connection.php");
$id=$_GET["post_id"];

$query = $mysqli->prepare("SELECT c.comment, u.full_name, u.profile_pic FROM comments c INNER join users u on u.id = c.user_id WHERE c.post_id = ? ORDER BY c.id DESC");
$query->bind_param("i", $id);
$query->execute();
$result = $query->get_result();
$jason= array();
while($row = $result->fetch_assoc()){
    $jason[] = $row;
}
echo json_encode($jason);
?>