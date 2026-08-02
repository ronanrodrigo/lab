(() => {
  'use strict';

  const app = document.querySelector('#app');
  const balanceElement = document.querySelector('#balance');
  const soundToggle = document.querySelector('#sound-toggle');
  const brandHome = document.querySelector('#brand-home');
  const toastRegion = document.querySelector('#toast-region');
  const STORAGE_KEY = 'malinha-magica:progress:v1';

  const avatars = [
    { id: 'laco', name: 'Lia', emoji: '👧🏻', description: 'Laço colorido e muita imaginação.', color: '#ffd6e2' },
    { id: 'chapeu', name: 'Theo', emoji: '🧒🏽', description: 'Chapéu de explorador e olhos curiosos.', color: '#cceafa' },
    { id: 'avental', name: 'Nino', emoji: '🧑🏽‍🍳', description: 'Avental alegre e coração cuidadoso.', color: '#d7f2e3' }
  ];

  const clients = [
    {
      id: 'mila', name: 'Mila', role: 'menina aventureira', emoji: '👧🏽', destination: 'Praia', season: 'Verão', icon: '🏖️', climate: 'quente e ensolarado',
      speech: 'Oi! Vou para a praia no verão e quero levar roupas coloridas e divertidas. Pode me ajudar a montar uma mala incrível?',
      bagState: 'Riscada', bagColor: '#ffb7ca', needsRepair: true, seasonTag: 'verao', seasonNeed: 2, accessoryTags: ['protecao'], accessoryLabel: 'proteção para o sol',
      goodTags: ['verao', 'praia', 'leve', 'vibrante', 'protecao', 'extra', 'guia', 'colorido', 'azul', 'amarelo', 'laranja'],
      badTags: ['inverno', 'montanha', 'pesado'], preferenceTags: ['vibrante', 'azul', 'amarelo', 'laranja'], preferenceText: 'cores vibrantes'
    },
    {
      id: 'joao', name: 'João', role: 'menino montanhês', emoji: '🧒🏻', destination: 'Montanha', season: 'Inverno', icon: '🏔️', climate: 'frio e seco',
      speech: 'Olá! Vou para a montanha neste inverno. Preciso de roupas quentinhas e confortáveis para brincar na neve!',
      bagState: 'Nova', bagColor: '#bfe8f5', needsRepair: false, seasonTag: 'inverno', seasonNeed: 2, accessoryTags: ['quente', 'montanha'], accessoryLabel: 'um acessório quentinho',
      goodTags: ['inverno', 'montanha', 'quente', 'pesado', 'extra', 'guia', 'laranja', 'vermelho', 'marrom'],
      badTags: ['verao', 'praia', 'leve'], preferenceTags: ['quente', 'laranja', 'vermelho', 'marrom'], preferenceText: 'tons quentes'
    },
    {
      id: 'rosa', name: 'Avó Rosa', role: 'avó sorridente', emoji: '👵🏻', destination: 'Interior', season: 'Primavera', icon: '🌷', climate: 'morno e variável',
      speech: 'Querida(o), vou visitar minha família no interior. Quero coisas confortáveis, suaves e que me deixem bem à vontade!',
      bagState: 'Levemente usada', bagColor: '#d9c8f7', needsRepair: true, seasonTag: 'primavera', seasonNeed: 2, accessoryTags: ['conforto'], accessoryLabel: 'algo confortável',
      goodTags: ['primavera', 'conforto', 'suave', 'meia-estacao', 'extra', 'guia', 'rosa'],
      badTags: ['inverno', 'pesado', 'praia'], preferenceTags: ['conforto', 'suave', 'rosa'], preferenceText: 'conforto e tons suaves'
    },
    {
      id: 'luca', name: 'Luca', role: 'menino explorador', emoji: '🧑🏻‍🦱', destination: 'Praia + cidade', season: 'Outono', icon: '🗺️', climate: 'variável',
      speech: 'Vou conhecer a praia e a cidade na mesma viagem. Preciso de escolhas práticas para mudar de passeio sem preocupação!',
      bagState: 'Riscada', bagColor: '#ffc9a7', needsRepair: true, seasonTag: 'meia-estacao', seasonNeed: 2, accessoryTags: ['pratica'], accessoryLabel: 'um acessório prático',
      goodTags: ['meia-estacao', 'outono', 'pratica', 'cidade', 'praia', 'extra', 'identificador', 'colorido'],
      badTags: ['inverno', 'pesado'], preferenceTags: ['pratica', 'cidade', 'colorido'], preferenceText: 'tons neutros e escolhas práticas'
    },
    {
      id: 'sofia', name: 'Sofia', role: 'menina criativa', emoji: '👧🏾', destination: 'Cidade', season: 'Verão', icon: '🏙️', climate: 'quente e urbano',
      speech: 'Oi! Vou passear pela cidade no verão. Quero uma mala fofa, colorida e cheia de acessórios legais!',
      bagState: 'Nova', bagColor: '#bce9d4', needsRepair: false, seasonTag: 'verao', seasonNeed: 2, accessoryTags: ['colorido', 'cidade'], accessoryLabel: 'um acessório colorido',
      goodTags: ['verao', 'cidade', 'leve', 'pastel', 'colorido', 'extra', 'guia', 'rosa', 'azul'],
      badTags: ['inverno', 'montanha', 'pesado'], preferenceTags: ['pastel', 'colorido', 'rosa', 'azul'], preferenceText: 'cores pastel e estilo fofo'
    }
  ];

  const items = [
    { id: 'camiseta-azul', category: 'verao', emoji: '👕', name: 'Camiseta azul', hint: 'leve e vibrante', tags: ['roupa', 'verao', 'praia', 'leve', 'vibrante', 'azul'] },
    { id: 'camiseta-rosa', category: 'verao', emoji: '👚', name: 'Camiseta rosa', hint: 'fofa e fresquinha', tags: ['roupa', 'verao', 'cidade', 'leve', 'pastel', 'rosa', 'primavera'] },
    { id: 'shorts-amarelo', category: 'verao', emoji: '🩳', name: 'Shorts amarelo', hint: 'cor do sol', tags: ['roupa', 'verao', 'praia', 'leve', 'vibrante', 'amarelo'] },
    { id: 'shorts-azul', category: 'verao', emoji: '🩳', name: 'Shorts azul', hint: 'pronto para passear', tags: ['roupa', 'verao', 'cidade', 'leve', 'azul'] },
    { id: 'vestido-floral', category: 'verao', emoji: '👗', name: 'Vestido floral', hint: 'alegre e colorido', tags: ['roupa', 'verao', 'praia', 'primavera', 'leve', 'colorido'] },
    { id: 'maio-rosa', category: 'verao', emoji: '🩱', name: 'Maiô rosa', hint: 'dia de piscina', tags: ['roupa', 'verao', 'praia', 'leve', 'rosa', 'vibrante'] },
    { id: 'chinelos', category: 'verao', emoji: '🩴', name: 'Chinelos coloridos', hint: 'pé confortável', tags: ['roupa', 'verao', 'praia', 'leve', 'colorido'] },
    { id: 'sueter-laranja', category: 'inverno', emoji: '🧶', name: 'Suéter laranja', hint: 'bem quentinho', tags: ['roupa', 'inverno', 'montanha', 'quente', 'laranja', 'pesado'] },
    { id: 'sueter-azul', category: 'inverno', emoji: '🧶', name: 'Suéter azul', hint: 'abraço de lã', tags: ['roupa', 'inverno', 'montanha', 'quente', 'azul', 'pesado'] },
    { id: 'calca-cinza', category: 'inverno', emoji: '👖', name: 'Calça cinza', hint: 'para o frio', tags: ['roupa', 'inverno', 'montanha', 'quente', 'pesado'] },
    { id: 'calca-azul', category: 'inverno', emoji: '👖', name: 'Calça azul', hint: 'passeio na neve', tags: ['roupa', 'inverno', 'montanha', 'quente', 'azul'] },
    { id: 'jaqueta-rosa', category: 'inverno', emoji: '🧥', name: 'Jaqueta rosa', hint: 'quentinha e fofa', tags: ['roupa', 'inverno', 'quente', 'rosa', 'pesado'] },
    { id: 'jaqueta-marrom', category: 'inverno', emoji: '🧥', name: 'Jaqueta marrom', hint: 'trilha protegida', tags: ['roupa', 'inverno', 'montanha', 'quente', 'marrom', 'pesado'] },
    { id: 'botas-marrons', category: 'inverno', emoji: '🥾', name: 'Botas marrons', hint: 'passos seguros', tags: ['roupa', 'inverno', 'montanha', 'quente', 'marrom', 'pesado'] },
    { id: 'gorro-laranja', category: 'inverno', emoji: '🧢', name: 'Gorro laranja', hint: 'orelhas aquecidas', tags: ['acessorio', 'inverno', 'montanha', 'quente', 'laranja'] },
    { id: 'luvas-roxas', category: 'inverno', emoji: '🧤', name: 'Luvas roxas', hint: 'mãos protegidas', tags: ['acessorio', 'inverno', 'montanha', 'quente'] },
    { id: 'meias-grossas', category: 'inverno', emoji: '🧦', name: 'Meias grossas', hint: 'conforto extra', tags: ['acessorio', 'inverno', 'quente', 'conforto'] },
    { id: 'oculos-sol', category: 'acessorios', emoji: '🕶️', name: 'Óculos de sol', hint: 'proteção colorida', tags: ['acessorio', 'protecao', 'verao', 'colorido', 'azul'] },
    { id: 'chapeu-praia', category: 'acessorios', emoji: '👒', name: 'Chapéu de praia', hint: 'sombra gostosa', tags: ['acessorio', 'protecao', 'verao', 'praia', 'amarelo'] },
    { id: 'lenco-suave', category: 'acessorios', emoji: '🧣', name: 'Lenço suave', hint: 'toque delicado', tags: ['acessorio', 'quente', 'conforto', 'suave', 'primavera', 'meia-estacao'] },
    { id: 'bolsa-pequena', category: 'acessorios', emoji: '👜', name: 'Bolsa pequena', hint: 'tudo à mão', tags: ['acessorio', 'conforto', 'cidade', 'pratica', 'colorido'] },
    { id: 'mochila-colorida', category: 'acessorios', emoji: '🎒', name: 'Mochila colorida', hint: 'companheira de trilha', tags: ['acessorio', 'pratica', 'montanha', 'outono', 'colorido'] },
    { id: 'sapato-confortavel', category: 'acessorios', emoji: '👟', name: 'Sapato confortável', hint: 'muitos passos', tags: ['acessorio', 'conforto', 'cidade', 'pratica', 'meia-estacao'] },
    { id: 'cardigan-fofinho', category: 'acessorios', emoji: '🧶', name: 'Cardigã fofinho', hint: 'clima de primavera', tags: ['roupa', 'primavera', 'meia-estacao', 'conforto', 'suave'] },
    { id: 'jaqueta-leve', category: 'acessorios', emoji: '🧥', name: 'Jaqueta leve', hint: 'para mudança de tempo', tags: ['roupa', 'meia-estacao', 'outono', 'primavera', 'pratica'] },
    { id: 'guarda-chuva', category: 'acessorios', emoji: '☂️', name: 'Guarda-chuva', hint: 'chuvisco tranquilo', tags: ['acessorio', 'primavera', 'conforto', 'pratica'] },
    { id: 'guia-viagem', category: 'extras', emoji: '🗺️', name: 'Guia de viagem', hint: '+15 moedas de pontos', tags: ['extra', 'guia', 'pratica'], bonus: 15 },
    { id: 'perfume-floral', category: 'extras', emoji: '🌸', name: 'Perfume floral', hint: '+10 pontos', tags: ['extra', 'perfume', 'suave'], bonus: 10 },
    { id: 'protetor-mala', category: 'extras', emoji: '🛡️', name: 'Protetor de mala', hint: '+10 pontos', tags: ['extra', 'protecao', 'fofo'], bonus: 10 },
    { id: 'identificador', category: 'extras', emoji: '🏷️', name: 'Identificador', hint: '+5 pontos', tags: ['extra', 'identificador', 'pratica'], bonus: 5 },
    { id: 'chaveiro-animal', category: 'extras', emoji: '🧸', name: 'Chaveiro animal', hint: '+5 pontos', tags: ['extra', 'chaveiro', 'colorido'], bonus: 5 },
    { id: 'necessaire', category: 'extras', emoji: '🧴', name: 'Necessaire colorida', hint: 'um cuidado a mais', tags: ['extra', 'necessaire', 'conforto', 'colorido'] }
  ];

  const bags = [
    { id: 'soft', name: 'Mala rosa nuvem', state: 'Nova', color: '#ffb7ca', emoji: '🧳', description: 'Leve como uma nuvem e pronta para passear.' },
    { id: 'sky', name: 'Mala azul céu', state: 'Nova', color: '#bfe8f5', emoji: '🧳', description: 'Um pedacinho do céu para levar na viagem.' },
    { id: 'sunset', name: 'Mala pôr do sol', state: 'Nova', color: '#ffc9a7', emoji: '🧳', description: 'Quentinha, alegre e cheia de brilho.' },
    { id: 'lilac', name: 'Mala lilás sonho', state: 'Nova', color: '#c9c0ff', emoji: '🧳', description: 'Para aventuras calmas e imaginativas.' }
  ];

  const products = [
    { id: 'sunset', type: 'bag', name: 'Mala pôr do sol', emoji: '🧳', color: '#ffc9a7', description: 'Uma mala cor de aventura.', price: 35 },
    { id: 'lilac', type: 'bag', name: 'Mala lilás sonho', emoji: '🧳', color: '#c9c0ff', description: 'Suave, brilhante e colecionável.', price: 45 },
    { id: 'toolbox', type: 'tool', name: 'Kit de conserto', emoji: '🛠️', color: '#ffe39b', description: 'Ferramentas para cuidar das malas.', price: 15 },
    { id: 'rainbow-stickers', type: 'decoration', name: 'Adesivos arco-íris', emoji: '🌈', color: '#bce9d4', description: 'Um toque alegre para cada mala.', price: 10 },
    { id: 'protector-pack', type: 'decoration', name: 'Pacote de protetores', emoji: '🛡️', color: '#bfe8f5', description: 'Mais cuidado durante a viagem.', price: 25 },
    { id: 'travel-tags', type: 'decoration', name: 'Etiquetas fofas', emoji: '🏷️', color: '#ffd6e2', description: 'Para ninguém perder o caminho.', price: 12 }
  ];

  const tabs = [
    { id: 'verao', label: '☀️ Verão' },
    { id: 'inverno', label: '❄️ Inverno' },
    { id: 'acessorios', label: '🧢 Acessórios' },
    { id: 'extras', label: '✨ Extras' }
  ];

  const repairSteps = [
    { id: 'costura', emoji: '🧵', label: 'Costurar o rasgo' },
    { id: 'limpeza', emoji: '🧼', label: 'Dar um banho de brilho' },
    { id: 'brilho', emoji: '✨', label: 'Adicionar um toque mágico' }
  ];

  const colorChoices = [
    { value: '#ffb7ca', label: 'rosa' },
    { value: '#bfe8f5', label: 'azul' },
    { value: '#bce9d4', label: 'menta' },
    { value: '#c9c0ff', label: 'lilás' },
    { value: '#ffc9a7', label: 'pêssego' }
  ];

  const stickerChoices = ['✦', '🌈', '🌼', '🦋', '🐚'];
  const itemMap = new Map(items.map((item) => [item.id, item]));
  const bagMap = new Map(bags.map((bag) => [bag.id, bag]));
  let progress = loadProgress();
  let session = null;
  let currentTab = 'verao';
  let toastTimer;
  let suppressClickUntil = 0;
  let dragState = null;
  let audioContext;

  function defaultProgress() {
    return { balance: 60, avatar: null, completed: 0, sound: true, ownedItems: [] };
  }

  function loadProgress() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      const base = defaultProgress();
      if (!saved || typeof saved !== 'object') return base;
      return {
        ...base,
        ...saved,
        balance: Number.isFinite(saved.balance) ? Math.max(0, saved.balance) : base.balance,
        completed: Number.isFinite(saved.completed) ? Math.max(0, saved.completed) : base.completed,
        ownedItems: Array.isArray(saved.ownedItems) ? saved.ownedItems : base.ownedItems
      };
    } catch (error) {
      return defaultProgress();
    }
  }

  function saveProgress() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); } catch (error) { /* armazenamento local pode estar bloqueado */ }
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[character]));
  }

  function avatarById(id) { return avatars.find((avatar) => avatar.id === id) || avatars[2]; }
  function client() { return clients[session?.customerIndex ?? 0]; }
  function selectedItems() { return session.items.map((id) => itemMap.get(id)).filter(Boolean); }
  function formatPoints(value) { return value > 0 ? `+${value}` : String(value); }

  function newSession(screen = 'customer', index = progress.completed % clients.length) {
    const currentClient = clients[index % clients.length];
    return {
      screen,
      customerIndex: index % clients.length,
      selectedAvatar: progress.avatar || null,
      selectedBag: 'client',
      bagColor: currentClient.bagColor,
      sticker: '✦',
      repairedSteps: [],
      items: [],
      score: 0,
      feedback: [],
      flash: null,
      finalized: false,
      result: null
    };
  }

  function goHome() {
    session = null;
    render();
  }

  function updateTopBar() {
    balanceElement.textContent = String(progress.balance);
    soundToggle.textContent = progress.sound ? '🔊' : '🔇';
    soundToggle.setAttribute('aria-pressed', String(progress.sound));
    soundToggle.setAttribute('aria-label', progress.sound ? 'Desativar sons' : 'Ativar sons');
  }

  function render(shouldFocus = true) {
    const screen = session?.screen || 'home';
    const views = {
      home: renderHome,
      avatar: renderAvatar,
      customer: renderCustomer,
      bags: renderBags,
      repair: renderRepair,
      packing: renderPacking,
      result: renderResult,
      shop: renderShop
    };
    app.innerHTML = (views[screen] || renderHome)();
    updateTopBar();
    if (screen === 'packing') setupDragHandlers();
    if (shouldFocus) requestAnimationFrame(() => app.focus({ preventScroll: true }));
  }

  function renderHome() {
    const avatar = progress.avatar ? avatarById(progress.avatar) : null;
    const ownedBags = 2 + products.filter((product) => product.type === 'bag' && progress.ownedItems.includes(product.id)).length;
    return `
      <div class="screen home-screen">
        <section class="hero">
          <div class="hero-copy card">
            <span class="eyebrow">lojinha cozy de aventuras</span>
            <h1>Monte uma mala <span>cheia de carinho.</span></h1>
            <p class="lead">Ajude viajantes fofos a escolher as coisas certas para cada passeio. Sem relógio, sem pressa: só descobertas, cores e pequenas recompensas.</p>
            <div class="hero-actions">
              <button class="btn btn-primary" type="button" data-action="start-game">🧳 Jogar agora</button>
              <button class="btn btn-secondary" type="button" data-action="open-shop">🛍️ Visitar loja</button>
            </div>
            <p class="hero-note"><span aria-hidden="true">✓</span> toque nos itens ou arraste para dentro da mala</p>
          </div>
          <div class="hero-art" aria-label="Ilustração de uma malinha sorridente">
            <span class="cloud cloud-one" aria-hidden="true">☁️</span>
            <span class="cloud cloud-two" aria-hidden="true">☁️</span>
            <div class="mascot-stage">
              <div class="mascot" aria-hidden="true">🧳</div>
              <h2>Pronta para ajudar?</h2>
              <p>Uma aventura de cada vez.</p>
            </div>
          </div>
        </section>

        <section class="home-lower" aria-label="Seu progresso">
          <article class="card stats-card">
            <span class="eyebrow">seu cantinho</span>
            <h2>Pequenos passos, grandes viagens.</h2>
            <div class="stats-grid">
              <div class="stat"><strong>${progress.completed}</strong><span>clientes atendidos</span></div>
              <div class="stat"><strong>${ownedBags}</strong><span>malas disponíveis</span></div>
              <div class="stat"><strong>${avatar ? avatar.emoji : '—'}</strong><span>${avatar ? avatar.name : 'escolha um avatar'}</span></div>
            </div>
          </article>
          <article class="card steps-card">
            <span class="eyebrow">como brincar</span>
            <h2>O combinado é se divertir.</h2>
            <ol class="step-list">
              <li class="step"><span class="step-number">1</span><p>Ouça o destino e o pedido do cliente.</p></li>
              <li class="step"><span class="step-number">2</span><p>Escolha uma mala e coloque itens nela.</p></li>
              <li class="step"><span class="step-number">3</span><p>Feche a mala, veja a reação e ganhe moedas.</p></li>
            </ol>
          </article>
        </section>
      </div>`;
  }

  function renderAvatar() {
    const selected = session.selectedAvatar;
    return `
      <div class="screen">
        <div class="screen-heading">
          <div>
            <span class="eyebrow">primeiro passo</span>
            <h1>Quem vai cuidar das malas?</h1>
            <p>Escolha seu atendente. Você poderá usar esse avatar em todas as aventuras.</p>
          </div>
          <button class="back-button" type="button" data-action="back-home" aria-label="Voltar para o início">←</button>
        </div>
        <div class="avatar-grid">
          ${avatars.map((avatar) => `
            <button class="avatar-card ${selected === avatar.id ? 'is-selected' : ''}" type="button" data-action="select-avatar" data-id="${avatar.id}" aria-pressed="${selected === avatar.id}">
              <span class="avatar-figure" style="--avatar-bg:${avatar.color}" aria-hidden="true">${avatar.emoji}</span>
              <span><strong>${escapeHtml(avatar.name)}</strong><small>${escapeHtml(avatar.description)}</small></span>
            </button>`).join('')}
        </div>
        <div class="avatar-actions">
          <span class="muted">Você pode trocar de avatar quando quiser.</span>
          <button class="btn btn-primary" type="button" data-action="confirm-avatar" ${selected ? '' : 'disabled'}>Escolher e continuar →</button>
        </div>
      </div>`;
  }

  function renderCustomer() {
    const currentClient = client();
    const avatar = avatarById(session.selectedAvatar);
    return `
      <div class="screen">
        <div class="screen-heading">
          <div>
            <span class="eyebrow">aventura ${session.customerIndex + 1} de ${clients.length}</span>
            <h1>Chegou um novo pedido!</h1>
            <p>Leia com calma. As pistas do destino ajudam a montar uma mala feliz.</p>
          </div>
          <button class="back-button" type="button" data-action="back-home" aria-label="Voltar para o início">←</button>
        </div>
        <div class="story-grid">
          <article class="card customer-card">
            <div class="customer-top">
              <div class="portrait" style="--portrait-bg:${currentClient.bagColor}" aria-hidden="true">${currentClient.emoji}</div>
              <div class="customer-meta"><h2>${escapeHtml(currentClient.name)}</h2><p>${escapeHtml(currentClient.role)} · chegou com ${avatar.emoji} ${escapeHtml(avatar.name)}</p></div>
            </div>
            <div class="speech-bubble">“${escapeHtml(currentClient.speech)}”</div>
            <div class="button-row"><button class="btn btn-primary" type="button" data-action="choose-bag">Escolher uma mala →</button></div>
          </article>
          <article class="card destination-card">
            <div class="destination-head"><div><span class="badge">pedido da vez</span><h2>${escapeHtml(currentClient.destination)}</h2><p class="muted">${escapeHtml(currentClient.season)} · ${escapeHtml(currentClient.climate)}</p></div><div class="destination-icon" aria-hidden="true">${currentClient.icon}</div></div>
            <div class="destination-facts"><div class="fact"><span>estilo</span><strong>${escapeHtml(currentClient.preferenceText)}</strong></div><div class="fact"><span>mala atual</span><strong>${escapeHtml(currentClient.bagState)}</strong></div></div>
            <div class="condition-note"><span aria-hidden="true">💡</span><span>Procure pelo menos ${currentClient.seasonNeed} peças da estação, ${escapeHtml(currentClient.accessoryLabel)} e um extra útil.</span></div>
          </article>
        </div>
      </div>`;
  }

  function availableBags() {
    const currentClient = client();
    const clientBag = { id: 'client', name: `Mala de ${currentClient.name}`, state: currentClient.bagState, color: currentClient.bagColor, emoji: '🧳', description: 'A mala que veio com a história da viagem.' };
    const owned = bags.filter((bag) => ['soft', 'sky'].includes(bag.id) || progress.ownedItems.includes(bag.id));
    return [clientBag, ...owned];
  }

  function renderBags() {
    const options = availableBags();
    return `
      <div class="screen">
        <div class="screen-heading">
          <div><span class="eyebrow">segunda parada</span><h1>Qual mala combina com essa aventura?</h1><p>Você pode usar a mala do cliente ou escolher uma das malas coloridas da loja.</p></div>
          <button class="back-button" type="button" data-action="back-customer" aria-label="Voltar para o pedido">←</button>
        </div>
        <div class="bag-grid">
          ${options.map((bag) => `
            <article class="bag-option ${session.selectedBag === bag.id ? 'is-selected' : ''}">
              <div class="bag-option-art" style="--bag-choice:${bag.color}" aria-hidden="true">${bag.emoji}</div>
              <span class="badge">${escapeHtml(bag.state)}</span>
              <h3>${escapeHtml(bag.name)}</h3>
              <p>${escapeHtml(bag.description)}</p>
              <button class="btn ${session.selectedBag === bag.id ? 'btn-mint' : 'btn-ghost'} btn-small" type="button" data-action="select-bag" data-id="${bag.id}">${session.selectedBag === bag.id ? '✓ Selecionada' : 'Usar esta mala'}</button>
            </article>`).join('')}
        </div>
        <div class="avatar-actions"><span class="muted">${session.selectedBag === 'client' && client().needsRepair ? 'Essa mala tem um pequeno conserto antes da viagem.' : 'Essa mala já está pronta para receber os itens.'}</span><button class="btn btn-primary" type="button" data-action="continue-bag">${session.selectedBag === 'client' && client().needsRepair ? 'Consertar mala →' : 'Começar a arrumar →'}</button></div>
      </div>`;
  }

  function renderRepair() {
    return `
      <div class="screen">
        <div class="screen-heading">
          <div><span class="eyebrow">cuidado com carinho</span><h1>Vamos deixar a mala novinha?</h1><p>Faça três ações simples. Depois, escolha uma cor e um enfeite para personalizar.</p></div>
          <button class="back-button" type="button" data-action="back-bags" aria-label="Voltar para escolher a mala">←</button>
        </div>
        <div class="repair-layout">
          <article class="card repair-preview"><div class="repair-bag" style="--bag-color:${session.bagColor}" data-sticker="${session.sticker}" aria-label="Mala em conserto"><span class="face" aria-hidden="true">${session.repairedSteps.length === repairSteps.length ? '😊' : '😟'}</span></div></article>
          <article class="card repair-controls">
            <h2>Oficina da malinha</h2>
            <p class="muted">Cada toque ajuda a mala a ficar mais feliz.</p>
            <div class="repair-spots">
              ${repairSteps.map((step) => `<button class="repair-step ${session.repairedSteps.includes(step.id) ? 'is-done' : ''}" type="button" data-action="repair-step" data-id="${step.id}"><span><span aria-hidden="true">${step.emoji}</span>${escapeHtml(step.label)}</span><span class="done-mark">${session.repairedSteps.includes(step.id) ? '✓' : '○'}</span></button>`).join('')}
            </div>
            <h3>Escolha uma cor</h3>
            <div class="palette" aria-label="Cores da mala">
              ${colorChoices.map((choice) => `<button class="color-choice ${session.bagColor === choice.value ? 'is-selected' : ''}" type="button" data-action="repair-color" data-color="${choice.value}" style="--choice-color:${choice.value}" aria-label="Cor ${choice.label}" aria-pressed="${session.bagColor === choice.value}"></button>`).join('')}
            </div>
            <h3>Adicione um enfeite</h3>
            <div class="sticker-palette" aria-label="Enfeites da mala">
              ${stickerChoices.map((sticker) => `<button class="sticker-choice ${session.sticker === sticker ? 'is-selected' : ''}" type="button" data-action="repair-sticker" data-sticker="${sticker}" aria-label="Enfeite ${sticker}" aria-pressed="${session.sticker === sticker}">${sticker}</button>`).join('')}
            </div>
            <button class="btn btn-primary" type="button" data-action="finish-repair" ${session.repairedSteps.length === repairSteps.length ? '' : 'disabled'}>Mala pronta! ✨</button>
          </article>
        </div>
      </div>`;
  }

  function getChecklist() {
    const currentClient = client();
    const packed = selectedItems();
    const seasonCount = packed.filter((item) => item.tags.includes(currentClient.seasonTag)).length;
    const accessoryCount = packed.filter((item) => item.tags.some((tag) => currentClient.accessoryTags.includes(tag))).length;
    const extraCount = packed.filter((item) => item.tags.includes('extra')).length;
    return [
      { label: `${currentClient.seasonNeed} peças de ${currentClient.season.toLowerCase()}`, current: seasonCount, target: currentClient.seasonNeed },
      { label: currentClient.accessoryLabel, current: accessoryCount, target: 1 },
      { label: 'um extra de viagem', current: extraCount, target: 1 }
    ];
  }

  function renderPacking() {
    const currentClient = client();
    const checklist = getChecklist();
    const canClose = checklist.every((row) => row.current >= row.target) && session.items.length >= 4;
    const flash = session.flash ? `<div class="floating-feedback"><span class="float-score ${session.flash.positive ? '' : 'is-negative'}">${escapeHtml(session.flash.text)}</span></div>` : '';
    const packed = selectedItems();
    const visibleItems = items.filter((item) => item.category === currentTab);
    return `
      <div class="screen">
        <div class="packing-top"><div><span class="progress-label">aventura ${session.customerIndex + 1} de ${clients.length} · ${escapeHtml(currentClient.destination)}</span><h1>Uma mala para ${escapeHtml(currentClient.name)}.</h1></div><span class="score-pill" aria-live="polite">✦ ${session.score} pontos</span></div>
        <div class="packing-layout">
          <div class="packing-main">
            <article class="card request-card"><div class="portrait" style="--portrait-bg:${currentClient.bagColor}" aria-hidden="true">${currentClient.emoji}</div><p><strong>${escapeHtml(currentClient.name)} pediu:</strong><br>${escapeHtml(currentClient.speech)}</p></article>
            <article class="card bag-card">
              <div class="bag-heading"><div><h2>Coloque os itens aqui</h2><p>Toque em um item ou arraste até a área pontilhada.</p></div><span class="badge">${packed.length} item(ns)</span></div>
              <div class="suitcase-visual" style="--bag-color:${session.bagColor}"><div class="suitcase-handle"></div><div class="suitcase-lid"></div><div class="suitcase-body"><div class="drop-zone" id="drop-zone" role="list" aria-label="Interior da mala"><div class="packed-items">${packed.length ? packed.map((item) => `<button class="packed-item" type="button" data-action="remove-item" data-id="${item.id}" aria-label="Retirar ${escapeHtml(item.name)}">${item.emoji} ${escapeHtml(item.name)} <span class="remove" aria-hidden="true">×</span></button>`).join('') : '<p class="drop-placeholder">A mala está vazia.<br>Escolha uma lembrança para começar.</p>'}</div></div></div>${flash}</div>
              <div class="bag-actions"><button class="btn btn-ghost btn-small" type="button" data-action="back-bags">← Trocar mala</button><button class="btn btn-primary" type="button" data-action="close-bag" ${canClose ? '' : 'disabled'}>Fechar mala ✨</button></div>
            </article>
            <article class="card feedback-card"><h3>O que a mala está dizendo</h3><div class="feedback-list">${session.feedback.length ? session.feedback.map((line) => `<div class="feedback-line ${line.positive ? '' : 'is-negative'}"><strong>${line.positive ? '✓' : '♡'}</strong><span>${escapeHtml(line.text)}</span></div>`).join('') : '<span class="muted">Cada escolha aparece aqui com uma dica.</span>'}</div></article>
          </div>
          <aside class="packing-side">
            <article class="card checklist-card"><h2>Checklist da viagem</h2><p class="muted">Complete as pistas para liberar o zíper.</p><div class="checklist">${checklist.map((row) => `<div class="check-row ${row.current >= row.target ? 'is-done' : ''}"><span>${row.current >= row.target ? '✓' : '○'} ${escapeHtml(row.label)}</span><strong>${Math.min(row.current, row.target)}/${row.target}</strong></div>`).join('')}</div><p class="check-help">${canClose ? 'Tudo pronto! Feche a mala quando quiser.' : 'Ainda falta alguma pista. Você pode experimentar sem medo.'}</p></article>
            <article class="card shelf-card"><h2>Prateleira</h2><p class="muted">Itens especiais para cada tipo de passeio.</p><div class="tabs" role="tablist">${tabs.map((tab) => `<button class="tab ${currentTab === tab.id ? 'is-active' : ''}" type="button" data-action="select-tab" data-tab="${tab.id}" role="tab" aria-selected="${currentTab === tab.id}">${tab.label}</button>`).join('')}</div><div class="item-grid">${visibleItems.length ? visibleItems.map((item) => `<button class="item-card ${session.items.includes(item.id) ? 'is-added' : ''}" type="button" data-action="add-item" data-id="${item.id}" ${session.items.includes(item.id) ? 'disabled' : ''} aria-label="${session.items.includes(item.id) ? `${escapeHtml(item.name)} já está na mala` : `Adicionar ${escapeHtml(item.name)}`}" title="${escapeHtml(item.name)}"><span class="item-emoji" aria-hidden="true">${item.emoji}</span><span class="item-name">${escapeHtml(item.name)}</span><span class="item-hint">${session.items.includes(item.id) ? 'na mala ✓' : 'toque para guardar'}</span></button>`).join('') : '<div class="empty-state">Nenhum item nesta aba.</div>'}</div></article>
          </aside>
        </div>
      </div>`;
  }

  function renderResult() {
    const currentClient = clients.find((entry) => entry.id === session.result.clientId) || client();
    const result = session.result;
    return `
      <div class="screen">
        <div class="screen-heading"><div><span class="eyebrow">aventura concluída</span><h1>A mala ganhou vida!</h1><p>Veja como ${escapeHtml(currentClient.name)} se sentiu com suas escolhas.</p></div></div>
        <div class="result-layout">
          <article class="card result-hero"><div><div class="portrait" style="--portrait-bg:${currentClient.bagColor}" aria-hidden="true">${currentClient.emoji}</div><h2>${result.stars === 3 ? 'Perfeito!' : result.stars === 2 ? 'Muito bom!' : 'Que começo gostoso!'}</h2><div class="stars" aria-label="${result.stars} de 3 estrelas">${[1, 2, 3].map((star) => `<span class="${star <= result.stars ? '' : 'is-muted'}" aria-hidden="true">★</span>`).join('')}</div><div class="result-score">${result.score} pontos</div><p>${escapeHtml(result.comment)}</p></div></article>
          <article class="card result-details"><h2>${escapeHtml(currentClient.name)} está pronto(a)!</h2><div class="reward"><div class="reward-icon" aria-hidden="true">✦</div><div><strong>+${result.reward} moedas mágicas</strong><span>Seu saldo agora é ${progress.balance} moedas.</span></div></div><h3>Itens escolhidos</h3><div class="result-items">${result.items.length ? result.items.map((item) => `<span class="result-item">${item.emoji} ${escapeHtml(item.name)}</span>`).join('') : '<span class="muted">Nenhum item ficou na mala.</span>'}</div><div class="button-row"><button class="btn btn-primary" type="button" data-action="next-customer">Próximo cliente →</button><button class="btn btn-secondary" type="button" data-action="open-shop">Visitar loja</button><button class="btn btn-ghost" type="button" data-action="back-home">Voltar ao início</button></div></article>
        </div>
      </div>`;
  }

  function renderShop() {
    return `
      <div class="screen">
        <div class="shop-head"><div><span class="eyebrow">cantinho das descobertas</span><h1>Loja da Malinha</h1><p class="lead">Use moedas mágicas para deixar sua oficina ainda mais colorida.</p></div><button class="back-button" type="button" data-action="back-home" aria-label="Voltar para o início">←</button></div>
        <div class="shop-balance"><span>seu saldo</span><strong>✦ ${progress.balance} moedas</strong></div>
        <div class="shop-grid">
          ${products.map((product) => {
            const owned = progress.ownedItems.includes(product.id);
            return `<article class="shop-item"><div class="shop-item-art" style="--product-color:${product.color}" aria-hidden="true">${product.emoji}</div><h3>${escapeHtml(product.name)}</h3><p>${escapeHtml(product.description)}</p><div class="shop-price">${owned ? '<span class="owned-label">✓ já é seu</span>' : `<strong>✦ ${product.price}</strong><button class="btn btn-secondary btn-small" type="button" data-action="buy-product" data-id="${product.id}" ${progress.balance < product.price ? 'disabled' : ''}>Comprar</button>`}</div></article>`;
          }).join('')}
        </div>
      </div>`;
  }

  function scoreItem(item, currentClient) {
    const good = item.tags.some((tag) => currentClient.goodTags.includes(tag));
    const wrong = item.tags.some((tag) => currentClient.badTags.includes(tag)) && !good;
    let delta = wrong ? -5 : good ? 10 : 0;
    if (item.tags.some((tag) => currentClient.preferenceTags.includes(tag))) delta += 5;
    delta += item.bonus || 0;
    return { delta, good: !wrong && delta >= 0 };
  }

  function addItem(itemId) {
    if (!session || session.screen !== 'packing' || session.items.includes(itemId)) return;
    const item = itemMap.get(itemId);
    if (!item) return;
    const currentClient = client();
    const result = scoreItem(item, currentClient);
    session.items.push(itemId);
    session.score += result.delta;
    session.flash = { text: `${formatPoints(result.delta)} pontos`, positive: result.delta >= 0 };
    session.feedback.unshift({ positive: result.good, text: result.good ? `${item.name} combina com ${currentClient.destination}.` : `${item.name} pode não ajudar tanto nessa viagem.` });
    session.feedback = session.feedback.slice(0, 4);
    playSound(result.good ? 'good' : 'bad');
    render(false);
    window.setTimeout(() => {
      if (session?.screen === 'packing' && session.flash) { session.flash = null; render(false); }
    }, 1100);
  }

  function removeItem(itemId) {
    if (!session || session.screen !== 'packing') return;
    const item = itemMap.get(itemId);
    if (!item) return;
    const index = session.items.indexOf(itemId);
    if (index === -1) return;
    session.items.splice(index, 1);
    session.score -= scoreItem(item, client()).delta;
    session.feedback.unshift({ positive: true, text: `${item.name} voltou para a prateleira.` });
    session.feedback = session.feedback.slice(0, 4);
    render(false);
  }

  function closeBag() {
    const checklist = getChecklist();
    if (!checklist.every((row) => row.current >= row.target) || session.items.length < 4) {
      showToast('Ainda falta uma pista no checklist.', 'error');
      return;
    }
    if (session.finalized) return;
    const score = session.score;
    const stars = score >= 71 ? 3 : score >= 41 ? 2 : 1;
    const reward = stars === 3 ? 75 : stars === 2 ? 35 : 20;
    const currentClient = client();
    const comments = {
      3: `Tudo combinou direitinho. ${currentClient.name} já pode partir sorrindo!`,
      2: `Uma mala muito boa! ${currentClient.name} encontrou várias escolhas perfeitas.`,
      1: `A mala ficou um começo legal. Na próxima, observe mais as pistas do pedido.`
    };
    progress.balance += reward;
    progress.completed += 1;
    saveProgress();
    session.finalized = true;
    session.result = { clientId: currentClient.id, score, stars, reward, comment: comments[stars], items: selectedItems() };
    session.screen = 'result';
    playSound('reward');
    render();
  }

  function purchase(productId) {
    const product = products.find((entry) => entry.id === productId);
    if (!product || progress.ownedItems.includes(productId)) return;
    if (progress.balance < product.price) {
      showToast('Junte mais algumas moedas para comprar isso.', 'error');
      return;
    }
    progress.balance -= product.price;
    progress.ownedItems.push(productId);
    saveProgress();
    playSound('buy');
    showToast(`${product.name} entrou no seu inventário!`, 'success');
    render(false);
  }

  function toggleSound() {
    progress.sound = !progress.sound;
    saveProgress();
    updateTopBar();
    if (progress.sound) playSound('click');
  }

  function showToast(message, type = '') {
    window.clearTimeout(toastTimer);
    toastRegion.innerHTML = `<div class="toast ${type ? `is-${type}` : ''}">${escapeHtml(message)}</div>`;
    const toast = toastRegion.firstElementChild;
    requestAnimationFrame(() => toast.classList.add('is-visible'));
    toastTimer = window.setTimeout(() => { toast.classList.remove('is-visible'); }, 2600);
  }

  function playSound(kind) {
    if (!progress.sound || !window.AudioContext && !window.webkitAudioContext) return;
    try {
      const AudioCtor = window.AudioContext || window.webkitAudioContext;
      audioContext ||= new AudioCtor();
      if (audioContext.state === 'suspended') void audioContext.resume();
      const frequencies = { click: 440, good: 660, bad: 190, reward: 880, buy: 560 };
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = kind === 'bad' ? 'sine' : 'triangle';
      oscillator.frequency.value = frequencies[kind] || 440;
      gain.gain.setValueAtTime(.0001, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(.08, audioContext.currentTime + .015);
      gain.gain.exponentialRampToValueAtTime(.0001, audioContext.currentTime + (kind === 'reward' ? .42 : .16));
      oscillator.connect(gain).connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + (kind === 'reward' ? .45 : .18));
    } catch (error) { /* áudio é um aprimoramento opcional */ }
  }

  function handleAction(event) {
    const target = event.target.closest('[data-action]');
    if (!target || !app.contains(target)) return;
    const action = target.dataset.action;
    if (action === 'add-item' && Date.now() < suppressClickUntil) return;

    switch (action) {
      case 'start-game':
        session = newSession(progress.avatar ? 'customer' : 'avatar');
        render();
        break;
      case 'open-shop':
        session = session || newSession('shop');
        session.screen = 'shop';
        render();
        break;
      case 'back-home': goHome(); break;
      case 'back-customer': session.screen = 'customer'; render(); break;
      case 'back-bags': session.screen = 'bags'; render(); break;
      case 'select-avatar': session.selectedAvatar = target.dataset.id; playSound('click'); render(false); break;
      case 'confirm-avatar':
        if (!session.selectedAvatar) { showToast('Escolha um avatar para começar.', 'error'); break; }
        progress.avatar = session.selectedAvatar;
        saveProgress();
        session = newSession('customer');
        render();
        break;
      case 'choose-bag': session.screen = 'bags'; render(); break;
      case 'select-bag':
        session.selectedBag = target.dataset.id;
        session.bagColor = session.selectedBag === 'client' ? client().bagColor : (bagMap.get(session.selectedBag)?.color || productColor(session.selectedBag));
        playSound('click');
        render(false);
        break;
      case 'continue-bag':
        if (session.selectedBag === 'client' && client().needsRepair) session.screen = 'repair';
        else session.screen = 'packing';
        render();
        break;
      case 'repair-step':
        session.repairedSteps = session.repairedSteps.includes(target.dataset.id) ? session.repairedSteps.filter((id) => id !== target.dataset.id) : [...session.repairedSteps, target.dataset.id];
        playSound('click');
        render(false);
        break;
      case 'repair-color': session.bagColor = target.dataset.color; playSound('click'); render(false); break;
      case 'repair-sticker': session.sticker = target.dataset.sticker; playSound('click'); render(false); break;
      case 'finish-repair': session.screen = 'packing'; playSound('good'); render(); break;
      case 'select-tab': currentTab = target.dataset.tab; render(false); break;
      case 'add-item': addItem(target.dataset.id); break;
      case 'remove-item': removeItem(target.dataset.id); break;
      case 'close-bag': closeBag(); break;
      case 'next-customer': session = newSession('customer'); render(); break;
      case 'buy-product': purchase(target.dataset.id); break;
      default: break;
    }
  }

  function productColor(id) {
    return products.find((product) => product.id === id)?.color || '#ffb7ca';
  }

  function setupDragHandlers() {
    document.querySelectorAll('.item-card:not(.is-added)').forEach((card) => {
      card.addEventListener('pointerdown', (event) => {
        if (event.button !== undefined && event.button !== 0) return;
        dragState = { card, id: card.dataset.id, startX: event.clientX, startY: event.clientY, moved: false, ghost: null };
        card.setPointerCapture?.(event.pointerId);
      });
      card.addEventListener('pointermove', (event) => {
        if (!dragState || dragState.card !== card) return;
        const distance = Math.hypot(event.clientX - dragState.startX, event.clientY - dragState.startY);
        if (distance > 8 && !dragState.moved) {
          dragState.moved = true;
          dragState.ghost = document.createElement('div');
          dragState.ghost.className = 'drag-ghost';
          dragState.ghost.textContent = `${itemMap.get(dragState.id)?.emoji || '🧳'} ${itemMap.get(dragState.id)?.name || 'item'}`;
          document.body.appendChild(dragState.ghost);
        }
        if (!dragState.moved) return;
        dragState.ghost.style.left = `${event.clientX}px`;
        dragState.ghost.style.top = `${event.clientY}px`;
        const dropZone = document.querySelector('#drop-zone');
        if (dropZone) {
          const rect = dropZone.getBoundingClientRect();
          dropZone.classList.toggle('is-hover', event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom);
        }
        event.preventDefault();
      }, { passive: false });
      card.addEventListener('pointerup', (event) => finishDrag(event));
      card.addEventListener('pointercancel', (event) => finishDrag(event, true));
    });
  }

  function finishDrag(event, cancelled = false) {
    if (!dragState) return;
    const currentDrag = dragState;
    const dropZone = document.querySelector('#drop-zone');
    if (currentDrag.moved) {
      suppressClickUntil = Date.now() + 450;
      const rect = dropZone?.getBoundingClientRect();
      const inside = rect && event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
      dropZone?.classList.remove('is-hover');
      if (inside && !cancelled) addItem(currentDrag.id);
    }
    currentDrag.ghost?.remove();
    dragState = null;
  }

  soundToggle.addEventListener('click', toggleSound);
  brandHome.addEventListener('click', (event) => { event.preventDefault(); goHome(); });
  app.addEventListener('click', handleAction);
  render(false);

  function startAmbient() {
    const mount = document.querySelector('#ambient-canvas');
    if (mount.dataset.started) return;
    mount.dataset.started = 'true';
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || !window.Phaser || window.PHASER_UNAVAILABLE) {
      mount.classList.add('ambient-fallback');
      return;
    }
    try {
      const game = new window.Phaser.Game({
        type: window.Phaser.AUTO,
        parent: 'ambient-canvas',
        transparent: true,
        width: window.innerWidth,
        height: window.innerHeight,
        scale: { mode: window.Phaser.Scale.RESIZE, autoCenter: window.Phaser.Scale.CENTER_BOTH },
        scene: {
          create() {
            for (let index = 0; index < 18; index += 1) {
              const x = Math.random() * window.innerWidth;
              const y = Math.random() * window.innerHeight;
              const radius = 2 + Math.random() * 5;
              const colors = [0xffb7ca, 0xbfe8f5, 0xffe39b, 0xbce9d4, 0xc9c0ff];
              const dot = this.add.circle(x, y, radius, colors[index % colors.length], .55);
              this.tweens.add({ targets: dot, y: y - 18 - Math.random() * 25, alpha: .1, duration: 2800 + Math.random() * 1800, yoyo: true, repeat: -1, ease: 'Sine.easeInOut', delay: Math.random() * 1500 });
            }
          }
        }
      });
      window.addEventListener('resize', () => game.scale.resize(window.innerWidth, window.innerHeight), { passive: true });
    } catch (error) {
      mount.classList.add('ambient-fallback');
    }
  }

  window.addEventListener('load', startAmbient, { once: true });
  window.setTimeout(startAmbient, 2500);
})();
