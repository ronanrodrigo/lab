// app.js — Load products.json, render cards, handle filtering, track clicks

const PRODUCTS_URL = 'products.json';
let allProducts = [];

async function loadProducts() {
  try {
    const response = await fetch(PRODUCTS_URL);
    if (!response.ok) throw new Error('Failed to load products');
    const data = await response.json();
    allProducts = data.products.filter(p => p.isActive);
    populateCategories(allProducts);
    renderProducts(allProducts);
    injectProductJsonLd(allProducts);
    // Hide loading, show grid
    document.getElementById('loading').hidden = true;
    document.getElementById('products-grid').hidden = false;
  } catch (err) {
    document.getElementById('loading').hidden = true;
    document.getElementById('products-grid').hidden = false;
    document.getElementById('products-grid').innerHTML =
      '<p class="error">Erro ao carregar produtos. Tente novamente.</p>';
    console.error(err);
  }
}

function populateCategories(products) {
  const categories = [...new Set(products.map(p => p.category))];
  const select = document.getElementById('category-filter');
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    select.appendChild(option);
  });
}

function renderProducts(products) {
  const grid = document.getElementById('products-grid');
  const emptyState = document.getElementById('empty-state');

  if (products.length === 0) {
    grid.innerHTML = '';
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;
  grid.innerHTML = products.map(p => productCard(p)).join('');

  // Attach click tracking to affiliate links
  document.querySelectorAll('[data-affiliate-link]').forEach(link => {
    link.addEventListener('click', () => {
      const productId = link.closest('[data-product-id]').dataset.productId;
      trackAffiliateClick(productId);
    });
  });
}

function productCard(p) {
  const discount = p.originalPrice && p.currentPrice
    ? calculateDiscount(p.originalPrice, p.currentPrice)
    : null;

  return `
    <article class="product-card" role="listitem" data-product-id="${p.id}" itemscope itemtype="https://schema.org/Product">
      <div class="product-image">
        <img src="${p.image}" alt="${p.imageAlt}" loading="lazy" width="300" height="300" itemprop="image">
        ${p.isFeatured ? '<span class="badge badge-featured">★ Destaque</span>' : ''}
        ${discount ? `<span class="badge badge-discount">-${discount}%</span>` : ''}
      </div>
      <div class="product-info">
        <h2 class="product-title" itemprop="name">${p.title}</h2>
        <p class="product-description" itemprop="description">${p.description}</p>
        <div class="product-meta">
          <span class="product-category">${p.category}</span>
          ${p.rating ? `<span class="product-rating" itemprop="aggregateRating" itemscope itemtype="https://schema.org/AggregateRating">
            <meta itemprop="ratingValue" content="${p.rating}">
            <meta itemprop="reviewCount" content="${p.reviewCount}">
            ${'★'.repeat(Math.round(p.rating))}${'☆'.repeat(5 - Math.round(p.rating))}
          </span>` : ''}
        </div>
        <div class="product-prices">
          ${p.originalPrice ? `<span class="price-original">${p.originalPrice}</span>` : ''}
          <span class="price-current" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
            <meta itemprop="priceCurrency" content="${p.currency || 'BRL'}">
            <span itemprop="price">${p.currentPrice || ''}</span>
          </span>
        </div>
        <a href="${p.affiliateUrl}"
           class="btn-buy"
           target="_blank"
           rel="noopener noreferrer sponsored"
           data-affiliate-link
           itemprop="url">
          Ver oferta →
        </a>
        <span class="product-merchant">${p.merchant || ''}</span>
      </div>
    </article>
  `;
}

function calculateDiscount(original, current) {
  const parse = s => parseFloat(s.replace(/[^\d,]/g, '').replace(',', '.'));
  const orig = parse(original);
  const curr = parse(current);
  if (!orig || !curr || orig <= curr) return null;
  return Math.round(((orig - curr) / orig) * 100);
}

function injectProductJsonLd(products) {
  const itemListJson = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": products.slice(0, 20).map((p, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "Product",
        "name": p.title,
        "description": p.description,
        "image": p.image,
        "offers": {
          "@type": "Offer",
          "priceCurrency": p.currency || "BRL",
          "price": p.currentPrice ? p.currentPrice.replace(/[^\d,]/g, '').replace(',', '.') : undefined,
          "url": p.affiliateUrl
        }
      }
    }))
  };
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(itemListJson);
  document.head.appendChild(script);
}

// Search + filter
document.getElementById('search').addEventListener('input', filterProducts);
document.getElementById('category-filter').addEventListener('change', filterProducts);

function filterProducts() {
  const query = document.getElementById('search').value.toLowerCase();
  const category = document.getElementById('category-filter').value;

  const filtered = allProducts.filter(p => {
    const matchesQuery = !query ||
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.tags.some(t => t.toLowerCase().includes(query));
    const matchesCategory = !category || p.category === category;
    return matchesQuery && matchesCategory;
  });

  renderProducts(filtered);
}

// Analytics: track affiliate link clicks
function trackAffiliateClick(productId) {
  if (typeof plausible !== 'undefined') {
    plausible('Affiliate Click', { props: { productId } });
  }
  if (typeof clarity !== 'undefined') {
    clarity('event', 'affiliate_click_' + productId);
  }
  console.log('Affiliate click tracked:', productId);
}

// Init
document.addEventListener('DOMContentLoaded', loadProducts);
