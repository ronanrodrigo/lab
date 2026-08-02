// Lógica Principal do Jogo
class Game {
  constructor() {
    this.state = 'menu';
    this.gameState = Storage.getGameState();
    
    this.currentScreen = 'menu';
    this.selectedAvatar = this.gameState.selectedAvatar;
    this.currentClient = null;
    this.selectedLuggage = null;
    this.selectedColor = 'blue';
    this.selectedSticker = 'star';
    this.selectedItems = [];
    this.score = 0;
    this.feedback = [];
    this.repairProgress = 0;
    this.repairActionsNeeded = 3;
  }

  init() {
    this.showScreen('menu');
  }

  showScreen(screenName) {
    this.currentScreen = screenName;
    this.render();
  }

  selectAvatar(avatarId) {
    this.selectedAvatar = avatarId;
    this.gameState.selectedAvatar = avatarId;
    Storage.saveGameState(this.gameState);
    SoundManager.play('click');
    this.showScreen('play');
  }

  startGame() {
    SoundManager.play('click');
    this.selectRandomClient();
    this.showScreen('client-intro');
  }

  selectRandomClient() {
    const randomIndex = Math.floor(Math.random() * CLIENTS.length);
    this.currentClient = CLIENTS[randomIndex];
    this.selectedLuggage = null;
    this.selectedItems = [];
    this.score = 0;
    this.feedback = [];
  }

  selectLuggage(luggageId) {
    const luggage = LUGGAGES.find(l => l.id === luggageId);
    this.selectedLuggage = luggage;
    SoundManager.play('click');
    
    if (luggage.condition !== 'novo') {
      this.repairProgress = 0;
      this.showScreen('repair-luggage');
    } else {
      this.showScreen('packing');
    }
  }

  addRepairAction() {
    if (this.repairProgress < this.repairActionsNeeded) {
      this.repairProgress++;
      SoundManager.play('success');
      
      if (this.repairProgress >= this.repairActionsNeeded) {
        // Conserto completo
      }
    }
  }

  finishRepair() {
    if (this.repairProgress >= this.repairActionsNeeded) {
      SoundManager.play('reward');
      this.showScreen('packing');
    }
  }

  addItem(itemId) {
    const item = this.getItemById(itemId);
    if (!item) return;

    const category = item.category;
    const isPreference = this.currentClient.preferences.some(pref => 
      pref.toLowerCase().includes(item.name.toLowerCase()) ||
      item.emoji === item.emoji
    );

    let points = SCORING.basePoints;
    let feedback = `+${points} pontos`;

    if (isPreference) {
      points += SCORING.preferenceBonus;
      feedback = 'Combina com a viagem! +' + (SCORING.basePoints + SCORING.preferenceBonus) + ' pontos';
    }

    if (item.category === 'extras' && item.bonus) {
      feedback = 'Ótimo extra! +' + (SCORING.basePoints + item.bonus) + ' pontos';
      points = SCORING.basePoints + item.bonus;
    }

    this.selectedItems.push(item);
    this.score += points;

    SoundManager.play('success');
    this.feedback.push({
      text: feedback,
      type: 'positive',
      timestamp: Date.now()
    });

    this.render();
  }

  removeItem(index) {
    if (this.selectedItems[index]) {
      this.selectedItems.splice(index, 1);
      SoundManager.play('click');
      this.render();
    }
  }

  finishPacking() {
    const hasMinimumItems = this.checkMinimumItems();
    
    if (!hasMinimumItems) {
      alert('Ainda falta um pouco para a mala estar pronta! Verifique o checklist.');
      return;
    }

    SoundManager.play('reward');
    this.showScreen('result');
  }

  checkMinimumItems() {
    let hasSeasonClothes = false;
    let hasAccessory = false;
    let hasExtra = false;

    this.selectedItems.forEach(item => {
      if (item.category === 'summer-clothes' || item.category === 'winter-clothes') {
        hasSeasonClothes = true;
      }
      if (item.category === 'accessories') {
        hasAccessory = true;
      }
      if (item.category === 'extras') {
        hasExtra = true;
      }
    });

    return hasSeasonClothes && hasAccessory && hasExtra && this.selectedItems.length >= 4;
  }

  getItemById(itemId) {
    for (const category in ITEMS) {
      const found = ITEMS[category].find(item => item.id === itemId);
      if (found) return found;
    }
    return null;
  }

