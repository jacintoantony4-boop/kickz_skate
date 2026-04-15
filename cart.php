<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

// Start session for cart management
session_start();

// Get request method
$method = $_SERVER['REQUEST_METHOD'];

// Initialize cart if not exists
if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = [];
}

switch ($method) {
    case 'GET':
        // Get cart contents
        echo json_encode([
            'success' => true,
            'cart' => $_SESSION['cart']
        ]);
        break;

    case 'POST':
        // Add item to cart
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!$data || !isset($data['product']) || !isset($data['size']) || !isset($data['color'])) {
            echo json_encode([
                'success' => false,
                'message' => 'Invalid data'
            ]);
            exit;
        }

        $product = $data['product'];
        $size = $data['size'];
        $color = $data['color'];
        $quantity = isset($data['quantity']) ? (int)$data['quantity'] : 1;

        // Check if item already exists in cart
        $found = false;
        foreach ($_SESSION['cart'] as &$item) {
            if ($item['id'] === $product['id'] && 
                $item['size'] === $size && 
                $item['color'] === $color) {
                $item['quantity'] += $quantity;
                $found = true;
                break;
            }
        }

        if (!$found) {
            $_SESSION['cart'][] = [
                'id' => $product['id'],
                'name' => $product['name'],
                'brand' => $product['brand'],
                'price' => $product['price'],
                'image' => $product['image'],
                'type' => $product['type'],
                'size' => $size,
                'color' => $color,
                'quantity' => $quantity
            ];
        }

        echo json_encode([
            'success' => true,
            'message' => 'Item added to cart',
            'cart' => $_SESSION['cart']
        ]);
        break;

    case 'PUT':
        // Update cart item quantity
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['index']) || !isset($data['quantity'])) {
            echo json_encode([
                'success' => false,
                'message' => 'Invalid data'
            ]);
            exit;
        }

        $index = (int)$data['index'];
        $quantity = (int)$data['quantity'];

        if ($quantity <= 0) {
            // Remove item if quantity is 0 or less
            array_splice($_SESSION['cart'], $index, 1);
        } else if (isset($_SESSION['cart'][$index])) {
            $_SESSION['cart'][$index]['quantity'] = $quantity;
        }

        echo json_encode([
            'success' => true,
            'cart' => $_SESSION['cart']
        ]);
        break;

    case 'DELETE':
        // Clear cart or remove specific item
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (isset($data['index'])) {
            $index = (int)$data['index'];
            array_splice($_SESSION['cart'], $index, 1);
            $message = 'Item removed from cart';
        } else {
            $_SESSION['cart'] = [];
            $message = 'Cart cleared';
        }

        echo json_encode([
            'success' => true,
            'message' => $message,
            'cart' => $_SESSION['cart']
        ]);
        break;

    default:
        echo json_encode([
            'success' => false,
            'message' => 'Invalid request method'
        ]);
        break;
}
?>
