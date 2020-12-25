<?php

// Esto es para probar la BBDD, si mas adelante
// hace falta abrir y cerrar sesion, crear las funciones
// que estan en pipo.php para abrir y cerrar sesion
// mas info en marcadores

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
$json = file_get_contents('php://input');

$params = json_decode($json);
  //echo "Connected successfully";
$sql = "UPDATE usuarios SET verification = NULL WHERE id = '$params'";
$result = mysqli_query($conn,$sql);
mysqli_close($conn);
?>
