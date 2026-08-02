// Inicialização do Jogo
let game;

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar gerenciadores
  SoundManager.init();
  
  // Criar e iniciar jogo
  game = new Game();
  game.init();
  
  // Log para debug
  console.log('Malinha Mágica initialized');
});

// Suporte para redimensionamento da janela
window.addEventListener('resize', () => {
  if (game) {
    game.render();
  }
});
