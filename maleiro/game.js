const WIDTH = 960;
const HEIGHT = 640;
const ROUND_TIME = 45;
const MAX_PACKED = 5;

const ITEMS = [
  { id: 'camiseta', name: 'CAMISETA', icon: 'shirt', color: 0xed6c9d, good: true },
  { id: 'shorts', name: 'SHORTS', icon: 'shorts', color: 0x727be6, good: true },
  { id: 'chinelo', name: 'CHINELO', icon: 'flipflop', color: 0xf1bd4d, good: true },
  { id: 'protetor', name: 'PROTETOR', icon: 'suncream', color: 0x50c998, good: true },
  { id: 'livro', name: 'LIVRO', icon: 'book', color: 0xeb815b, good: true },
  { id: 'casaco', name: 'CASACO', icon: 'coat', color: 0x4d8dcc, good: false },
  { id: 'bota', name: 'BOTA', icon: 'boot', color: 0x9e6c4b, good: false },
  { id: 'CHUVA', name: 'GUARDA-CHUVA', icon: 'umbrella', color: 0x4f9dc8, good: false }
];

class PackingRush extends Phaser.Scene {
  constructor() {
    super('PackingRush');
    this.screen = 'title';
    this.packed = [];
    this.itemViews = [];
    this.selected = 0;
    this.score = 0;
    this.timeLeft = ROUND_TIME;
    this.elapsed = 0;
    this.resultOpen = false;
  }

  create(data) {
    this.screen = data?.screen || 'title';
    if (this.screen === 'play') this.createPlay();
    else if (this.screen === 'result') this.createResult(data.result);
    else this.createTitle();
  }

