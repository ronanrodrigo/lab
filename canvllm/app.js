const STORAGE_KEY = 'canvllm-draft-v1';

const canvasLabels = {
  problem: 'Problema',
  segments: 'Segmentos de clientes',
  value: 'Proposta de valor única',
  solution: 'Solução',
  channels: 'Canais',
  revenue: 'Fontes de receita',
  costs: 'Estrutura de custos',
  metrics: 'Métricas-chave',
  advantage: 'Vantagem injusta'
};

const settingLabels = {
  agentName: 'Nome do agente',
  objective: 'Objetivo principal',
  tone: 'Tom de voz',
  format: 'Formato das respostas',
  constraint: 'Regra extra'
};

const fields = [...document.querySelectorAll('[data-canvas], [data-setting]')];
const promptOutput = document.querySelector('#promptOutput');
const progressLabel = document.querySelector('#progressLabel');
const progressBar = document.querySelector('#progressBar');
const saveStatus = document.querySelector('#saveStatus');
const promptBadge = document.querySelector('#promptBadge');
const copyFeedback = document.querySelector('#copyFeedback');

function readState() {
  const state = { canvas: {}, settings: {} };
  fields.forEach((field) => {
    const group = field.dataset.canvas ? 'canvas' : 'settings';
    const key = field.dataset.canvas || field.dataset.setting;
    state[group][key] = field.value.trim();
  });
  return state;
}

function applyState(state) {
  fields.forEach((field) => {
    const group = field.dataset.canvas ? 'canvas' : 'settings';
    const key = field.dataset.canvas || field.dataset.setting;
    if (state?.[group]?.[key]) field.value = state[group][key];
  });
}

function filledEntries(values, labels) {
  return Object.entries(values)
    .filter(([, value]) => value)
    .map(([key, value]) => `- ${labels[key]}: ${value}`);
}

function buildPrompt(state) {
  const canvasLines = filledEntries(state.canvas, canvasLabels);
  const settingLines = filledEntries(state.settings, settingLabels);
  const agentName = state.settings.agentName || 'agente de validação';
  const objective = state.settings.objective || 'me ajudar a analisar e validar a ideia de negócio';
  const lines = [
    `Você é ${agentName}, um agente de apoio à validação de ideias.`,
    '',
    `Seu objetivo é ${objective}.`,
    'Use o contexto abaixo como hipótese de trabalho, não como verdade absoluta.',
    '',
    '## Lean Canvas',
    ...(canvasLines.length ? canvasLines : ['- Ainda não há blocos preenchidos. Faça perguntas para começar pelo problema.']),
    '',
    '## Como conduzir a conversa',
    `- Responda em tom ${state.settings.tone || 'claro, prático e questionador'}.`,
    `- Organize suas respostas como ${state.settings.format || 'análises curtas com próximos passos'}.`,
    '- Identifique premissas, riscos e lacunas antes de sugerir soluções.',
    '- Faça no máximo três perguntas por vez e explique por que cada uma importa.',
    '- Priorize experimentos simples, baratos e que possam gerar aprendizado real.',
    ...(state.settings.constraint ? [`- Regra adicional: ${state.settings.constraint}`] : []),
    '',
    'Comece resumindo o que entendeu da ideia em até cinco linhas e depois indique a hipótese mais arriscada para validar primeiro.'
  ];

  return { text: lines.join('\n'), hasContent: canvasLines.length > 0 || settingLines.length > 0 };
}

function update() {
  const state = readState();
  const filledCanvas = Object.values(state.canvas).filter(Boolean).length;
  const prompt = buildPrompt(state);
  promptOutput.textContent = prompt.text;
  promptOutput.classList.toggle('is-empty', !prompt.hasContent);
  progressLabel.textContent = `${filledCanvas} de 9 blocos`;
  progressBar.style.width = `${(filledCanvas / 9) * 100}%`;
  promptBadge.textContent = prompt.hasContent ? 'em construção' : 'rascunho';
  saveStatus.textContent = prompt.hasContent ? 'salvo neste navegador' : 'rascunho vazio';
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function restore() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved) applyState(saved);
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
  update();
}

fields.forEach((field) => field.addEventListener('input', update));
fields.filter((field) => field.tagName === 'SELECT').forEach((field) => field.addEventListener('change', update));

document.querySelector('#clearButton').addEventListener('click', () => {
  fields.forEach((field) => { field.value = ''; });
  localStorage.removeItem(STORAGE_KEY);
  copyFeedback.textContent = '';
  update();
  fields[0].focus();
});

document.querySelector('#copyButton').addEventListener('click', async () => {
  const text = promptOutput.textContent;
  try {
    await navigator.clipboard.writeText(text);
    copyFeedback.textContent = 'Prompt copiado.';
  } catch (error) {
    promptOutput.focus();
    copyFeedback.textContent = 'Selecione e copie o texto manualmente.';
  }
  window.setTimeout(() => { copyFeedback.textContent = ''; }, 3200);
});

restore();
