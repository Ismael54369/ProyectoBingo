<?php
header('Content-Type: application/json');

$stateFile = 'state.json';
$cardId = $_GET['id'] ?? null;

if (!$cardId) {
    echo json_encode(['success' => false, 'message' => 'No se proporcionó ID de tarjeta.']);
    exit;
}

// Bloqueamos el archivo de estado para evitar condiciones de carrera.
$fp = fopen($stateFile, 'r+');
if (!flock($fp, LOCK_EX)) {
    echo json_encode(['success' => false, 'message' => 'El servidor está ocupado, inténtalo de nuevo.']);
    exit;
}

$state = json_decode(fread($fp, filesize($stateFile)), true);

if (!isset($state[$cardId])) {
    echo json_encode(['success' => false, 'message' => 'La tarjeta no existe.']);
    flock($fp, LOCK_UN); // Liberar bloqueo
    fclose($fp);
    exit;
}

if ($state[$cardId] === true) { // true significa disponible
    $state[$cardId] = false; // La marcamos como no disponible
    
    // Rebobinamos y escribimos el nuevo estado
    ftruncate($fp, 0);
    rewind($fp);
    fwrite($fp, json_encode($state, JSON_PRETTY_PRINT));
    
    echo json_encode(['success' => true, 'message' => 'Tarjeta asignada con éxito.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Esta tarjeta ya ha sido elegida.']);
}

flock($fp, LOCK_UN); // Liberar bloqueo
fclose($fp);
?>
