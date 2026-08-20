const form = document.querySelector('#generator-form');
const resourceInput = document.querySelector('#resource');
const propertiesInput = document.querySelector('#properties');
const command = document.querySelector('#command');
const runButton = document.querySelector('#run-generator');
const runMessage = document.querySelector('#run-message');
const outputState = document.querySelector('#output-state');
const emptyState = document.querySelector('#empty-state');
const loadingState = document.querySelector('#loading-state');
const resultState = document.querySelector('#result-state');
const errorState = document.querySelector('#error-state');
const fileList = document.querySelector('#file-list');
const resultTitle = document.querySelector('#result-title');
const copyButton = document.querySelector('#copy-command');
const tools = document.querySelectorAll('.tool');

const clean = (value) => value.trim().toLowerCase().replace(/\s+/g, '-');
const validResource = (value) => /^[a-z][a-z0-9-]*$/.test(value);

function updateCommand() {
  const resource = clean(resourceInput.value) || 'catalog';
  const properties = propertiesInput.value.trim() || 'id:string title:string price:number';
  command.textContent = `npx tsx scripts/generate-boilerplate.ts resource ${resource} ${properties}`;
}

function showState(state) {
  emptyState.hidden = state !== 'empty';
  loadingState.hidden = state !== 'loading';
  resultState.hidden = state !== 'result';
  errorState.hidden = state !== 'error';
  outputState.textContent = state === 'result' ? 'gerado' : state === 'loading' ? 'gerando' : state === 'error' ? 'revisar' : 'aguardando';
  outputState.classList.toggle('is-ready', state === 'result');
}

function populateFiles(resource) {
  const title = resource.replace(/(^|-)\w/g, (letter) => letter.toUpperCase());
  const files = [
    [`src/domain/${resource}.ts`, 'entidade'],
    [`src/domain/${resource}.test.ts`, 'regra'],
    [`src/application/gateways/${resource}-gateway.ts`, 'contrato'],
    [`src/application/services/create-${resource}-service.ts`, 'caso de uso'],
    [`src/infrastructure/sample/in-memory-${resource}-gateway.ts`, 'amostra'],
    [`src/interface-adapters/http/${resource}-controller.ts`, 'entrada'],
  ];
  fileList.replaceChildren(...files.map(([path, role]) => {
    const item = document.createElement('li');
    const name = document.createElement('span');
    const label = document.createElement('small');
    name.textContent = path;
    label.textContent = role;
    item.append(name, label);
    return item;
  }));
  resultTitle.textContent = `${title} preparado`;
}

resourceInput.addEventListener('input', updateCommand);
propertiesInput.addEventListener('input', updateCommand);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const resource = clean(resourceInput.value);
  if (!validResource(resource)) {
    showState('error');
    runMessage.textContent = 'Revise o nome do recurso antes de gerar.';
    resourceInput.focus();
    return;
  }
  resourceInput.value = resource;
  updateCommand();
  showState('loading');
  runButton.disabled = true;
  runButton.textContent = 'Gerando…';
  runMessage.textContent = 'Aplicando as fronteiras da skill à sua intenção.';
  window.setTimeout(() => {
    populateFiles(resource);
    showState('result');
    runButton.disabled = false;
    runButton.innerHTML = 'Gerar novamente <span aria-hidden="true">→</span>';
    runMessage.textContent = 'Estrutura simulada com sucesso. Nada foi escrito no disco.';
  }, 720);
});

copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(command.textContent);
    copyButton.textContent = 'Copiado';
  } catch {
    copyButton.textContent = 'Selecione o texto';
  }
  window.setTimeout(() => { copyButton.textContent = 'Copiar'; }, 1600);
});

tools.forEach((tool) => tool.addEventListener('click', () => {
  tools.forEach((item) => { item.classList.toggle('is-selected', item === tool); item.setAttribute('aria-pressed', String(item === tool)); });
  if (tool.dataset.tool !== 'resource') {
    runMessage.textContent = 'Este MVP detalha o gerador de recursos. Os demais recursos serão explorados em seguida.';
  } else {
    runMessage.textContent = 'A simulação preserva os arquivos existentes.';
  }
}));

updateCommand();