  getStarCount() {
    if (this.score >= STARS_THRESHOLDS.three) return 3;
    if (this.score >= STARS_THRESHOLDS.two) return 2;
    return 1;
  }

  getReward() {
    const stars = this.getStarCount();
    return REWARDS[stars];
  }

  getClientReaction() {
    const stars = this.getStarCount();
    if (stars === 3) return this.currentClient.happyReaction;
    if (stars === 2) return this.currentClient.okReaction;
    return this.currentClient.sadReaction;
  }

  finishResult() {
    const reward = this.getReward();
    this.gameState.coins += reward;
    this.gameState.clientsServed++;
    Storage.saveGameState(this.gameState);
    
    SoundManager.play('reward');
    this.showScreen('menu');
  }

  goToShop() {
    SoundManager.play('click');
    this.showScreen('shop');
  }

  goToMenu() {
    SoundManager.play('click');
    this.showScreen('menu');
  }

  toggleSound() {
    const enabled = SoundManager.toggle();
    this.gameState.soundEnabled = enabled;
    Storage.saveGameState(this.gameState);
    SoundManager.play('click');
    this.render();
  }

  buyItem(shopItemId) {
    const shopItem = SHOP_ITEMS.find(item => item.id === shopItemId);
    if (!shopItem) return false;

    if (this.gameState.coins < shopItem.price) {
      alert('Moedas insuficientes!');
      return false;
    }

    this.gameState.coins -= shopItem.price;
    
    if (shopItem.type === 'luggage') {
      Storage.addPurchasedLuggage(shopItemId);
    } else {
      Storage.addPurchasedItem(shopItemId);
    }

    Storage.set('coins', this.gameState.coins);
    SoundManager.play('purchase');
    this.render();
    return true;
  }

  render() {
    const app = document.getElementById('app');
    let html = '';

    switch (this.currentScreen) {
      case 'menu':
        html = this.renderMenu();
        break;
      case 'avatar-selection':
        html = this.renderAvatarSelection();
        break;
      case 'play':
        html = this.renderPlayMenu();
        break;
      case 'client-intro':
        html = this.renderClientIntro();
        break;
      case 'luggage-selection':
        html = this.renderLuggageSelection();
        break;
      case 'repair-luggage':
        html = this.renderRepairLuggage();
        break;
      case 'packing':
        html = this.renderPacking();
        break;
      case 'result':
        html = this.renderResult();
        break;
      case 'shop':
        html = this.renderShop();
        break;
    }

    app.innerHTML = html;
    this.attachEventListeners();
  }

  renderMenu() {
    const avatar = AVATARS[this.selectedAvatar];
    const soundState = this.gameState.soundEnabled ? '🔊' : '🔇';

    return `
      <div class="card">
        <div class="menu-header">
          <h1>Malinha Mágica</h1>
          <p>Prepare malas para seus clientes!</p>
        </div>

        <div class="avatar-display">${avatar.emoji}</div>

        <div class="stats">
          <div class="stat-box">
            <div class="stat-value">💰 ${this.gameState.coins}</div>
            <div class="stat-label">Moedas Mágicas</div>
          </div>
          <div class="stat-box">
            <div class="stat-value">👥 ${this.gameState.clientsServed}</div>
            <div class="stat-label">Clientes Atendidos</div>
          </div>
        </div>

        <div class="menu-buttons">
          <button class="btn-primary" id="btn-play">
            ▶️ Jogar
          </button>
          <button class="btn-secondary" id="btn-shop">
            🏪 Loja
          </button>
          <button class="btn-secondary" id="btn-change-avatar">
            👤 Trocar Avatar
          </button>
        </div>

        <div class="controls">
          <button class="sound-toggle ${!this.gameState.soundEnabled ? 'muted' : ''}" id="btn-sound">
            ${soundState} Som
          </button>
        </div>
      </div>
    `;
  }

  renderAvatarSelection() {
    let html = `
      <div class="card">
        <div class="card-header">
          <h1>Escolha seu Avatar</h1>
          <p>Quem você quer ser?</p>
        </div>
        <div class="avatar-grid">
    `;

    Object.values(AVATARS).forEach(avatar => {
      const isSelected = this.selectedAvatar === avatar.id ? 'selected' : '';
      html += `
        <div class="avatar-option ${isSelected}" id="avatar-${avatar.id}">
          <div class="avatar-emoji">${avatar.emoji}</div>
          <div class="avatar-name">${avatar.name}</div>
        </div>
      `;
    });

    html += `
        </div>
        <button class="btn-primary" id="btn-confirm-avatar">Começar ➜</button>
      </div>
    `;

    return html;
  }

