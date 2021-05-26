<?php

header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: OPTIONS, PUT, DELETE, POST, GET');

require $_SERVER['DOCUMENT_ROOT']."openDB.php";

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
          $result = $conn->prepare('UPDATE usuarios SET verification = NULL WHERE id = ?');
          $result->bind_param('i', $userId);
          $result->execute();
        }
      }else{
        die("Error: Faltan parametros");
      }

      break;
    // ========================================================================================================= LOGIN
    case "login":

      $postdata = file_get_contents("php://input");

      if(isset($postdata) && !empty($postdata)){

        $request = json_decode($postdata);

        $userPass = $request->clave;
        $verif = $request->key;
        $email = $request->email;

        $validation = checkExisteUserByEmail($conn, $email) &&
                checkPassword($conn, $email, $userPass);

        if($validation){
          //Actualiza el codigo de verificacion
          $result = $conn->prepare('UPDATE usuarios SET verification = ? WHERE email = ?');
          $result->bind_param('ss', $verif, $email);
          $result->execute();

          //Devuelve el usuario
          $result = $conn->prepare('SELECT nombre, id, verification FROM usuarios WHERE email = ?');
          $result->bind_param('s', $email);
          $result->execute();
          $userResult = $result->get_result();
          $userResult = $userResult->fetch_assoc();
          print(json_encode($userResult));
        }
      }else{
        die("No hay datos");
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
          $result = $conn->prepare('SELECT nombre, isla, fruta, cumpleanyos, hemisferio, id_switch, apodo_aldeano FROM usuarios WHERE id = ?');
          $result->bind_param('i', $userId);
          $result->execute();
          $res = $result->get_result();
          $myArray = array();

          if ($res->num_rows > 0) {
            while($row = $res->fetch_assoc()) {
              $myArray[] = $row;
            }
            print(json_encode($myArray));
          }
        }
      }else{
        die("Faltan parametros");
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
          $result = $conn->prepare('SELECT verification, nombre, hemisferio FROM usuarios WHERE id = ?');
          $result->bind_param('i', $userId);
          $result->execute();
          $res = $result->get_result();

          if ($res->num_rows > 0) {
              while($row = $res->fetch_assoc()) {
                  $myArray[] = $row;
              }
              print(json_encode($myArray));
          }
        }
      }else{
        die("Faltan parametros");
      }
      break;
    // ========================================================================================================= REGISTER
    case "register":
      $postdata = file_get_contents("php://input");

      if(isset($postdata) && !empty($postdata)){
        $request = json_decode($postdata);

        $nombre = $request->nombre;
        $userPass = $request->clave;
        $isla = $request->isla;
        $fruta = $request->fruta;
        $cumpleanyos = $request->cumpleanyos;
        $email = $request->email;
        $hemisferio = $request->hemisferio;
        $verif = $request->verif;

        if(isset($request->id_switch)){
          $id_switch = $request->id_switch;
        }else{
          $id_switch = null;
        }

        if(isset($request->apodo_aldeano)){
          $apodo_aldeano = $request->apodo_aldeano;
        }else{
          $apodo_aldeano = null;
        }

        $validation = checkDatos($nombre, $isla, $fruta, $cumpleanyos, $email, $hemisferio, $id_switch, $apodo_aldeano) &&
                checkDatosCreate($conn, $email, $id_switch);

        if($validation){
          $contrasenya = password_hash($userPass, PASSWORD_BCRYPT);

          //Registro
          $result = $conn->prepare('INSERT INTO usuarios (nombre, contrasenya, isla, fruta, cumpleanyos, verification, email, hemisferio, id_switch, apodo_aldeano) VALUES (?,?,?,?,?,?,?,?,?,?)');
          $result->bind_param('ssssssssss', $nombre, $contrasenya, $isla, $fruta, $cumpleanyos, $verif, $email, $hemisferio, $id_switch, $apodo_aldeano);
          $result->execute();

          //Tiene que devolver el usuario para asignarle las cookies
          $result = $conn->prepare('SELECT * FROM usuarios WHERE email = ?');
          $result->bind_param('s', $email);
          $result->execute();
          $res = $result->get_result();

          if ($res->num_rows > 0) {
            while($row = $res->fetch_assoc()) {
              $myArray[] = $row;
            }
            print(json_encode($myArray));
          }
        }
      }else{
        die("No hay datos");
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
          $apodo_aldeano = $request->apodo_aldeano;

          $getEmail = $conn->prepare('SELECT email FROM usuarios WHERE id = ?');
          $getEmail->bind_param('i', $userId);
          $getEmail->execute();
          $res = $getEmail->get_result();
          $email = $res->fetch_assoc()["email"];

          $validation =  checkExisteUser($conn, $userId) &&
                    checkDatos($nombre, $isla, $fruta, $cumpleanyos, $email, $hemisferio, $id_switch, $apodo_aldeano) &&
                    checkDatosUpdate($conn, $userId, $email, $id_switch) &&
                    checkVerification($conn, $userId, $verifCode);

          if($validation){
            $result = $conn->prepare('UPDATE usuarios SET nombre = ? , isla = ? , fruta = ? , cumpleanyos = ? , hemisferio = ? , id_switch = ? , apodo_aldeano = ? WHERE id = ?');
            $result->bind_param('sssssssi', $nombre, $isla, $fruta, $cumpleanyos, $hemisferio, $id_switch, $apodo_aldeano, $userId);
            $result->execute();
          }
        }else{
          die("No hay datos");
        }

      }else{
        die("Faltan parametros");
      }
      break;

    default:
      die("Comando no valido");
  }
}else{
  die("Comando no seleccionado");
}
mysqli_close($conn);
