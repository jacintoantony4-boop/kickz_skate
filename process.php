<?php
include 'db.php';

/* ADD USER */
if (isset($_POST['add_user'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    $conn->query("INSERT INTO Users (name, email, password)
                  VALUES ('$name', '$email', '$password')");
}

/* ADD PRODUCT */
if (isset($_POST['add_product'])) {
    $name = $_POST['name'];
    $price = $_POST['price'];
    $stock = $_POST['stock'];

    $conn->query("INSERT INTO Products (name, price, stock)
                  VALUES ('$name', '$price', '$stock')");
}

/* CREATE ORDER */
if (isset($_POST['create_order'])) {
    $user_id = $_POST['user_id'];
    $total = $_POST['total_amount'];

    $conn->query("INSERT INTO Orders (user_id, order_date, total_amount)
                  VALUES ('$user_id', NOW(), '$total')");
}

header("Location: index.php");
?>
