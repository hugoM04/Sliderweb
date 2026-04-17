<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once 'db_pgsql.php';

header('Content-Type: application/json');

try {
    $db = conectarDB();

    $sql = "SELECT id, nombre, tipo, encode(imagen, 'base64') as imagen FROM slider ORDER BY id DESC";
    $stmt = $db->query($sql);

    $imagenes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($imagenes);

} catch (Exception $e) {
    echo json_encode([
        "error" => $e->getMessage()
    ]);
}
