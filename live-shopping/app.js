const products = [
  { id: 1, name: 'Camisa de linho', description: 'Leve, respirável e feita para acompanhar o dia.', price: 129, oldPrice: 169, art: 'art-camisa', code: '01' },
  { id: 2, name: 'Vela cerâmica', description: 'Aroma de figo e cedro para desacelerar a rotina.', price: 68, oldPrice: 84, art: 'art-vela', code: '02' },
  { id: 3, name: 'Fone sem fio', description: 'Som limpo para trabalhar, criar e se mover.', price: 189, oldPrice: 229, art: 'art-fone', code: '03' }
];

const state = { activeProduct: 0, cart: [], reactions: 1203, viewers: 12438, timer: 298 };
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const formatMoney = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove('show'), 2600);
}

function updateFeaturedProduct() {
  const product = products[state.activeProduct];
  const art = $('#featured-art');
  art.className = `product-art ${product.art}`;
  art.querySelector('b').textContent = product.code;
  $('#featured-name').textContent = product.name;
  $('#featured-description').textContent = product.description;
  $('#featured-price').textContent = formatMoney(product.price);
  $('#featured-old-price').textContent = formatMoney(product.oldPrice);
  const discount = Math.round((1 - product.price / product.oldPrice) * 100);
  $('.product-price span').textContent = `${discount}% OFF`;
}

function cartCount() { return state.cart.reduce((total, item) => total + item.quantity, 0); }
function cartTotal() { return state.cart.reduce((total, item) => total + item.price * item.quantity, 0); }

function updateCart() {
  const count = cartCount();
  const total = cartTotal();
  $('#cart-count').textContent = count;
  $('#cart-count-link').textContent = count;
  $('#cart-total').textContent = formatMoney(total);
  $('#coupon-discount').textContent = `− ${formatMoney(total * 0.1)}`;
  $('#checkout-button').disabled = count === 0;
  const container = $('#cart-items');
  if (!state.cart.length) {
    container.innerHTML = '<div class="empty-cart"><span aria-hidden="true">＋</span><strong>Seu carrinho está vazio</strong><p>Adicione um produto em destaque para continuar a simulação.</p></div>';
    return;
  }
  container.innerHTML = state.cart.map((item) => `
    <div class="cart-item">
      <span class="product-art ${item.art}" aria-hidden="true"><b>${item.code}</b></span>
      <div class="cart-item-info"><strong>${item.name}</strong><small>Quantidade: ${item.quantity}</small></div>
      <strong class="cart-item-price">${formatMoney(item.price * item.quantity)}</strong>
    </div>`).join('');
}

function addToCart(product = products[state.activeProduct]) {
  const existing = state.cart.find((item) => item.id === product.id);
  if (existing) existing.quantity += 1;
  else state.cart.push({ ...product, quantity: 1 });
  updateCart();
  showToast(`${product.name} foi adicionado ao carrinho.`);
  const drawer = $('#cart-drawer');
  if (!drawer.classList.contains('open')) drawer.classList.add('has-items');
}

function openCart() {
  const drawer = $('#cart-drawer');
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  $('#close-cart').focus();
}
function closeCart() {
  const drawer = $('#cart-drawer');
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
}

$('#add-featured').addEventListener('click', () => addToCart());
$('#next-product').addEventListener('click', () => {
  state.activeProduct = (state.activeProduct + 1) % products.length;
  updateFeaturedProduct();
  showToast(`Agora em destaque: ${products[state.activeProduct].name}.`);
});
$('#open-cart-link').addEventListener('click', openCart);
$('#close-cart').addEventListener('click', closeCart);
$('#cart-backdrop').addEventListener('click', closeCart);
$('#checkout-button').addEventListener('click', () => showToast('Checkout demonstrativo: o próximo passo seria conectar o e-commerce.'));

document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeCart(); });

$('#chat-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const input = $('#chat-input');
  const message = input.value.trim();
  if (!message) return;
  const messageElement = document.createElement('div');
  messageElement.className = 'chat-message';
  messageElement.innerHTML = `<span class="chat-avatar avatar-blue">V</span><p><strong>Você</strong><span>${message.replace(/[<>]/g, '')}</span></p>`;
  $('#chat-list').append(messageElement);
  input.value = '';
  $('#chat-list').scrollTop = $('#chat-list').scrollHeight;
  showToast('Pergunta enviada para a host.');
  window.setTimeout(() => {
    const reply = document.createElement('div');
    reply.className = 'chat-message host-message';
    reply.innerHTML = '<span class="chat-avatar avatar-purple">M</span><p><strong>Marina <small>host</small></strong><span>Boa pergunta! Vou mostrar esse detalhe agora 👀</span></p>';
    $('#chat-list').append(reply);
    $('#chat-list').scrollTop = $('#chat-list').scrollHeight;
  }, 800);
});

function react(symbol) {
  state.reactions += 1;
  $('#reaction-total').textContent = state.reactions.toLocaleString('pt-BR');
  const burst = $('#reaction-burst');
  burst.textContent = symbol;
  burst.classList.remove('pop');
  void burst.offsetWidth;
  burst.classList.add('pop');
}
$$('.reaction-button').forEach((button) => button.addEventListener('click', () => react(button.dataset.reaction)));

$$('.sidebar-tab').forEach((tab) => tab.addEventListener('click', () => {
  $$('.sidebar-tab').forEach((item) => item.classList.remove('active'));
  $$('.tab-panel').forEach((panel) => panel.classList.remove('active'));
  tab.classList.add('active');
  $(`#${tab.dataset.tab}-panel`).classList.add('active');
}));

$$('.validation-checklist input').forEach((checkbox) => checkbox.addEventListener('change', () => {
  const checked = $$('.validation-checklist input:checked').length;
  const result = $('#checklist-result');
  result.innerHTML = checked === 4
    ? '<span aria-hidden="true">✓</span> Roteiro completo. Você já tem um bom conjunto de hipóteses para testar.'
    : `<span aria-hidden="true">✦</span> ${checked} de 4 perguntas marcadas. Continue observando durante o teste.`;
}));

window.setInterval(() => {
  state.timer = state.timer > 0 ? state.timer - 1 : 298;
  const minutes = String(Math.floor(state.timer / 60)).padStart(2, '0');
  const seconds = String(state.timer % 60).padStart(2, '0');
  $('#offer-timer').textContent = `oferta termina em ${minutes}:${seconds}`;
  state.viewers += Math.random() > .55 ? 1 : -1;
  $('#viewer-count').textContent = state.viewers.toLocaleString('pt-BR');
}, 1000);

const menuButton = $('.menu-button');
const nav = $('.main-nav');
menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});
$$('.main-nav a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

updateFeaturedProduct();
updateCart();
