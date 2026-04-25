<?php
require_once 'db_pgsql.php';
// Limpiamos cualquier salida previa para no corromper el JSON
ob_clean(); 
header('Content-Type: application/json');

if (isset($_GET['id'])) {
    try {
        $db = conectarDB();
        // Usamos trim() en el encode para mayor seguridad
        $stmt = $db->prepare("SELECT id, tipo, encode(imagen, 'base64') as imagen FROM slider WHERE id = :id");
        $stmt->execute(['id' => $_GET['id']]);
        $img = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($img) {
            // Eliminamos posibles saltos de línea que PostgreSQL a veces inserta en el base64
            $img['imagen'] = str_replace(["\r", "\n"], '', $img['imagen']);
            echo json_encode($img);
        } else {
            echo json_encode(["error" => "No encontrado"]);
        }
    } catch (Exception $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
}
exit;
