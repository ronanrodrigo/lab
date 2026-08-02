const GAME_WIDTH = 960;
const GAME_HEIGHT = 620;
const MAX_ITEMS = 5;
const SUITCASE_ZONE = { x: 390, y: 285, width: 340, height: 145 };

const ITEMS = [
  { id: 'camiseta', label: 'camiseta', icon: 'shirt', color: 0xf29bc2, good: true },
  { id: 'shorts', label: 'shorts', icon: 'shorts', color: 0x9fa8ff, good: true },
  { id: 'chinelo', label: 'chinelo', icon: 'flipflop', color: 0xf6cc64, good: true },
  { id: 'protetor', label: 'protetor', icon: 'sunscreen', color: 0x84d5b5, good: true },
  { id: 'livro', label: 'livro', icon: 'book', color: 0xf19c70, good: true },
  { id: 'casaco', label: 'casaco', icon: 'coat', color: 0x7fa9d9, good: false },
  { id: 'bota', label: 'bota', icon: 'boot', color: 0xb78d69, good: false },
  { id: 'guarda-chuva', label: 'guarda-chuva', icon: 'umbrella', color: 0x8ab6e6, good: false }
];

class MaleiroScene extends Phaser.Scene {
  constructor() {
    super('MaleiroScene');
    this.packedItems = [];
    this.itemViews = new Map();
    this.feedback = null;
    this.scoreText = null;
    this.capacityText = null;
    this.customerMouth = null;
    this.resultOpen = false;
  }

  create() {
    this.drawRoom();
    this.drawBriefingBoard();
    this.drawCustomer();
    this.drawCounter();
    this.drawSuitcase();
    this.drawItemRack();
    this.createItems();
    this.createHud();
    this.showFeedback('Escolha os itens da viagem e coloque-os na mala.');
  }

  drawRoom() {
    const g = this.add.graphics();
    g.fillStyle(0x172238, 1);
    g.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    g.fillStyle(0x243653, 1);
    g.fillRect(0, 0, GAME_WIDTH, 380);
    g.fillStyle(0x1c2b45, 1);
    g.fillRect(0, 380, GAME_WIDTH, 240);
    g.fillStyle(0x2f4362, 1);
    for (let x = 0; x < GAME_WIDTH; x += 80) g.fillRect(x, 375, 2, 245);
    for (let y = 405; y < GAME_HEIGHT; y += 52) g.fillRect(0, y, GAME_WIDTH, 2);
    g.fillStyle(0x304769, 1);
    g.fillRoundedRect(46, 22, 868, 54, 12);
    g.lineStyle(2, 0x527097, 1);
    g.strokeRoundedRect(46, 22, 868, 54, 12);
    this.add.text(480, 48, '✈  MALEIRO  •  BALCÃO DE EMBARQUE', {
      fontFamily: 'Arial', fontSize: '19px', color: '#f7d77b', fontStyle: 'bold'
    }).setOrigin(.5);
    this.add.text(480, 91, 'missão 01  /  preparar a mala da Mila', {
      fontFamily: 'Arial', fontSize: '12px', color: '#9eb3d6'
    }).setOrigin(.5);
    this.add.circle(875, 130, 30, 0xf7d77b, .9);
    this.add.text(875, 130, '☀', { fontFamily: 'Arial', fontSize: '28px', color: '#fff6cf' }).setOrigin(.5);
  }

