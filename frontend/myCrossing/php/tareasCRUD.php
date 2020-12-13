<?php

header('Access-Control-Allow-Origin: *');

$servername = "localhost";
$username   = "mcadmin";
$password   = "thisismypass";
$dbname     = "mycrossingdb";
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
  //echo "Connected successfully";

$action = $_REQUEST['action'];

if ($action == "create"){

}else if ($action == "delete"){

}else if ($action == "update"){
  $id = $_REQUEST['id'];
  $hecha = $_REQUEST['hecha'];

  $sql = "UPDATE tareas SET hecha = $hecha WHERE id = $id";

}

$result = mysqli_query($conn,$sql);

?>
