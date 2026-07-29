const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const state = {
  view: 'dashboard',
  plan: localStorage.getItem('safehub-plan') || 'free',
  audioRecording: false,
  audioSeconds: 0,
  audioTimer: null,
  audioRecorder: null,
  audioStream: null,
  videoRecorder: null,
  videoStream: null,
  videoChunks: [],
  locationShared: false,
  tripShared: false,
  contacts: JSON.parse(localStorage.getItem('safehub-contacts') || 'null') || [
    { name: 'Marina', phone: '+55 11 98888-1200' },
    { name: 'Carlos', phone: '+55 11 97777-2300' }
  ],
  warnings: JSON.parse(localStorage.getItem('safehub-warnings') || 'null') || [
    { title: 'Iluminação apagada', place: 'Rua dos Pinheiros, 842', type: 'Visibilidade baixa', time: 'há 8 min' },
    { title: 'Abordagens suspeitas', place: 'Praça Benedito Calixto', type: 'Atenção redobrada', time: 'há 14 min' },
    { title: 'Calçada interditada', place: 'Av. Faria Lima, 1.500', type: 'Desvio recomendado', time: 'há 28 min' },
    { title: 'Movimento incomum', place: 'Rua Augusta, 2.100', type: 'Atenção redobrada', time: 'há 36 min' },
    { title: 'Obra sem sinalização', place: 'R. Teodoro Sampaio, 400', type: 'Risco no caminho', time: 'há 42 min' },
    { title: 'Área com pouca circulação', place: 'Rua Harmonia, 90', type: 'Prefira vias principais', time: 'há 1 h' },
    { title: 'Semáforo com defeito', place: 'Av. Rebouças, 780', type: 'Atravesse com cuidado', time: 'há 1 h' },
    { title: 'Alagamento na via', place: 'Rua Butantã, 230', type: 'Evite a região', time: 'há 1 h' },
    { title: 'Portão bloqueando passagem', place: 'Rua Cardeal Arcoverde, 1.200', type: 'Desvio recomendado', time: 'há 2 h' },
    { title: 'Furto reportado', place: 'Terminal Pinheiros', type: 'Mantenha seus pertences seguros', time: 'há 2 h' }
  ]
};

const phones = [
  { service: 'Polícia Militar', number: '190', region: 'nacional', detail: 'Emergências e risco imediato' },
  { service: 'SAMU', number: '192', region: 'nacional', detail: 'Atendimento médico de urgência' },
  { service: 'Corpo de Bombeiros', number: '193', region: 'nacional', detail: 'Incêndios e resgates' },
  { service: 'Defesa Civil', number: '199', region: 'nacional', detail: 'Desastres e áreas de risco' },
  { service: 'Polícia Rodoviária', number: '191', region: 'nacional', detail: 'Emergências em rodovias' },
  { service: 'Disque-Denúncia', number: '181', region: 'sudeste', detail: 'Denúncias anônimas · Sudeste' },
  { service: 'Guarda Civil SP', number: '153', region: 'sudeste', detail: 'Segurança municipal · São Paulo' },
  { service: 'Defesa Civil SC', number: '199', region: 'sul', detail: 'Emergências · Santa Catarina' },
  { service: 'Polícia Civil', number: '197', region: 'nordeste', detail: 'Investigações e denúncias' },
  { service: 'Central de Atendimento à Mulher', number: '180', region: 'nacional', detail: 'Orientação e denúncias' }
];

function toast(message) {
  const element = $('#toast');
  element.textContent = message;
  element.classList.add('show');
  clearTimeout(toast.timeout);
  toast.timeout = setTimeout(() => element.classList.remove('show'), 3600);
}

