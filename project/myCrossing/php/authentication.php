<?php

header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: OPTIONS, PUT, DELETE, POST, GET');

require "openDB.php";

include "validators/usuarioValidator.php";

if(isset($_GET['command'])){
  switch($_GET['command']){
    // ========================================================================================================= LOGOUT
    case "logout":
      if(isset($_GET["userId"]) && isset($_GET["verif"])){
        $userId = $_GET['userId'];
        $verifCode = $_GET["verif"];

        $validation = checkExisteUser($conn, $userId) &&
                checkVerificationJson($conn, $userId, $verifCode);

        if($validation){
          $sql = "UPDATE usuarios SET verification = NULL WHERE id = $userId";
          $result = mysqli_query($conn,$sql);
        }else{
          print(json_encode("Error: No se cumplen los requisitos"));
        }

      }else{
        print(json_encode("Error: Faltan parametros"));
      }

      break;

    // ========================================================================================================= LOGIN
    case "login":

      $postdata = file_get_contents("php://input");
      $request = json_decode($postdata);

      if(isset($request) && !empty($request)){
        $userPass = $request->clave;
        $verif = $request->key;
        $email = $request->email;

        $validation = checkExisteUserByEmail($conn, $email) &&
                checkPassword($conn, $email, $userPass);

        if($validation){
          $sqlVerif = "UPDATE usuarios SET verification = '$verif' WHERE email = '$email'";
          $resultVerif = mysqli_query($conn,$sqlVerif);

          $sqlData = "SELECT nombre, id, verification FROM usuarios WHERE email = '$email'";
          $resultData = mysqli_query($conn,$sqlData);

          $userResult = mysqli_fetch_assoc($resultData);

          print(json_encode($userResult));

        }else{
          print(json_encode("Email o contraseña incorrectos"));
        }
      }else{
        print(json_encode("No hay datos"));
      }

      break;

    // ========================================================================================================= READ
    case "read":
      if(isset($_GET['userId']) && isset($_GET["verif"])){
        $userId = $_GET['userId'];
        $verifCode = $_GET['verif'];

        $validation = checkExisteUser($conn, $userId) &&
                checkVerificationJson($conn, $userId, $verifCode);

        if($validation){
          $sql = "SELECT nombre, isla, fruta, cumpleanyos, hemisferio, id_suenyo, id_switch, apodo_aldeano FROM usuarios WHERE id = $userId";
          $result = mysqli_query($conn,$sql);
          $myArray = array();
          if ($result->num_rows > 0) {
              while($row = $result->fetch_assoc()) {
                  $myArray[] = $row;
              }
              print(json_encode($myArray));
          }
        }else{
          print(json_encode("No cumple los requerimientos"));
        }
      }else{
        print(json_encode("Faltan parametros"));
      }
      break;

    // ========================================================================================================= GETKEY
    case "getKey":
      if(isset($_GET['userId']) && isset($_GET["verif"])){
        $userId = $_GET['userId'];
        $verifCode = $_GET['verif'];

        $validation = checkExisteUser($conn, $userId) &&
                checkVerificationJson($conn, $userId, $verifCode);

        if($validation){
          $sql = "SELECT verification, nombre, hemisferio FROM usuarios WHERE id = $userId";
          $result = mysqli_query($conn,$sql);
          if ($result->num_rows > 0) {
              while($row = $result->fetch_assoc()) {
                  $myArray[] = $row;
              }
              print(json_encode($myArray));
          }
        }
      }else{
        print(json_encode("No ha introducido id de usuario que leer"));
      }
      break;

    // ========================================================================================================= REGISTER
    case "register":
      $postdata = file_get_contents("php://input");
      $request = json_decode($postdata);

      if(isset($request) && !empty($request)){
        $nombre = $request->nombre;
        $userPass = $request->clave;
        $isla = $request->isla;
        $fruta = $request->fruta;
        $cumpleanyos = $request->cumpleanyos;
        $email = $request->email;
        $hemisferio = $request->hemisferio;
        $id_suenyo = $request->id_suenyo;
        $id_switch = $request->id_switch;
        $verif = $request->verif;

        $validation = checkDatos($nombre, $isla, $fruta, $cumpleanyos, $email, $hemisferio, $id_suenyo, $id_switch) &&
                checkDatosCreate($conn, $email, $id_suenyo, $id_switch);

        if($validation){
          $contrasenya = password_hash($userPass, PASSWORD_BCRYPT);

          $sql = "INSERT INTO usuarios (nombre, contrasenya, isla, fruta, cumpleanyos, verification, email, hemisferio";
          $sql2 = ") VALUES ('$nombre', '$contrasenya', '$isla', '$fruta', '$cumpleanyos', '$verif', '$email', '$hemisferio'";

          if(!empty($id_switch)){
            $sql .= ", id_switch";
            $sql2 .= ", '$id_switch'";
          }

          if(!empty($id_suenyo)){
            $sql .= ", id_suenyo";
            $sql2 .= ", '$id_suenyo'";
          }
          if(!empty($apodo_aldeano)){
            $sql .= ", apodo_aldeano";
            $sql2 .= ", '$apodo_aldeano'";
          }

          $sql2 .= ")";
          $sql .= $sql2;

          $result = mysqli_query($conn,$sql);

          //Tiene que devolver el usuario para asignarle las cookies
          $sql = "SELECT * FROM usuarios WHERE email = '$email'";
          $result = mysqli_query($conn,$sql);
          if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
              $myArray[] = $row;
            }
            print(json_encode($myArray));
          }

        }else{
          print(json_encode("Error"));
        }

      }else{
        print(json_encode("No hay datos"));
      }
      break;

    case "update": //====================================================================================== UPDATE
      if(isset($_GET["userId"]) && isset($_GET["verif"])){
        $userId = $_GET["userId"];
        $verifCode = $_GET["verif"];

        $putdata = file_get_contents("php://input");

        if(isset($putdata) && !empty($putdata)){

          $request = json_decode($putdata);
          $nombre = $request->nombre;
          $isla = $request->isla;
          $fruta = $request->fruta;
          $cumpleanyos = $request->cumpleanyos;
          $hemisferio = $request->hemisferio;
          $id_switch = $request->id_switch;
          $id_suenyo = $request->id_suenyo;
          $apodo_aldeano = $request->apodo_aldeano;

          $sql = "SELECT email FROM usuarios WHERE id = $userId";
          $getEmail = mysqli_query($conn, $sql);

          $row = mysqli_fetch_assoc($getEmail);
          $email = $row["email"];

          $validation =  checkExisteUser($conn, $userId) &&
                    checkDatos($nombre, $isla, $fruta, $cumpleanyos, $email, $hemisferio, $id_suenyo, $id_switch) &&
                    checkDatosUpdate($conn, $userId, $email, $id_suenyo, $id_switch) &&
                    checkVerification($conn, $userId, $verifCode);

          if($validation){
            $sql = "UPDATE usuarios SET nombre = '$nombre', isla = '$isla', fruta = '$fruta', cumpleanyos = '$cumpleanyos', hemisferio = '$hemisferio', id_switch = '$id_switch', id_suenyo = '$id_suenyo', apodo_aldeano = '$apodo_aldeano' WHERE id = $userId";
            $result = mysqli_query($conn,$sql);
          }else{
            print(json_encode("No se cumplen los requisitos"));
          }

        }else{
          print(json_encode("No hay datos"));
        }

      }else{
        print(json_encode("Faltan parametros"));
      }
      break;

    default:
      print(json_encode("Comando no valido"));
  }
}else{
  print(json_encode("Comando no seleccionado"));
}
mysqli_close($conn);
?>
