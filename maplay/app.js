const DEFAULT_POINT = { lat: -26.3044, lon: -48.8456, label: 'Joinville, Brasil' };
const TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

const searchForm = document.querySelector('#search-form');
const locationInput = document.querySelector('#location-input');
const mapStatus = document.querySelector('#map-status');
const coordinates = document.querySelector('#coordinates');
const selectedPlace = document.querySelector('#selected-place');
const startDriveButton = document.querySelector('#start-drive');
const gameSection = document.querySelector('#game-section');
const gameCanvas = document.querySelector('#game-canvas');
const gameContext = gameCanvas.getContext('2d');
const gameMessage = document.querySelector('#game-message');
const distanceValue = document.querySelector('#distance-value');
const speedValue = document.querySelector('#speed-value');
const scoreValue = document.querySelector('#score-value');
const locationLabel = document.querySelector('#location-label');
const locationCoordinates = document.querySelector('#location-coordinates');
const routeDescription = document.querySelector('#route-description');
const controls = { accelerate: false, brake: false, left: false, right: false };

let map;
let marker;
let selectedPoint = null;
let animationFrame;
let lastFrame = 0;
let gameRunning = false;
let speed = 0;
let distance = 0;
let score = 0;
let carOffset = 0;
let roadProgress = 0;
let worldSeed = 1;

function hash(value) {
  return [...value].reduce((total, character) => ((total * 31) + character.charCodeAt(0)) >>> 0, 0) || 1;
}

