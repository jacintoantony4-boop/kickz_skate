<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

// Read bundles from JSON file
$bundlesFile = '../bundles.json';

if (!file_exists($bundlesFile)) {
    echo json_encode([
        'success' => false,
        'message' => 'Bundles file not found'
    ]);
    exit;
}

$bundles = json_decode(file_get_contents($bundlesFile), true);

// Get query parameters
$id = isset($_GET['id']) ? $_GET['id'] : null;

// Filter by ID if provided
if ($id) {
    $bundle = array_filter($bundles, function($bundle) use ($id) {
        return $bundle['id'] === $id;
    });
    
    $bundle = reset($bundle);
    
    echo json_encode([
        'success' => true,
        'bundle' => $bundle ? $bundle : null
    ]);
} else {
    echo json_encode([
        'success' => true,
        'bundles' => $bundles,
        'count' => count($bundles)
    ]);
}
?>
