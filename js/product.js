/**
 * TechMart - Product Detail Page
 */

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

function renderStarPicker(name, defaultVal = 5) {
  let html = `<div class="star-picker" id="${name}-picker" role="radiogroup" aria-label="Rating">`;
  for (let i = 5; i >= 1; i--) {
    html += `
      <input type="radio" id="${name}-${i}" name="${name}" value="${i}" ${i === defaultVal ? 'checked' : ''}>
      <label for="${name}-${i}" title="${i} star${i > 1 ? 's' : ''}">★</label>
    `;
  }
  html += '</div>';
  return html;
}

function buildReviewItem(review) {
  return `
    <article class="review-item" id="review-${review.id}" data-review-id="${review.id}">
      <div class="review-header">
        <span class="review-author">${review.author}</span>
        <span class="review-rating" aria-label="${review.rating} stars">${renderStars(review.rating)}</span>
        <span class="review-stars-value">${review.rating}/5</span>
        <span class="review-date">${review.date}</span>
      </div>
      <p class="review-text">${review.text}</p>
    </article>
  `;
}

function renderProduct(product) {
  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  // Main product detail
  const detailEl = document.getElementById('product-detail');
  detailEl.setAttribute('data-product-id', product.id);
  detailEl.innerHTML = `
    <div class="product-gallery">
      <img
        class="product-image-main"
        src="${product.image}"
        alt="${product.title}"
        id="product-main-image"
        onerror="this.src='https://picsum.photos/seed/placeholder${product.id}/600/400'"
      />
      ${discount > 0 ? `<span class="product-badge badge-sale badge-lg">-${discount}% OFF</span>` : ''}
    </div>

    <div class="product-details-info">
      <div class="product-breadcrumb">
        <a href="index.html">Home</a>
        <span>/</span>
        <span class="category-name">${product.category}</span>
        <span>/</span>
        <span>${product.title}</span>
      </div>

      <h1 class="product-title" id="product-title">${product.title}</h1>

      <div class="product-meta">
        <span class="product-category-tag">${product.category}</span>
        <span class="product-id-tag">SKU: TM-${String(product.id).padStart(4, '0')}</span>
      </div>

      <div class="product-rating" id="product-rating" aria-label="Rating: ${product.rating} out of 5">
        <span class="rating-stars">${renderStars(product.rating)}</span>
        <span class="rating-value">${product.rating}</span>
        <span class="rating-count">(${product.reviewCount} reviews)</span>
        <a href="#reviews-section" class="rating-link">See all reviews</a>
      </div>

      <div class="product-price-block" id="product-price-block">
        <div class="product-price">
          <span class="price-currency">$</span><span class="price-value" id="price-value">${product.price.toFixed(2)}</span>
          ${discount > 0 ? `<span class="price-original">$${product.originalPrice.toFixed(2)}</span><span class="price-discount-badge">Save ${discount}%</span>` : ''}
        </div>
        <button class="btn btn-outline btn-sm" id="edit-price-btn" aria-label="Edit price">✏️ Edit Price</button>
      </div>

      <div class="price-editor" id="price-editor" hidden>
        <label for="new-price-input" class="form-label">New Price (USD)</label>
        <div class="price-editor-row">
          <span class="price-editor-symbol">$</span>
          <input type="number" id="new-price-input" class="form-control price-input"
            min="0.01" step="0.01" placeholder="0.00" value="${product.price.toFixed(2)}">
          <button class="btn btn-primary btn-sm" id="save-price-btn">Save</button>
          <button class="btn btn-ghost btn-sm" id="cancel-price-btn">Cancel</button>
        </div>
        <p class="form-hint">This change is stored in session memory only.</p>
      </div>

      <p class="product-description" id="product-description">${product.description}</p>

      <div class="product-features" id="product-features">
        <h3 class="features-title">Key Features</h3>
        <ul class="features-list">
          ${product.features.map(f => `<li class="feature-item"><span class="feature-check">✓</span>${f}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;

  // Reviews section
  updateReviewsSection(product);
}

