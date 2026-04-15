<?php
include 'db.php';
header('Content-Type: application/json');

$type = $_GET['type'] ?? '';

/* USERS */
if ($type == "users") {
    $result = $conn->query("SELECT * FROM Users");
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}

/* PRODUCTS */
elseif ($type == "products") {
    $result = $conn->query("SELECT * FROM Products");
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}

/* ORDERS WITH USER */
elseif ($type == "orders") {
    $sql = "SELECT o.order_id, u.name, o.order_date, o.total_amount
            FROM Orders o
            JOIN Users u ON o.user_id = u.user_id";

    $result = $conn->query($sql);
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}

/* FULL ORDER DETAILS */
elseif ($type == "full_order") {
    $sql = "
        SELECT o.order_id, u.name, p.name AS product, oi.quantity
        FROM Orders o
        JOIN Users u ON o.user_id = u.user_id
        JOIN Order_Items oi ON o.order_id = oi.order_id
        JOIN Products p ON oi.product_id = p.product_id
    ";

    $result = $conn->query($sql);
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}

else {
    echo json_encode(["message" => "Invalid request"]);
}
?>