  createTitle() {
    this.drawPixelBackdrop(0x10172d);
    this.drawStars();
    this.drawSuitcaseHero(480, 245);
    this.addText('MALEIRO', 480, 92, 58, '#f7cf58', true).setOrigin(.5);
    this.addText('PACKING RUSH', 480, 145, 20, '#8fb8ff', true).setOrigin(.5);
    this.addText('um jogo de montar malas', 480, 177, 14, '#c5d0ed').setOrigin(.5);
    const play = this.pixelButton(330, 468, 300, 66, 'JOGAR', 0xf7cf58, '#171527', () => this.startGame());
    this.tweens.add({ targets: play, y: 474, duration: 650, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    this.addText('setas / espaço / enter  •  toque no celular', 480, 570, 12, '#8392bb').setOrigin(.5);
    this.addText('© 1 jogador', 480, 602, 11, '#566487').setOrigin(.5);
    this.input.keyboard.once('keydown-SPACE', () => this.startGame());
    this.input.keyboard.once('keydown-ENTER', () => this.startGame());
    this.input.once('pointerdown', () => this.startGame());
  }

  startGame() {
    this.scene.restart({ screen: 'play' });
  }

  createPlay() {
    this.packed = [];
    this.itemViews = [];
    this.selected = 0;
    this.score = 0;
    this.timeLeft = ROUND_TIME;
    this.elapsed = 0;
    this.resultOpen = false;
    this.drawPlayfield();
    this.createItems();
    this.createPlayHud();
    this.bindControls();
    this.updateSelection();
  }

  drawPlayfield() {
    this.drawPixelBackdrop(0x17203a);
    const g = this.add.graphics();
    // airport wall and windows
    g.fillStyle(0x26365d, 1); g.fillRect(0, 70, WIDTH, 8);
    g.fillStyle(0x0e1428, 1); g.fillRect(0, 82, WIDTH, 5);
    g.fillStyle(0x253555, 1); g.fillRect(310, 105, 380, 125);
    g.lineStyle(6, 0x6079aa, 1); g.strokeRect(310, 105, 380, 125);
    g.lineStyle(3, 0x415a89, 1); g.lineBetween(500, 105, 500, 230); g.lineBetween(310, 168, 690, 168);
    g.fillStyle(0xffd669, 1); g.fillCircle(625, 135, 23);
    g.fillStyle(0xf6e29e, .32); g.fillCircle(625, 135, 38);
    // tiled floor
    g.fillStyle(0x11182d, 1); g.fillRect(0, 412, WIDTH, 228);
    g.lineStyle(2, 0x202d50, 1);
    for (let x = 0; x <= WIDTH; x += 48) g.lineBetween(x, 412, x, HEIGHT);
    for (let y = 450; y <= HEIGHT; y += 38) g.lineBetween(0, y, WIDTH, y);
    // mission board
    g.fillStyle(0xf3d68b, 1); g.fillRect(35, 102, 226, 142);
    g.fillStyle(0x78523e, 1); g.fillRect(29, 96, 238, 8); g.fillRect(29, 242, 238, 8);
    this.addText('PEDIDO', 53, 125, 13, '#6b4933', true);
    this.addText('MILA', 53, 153, 27, '#272542', true);
    this.addText('PRAIA  /  SOL', 53, 185, 14, '#272542', true);
    this.addText('roupas leves + diversão', 53, 213, 11, '#6b5b52');
    // customer waiting on the other side of the counter
    this.drawCustomer(145, 345);
    // customer speech balloon
    g.fillStyle(0xfff7d8, 1); g.fillRect(238, 270, 220, 58); g.fillTriangle(238, 304, 218, 320, 238, 320);
    g.lineStyle(3, 0x7b5c50, 1); g.strokeRect(238, 270, 220, 58);
    this.addText('MINHA MALA, POR FAVOR!', 348, 293, 12, '#392943', true).setOrigin(.5);
    this.addText('Tenho pressa! ✦', 348, 313, 11, '#8e6254').setOrigin(.5);
    // player behind the counter
    this.drawPlayer(500, 490);
    // counter foreground
    g.fillStyle(0x754b46, 1); g.fillRect(0, 480, WIDTH, 160);
    g.fillStyle(0xc47b58, 1); g.fillRect(0, 468, WIDTH, 26);
    g.fillStyle(0xf0aa68, 1); g.fillRect(0, 468, WIDTH, 6);
    g.fillStyle(0x4c3040, 1); g.fillRect(0, 500, WIDTH, 6);
    g.fillStyle(0x6b4044, 1); g.fillRect(0, 610, WIDTH, 30);
    // open suitcase on the counter
    this.drawSuitcase(490, 390);
    // item shelf
    g.fillStyle(0x202e52, 1); g.fillRect(690, 96, 235, 315);
    g.lineStyle(5, 0x526b9d, 1); g.strokeRect(690, 96, 235, 315);
    g.fillStyle(0xc47b58, 1); g.fillRect(704, 145, 207, 6); g.fillRect(704, 225, 207, 6); g.fillRect(704, 305, 207, 6); g.fillRect(704, 385, 207, 6);
    this.addText('PRATELEIRA', 807, 117, 12, '#f7cf58', true).setOrigin(.5);
  }

  drawPixelBackdrop(color) {
    this.add.rectangle(WIDTH / 2, HEIGHT / 2, WIDTH, HEIGHT, color);
    const g = this.add.graphics();
    g.fillStyle(0x202b4b, .75);
    for (let x = 8; x < WIDTH; x += 32) for (let y = 8; y < 400; y += 32) {
      if ((x + y) % 64 === 0) g.fillRect(x, y, 2, 2);
    }
  }

  drawStars() {
    const g = this.add.graphics(); g.fillStyle(0xf7cf58, 1);
    [[80,110],[870,210],[145,500],[800,480],[740,110],[220,370]].forEach(([x,y]) => {
      g.fillRect(x - 2, y - 9, 4, 18); g.fillRect(x - 9, y - 2, 18, 4);
    });
  }

  drawSuitcaseHero(x, y) {
    const g = this.add.graphics();
    g.fillStyle(0x0b1024, .6); g.fillRect(x - 146, y + 72, 292, 14);
    g.fillStyle(0x4e75bd, 1); g.fillRect(x - 125, y - 10, 250, 90);
    g.fillStyle(0x78a3eb, 1); g.fillRect(x - 112, y + 2, 224, 64);
    g.lineStyle(7, 0xd8e4ff, 1); g.strokeRect(x - 125, y - 10, 250, 90);
    g.fillStyle(0x2f4b83, 1); g.fillRect(x - 35, y - 45, 70, 35);
    g.lineStyle(7, 0x78a3eb, 1); g.strokeRect(x - 35, y - 45, 70, 35);
    g.fillStyle(0xf7cf58, 1); g.fillRect(x - 54, y + 26, 108, 13);
    g.fillStyle(0x243559, 1); g.fillRect(x - 42, y + 48, 84, 7);
    this.addText('✈', x, y + 105, 34, '#f7cf58', true).setOrigin(.5);
  }

  drawCustomer(x, y) {
    const g = this.add.graphics();
    g.fillStyle(0x0a1023, .5); g.fillRect(x - 52, y + 94, 104, 9);
    g.fillStyle(0x303b86, 1); g.fillRect(x - 31, y + 47, 20, 55); g.fillRect(x + 11, y + 47, 20, 55);
    g.fillStyle(0x1c244c, 1); g.fillRect(x - 39, y + 95, 31, 9); g.fillRect(x + 8, y + 95, 31, 9);
    g.fillStyle(0xf06f67, 1); g.fillRect(x - 55, y - 5, 110, 62);
    g.fillStyle(0xf9b38d, 1); g.fillRect(x - 72, y + 17, 20, 59); g.fillRect(x + 52, y + 17, 20, 59);
    g.fillStyle(0xf9b38d, 1); g.fillRect(x - 29, y - 30, 58, 26); g.fillRect(x - 42, y - 77, 84, 58);
    g.fillStyle(0x63334f, 1); g.fillRect(x - 43, y - 83, 86, 26); g.fillRect(x - 28, y - 96, 56, 19); g.fillRect(x - 48, y - 73, 16, 32); g.fillRect(x + 32, y - 73, 16, 32);
    g.fillStyle(0x292542, 1); g.fillRect(x - 22, y - 50, 7, 7); g.fillRect(x + 15, y - 50, 7, 7);
    g.fillStyle(0xb6545d, 1); g.fillRect(x - 13, y - 33, 26, 5);
    g.fillStyle(0x4fa49b, 1); g.fillRect(x - 67, y + 1, 15, 64);
    this.addText('MILA', x, y - 111, 11, '#a8bce5', true).setOrigin(.5);
  }

  drawPlayer(x, y) {
    const g = this.add.graphics();
    g.fillStyle(0x0a1023, .6); g.fillRect(x - 76, y + 45, 152, 12);
    g.fillStyle(0x334b8d, 1); g.fillRect(x - 64, y - 4, 128, 70);
    g.fillStyle(0xf3a47f, 1); g.fillRect(x - 42, y - 63, 84, 58);
    g.fillStyle(0x2f2649, 1); g.fillRect(x - 44, y - 77, 88, 23); g.fillRect(x - 25, y - 91, 50, 18); g.fillRect(x - 49, y - 68, 14, 30); g.fillRect(x + 35, y - 68, 14, 30);
    g.fillStyle(0x25213c, 1); g.fillRect(x - 21, y - 42, 6, 6); g.fillRect(x + 15, y - 42, 6, 6);
    g.fillStyle(0xf6cc58, 1); g.fillRect(x - 8, y - 4, 16, 58);
    g.fillStyle(0xf3a47f, 1); g.fillRect(x - 96, y + 23, 53, 17); g.fillRect(x + 43, y + 23, 53, 17);
    this.addText('VOCÊ', x, y - 108, 11, '#a8bce5', true).setOrigin(.5);
  }

  drawSuitcase(x, y) {
    const g = this.add.graphics();
    g.fillStyle(0x253b76, 1); g.fillRect(x - 140, y - 70, 280, 92);
    g.fillStyle(0x8bb6f2, 1); g.fillRect(x - 126, y - 58, 252, 66);
    g.lineStyle(5, 0xd5e4ff, 1); g.strokeRect(x - 140, y - 70, 280, 92);
    g.fillStyle(0x385da3, 1); g.fillRect(x - 132, y + 8, 264, 94);
    g.lineStyle(5, 0x83abe8, 1); g.strokeRect(x - 132, y + 8, 264, 94);
    g.fillStyle(0x253b76, 1); g.fillRect(x - 54, y - 84, 108, 18); g.fillRect(x - 54, y - 78, 8, 25); g.fillRect(x + 46, y - 78, 8, 25);
    this.addText('MALA', x, y + 72, 12, '#cce0ff', true).setOrigin(.5);
    this.addText('ENTREGAR: ENTER', x, y + 119, 11, '#f7cf58', true).setOrigin(.5);
  }

  createItems() {
    const positions = [[735, 175], [850, 175], [735, 255], [850, 255], [735, 335], [850, 335], [735, 415], [850, 415]];
    ITEMS.forEach((item, index) => {
      const view = this.createItem(item, positions[index][0], positions[index][1]);
      this.itemViews.push(view);
    });
  }

  createItem(item, x, y) {
    const view = this.add.container(x, y).setDepth(10);
    const bg = this.add.rectangle(0, 0, 94, 60, 0x182440, 1).setStrokeStyle(3, 0x526b9d, 1);
    const icon = this.drawItemIcon(item.icon, item.color);
    icon.setPosition(-24, -2);
    const label = this.addText(item.name, 18, 20, item.name.length > 8 ? 8 : 10, '#f0e9d0', true).setOrigin(.5);
    view.add([bg, icon, label]);
    view.setSize(94, 60);
    view.setInteractive(new Phaser.Geom.Rectangle(-47, -30, 94, 60), Phaser.Geom.Rectangle.Contains);
    this.input.setDraggable(view);
    view.setData('item', item); view.setData('home', { x, y }); view.setData('bg', bg); view.setData('packed', false);
    view.on('pointerover', () => { if (!view.getData('packed')) bg.setStrokeStyle(3, 0xf7cf58, 1); });
    view.on('pointerout', () => { if (!view.getData('packed')) this.updateSelection(); });
    view.on('pointerdown', () => { this.selected = this.itemViews.indexOf(view); });
    view.on('pointerup', () => {
      if (!view.getData('dragged')) this.packItem(item.id);
    });
    view.on('dragstart', () => {
      view.setData('dragged', true); view.setDepth(25); view.setScale(1.14); this.showHint('LEVE O ITEM ATÉ A MALA');
    });
    view.on('drag', (_, dragX, dragY) => { view.x = dragX; view.y = dragY; });
    view.on('dragend', () => {
      view.setScale(1); view.setDepth(10);
      if (this.inSuitcase(view.x, view.y)) this.packItem(item.id);
      else this.returnItem(view);
      view.setData('dragged', false);
    });
    return view;
  }

  drawItemIcon(type, color) {
    const g = this.add.graphics(); g.setScale(.8); g.lineStyle(3, 0xf3e9c9, 1); g.fillStyle(color, 1);
    if (type === 'shirt') { g.beginPath(); g.moveTo(-22,-17); g.lineTo(-8,-25); g.lineTo(0,-16); g.lineTo(8,-25); g.lineTo(22,-17); g.lineTo(16,22); g.lineTo(-16,22); g.closePath(); g.fillPath(); g.strokePath(); }
    else if (type === 'shorts') { g.fillRect(-22,-18,44,38); g.fillStyle(0x182440,1); g.fillRect(-3,-18,6,38); g.strokeRect(-22,-18,44,38); }
    else if (type === 'flipflop') { g.fillEllipse(-10,2,15,42); g.fillEllipse(10,2,15,42); g.strokeEllipse(-10,2,15,42); g.strokeEllipse(10,2,15,42); g.lineBetween(-17,-10,-3,8); g.lineBetween(17,-10,3,8); }
    else if (type === 'suncream') { g.fillStyle(0xf9edc4,1); g.fillRect(-15,-15,30,40); g.fillStyle(color,1); g.fillRect(-15,-2,30,15); g.fillStyle(0x182440,1); g.fillRect(-9,-23,18,8); g.strokeRect(-15,-15,30,40); }
    else if (type === 'book') { g.fillRect(-23,-20,22,40); g.fillRect(1,-20,22,40); g.lineBetween(0,-18,0,18); }
    else if (type === 'coat') { g.beginPath(); g.moveTo(-18,-24); g.lineTo(0,-11); g.lineTo(18,-24); g.lineTo(25,22); g.lineTo(-25,22); g.closePath(); g.fillPath(); g.strokePath(); g.lineBetween(0,-11,0,21); }
    else if (type === 'boot') { g.fillRect(-16,-24,27,42); g.fillRect(-16,10,39,14); g.strokeRect(-16,-24,27,42); }
    else { g.beginPath(); g.moveTo(-25,-2); g.lineTo(25,-2); g.lineTo(0,-25); g.closePath(); g.fillPath(); g.strokePath(); g.lineBetween(0,-2,0,23); }
    return g;
  }

  createPlayHud() {
    this.addText('PACKING RUSH', 27, 27, 18, '#f7cf58', true);
    this.addText('✦ PRAIA / DIA QUENTE', 230, 29, 12, '#9fb7e7', true);
    this.timeText = this.addText('TEMPO 45', 715, 27, 16, '#ff827d', true);
    this.scoreText = this.addText('PONTOS 000', 842, 27, 13, '#f7cf58', true).setOrigin(.5);
    this.addText('SETAS: ESCOLHER   ESPAÇO: PEGAR   ENTER: ENTREGAR', 480, 625, 10, '#8392bb').setOrigin(.5);
    this.hintText = this.addText('TOQUE EM UM ITEM OU USE O TECLADO', 478, 548, 12, '#f7e6b2', true).setOrigin(.5);
  }

  bindControls() {
    this.keys = this.input.keyboard.addKeys({ left: 'LEFT', right: 'RIGHT', a: 'A', d: 'D', space: 'SPACE', enter: 'ENTER' });
  }

  update(time, delta) {
    if (this.screen !== 'play' || this.resultOpen) return;
    this.elapsed += delta;
    if (this.elapsed > 1000) {
      this.elapsed -= 1000;
      this.timeLeft -= 1;
      this.timeText.setText(`TEMPO ${String(Math.max(0, this.timeLeft)).padStart(2, '0')}`);
      if (this.timeLeft <= 0) this.deliver();
    }
    if (this.keys?.left.isDown || this.keys?.a.isDown) { this.selected = Math.max(0, this.selected - 1); this.updateSelection(); }
    if (this.keys?.right.isDown || this.keys?.d.isDown) { this.selected = Math.min(ITEMS.length - 1, this.selected + 1); this.updateSelection(); }
    if (Phaser.Input.Keyboard.JustDown(this.keys?.space)) this.packItem(ITEMS[this.selected].id);
    if (Phaser.Input.Keyboard.JustDown(this.keys?.enter)) this.deliver();
    if (Math.floor(time / 300) % 2 === 0) this.itemViews.forEach((view, index) => { if (index === this.selected && !view.getData('packed')) view.y = view.getData('home').y - 3; });
    else this.itemViews.forEach((view) => { if (!view.getData('packed')) view.y = view.getData('home').y; });
  }

  updateSelection() {
    this.itemViews.forEach((view, index) => {
      const bg = view.getData('bg');
      if (view.getData('packed')) bg.setStrokeStyle(3, 0x50c998, 1);
      else if (index === this.selected) bg.setStrokeStyle(4, 0xf7cf58, 1);
      else bg.setStrokeStyle(3, 0x526b9d, 1);
    });
  }

  packItem(id) {
    if (this.resultOpen || this.packed.includes(id)) return;
    if (this.packed.length >= MAX_PACKED) { this.showHint('MALA CHEIA! ENTREGUE OU RECOMECE'); return; }
    const item = ITEMS.find((entry) => entry.id === id);
    const view = this.itemViews.find((entry) => entry.getData('item').id === id);
    if (!view) return;
    this.packed.push(id); view.setData('packed', true); view.disableInteractive();
    const targetX = 382 + this.packed.length * 47;
    const targetY = 385;
    this.tweens.add({ targets: view, x: targetX, y: targetY, duration: 420, ease: 'Back.easeOut' });
    if (item.good) { this.score += 15; this.burst(targetX, targetY, 0x50c998); this.showHint(`${item.name} CERTO! +15`); }
    else { this.score = Math.max(0, this.score - 10); this.burst(targetX, targetY, 0xff6b6b); this.showHint(`${item.name} NÃO COMBINA! -10`); this.shakeCamera(); }
    this.scoreText.setText(`PONTOS ${String(this.score).padStart(3, '0')}`);
    this.updateSelection();
  }

  inSuitcase(x, y) { return x > 350 && x < 630 && y > 320 && y < 450; }

  returnItem(view) {
    const home = view.getData('home');
    this.tweens.add({ targets: view, x: home.x, y: home.y, duration: 220, ease: 'Back.easeOut' });
    this.showHint('ERROU O ALVO! TENTE DE NOVO');
  }

  deliver() {
    if (this.resultOpen) return;
    this.scene.restart({ screen: 'result', result: this.calculateResult() });
  }

  calculateResult() {
    const correct = this.packed.filter((id) => ITEMS.find((item) => item.id === id).good).length;
    const wrong = this.packed.length - correct;
    const missing = ITEMS.filter((item) => item.good && !this.packed.includes(item.id)).length;
    const finalScore = Math.max(0, this.score + (missing === 0 ? 30 : 0) - missing * 5);
    return { correct, wrong, missing, score: finalScore, stars: finalScore >= 95 ? 3 : finalScore >= 55 ? 2 : 1 };
  }

  createResult(result) {
    this.drawPixelBackdrop(0x10172d); this.drawStars();
    this.drawSuitcaseHero(480, 210);
    this.addText('FIM DA RODADA', 480, 330, 25, '#8fb8ff', true).setOrigin(.5);
    this.addText(result.stars === 3 ? 'MALA PERFEITA!' : 'QUASE LÁ!', 480, 370, 34, '#f7cf58', true).setOrigin(.5);
    this.addText('★'.repeat(result.stars) + '☆'.repeat(3 - result.stars), 480, 418, 39, '#f7cf58', true).setOrigin(.5);
    this.addText(`${result.score} PONTOS`, 480, 462, 22, '#f8f0d1', true).setOrigin(.5);
    this.addText(`${result.correct} certos   /   ${result.wrong} errados   /   ${result.missing} faltando`, 480, 496, 13, '#aebdde').setOrigin(.5);
    const again = this.pixelButton(320, 535, 320, 55, 'JOGAR DE NOVO', 0xf7cf58, '#171527', () => this.startGame());
    this.tweens.add({ targets: again, y: 541, duration: 650, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    this.input.keyboard.once('keydown-SPACE', () => this.startGame());
    this.input.keyboard.once('keydown-ENTER', () => this.startGame());
    this.input.once('pointerdown', () => this.startGame());
  }

  pixelButton(x, y, width, height, label, color, textColor, callback) {
    const button = this.add.container(x, y).setDepth(5);
    const bg = this.add.rectangle(0, 0, width, height, color, 1).setOrigin(0).setStrokeStyle(5, 0xfff2ad, 1);
    const shadow = this.add.rectangle(8, 8, width, height, 0x8e5b45, 1).setOrigin(0).setDepth(-1);
    const text = this.addText(label, width / 2, height / 2, 22, textColor, true).setOrigin(.5);
    button.add([shadow, bg, text]); button.setSize(width, height); button.setInteractive(new Phaser.Geom.Rectangle(0, 0, width, height), Phaser.Geom.Rectangle.Contains);
    button.on('pointerover', () => bg.setFillStyle(0xffe17b)); button.on('pointerout', () => bg.setFillStyle(color)); button.on('pointerdown', callback);
    return button;
  }

  addText(text, x, y, size, color, bold = false) {
    return this.add.text(x, y, text, { fontFamily: 'monospace', fontSize: `${size}px`, color, fontStyle: bold ? 'bold' : 'normal', resolution: 2 });
  }

  showHint(text) { if (this.hintText) this.hintText.setText(text); }

  shakeCamera() { this.cameras.main.shake(150, .006); }

  burst(x, y, color) {
    for (let i = 0; i < 8; i += 1) {
      const p = this.add.rectangle(x, y, 6, 6, color, 1).setDepth(40);
      const angle = (Math.PI * 2 * i) / 8;
      this.tweens.add({ targets: p, x: x + Math.cos(angle) * 40, y: y + Math.sin(angle) * 40, alpha: 0, duration: 420, onComplete: () => p.destroy() });
    }
  }
}

const config = {
  type: Phaser.AUTO,
  width: WIDTH,
  height: HEIGHT,
  parent: 'game',
  backgroundColor: '#10172d',
  pixelArt: true,
  antialias: false,
  roundPixels: true,
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  input: { activePointers: 3 },
  scene: [PackingRush]
};

if (window.Phaser) new Phaser.Game(config);
else document.getElementById('game').textContent = 'O motor do jogo não carregou. Atualize a página.';
