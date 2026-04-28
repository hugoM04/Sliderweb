<?php
// dbmysql.php

function conectarDB() {
    $host = "localhost";
    $db   = "slider_db";
    $user = "hmalagon";
    $pass = "123456789"; // La que recuperamos antes

    try {
        // Importante: el prefijo debe ser 'mysql' para MariaDB
        $conexion = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
        
        // Configurar para que lance excepciones en errores
        $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        return $conexion;
    } catch (PDOException $e) {
        die("Error de conexión: " . $e->getMessage());
    }
}
?>
