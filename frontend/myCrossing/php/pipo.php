<?php

if(isset($_COOKIE)){
  print("is set");
  if(empty($_COOKIE)){
    print("but its epty");
  }else{
    $wea = var_dump($_COOKIE);
    print($wea);
  }


  print("--------------------------------");

  print($_COOKIE["userId"]);
}

?>
