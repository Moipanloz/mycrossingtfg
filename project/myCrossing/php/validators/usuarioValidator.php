<?php

header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: PUT, DELETE, POST, GET');

header("Access-Control-Allow-Credentials: true");

function checkDatos($nombre, $isla, $fruta, $cumpleanyos, $email, $hemisferio, $id_switch){
  //Comorueba que los datos son correctos
  $devolver = TRUE;

  if(strlen(trim($nombre)) == 0){
    $devolver = FALSE;
    die("El nombre no puede estar vacío");
    return $devolver;
  }

  if(strlen($nombre) > 20){
    $devolver = FALSE;
    die("El nombre no puede ocupar más de 20 carácteres");
    return $devolver;
  }

  if(strlen(trim($isla)) == 0){
    $devolver = FALSE;
    die("El nombre de la isla no puede estar vacío");
    return $devolver;
  }

  if(strlen($isla) > 20){
    $devolver = FALSE;
    die("El nombre de la isla no puede ocupar más de 20 carácteres");
    return $devolver;
  }

  if($fruta != "PERA" && $fruta != "MANZANA" && $fruta != "MELOCOTON" && $fruta != "CEREZA" && $fruta != "NARANJA"){
    $devolver = FALSE;
    die("Selecciona una fruta válida");
    return $devolver;
  }

  $cumpleUser = date("Y-m-d", strtotime($cumpleanyos));
  date_default_timezone_set('Europe/London');
  $fechaHoy = date("Y-m-d");

  if($cumpleUser > $fechaHoy){
    $devolver = FALSE;
    die("Selecciona una fecha válida");
    return $devolver;
  }

  if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
    $devolver = FALSE;
    die("Email no válido");
    return $devolver;
  }

  if($hemisferio != "NORTE" && $hemisferio != "SUR"){
    $devolver = FALSE;
    die("Selecciona un hemisferio válido");
    return $devolver;
  }

  if(!empty($id_switch)){
    if(!preg_match("/^SW-[0-9]{4}-[0-9]{4}-[0-9]{4}$/", $id_switch)){
      $devolver = FALSE;
      die("Código de switch no válido");
      return $devolver;
    }
  }

  return $devolver;
}

function checkDatosCreate($conn, $email, $id_switch){
  //Para el create, si estos campos devuelven 1 o mas es que ya estan en uso y no pueden ser registrados
  $devolver = TRUE;

  $emailResult = $conn->prepare('SELECT * FROM usuarios WHERE email = ?');
  $emailResult->bind_param('s', $email);
  $emailResult->execute();
  $emailResult->store_result();

  if($emailResult->num_rows > 0) {
    $devolver = FALSE;
    die("Email ya en uso");
    return $devolver;
  }

  if(!empty($id_switch)){
    $switchResult = $conn->prepare('SELECT * FROM usuarios WHERE id_switch = ?');
    $switchResult->bind_param('s', $id_switch);
    $switchResult->execute();
    $switchResult->store_result();

    if($switchResult->num_rows > 0){
      $devolver = FALSE;
      die("Código de switch ya en uso");
      return $devolver;
    }
  }

  return $devolver;
}

function checkDatosUpdate($conn, $userId, $email, $id_switch){
  //Para el update, si estos campos devuelven 1 hay que comprobar que no sean los del mismo user
  $devolver = TRUE;

  $emailResult = $conn->prepare('SELECT * FROM usuarios WHERE email = ?');
  $emailResult->bind_param('s', $email);
  $emailResult->execute();
  $result = $emailResult->get_result();
  $checkId = $result->fetch_assoc()["id"];

  if($result->num_rows > 0 && $checkId != $userId) {
    $devolver = FALSE;
    die("Email ya en uso");
    return $devolver;
  }

  if(!empty($id_switch)){
    $switchResult = $conn->prepare('SELECT * FROM usuarios WHERE id_switch = ?');
    $switchResult->bind_param('s', $id_switch);
    $switchResult->execute();
    $result = $switchResult->get_result();
    $checkId = $result->fetch_assoc()["id"];

    if($result->num_rows > 0 && $checkId != $userId){
      $devolver = FALSE;
      die("Código de switch ya en uso");
      return $devolver;
    }
  }

  return $devolver;
}

function checkExisteUser($conn, $userId){
  //Comprueba que exista el usuario
  $devolver = TRUE;

  $result = $conn->prepare('SELECT * FROM usuarios WHERE id = ?');
  $result->bind_param('i', $userId);
  $result->execute();
  $result->store_result();

  if ($result->num_rows != 1) {
    $devolver= FALSE;
    die("No existe el usuario");
  }
  return $devolver;
}

function checkExisteUserByEmail($conn, $email){
  //Comprueba que exista un usuario asociado al email
  $devolver = TRUE;

  $result = $conn->prepare('SELECT * FROM usuarios WHERE email = ?');
  $result->bind_param('s', $email);
  $result->execute();
  $result->store_result();

  if ($result->num_rows != 1) {
    $devolver= FALSE;
    die("No existe un usuario con ese email");
  }
  return $devolver;
}

function checkVerification($conn, $userId, $verifCode){
  //Comprueba que el codigo  de verificacion pertenece al usuario
  $devolver = TRUE;

  $result = $conn->prepare('SELECT * FROM usuarios WHERE id = ? AND verification = ?');
  $result->bind_param('is', $userId, $verifCode);
  $result->execute();
  $result->store_result();

  if ($result->num_rows != 1) {
    $devolver= FALSE;
    die("Código de verificacion incorrecto");
  }

  return $devolver;
}

function checkVerificationJson($conn, $userId, $verifCode){
  //Comprueba que el codigo  de verificacion pertenece al usuario
  $devolver = TRUE;
  $sql = "SELECT * FROM usuarios WHERE id = $userId AND verification = '$verifCode'";
  $result = mysqli_query($conn,$sql);
  if ($result->num_rows != 1) {
    $devolver= FALSE;
    print(json_encode("Codigo de verificacion incorrecto, Error"));
  }
  return $devolver;
}

function checkPassword($conn, $email, $userPass){
  //Comprueba que la contraseña introducida por el usuario coincide con la de la DB
  $devolver = TRUE;

  $stmt = $conn->prepare('SELECT contrasenya FROM usuarios WHERE email = ?');
  $stmt->bind_param('s', $email);
  $stmt->execute();
  $result = $stmt->get_result();
  $storedPass = $result->fetch_assoc();

  if(!password_verify($userPass, $storedPass['contrasenya'])){
    $devolver= FALSE;
    die("Usuario o contraseña incorrectos");
  }

  return $devolver;
}
