const notes = [
  { slug: 'ai-skills', date: '2026-07-27', title: 'AI Skills: 10 competências essenciais para 2026', tags: ['ai-skills', 'prompt-engineering', 'automation'], summary: 'Um framework progressivo que vai de prompt engineering e agentes de IA a RAG, multimodalidade, geração de conteúdo e gestão de LLMs.' },
  { slug: 'markitdown-documentos-markdown', date: '2026-07-27', title: 'MarkItDown — convertendo documentos para Markdown', tags: ['markitdown', 'microsoft', 'markdown', 'ia'], summary: 'Como converter PDFs, documentos, planilhas, apresentações e outros formatos para Markdown, reduzindo o custo de contexto em fluxos com LLMs.' },
  { slug: 'sites-de-empregos-remotos', date: '2026-07-27', title: 'Sites de empregos remotos', tags: ['trabalho-remoto', 'carreira', 'job-boards'], summary: 'Curadoria de plataformas para encontrar vagas remotas, freelancing e oportunidades de trabalho distribuído.' },
  { slug: 'agentes-ia-pesquisa-automacao', date: '2026-07-26', title: 'Agentes IA de pesquisa e automação web', tags: ['agents', 'automation', 'web-scraping'], summary: 'GPT Researcher e Skyvern como referências para pesquisa autônoma, automação de navegador e execução de fluxos web.' },
  { slug: 'ferramentas-plugins-skills-claude', date: '2026-07-26', title: 'Ferramentas, plugins e skills do Claude', tags: ['claude', 'mcp', 'tools', 'skills'], summary: 'Um mapa de MCP servers, skills, plugins e conectores para ampliar as capacidades de assistentes de IA.' },
  { slug: 'hermes-agente-ia-open-source', date: '2026-07-26', title: 'Hermes Agent IA open source', tags: ['opensource', 'agents', 'ia'], summary: 'Agente autônomo da Nous Research com foco em execução real de tarefas, memória persistente e integração com múltiplos canais.' },
  { slug: 'melhores-ferramentas-ia-2026', date: '2026-07-26', title: 'Melhores ferramentas de IA em 2026', tags: ['ia', 'ferramentas', 'produtividade'], summary: 'Panorama de ferramentas para pesquisa, imagem, vídeo, programação, design, automação, análise e criação de conteúdo.' },
  { slug: 'youtube-prompts-estrategia-canal', date: '2026-07-26', title: 'YouTube: prompts e estratégia para crescimento de canal', tags: ['youtube', 'prompts', 'marketing'], summary: 'Ideias de especialistas, roteiros e prompts para pesquisa de conteúdo, títulos, thumbnails, retenção e planejamento de 90 dias.' },
  { slug: 'ferramentas-ia-open-source', date: '2026-07-25', title: 'Ferramentas de IA open source', tags: ['opensource', 'ia', 'tools'], summary: 'Uma seleção de projetos abertos para agentes GUI, reuniões privadas locais e testes de segurança com IA.' },
  { slug: 'omniroute-gateway-ia', date: '2026-07-25', title: 'OmniRoute — gateway de IA', tags: ['gateway', 'ia', 'opensource', 'llm'], summary: 'Gateway open source que centraliza provedores de IA em um endpoint e oferece fallback entre modelos.' },
  { slug: 'ferramentas-claude-avancadas', date: '2026-07-24', title: 'Ferramentas Claude avançadas', tags: ['claude', 'tools', 'notebooklm', 'rag'], summary: 'NotebookLM-py, Graphify e outras ferramentas para transformar documentos, codebases e mídias em conhecimento consultável.' },
  { slug: 'colibri-motor-local-ia', date: '2026-07-24', title: 'Colibri — motor local de IA', tags: ['localhost', 'rust', 'llm', 'opensource'], summary: 'Referências sobre inferência local de modelos MoE grandes usando streaming seletivo e pouca memória.' },
  { slug: 'agents-oficiais-criacao', date: '2026-07-23', title: 'AGENTS.md — instruções oficiais de criação', tags: ['agents', 'github', 'ia', 'documentation'], summary: 'Estrutura recomendada para arquivos AGENTS.md: contexto, stack, comandos, estrutura, limites e convenções de um repositório.' },
  { slug: 'como-criar-agents', date: '2026-07-23', title: 'Como criar um arquivo Agents.md', tags: ['agents', 'github', 'ia', 'documentation'], summary: 'Padrões observados em arquivos de instrução usados por GitHub Copilot, Codex, Claude Code, Cursor e outros agentes.' },
  { slug: 'repos-ia-github-trending', date: '2026-07-23', title: 'Repositórios de IA em destaque no GitHub', tags: ['github', 'trending', 'opensource'], summary: 'Referências de projetos open source para compressão de contexto, skills, OCR, memória de codebase, analytics e inferência.' },
  { slug: 'self-host-ia-coolify-agentes-rag', date: '2026-07-23', title: 'Self-host de IA: Coolify, agentes e RAG', tags: ['selfhost', 'deployment', 'agents', 'rag'], summary: 'Ferramentas para hospedar aplicações, agentes, interfaces de LLM, crawlers e pipelines RAG por conta própria.' },
  { slug: 'trilhas-cursos-ia', date: '2026-07-23', title: 'Trilhas e cursos de IA', tags: ['learning', 'courses', 'ia', 'education'], summary: 'Cursos e trilhas práticas para desenvolver fluência em IA, prompt engineering, APIs, agentes e automação.' },
  { slug: 'turbovec-turboquant', date: '2026-07-23', title: 'Turbovec: índice vetorial Rust com TurboQuant', tags: ['vectordb', 'rust', 'compression', 'rag'], summary: 'Um índice vetorial em Rust com bindings Python e compressão agressiva para buscas e aplicações RAG.' },
  { slug: 'pr-visual', date: '2026-06-29', title: 'PR Visual Evidence', tags: ['github', 'pr', 'testing', 'documentation'], summary: 'Fluxo para registrar evidências visuais de pull requests com Maestro sem adicionar binários ao repositório.' },
  { slug: 'wellhub', date: '2026-06-26', title: 'Wellhub requests', tags: ['wellhub', 'api', 'fitness', 'graphql'], summary: 'Anotações de integração com os endpoints de identidade e check-in do Wellhub.' },
  { slug: 'ciclo-criado-pela-ia', date: '2026-05-28', title: 'O ciclo criado pela IA', tags: ['ia', 'productivity', 'workplace', 'society'], summary: 'O paradoxo de produtividade: a IA acelera tarefas, mas também eleva expectativas, amplia escopo e pode aumentar a densidade do trabalho.' }
];