  renderPlayMenu() {
    return `
      <div class="card">
        <div class="card-header">
          <h1>Bem-vindo(a)!</h1>
          <p>${AVATARS[this.selectedAvatar].name}</p>
        </div>
        <div class="avatar-display">${AVATARS[this.selectedAvatar].emoji}</div>
        <div class="menu-buttons">
          <button class="btn-primary" id="btn-start-game">
            🧳 Próximo Cliente
          </button>
          <button class="btn-secondary" id="btn-shop-from-play">
            🏪 Loja
          </button>
          <button class="btn-secondary" id="btn-menu">
            ◀️ Menu
          </button>
        </div>
      </div>
    `;
  }

  renderClientIntro() {
    return `
      <div class="card">
        <div class="client-card">
          <div class="client-header">
            <div class="client-avatar">${this.currentClient.emoji}</div>
            <div class="client-info">
              <h2>${this.currentClient.name}</h2>
              <p>${this.currentClient.role}</p>
            </div>
          </div>

          <div class="speech-bubble">
            ${this.currentClient.message}
          </div>

          <div class="client-details">
            <div class="detail-item">
              <div class="detail-label">🌍 Destino</div>
              <div class="detail-value">${this.currentClient.destination}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">🌤️ Estação</div>
              <div class="detail-value">${this.currentClient.season}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">☁️ Clima</div>
              <div class="detail-value">${this.currentClient.weather}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">✨ Preferências</div>
              <div class="detail-value">${this.currentClient.preferenceText}</div>
            </div>
          </div>
        </div>

        <button class="btn-primary mt-lg" id="btn-choose-luggage">
          Escolher Mala ➜
        </button>
        <button class="btn-secondary mt-lg" id="btn-menu">
          ◀️ Menu
        </button>
      </div>
    `;
  }

  renderLuggageSelection() {
    let html = `
      <div class="card">
        <div class="card-header">
          <h1>Escolha uma Mala</h1>
          <p>Qual mala você quer usar?</p>
        </div>

        <div class="luggage-grid">
    `;

    LUGGAGES.forEach(luggage => {
      const isSelected = this.selectedLuggage && this.selectedLuggage.id === luggage.id ? 'selected' : '';
      html += `
        <div class="luggage-option ${isSelected}" id="luggage-${luggage.id}">
          <div class="luggage-emoji">${luggage.emoji}</div>
          <div class="luggage-name">${luggage.name}</div>
          <div class="luggage-condition">${luggage.conditionText}</div>
        </div>
      `;
    });

    html += `
        </div>
        <div class="container">
          <button class="btn-primary" id="btn-confirm-luggage" ${this.selectedLuggage ? '' : 'disabled'}>
            Confirmar Mala ➜
          </button>
          <button class="btn-secondary" id="btn-back">
            ◀️ Voltar
          </button>
        </div>
      </div>
    `;

    return html;
  }

  renderRepairLuggage() {
    const repairPercent = (this.repairProgress / this.repairActionsNeeded) * 100;
    let repairButtons = '';

    for (let i = 0; i < this.repairActionsNeeded; i++) {
      const action = REPAIR_ACTIONS[i % REPAIR_ACTIONS.length];
      const isCompleted = i < this.repairProgress ? 'completed' : '';
      repairButtons += `
        <button class="repair-btn ${isCompleted}" id="repair-${i}" ${isCompleted ? 'disabled' : ''}>
          ${action.emoji} ${action.name}
        </button>
      `;
    }

    return `
      <div class="card">
        <div class="card-header">
          <h1>Consertar a Mala</h1>
          <p>A mala precisa de cuidados</p>
        </div>

        <div style="margin-bottom: var(--spacing-lg);">
          <div style="font-size: 3rem; text-align: center; margin-bottom: var(--spacing-md);">🧳</div>
          <div style="background: #f0f0f0; border-radius: var(--border-radius); height: 8px; overflow: hidden;">
            <div style="background: linear-gradient(90deg, #FF8FC7, #FF6BB9); height: 100%; width: ${repairPercent}%; transition: width 0.3s ease;"></div>
          </div>
          <p style="text-align: center; margin-top: var(--spacing-md); color: var(--color-text-light);">
            ${this.repairProgress} / ${this.repairActionsNeeded} ações
          </p>
        </div>

        <div class="repair-actions">
          ${repairButtons}
        </div>

        <div class="repair-section">
          <label class="picker-label">Escolha uma Cor:</label>
          <div class="color-options" id="color-picker">
            ${COLORS.map(color => `
              <div class="color-option ${this.selectedColor === color.id ? 'selected' : ''}" 
                   id="color-${color.id}" 
                   style="background: ${color.hex}; transition: all 0.2s;"></div>
            `).join('')}
          </div>
        </div>

        <div class="repair-section">
          <label class="picker-label">Escolha um Adesivo:</label>
          <div class="sticker-options" id="sticker-picker">
            ${STICKERS.map(sticker => `
              <div class="sticker-option ${this.selectedSticker === sticker.id ? 'selected' : ''}" 
                   id="sticker-${sticker.id}">
                ${sticker.emoji}
              </div>
            `).join('')}
          </div>
        </div>

        <button class="btn-primary mt-lg" id="btn-finish-repair" 
                ${this.repairProgress >= this.repairActionsNeeded ? '' : 'disabled'}>
          Mala Pronta! ➜
        </button>
        <button class="btn-secondary mt-lg" id="btn-back">
          ◀️ Voltar
        </button>
      </div>
    `;
  }

