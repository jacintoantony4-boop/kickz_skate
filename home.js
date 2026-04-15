// Load featured products on home page
async function loadFeaturedProducts() {
    try {
        const response = await fetch('products.json');
        const products = await response.json();
        
        // Show first 4 products as featured
        const featuredProducts = products.slice(0, 4);
        displayProducts(featuredProducts, 'featuredProducts');
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

function displayProducts(products, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = products.map(product => `
        <a href="product.html?id=${product.id}" class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.onSale ? `
                    <div class="sale-badge">
                        <i class="fas fa-tag"></i>
                        ${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </div>
                ` : ''}
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
                        ${product.onSale && product.originalPrice ? `
                            <span class="product-original-price">${formatPrice(product.originalPrice)}</span>
                        ` : ''}
                    </div>
                    <span class="product-type">${product.type}</span>
                </div>
            </div>
        </a>
    `).join('');
}

// Load when page loads
if (document.getElementById('featuredProducts')) {
    loadFeaturedProducts();
}
