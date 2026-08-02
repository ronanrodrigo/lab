// Dados do jogo

const AVATARS = {
  girl: {
    id: 'girl',
    name: 'Menina com Laço',
    emoji: '👧',
    color: '#FFB6D9'
  },
  boy: {
    id: 'boy',
    name: 'Menino com Chapéu',
    emoji: '👦',
    color: '#A8D8EA'
  },
  neutral: {
    id: 'neutral',
    name: 'Criança com Avental',
    emoji: '🧒',
    color: '#D4B6E8'
  }
};

const CLIENTS = [
  {
    id: 'mila',
    name: 'Mila',
    emoji: '👧',
    role: 'Menina aventureira',
    destination: 'Praia',
    season: 'Verão',
    weather: 'Quente e ensolarado',
    preferences: ['azul', 'amarelo', 'laranja'],
    preferenceText: 'cores vibrantes',
    message: 'Vou para a praia! Preciso levar roupas leves e coloridas. Faz muito calor!',
    minimumItems: ['roupa-verão', 'acessório', 'extra'],
    happyReaction: 'Perfeito! Vou arrebentar na praia! 🏖️',
    okReaction: 'Tá bom! Acho que funciona para a praia.',
    sadReaction: 'Acho que fiz uma mala estranha para a praia...'
  },
  {
    id: 'joao',
    name: 'João',
    emoji: '👦',
    role: 'Menino montanhês',
    destination: 'Montanha',
    season: 'Inverno',
    weather: 'Frio e seco',
    preferences: ['marrom', 'vermelho', 'laranja'],
    preferenceText: 'cores quentes',
    message: 'Vou escalar uma montanha no inverno! Preciso de roupas quentes e confortáveis!',
    minimumItems: ['roupa-inverno', 'acessório', 'extra'],
    happyReaction: 'Maravilha! Vou ficar quentinho na montanha! ❄️',
    okReaction: 'Tudo bem, deve dar conta da montanha.',
    sadReaction: 'Acho que vou congelar nessa mala...'
  },
  {
    id: 'rosa',
    name: 'Avó Rosa',
    emoji: '👵',
    role: 'Avó sorridente',
    destination: 'Interior',
    season: 'Primavera',
    weather: 'Morno e variável',
    preferences: ['tons-suaves', 'conforto'],
    preferenceText: 'conforto e tons suaves',
    message: 'Vou visitar a família no interior! Preciso de algo confortável e quentinho.',
    minimumItems: ['roupa-variável', 'acessório', 'extra'],
    happyReaction: 'Que mala confortável! Vou ficar cozy na visita! 💕',
    okReaction: 'Bom, serve para a viagem.',
    sadReaction: 'Não ficou muito confortável, não...'
  },
  {
    id: 'luca',
    name: 'Luca',
    emoji: '👦',
    role: 'Menino explorador',
    destination: 'Praia e Cidade',
    season: 'Outono',
    weather: 'Variável',
    preferences: ['praticidade', 'tons-neutros'],
    preferenceText: 'praticidade e tons neutros',
    message: 'Vou viajar para praia e depois para a cidade! Preciso de algo versátil!',
    minimumItems: ['roupa-verão', 'acessório', 'extra'],
    happyReaction: 'Perfeito para a aventura! Vou explorar tudo! 🗺️',
    okReaction: 'Acho que dá para a viagem.',
    sadReaction: 'Acho que essa mala não funciona para tudo...'
  },
  {
    id: 'sofia',
    name: 'Sofia',
    emoji: '👧',
    role: 'Menina criativa',
    destination: 'Cidade',
    season: 'Verão',
    weather: 'Quente e urbano',
    preferences: ['cores-pastel', 'estilo-fofo'],
    preferenceText: 'cores pastel e acessórios coloridos',
    message: 'Vou para a cidade conhecer museus! Quero algo fofo e bonito!',
    minimumItems: ['roupa-verão', 'acessório', 'extra'],
    happyReaction: 'Adorei! Ficou bem urbano e fofo! 🎨',
    okReaction: 'Tá bom, serve para a cidade.',
    sadReaction: 'Achei que seria mais criativo...'
  }
];

