<?php

header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Headers: *');
header("Access-Control-Allow-Credentials: true");

function checkDatos($nombre, $isla, $fruta, $cumpleanyos, $email, $hemisferio, $id_suenyo, $id_switch){
  //Comorueba que los datos son correctos
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

  if($hemisferio != "NORTE" && $hemisferio != "SUR"){
    $devolver = FALSE;
    print("Selecciona un hemisferio válido");
  }

  if(!empty($id_suenyo)){
    if(!preg_match("/^DA-[0-9]{4}-[0-9]{4}-[0-9]{4}$/", $id_suenyo)){
      $devolver = FALSE;
      print("Código de sueño no válido");
    }
  }

  if(!empty($id_switch)){
    if(!preg_match("/^SW-[0-9]{4}-[0-9]{4}-[0-9]{4}$/", $id_switch)){
      $devolver = FALSE;
      print("Código de switch no válido");
    }
  }

  return $devolver;
}

function checkDatosCreate($conn, $email, $id_suenyo, $id_switch){
  //Para el create, si estos campos devuelven 1 o mas es que ya estan en uso y no pueden ser registrados
  $devolver = TRUE;

  $sql = "SELECT * FROM usuarios WHERE email = '$email'";
  $emailResult = mysqli_query($conn, $sql);

  if($emailResult->num_rows > 0) {
    $devolver = FALSE;
    print("Email ya en uso");
  }

  if(!empty($id_suenyo)){
    $sql = "SELECT * FROM usuarios WHERE id_suenyo = '$id_suenyo'";
    $suenyoResult = mysqli_query($conn, $sql);

    if($suenyoResult->num_rows > 0){
      $devolver = FALSE;
      print("Código de sueño ya en uso");
    }
  }

  if(!empty($id_switch)){
    $sql = "SELECT * FROM usuarios WHERE id_switch = '$id_switch'";
    $switchResult = mysqli_query($conn, $sql);

    if($switchResult->num_rows > 0){
      $devolver = FALSE;
      print("Código de switch ya en uso");
    }
  }

  return $devolver;
}

function checkDatosUpdate($conn, $userId, $email, $id_suenyo, $id_switch){
  //Para el update, si estos campos devuelven 1 hay que comprobar que no sean los del mismo user

  $devolver = TRUE;

  $sql = "SELECT * FROM usuarios WHERE email = '$email'";
  $emailResult = mysqli_query($conn, $sql);
  $checkId = mysqli_fetch_assoc($emailResult)["id"];

  if($emailResult->num_rows > 0 && $checkId != $userId) {
    $devolver = FALSE;
    print("Email ya en uso");
  }

  if(!empty($id_suenyo)){
    $sql = "SELECT * FROM usuarios WHERE id_suenyo = '$id_suenyo'";
    $suenyoResult = mysqli_query($conn, $sql);
    $checkId = mysqli_fetch_assoc($suenyoResult)["id"];

    if($suenyoResult->num_rows > 0 && $checkId != $userId){
      $devolver = FALSE;
      print("Código de sueño ya en uso");
    }
  }

  if(!empty($id_switch)){
    $sql = "SELECT * FROM usuarios WHERE id_switch = '$id_switch'";
    $switchResult = mysqli_query($conn, $sql);
    $checkId = mysqli_fetch_assoc($switchResult)["id"];

    if($switchResult->num_rows > 0 && $checkId != $userId){
      $devolver = FALSE;
      print("Código de switch ya en uso");
    }
  }

  return $devolver;
}

function checkExisteUser($conn, $userId){
  //Comprueba que exista el usuario
  $devolver = FALSE;
  $sql = "SELECT * FROM usuarios WHERE id = $userId";
  $result = mysqli_query($conn,$sql);
  if ($result->num_rows == 1) {
    $devolver= TRUE;
  }
  return $devolver;
}

function checkAdmin($conn, $userId){
  //Comprueba que el usuario es el admin
  $devolver = FALSE;
  $sql = "SELECT * FROM usuarios WHERE id = $userId";
  $result = mysqli_query($conn,$sql);
  if ($result->num_rows == 1 && $result['nombre']=="admin" && $userId == 1) {
    $devolver= TRUE;
  }
  return $devolver;
}

function checkVerification($conn, $userId, $verifCode){
  //Comprueba que el codigo  de verificacion pertenece al usuario
  $devolver = FALSE;
  $sql = "SELECT * FROM usuarios WHERE id = $userId AND verification = '$verifCode'";
  $result = mysqli_query($conn,$sql);
  if ($result->num_rows == 1) {
    $devolver= TRUE;
  }
  return $devolver;
}

?>

