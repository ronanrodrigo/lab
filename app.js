const statusElement = document.querySelector('#projects-status');
const listElement = document.querySelector('#projects-list');
const searchElement = document.querySelector('#project-search');
let projects = [];

function showStatus(message, type = '') {
  statusElement.className = `status-message ${type}`.trim();
  statusElement.innerHTML = message;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function projectCard(project) {
  const tags = Array.isArray(project.tags) ? project.tags : [];
  const tagsMarkup = tags.slice(0, 3).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('');
  const description = project.description || 'Um experimento em construção.';
  const status = project.status || 'experimento';
  return `
    <a class="project-card" href="./${encodeURIComponent(project.slug)}/">
      <div class="card-top">
        <span class="card-icon" aria-hidden="true">✦</span>
        <span class="card-arrow" aria-hidden="true">↗</span>
      </div>
      <div>
        <h3>${escapeHtml(project.name || project.slug)}</h3>
        <p>${escapeHtml(description)}</p>
      </div>
      <div class="card-bottom">
        <div class="tags">${tagsMarkup}</div>
        <span class="project-status">${escapeHtml(status)}</span>
      </div>
    </a>`;
}

function renderProjects() {
  const query = searchElement.value.trim().toLowerCase();
  const filtered = projects.filter((project) => {
    const haystack = [project.name, project.description, ...(project.tags || [])].join(' ').toLowerCase();
    return haystack.includes(query);
  });

  if (!filtered.length) {
    listElement.innerHTML = '';
    showStatus(query
      ? '<span><span class="empty-icon" aria-hidden="true">⌕</span>Nenhum projeto encontrado.</span>'
      : '<span><span class="empty-icon" aria-hidden="true">✦</span><strong>Ainda não há projetos publicados.</strong><br />Novos experimentos aparecerão aqui automaticamente.</span>');
    return;
  }

  statusElement.classList.add('is-hidden');
  listElement.innerHTML = filtered.map(projectCard).join('');
}

async function loadProjects() {
  try {
    const response = await fetch('./projects.json', { cache: 'no-store' });
    if (!response.ok) throw new Error(`Manifesto indisponível (${response.status})`);
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error('Formato de manifesto inválido');
    projects = data;
    renderProjects();
  } catch (error) {
    listElement.innerHTML = '';
    showStatus('<span><strong>Não foi possível carregar os projetos.</strong><br />Tente novamente mais tarde.</span>', 'is-error');
    console.error(error);
  }
}

searchElement.addEventListener('input', renderProjects);
loadProjects();
