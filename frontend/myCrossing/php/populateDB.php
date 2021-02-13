<?php

require "openDB.php";

// =====================================================================================================Tables
// ---------------------------------------------------------------------------------------------Drop

$sql = "DROP TABLE IF EXISTS coleccionesespinv";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

$sql = "DROP TABLE IF EXISTS coleccionesespeciales";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

$sql = "DROP TABLE IF EXISTS tareas";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

$sql = "DROP TABLE IF EXISTS misvecinos";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

$sql = "DROP TABLE IF EXISTS usuarios";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

// ---------------------------------------------------------------------------------------------Create

$error = "Failed during create";

$sql = "CREATE TABLE coleccionesespinv (
  source varchar(20) NOT NULL,
  items set('') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

$sql = "CREATE TABLE coleccionesespeciales (
  usuario_id int(11) NOT NULL,
  source varchar(20) NOT NULL,
  items set('','d1','d2','d3') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

$sql = "CREATE TABLE tareas (
  id int(11) NOT NULL,
  usuario_id int(11) NOT NULL,
  hecha tinyint(1) NOT NULL,
  imagen_url varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

$sql = "CREATE TABLE misvecinos (
  vecino_id int(11) NOT NULL,
  usuario_id int(11) NOT NULL,
  amistad set('1','2','3','4','5','6') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

$sql = "CREATE TABLE usuarios (
  nombre varchar(20) NOT NULL,
  id int(11) NOT NULL,
  isla varchar(20) NOT NULL,
  fruta enum('PERA','MANZANA','CEREZA','NARANJA','MELOCOTON') NOT NULL,
  cumpleanyos date NOT NULL,
  hemisferio enum('NORTE','SUR') NOT NULL,
  contrasenya varchar(100) NOT NULL,
  email varchar(30) NOT NULL,
  verification varchar(40) DEFAULT NULL,
  id_suenyo varchar(17) DEFAULT NULL,
  id_switch varchar(17) DEFAULT NULL,
  apodo_aldeano varchar(30) DEFAULT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

// ---------------------------------------------------------------------------------------------Alter

$sql = "ALTER TABLE usuarios
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY email (`email`),
  ADD UNIQUE KEY id_suenyo (`id_suenyo`),
  ADD UNIQUE KEY id_switch (`id_switch`),
  MODIFY id int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

$sql = "ALTER TABLE tareas
  ADD PRIMARY KEY (id),
  ADD KEY tareas_ibfk_1 (usuario_id),
  MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8,
  ADD CONSTRAINT tareas_ibfk_1 FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

$sql = "ALTER TABLE misvecinos
  ADD PRIMARY KEY (vecino_id,usuario_id),
  ADD KEY misvecinos_ibfk_1 (usuario_id),
  ADD CONSTRAINT misvecinos_ibfk_1 FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

$sql = "ALTER TABLE coleccionesespinv
  ADD PRIMARY KEY (source)";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

$sql = "ALTER TABLE coleccionesespeciales
  ADD PRIMARY KEY (usuario_id, source),
  ADD KEY coleccionesespeciales_ibfk_1 (usuario_id),
  ADD CONSTRAINT coleccionesespeciales_ibfk_1 FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

// ---------------------------------------------------------------------------------------------Populate

$sql = "INSERT INTO usuarios (nombre, id, isla, fruta, cumpleanyos, hemisferio, contrasenya, email, verification) VALUES
('admin', 1, 'admin', 'PERA', '2011-11-01', 'NORTE', 'U2FsdGVkX18L+hGuMqOnU+HkOv/6tpXZKFZRZX4ly9w=', 'admin@email.com', ''),
('usuario1', 2, 'isla1', 'PERA', '2011-11-01', 'NORTE', 'U2FsdGVkX1/y6H74uxg4NHfptRxLbVeygCa2vNSxIIM=', 'usuario1@email.com', 'uVLDHRAnv3'),
('usuario2', 3, 'isla2', 'MANZANA', '2012-12-02', 'SUR', 'U2FsdGVkX1+i3f3DoYZ/0Yd6G1/LEdjDxdSp0bmo30g=', 'usuario2@email.com', '')";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

$sql = "INSERT INTO tareas (id, usuario_id, hecha, imagen_url) VALUES
(1, 2, 0, '2'),
(2, 2, 0, '5'),
(4, 2, 0, '1'),
(5, 3, 0, '2'),
(6, 3, 1, '4'),
(7, 3, 1, '3')";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

$sql = "INSERT INTO misvecinos (vecino_id, usuario_id, amistad) VALUES
(1, 2, '1'),
(1, 3, '1'),
(2, 2, '1'),
(2, 3, '1');";
$result = mysqli_query($conn,$sql) or die(mysqli_error($conn));

$sql = "INSERT INTO coleccionesespeciales (usuario_id, source, items) VALUES
(1, 'DIY', 'd1,d3'),
(1, 'Estacional', ''),
(1, 'Estela', ''),
(1, 'Caza', ''),
(1, 'Pesca', ''),
(1, 'Gulliver', ''),
(1, 'Gullivarr', ''),
(1, 'Coti', ''),
(1, 'Soponcio', ''),
(1, 'Copito', ''),
(1, 'Renato', ''),
(1, 'Conga', ''),
(2, 'DIY', 'd1,d2,d3'),
(2, 'Estacional', ''),
(2, 'Estela', ''),
(2, 'Caza', ''),
(2, 'Pesca', ''),
(2, 'Gulliver', ''),
(2, 'Gullivarr', ''),
(2, 'Coti', ''),
(2, 'Soponcio', ''),
(2, 'Copito', ''),
(2, 'Renato', ''),
(2, 'Conga', ''),
(3, 'DIY', 'd1'),
(3, 'Estacional', ''),
(3, 'Estela', ''),
(3, 'Caza', ''),
(3, 'Pesca', ''),
(3, 'Gulliver', ''),
(3, 'Gullivarr', ''),
(3, 'Coti', ''),
(3, 'Soponcio', ''),
(3, 'Copito', ''),
(3, 'Renato', ''),
(3, 'Conga', '')
;";
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
