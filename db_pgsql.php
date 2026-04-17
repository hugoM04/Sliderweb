<?php

function conectarDB() {
    $host = "localhost";
    $db   = "hmalagon_db";
    $user = "hmalagon";
    $pass = "12345678";

    try {
        $conexion = new PDO("pgsql:host=$host;dbname=$db", $user, $pass);

        // Manejo de errores
        $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        return $conexion;

    } catch (PDOException $e) {
        die("Error de conexión: " . $e->getMessage());
    }
}

?>
