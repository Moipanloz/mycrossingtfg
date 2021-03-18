<?php

header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header('Access-Control-Allow-Methods: OPTIONS, PUT, DELETE, POST, GET');

define("DB_SERVERNAME", "localhost");
define("DB_USER", "mcadmin");
define("DB_PASS", "thisismypass");
define("DB_NAME", "mycrossingdb");

function connect(){

  // Create connection
  $conn = new mysqli(DB_SERVERNAME, DB_USER, DB_PASS, DB_NAME);
  // Check connection
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }
    //echo "Connected successfully";
  return $conn;

}

$conn = connect();
