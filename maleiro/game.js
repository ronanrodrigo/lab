const GAME_WIDTH = 960;
const GAME_HEIGHT = 620;
const SUITCASE_ZONE = { x: 280, y: 330, width: 650, height: 245 };
const MAX_ITEMS = 5;

const ITEMS = [
  { id: 'camiseta', label: 'Camiseta', emoji: '👕', good: true, color: 0xffc5e8, note: 'leve e fresquinha' },
  { id: 'shorts', label: 'Shorts', emoji: '🩳', good: true, color: 0xffd7b8ff, note: 'perfeito para o calor' },
  { id: 'chinelo', label: 'Chinelo', emoji: '🩴', good: true, color: 0xfff7d47b, note: 'para passear na praia' },
  { id: 'protetor', label: 'Protetor solar', emoji: '🧴', good: true, color: 0xffbfe9d8, note: 'item essencial' },
  { id: 'livro', label: 'Livro', emoji: '📚', good: true, color: 0xfff4b9a9, note: 'bônus de diversão' },
  { id: 'casaco', label: 'Casaco', emoji: '🧥', good: false, color: 0xffb7c9e8, note: 'quente demais para hoje' },
  { id: 'bota', label: 'Bota', emoji: '🥾', good: false, color: 0xffd9c6ae, note: 'melhor deixar em casa' },
  { id: 'guarda-chuva', label: 'Guarda-chuva', emoji: '🌂', good: false, color: 0xffc4d3f4, note: 'o céu está ensolarado' }
];

class MaleiroScene extends Phaser.Scene {
  constructor() {
    super('MaleiroScene');
    this.packedItems = [];
    this.itemViews = new Map();
    this.feedbackText = null;
    this.hasEvaluated = false;
  }

  create() {
    this.drawBackground();
    this.drawBriefing();
    this.drawShelf();
    this.drawSuitcase();
    this.createItems();
    this.createActions();
    this.showFeedback('Escolha os itens certos para uma viagem de praia!');
  }

