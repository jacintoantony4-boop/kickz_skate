<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

// Read products from JSON file
$productsFile = '../products.json';

if (!file_exists($productsFile)) {
    echo json_encode([
        'success' => false,
        'message' => 'Products file not found'
    ]);
    exit;
}

$products = json_decode(file_get_contents($productsFile), true);

// Get query parameters for filtering
$type = isset($_GET['type']) ? $_GET['type'] : null;
$brand = isset($_GET['brand']) ? $_GET['brand'] : null;
$onSale = isset($_GET['onSale']) ? filter_var($_GET['onSale'], FILTER_VALIDATE_BOOLEAN) : null;
$maxPrice = isset($_GET['maxPrice']) ? (float)$_GET['maxPrice'] : null;
$id = isset($_GET['id']) ? $_GET['id'] : null;

// Filter products
$filteredProducts = array_filter($products, function($product) use ($type, $brand, $onSale, $maxPrice, $id) {
    if ($id && $product['id'] !== $id) return false;
    if ($type && $product['type'] !== $type) return false;
    if ($brand && $product['brand'] !== $brand) return false;
    if ($onSale !== null && $product['onSale'] !== $onSale) return false;
    if ($maxPrice && $product['price'] > $maxPrice) return false;
    return true;
});

// Sort products
$sort = isset($_GET['sort']) ? $_GET['sort'] : 'featured';

switch ($sort) {
    case 'price-low':
        usort($filteredProducts, function($a, $b) {
            return $a['price'] - $b['price'];
        });
        break;
    case 'price-high':
        usort($filteredProducts, function($a, $b) {
            return $b['price'] - $a['price'];
        });
        break;
    case 'rating':
        usort($filteredProducts, function($a, $b) {
            return $b['rating'] - $a['rating'];
        });
        break;
}

// If requesting single product, return just that product
if ($id) {
    $product = reset($filteredProducts);
    echo json_encode([
        'success' => true,
        'product' => $product ? $product : null
    ]);
} else {
    echo json_encode([
        'success' => true,
        'products' => array_values($filteredProducts),
        'count' => count($filteredProducts)
    ]);
}
?>
