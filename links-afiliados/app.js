// app.js — Load products.json, render cards, handle filtering, track clicks
// Redesigned with: scroll reveal (IntersectionObserver), skeleton loading,
// smooth filter transitions, tabular-figure prices, empty state, keyboard nav.

const PRODUCTS_URL = 'products.json';
let allProducts = [];

// --- Reveal animation observer (IntersectionObserver) ----------------------
// Cards start hidden (opacity:0, translateY(20px), blur(4px)) via inline styles
// set in the template. When a card enters the viewport, the observer adds a
// staggered transition-delay and flips it to visible.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const card = entry.target;
    // Staggered delay is read from a data attribute set at render time.
    const delay = parseInt(card.dataset.revealDelay || '0', 10);
    card.style.transitionDelay = `${delay}ms`;
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
    card.style.filter = 'blur(0)';
    revealObserver.unobserve(card); // reveal once
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

// --- Skeleton loading state ------------------------------------------------
// Renders N placeholder cards with a pulse animation while the JSON loads.
const SKELETON_COUNT = 5;

function showSkeletons() {
  const grid = document.getElementById('products-grid');
  grid.hidden = false;
  document.getElementById('loading').hidden = true;
  grid.innerHTML = Array.from({ length: SKELETON_COUNT }, skeletonCard).join('');
}

function skeletonCard() {
  return `
    <article class="skeleton-card" aria-hidden="true">
      <div class="skeleton-image"></div>
      <div class="skeleton-info">
        <div class="skeleton-line skeleton-line-title"></div>
        <div class="skeleton-line"></div>
        <div class="skeleton-line skeleton-line-short"></div>
        <div class="skeleton-button"></div>
      </div>
    </article>
  `;
}

// --- Load products ---------------------------------------------------------
async function loadProducts() {
  showSkeletons();
  try {
    const response = await fetch(PRODUCTS_URL);
    if (!response.ok) throw new Error('Failed to load products');
    const data = await response.json();
    allProducts = data.products.filter(p => p.isActive);
    populateCategories(allProducts);
    await renderProducts(allProducts);
    injectProductJsonLd(allProducts);
  } catch (err) {
    document.getElementById('products-grid').innerHTML =
      '<p class="error">Erro ao carregar produtos. Tente novamente.</p>';
    document.getElementById('empty-state').hidden = true;
    console.error(err);
  }
}

// --- Category dropdown -----------------------------------------------------
function populateCategories(products) {
  const categories = [...new Set(products.map(p => p.category))].sort();
  const select = document.getElementById('category-filter');
  // Preserve the "Todas categorias" option, clear the rest.
  const allOption = select.querySelector('option[value=""]');
  select.innerHTML = '';
  if (allOption) select.appendChild(allOption);
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    select.appendChild(option);
  });
}

// --- Render products with smooth transition --------------------------------
// First fades out existing cards, swaps content, then fades in new cards with
// staggered scroll-reveal. Uses opacity transitions instead of an abrupt
// innerHTML swap.
const FADE_DURATION = 250; // ms — matches the CSS opacity transition

async function renderProducts(products) {
  const grid = document.getElementById('products-grid');
  const emptyState = document.getElementById('empty-state');

  // Fade out current content.
  grid.style.opacity = '0';
  grid.style.transition = `opacity ${FADE_DURATION}ms ease`;

  await wait(FADE_DURATION);

  // Swap content.
  if (products.length === 0) {
    grid.innerHTML = '';
    grid.style.opacity = '1';
    showEmptyState();
    return;
  }

  hideEmptyState();
  grid.innerHTML = products.map((p, i) => productCard(p, i)).join('');

  // Attach affiliate click tracking.
  grid.querySelectorAll('[data-affiliate-link]').forEach(link => {
    link.addEventListener('click', () => {
      const productId = link.closest('[data-product-id]').dataset.productId;
      trackAffiliateClick(productId);
    });
  });

  // Observe each card for scroll reveal.
  grid.querySelectorAll('.product-card').forEach(card => {
    revealObserver.observe(card);
  });

  // Fade in.
  grid.style.opacity = '1';

  // If the grid is already in view (no scroll needed), the IntersectionObserver
  // fires immediately — but force-reveal cards that are already visible to
  // avoid them staying hidden if the observer hasn't ticked yet.
  requestAnimationFrame(() => {
    grid.querySelectorAll('.product-card').forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const delay = parseInt(card.dataset.revealDelay || '0', 10);
        card.style.transitionDelay = `${delay}ms`;
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        card.style.filter = 'blur(0)';
        revealObserver.unobserve(card);
      }
    });
  });
}

