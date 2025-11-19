<?php
header('Content-Type: application/json');
$stateFile = 'state.json';

if (file_exists($stateFile)) {
    readfile($stateFile);
} else {
    echo json_encode(['error' => 'Archivo de estado no encontrado.']);
}
?>
