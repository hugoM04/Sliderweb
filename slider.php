<?php
require_once 'db_pgsql.php';

header('Content-Type: application/json');

$db = conectarDB();

try {

    $sql = "SELECT id, nombre, tipo, imagen FROM slider ORDER BY id DESC";
    $stmt = $db->query($sql);

    $imagenes = [];

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

        $imagenes[] = [
            "id" => $row['id'],
            "nombre" => $row['nombre'],
            "tipo" => $row['tipo'],
            // Convertimos BLOB → base64
            "imagen" => base64_encode($row['imagen'])
        ];
    }

    echo json_encode($imagenes);

} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