  drawBriefingBoard() {
    const g = this.add.graphics();
    g.fillStyle(0xf7e8bc, 1);
    g.fillRoundedRect(34, 108, 265, 190, 12);
    g.lineStyle(4, 0xa9784f, 1);
    g.strokeRoundedRect(34, 108, 265, 190, 12);
    g.fillStyle(0xd5b184, 1);
    g.fillRect(46, 286, 12, 32);
    g.fillRect(275, 286, 12, 32);
    this.add.text(55, 126, 'PEDIDO DA CLIENTE', {
      fontFamily: 'Arial', fontSize: '12px', color: '#7c4c2d', fontStyle: 'bold'
    });
    this.add.text(55, 153, 'MILA', {
      fontFamily: 'Arial', fontSize: '28px', color: '#2c3146', fontStyle: 'bold'
    });
    this.add.text(55, 194, 'DESTINO', { fontFamily: 'Arial', fontSize: '10px', color: '#9a704c', fontStyle: 'bold' });
    this.add.text(130, 194, 'PRAIA', { fontFamily: 'Arial', fontSize: '15px', color: '#2c3146', fontStyle: 'bold' });
    this.add.text(55, 222, 'CLIMA', { fontFamily: 'Arial', fontSize: '10px', color: '#9a704c', fontStyle: 'bold' });
    this.add.text(130, 222, 'QUENTE ☀', { fontFamily: 'Arial', fontSize: '15px', color: '#2c3146', fontStyle: 'bold' });
    this.add.text(55, 254, 'LEVAR', { fontFamily: 'Arial', fontSize: '10px', color: '#9a704c', fontStyle: 'bold' });
    this.add.text(130, 254, 'roupas leves + diversão', { fontFamily: 'Arial', fontSize: '13px', color: '#2c3146', fontStyle: 'bold' });
  }

  drawCustomer() {
    const g = this.add.graphics();
    g.fillStyle(0x101a2c, .35);
    g.fillEllipse(178, 390, 190, 28);
    // pernas, parcialmente escondidas pelo balcão
    g.fillStyle(0x4b5e9b, 1);
    g.fillRect(141, 343, 27, 68);
    g.fillRect(190, 343, 27, 68);
    g.fillStyle(0x252c4c, 1);
    g.fillRoundedRect(132, 399, 42, 13, 5);
    g.fillRoundedRect(185, 399, 42, 13, 5);
    // corpo e braços apoiados no balcão
    g.fillStyle(0xf08a68, 1);
    g.fillRoundedRect(116, 230, 125, 135, 28);
    g.fillStyle(0xf8b294, 1);
    g.fillRoundedRect(95, 286, 40, 85, 18);
    g.fillRoundedRect(222, 286, 40, 85, 18);
    g.fillCircle(115, 366, 18);
    g.fillCircle(242, 366, 18);
    // pescoço e cabeça
    g.fillStyle(0xf8b294, 1);
    g.fillRect(157, 204, 43, 38);
    g.fillCircle(178, 168, 61);
    // cabelo
    g.fillStyle(0x5a3451, 1);
    g.fillCircle(143, 143, 26);
    g.fillCircle(178, 120, 31);
    g.fillCircle(213, 143, 26);
    g.fillRoundedRect(119, 139, 119, 32, 18);
    // rosto
    g.fillStyle(0x2c3146, 1);
    g.fillCircle(158, 169, 4);
    g.fillCircle(199, 169, 4);
    g.lineStyle(3, 0x9a4f58, 1);
    g.arc(178, 177, 16, .15, 2.98, false);
    // mochila
    g.fillStyle(0x4e8f8c, 1);
    g.fillRoundedRect(89, 242, 28, 87, 13);
    this.add.text(178, 111, 'CLIENTE', {
      fontFamily: 'Arial', fontSize: '11px', color: '#a9bfdf', fontStyle: 'bold'
    }).setOrigin(.5);
    const bubble = this.add.graphics();
    bubble.fillStyle(0xfffdf2, 1);
    bubble.fillRoundedRect(270, 128, 205, 67, 15);
    bubble.fillTriangle(270, 172, 253, 184, 270, 184);
    bubble.lineStyle(2, 0xe5d8bd, 1);
    bubble.strokeRoundedRect(270, 128, 205, 67, 15);
    this.add.text(286, 143, 'Oi! Vou para a praia.', {
      fontFamily: 'Arial', fontSize: '14px', color: '#2c3146', fontStyle: 'bold'
    });
    this.add.text(286, 166, 'Pode preparar minha mala?', {
      fontFamily: 'Arial', fontSize: '12px', color: '#6b7084'
    });
    this.customerMouth = g;
  }