// --- Empty state -----------------------------------------------------------
function showEmptyState() {
  const emptyState = document.getElementById('empty-state');
  emptyState.hidden = false;
  emptyState.innerHTML = `
    <div class="empty-icon" aria-hidden="true">🔍</div>
    <p class="empty-title">Nenhum produto encontrado</p>
    <p class="empty-subtitle">Tente ajustar sua busca ou filtro de categoria.</p>
    <button class="empty-reset" type="button" onclick="resetFilters()">Limpar filtros</button>
  `;
}

function hideEmptyState() {
  document.getElementById('empty-state').hidden = true;
}

function resetFilters() {
  document.getElementById('search').value = '';
  document.getElementById('category-filter').value = '';
  filterProducts();
}

// --- Card template ---------------------------------------------------------
function productCard(p, index = 0) {
  const discount = p.originalPrice && p.currentPrice
    ? calculateDiscount(p.originalPrice, p.currentPrice)
    : null;

  const ratingStars = p.rating
    ? `${'★'.repeat(Math.round(p.rating))}${'☆'.repeat(5 - Math.round(p.rating))}`
    : '';

  // Stagger reveal: 60ms per card, capped at 480ms so later rows don't lag.
  const revealDelay = Math.min(index * 60, 480);

  return `
    <article class="product-card"
             role="listitem"
             data-product-id="${p.id}"
             data-reveal-delay="${revealDelay}"
             style="opacity:0; transform:translateY(20px); filter:blur(4px); transition: opacity 0.6s ease, transform 0.6s ease, filter 0.6s ease;"
             itemscope itemtype="https://schema.org/Product">
      <div class="product-image">
        <img src="${p.image}" alt="${p.imageAlt || p.title}" loading="lazy" width="300" height="300" itemprop="image">
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
            <meta itemprop="reviewCount" content="${p.reviewCount || 0}">
            ${ratingStars}
          </span>` : ''}
        </div>
        <div class="product-prices">
          ${p.originalPrice ? `<span class="price-original" style="font-variant-numeric: tabular-nums;">${p.originalPrice}</span>` : ''}
          <span class="price-current"
                style="font-variant-numeric: tabular-nums;"
                itemprop="offers" itemscope itemtype="https://schema.org/Offer">
            <meta itemprop="priceCurrency" content="${p.currency || 'BRL'}">
            <span itemprop="price">${p.currentPrice || ''}</span>
          </span>
        </div>
        <a href="${p.affiliateUrl}"
           class="btn-buy"
           target="_blank"
           rel="noopener noreferrer sponsored"
           data-affiliate-link
           itemprop="url"
           aria-label="Ver oferta: ${p.title}">
          Ver oferta
          <span class="btn-buy-arrow" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </span>
        </a>
        ${p.merchant ? `<span class="product-merchant">${p.merchant}</span>` : ''}
      </div>
    </article>
  `;
}

// --- Discount calculation --------------------------------------------------
function calculateDiscount(original, current) {
  const parse = s => parseFloat(s.replace(/[^\d,]/g, '').replace(',', '.'));
  const orig = parse(original);
  const curr = parse(current);
  if (!orig || !curr || orig <= curr) return null;
  return Math.round(((orig - curr) / orig) * 100);
}

// --- JSON-LD: ItemList structured data -------------------------------------
function injectProductJsonLd(products) {
  // Remove any previously injected ItemList script to avoid duplicates.
  document.querySelectorAll('script[data-injected-itemlist]').forEach(s => s.remove());

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
  script.setAttribute('data-injected-itemlist', '');
  script.textContent = JSON.stringify(itemListJson);
  document.head.appendChild(script);
}

// --- Search + filter -------------------------------------------------------
const searchInput = document.getElementById('search');
const categorySelect = document.getElementById('category-filter');

let filterDebounce = null;

searchInput.addEventListener('input', () => {
  clearTimeout(filterDebounce);
  filterDebounce = setTimeout(filterProducts, 150);
});
categorySelect.addEventListener('change', filterProducts);

// Keyboard navigation: Enter in search clicks the first visible result.
searchInput.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;
  e.preventDefault();
  const firstCard = document.querySelector('#products-grid .product-card .btn-buy');
  if (firstCard) firstCard.click();
});

function filterProducts() {
  const query = searchInput.value.toLowerCase().trim();
  const category = categorySelect.value;

  const filtered = allProducts.filter(p => {
    const matchesQuery = !query ||
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      (p.tags || []).some(t => t.toLowerCase().includes(query));
    const matchesCategory = !category || p.category === category;
    return matchesQuery && matchesCategory;
  });

  renderProducts(filtered);
}

// --- Analytics: track affiliate link clicks --------------------------------
function trackAffiliateClick(productId) {
  if (typeof plausible !== 'undefined') {
    plausible('Affiliate Click', { props: { productId } });
  }
  if (typeof clarity !== 'undefined') {
    clarity('event', 'affiliate_click_' + productId);
  }
  console.log('Affiliate click tracked:', productId);
}

// --- Utilities -------------------------------------------------------------
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// --- Init -------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', loadProducts);
