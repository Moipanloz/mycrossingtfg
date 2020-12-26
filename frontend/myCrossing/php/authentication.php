<?php

// Esto es para probar la BBDD, si mas adelante
// hace falta abrir y cerrar sesion, crear las funciones
// que estan en pipo.php para abrir y cerrar sesion
// mas info en marcadores

header('Access-Control-Allow-Origin: *');
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
      $userId = $_GET['userId'];
      $verif = $_GET['key'];
      $sql = "UPDATE usuarios SET verification = '$verif' WHERE id = $userId";
      $result = mysqli_query($conn,$sql);
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
      $userId = $_GET['userId'];
      $sql = "SELECT verification FROM usuarios WHERE id = $userId";
      $result = mysqli_query($conn,$sql);
      if ($result->num_rows > 0) {
          while($row = $result->fetch_assoc()) {
              $myArray[] = $row;
          }
          print json_encode($myArray);
      }
      break;
      
    default:
      print "Comando no seleccionado";
  }
}
mysqli_close($conn);
?>
