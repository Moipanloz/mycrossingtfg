<?php

header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Headers: *');

include "validators/usuarioValidator.php";
include "validators/tareaValidator.php";

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

if(isset($_GET["command"])){
  $error = false;

  switch($_GET["command"]){

    case "read": //---------------------------------------------------------------------------------------------------READ
      if(isset($_GET["userId"])){
        $userId = (int)$_GET["userId"]; //convierte el string en int

        //Comprobar que el user coincide con las cookies
        $error = checkUser($userId);

        //Para que sea correcto debe dar true
        if($error){
          $sql = "SELECT * FROM tareas WHERE usuario_id = $userId";
          $result = mysqli_query($conn,$sql);
          $myArray = array();

          if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
              $myArray[] = $row;
            }
            print json_encode($myArray);
          }
        }else{
          print("No se cumplen los requisitos");
        }

      }else{
        print("User id not set");
      }
      break;

    case "update"://---------------------------------------------------------------------------------------------------UPDATE
      if(isset($_GET["userId"])){
        $userId = $_GET["userId"];

        if(isset($_POST)){

          //Cogemos los datos a actualizar enviados por el POST

          /*$data = var_dump($_POST["tarea"]);
          $tareaId = $data["id"];
          $hecha = $data["hecha"];
          $imagenUrl = $data["imagen_url"];
          */

          $postdata = file_get_contents("php://input");
          $request = json_decode($postdata);
          $tareaId = $request->id;
          $hecha = $request->hecha;
          $imagenUrl = $request->imagen_url;

          //Si es false, lo pone vacio por lo que la query no se hara correctamente
          if(empty($hecha)){
            $hecha = 0;
          }

          //comprueba
          // -que el usuario coincide con la cookie
          // -que la tarea existe
          // -que la tarea a editar es suya
          // -que los datos a actualizar son correctos
          $error =  checkUser($userId) &&
                    checkExisteTarea($tareaId, $conn) &&
                    checkTareaOwner($userId, $tareaId, $conn) &&
                    checkDatosCorrectos($imagenUrl, $hecha);

          if($error){
            //query aplicando cambios
            $sql = "UPDATE tareas SET hecha = $hecha, imagen_url = '$imagenUrl' WHERE id = $tareaId";
            $result = mysqli_query($conn,$sql);
          }else{
            print("No se cumplen los requisitos");
          }
        }else{
          print("No se ha pasado la tarea");
        }
      }else{
        print("User id not set");
      }
      break;

    default:
      print("Comando no valido");
  }
}

$conn -> close();

?>
