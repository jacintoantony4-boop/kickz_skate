<?php include 'db.php'; ?>
<!DOCTYPE html>
<html>
<head>
    <title>Ordering System</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<header>
    <h1>Ordering System</h1>
</header>

<div class="container">

    <!-- ADD USER -->
    <h2>Add User</h2>
    <form method="POST" action="process.php">
        <input type="text" name="name" placeholder="Name" required>
        <input type="email" name="email" placeholder="Email" required>
        <input type="text" name="password" placeholder="Password" required>
        <button name="add_user">Add User</button>
    </form>

    <!-- ADD PRODUCT -->
    <h2>Add Product</h2>
    <form method="POST" action="process.php">
        <input type="text" name="name" placeholder="Product Name" required>
        <input type="number" step="0.01" name="price" placeholder="Price" required>
        <input type="number" name="stock" placeholder="Stock" required>
        <button name="add_product">Add Product</button>
    </form>

    <!-- CREATE ORDER -->
    <h2>Create Order</h2>
    <form method="POST" action="process.php">
        <select name="user_id">
            <?php
            $users = $conn->query("SELECT * FROM Users");
            while ($row = $users->fetch_assoc()) {
                echo "<option value='{$row['user_id']}'>{$row['name']}</option>";
            }
            ?>
        </select>

        <input type="number" step="0.01" name="total_amount" placeholder="Total Amount" required>
        <button name="create_order">Create Order</button>
    </form>

    <!-- PRODUCTS DISPLAY -->
    <h2>Products</h2>
    <div class="grid">
        <?php
        $products = $conn->query("SELECT * FROM Products");
        while ($row = $products->fetch_assoc()) {
            echo "<div class='card'>
                    <h3>{$row['name']}</h3>
                    <p>₱{$row['price']}</p>
                    <p>Stock: {$row['stock']}</p>
                  </div>";
        }
        ?>
    </div>

    <!-- ORDERS TABLE -->
    <h2>Orders</h2>
    <table>
        <tr>
            <th>ID</th>
            <th>User</th>
            <th>Date</th>
            <th>Total</th>
        </tr>

        <?php
        $orders = $conn->query("
            SELECT o.order_id, u.name, o.order_date, o.total_amount
            FROM Orders o
            JOIN Users u ON o.user_id = u.user_id
        ");

        while ($row = $orders->fetch_assoc()) {
            echo "<tr>
                    <td>{$row['order_id']}</td>
                    <td>{$row['name']}</td>
                    <td>{$row['order_date']}</td>
                    <td>₱{$row['total_amount']}</td>
                  </tr>";
        }
        ?>
    </table>

</div>

</body>
</html>
