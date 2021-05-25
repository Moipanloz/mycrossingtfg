<?php

if(isset($_GET["testing"]) && $_GET["testing"] == 'true'){
  header('Access-Control-Allow-Origin: http://localhost:9876');
}else{
  header('Access-Control-Allow-Origin: http://localhost:4200');
  //header('Access-Control-Allow-Origin: *');
}
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header('Access-Control-Allow-Methods: OPTIONS, PUT, DELETE, POST, GET');

//Si es para testing, se usan los datos en local
if(isset($_GET["testing"]) && $_GET["testing"] == 'true'){
  define("DB_DATABASE", "mycrossingtestdb");
  define("DB_USERNAME", 'mcadmin');
  define("DB_PASSWORD", 'thisismypass');
  define("DB_HOST", "localhost");
}else{
  //Funciona para local
  define("DB_DATABASE", "mycrossingtestdb");
  define("DB_USERNAME", 'mcadmin');
  define("DB_PASSWORD", 'thisismypass');
  define("DB_HOST", "localhost");
  //Si no, se usan los de heroku
  /*
  define("DB_USERNAME", getenv('DB_USERNAME'));
  define("DB_PASSWORD", getenv('DB_PASSWORD'));
  define("DB_DATABASE", getenv('DB_DATABASE'));
  define("DB_HOST", getenv('DB_HOST'));
  */
}

function connect(){

  // Create connection
  $conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE);
  // Check connection
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }
    //echo "Connected successfully";
  return $conn;

}

$conn = connect();
