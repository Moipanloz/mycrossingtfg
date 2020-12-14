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
$user_id = $_REQUEST['userid'];

$fallo = "";

switch ($action) {
    case "read"://---------------------------------------------------------------------------------------READ
      //echo("Read - ");

      $sql = "SELECT * FROM tareas WHERE usuario_id = $user_id";

      //verificar la llamada la ha hecho el dueño de la tarea
     /* echo("verificar dueño - ");

      $testquery = "SELECT usuario_id FROM tareas WHERE id = $id";
      $validation = mysqli_query($conn,$testquery);
      $data = mysqli_fetch_all($validation, MYSQLI_ASSOC);

      if($data[0]["usuario_id"] != $user_id){
        echo("error dueño - ");

        $fallo = "No pudes cambiar una tarea que no es tuya";
      }*/
      //necesito comparar el id que le meto por url con el id global
      //fin verificacion


      break;

    case "create"://---------------------------------------------------------------------------------------CREATE
    break;
    case "update"://---------------------------------------------------------------------------------------UPDATE
      //echo("Update - ");

      $id = $_REQUEST['id'];
      $hecha = $_REQUEST['hecha'];
      $sql = "UPDATE tareas SET hecha = $hecha WHERE id = $id";


      //verificar que los datos son validos
      //verificar id existe
      //echo("verificar id - ");

      $testquery = "SELECT * FROM tareas WHERE id = $id";
      $validation = mysqli_query($conn,$testquery);

      if ($validation->num_rows == 0) {
        //echo("error id - ");

        $fallo = "No existe una tarea con ese id";
      }

      //verificar valor hecha es 0 o 1
      //echo("verificar hecha - ");

      if ($hecha != 0 && $hecha != 1) {
        //echo("error hecha - ");

        $fallo .= " - Valor no válido";
      }

      //verificar la llamada la ha hecho el dueño de la tarea
      //echo("verificar dueño - ");

      $testquery = "SELECT usuario_id FROM tareas WHERE id = $id";
      $validation = mysqli_query($conn,$testquery);
      $data = mysqli_fetch_array($validation);

      if($data[0] != $user_id){
        //echo("error dueño - ");

        $fallo .= " - No pudes cambiar una tarea que no es tuya";
      }

      //echo("verificacion acabada - ");
      break;

    case "delete": //---------------------------------------------------------------------------------------DELETE
    break;
}


if($fallo == ""){
  //echo("no hay errores - ");

  $result = mysqli_query($conn,$sql);

  if ($action == "read"){
    $myArray = array();
    if ($result->num_rows > 0) {
    // output data of each row
      while($row = $result->fetch_assoc()) {
          $myArray[] = $row;
      }
      print json_encode($myArray);
    }else{
        //echo "0 results";
    }
  }

}else{
  //echo("hay errores - ");
  echo($fallo);
}

$conn -> close();

?>
