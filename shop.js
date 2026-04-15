let allProducts = [];
let filteredProducts = [];

// Load products
async function loadProducts() {
    try {
        const response = await fetch('products.json');
        allProducts = await response.json();
        
        // Populate brand filter
        populateBrandFilter();
        
        // Check URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const typeParam = urlParams.get('type');
        
        if (typeParam) {
            document.getElementById('typeFilter').value = typeParam;
        }
        
        applyFilters();
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

function populateBrandFilter() {
    const brands = [...new Set(allProducts.map(p => p.brand))].sort();
    const brandFilter = document.getElementById('brandFilter');
    
    brands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand;
        brandFilter.appendChild(option);
    });
}

function applyFilters() {
    const type = document.getElementById('typeFilter').value;
    const brand = document.getElementById('brandFilter').value;
    const sort = document.getElementById('sortFilter').value;
    const maxPrice = document.getElementById('priceFilter').value;

    // Filter products
    filteredProducts = allProducts.filter(product => {
        if (type && product.type !== type) return false;
        if (brand && product.brand !== brand) return false;
        if (maxPrice && product.price > parseInt(maxPrice)) return false;
        return true;
    });

    // Sort products
    switch (sort) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
    }

    displayFilteredProducts();
}

function resetFilters() {
    document.getElementById('typeFilter').value = '';
    document.getElementById('brandFilter').value = '';
    document.getElementById('sortFilter').value = 'featured';
    document.getElementById('priceFilter').value = '';
    applyFilters();
}

function displayFilteredProducts() {
    const container = document.getElementById('productsGrid');
    const countEl = document.getElementById('productCount');
    const noProducts = document.getElementById('noProducts');

    if (filteredProducts.length === 0) {
        container.style.display = 'none';
        noProducts.style.display = 'block';
        countEl.textContent = '';
        return;
    }

    container.style.display = 'grid';
    noProducts.style.display = 'none';
    countEl.textContent = `${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''} found`;

    container.innerHTML = filteredProducts.map(product => `
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

// Load products when page loads
loadProducts();
