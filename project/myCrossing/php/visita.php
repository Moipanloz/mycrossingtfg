<?php
header('Access-Control-Allow-Origin: http://localhost:9876');

require "openDB.php";
header('Access-Control-Allow-Origin: http://localhost:9876');

include "validators/usuarioValidator.php";
include "validators/visitaValidator.php";

if(isset($_GET["command"])){
  $validation = false;

  switch($_GET["command"]){

    case "read": //---------------------------------------------------------------------------------------------------READ
      if(isset($_GET["userId"]) && isset($_GET["verif"])){
        $userId = (int)$_GET["userId"]; //convierte el string en int
        $verifCode = $_GET["verif"];

        $validation =  checkExisteUser($conn, $userId) &&
                  checkExisteVisita($userId, $conn) &&
                  checkVerification($conn, $userId, $verifCode);

        //Para que sea correcto debe dar true
        if($validation){
          $result = $conn->prepare('SELECT * FROM visitas WHERE usuario_id = ?');
          $result->bind_param('i', $userId);
          $result->execute();
          $res = $result->get_result();
          $myArray = array();

          if ($res->num_rows > 0) {
            while($row = $res->fetch_assoc()) {
              $myArray[] = $row;
            }
          }
          print json_encode($myArray, JSON_NUMERIC_CHECK);
        }
      }else{
        die("Faltan parametros");
      }
      break;
    case "update"://---------------------------------------------------------------------------------------------------UPDATE
      if(isset($_GET["userId"]) && isset($_GET["verif"])){
        $userId = $_GET["userId"];
        $verifCode = $_GET["verif"];

        $putdata = file_get_contents("php://input");

        if(isset($putdata) && !empty($putdata)){

          $request = json_decode($putdata);
          $lpa = $request->lpa;
          $mpa = $request->mpa;
          $xpa = $request->xpa;
          $jpa = $request->jpa;
          $vpa = $request->vpa;
          $lpr = $request->lpr;
          $mpr = $request->mpr;
          $xpr = $request->xpr;
          $jpr = $request->jpr;
          $vpr = $request->vpr;
          $estela = $request->estela;

          $validation=TRUE;
          $validation =  checkExisteUser($conn, $userId) &&
                    checkExisteVisita($userId, $conn) &&
                    checkVerification($conn, $userId, $verifCode);

          if($validation){
            $result = $conn->prepare('UPDATE visitas SET lpa = ?, mpa = ?, xpa = ?, jpa = ?, vpa = ?, lpr = ?, mpr = ?, xpr = ?, jpr = ?, vpr = ?, estela = ? WHERE usuario_id = ?');
            $result->bind_param('sssssssssssi',$lpa,$mpa,$xpa,$jpa,$vpa,$lpr,$mpr,$xpr,$jpr,$vpr,$estela,$userId);
            $result->execute();
            print("Exito");
          }
        }else{
          die("No hay datos");
        }
      }else{
        die("Faltan parametros");
      }
      break;
    case "set_fecha"://---------------------------------------------------------------------------------------------------SET-FECHA
      if(isset($_GET["userId"]) && isset($_GET["verif"])){
        $userId = $_GET["userId"];
        $verifCode = $_GET["verif"];

        $putdata = file_get_contents("php://input");

        if(isset($putdata) && !empty($putdata)){

          $request = json_decode($putdata);
          $last_update = $request->last_update;

          $validation=TRUE;
          $validation =  checkExisteUser($conn, $userId) &&
                    checkExisteVisita($userId, $conn) &&
                    checkVerification($conn, $userId, $verifCode);

          if($validation){
            $result = $conn->prepare('UPDATE visitas SET last_update = ? WHERE usuario_id = ?');
            $result->bind_param('si', $last_update, $userId);
            $result->execute();
            $result->store_result();
            print("Exito");
          }
        }else{
          die("No hay datos");
        }
      }else{
        die("Faltan parametros");
      }
      break;
    case "create"://---------------------------------------------------------------------------------------------------CREATE
      if(isset($_GET["userId"]) && isset($_GET["verif"])){
        $userId = $_GET["userId"];
        $verifCode = $_GET["verif"];

        $validation=TRUE;
        $validation =  checkExisteUser($conn, $userId) &&
                  checkVerification($conn, $userId, $verifCode);

        if($validation){
          $result = $conn->prepare('INSERT INTO visitas(usuario_id) VALUES (?)');
          $result->bind_param('i', $userId);
          $result->execute();
          print("Exito");
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

$conn -> close();
