const products = [
  { id: 1, name: 'Camisa de linho', description: 'Leve, respirável e feita para acompanhar o dia.', price: 129, oldPrice: 169, art: 'art-shirt', code: '01' },
  { id: 2, name: 'Vela cerâmica', description: 'Aroma de figo e cedro para desacelerar a rotina.', price: 68, oldPrice: 84, art: 'art-candle', code: '02' },
  { id: 3, name: 'Fone sem fio', description: 'Som limpo para trabalhar, criar e se mover.', price: 189, oldPrice: 229, art: 'art-headphones', code: '03' }
];
const state = { productIndex: 0, cart: [], reactions: 1203 };
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const money = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

function toast(message) {
  const element = $('#toast');
  element.textContent = message;
  element.classList.add('show');
  clearTimeout(toast.timeout);
  toast.timeout = setTimeout(() => element.classList.remove('show'), 2400);
}

function currentProduct() { return products[state.productIndex]; }
function renderProduct() {
  const product = currentProduct();
  const art = $('#demo-product-art');
  art.className = `product-art ${product.art}`;
  art.querySelector('b').textContent = product.code;
  $('#demo-product-name').textContent = product.name;
  $('#demo-product-description').textContent = product.description;
  $('#demo-product-price').textContent = money(product.price);
  const discount = Math.round((1 - product.price / product.oldPrice) * 100);
  document.querySelector('.demo-product-row em').textContent = `${discount}% OFF`;
}

function cartQuantity() { return state.cart.reduce((total, item) => total + item.quantity, 0); }
function cartTotal() { return state.cart.reduce((total, item) => total + item.price * item.quantity, 0); }
function renderCart() {
  const quantity = cartQuantity();
  const total = cartTotal();
  $('#cart-count').textContent = quantity;
  $('#cart-count-panel').textContent = quantity;
  $('#cart-total').textContent = money(total);
  document.querySelector('.discount').textContent = `− ${money(total * .1)}`;
  $('#checkout').disabled = quantity === 0;
  $('#cart-items').innerHTML = state.cart.length ? state.cart.map((item) => `<div class="cart-item"><span class="product-art ${item.art}" aria-hidden="true"><b>${item.code}</b></span><div><strong>${item.name}</strong><small>Quantidade: ${item.quantity}</small></div><b>${money(item.price * item.quantity)}</b></div>`).join('') : '<div class="empty-cart"><span>＋</span><strong>O carrinho está vazio</strong><p>Adicione o produto em destaque para continuar a demo.</p></div>';
}
function addProduct() {
  const product = currentProduct();
  const existing = state.cart.find((item) => item.id === product.id);
  if (existing) existing.quantity += 1;
  else state.cart.push({ ...product, quantity: 1 });
  renderCart();
  toast(`${product.name} adicionado à experiência de compra.`);
}
function openCart() {
  $('#cart-drawer').classList.add('open');
  $('#cart-drawer').setAttribute('aria-hidden', 'false');
  $('#close-cart').focus();
}
function closeCart() {
  $('#cart-drawer').classList.remove('open');
  $('#cart-drawer').setAttribute('aria-hidden', 'true');
}
function react(symbol) {
  state.reactions += 1;
  $('#reaction-count').textContent = state.reactions.toLocaleString('pt-BR');
  const heart = $('#demo-heart');
  heart.textContent = symbol;
  heart.classList.remove('heart-pop');
  void heart.offsetWidth;
  heart.classList.add('heart-pop');
}

$('#add-product').addEventListener('click', addProduct);
$$('[data-demo-buy]').forEach((button) => button.addEventListener('click', addProduct));
$('#next-product').addEventListener('click', () => {
  state.productIndex = (state.productIndex + 1) % products.length;
  renderProduct();
  toast(`Produto destacado: ${currentProduct().name}.`);
});
$('#open-cart').addEventListener('click', openCart);
$('#close-cart').addEventListener('click', closeCart);
$('#cart-backdrop').addEventListener('click', closeCart);
$('#checkout').addEventListener('click', () => toast('No produto real, o próximo passo seria o checkout integrado.'));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeCart(); });

$$('[data-reaction]').forEach((button) => button.addEventListener('click', () => react(button.dataset.reaction)));
$('#chat-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const input = $('#chat-input');
  const message = input.value.trim().replace(/[<>]/g, '');
  if (!message) return;
  const row = document.createElement('div');
  row.innerHTML = `<i class="chat-avatar blue">V</i><p><b>Você</b>${message}</p>`;
  $('#chat-messages').append(row);
  input.value = '';
  $('#chat-messages').scrollTop = $('#chat-messages').scrollHeight;
  toast('Pergunta enviada para a host.');
  setTimeout(() => {
    const reply = document.createElement('div');
    reply.className = 'host-reply';
    reply.innerHTML = '<i class="chat-avatar purple">M</i><p><b>Marina <small>host</small></b>Boa pergunta — vou mostrar esse detalhe agora 👀</p>';
    $('#chat-messages').append(reply);
    $('#chat-messages').scrollTop = $('#chat-messages').scrollHeight;
  }, 700);
});

const menuButton = $('.menu-button');
const nav = $('.main-nav');
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
$$('.main-nav a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

renderProduct();
renderCart();