  renderPacking() {
    const checklistItems = [
      { label: 'Roupas apropriadas', completed: this.selectedItems.some(i => i.category.includes('clothes')) },
      { label: 'Acessório', completed: this.selectedItems.some(i => i.category === 'accessories') },
      { label: 'Extra', completed: this.selectedItems.some(i => i.category === 'extras') },
      { label: 'Mínimo 4 itens', completed: this.selectedItems.length >= 4 }
    ];

    let categoryTabs = '';
    const categories = ['summer-clothes', 'winter-clothes', 'accessories', 'extras'];
    const categoryLabels = {
      'summer-clothes': '☀️ Verão',
      'winter-clothes': '❄️ Inverno',
      'accessories': '✨ Acessórios',
      'extras': '🎁 Extras'
    };

    const currentCategory = categories[0];

    categories.forEach(cat => {
      const isActive = currentCategory === cat ? 'active' : '';
      categoryTabs += `
        <button class="category-tab ${isActive}" data-category="${cat}">
          ${categoryLabels[cat]}
        </button>
      `;
    });

    let itemsGrid = '';
    ITEMS[currentCategory].forEach(item => {
      const isSelected = this.selectedItems.some(i => i.id === item.id);
      itemsGrid += `
        <div class="item-card ${isSelected ? 'selected' : ''}" id="item-${item.id}">
          <div class="item-emoji">${item.emoji}</div>
          <div class="item-name">${item.name}</div>
          <div class="item-points">+${SCORING.basePoints}</div>
        </div>
      `;
    });

    let itemsInLuggage = '';
    this.selectedItems.forEach((item, index) => {
      itemsInLuggage += `
        <div class="item-in-luggage" id="packed-${index}">
          ${item.emoji} ${item.name}
          <span class="item-remove">✕</span>
        </div>
      `;
    });

    return `
      <div class="card">
        <div class="client-card" style="margin-bottom: var(--spacing-lg);">
          <div class="client-header">
            <div class="client-avatar">${this.currentClient.emoji}</div>
            <div class="client-info">
              <h2>${this.currentClient.name}</h2>
              <p>Para ${this.currentClient.destination}</p>
            </div>
          </div>
        </div>

        <div class="packing-section">
          <div class="luggage-display">
            <div class="luggage-visual">🧳</div>
            <div style="width: 100%; text-align: center; color: var(--color-text-light); font-size: 0.9rem; margin-bottom: var(--spacing-md);">
              ${this.selectedItems.length} itens
            </div>
            <div class="luggage-contents">
              ${itemsInLuggage}
            </div>
          </div>

          <div class="items-shelf">
            <div class="shelf-title">Items Disponíveis</div>
            <div class="category-tabs" id="category-tabs">
              ${categoryTabs}
            </div>
            <div class="items-grid" id="items-grid">
              ${itemsGrid}
            </div>
          </div>
        </div>

        <div class="checklist">
          <div class="checklist-title">✓ Checklist da Viagem</div>
          ${checklistItems.map(item => `
            <div class="checklist-item ${item.completed ? 'completed' : ''}">
              <div class="checklist-checkbox">${item.completed ? '✓' : ''}</div>
              <span>${item.label}</span>
            </div>
          `).join('')}
        </div>

        <div class="score-display">
          <div class="score-value">⭐ ${this.score}</div>
          <div class="score-label">Pontos</div>
        </div>

        <button class="btn-primary mt-lg" id="btn-finish-packing">
          Fechar Mala ➜
        </button>
        <button class="btn-secondary mt-lg" id="btn-back">
          ◀️ Voltar
        </button>
      </div>
    `;
  }

