<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

function checkUser($userId){
  $result = null;
  if(array_key_exists("userId", $_COOKIE)){
    $cookie = (int)$_COOKIE["userId"];
    if($userId == $cookie){
      $result = true;
    }else{
      $result = false;
      print("Usuario incorrecto");
    }
  }else{
    $result = false;
    print("La cookie no existe");
  }
  return $result;
}

?>

