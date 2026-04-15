let currentProduct = null;
let selectedSize = null;
let selectedColor = null;

async function loadProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        window.location.href = 'shop.html';
        return;
    }

    try {
        const response = await fetch('products.json');
        const products = await response.json();
        currentProduct = products.find(p => p.id === productId);

        if (!currentProduct) {
            window.location.href = 'shop.html';
            return;
        }

        displayProduct();
    } catch (error) {
        console.error('Error loading product:', error);
    }
}

function displayProduct() {
    const container = document.getElementById('productDetail');
    
    container.innerHTML = `
        <div class="product-detail-grid">
            <div class="product-detail-image">
                <img src="${currentProduct.image}" alt="${currentProduct.name}">
            </div>

            <div class="product-detail-info">
                <div class="product-badges">
                    <span class="badge">${currentProduct.type}</span>
                    <span class="badge">${currentProduct.category}</span>
                    ${currentProduct.onSale ? '<span class="badge" style="background: #e74c3c; color: white;">ON SALE</span>' : ''}
                </div>

                <p class="product-detail-brand">${currentProduct.brand}</p>
                <h1 class="product-detail-title">${currentProduct.name}</h1>
                
                <div class="product-rating" style="margin-bottom: 1rem;">
                    <div class="stars">${displayStars(currentProduct.rating)}</div>
                    <span class="rating-text">${currentProduct.rating.toFixed(1)} (${currentProduct.reviewCount} reviews)</span>
                </div>

                <div class="product-detail-price">
                    ${formatPrice(currentProduct.price)}
                    ${currentProduct.onSale && currentProduct.originalPrice ? `
                        <span style="font-size: 1.25rem; color: #888; text-decoration: line-through; margin-left: 1rem;">
                            ${formatPrice(currentProduct.originalPrice)}
                        </span>
                    ` : ''}
                </div>

                <p class="product-detail-description">${currentProduct.description}</p>

                <div class="product-options">
                    <div class="option-group">
                        <h3>Select Color</h3>
                        <div class="option-buttons" id="colorOptions">
                            ${currentProduct.colors.map(color => `
                                <button class="option-btn" onclick="selectColor('${color}')">${color}</button>
                            `).join('')}
                        </div>
                    </div>

                    <div class="option-group">
                        <h3>Select Size ${currentProduct.type === 'Sneakers' ? '(US)' : ''}</h3>
                        <div class="option-buttons" id="sizeOptions">
                            ${currentProduct.sizes.map(size => `
                                <button class="option-btn" onclick="selectSize('${size}')">${size}</button>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="action-buttons">
                    <button class="btn btn-primary" onclick="addToCart()">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="btn btn-secondary" onclick="buyNow()">
                        Buy Now
                    </button>
                </div>

                <div class="product-details-section">
                    <h3>Product Details</h3>
                    <dl style="display: grid; grid-template-columns: auto 1fr; gap: 0.5rem;">
                        <dt>Type:</dt><dd>${currentProduct.type}</dd>
                        <dt>Brand:</dt><dd>${currentProduct.brand}</dd>
                        <dt>Category:</dt><dd>${currentProduct.category}</dd>
                        <dt>Available Sizes:</dt><dd>${currentProduct.sizes.join(', ')}</dd>
                        <dt>Colors:</dt><dd>${currentProduct.colors.join(', ')}</dd>
                    </dl>
                </div>
            </div>
        </div>

        <!-- Reviews Section -->
        <div class="reviews-section">
            <h2 style="font-size: 2rem; margin-bottom: 2rem;">Customer Reviews</h2>
            
            <div class="reviews-grid">
                <div class="reviews-summary">
                    <div class="rating-number">${currentProduct.rating.toFixed(1)}</div>
                    <div class="stars" style="justify-content: center; margin-bottom: 0.5rem;">
                        ${displayStars(currentProduct.rating)}
                    </div>
                    <p style="color: #666;">Based on ${currentProduct.reviewCount} reviews</p>
                </div>

                <div class="reviews-list">
                    ${currentProduct.reviews.map(review => `
                        <div class="review-card">
                            <div class="review-header">
                                <div>
                                    <p class="review-author">${review.userName}</p>
                                    <div class="stars">${displayStars(review.rating)}</div>
                                </div>
                                <p class="review-date">${new Date(review.date).toLocaleDateString()}</p>
                            </div>
                            <p class="review-comment">${review.comment}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function selectColor(color) {
    selectedColor = color;
    
    // Update UI
    document.querySelectorAll('#colorOptions .option-btn').forEach(btn => {
        btn.classList.remove('selected');
        if (btn.textContent === color) {
            btn.classList.add('selected');
        }
    });
}

function selectSize(size) {
    selectedSize = size;
    
    // Update UI
    document.querySelectorAll('#sizeOptions .option-btn').forEach(btn => {
        btn.classList.remove('selected');
        if (btn.textContent === size) {
            btn.classList.add('selected');
        }
    });
}

function addToCart() {
    if (!selectedSize) {
        showNotification('Please select a size', 'error');
        return;
    }
    if (!selectedColor) {
        showNotification('Please select a color', 'error');
        return;
    }

    cart.addItem(currentProduct, selectedSize, selectedColor, 1);
    showNotification('Added to cart!', 'success');
}

function buyNow() {
    if (!selectedSize) {
        showNotification('Please select a size', 'error');
        return;
    }
    if (!selectedColor) {
        showNotification('Please select a color', 'error');
        return;
    }

    cart.addItem(currentProduct, selectedSize, selectedColor, 1);
    window.location.href = 'cart.html';
}

// Load product when page loads
loadProductDetail();
