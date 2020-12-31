<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

function checkUser($userId){
  $result = null;
  if($userId == ($_COOKIE["userId"] + 0)){
    $result = true;
  }else{
    $result = false;
    print("Usuario incorrecto");
  }
  return $result;
}

?>

