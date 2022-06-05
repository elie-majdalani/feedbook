<?php
include("connection.php");
$id=$_GET["user_id"];

$query = $mysqli->prepare("select posts.id,posts.image,posts.text,users.full_name from posts INNER JOIN users ON posts.user_id = users.id where users.id=?;");
$query->bind_param("i", $id);
$query->execute();
$result = $query->get_result();
$jason= array();
while($row = $result->fetch_assoc()){
    $jason[] = $row;
}
echo json_encode($jason);
?>