/**
 * TechMart - Product Listing Page
 */

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

function buildProductCard(product) {
  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return `
    <article class="product-card" id="product-${product.id}" data-product-id="${product.id}" data-category="${product.category}">
      <a href="product.html?id=${product.id}" class="product-card-link">
        <div class="product-image-wrapper">
          <img
            class="product-image"
            src="${product.image}"
            alt="${product.title}"
            loading="lazy"
            onerror="this.src='https://picsum.photos/seed/placeholder${product.id}/600/400'"
          />
          ${discount > 0 ? `<span class="product-badge badge-sale">-${discount}%</span>` : ''}
          <span class="product-badge badge-category">${product.category}</span>
        </div>

        <div class="product-info">
          <h2 class="product-title">${product.title}</h2>

          <div class="product-rating" aria-label="Rating: ${product.rating} out of 5">
            <span class="rating-stars">${renderStars(product.rating)}</span>
            <span class="rating-value">${product.rating}</span>
            <span class="rating-count">(${product.reviewCount} reviews)</span>
          </div>

          <div class="product-price">
            <span class="price-currency">$</span><span class="price-value">${product.price.toFixed(2)}</span>
            ${discount > 0 ? `<span class="price-original">$${product.originalPrice.toFixed(2)}</span>` : ''}
          </div>
        </div>
      </a>

      <div class="product-card-footer">
        <a href="product.html?id=${product.id}" class="btn btn-primary btn-full">View Product</a>
      </div>
    </article>
  `;
}

function applyFilters() {
  const search = document.getElementById('search-input').value.toLowerCase();
  const category = document.getElementById('category-filter').value;
  const sort = document.getElementById('sort-select').value;

  let products = Store.getAllProducts();

  if (search) {
    products = products.filter(p =>
      p.title.toLowerCase().includes(search) ||
      p.category.toLowerCase().includes(search) ||
      p.description.toLowerCase().includes(search)
    );
  }

  if (category) {
    products = products.filter(p => p.category === category);
  }

  if (sort === 'price-asc') {
    products.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    products.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    products.sort((a, b) => b.rating - a.rating);
  }

  const grid = document.getElementById('products-grid');
  const countEl = document.getElementById('products-count');

  if (products.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" id="empty-state">
        <p class="empty-icon">🔍</p>
        <p class="empty-title">No products found</p>
        <p class="empty-text">Try adjusting your search or filters.</p>
      </div>
    `;
  } else {
    grid.innerHTML = products.map(buildProductCard).join('');
  }

  if (countEl) countEl.textContent = products.length;
}

document.addEventListener('DOMContentLoaded', () => {
  applyFilters();

  document.getElementById('search-input').addEventListener('input', applyFilters);
  document.getElementById('category-filter').addEventListener('change', applyFilters);
  document.getElementById('sort-select').addEventListener('change', applyFilters);

  document.getElementById('reset-store-btn')?.addEventListener('click', () => {
    if (confirm('Reset all product data to defaults? This cannot be undone.')) {
      Store.reset();
      applyFilters();
    }
  });
});
