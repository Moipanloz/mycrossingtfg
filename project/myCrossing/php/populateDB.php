<?php

require "openDB.php";

// =====================================================================================================Tables
// ---------------------------------------------------------------------------------------------Drop

$sql = "DROP TABLE IF EXISTS catfosiles";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

$sql = "DROP TABLE IF EXISTS colesp";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

$sql = "DROP TABLE IF EXISTS tareas";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

$sql = "DROP TABLE IF EXISTS misvecinos";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

$sql = "DROP TABLE IF EXISTS visitas";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

$sql = "DROP TABLE IF EXISTS usuarios";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

// ---------------------------------------------------------------------------------------------Create

$error = "Failed during create";

$sql = "CREATE TABLE usuarios (
  id int(5) PRIMARY KEY AUTO_INCREMENT,
  nombre varchar(20) NOT NULL,
  isla varchar(20) NOT NULL,
  fruta enum('PERA','MANZANA','CEREZA','NARANJA','MELOCOTON') NOT NULL,
  cumpleanyos date NOT NULL,
  hemisferio enum('NORTE','SUR') NOT NULL,
  contrasenya varchar(100) NOT NULL,
  email varchar(30) UNIQUE KEY NOT NULL,
  verification varchar(40) DEFAULT NULL,
  id_suenyo varchar(17) UNIQUE KEY DEFAULT NULL,
  id_switch varchar(17) UNIQUE KEY DEFAULT NULL,
  apodo_aldeano varchar(30) DEFAULT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

$sql = "CREATE TABLE colesp (
  usuario_id int(5) NOT NULL,
  item_name varchar(30) NOT NULL,
  item_source enum('DIY','Estacional','Estela','Kamilo','CJ','Gulliver','Boda','Pascal','Gullivarrr','Coti','Soponcio','Guindo','Copito','Renato','Conga','Dodo','Mama','Cumple') NOT NULL DEFAULT 'DIY',
  PRIMARY KEY (usuario_id, item_name),
  FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

$sql = "CREATE TABLE tareas (
  id int(5) PRIMARY KEY AUTO_INCREMENT,
  usuario_id int(5) NOT NULL,
  hecha tinyint(1) NOT NULL,
  imagen_url varchar(100) NOT NULL,
  FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

$sql = "CREATE TABLE misvecinos (
  vecino_id varchar(30) NOT NULL,
  usuario_id int(5) NOT NULL,
  amistad set('1','2','3','4','5','6') NOT NULL DEFAULT '1',
  PRIMARY KEY (vecino_id, usuario_id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

$sql = "CREATE TABLE visitas (
  usuario_id int(5) NOT NULL,
  lpa varchar(15) DEFAULT NULL,
  mpa varchar(15) DEFAULT NULL,
  xpa varchar(15) DEFAULT NULL,
  jpa varchar(15) DEFAULT NULL,
  vpa varchar(15) DEFAULT NULL,
  lpr varchar(15) DEFAULT NULL,
  mpr varchar(15) DEFAULT NULL,
  xpr varchar(15) DEFAULT NULL,
  jpr varchar(15) DEFAULT NULL,
  vpr varchar(15) DEFAULT NULL,
  estela boolean DEFAULT FALSE,
  last_update varchar(25) DEFAULT NULL,
  PRIMARY KEY (usuario_id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

$sql = "CREATE TABLE catfosiles (
  usuario_id int(5) NOT NULL,
  nombre_fosil varchar(30) NOT NULL,
  PRIMARY KEY (nombre_fosil, usuario_id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));
// ---------------------------------------------------------------------------------------------Alter

$sql = "ALTER TABLE usuarios AUTO_INCREMENT = 2";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

// ---------------------------------------------------------------------------------------------Populate

$sql = 'INSERT INTO usuarios (nombre, id, isla, fruta, cumpleanyos, hemisferio, contrasenya, email, verification) VALUES
("usuario1", 1, "isla1", "PERA", "2011-10-01", "NORTE", "$2y$10$JWDNNyA/07FYk8oiDvckQ.yurypHiJf1Ljby4gsAD4Xdprm5UAfS6", "usuario1@gmail.com", ""),
("usuario2", NULL, "isla2", "PERA", "2012-11-02", "NORTE", "$2y$10$iZ5WsHshaQdziXgTQgF3MualwK2TgWvMQfxKYh8qqK2/mO4NXiqEG", "usuario2@gmail.com", "uVLDHRAnv3"),
("usuario3", NULL, "isla3", "MANZANA", "2013-12-03", "SUR", "$2y$10$RdmmT/4ODxwnmyqM6Mt0tuGtr3QvvX1Wx.QepqR7cTR9nvePSoQZm", "usuario3@gmail.com", "")';
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

$sql = "INSERT INTO tareas (id, usuario_id, hecha, imagen_url) VALUES
(NULL, 2, 0, 'bolsa-bayas'),
(NULL, 2, 0, 'diy'),
(NULL, 2, 0, 'fosil'),
(NULL, 3, 0, 'hierbajos'),
(NULL, 3, 1, 'regalo'),
(NULL, 3, 1, 'receta-en-botella')";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

$sql = "INSERT INTO misvecinos (vecino_id, usuario_id, amistad) VALUES
('B3RyfNEqwGmcccRC3', 2, '3'),
('B3RyfNEqwGmcccRC3', 3, '3'),
('LBifxETQJGEaLhBjC', 2, '6'),
('SGMdki6dzpDZyXAw5', 3, '6')";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

$sql = "INSERT INTO colesp (usuario_id, item_name, item_source) VALUES
(2, 'wand', 'Estela'),
(2, 'flimsy axe', 'DIY')";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

$sql = "INSERT INTO catfosiles (usuario_id, nombre_fosil) VALUES
(2, 'ammonite'),
(2, 'amber')";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));
// ===================================================================================================== Events
// ---------------------------------------------------------------------------------------------Drop

$sql = "DROP EVENT IF EXISTS reiniciaTareasDaily";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

// ---------------------------------------------------------------------------------------------Scheduler

$sql = "SET GLOBAL event_scheduler = ON";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

// ---------------------------------------------------------------------------------------------Create

$sql = "CREATE EVENT reiniciaTareasDaily
ON SCHEDULE EVERY 1 DAY STARTS '2020-12-30 05:00:00'
ON COMPLETION PRESERVE
DO BEGIN
  UPDATE tareas SET hecha = 0;
END";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

// =====================================================================================================

print("Population done");
$conn -> close();

?>
