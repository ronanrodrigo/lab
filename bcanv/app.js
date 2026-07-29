const STORAGE_KEY = 'bcanv-draft-v2';

const blockLabels = {
  partners: 'Parcerias-chave',
  activities: 'Atividades-chave',
  resources: 'Recursos-chave',
  value: 'Proposta de valor',
  relationships: 'Relacionamento com clientes',
  channels: 'Canais',
  segments: 'Segmentos de clientes',
  costs: 'Estrutura de custos',
  revenue: 'Fontes de receita'
};

const exampleState = {
  partners: 'Fornecedores locais\nCriadores de conteúdo\nPlataforma de pagamentos',
  activities: 'Curadoria de produtos\nProdução de conteúdo\nAtendimento ao cliente',
  resources: 'Catálogo digital\nMarca confiável\nEquipe de curadoria',
  value: 'Descoberta simples de produtos locais e autorais para presentear com significado.',
  relationships: 'Conteúdo educativo\nAtendimento próximo\nComunidade de clientes',
  channels: 'Instagram e TikTok\nLoja online\nFeiras e eventos locais',
  segments: 'Pessoas que buscam presentes autorais\nPequenas empresas comprando kits\nProdutores independentes',
  costs: 'Compra e armazenamento\nEmbalagem e frete\nMarketing e ferramentas digitais',
  revenue: 'Venda de produtos\nKits temáticos\nComissão sobre produtos parceiros'
};

const fields = [...document.querySelectorAll('[data-block-input]')];
const completionCount = document.querySelector('#completionCount');
const completionBar = document.querySelector('#completionBar');
const saveStatus = document.querySelector('#saveStatus');
const reviewDot = document.querySelector('#reviewDot');
const reviewTitle = document.querySelector('#reviewTitleText');
const reviewText = document.querySelector('#reviewText');
const reviewList = document.querySelector('#reviewList');
const promptOutput = document.querySelector('#promptOutput');
const promptState = document.querySelector('#promptState');
const copyFeedback = document.querySelector('#copyFeedback');
const clone = (state) => JSON.parse(JSON.stringify(state));

function readState() {
  return Object.fromEntries(fields.map((field) => [field.dataset.blockInput, field.value.trim()]));
}

function applyState(state) {
  fields.forEach((field) => {
    field.value = state?.[field.dataset.blockInput] || '';
  });
}

function updateCount(key, value) {
  const count = value.split('\n').map((line) => line.trim()).filter(Boolean).length;
  const element = document.querySelector(`[data-count="${key}"]`);
  element.textContent = `${count} ${count === 1 ? 'ideia' : 'ideias'}`;
}

function updateReview(state, filled) {
  const missing = Object.keys(blockLabels).filter((key) => !state[key]);
  reviewList.innerHTML = '';
  missing.slice(0, 4).forEach((key) => {
    const tag = document.createElement('span');
    tag.textContent = blockLabels[key];
    reviewList.appendChild(tag);
  });

  if (filled === 0) {
    reviewTitle.textContent = 'Seu canvas está esperando';
    reviewText.textContent = 'Comece pela proposta de valor ou pelo segmento de clientes. Não precisa preencher tudo de uma vez.';
    reviewDot.style.background = 'var(--lime)';
  } else if (filled < 5) {
    reviewTitle.textContent = 'A ideia está tomando forma';
    reviewText.textContent = 'Você já começou. Complete os blocos que conectam valor, cliente e operação para enxergar o modelo com mais clareza.';
    reviewDot.style.background = 'var(--yellow)';
  } else if (missing.length) {
    reviewTitle.textContent = 'Quase lá';
    reviewText.textContent = 'Seu modelo já tem boas conexões. Revise os blocos restantes e procure evidências para as hipóteses mais importantes.';
    reviewDot.style.background = 'var(--yellow)';
  } else {
    reviewTitle.textContent = 'Canvas completo';
    reviewText.textContent = 'Agora revise as conexões: cada custo deve fazer sentido para a proposta e cada receita deve estar ligada a um cliente.';
    reviewDot.style.background = 'var(--mint)';
  }
}

function buildPrompt(state) {
  const filled = Object.entries(state).filter(([, value]) => value);
  const canvas = filled.length
    ? filled.map(([key, value]) => `### ${blockLabels[key]}\n${value}`).join('\n\n')
    : 'O canvas ainda está vazio. Faça perguntas para começar pela proposta de valor e pelos segmentos de clientes.';

  return [
    'Atue como um consultor de modelos de negócio e validação de ideias.',
    '',
    'Quero analisar o Business Model Canvas abaixo. Trate as informações como hipóteses, identifique incoerências e não invente dados que não foram fornecidos.',
    '',
    '## Meu Business Model Canvas',
    canvas,
    '',
    '## Sua tarefa',
    '1. Resuma o modelo de negócio em até cinco linhas.',
    '2. Explique como a proposta de valor se conecta aos segmentos, canais, relacionamento e receitas.',
    '3. Aponte as três hipóteses mais arriscadas ou frágeis.',
    '4. Liste as informações ausentes que impedem uma análise melhor.',
    '5. Sugira até cinco experimentos simples e baratos para validar essas hipóteses com clientes reais.',
    '6. Recomende os próximos passos, priorizados por impacto e esforço.',
    '',
    'Responda em português do Brasil, com linguagem clara, prática e objetiva. Separe fatos informados, hipóteses e recomendações.'
  ].join('\n');
}

function updatePrompt(state, filled) {
  promptOutput.textContent = buildPrompt(state);
  promptOutput.classList.toggle('is-empty', filled === 0);
  promptState.textContent = filled ? 'pronto para copiar' : 'rascunho';
}

function update() {
  const state = readState();
  const filled = Object.values(state).filter(Boolean).length;
  const percentage = Math.round((filled / fields.length) * 100);
  completionCount.textContent = `${percentage}%`;
  completionBar.style.width = `${percentage}%`;
  saveStatus.textContent = filled ? 'salvo neste navegador' : 'canvas vazio';
  fields.forEach((field) => updateCount(field.dataset.blockInput, field.value));
  updateReview(state, filled);
  updatePrompt(state, filled);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function restore() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    applyState(saved || {});
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
    applyState({});
  }
  update();
}

document.querySelector('#exampleButton').addEventListener('click', () => {
  applyState(clone(exampleState));
  update();
  saveStatus.textContent = 'exemplo carregado';
  document.querySelector('[data-block-input="value"]').focus();
});

document.querySelector('#clearButton').addEventListener('click', () => {
  applyState({});
  localStorage.removeItem(STORAGE_KEY);
  copyFeedback.textContent = '';
  update();
  fields[0].focus();
});

document.querySelector('#copyPromptButton').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(promptOutput.textContent);
    copyFeedback.textContent = 'Prompt copiado.';
  } catch (error) {
    copyFeedback.textContent = 'Não foi possível copiar automaticamente. Selecione o texto e copie manualmente.';
  }
  window.setTimeout(() => { copyFeedback.textContent = ''; }, 3500);
});

fields.forEach((field) => field.addEventListener('input', update));
restore();
