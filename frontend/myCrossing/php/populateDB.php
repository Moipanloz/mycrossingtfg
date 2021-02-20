<?php

require "openDB.php";

// =====================================================================================================Tables
// ---------------------------------------------------------------------------------------------Drop

$sql = "DROP TABLE IF EXISTS usuariosce";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

$sql = "DROP TABLE IF EXISTS itemsce";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

$sql = "DROP TABLE IF EXISTS tareas";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

$sql = "DROP TABLE IF EXISTS misvecinos";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

$sql = "DROP TABLE IF EXISTS usuarios";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

// ---------------------------------------------------------------------------------------------Create

$error = "Failed during create";

$sql = "CREATE TABLE itemsce (
  id varchar(20) PRIMARY KEY,
  source enum('DIY','Estacional','Estela','Caza','Pesca','Gulliver','Gullivarr','Coti','Soponcio','Copito','Renato','Conga') NOT NULL DEFAULT 'DIY'
) ENGINE=InnoDB DEFAULT CHARSET=latin1";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

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

$sql = "CREATE TABLE usuariosce (
  usuario_id int(5) NOT NULL,
  itemce_id varchar(20) NOT NULL,
  PRIMARY KEY (usuario_id, itemce_id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE,
  FOREIGN KEY (itemce_id) REFERENCES itemsce (id) ON DELETE CASCADE
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
  vecino_id int(5) NOT NULL,
  usuario_id int(5) NOT NULL,
  amistad set('1','2','3','4','5','6') NOT NULL DEFAULT '1',
  PRIMARY KEY (vecino_id, usuario_id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));
// ---------------------------------------------------------------------------------------------Alter

$sql = "ALTER TABLE usuarios AUTO_INCREMENT = 2";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

// ---------------------------------------------------------------------------------------------Populate

$sql = 'INSERT INTO usuarios (nombre, id, isla, fruta, cumpleanyos, hemisferio, contrasenya, email, verification) VALUES
("admin", 1, "admin", "PERA", "2011-11-01", "NORTE", "$2y$10$INLqgAvDChOWDryMsYTacOoXBPGFKNkPFT9tZYoJMt3SEYvYFKhfu", "admin@email.com", ""),
("usuario2", NULL, "isla2", "PERA", "2011-11-01", "NORTE", "$2y$10$iZ5WsHshaQdziXgTQgF3MualwK2TgWvMQfxKYh8qqK2/mO4NXiqEG", "usuario2@email.com", "uVLDHRAnv3"),
("usuario3", NULL, "isla3", "MANZANA", "2012-12-02", "SUR", "$2y$10$RdmmT/4ODxwnmyqM6Mt0tuGtr3QvvX1Wx.QepqR7cTR9nvePSoQZm", "usuario3@email.com", "")';
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

$sql = "INSERT INTO tareas (id, usuario_id, hecha, imagen_url) VALUES
(NULL, 2, 0, '2'),
(NULL, 2, 0, '5'),
(NULL, 2, 0, '1'),
(NULL, 3, 0, '2'),
(NULL, 3, 1, '4'),
(NULL, 3, 1, '3')";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

$sql = "INSERT INTO misvecinos (vecino_id, usuario_id, amistad) VALUES
(1, 2, '1'),
(1, 3, '1'),
(2, 2, '1'),
(2, 3, '1')";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

$sql = "INSERT INTO itemsce (id, source) VALUES
('d1','DIY'),
('d2','DIY'),
('d3','DIY'),
('d4','DIY'),
('d5','DIY'),
('e6','Estela'),
('e7','Estela'),
('e8','Estela'),
('e9','Estela'),
('e10','Estela'),
('e11','Estela'),
('e12','Estela'),
('e13','Estela'),
('e14','Estela'),
('e15','Estela'),
('e16','Estela'),
('e17','Estela'),
('e18','Estela'),
('e19','Estela'),
('e20','Estela'),
('e21','Estela'),
('e22','Estela'),
('e23','Estela'),
('e24','Estela'),
('e25','Estela'),
('e26','Estela')
";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

$sql = "INSERT INTO usuariosce (usuario_id, itemce_id) VALUES
(1, 'd1'),
(1, 'd2'),
(2, 'd3'),
(1, 'd4'),
(2, 'd5'),
(2, 'e6'),
(2, 'e7'),
(2, 'e8'),
(3, 'e9'),
(1, 'e10'),
(1, 'e11'),
(1, 'e12'),
(3, 'e13'),
(1, 'e14'),
(2, 'e15'),
(3, 'e16'),
(2, 'e17'),
(1, 'e18'),
(1, 'e19'),
(1, 'e20'),
(3, 'e21'),
(2, 'e22'),
(1, 'e23'),
(1, 'e24'),
(3, 'e25'),
(3, 'e26')
";
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