const list = document.querySelector('#notes-list');
const search = document.querySelector('#search-input');
const tagList = document.querySelector('#tag-list');
const count = document.querySelector('#notes-count');
let selectedTag = '';

const formatDate = (date) => new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(`${date}T12:00:00`)).replace('.', '');
const escapeHtml = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');

function renderTags() {
  const tags = [...new Set(notes.flatMap((note) => note.tags))].sort();
  tagList.innerHTML = [`<button class="tag-button ${selectedTag === '' ? 'is-active' : ''}" data-tag="">todas</button>`, ...tags.map((tag) => `<button class="tag-button ${selectedTag === tag ? 'is-active' : ''}" data-tag="${escapeHtml(tag)}">${escapeHtml(tag)}</button>`)].join('');
  tagList.querySelectorAll('[data-tag]').forEach((button) => button.addEventListener('click', () => { selectedTag = button.dataset.tag; renderTags(); renderNotes(); }));
}

function renderNotes() {
  const query = search.value.trim().toLowerCase();
  const filtered = notes.filter((note) => {
    const matchesTag = !selectedTag || note.tags.includes(selectedTag);
    const text = `${note.title} ${note.summary} ${note.tags.join(' ')}`.toLowerCase();
    return matchesTag && text.includes(query);
  });
  count.textContent = `${filtered.length} ${filtered.length === 1 ? 'nota' : 'notas'}`;
  if (!filtered.length) {
    list.innerHTML = '<div class="empty"><strong>Nenhuma nota encontrada.</strong><span>Tente outra busca ou remova o filtro.</span></div>';
    return;
  }
  list.innerHTML = filtered.map((note, index) => `
    <article class="note-card" style="--delay: ${index * 35}ms">
      <div class="note-meta"><time datetime="${note.date}">${formatDate(note.date)}</time><span>${String(index + 1).padStart(2, '0')}</span></div>
      <div class="note-body"><h2>${escapeHtml(note.title)}</h2><p>${escapeHtml(note.summary)}</p><div class="note-tags">${note.tags.map((tag) => `<button class="inline-tag" data-tag="${escapeHtml(tag)}">${escapeHtml(tag)}</button>`).join('')}</div></div>
    </article>`).join('');
  list.querySelectorAll('.inline-tag').forEach((button) => button.addEventListener('click', () => { selectedTag = button.dataset.tag; renderTags(); renderNotes(); }));
}

search.addEventListener('input', renderNotes);
renderTags();
renderNotes();
