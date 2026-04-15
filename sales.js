async function loadSaleProducts() {
    try {
        const response = await fetch('products.json');
        const products = await response.json();
        
        const saleProducts = products.filter(p => p.onSale);
        displaySaleProducts(saleProducts);
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

function displaySaleProducts(products) {
    const container = document.getElementById('saleProducts');
    const countEl = document.getElementById('saleCount');
    const noProducts = document.getElementById('noSaleProducts');

    if (products.length === 0) {
        container.style.display = 'none';
        noProducts.style.display = 'block';
        countEl.textContent = '';
        return;
    }

    container.style.display = 'grid';
    noProducts.style.display = 'none';
    countEl.textContent = `${products.length} item${products.length !== 1 ? 's' : ''} on sale`;

    container.innerHTML = products.map(product => `
        <a href="product.html?id=${product.id}" class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="sale-badge">
                    <i class="fas fa-tag"></i>
                    ${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </div>
            </div>
            <div class="product-info">
                <p class="product-brand">${product.brand}</p>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <div class="stars">${displayStars(product.rating)}</div>
                    <span class="rating-text">${product.rating.toFixed(1)} (${product.reviewCount})</span>
                </div>
                <div class="product-price-row">
                    <div class="product-prices">
                        <span class="product-price">${formatPrice(product.price)}</span>
                        <span class="product-original-price">${formatPrice(product.originalPrice)}</span>
                    </div>
                    <span class="product-type">${product.type}</span>
                </div>
            </div>
        </a>
    `).join('');
}

// Load sale products when page loads
loadSaleProducts();