  renderResult() {
    const stars = this.getStarCount();
    const reward = this.getReward();
    const reaction = this.getClientReaction();
    const starsStr = '⭐'.repeat(stars);

    let itemsList = '';
    this.selectedItems.forEach(item => {
      itemsList += `<div class="summary-item">${item.emoji} ${item.name}</div>`;
    });

    return `
      <div class="result-card">
        <div class="result-header">
          <div class="result-avatar">${this.currentClient.emoji}</div>
          <div class="result-title">Missão Cumprida!</div>
          <div class="stars">${starsStr}</div>
        </div>

        <div class="result-comment">
          ${reaction}
        </div>

        <div class="rewards">
          <div class="reward-item">
            <span class="reward-emoji">💰</span>
            <span>+${reward} Moedas Mágicas</span>
          </div>
          <div class="reward-item" style="margin-top: var(--spacing-md);">
            <span class="reward-emoji">🎯</span>
            <span>${this.score} pontos</span>
          </div>
        </div>

        <div class="items-summary">
          <div class="items-summary-title">Itens da Mala</div>
          <div class="items-summary-list">
            ${itemsList}
          </div>
        </div>

        <div class="result-buttons">
          <button class="btn-primary btn-result" id="btn-next-client">
            👥 Próximo Cliente
          </button>
          <button class="btn-secondary btn-result" id="btn-shop-from-result">
            🏪 Visitar Loja
          </button>
          <button class="btn-secondary btn-result" id="btn-menu-from-result">
            ◀️ Menu Principal
          </button>
        </div>
      </div>
    `;
  }

  renderShop() {
    let shopHTML = `
      <div class="card">
        <div class="card-header">
          <h1>🏪 Loja Mágica</h1>
          <p>Saldo: <strong>💰 ${this.gameState.coins}</strong></p>
        </div>

        <div class="shop-grid">
    `;

    SHOP_ITEMS.forEach(item => {
      const isPurchased = this.gameState.purchasedItems.includes(item.id) || 
                         this.gameState.purchasedLuggages.includes(item.id);
      const canAfford = this.gameState.coins >= item.price;
      const isDisabled = isPurchased || !canAfford;
      const buttonText = isPurchased ? 'Comprado' : `${item.price} 💰`;
      const buttonClass = isPurchased ? 'purchased' : '';

      shopHTML += `
        <div class="shop-item ${isPurchased ? 'purchased' : ''} ${isDisabled ? 'disabled' : ''}">
          <div class="shop-emoji">${item.emoji}</div>
          <div class="shop-name">${item.name}</div>
          <div class="shop-description">${item.description}</div>
          <div class="shop-price">${buttonText}</div>
          <button class="shop-button ${buttonClass}" 
                  id="buy-${item.id}"
                  ${isDisabled ? 'disabled' : ''}>
            ${isPurchased ? '✓' : 'Comprar'}
          </button>
        </div>
      `;
    });

    shopHTML += `
        </div>
        <button class="btn-secondary mt-lg" id="btn-back-shop">
          ◀️ Voltar
        </button>
      </div>
    `;

    return shopHTML;
  }

