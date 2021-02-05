<?php

header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Headers: *');
header("Access-Control-Allow-Credentials: true");

function checkDatos($conn, $nombre, $isla, $fruta, $cumpleanyos, $email, $hemisferio, $id_suenyo, $id_switch){
  $devolver = TRUE;

  if(strlen(trim($nombre)) == 0){
    $devolver = FALSE;
    print("El nombre no puede estar vacío");
  }

  if(strlen($nombre) > 20){
    $devolver = FALSE;
    print("El nombre no puede ocupar más de 20 carácteres");
  }

  if(strlen(trim($isla)) == 0){
    $devolver = FALSE;
    print("El nombre de la isla no puede estar vacío");
  }

  if(strlen($isla) > 20){
    $devolver = FALSE;
    print("El nombre de la isla no puede ocupar más de 20 carácteres");
  }

  if($fruta != "PERA" && $fruta != "MANZANA" && $fruta != "MELOCOTON" && $fruta != "CEREZA" && $fruta != "NARANJA"){
    $devolver = FALSE;
    print("Selecciona una fruta válida");
  }

  $cumpleUser = date("Y-m-d", strtotime($cumpleanyos));
  date_default_timezone_set('Europe/London');
  $fechaHoy = date("Y-m-d");

  if($cumpleUser > $fechaHoy){
    $devolver = FALSE;
    print("Selecciona una fecha válida");
  }

  if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
    $devolver = FALSE;
    print("Email no válido");
  }

  $sql = "SELECT * FROM usuarios WHERE email = '$email'";
  $emailResult = mysqli_query($conn, $sql);

  if ($emailResult->num_rows > 0) {
    $devolver = FALSE;
    print("Email ya en uso");
  }

  if($hemisferio != "NORTE" && $hemisferio != "SUR"){
    $devolver = FALSE;
    print("Selecciona un hemisferio válido");
  }

  if(!empty($id_suenyo)){
    $sql = "SELECT * FROM usuarios WHERE id_suenyo = '$id_suenyo'";
    $suenyoResult = mysqli_query($conn, $sql);

    if(!preg_match("/^DA-[0-9]{4}-[0-9]{4}-[0-9]{4}$/", $id_suenyo)){
      $devolver = FALSE;
      print("Código de sueño no válido");

    }else if($suenyoResult->num_rows > 0){
      $devolver = FALSE;
      print("Código de sueño ya en uso");
    }
  }

  if(!empty($id_switch)){
    $sql = "SELECT * FROM usuarios WHERE id_switch = '$id_switch'";
    $switchResult = mysqli_query($conn, $sql);

    if(!preg_match("/^SW-[0-9]{4}-[0-9]{4}-[0-9]{4}$/", $id_switch)){
      $devolver = FALSE;
      print("Código de switch no válido");

    }else if($switchResult->num_rows > 0){
      $devolver = FALSE;
      print("Código de switch ya en uso");
    }
  }

  return $devolver;
}

function checkUserId($conn, $userId){
  $devolver = FALSE;
  $sql = "SELECT * FROM usuarios WHERE id = $userId";
  $result = mysqli_query($conn,$sql);
  if ($result->num_rows == 1) {
    $devolver= TRUE;
  }
  return $devolver;
}

?>