const ITEMS = {
  'summer-clothes': [
    { id: 'blue-tshirt', name: 'Camiseta Azul', emoji: '👕', category: 'summer-clothes' },
    { id: 'pink-tshirt', name: 'Camiseta Rosa', emoji: '👕', category: 'summer-clothes' },
    { id: 'yellow-shorts', name: 'Shorts Amarelo', emoji: '🩳', category: 'summer-clothes' },
    { id: 'blue-shorts', name: 'Shorts Azul', emoji: '🩳', category: 'summer-clothes' },
    { id: 'floral-dress', name: 'Vestido Floral', emoji: '👗', category: 'summer-clothes' },
    { id: 'swimsuit', name: 'Maiô Rosa', emoji: '🩱', category: 'summer-clothes' },
    { id: 'flip-flops', name: 'Chinelos Coloridos', emoji: '👡', category: 'summer-clothes' }
  ],
  'winter-clothes': [
    { id: 'orange-sweater', name: 'Suéter Laranja', emoji: '🧶', category: 'winter-clothes' },
    { id: 'blue-sweater', name: 'Suéter Azul', emoji: '🧶', category: 'winter-clothes' },
    { id: 'gray-pants', name: 'Calça Cinza', emoji: '👖', category: 'winter-clothes' },
    { id: 'blue-pants', name: 'Calça Azul', emoji: '👖', category: 'winter-clothes' },
    { id: 'pink-jacket', name: 'Jaqueta Rosa', emoji: '🧥', category: 'winter-clothes' },
    { id: 'brown-jacket', name: 'Jaqueta Marrom', emoji: '🧥', category: 'winter-clothes' },
    { id: 'brown-boots', name: 'Botas Marrons', emoji: '👢', category: 'winter-clothes' },
    { id: 'orange-beanie', name: 'Gorro Laranja', emoji: '🧢', category: 'winter-clothes' },
    { id: 'purple-gloves', name: 'Luvas Roxas', emoji: '🧤', category: 'winter-clothes' },
    { id: 'thick-socks', name: 'Meias Grossas', emoji: '🧦', category: 'winter-clothes' }
  ],
  'accessories': [
    { id: 'sunglasses', name: 'Óculos de Sol', emoji: '🕶️', category: 'accessories' },
    { id: 'beach-hat', name: 'Chapéu de Praia', emoji: '👒', category: 'accessories' },
    { id: 'scarf', name: 'Lenço', emoji: '🧣', category: 'accessories' },
    { id: 'small-bag', name: 'Bolsa Pequena', emoji: '👜', category: 'accessories' },
    { id: 'backpack', name: 'Mochila Colorida', emoji: '🎒', category: 'accessories' },
    { id: 'comfortable-shoe', name: 'Sapato Confortável', emoji: '👟', category: 'accessories' },
    { id: 'cardigan', name: 'Cardigan', emoji: '🧥', category: 'accessories' },
    { id: 'light-jacket', name: 'Jaqueta Leve', emoji: '🧥', category: 'accessories' },
    { id: 'umbrella', name: 'Guarda-chuva', emoji: '☂️', category: 'accessories' }
  ],
  'extras': [
    { id: 'travel-guide', name: 'Guia de Viagem', emoji: '🗺️', category: 'extras', bonus: 15 },
    { id: 'perfume', name: 'Perfume Floral', emoji: '💐', category: 'extras', bonus: 10 },
    { id: 'luggage-protector', name: 'Protetor de Mala', emoji: '🛡️', category: 'extras', bonus: 10 },
    { id: 'luggage-id', name: 'Identificador de Mala', emoji: '🏷️', category: 'extras', bonus: 5 },
    { id: 'animal-keychain', name: 'Chaveiro Animal', emoji: '🐢', category: 'extras', bonus: 5 },
    { id: 'toiletries', name: 'Necessaire Colorida', emoji: '💄', category: 'extras', bonus: 8 }
  ]
};

