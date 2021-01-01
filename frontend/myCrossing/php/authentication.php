<?php

// Esto es para probar la BBDD, si mas adelante
// hace falta abrir y cerrar sesion, crear las funciones
// que estan en pipo.php para abrir y cerrar sesion
// mas info en marcadores

header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Headers: *');

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
if(isset($_GET['command'])){
  switch($_GET['command']){
    case "setNull":
      $userId = $_GET['userId'];
      $sql = "UPDATE usuarios SET verification = NULL WHERE id = $userId";
      $result = mysqli_query($conn,$sql);
      break;

    case "setKey":
      if(isset($_GET['userId']) && isset($_GET['key'])){
      $userId = $_GET['userId'];
      $verif = $_GET['key'];
      $sql = "UPDATE usuarios SET verification = '$verif' WHERE id = $userId";
      $result = mysqli_query($conn,$sql);
      }else{
        print "No ha introducido id de usuario o key";
      }
      break;

    case "login":
        $sql = "SELECT nombre, contrasenya, id FROM usuarios";
        $result = mysqli_query($conn,$sql);
        $myArray = array();
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $myArray[] = $row;
            }
            print json_encode($myArray);
        }
        break;

    case "read":
      if(isset($_GET['userId'])){
        $userId = $_GET['userId'];
        $sql = "SELECT * FROM usuarios WHERE id = $userId";
        $result = mysqli_query($conn,$sql);
        $myArray = array();
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $myArray[] = $row;
            }
            print json_encode($myArray);
        }
      }else{
        print "No ha introducido id de usuario que leer";
      }
      break;

    case "readAll":
        $sql = "SELECT * FROM usuarios";
        $result = mysqli_query($conn,$sql);
            $myArray = array();
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    $myArray[] = $row;
                }
                print json_encode($myArray);
            }
            break;

    case "getKey":
      if(isset($_GET['userId'])){
        $userId = $_GET['userId'];
        $sql = "SELECT verification FROM usuarios WHERE id = $userId";
        $result = mysqli_query($conn,$sql);
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $myArray[] = $row;
            }
            print json_encode($myArray);
        }
      }else{
        print "No ha introducido id de usuario que leer";
      }
      break;
    /*
    case "register":
      if(isset($_GET['nombre']) && isset($_GET['contrasenya']) && isset($_GET['isla']) && isset($_GET['fruta'])
      && isset($_GET['cumpleanyos']) && isset($_GET['verif']) && isset($_GET['email']) && isset($_GET['hemisferio'])){
        $nombre = $_GET['nombre'];
        $isla = $_GET['isla'];
        $fruta = $_GET['fruta'];
        $cumpleanyos = $_GET['cumpleanyos'];
        $hemisferio = $_GET['hemisferio'];
        $contrasenya = $_GET['contrasenya'];
        $email = $_GET['email'];
        $verif = $_GET['verif'];
        $sql = "INSERT INTO usuarios (nombre, contrasenya, isla, fruta, cumpleanyos, verification, email, hemisferio) VALUES ($nombre, $contrasenya, $isla, $fruta, $cumpleanyos, $verif, $email, $hemisferio)";

        mysqli_query($conn,$sql);
        $sql = "SELECT id FROM usuarios WHERE nombre = $_GET['nombre]";
        $result = mysqli_query($conn,$sql);
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $myArray[] = $row;
            }
            print json_encode($myArray);
        }
      }else{
        print "No ha introducido los parametros necesarios de registro";
      }
      break;
      */
    default:
      print "Comando no valido";
  }
}else{
  print "Comando no seleccionado";
}
mysqli_close($conn);
?>
