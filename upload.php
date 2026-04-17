<?php
require_once 'db_pgsql.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (isset($_FILES['imagen'])) {

        $nombre = $_FILES['imagen']['name'];
        $tipo   = $_FILES['imagen']['type'];
        $tmp    = $_FILES['imagen']['tmp_name'];

        // Leer archivo en binario
        $imagen = file_get_contents($tmp);

        $db = conectarDB();

        try {

            $sql = "INSERT INTO slider (nombre, tipo, imagen) 
                    VALUES (:nombre, :tipo, :imagen)";

            $stmt = $db->prepare($sql);

            $stmt->bindParam(':nombre', $nombre);
            $stmt->bindParam(':tipo', $tipo);
            $stmt->bindParam(':imagen', $imagen, PDO::PARAM_LOB);

            $stmt->execute();

            echo "OK";

        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }

    } else {
        echo "No se recibió archivo";
    }

} else {
    echo "Método no permitido";
}