function randomAt(index) {
  const value = Math.sin(worldSeed * 0.00001 + index * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function setStatus(message, isError = false) {
  mapStatus.textContent = message;
  mapStatus.classList.toggle('is-error', isError);
}

function formatCoordinates(point) {
  return `${point.lat.toFixed(5)}, ${point.lon.toFixed(5)}`;
}

function selectPoint(lat, lon, label = 'Ponto escolhido no mapa') {
  selectedPoint = { lat, lon, label };
  if (!marker) {
    marker = L.marker([lat, lon], { title: 'Ponto de partida' }).addTo(map);
  } else {
    marker.setLatLng([lat, lon]);
  }
  marker.bindPopup(`<strong>${label}</strong><br><span>Seu ponto de partida</span>`).openPopup();
  coordinates.textContent = formatCoordinates(selectedPoint);
  selectedPlace.textContent = label;
  startDriveButton.disabled = false;
  setStatus('Pin posicionado. Quando quiser, comece a dirigir.');
}

function initializeMap() {
  map = L.map('map', { zoomControl: true, scrollWheelZoom: true }).setView([DEFAULT_POINT.lat, DEFAULT_POINT.lon], 13);
  L.tileLayer(TILE_URL, {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors'
  }).addTo(map);
  map.on('click', (event) => selectPoint(event.latlng.lat, event.latlng.lng));
  setStatus('Clique no mapa para soltar o pin.');
}

async function findLocation(query) {
  const cleanQuery = query.trim();
  if (!cleanQuery) {
    setStatus('Digite uma cidade ou endereço para buscar.', true);
    locationInput.focus();
    return;
  }
  setStatus('Buscando no mapa...');
  const params = new URLSearchParams({ format: 'jsonv2', limit: '1', q: cleanQuery, 'accept-language': 'pt-BR' });
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?${params.toString()}`, {
      headers: { Accept: 'application/json' }
    });
    if (!response.ok) throw new Error('Busca indisponível');
    const results = await response.json();
    if (!results.length) throw new Error('Local não encontrado');
    const result = results[0];
    const point = { lat: Number(result.lat), lon: Number(result.lon), label: result.display_name.split(',').slice(0, 3).join(',') };
    map.setView([point.lat, point.lon], 16, { animate: true });
    selectPoint(point.lat, point.lon, point.label);
  } catch (error) {
    setStatus('Não encontramos esse local. Clique diretamente no mapa para escolher um ponto.', true);
  }
}

function resizeCanvas() {
  gameCanvas.width = 960;
  gameCanvas.height = 540;
  gameContext.imageSmoothingEnabled = false;
}

function drawMountain(points, color, offset) {
  const context = gameContext;
  context.fillStyle = color;
  context.beginPath();
  context.moveTo(0, 250);
  points.forEach((height, index) => {
    const x = index * 120 - offset;
    context.lineTo(x, height);
    context.lineTo(x + 60, height + 22);
  });
  context.lineTo(960, 250);
  context.closePath();
  context.fill();
}

function drawTree(x, y, size, flip = 1) {
  const context = gameContext;
  context.fillStyle = '#513e35';
  context.fillRect(x - size * 0.09, y, size * 0.18, size * 0.72);
  context.fillStyle = '#1c5a43';
  context.fillRect(x - size * 0.48, y - size * 0.35, size * 0.96, size * 0.25);
  context.fillStyle = '#27704e';
  context.fillRect(x - size * 0.34, y - size * 0.62, size * 0.68, size * 0.31);
  context.fillStyle = '#36845a';
  context.fillRect(x - size * 0.15, y - size * 0.84, size * 0.3, size * 0.24);
  context.fillStyle = '#9ac35f';
  context.fillRect(x + flip * size * 0.12, y - size * 0.58, Math.max(2, size * 0.1), Math.max(2, size * 0.11));
}

function drawCar(x, y) {
  const context = gameContext;
  const lean = (controls.left ? -3 : 0) + (controls.right ? 3 : 0);
  context.save();
  context.translate(x, y);
  context.rotate(lean * Math.PI / 180);
  context.fillStyle = '#18342d55';
  context.fillRect(-48, 47, 96, 12);
  context.fillStyle = '#172c28';
  context.fillRect(-38, -36, 76, 92);
  context.fillStyle = '#ef6e4e';
  context.fillRect(-29, -52, 58, 95);
  context.fillStyle = '#ff9963';
  context.fillRect(-24, -47, 48, 22);
  context.fillStyle = '#273f43';
  context.fillRect(-20, -42, 40, 15);
  context.fillStyle = '#9bd4c5';
  context.fillRect(-16, -39, 32, 10);
  context.fillStyle = '#172c28';
  context.fillRect(-32, 4, 64, 9);
  context.fillStyle = '#ffd66b';
  context.fillRect(-24, -51, 11, 5);
  context.fillRect(13, -51, 11, 5);
  context.fillStyle = '#f8e5b1';
  context.fillRect(-23, 29, 10, 5);
  context.fillRect(13, 29, 10, 5);
  context.fillStyle = '#172c28';
  context.fillRect(-43, -27, 10, 28);
  context.fillRect(33, -27, 10, 28);
  context.fillRect(-43, 25, 10, 27);
  context.fillRect(33, 25, 10, 27);
  context.fillStyle = '#d64d43';
  context.fillRect(-26, 37, 13, 5);
  context.fillRect(13, 37, 13, 5);
  context.restore();
}

function drawScene() {
  const context = gameContext;
  const width = 960;
  const height = 540;
  const horizon = 232;
  const roadTop = 76;
  const roadBottom = 830;
  const roadShift = Math.sin(roadProgress * 2 + worldSeed) * 22;
  context.clearRect(0, 0, width, height);

  const sky = context.createLinearGradient(0, 0, 0, horizon + 30);
  sky.addColorStop(0, '#77bedb');
  sky.addColorStop(1, '#c5e6dc');
  context.fillStyle = sky;
  context.fillRect(0, 0, width, height);
  context.fillStyle = '#f9df8b';
  context.fillRect(760, 54, 34, 34);
  context.fillStyle = '#fbe7a5';
  context.fillRect(752, 62, 50, 18);
  drawMountain([190, 148, 171, 137, 160, 183, 154, 176, 196], '#82a6a0', roadProgress * 85 % 120);
  drawMountain([205, 164, 192, 151, 188, 175, 165, 179, 214], '#648a84', roadProgress * 135 % 120);
  context.fillStyle = '#8ebf69';
  context.fillRect(0, horizon, width, height - horizon);
  context.fillStyle = '#b9d77c';
  context.fillRect(0, horizon, width, 10);

  context.fillStyle = '#434f4b';
  context.beginPath();
  context.moveTo(width / 2 - roadTop / 2 + roadShift * .15, horizon);
  context.lineTo(width / 2 + roadTop / 2 + roadShift * .15, horizon);
  context.lineTo(width / 2 + roadBottom / 2 + roadShift, height);
  context.lineTo(width / 2 - roadBottom / 2 + roadShift, height);
  context.closePath();
  context.fill();
  context.fillStyle = '#69736b';
  context.fillRect(0, horizon, width, 5);

  for (let i = 0; i < 18; i += 1) {
    const depth = (i / 18 + roadProgress) % 1;
    const y = horizon + Math.pow(depth, 1.75) * (height - horizon);
    const roadWidth = roadTop + depth * (roadBottom - roadTop);
    const center = width / 2 + roadShift * depth;
    const dashWidth = Math.max(3, depth * 15);
    const dashHeight = Math.max(4, depth * 27);
    context.fillStyle = '#f5dc87';
    context.fillRect(center - dashWidth / 2, y, dashWidth, dashHeight);
    if (i % 2 === 0) {
      const side = randomAt(i) > .5 ? -1 : 1;
      const treeSize = Math.max(8, depth * 55);
      const treeX = center + side * (roadWidth / 2 + 26 + randomAt(i + 40) * 70);
      drawTree(treeX, y + treeSize * .22, treeSize, side);
    }
  }
  context.fillStyle = '#e9c65e';
  context.fillRect(width / 2 - roadBottom / 2 + roadShift - 4, height - 130, 8, 80);
  context.fillRect(width / 2 + roadBottom / 2 + roadShift - 4, height - 130, 8, 80);
  drawCar(width / 2 + carOffset * 205, 438);
}

function updateHud() {
  distanceValue.textContent = Math.floor(distance);
  speedValue.textContent = Math.round(speed);
  scoreValue.textContent = Math.floor(score);
}

function setControl(name, value) {
  controls[name] = value;
  const button = document.querySelector(`[data-control="${name}"]`);
  if (button) button.classList.toggle('is-pressed', value);
  if (value && name === 'accelerate') gameMessage.textContent = 'Boa! Mantenha o carro no asfalto.';
}

function gameFrame(timestamp) {
  if (!gameRunning) return;
  const delta = Math.min((timestamp - lastFrame) / 1000 || 0, 0.05);
  lastFrame = timestamp;
  if (controls.accelerate) speed += 65 * delta;
  else speed -= 16 * delta;
  if (controls.brake) speed -= 105 * delta;
  speed = Math.max(0, Math.min(180, speed));
  const steering = (controls.left ? -1 : 0) + (controls.right ? 1 : 0);
  carOffset += steering * (0.65 + speed / 180) * delta;
  carOffset = Math.max(-0.86, Math.min(0.86, carOffset));
  distance += speed * delta / 3.6;
  roadProgress = (roadProgress + speed * delta * 0.0045) % 1;
  score = distance * 10 + speed * 0.2;
  updateHud();
  drawScene();
  animationFrame = requestAnimationFrame(gameFrame);
}

function resetGame() {
  cancelAnimationFrame(animationFrame);
  speed = 0;
  distance = 0;
  score = 0;
  carOffset = 0;
  roadProgress = 0;
  lastFrame = performance.now();
  updateHud();
  drawScene();
  gameRunning = true;
  animationFrame = requestAnimationFrame(gameFrame);
  gameMessage.textContent = 'Aperte acelerar para sair do lugar.';
}

function startDrive() {
  if (!selectedPoint) return;
  worldSeed = hash(`${selectedPoint.lat}:${selectedPoint.lon}`);
  locationLabel.textContent = selectedPoint.label;
  locationCoordinates.textContent = formatCoordinates(selectedPoint);
  routeDescription.textContent = `Corrida iniciada a partir de ${selectedPoint.label}.`;
  gameSection.classList.remove('is-hidden');
  resizeCanvas();
  resetGame();
  gameSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  findLocation(locationInput.value);
});
startDriveButton.addEventListener('click', startDrive);
document.querySelector('#restart-game').addEventListener('click', resetGame);
document.querySelector('#new-location').addEventListener('click', () => {
  gameRunning = false;
  cancelAnimationFrame(animationFrame);
  gameSection.classList.add('is-hidden');
  document.querySelector('.map-picker').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

const keyControls = { ArrowUp: 'accelerate', w: 'accelerate', W: 'accelerate', ArrowDown: 'brake', s: 'brake', S: 'brake', ArrowLeft: 'left', a: 'left', A: 'left', ArrowRight: 'right', d: 'right', D: 'right' };
window.addEventListener('keydown', (event) => {
  const control = keyControls[event.key];
  if (!control) return;
  event.preventDefault();
  setControl(control, true);
});
window.addEventListener('keyup', (event) => {
  const control = keyControls[event.key];
  if (control) setControl(control, false);
});

document.querySelectorAll('[data-control]').forEach((button) => {
  const control = button.dataset.control;
  button.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    button.setPointerCapture?.(event.pointerId);
    setControl(control, true);
  });
  ['pointerup', 'pointercancel', 'pointerleave'].forEach((eventName) => {
    button.addEventListener(eventName, () => setControl(control, false));
  });
});

initializeMap();
resizeCanvas();
selectPoint(DEFAULT_POINT.lat, DEFAULT_POINT.lon, DEFAULT_POINT.label);
