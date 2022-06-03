<?php
include("connection.php");
$username_signup = $_GET['user_name'];
$email_signup = $_GET["user_email"];
$fullName = $_GET["user_fullName"];
$password = hash("sha256", $_GET["user_pass"]);
$gender = $_GET["user_gender"];
$date = $_GET["user_date"];

$query = $mysqli->prepare("Select id from users where username = ? OR email = ?");
$query->bind_param("ss",$username, $email);
$query->execute();
$query->store_result();
$num_rows = $query->num_rows;
$query->fetch();
$response = [];

if($num_rows == 1){
    echo "used";
}else{
    $query = $mysqli->prepare("INSERT INTO users (username, password, full_name, email, gender, dob) VALUES (?, ?, ?, ?, ?, ?)");
    $query->bind_param("ssssss",$username_signup, $password, $fullName, $email_signup, $gender, $date);
    $query->execute();
    echo  "ok";  
}

?>