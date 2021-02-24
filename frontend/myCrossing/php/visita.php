<?php

require "openDB.php";

include "validators/usuarioValidator.php";
include "validators/visitaValidator.php";

if(isset($_GET["command"])){
  $error = false;

  switch($_GET["command"]){

    case "read": //---------------------------------------------------------------------------------------------------READ
      if(isset($_GET["userId"]) && isset($_GET["verif"])){
        $userId = (int)$_GET["userId"]; //convierte el string en int
        $verifCode = $_GET["verif"];

        $error =  checkExisteUser($conn, $userId) &&
                  checkExisteVisita($userId, $conn) &&
                  checkVerification($conn, $userId, $verifCode);

        //Para que sea correcto debe dar true
        if($error){
          $sql = "SELECT * FROM visitas WHERE usuario_id = $userId";
          $result = mysqli_query($conn,$sql);
          $myArray = array();

          if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
              $myArray[] = $row;
            }
          }else{
            print json_encode("No hubo resultados");
            break;
          }

          print json_encode($myArray, JSON_NUMERIC_CHECK);

        }else{
          print("No se cumplen los requisitos");
        }

      }else{
        print("Faltan parametros");
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
          $spa = $request->spa;
          $dpa = $request->dpa;
          $lpr = $request->lpr;
          $mpr = $request->mpr;
          $xpr = $request->xpr;
          $jpr = $request->jpr;
          $vpr = $request->vpr;
          $spr = $request->spr;
          $dpr = $request->dpr;

          $error=TRUE;
          $error =  checkExisteUser($conn, $userId) &&
                    checkExisteVisita($userId, $conn) &&
                    checkVerification($conn, $userId, $verifCode);

          if($error){
            $sql = "UPDATE visitas SET lpa = '$lpa', mpa = '$mpa', xpa = '$xpa', jpa = '$jpa', vpa = '$vpa', spa = '$spa', dpa = '$dpa', lpr = '$lpr', mpr = '$mpr', xpr = '$xpr', jpr = '$jpr', vpr = '$vpr', spr = '$spr', dpr = '$dpr' WHERE usuario_id = $userId";
            $result = mysqli_query($conn,$sql);
            print(json_encode("Exito"));
          }else{
            print("No se cumplen los requisitos");
          }

        }else{
          print("No hay datos");
        }

      }else{
        print("Faltan parametros");
      }
      break;
    case "set_fecha"://---------------------------------------------------------------------------------------------------UPDATE
      if(isset($_GET["userId"]) && isset($_GET["verif"])){
        $userId = $_GET["userId"];
        $verifCode = $_GET["verif"];

        $putdata = file_get_contents("php://input");

        if(isset($putdata) && !empty($putdata)){

          $request = json_decode($putdata);
          $last_update = $request->last_update;

          $error=TRUE;
          $error =  checkExisteUser($conn, $userId) &&
                    checkExisteVisita($userId, $conn) &&
                    checkVerification($conn, $userId, $verifCode);

          if($error){
            $sql = "UPDATE visitas SET last_update = '$last_update' WHERE usuario_id = $userId";
            $result = mysqli_query($conn,$sql);
            print(json_encode("Exito"));
          }else{
            print("No se cumplen los requisitos");
          }

        }else{
          print("No hay datos");
        }

      }else{
        print("Faltan parametros");
      }
      break;
    case "create"://---------------------------------------------------------------------------------------------------UPDATE
      if(isset($_GET["userId"]) && isset($_GET["verif"])){
        $userId = $_GET["userId"];
        $verifCode = $_GET["verif"];

        $error=TRUE;
        $error =  checkExisteUser($conn, $userId) &&
                  checkVerification($conn, $userId, $verifCode);

        if($error){
          $sql = "INSERT INTO visitas(usuario_id, spa, dpa, spr, dpr) VALUES ($userId, 'Totakeke', 'Juliana', 'Totakeke', 'Juliana')";
          $result = mysqli_query($conn,$sql);
          print(json_encode('Exito'));
        }else{
          print(json_encode("No se cumplen los requisitos"));
        }

      }else{
        print(json_encode("Faltan parametros"));
      }
      break;

    default:
      print(json_encode("Comando no valido"));
  }
}

$conn -> close();

?>
