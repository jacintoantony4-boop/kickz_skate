function displayCart() {
    const container = document.getElementById('cartContent');
    
    if (cart.items.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h2 style="font-size: 1.5rem; margin-bottom: 0.5rem;">Your cart is empty</h2>
                <p style="color: #666; margin-bottom: 2rem;">Add some items to get started!</p>
                <a href="shop.html" class="btn btn-primary">Continue Shopping</a>
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <div class="cart-grid">
            <div class="cart-items">
                <h2 style="margin-bottom: 1.5rem;">Cart Items</h2>
                ${cart.items.map((item, index) => `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        
                        <div class="cart-item-details">
                            <h3>${item.name}</h3>
                            <p class="cart-item-meta">${item.brand} • ${item.type}</p>
                            <p class="cart-item-meta">Size: ${item.size} | Color: ${item.color}</p>
                            
                            <div class="cart-item-quantity">
                                <button class="qty-btn" onclick="updateQuantity(${index}, ${item.quantity - 1})">
                                    <i class="fas fa-minus"></i>
                                </button>
                                <input type="number" class="qty-input" value="${item.quantity}" 
                                    onchange="updateQuantity(${index}, parseInt(this.value))" min="1">
                                <button class="qty-btn" onclick="updateQuantity(${index}, ${item.quantity + 1})">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                        </div>
                        
                        <div class="cart-item-actions">
                            <p class="cart-item-price">${formatPrice(item.price * item.quantity)}</p>
                            <button class="remove-btn" onclick="removeItem(${index})">
                                <i class="fas fa-trash"></i> Remove
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="cart-summary">
                <h2>Order Summary</h2>
                
                <div class="summary-row">
                    <span>Subtotal (${cart.getItemCount()} items)</span>
                    <span>${formatPrice(cart.getTotal())}</span>
                </div>
                
                <div class="summary-row">
                    <span>Shipping</span>
                    <span>${formatPrice(0)}</span>
                </div>
                
                <div class="summary-row total">
                    <span>Total</span>
                    <span>${formatPrice(cart.getTotal())}</span>
                </div>

                <button class="btn btn-primary" style="width: 100%; margin-bottom: 1rem;" onclick="checkout()">
                    Proceed to Checkout
                </button>
                
                <a href="shop.html" class="btn btn-secondary" style="width: 100%; text-align: center;">
                    Continue Shopping
                </a>

                <button class="btn" style="width: 100%; margin-top: 1rem; background: #e74c3c; color: white;" onclick="clearCart()">
                    Clear Cart
                </button>
            </div>
        </div>
    `;
}

function updateQuantity(index, newQuantity) {
    cart.updateQuantity(index, newQuantity);
    displayCart();
}

function removeItem(index) {
    if (confirm('Remove this item from cart?')) {
        cart.removeItem(index);
        displayCart();
        showNotification('Item removed from cart', 'success');
    }
}

function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        cart.clearCart();
        displayCart();
        showNotification('Cart cleared', 'success');
    }
}

function checkout() {
    showNotification('Checkout feature coming soon!', 'success');
    // In a real application, this would redirect to checkout
}

// Display cart when page loads
displayCart();