function showView(view) {
  state.view = view;
  $$('.view').forEach((section) => {
    const active = section.dataset.view === view;
    section.hidden = !active;
    section.classList.toggle('is-active', active);
  });
  $$('.nav-item').forEach((item) => item.classList.toggle('is-active', item.dataset.openView === view));
  if (view === 'community') renderWarnings();
  if (view === 'emergency') { renderPhones(); renderContacts(); }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function modal(content) {
  $('#modalContent').innerHTML = content;
  $('#modalBackdrop').hidden = false;
  $('#modalClose').focus();
}
function closeModal() { $('#modalBackdrop').hidden = true; $('#modalContent').innerHTML = ''; }

function launchPanic() {
  let remaining = 5;
  modal(`<div class="panic-modal"><span class="live-label"><i></i> ALERTA PREPARADO</span><h2 id="modalTitle">Acionando seus contatos</h2><p>O Safe Hub enviará sua localização e um pedido de ajuda para Marina e Carlos. Você ainda pode cancelar.</p><div class="countdown" id="panicCountdown">${remaining}</div><button class="button ghost" id="cancelPanic" type="button">Cancelar</button></div>`);
  const countdown = $('#panicCountdown');
  const timer = setInterval(() => {
    remaining -= 1;
    if (countdown) countdown.textContent = remaining;
    if (remaining <= 0) {
      clearInterval(timer);
      if (!$('#modalBackdrop').hidden) {
        modal(`<div class="panic-modal"><span class="feature-icon green" style="margin:auto">✓</span><h2 id="modalTitle">Alerta enviado</h2><p><strong>Mock:</strong> push notifications e SMS seriam enviados agora para seus contatos. Sua localização ao vivo foi anexada ao alerta.</p><button class="button primary" id="donePanic" type="button">Entendi</button></div>`);
        toast('Alerta de emergência simulado com sucesso');
      }
    }
  }, 1000);
  $('#cancelPanic').addEventListener('click', () => { clearInterval(timer); closeModal(); toast('Alerta cancelado'); });
}

function formatTime(seconds) { return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`; }
async function startAudio() {
  if (state.audioRecording) {
    state.audioRecording = false;
    clearInterval(state.audioTimer);
    state.audioRecorder?.stop();
    state.audioStream?.getTracks().forEach((track) => track.stop());
    $('#audioRecord').classList.remove('is-recording'); $('#audioWave').classList.remove('is-recording');
    $('#audioLabel').textContent = 'Gravação pronta para compartilhar'; $('#audioShare').disabled = false;
    $('#audioNote').textContent = 'Áudio salvo apenas nesta sessão. O modo background é uma simulação no navegador.';
    toast('Áudio salvo com sucesso');
    return;
  }
  state.audioRecording = true; state.audioSeconds = 0;
  $('#audioRecord').classList.add('is-recording'); $('#audioWave').classList.add('is-recording'); $('#audioLabel').textContent = 'Gravando… toque para finalizar';
  try {
    state.audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    state.audioRecorder = new MediaRecorder(state.audioStream); state.audioRecorder.start();
  } catch (error) {
    $('#audioNote').textContent = 'Microfone indisponível: gravação mockada ativa para validar o fluxo.';
  }
  state.audioTimer = setInterval(() => { state.audioSeconds += 1; $('#audioTime').textContent = formatTime(state.audioSeconds); }, 1000);
}

async function startVideo() {
  if (state.videoRecorder) {
    state.videoRecorder.stop(); state.videoStream?.getTracks().forEach((track) => track.stop()); state.videoRecorder = null;
    $('#videoRecord').textContent = 'Iniciar câmera'; $('#videoIndicator').hidden = true; $('#videoSave').disabled = false;
    toast('Vídeo pronto para salvar'); return;
  }
  try {
    state.videoStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    $('#videoPreview').srcObject = state.videoStream; $('#videoPreview').classList.add('is-live'); $('#videoPlaceholder').hidden = true;
    state.videoChunks = []; state.videoRecorder = new MediaRecorder(state.videoStream);
    state.videoRecorder.ondataavailable = (event) => { if (event.data.size) state.videoChunks.push(event.data); };
    state.videoRecorder.onstop = () => { state.videoBlob = new Blob(state.videoChunks, { type: 'video/webm' }); };
    state.videoRecorder.start(); $('#videoRecord').textContent = 'Finalizar gravação'; $('#videoIndicator').hidden = false; toast('Câmera ativa — grave com discrição');
  } catch (error) {
    $('#videoNote').textContent = 'Câmera indisponível: um vídeo mockado será usado para validar o fluxo.';
    $('#videoRecord').textContent = 'Finalizar gravação mockada'; state.videoRecorder = { stop: () => {} }; $('#videoIndicator').hidden = false; toast('Gravação mockada iniciada');
  }
}

function renderWarnings() {
  const query = ($('#warningSearch')?.value || '').toLowerCase();
  const list = $('#warningList');
  const warnings = state.warnings.filter((item) => `${item.title} ${item.place} ${item.type}`.toLowerCase().includes(query));
  list.innerHTML = warnings.map((item) => `<article class="warning-card"><span class="warning-icon">!</span><div><h3>${item.title}</h3><p>${item.place} · ${item.type}</p></div><time>${item.time}</time></article>`).join('');
  $('#warningEmpty').hidden = warnings.length > 0;
}
function openReport() {
  modal(`<p class="eyebrow">AVISO PARA A COMUNIDADE</p><h2 id="modalTitle">Reportar ambiente inseguro</h2><p>Compartilhe somente informações que ajudem outras pessoas a se cuidarem.</p><form id="reportForm"><input name="title" required placeholder="O que está acontecendo?" aria-label="O que está acontecendo?"><input name="place" required placeholder="Local ou referência" aria-label="Local ou referência"><select name="type" aria-label="Tipo de aviso"><option>Visibilidade baixa</option><option>Atenção redobrada</option><option>Risco no caminho</option><option>Evite a região</option></select><button class="button primary" type="submit">Publicar aviso</button></form>`);
  $('#reportForm').addEventListener('submit', (event) => { event.preventDefault(); const data = Object.fromEntries(new FormData(event.target)); state.warnings.unshift({ ...data, time: 'agora' }); localStorage.setItem('safehub-warnings', JSON.stringify(state.warnings)); closeModal(); renderWarnings(); toast('Aviso publicado para a comunidade'); });
}
function renderPhones() {
  const query = ($('#phoneSearch')?.value || '').toLowerCase(); const region = $('#regionFilter')?.value || 'all';
  const filtered = phones.filter((phone) => (region === 'all' || phone.region === region) && `${phone.service} ${phone.number} ${phone.detail}`.toLowerCase().includes(query));
  $('#phoneGrid').innerHTML = filtered.map((phone) => `<article class="phone-card"><span class="phone-icon">☎</span><div><h3>${phone.service}</h3><p>${phone.detail}</p></div><a class="phone-number" href="tel:${phone.number}" aria-label="Ligar para ${phone.service}">${phone.number}</a></article>`).join('');
}
function renderContacts() {
  $('#contactChips').innerHTML = state.contacts.map((contact, index) => `<span class="contact-chip">${contact.name} · ${contact.phone}<button type="button" data-remove-contact="${index}" aria-label="Remover ${contact.name}">×</button></span>`).join('');
  $$('[data-remove-contact]').forEach((button) => button.addEventListener('click', () => { state.contacts.splice(Number(button.dataset.removeContact), 1); localStorage.setItem('safehub-contacts', JSON.stringify(state.contacts)); renderContacts(); toast('Contato removido'); }));
}
function getLocation() {
  if (!navigator.geolocation) { $('#locationText').textContent = 'São Paulo · localização mockada'; toast('Geolocalização indisponível — usando localização mockada'); return; }
  $('#locationText').textContent = 'Atualizando…';
  navigator.geolocation.getCurrentPosition((position) => { $('#locationText').textContent = `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`; toast('Localização atualizada'); }, () => { $('#locationText').textContent = 'São Paulo · localização mockada'; toast('Permissão negada — usando localização mockada'); });
}

$$('[data-open-view]').forEach((button) => button.addEventListener('click', () => showView(button.dataset.openView)));
$('#panicButton').addEventListener('click', launchPanic); $('#navPanic').addEventListener('click', launchPanic); $('#modalClose').addEventListener('click', closeModal); $('#modalBackdrop').addEventListener('click', (event) => { if (event.target === $('#modalBackdrop')) closeModal(); });
$('#planSelect').value = state.plan; $('#planSelect').addEventListener('change', (event) => { state.plan = event.target.value; localStorage.setItem('safehub-plan', state.plan); toast(state.plan === 'plus' ? 'Safe Hub Plus ativado em modo demonstração' : 'Plano gratuito ativado'); });
$('#tripToggle').addEventListener('change', (event) => { state.tripShared = event.target.checked; $('#tripStatus').textContent = state.tripShared ? 'Viagem compartilhada · detecção de acidente disponível' : 'Desativado'; toast(state.tripShared ? 'Viagem compartilhada com seus contatos' : 'Compartilhamento encerrado'); });
$('#locationToggle').addEventListener('change', (event) => { state.locationShared = event.target.checked; $('#locationToggleLabel').textContent = state.locationShared ? 'Localização sendo compartilhada' : 'Compartilhar localização'; }); $('#locationShare').addEventListener('click', () => { $('#locationToggle').checked = true; $('#locationToggle').dispatchEvent(new Event('change')); getLocation(); toast('Link de localização copiado (mock)'); }); $('#refreshLocation').addEventListener('click', getLocation); $('#uberButton').addEventListener('click', () => toast('Integração com Uber disponível como mock no Safe Hub Plus'));
$('#audioRecord').addEventListener('click', startAudio); $('#audioShare').addEventListener('click', () => toast('Link do arquivo de áudio copiado (mock)')); $('#audioTranscribe').addEventListener('click', () => toast(state.plan === 'plus' ? 'Transcrição mockada: “Estou chegando ao destino…”' : 'Transcrição é uma função do plano Plus · demonstração')); $('#videoRecord').addEventListener('click', startVideo); $('#videoSave').addEventListener('click', () => { if (state.videoBlob) { const link = document.createElement('a'); link.href = URL.createObjectURL(state.videoBlob); link.download = 'safehub-registro.webm'; link.click(); } else toast('Vídeo mockado protegido com a senha informada (demo)'); }); $('#upgradeButton').addEventListener('click', () => { $('#planSelect').value = 'plus'; $('#planSelect').dispatchEvent(new Event('change')); });
$('#reportButton').addEventListener('click', openReport); $('#phoneSearch').addEventListener('input', renderPhones); $('#regionFilter').addEventListener('change', renderPhones); $('#contactForm').addEventListener('submit', (event) => { event.preventDefault(); const form = new FormData(event.target); state.contacts.push({ name: form.get('contactName'), phone: form.get('contactPhone') }); localStorage.setItem('safehub-contacts', JSON.stringify(state.contacts)); event.target.reset(); renderContacts(); toast('Contato adicionado ao seu círculo'); });

renderWarnings(); renderPhones(); renderContacts();