  drawCounter() {
    const g = this.add.graphics();
    // tampo do balcão atrás da mala e dos itens
    g.fillStyle(0x9c654e, 1);
    g.fillRoundedRect(30, 368, 900, 64, 12);
    g.lineStyle(4, 0xd39265, 1);
    g.strokeRoundedRect(30, 368, 900, 64, 12);
    g.fillStyle(0x6b3f3b, 1);
    g.fillRect(30, 421, 900, 199);
    g.fillStyle(0x8c5145, 1);
    g.fillRect(30, 421, 900, 14);
    g.fillStyle(0x442d35, 1);
    g.fillRect(54, 460, 852, 4);
    // letreiro do jogador
    g.fillStyle(0x253b5e, 1);
    g.fillRoundedRect(68, 476, 220, 60, 10);
    g.lineStyle(2, 0x527097, 1);
    g.strokeRoundedRect(68, 476, 220, 60, 10);
    this.add.text(178, 494, 'VOCÊ', { fontFamily: 'Arial', fontSize: '17px', color: '#f7d77b', fontStyle: 'bold' }).setOrigin(.5);
    this.add.text(178, 518, 'arrumando a mala', { fontFamily: 'Arial', fontSize: '12px', color: '#bdcbe3' }).setOrigin(.5);
    // mãos do jogador sobre o balcão
    g.fillStyle(0xf2a27c, 1);
    g.fillRoundedRect(382, 465, 95, 27, 14);
    g.fillRoundedRect(690, 465, 95, 27, 14);
    g.fillCircle(463, 481, 18);
    g.fillCircle(704, 481, 18);
  }

  drawSuitcase() {
    const g = this.add.graphics();
    // mala aberta sobre o balcão
    g.fillStyle(0x263c6c, 1);
    g.fillRoundedRect(394, 267, 330, 74, 18);
    g.lineStyle(3, 0x6f8fc7, 1);
    g.strokeRoundedRect(394, 267, 330, 74, 18);
    g.fillStyle(0x9bc4ef, 1);
    g.fillRoundedRect(410, 278, 298, 53, 12);
    g.fillStyle(0x4b6fa9, 1);
    g.fillRoundedRect(406, 323, 306, 104, 17);
    g.lineStyle(4, 0x8db2e4, 1);
    g.strokeRoundedRect(406, 323, 306, 104, 17);
    g.fillStyle(0x263c6c, 1);
    g.fillRoundedRect(432, 312, 67, 20, 8);
    g.fillRoundedRect(613, 312, 67, 20, 8);
    this.add.text(559, 293, 'MALA DA MILA', {
      fontFamily: 'Arial', fontSize: '12px', color: '#24375f', fontStyle: 'bold'
    }).setOrigin(.5);
    this.add.text(559, 380, 'arraste os itens para cá', {
      fontFamily: 'Arial', fontSize: '12px', color: '#b9d0f0'
    }).setOrigin(.5).setName('emptyText');
  }

  drawItemRack() {
    const g = this.add.graphics();
    g.fillStyle(0x263653, 1);
    g.fillRoundedRect(758, 104, 174, 254, 12);
    g.lineStyle(3, 0x527097, 1);
    g.strokeRoundedRect(758, 104, 174, 254, 12);
    g.fillStyle(0x8c5d48, 1);
    g.fillRect(770, 137, 150, 5);
    g.fillRect(770, 212, 150, 5);
    g.fillRect(770, 287, 150, 5);
    this.add.text(845, 116, 'ITENS', { fontFamily: 'Arial', fontSize: '12px', color: '#f7d77b', fontStyle: 'bold' }).setOrigin(.5);
    this.add.text(845, 345, 'toque ou arraste', { fontFamily: 'Arial', fontSize: '10px', color: '#a9bfdf' }).setOrigin(.5);
  }

  createItems() {
    const positions = [
      [796, 170], [878, 170], [796, 245], [878, 245],
      [796, 320], [878, 320], [796, 395], [878, 395]
    ];
    ITEMS.forEach((item, index) => {
      const view = this.createItemView(item, positions[index][0], positions[index][1]);
      this.itemViews.set(item.id, view);
    });
  }