const LUGGAGES = [
  {
    id: 'red-luggage',
    name: 'Mala Vermelha',
    emoji: '🧳',
    color: '#FF6B6B',
    condition: 'novo',
    conditionText: 'Nova'
  },
  {
    id: 'blue-luggage',
    name: 'Mala Azul',
    emoji: '🧳',
    color: '#4A90E2',
    condition: 'usado',
    conditionText: 'Usado'
  },
  {
    id: 'pink-luggage',
    name: 'Mala Rosa',
    emoji: '🧳',
    color: '#FFB6D9',
    condition: 'novo',
    conditionText: 'Nova'
  },
  {
    id: 'yellow-luggage',
    name: 'Mala Amarela',
    emoji: '🧳',
    color: '#FFF4B0',
    condition: 'arranhado',
    conditionText: 'Arranhada'
  },
  {
    id: 'green-luggage',
    name: 'Mala Verde',
    emoji: '🧳',
    color: '#B4E8D0',
    condition: 'quebrado',
    conditionText: 'Quebrada'
  }
];

const SHOP_ITEMS = [
  {
    id: 'shop-luggage-1',
    name: 'Mala Premium',
    description: 'Uma mala resistente',
    emoji: '🧳',
    price: 50,
    type: 'luggage'
  },
  {
    id: 'shop-repair-kit',
    name: 'Kit Conserto',
    description: 'Ferramentas de reparo',
    emoji: '🔧',
    price: 30,
    type: 'item'
  },
  {
    id: 'shop-stickers',
    name: 'Adesivos Legais',
    description: 'Para decorar a mala',
    emoji: '✨',
    price: 20,
    type: 'item'
  },
  {
    id: 'shop-organizer',
    name: 'Organizador',
    description: 'Para arrumar a mala',
    emoji: '📦',
    price: 25,
    type: 'item'
  },
  {
    id: 'shop-tags',
    name: 'Etiquetas Bonitas',
    description: 'Para identificar',
    emoji: '🏷️',
    price: 15,
    type: 'item'
  },
  {
    id: 'shop-lock',
    name: 'Cadeado Mágico',
    description: 'Segurança na viagem',
    emoji: '🔒',
    price: 35,
    type: 'item'
  }
];

const COLORS = [
  { id: 'red', name: 'Vermelho', hex: '#FF6B6B' },
  { id: 'blue', name: 'Azul', hex: '#4A90E2' },
  { id: 'pink', name: 'Rosa', hex: '#FFB6D9' },
  { id: 'yellow', name: 'Amarelo', hex: '#FFF4B0' },
  { id: 'green', name: 'Verde', hex: '#B4E8D0' },
  { id: 'purple', name: 'Roxo', hex: '#D4B6E8' }
];

const STICKERS = [
  { id: 'star', emoji: '⭐', name: 'Estrela' },
  { id: 'heart', emoji: '❤️', name: 'Coração' },
  { id: 'sun', emoji: '☀️', name: 'Sol' },
  { id: 'moon', emoji: '🌙', name: 'Lua' },
  { id: 'cloud', emoji: '☁️', name: 'Nuvem' },
  { id: 'flower', emoji: '🌸', name: 'Flor' }
];

const REPAIR_ACTIONS = [
  { id: 'sew', name: 'Costurar', emoji: '🪡' },
  { id: 'clean', name: 'Limpar', emoji: '🧹' },
  { id: 'polish', name: 'Polir', emoji: '✨' },
  { id: 'paint', name: 'Pintar', emoji: '🎨' },
  { id: 'shine', name: 'Dar Brilho', emoji: '💫' }
];

// Pontuação
const SCORING = {
  basePoints: 10,
  preferenceBonus: 5,
  travelGuideBonus: 15,
  perfumeBonus: 10,
  protectorBonus: 10,
  idBonus: 5,
  wrongItemPenalty: -5
};

const STARS_THRESHOLDS = {
  one: 0,
  two: 41,
  three: 71
};

const REWARDS = {
  one: 20,
  two: 35,
  three: 75
};
