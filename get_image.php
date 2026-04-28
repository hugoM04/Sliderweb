<?php
require_once 'dbmysql.php'; // Corregido el nombre de la función

if (isset($_GET['id'])) {
    try {
        $db = conectarDB();
        // AJUSTE: Cambiamos 'tipo' por 'extension' y 'imagen' por 'datos'
        $stmt = $db->prepare("SELECT extension, datos FROM imagenes WHERE id = :id");
        $stmt->execute(['id' => $_GET['id']]);
        
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            // AJUSTE: Usamos los nombres de tu tabla MariaDB
            $imagen = $row['datos'];
            $tipo = trim($row['extension']);

            // En MariaDB con PDO, los BLOB a veces vienen como recursos o como strings
            if (is_resource($imagen)) {
                $imagen = stream_get_contents($imagen);
            }

            // IMPORTANTE: Quita la limpieza de PostgreSQL ('\\x'), 
            // MariaDB no usa ese formato para los BLOB.

            if (ob_get_length()) ob_clean();
            
            header("Content-Type: " . $tipo);
            header("Content-Length: " . strlen($imagen));
            echo $imagen;
            exit;
        }
    } catch (Exception $e) {
        header("HTTP/1.1 500 Internal Server Error");
        echo $e->getMessage();
    }
}
