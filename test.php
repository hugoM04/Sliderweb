<?php

require_once 'db_pgsql.php';

$db = conectarDB();

if ($db) {
    echo "✅ Conexión exitosa a PostgreSQL";
}
?>