  attachEventListeners() {
    // Menu
    const btnPlay = document.getElementById('btn-play');
    if (btnPlay) btnPlay.addEventListener('click', () => this.startGame());

    const btnShop = document.getElementById('btn-shop');
    if (btnShop) btnShop.addEventListener('click', () => this.goToShop());

    const btnChangeAvatar = document.getElementById('btn-change-avatar');
    if (btnChangeAvatar) btnChangeAvatar.addEventListener('click', () => this.showScreen('avatar-selection'));

    const btnSound = document.getElementById('btn-sound');
    if (btnSound) btnSound.addEventListener('click', () => this.toggleSound());

    // Avatar Selection
    Object.keys(AVATARS).forEach(avatarId => {
      const btn = document.getElementById(`avatar-${avatarId}`);
      if (btn) btn.addEventListener('click', () => this.selectAvatar(avatarId));
    });

    const btnConfirmAvatar = document.getElementById('btn-confirm-avatar');
    if (btnConfirmAvatar) btnConfirmAvatar.addEventListener('click', () => this.showScreen('menu'));

    // Play Menu
    const btnStartGame = document.getElementById('btn-start-game');
    if (btnStartGame) btnStartGame.addEventListener('click', () => this.startGame());

    const btnShopFromPlay = document.getElementById('btn-shop-from-play');
    if (btnShopFromPlay) btnShopFromPlay.addEventListener('click', () => this.goToShop());

    // Client Intro
    const btnChooseLuggage = document.getElementById('btn-choose-luggage');
    if (btnChooseLuggage) btnChooseLuggage.addEventListener('click', () => this.showScreen('luggage-selection'));

    // Luggage Selection
    LUGGAGES.forEach(luggage => {
      const btn = document.getElementById(`luggage-${luggage.id}`);
      if (btn) btn.addEventListener('click', () => this.selectLuggage(luggage.id));
    });

    const btnConfirmLuggage = document.getElementById('btn-confirm-luggage');
    if (btnConfirmLuggage) btnConfirmLuggage.addEventListener('click', () => {
      if (this.selectedLuggage) {
        this.selectLuggage(this.selectedLuggage.id);
      }
    });

    // Repair
    for (let i = 0; i < this.repairActionsNeeded; i++) {
      const btn = document.getElementById(`repair-${i}`);
      if (btn && i < this.repairProgress) {
        btn.disabled = true;
      } else if (btn) {
        btn.addEventListener('click', () => this.addRepairAction());
      }
    }

    // Colors
    COLORS.forEach(color => {
      const btn = document.getElementById(`color-${color.id}`);
      if (btn) btn.addEventListener('click', () => {
        this.selectedColor = color.id;
        this.render();
      });
    });

    // Stickers
    STICKERS.forEach(sticker => {
      const btn = document.getElementById(`sticker-${sticker.id}`);
      if (btn) btn.addEventListener('click', () => {
        this.selectedSticker = sticker.id;
        this.render();
      });
    });

    const btnFinishRepair = document.getElementById('btn-finish-repair');
    if (btnFinishRepair && this.repairProgress >= this.repairActionsNeeded) {
      btnFinishRepair.addEventListener('click', () => this.finishRepair());
    }

    // Packing
    const categoryTabs = document.querySelectorAll('.category-tab');
    categoryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Implementar mudança de categoria
        console.log('Category tab clicked');
      });
    });

    document.querySelectorAll('.item-card').forEach(card => {
      card.addEventListener('click', () => {
        const itemId = card.id.replace('item-', '');
        this.addItem(itemId);
      });
    });

    document.querySelectorAll('.item-in-luggage').forEach((item, index) => {
      item.addEventListener('click', () => this.removeItem(index));
    });

    const btnFinishPacking = document.getElementById('btn-finish-packing');
    if (btnFinishPacking) btnFinishPacking.addEventListener('click', () => this.finishPacking());

    // Result
    const btnNextClient = document.getElementById('btn-next-client');
    if (btnNextClient) {
      btnNextClient.addEventListener('click', () => {
        this.finishResult();
        this.selectRandomClient();
        this.showScreen('client-intro');
      });
    }

    const btnShopFromResult = document.getElementById('btn-shop-from-result');
    if (btnShopFromResult) btnShopFromResult.addEventListener('click', () => this.goToShop());

    const btnMenuFromResult = document.getElementById('btn-menu-from-result');
    if (btnMenuFromResult) btnMenuFromResult.addEventListener('click', () => this.goToMenu());

    // Shop
    SHOP_ITEMS.forEach(item => {
      const btn = document.getElementById(`buy-${item.id}`);
      if (btn && !btn.disabled) {
        btn.addEventListener('click', () => this.buyItem(item.id));
      }
    });

    // Back buttons
    document.querySelectorAll('#btn-back, #btn-back-shop').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.currentScreen === 'shop') {
          this.showScreen('menu');
        } else if (this.currentScreen === 'luggage-selection') {
          this.showScreen('client-intro');
        } else if (this.currentScreen === 'repair-luggage') {
          this.showScreen('luggage-selection');
        } else if (this.currentScreen === 'packing') {
          this.showScreen('luggage-selection');
        } else {
          this.showScreen('menu');
        }
      });
    });

    // Menu buttons
    const btnMenu = document.getElementById('btn-menu');
    if (btnMenu) btnMenu.addEventListener('click', () => this.goToMenu());
  }
}
