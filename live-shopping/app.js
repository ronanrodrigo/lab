const slides = [...document.querySelectorAll('.slide')];
const dots = [...document.querySelectorAll('.slide-dots button')];
const progress = document.querySelector('#progress-bar');
const currentSlide = document.querySelector('#current-slide');
const deck = document.querySelector('#deck');
let active = 0;
let touchStartX = 0;
const products = [
  { name: 'Camisa de linho', description: 'Leve, respirável e pronta para o dia.', price: 'R$ 129', art: 'shirt', code: '01' },
  { name: 'Vela cerâmica', description: 'Aroma de figo e cedro para desacelerar.', price: 'R$ 68', art: 'candle', code: '02' },
  { name: 'Fone sem fio', description: 'Som limpo para trabalhar e criar.', price: 'R$ 189', art: 'headphones', code: '03' }
];
let productIndex = 0;
let cartCount = 0;
let reactionCount = 1203;

function goToSlide(index) {
  const next = Math.max(0, Math.min(slides.length - 1, index));
  if (next === active) return;
  slides[active].classList.remove('is-active');
  slides[active].classList.toggle('is-before', next > active);
  slides[next].classList.remove('is-before');
  slides[next].classList.add('is-active');
  active = next;
  currentSlide.textContent = String(active + 1).padStart(2, '0');
  progress.style.width = `${((active + 1) / slides.length) * 100}%`;
  dots.forEach((dot, index) => dot.classList.toggle('active', index === active));
}

function showToast(message) {
  const toast = document.querySelector('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function addToCart() {
  cartCount += 1;
  showToast(`${products[productIndex].name} adicionado à demonstração.`);
}

function changeProduct() {
  productIndex = (productIndex + 1) % products.length;
  const product = products[productIndex];
  const art = document.querySelector('#demo-art');
  art.className = `product-art ${product.art}`;
  art.querySelector('b').textContent = product.code;
  document.querySelector('#demo-name').textContent = product.name;
  document.querySelector('#demo-description').textContent = product.description;
  document.querySelector('#demo-price').textContent = product.price;
  showToast(`Produto em destaque: ${product.name}.`);
}

function react() {
  reactionCount += 1;
  document.querySelector('#demo-status').textContent = `${reactionCount.toLocaleString('pt-BR')} reações`;
  const reaction = document.querySelector('#demo-reaction');
  reaction.classList.remove('pop');
  void reaction.offsetWidth;
  reaction.classList.add('pop');
}

document.querySelector('#previous').addEventListener('click', () => goToSlide(active - 1));
document.querySelector('#next').addEventListener('click', () => goToSlide(active + 1));
dots.forEach((dot) => dot.addEventListener('click', () => goToSlide(Number(dot.dataset.go) - 1)));
document.addEventListener('keydown', (event) => {
  if (['ArrowRight', 'PageDown', ' '].includes(event.key)) { event.preventDefault(); goToSlide(active + 1); }
  if (['ArrowLeft', 'PageUp'].includes(event.key)) { event.preventDefault(); goToSlide(active - 1); }
  if (event.key === 'Home') goToSlide(0);
  if (event.key === 'End') goToSlide(slides.length - 1);
});
deck.addEventListener('touchstart', (event) => { touchStartX = event.changedTouches[0].screenX; }, { passive: true });
deck.addEventListener('touchend', (event) => {
  const distance = event.changedTouches[0].screenX - touchStartX;
  if (Math.abs(distance) > 50) goToSlide(active + (distance < 0 ? 1 : -1));
}, { passive: true });

document.querySelectorAll('[data-demo-action]').forEach((button) => button.addEventListener('click', () => {
  const action = button.dataset.demoAction;
  if (action === 'add') addToCart();
  if (action === 'next') changeProduct();
  if (action === 'react') react();
  if (action === 'restart') goToSlide(0);
}));

progress.style.width = `${100 / slides.length}%`;