  createItemView(item, x, y) {
    const view = this.add.container(x, y).setDepth(8);
    const shadow = this.add.ellipse(0, 29, 68, 12, 0x101a2c, .28);
    const token = this.add.rectangle(0, 0, 72, 62, item.color, 1).setStrokeStyle(3, 0xfff7df, .85);
    const icon = this.makeIcon(item.icon, item.color);
    const label = this.add.text(0, 29, item.label, {
      fontFamily: 'Arial', fontSize: item.label.length > 9 ? '8px' : '9px', color: '#243047', fontStyle: 'bold', align: 'center'
    }).setOrigin(.5);
    view.add([shadow, token, icon, label]);
    view.setSize(72, 62);
    view.setInteractive(new Phaser.Geom.Rectangle(-36, -31, 72, 62), Phaser.Geom.Rectangle.Contains);
    this.input.setDraggable(view);
    view.setData('item', item);
    view.setData('home', { x, y });
    view.setData('dragged', false);
    view.on('pointerdown', () => view.setData('dragged', false));
    view.on('dragstart', () => {
      view.setData('dragged', true);
      view.setDepth(20);
      this.tweens.add({ targets: view, scale: 1.15, duration: 100 });
      this.showFeedback('Leve o item até a mala.');
    });
    view.on('drag', (_, dragX, dragY) => { view.x = dragX; view.y = dragY; });
    view.on('dragend', () => {
      this.tweens.add({ targets: view, scale: 1, duration: 120 });
      view.setDepth(8);
      if (this.isInsideSuitcase(view.x, view.y)) this.packItem(item.id);
      else if (this.packedItems.includes(item.id)) this.removeItem(item.id);
      else this.returnHome(item.id);
    });
    view.on('pointerup', () => {
      if (!view.getData('dragged')) this.toggleItem(item.id);
    });
    return view;
  }

  makeIcon(type, color) {
    const icon = this.add.graphics();
    icon.setPosition(0, -5);
    icon.setScale(.72);
    icon.lineStyle(3, 0x27314a, 1);
    icon.fillStyle(0xfff7df, 1);
    if (type === 'shirt') {
      icon.fillStyle(color, 1);
      icon.beginPath(); icon.moveTo(-22, -16); icon.lineTo(-8, -25); icon.lineTo(0, -16); icon.lineTo(8, -25); icon.lineTo(22, -16); icon.lineTo(16, 22); icon.lineTo(-16, 22); icon.closePath(); icon.fillPath(); icon.strokePath();
    } else if (type === 'shorts') {
      icon.fillStyle(color, 1); icon.fillRoundedRect(-22, -20, 44, 38, 5); icon.fillStyle(0x27314a, 1); icon.fillRect(-2, -18, 4, 38); icon.strokeRoundedRect(-22, -20, 44, 38, 5);
    } else if (type === 'flipflop') {
      icon.fillStyle(color, 1); icon.fillEllipse(-8, 3, 14, 38); icon.fillEllipse(9, 3, 14, 38); icon.strokeEllipse(-8, 3, 14, 38); icon.strokeEllipse(9, 3, 14, 38); icon.lineBetween(-15, -10, -2, 9); icon.lineBetween(15, -10, 2, 9);
    } else if (type === 'sunscreen') {
      icon.fillStyle(0xfff5d0, 1); icon.fillRoundedRect(-15, -14, 30, 37, 5); icon.fillStyle(color, 1); icon.fillRect(-15, -6, 30, 15); icon.fillStyle(0x27314a, 1); icon.fillRect(-9, -22, 18, 8); icon.strokeRoundedRect(-15, -14, 30, 37, 5);
    } else if (type === 'book') {
      icon.fillStyle(color, 1); icon.fillRoundedRect(-23, -19, 21, 39, 3); icon.fillRoundedRect(2, -19, 21, 39, 3); icon.lineBetween(0, -17, 0, 18);
    } else if (type === 'coat') {
      icon.fillStyle(color, 1); icon.beginPath(); icon.moveTo(-18, -22); icon.lineTo(0, -10); icon.lineTo(18, -22); icon.lineTo(24, 21); icon.lineTo(-24, 21); icon.closePath(); icon.fillPath(); icon.strokePath(); icon.lineBetween(0, -10, 0, 20);
    } else if (type === 'boot') {
      icon.fillStyle(color, 1); icon.fillRoundedRect(-15, -24, 25, 42, 5); icon.fillRoundedRect(-15, 10, 36, 13, 5); icon.strokeRoundedRect(-15, -24, 25, 42, 5);
    } else {
      icon.fillStyle(color, 1); icon.beginPath(); icon.moveTo(-24, -2); icon.lineTo(24, -2); icon.lineTo(0, -24); icon.closePath(); icon.fillPath(); icon.strokePath(); icon.lineBetween(0, -2, 0, 22);
    }
    return icon;
  }

