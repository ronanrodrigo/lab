const INDEX_URL = 'https://raw.githubusercontent.com/ronanrodrigo/notes/refs/heads/main/index.json';

const list = document.querySelector('#notes-list');
const search = document.querySelector('#search-input');
const tagList = document.querySelector('#tag-list');
const count = document.querySelector('#notes-count');
const status = document.querySelector('#notes-status');
let notes = [];
let selectedTag = '';

const formatDate = (date) => {
  if (!date) return 'sem data';
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
    .format(new Date(`${date}T12:00:00`))
    .replace('.', '');
};

const titleFromSlug = (slug) => String(slug || 'nota')
  .split('-')
  .map((part) => {
    const upper = part.toUpperCase();
    if (['AI', 'API', 'CLI', 'IA', 'LLM', 'MCP', 'PR', 'RAG', 'SWE', 'URL'].includes(upper)) return upper;
    return part.charAt(0).toUpperCase() + part.slice(1);
  })
  .join(' ');

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const sourceUrl = (path) => `https://github.com/ronanrodrigo/notes/blob/main/${String(path || '').replace(/^\//, '')}`;

function setStatus(message, type = '') {
  status.className = `notes-status ${type}`.trim();
  status.innerHTML = message;
}

function normalizeNotes(data) {
  return data
    .filter((entry) => entry && entry.slug)
    .map((entry) => ({
      date: entry.date || '',
      slug: entry.slug,
      path: entry.path || '',
      title: entry.title || titleFromSlug(entry.slug),
      tags: Array.isArray(entry.tags) ? entry.tags : [],
      description: entry.description || 'Sem descrição disponível.'
    }));
}

function renderTags() {
  const tags = [...new Set(notes.flatMap((note) => note.tags))].sort((a, b) => a.localeCompare(b));
  tagList.innerHTML = [
    `<a class="source-badge" href="${INDEX_URL}" target="_blank" rel="noreferrer">index.json · fonte remota ↗</a>`,
    `<button class="tag-button ${selectedTag === '' ? 'is-active' : ''}" data-tag="">todas</button>`,
    ...tags.map((tag) => `<button class="tag-button ${selectedTag === tag ? 'is-active' : ''}" data-tag="${escapeHtml(tag)}">${escapeHtml(tag)}</button>`)
  ].join('');

  tagList.querySelectorAll('[data-tag]').forEach((button) => {
    button.addEventListener('click', () => {
      selectedTag = button.dataset.tag;
      renderTags();
      renderNotes();
    });
  });
}

function renderNotes() {
  const query = search.value.trim().toLowerCase();
  const filtered = notes.filter((note) => {
    const matchesTag = !selectedTag || note.tags.includes(selectedTag);
    const text = `${note.title} ${note.description} ${note.slug} ${note.path} ${note.tags.join(' ')}`.toLowerCase();
    return matchesTag && text.includes(query);
  });

  count.textContent = `${filtered.length} ${filtered.length === 1 ? 'nota' : 'notas'}`;

  if (!filtered.length) {
    list.innerHTML = '<div class="empty"><strong>Nenhuma nota encontrada.</strong><span>Tente outra busca ou remova o filtro.</span></div>';
    return;
  }

  list.innerHTML = filtered.map((note, index) => `
    <article class="note-card" style="--delay: ${index * 35}ms">
      <div class="note-meta">
        <time datetime="${escapeHtml(note.date)}">${escapeHtml(formatDate(note.date))}</time>
        <span>${String(index + 1).padStart(2, '0')}</span>
      </div>
      <div class="note-body">
        <h2>${escapeHtml(note.title)}</h2>
        <p>${escapeHtml(note.description)}</p>
        <div class="note-tags">
          ${note.tags.map((tag) => `<button class="inline-tag ${selectedTag === tag ? 'is-selected' : ''}" data-tag="${escapeHtml(tag)}">${escapeHtml(tag)}</button>`).join('')}
        </div>
        <div class="note-footer">
          <code>${escapeHtml(note.slug)}</code>
          <a class="source-link" href="${sourceUrl(note.path)}" target="_blank" rel="noreferrer">ver fonte ↗</a>
        </div>
      </div>
    </article>`).join('');

  list.querySelectorAll('.inline-tag').forEach((button) => {
    button.addEventListener('click', () => {
      selectedTag = button.dataset.tag;
      renderTags();
      renderNotes();
    });
  });
}

async function loadNotes() {
  setStatus('<span class="loader" aria-hidden="true"></span>Carregando notas da fonte remota…', 'is-loading');

  try {
    const response = await fetch(INDEX_URL, { cache: 'no-store' });
    if (!response.ok) throw new Error(`index.json indisponível (${response.status})`);
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error('O index.json não contém uma lista válida');

    notes = normalizeNotes(data);
    renderTags();
    renderNotes();
    setStatus(`${notes.length} notas carregadas de index.json.`, 'is-success');
  } catch (error) {
    notes = [];
    count.textContent = '';
    list.innerHTML = '';
    renderTags();
    setStatus('<strong>Não foi possível carregar as notas.</strong><br />A fonte remota pode estar indisponível. Tente novamente mais tarde.', 'is-error');
    console.error(error);
  }
}

search.addEventListener('input', renderNotes);
loadNotes();
