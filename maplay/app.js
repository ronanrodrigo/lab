const form = document.querySelector('#location-form');
const locationInput = document.querySelector('#location-input');
const gameSection = document.querySelector('#game-section');
const canvas = document.querySelector('#game-canvas');
const context = canvas.getContext('2d');
const loadingState = document.querySelector('#loading-state');
const errorState = document.querySelector('#error-state');
const locationLabel = document.querySelector('#location-label');
const routeDescription = document.querySelector('#route-description');
const gameTitle = document.querySelector('#game-title');
const distanceValue = document.querySelector('#distance-value');
const scoreValue = document.querySelector('#score-value');
const keys = new Set();
let animationFrame;
let running = false;
let carX = 480;
let distance = 0;
let score = 0;
let seed = 1;
let locationName = 'Joinville, Brasil';

function hash(value) {
  return [...value].reduce((total, character) => ((total * 31) + character.charCodeAt(0)) >>> 0, 0) || 1;
}

function pseudoRandom(index) {
  const value = Math.sin(seed * 12.9898 + index * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  const width = canvas.clientWidth || 960;
  const height = width < 600 ? 370 : 600;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  canvas.dataset.width = width;
  canvas.dataset.height = height;
}

function drawCar(x, y, scale) {
  context.save();
  context.translate(x, y);
  context.scale(scale, scale);
  context.fillStyle = '#10251f';
  context.fillRect(-25, -48, 50, 92);
  context.fillStyle = '#d7f36b';
  context.fillRect(-19, -40, 38, 76);
  context.fillStyle = '#8aa7a0';
  context.fillRect(-14, -27, 28, 22);
  context.fillStyle = '#10251f';
  context.fillRect(-10, -23, 20, 13);
  context.fillStyle = '#f5a84c';
  context.fillRect(-18, -39, 8, 5);
  context.fillRect(10, -39, 8, 5);
  context.fillStyle = '#ed655b';
  context.fillRect(-18, 32, 8, 4);
  context.fillRect(10, 32, 8, 4);
  context.fillStyle = '#10251f';
  context.fillRect(-30, -27, 7, 21);
  context.fillRect(23, -27, 7, 21);
  context.fillRect(-30, 20, 7, 21);
  context.fillRect(23, 20, 7, 21);
  context.restore();
}

function drawScene() {
  const width = Number(canvas.dataset.width) || 960;
  const height = Number(canvas.dataset.height) || 600;
  const horizon = height * .35;
  const roadBottom = width * .8;
  const roadTop = width * .17;
  context.clearRect(0, 0, width, height);

  context.fillStyle = '#91bd6b';
  context.fillRect(0, 0, width, height);
  context.fillStyle = '#b6d489';
  context.fillRect(0, horizon - 10, width, 15);
  context.fillStyle = '#d4dfa8';
  context.fillRect(0, horizon + 5, width, 10);

  context.fillStyle = '#6b6e67';
  context.beginPath();
  context.moveTo(width / 2 - roadTop / 2, horizon);
  context.lineTo(width / 2 + roadTop / 2, horizon);
  context.lineTo(width / 2 + roadBottom / 2, height);
  context.lineTo(width / 2 - roadBottom / 2, height);
  context.closePath();
  context.fill();

  context.fillStyle = '#85877c';
  context.fillRect(width / 2 - 2, horizon, 4, height - horizon);
  for (let i = 0; i < 15; i += 1) {
    const depth = (i * 0.17 + (distance * .00035)) % 1;
    const y = horizon + Math.pow(depth, 1.8) * (height - horizon);
    const roadWidth = roadTop + depth * (roadBottom - roadTop);
    const dashWidth = Math.max(2, depth * 12);
    const dashHeight = Math.max(3, depth * 28);
    context.fillStyle = '#e4d88f';
    context.fillRect(width / 2 - dashWidth / 2, y, dashWidth, dashHeight);
    if (i % 3 === 0) {
      const side = pseudoRandom(i) > .5 ? -1 : 1;
      const propX = width / 2 + side * (roadWidth / 2 + 18 + pseudoRandom(i + 4) * 40);
      context.fillStyle = '#527e4d';
      context.fillRect(propX, y - depth * 24, Math.max(3, depth * 9), Math.max(3, depth * 20));
      context.fillStyle = '#386246';
      context.fillRect(propX - depth * 6, y - depth * 30, Math.max(8, depth * 20), Math.max(4, depth * 9));
    }
  }
  drawCar(width / 2 + carX - width / 2, height - 82, Math.max(1, width / 480));
}

function frame() {
  if (!running) return;
  const width = Number(canvas.dataset.width) || 960;
  const movement = (keys.has('ArrowLeft') || keys.has('a') ? -5 : 0) + (keys.has('ArrowRight') || keys.has('d') ? 5 : 0);
  carX = Math.max(width * .2, Math.min(width * .8, carX + movement));
  distance += Math.max(0.7, 2 + movement * 0.05);
  score = Math.floor(distance / 4);
  distanceValue.textContent = Math.floor(distance);
  scoreValue.textContent = score;
  drawScene();
  animationFrame = requestAnimationFrame(frame);
}

function resetGame() {
  cancelAnimationFrame(animationFrame);
  const width = Number(canvas.dataset.width) || 960;
  carX = width / 2;
  distance = 0;
  score = 0;
  running = true;
  drawScene();
  animationFrame = requestAnimationFrame(frame);
}

function startGame(place) {
  locationName = place.trim() || 'um lugar especial';
  seed = hash(locationName);
  locationLabel.textContent = locationName;
  gameTitle.textContent = 'Rua principal';
  routeDescription.textContent = `Uma estrada pixel art inspirada em ${locationName}.`;
  gameSection.classList.remove('is-hidden');
  loadingState.classList.remove('is-hidden');
  errorState.classList.add('is-hidden');
  resizeCanvas();
  window.setTimeout(() => {
    loadingState.classList.add('is-hidden');
    resetGame();
  }, 650);
  gameSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  startGame(locationInput.value);
});
document.querySelector('#restart-game').addEventListener('click', resetGame);
document.querySelector('#new-location').addEventListener('click', () => {
  running = false;
  gameSection.classList.add('is-hidden');
  locationInput.focus();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
window.addEventListener('resize', () => { resizeCanvas(); if (running) drawScene(); });
window.addEventListener('keydown', (event) => {
  if (['ArrowLeft', 'ArrowRight', 'a', 'd'].includes(event.key)) {
    event.preventDefault();
    keys.add(event.key);
  }
});
window.addEventListener('keyup', (event) => keys.delete(event.key));
document.querySelectorAll('[data-control]').forEach((button) => {
  const key = button.dataset.control === 'left' ? 'ArrowLeft' : button.dataset.control === 'right' ? 'ArrowRight' : null;
  if (!key) return;
  button.addEventListener('pointerdown', () => keys.add(key));
  ['pointerup', 'pointerleave', 'pointercancel'].forEach((type) => button.addEventListener(type, () => keys.delete(key)));
});
resizeCanvas();