  createHud() {
    this.add.text(323, 115, 'MONTAGEM', { fontFamily: 'Arial', fontSize: '12px', color: '#a9bfdf', fontStyle: 'bold' });
    this.capacityText = this.add.text(323, 137, '0 / 5 itens', { fontFamily: 'Arial', fontSize: '15px', color: '#f7d77b', fontStyle: 'bold' });
    this.scoreText = this.add.text(323, 164, '★ 0 pontos', { fontFamily: 'Arial', fontSize: '13px', color: '#d5e2f5', fontStyle: 'bold' });
    this.add.text(323, 192, 'A pessoa está esperando...', { fontFamily: 'Arial', fontSize: '11px', color: '#9eb3d6' });
    this.createGameButton(746, 530, 158, 52, 'ENTREGAR MALA', 0xf2b957, '#3a2b2b', () => this.evaluate());
    this.feedback = this.add.text(480, 545, '', { fontFamily: 'Arial', fontSize: '13px', color: '#f7e8bc', fontStyle: 'bold', align: 'center', wordWrap: { width: 400 } }).setOrigin(.5);
  }

  createGameButton(x, y, width, height, textValue, color, textColor, callback) {
    const button = this.add.container(x, y).setDepth(15);
    const bg = this.add.rectangle(0, 0, width, height, color, 1).setOrigin(0).setStrokeStyle(3, 0xfff0ae, .8);
    const text = this.add.text(width / 2, height / 2, textValue, { fontFamily: 'Arial', fontSize: '12px', color: textColor, fontStyle: 'bold' }).setOrigin(.5);
    button.add([bg, text]);
    button.setSize(width, height).setInteractive(new Phaser.Geom.Rectangle(0, 0, width, height), Phaser.Geom.Rectangle.Contains);
    button.on('pointerover', () => bg.setAlpha(.8));
    button.on('pointerout', () => bg.setAlpha(1));
    button.on('pointerdown', callback);
    return button;
  }

  isInsideSuitcase(x, y) {
    return x > SUITCASE_ZONE.x + 20 && x < SUITCASE_ZONE.x + SUITCASE_ZONE.width - 20 && y > SUITCASE_ZONE.y + 38 && y < SUITCASE_ZONE.y + SUITCASE_ZONE.height - 10;
  }

  toggleItem(id) {
    if (this.packedItems.includes(id)) this.removeItem(id);
    else this.packItem(id);
  }

  packItem(id) {
    if (this.packedItems.includes(id)) return;
    if (this.packedItems.length >= MAX_ITEMS) {
      this.showFeedback('A mala cheia! Tire um item antes de colocar outro.', true);
      this.returnHome(id);
      return;
    }
    this.packedItems.push(id);
    this.layoutPackedItems();
    const item = ITEMS.find((entry) => entry.id === id);
    this.showFeedback(`${item.label} colocado na mala.`);
  }

  removeItem(id) {
    this.packedItems = this.packedItems.filter((itemId) => itemId !== id);
    this.returnHome(id);
    this.layoutPackedItems();
    this.showFeedback('Item voltou para a prateleira.');
  }

  returnHome(id) {
    const view = this.itemViews.get(id);
    const home = view.getData('home');
    this.tweens.add({ targets: view, x: home.x, y: home.y, duration: 180, ease: 'Back.easeOut' });
  }

  layoutPackedItems() {
    const packedX = [438, 500, 562, 624, 686];
    this.packedItems.forEach((id, index) => {
      const view = this.itemViews.get(id);
      this.tweens.add({ targets: view, x: packedX[index], y: 375, duration: 180, ease: 'Back.easeOut' });
      view.setDepth(12);
    });
    if (this.capacityText) this.capacityText.setText(`${this.packedItems.length} / 5 itens`);
    const emptyText = this.children.getByName('emptyText');
    if (emptyText) emptyText.setVisible(this.packedItems.length === 0);
  }

