// Gerenciador de Armazenamento Local
const Storage = {
  prefix: 'malinha_magica_',

  // Função auxiliar para chave
  getKey(name) {
    return this.prefix + name;
  },

  // Salvar dado
  set(name, value) {
    try {
      localStorage.setItem(this.getKey(name), JSON.stringify(value));
    } catch (e) {
      console.error('Storage set error:', e);
    }
  },

  // Obter dado
  get(name, defaultValue = null) {
    try {
      const item = localStorage.getItem(this.getKey(name));
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.error('Storage get error:', e);
      return defaultValue;
    }
  },

  // Verificar se existe
  exists(name) {
    return localStorage.getItem(this.getKey(name)) !== null;
  },

  // Remover
  remove(name) {
    try {
      localStorage.removeItem(this.getKey(name));
    } catch (e) {
      console.error('Storage remove error:', e);
    }
  },

  // Limpar tudo
  clear() {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key);
        }
      });
    } catch (e) {
      console.error('Storage clear error:', e);
    }
  },

  // Obter estado do jogo completo
  getGameState() {
    return {
      coins: this.get('coins', 0),
      soundEnabled: this.get('soundEnabled', true),
      selectedAvatar: this.get('selectedAvatar', 'girl'),
      clientsServed: this.get('clientsServed', 0),
      purchasedItems: this.get('purchasedItems', []),
      purchasedLuggages: this.get('purchasedLuggages', [])
    };
  },

  // Salvar estado do jogo
  saveGameState(state) {
    this.set('coins', state.coins);
    this.set('soundEnabled', state.soundEnabled);
    this.set('selectedAvatar', state.selectedAvatar);
    this.set('clientsServed', state.clientsServed);
    this.set('purchasedItems', state.purchasedItems);
    this.set('purchasedLuggages', state.purchasedLuggages);
  },

  // Adicionar item comprado
  addPurchasedItem(itemId) {
    const items = this.get('purchasedItems', []);
    if (!items.includes(itemId)) {
      items.push(itemId);
      this.set('purchasedItems', items);
    }
  },

  // Adicionar mala comprada
  addPurchasedLuggage(luggageId) {
    const luggage = this.get('purchasedLuggages', []);
    if (!luggage.includes(luggageId)) {
      luggage.push(luggageId);
      this.set('purchasedLuggages', luggage);
    }
  },

  // Adicionar moedas
  addCoins(amount) {
    const coins = this.get('coins', 0);
    const newAmount = coins + amount;
    this.set('coins', newAmount);
    return newAmount;
  },

  // Remover moedas
  spendCoins(amount) {
    const coins = this.get('coins', 0);
    if (coins >= amount) {
      const newAmount = coins - amount;
      this.set('coins', newAmount);
      return true;
    }
    return false;
  }
};
