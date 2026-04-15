async function loadBundles() {
    try {
        const response = await fetch('bundles.json');
        const bundles = await response.json();
        displayBundles(bundles);
    } catch (error) {
        console.error('Error loading bundles:', error);
    }
}

function displayBundles(bundles) {
    const container = document.getElementById('bundlesGrid');
    
    container.innerHTML = bundles.map(bundle => `
        <div class="bundle-card">
            <img src="${bundle.image}" alt="${bundle.name}" class="bundle-image">
            
            <div class="bundle-info">
                <h2 class="bundle-title">${bundle.name}</h2>
                <p class="bundle-description">${bundle.description}</p>

                <div class="bundle-items">
                    <h4>Includes:</h4>
                    <ul>
                        ${bundle.items.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>

                <div class="bundle-pricing">
                    <div>
                        <p style="font-size: 0.875rem; color: #888; margin-bottom: 0.25rem;">Bundle Price</p>
                        <p class="bundle-price-main">${formatPrice(bundle.price)}</p>
                    </div>
                    <div class="bundle-savings">
                        <p class="bundle-original-price">${formatPrice(bundle.originalPrice)}</p>
                        <p class="bundle-save">Save ${formatPrice(bundle.savings)}</p>
                    </div>
                </div>

                <button class="btn btn-primary" style="width: 100%;" onclick="addBundleToCart('${bundle.id}')">
                    <i class="fas fa-shopping-cart"></i> Add Bundle to Cart
                </button>
            </div>
        </div>
    `).join('');
}

function addBundleToCart(bundleId) {
    showNotification('Bundle added to cart!', 'success');
    // In a real application, you would add bundle logic here
}

// Load bundles when page loads
loadBundles();