  showFeedback(message, isError = false) {
    if (this.feedback) this.feedback.setText(message).setColor(isError ? '#ff9d8c' : '#f7e8bc');
  }

  evaluate() {
    const selected = ITEMS.filter((item) => this.packedItems.includes(item.id));
    const correct = selected.filter((item) => item.good).length;
    const wrong = selected.filter((item) => !item.good).length;
    const missing = ITEMS.filter((item) => item.good && !this.packedItems.includes(item.id)).length;
    const hasBook = this.packedItems.includes('livro');
    const score = Math.max(0, correct * 20 + (hasBook ? 10 : 0) - wrong * 15 - missing * 5);
    const stars = score >= 90 ? 3 : score >= 55 ? 2 : 1;
    this.showResult({ score, stars, correct, wrong, missing });
  }

  showResult(result) {
    if (this.resultOpen) return;
    this.resultOpen = true;
    const shade = this.add.rectangle(0, 0, GAME_WIDTH, GAME_HEIGHT, 0x0b1221, .76).setOrigin(0).setDepth(30);
    const panel = this.add.container(190, 132).setDepth(31);
    const box = this.add.rectangle(0, 0, 580, 350, 0x243653, 1).setOrigin(0).setStrokeStyle(4, 0x6e8fbd, 1);
    const title = this.add.text(290, 42, result.stars === 3 ? 'MALA PRONTA!' : 'QUASE LÁ!', { fontFamily: 'Arial', fontSize: '30px', color: '#f7d77b', fontStyle: 'bold' }).setOrigin(.5);
    const stars = this.add.text(290, 88, '★'.repeat(result.stars) + '☆'.repeat(3 - result.stars), { fontFamily: 'Arial', fontSize: '40px', color: '#f2b957' }).setOrigin(.5);
    const score = this.add.text(290, 140, `${result.score} PONTOS`, { fontFamily: 'Arial', fontSize: '22px', color: '#fff8df', fontStyle: 'bold' }).setOrigin(.5);
    const summary = this.add.text(290, 205, `${result.correct} itens certos     ${result.wrong} fora do clima\n${result.missing} item(ns) importante(s) faltando`, { fontFamily: 'Arial', fontSize: '15px', color: '#c9d8ef', align: 'center', lineSpacing: 9 }).setOrigin(.5);
    const advice = this.add.text(290, 257, result.wrong || result.missing ? 'Pense no sol, na praia e nas roupas leves.' : 'Mila pode embarcar feliz!', { fontFamily: 'Arial', fontSize: '13px', color: '#f7e8bc', fontStyle: 'bold' }).setOrigin(.5);
    const again = this.createGameButton(170, 292, 180, 40, 'MONTAR DE NOVO', 0xf2b957, '#3a2b2b', () => {
      shade.destroy(); panel.destroy(); this.resultOpen = false; this.clearSuitcase();
    });
    const close = this.createGameButton(370, 292, 100, 40, 'FECHAR', 0x536f9d, '#ffffff', () => {
      shade.destroy(); panel.destroy(); this.resultOpen = false; this.showFeedback('Ajuste a mala ou entregue novamente.');
    });
    panel.add([box, title, stars, score, summary, advice, again, close]);
  }

  clearSuitcase() {
    this.packedItems.slice().forEach((id) => this.returnHome(id));
    this.packedItems = [];
    this.layoutPackedItems();
    this.showFeedback('A mala foi esvaziada. Vamos tentar outra vez!');
  }
}

const config = {
  type: Phaser.AUTO,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  parent: 'game',
  backgroundColor: '#172238',
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  render: { antialias: true, roundPixels: true },
  input: { activePointers: 3 },
  scene: [MaleiroScene]
};

if (window.Phaser) {
  new Phaser.Game(config);
} else {
  document.getElementById('game').innerHTML = '<p style="padding:40px;color:white;text-align:center;font-family:Arial">O motor do jogo não carregou. Atualize a página para tentar novamente.</p>';
}