  drawBackground() {
    this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0xfffdf9);
    this.add.circle(912, 55, 78, 0xfff5dfb8, .55);
    this.add.circle(45, 575, 100, 0xffdff2e8, .42);
    this.add.text(30, 25, 'MALEIRO', { fontFamily: 'Fredoka, sans-serif', fontSize: '24px', color: '#2e2b35', fontStyle: '600' });
    this.add.text(30, 57, 'arrume com carinho ✨', { fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#756f7d' });
    this.addButton(790, 30, 140, 42, 'CONFERIR MALA', 0x6652c8, () => this.evaluate());
  }

  drawBriefing() {
    const g = this.add.graphics();
    g.fillStyle(0xfff2dd, 1);
    g.fillRoundedRect(30, 105, 220, 390, 20);
    g.lineStyle(2, 0xf1d8b5, 1);
    g.strokeRoundedRect(30, 105, 220, 390, 20);
    this.add.text(52, 130, 'PEDIDO DA CLIENTE', { fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#a46239', fontStyle: 'bold' });
    this.add.text(52, 162, 'Mila', { fontFamily: 'Fredoka, sans-serif', fontSize: '34px', color: '#2e2b35' });
    this.add.text(52, 204, 'Vai para:', { fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#756f7d' });
    this.add.text(52, 224, '🏖️ Praia', { fontFamily: 'Fredoka, sans-serif', fontSize: '22px', color: '#2e2b35' });
    this.add.text(52, 268, 'Clima:', { fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#756f7d' });
    this.add.text(52, 287, '☀️ Quente e ensolarado', { fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: '#2e2b35', fontStyle: 'bold' });
    this.add.text(52, 330, 'Ela pediu:', { fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#756f7d' });
    this.add.text(52, 352, 'roupas leves', { fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: '#2e2b35', fontStyle: 'bold' });
    this.add.text(52, 376, 'e algo divertido', { fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: '#2e2b35', fontStyle: 'bold' });
    this.add.text(52, 431, 'Dica', { fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#a46239', fontStyle: 'bold' });
    this.add.text(52, 450, 'O protetor solar\né essencial!', { fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#756f7d', lineSpacing: 4 });
  }

  drawShelf() {
    const g = this.add.graphics();
    g.fillStyle(0xf2efff, 1);
    g.fillRoundedRect(280, 105, 650, 195, 20);
    g.lineStyle(2, 0xe0d8fc, 1);
    g.strokeRoundedRect(280, 105, 650, 195, 20);
    this.add.text(305, 124, 'ARMÁRIO DA MILA', { fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#6652c8', fontStyle: 'bold' });
    this.add.text(745, 124, 'toque para escolher', { fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: '#9489be' });
  }

  drawSuitcase() {
    const g = this.add.graphics();
    g.fillStyle(0xffe8e0, 1);
    g.fillRoundedRect(SUITCASE_ZONE.x, SUITCASE_ZONE.y, SUITCASE_ZONE.width, SUITCASE_ZONE.height, 24);
    g.lineStyle(3, 0xf2b5a9, 1);
    g.strokeRoundedRect(SUITCASE_ZONE.x, SUITCASE_ZONE.y, SUITCASE_ZONE.width, SUITCASE_ZONE.height, 24);
    g.lineStyle(5, 0xf2b5a9, 1);
    g.strokeRoundedRect(548, 312, 115, 28, 12);
    this.add.text(305, 355, 'SUA MALA', { fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#b65f53', fontStyle: 'bold' });
    this.add.text(735, 355, '0 / 5 itens', { fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#b65f53', fontStyle: 'bold', align: 'right' }).setName('capacityText');
    this.add.text(605, 530, 'coloque os itens aqui', { fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#c68b82', align: 'center' }).setName('emptyText');
  }

  createItems() {
    const positions = [
      [365, 185], [510, 185], [655, 185], [800, 185],
      [437, 263], [582, 263], [727, 263], [872, 263]
    ];
    ITEMS.forEach((item, index) => {
      const view = this.createItemView(item, positions[index][0], positions[index][1]);
      this.itemViews.set(item.id, view);
    });
  }

  createItemView(item, x, y) {
    const container = this.add.container(x, y);
    const card = this.add.rectangle(0, 0, 118, 67, item.color, 1).setStrokeStyle(2, 0xffffff, .8);
    const emoji = this.add.text(0, -10, item.emoji, { fontFamily: 'Arial', fontSize: '25px' }).setOrigin(.5);
    const label = this.add.text(0, 19, item.label, { fontFamily: 'DM Sans, sans-serif', fontSize: item.label.length > 12 ? '10px' : '11px', color: '#2e2b35', fontStyle: 'bold', align: 'center', wordWrap: { width: 108 } }).setOrigin(.5);
    container.add([card, emoji, label]);
    container.setSize(118, 67);
    container.setInteractive(new Phaser.Geom.Rectangle(-59, -34, 118, 67), Phaser.Geom.Rectangle.Contains);
    this.input.setDraggable(container);
    container.setData('item', item);
    container.setData('home', { x, y });
    container.setData('moved', false);
    container.on('pointerdown', () => { container.setData('moved', false); });
    container.on('dragstart', () => {
      container.setData('moved', true);
      container.setDepth(10);
      this.tweens.add({ targets: container, scale: 1.08, duration: 100 });
    });
    container.on('drag', (_, dragX, dragY) => { container.x = dragX; container.y = dragY; });
    container.on('dragend', () => {
      this.tweens.add({ targets: container, scale: 1, duration: 100 });
      container.setDepth(1);
      if (this.isInsideSuitcase(container.x, container.y)) this.packItem(item.id);
      else this.returnHome(item.id);
    });
    container.on('pointerup', () => {
      if (!container.getData('moved')) this.toggleItem(item.id);
    });
    return container;
  }

  createActions() {
    this.addButton(48, 523, 185, 42, 'LIMPAR MALA', 0xf1d8b5, () => this.clearSuitcase(), '#674b39');
    this.feedbackText = this.add.text(280, 590, '', { fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#756f7d', fontStyle: 'bold' });
  }

  addButton(x, y, width, height, label, color, callback, textColor = '#ffffff') {
    const button = this.add.container(x, y);
    const bg = this.add.rectangle(0, 0, width, height, color, 1).setOrigin(0);
    bg.setStrokeStyle(2, 0xffffff, .4);
    const text = this.add.text(width / 2, height / 2, label, { fontFamily: 'DM Sans, sans-serif', fontSize: label.length > 12 ? '11px' : '12px', color: textColor, fontStyle: 'bold' }).setOrigin(.5);
    button.add([bg, text]);
    button.setSize(width, height).setInteractive(new Phaser.Geom.Rectangle(0, 0, width, height), Phaser.Geom.Rectangle.Contains);
    button.on('pointerover', () => { bg.setAlpha(.85); });
    button.on('pointerout', () => { bg.setAlpha(1); });
    button.on('pointerdown', callback);
    return button;
  }

  isInsideSuitcase(x, y) {
    return x > SUITCASE_ZONE.x + 45 && x < SUITCASE_ZONE.x + SUITCASE_ZONE.width - 45 && y > SUITCASE_ZONE.y + 45 && y < SUITCASE_ZONE.y + SUITCASE_ZONE.height - 20;
  }

  toggleItem(id) {
    if (this.packedItems.includes(id)) this.removeItem(id);
    else this.packItem(id);
  }

  packItem(id) {
    if (this.packedItems.includes(id)) return;
    if (this.packedItems.length >= MAX_ITEMS) {
      this.showFeedback('A mala está cheia! Tire um item antes de escolher outro.', true);
      this.returnHome(id);
      return;
    }
    this.packedItems.push(id);
    this.layoutPackedItems();
    const item = ITEMS.find((entry) => entry.id === id);
    this.showFeedback(`${item.emoji} ${item.label} guardado na mala.`);
  }

  removeItem(id) {
    this.packedItems = this.packedItems.filter((itemId) => itemId !== id);
    this.returnHome(id);
    this.layoutPackedItems();
    this.showFeedback('Item devolvido ao armário.');
  }

  returnHome(id) {
    const view = this.itemViews.get(id);
    const home = view.getData('home');
    this.tweens.add({ targets: view, x: home.x, y: home.y, duration: 180, ease: 'Back.easeOut' });
  }

  layoutPackedItems() {
    this.packedItems.forEach((id, index) => {
      const view = this.itemViews.get(id);
      const x = 365 + index * 125;
      const y = 445;
      this.tweens.add({ targets: view, x, y, duration: 180, ease: 'Back.easeOut' });
      view.setDepth(2);
    });
    const capacityText = this.children.getByName('capacityText');
    if (capacityText) capacityText.setText(`${this.packedItems.length} / 5 itens`);
    const emptyText = this.children.getByName('emptyText');
    if (emptyText) emptyText.setVisible(this.packedItems.length === 0);
  }

  clearSuitcase() {
    this.packedItems.slice().forEach((id) => this.returnHome(id));
    this.packedItems = [];
    this.layoutPackedItems();
    this.showFeedback('Mala limpa. Escolha novamente!');
  }

  showFeedback(message, isError = false) {
    if (!this.feedbackText) return;
    this.feedbackText.setText(message).setColor(isError ? '#c35b51' : '#756f7d');
  }

  evaluate() {
    const selected = ITEMS.filter((item) => this.packedItems.includes(item.id));
    const correct = selected.filter((item) => item.good).length;
    const wrong = selected.filter((item) => !item.good).length;
    const missing = ITEMS.filter((item) => item.good && !this.packedItems.includes(item.id)).length;
    const hasBook = this.packedItems.includes('livro');
    const score = Math.max(0, correct * 20 + (hasBook ? 10 : 0) - wrong * 15 - missing * 5);
    const stars = score >= 90 ? 3 : score >= 55 ? 2 : 1;
    this.hasEvaluated = true;
    this.showResult({ score, stars, correct, wrong, missing });
  }

  showResult(result) {
    const shade = this.add.rectangle(0, 0, GAME_WIDTH, GAME_HEIGHT, 0x2e2b35, .55).setOrigin(0).setDepth(20);
    const panel = this.add.container(210, 105).setDepth(21);
    const box = this.add.rectangle(0, 0, 540, 410, 0xfffdf9, 1).setOrigin(0).setStrokeStyle(3, 0xe8dfd4, 1);
    const title = this.add.text(270, 42, result.stars === 3 ? 'Mila amou a mala!' : 'Vamos conferir?', { fontFamily: 'Fredoka, sans-serif', fontSize: '30px', color: '#2e2b35' }).setOrigin(.5);
    const stars = this.add.text(270, 93, '★'.repeat(result.stars) + '☆'.repeat(3 - result.stars), { fontFamily: 'Arial', fontSize: '38px', color: '#f2b84b' }).setOrigin(.5);
    const score = this.add.text(270, 153, `${result.score} pontos`, { fontFamily: 'Fredoka, sans-serif', fontSize: '25px', color: '#6652c8' }).setOrigin(.5);
    const summary = this.add.text(270, 220, `${result.correct} item(ns) que combinam\n${result.wrong} item(ns) fora do clima\n${result.missing} item(ns) importante(s) faltando`, { fontFamily: 'DM Sans, sans-serif', fontSize: '16px', color: '#756f7d', align: 'center', lineSpacing: 8 }).setOrigin(.5);
    const advice = this.add.text(270, 296, result.wrong || result.missing ? 'Dica: pense no sol e no passeio na praia.' : 'Perfeito! A diversão pode começar.', { fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#a46239', fontStyle: 'bold', align: 'center', wordWrap: { width: 420 } }).setOrigin(.5);
    const again = this.addButton(195, 345, 150, 42, 'TENTAR DE NOVO', 0x6652c8, () => {
      shade.destroy(); panel.destroy(); this.hasEvaluated = false; this.clearSuitcase();
    });
    const done = this.addButton(365, 345, 120, 42, 'FECHAR', 0xf1d8b5, () => { shade.destroy(); panel.destroy(); this.showFeedback('Você pode ajustar a mala e conferir de novo.'); }, '#674b39');
    panel.add([box, title, stars, score, summary, advice, again, done]);
  }
}

const config = {
  type: Phaser.AUTO,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  parent: 'game',
  backgroundColor: '#fffdf9',
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  render: { antialias: true, roundPixels: true },
  input: { activePointers: 3 },
  scene: [MaleiroScene]
};

if (window.Phaser) {
  new Phaser.Game(config);
} else {
  document.getElementById('game').innerHTML = '<p style="padding:32px;text-align:center;font-family:sans-serif">Não foi possível carregar o jogo agora. Atualize a página para tentar novamente.</p>';
}
