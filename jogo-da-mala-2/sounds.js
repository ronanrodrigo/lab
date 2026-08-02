// Gerenciador de Sons
const SoundManager = {
  enabled: true,
  
  // Criar contexto de áudio web usando API de baixo nível
  audioContext: null,
  
  init() {
    // Tenta inicializar contexto de áudio
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioContext = new AudioContext();
      }
    } catch (e) {
      console.log('Web Audio API not available');
    }
  },

  // Sons sintetizados
  play(type = 'click') {
    if (!this.enabled || !this.audioContext) return;

    const ctx = this.audioContext;
    const now = ctx.currentTime;
    
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      gain.gain.setValueAtTime(0.1, now);
      
      switch (type) {
        case 'click':
          osc.frequency.setValueAtTime(800, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
          osc.start(now);
          osc.stop(now + 0.1);
          break;
          
        case 'success':
          osc.frequency.setValueAtTime(600, now);
          osc.frequency.exponentialRampToValueAtTime(800, now + 0.2);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
          osc.start(now);
          osc.stop(now + 0.2);
          break;
          
        case 'error':
          osc.frequency.setValueAtTime(200, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
          osc.start(now);
          osc.stop(now + 0.1);
          break;
          
        case 'reward':
          // Som de recompensa - duas notas
          osc.frequency.setValueAtTime(1000, now);
          osc.frequency.exponentialRampToValueAtTime(1200, now + 0.15);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
          osc.start(now);
          osc.stop(now + 0.15);
          
          const osc2 = ctx.createOscillator();
          const gain2 = ctx.createGain();
          osc2.connect(gain2);
          gain2.connect(ctx.destination);
          osc2.frequency.setValueAtTime(800, now + 0.2);
          osc2.frequency.exponentialRampToValueAtTime(1000, now + 0.35);
          gain2.gain.setValueAtTime(0.1, now + 0.2);
          gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
          osc2.start(now + 0.2);
          osc2.stop(now + 0.35);
          break;
          
        case 'purchase':
          osc.frequency.setValueAtTime(700, now);
          osc.frequency.exponentialRampToValueAtTime(900, now + 0.25);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
          osc.start(now);
          osc.stop(now + 0.25);
          break;
      }
    } catch (e) {
      console.log('Sound play error:', e);
    }
  },

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }
};

// Inicializar no carregamento
SoundManager.init();