function updateReviewsSection(product) {
  const reviewsEl = document.getElementById('reviews-section');
  reviewsEl.innerHTML = `
    <div class="reviews-header">
      <h2 class="reviews-title">Customer Reviews</h2>
      <div class="reviews-summary" id="reviews-summary">
        <div class="reviews-avg">
          <span class="reviews-avg-value">${product.rating}</span>
          <div class="reviews-avg-stars">${renderStars(product.rating)}</div>
          <span class="reviews-avg-count">${product.reviewCount} review${product.reviewCount !== 1 ? 's' : ''}</span>
        </div>
      </div>
    </div>

    <div class="reviews-list" id="reviews-list">
      ${product.reviews.length > 0
        ? product.reviews.map(buildReviewItem).join('')
        : '<p class="no-reviews">No reviews yet. Be the first to review!</p>'
      }
    </div>

    <div class="add-review-section" id="add-review-section">
      <h3 class="add-review-title">Write a Review</h3>
      <form class="review-form" id="review-form" novalidate>
        <div class="form-group">
          <label class="form-label" for="review-author">Your Name <span class="required">*</span></label>
          <input type="text" id="review-author" class="form-control" placeholder="e.g. Jane D." required maxlength="50">
        </div>

        <div class="form-group">
          <label class="form-label">Your Rating <span class="required">*</span></label>
          ${renderStarPicker('review-rating-pick', 5)}
        </div>

        <div class="form-group">
          <label class="form-label" for="review-text">Your Review <span class="required">*</span></label>
          <textarea id="review-text" class="form-control" rows="4" placeholder="Share your experience with this product..." required maxlength="500"></textarea>
          <span class="char-count"><span id="char-current">0</span>/500</span>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary">Submit Review</button>
        </div>

        <div class="form-message" id="form-message" hidden></div>
      </form>
    </div>
  `;

  // Textarea char counter
  const textarea = document.getElementById('review-text');
  const charCurrent = document.getElementById('char-current');
  textarea?.addEventListener('input', () => {
    charCurrent.textContent = textarea.value.length;
  });
}

function initPriceEditor(productId) {
  const editBtn = document.getElementById('edit-price-btn');
  const editor = document.getElementById('price-editor');
  const saveBtn = document.getElementById('save-price-btn');
  const cancelBtn = document.getElementById('cancel-price-btn');

  editBtn?.addEventListener('click', () => {
    editor.hidden = false;
    editBtn.hidden = true;
    document.getElementById('new-price-input').focus();
  });

  cancelBtn?.addEventListener('click', () => {
    editor.hidden = true;
    editBtn.hidden = false;
  });

  saveBtn?.addEventListener('click', () => {
    const input = document.getElementById('new-price-input');
    const newPrice = parseFloat(input.value);

    if (isNaN(newPrice) || newPrice <= 0) {
      input.classList.add('input-error');
      input.focus();
      return;
    }
    input.classList.remove('input-error');

    if (Store.updatePrice(productId, newPrice)) {
      document.getElementById('price-value').textContent = newPrice.toFixed(2);
      editor.hidden = true;
      editBtn.hidden = false;
      showToast('Price updated successfully!', 'success');
    }
  });

  // Allow Enter key to save
  document.getElementById('new-price-input')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') saveBtn.click();
    if (e.key === 'Escape') cancelBtn.click();
  });
}

function initReviewForm(productId) {
  const form = document.getElementById('review-form');
  const messageEl = document.getElementById('form-message');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    const author = document.getElementById('review-author').value.trim();
    const ratingInput = document.querySelector('input[name="review-rating-pick"]:checked');
    const text = document.getElementById('review-text').value.trim();

    if (!author || !ratingInput || !text) {
      showFormMessage(messageEl, 'Please fill in all required fields.', 'error');
      return;
    }

    const review = {
      author,
      rating: parseInt(ratingInput.value, 10),
      text
    };

    if (Store.addReview(productId, review)) {
      const updatedProduct = Store.getProduct(productId);
      updateReviewsSection(updatedProduct);

      // Update rating display in product header
      const ratingEl = document.getElementById('product-rating');
      if (ratingEl) {
        ratingEl.querySelector('.rating-stars').textContent = renderStars(updatedProduct.rating);
        ratingEl.querySelector('.rating-value').textContent = updatedProduct.rating;
        ratingEl.querySelector('.rating-count').textContent = `(${updatedProduct.reviewCount} reviews)`;
      }

      showToast('Review submitted! Thank you.', 'success');

      // Re-init form handlers
      initReviewForm(productId);

      // Scroll to new review
      document.getElementById('reviews-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

function showFormMessage(el, text, type) {
  el.textContent = text;
  el.className = `form-message form-message-${type}`;
  el.hidden = false;
  setTimeout(() => { el.hidden = true; }, 4000);
}

function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.classList.add('toast-visible'), 10);
  setTimeout(() => {
    toast.classList.remove('toast-visible');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const productId = parseInt(params.get('id'), 10);

  if (!productId) {
    document.getElementById('product-detail').innerHTML = `
      <div class="error-state">
        <p class="error-icon">⚠️</p>
        <h2>Product not found</h2>
        <a href="index.html" class="btn btn-primary">Back to Products</a>
      </div>
    `;
    return;
  }

  const product = Store.getProduct(productId);

  if (!product) {
    document.getElementById('product-detail').innerHTML = `
      <div class="error-state">
        <p class="error-icon">⚠️</p>
        <h2>Product #${productId} not found</h2>
        <a href="index.html" class="btn btn-primary">Back to Products</a>
      </div>
    `;
    return;
  }

  document.title = `${product.title} — TechMart`;
  renderProduct(product);
  initPriceEditor(productId);
  initReviewForm(productId);
});
