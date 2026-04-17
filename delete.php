<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once 'db_pgsql.php';

if (!isset($_POST['id'])) {
    echo "ID no recibido";
    exit;
}

$id = $_POST['id'];

try {
    $db = conectarDB();

    $sql = "DELETE FROM slider WHERE id = :id";
    $stmt = $db->prepare($sql);

    $stmt->execute(['id' => $id]);

    echo "Imagen eliminada correctamente";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
