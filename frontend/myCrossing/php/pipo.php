<?php

include 'prueba.php';
$conn = ConnectDB();
echo "Connected Successfully";

CloseConnection($conn);

$conn -> close();

?>
