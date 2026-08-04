const IDEAS = [
  {
    id: 1,
    title: "Agentes Autônomos para Atendimento em Tempo Real",
    description: "Agentes IA que interagem com compradores durante a transmissão ao vivo, respondendo perguntas sobre produtos sem intervenção humana.",
    tags: ["agentes", "nlp"],
    fullContent: `
      <h2>1️⃣ Agentes Autônomos para Atendimento em Tempo Real</h2>
      <h4>Descrição</h4>
      <p>Agentes IA que interagem com compradores durante a transmissão ao vivo, respondendo perguntas sobre produtos sem intervenção humana.</p>
      
      <h4>Aplicação de IA</h4>
      <p>Implementar agentes autônomos similares ao Hermes Agent com memória persistente que aprendem preferências dos clientes ao longo das sessões.</p>
      
      <h4>Benefícios</h4>
      <div class="benefits-list">
        <strong>✓ Resposta instantânea</strong> a perguntas de clientes<br>
        <strong>✓ Escalabilidade</strong> sem aumento proporcional de staff<br>
        <strong>✓ Personalização</strong> de recomendações baseada em histórico
      </div>
      
      <h4>Tecnologias Relacionadas</h4>
      <p>Hermes Agent framework com loop de aprendizado, ferramentas de integração (MCP) com sistemas de e-commerce</p>
    `
  },
  {
    id: 2,
    title: "Assistentes de Venda Inteligentes com Context Engineering",
    description: "Chatbots especializados que usam Retrieval-Augmented Generation (RAG) para fornecer informações precisas sobre produtos.",
    tags: ["nlp", "recomendacao"],
    fullContent: `
      <h2>2️⃣ Assistentes de Venda com Context Engineering</h2>
      <h4>Descrição</h4>
      <p>Chatbots especializados que usam Retrieval-Augmented Generation (RAG) para fornecer informações precisas sobre produtos disponíveis.</p>
      
      <h4>Aplicação de IA</h4>
      <p>Estruturar dados de produtos em uma base vetorial (similar ao exemplo de chatbot local com Chroma) para recuperação rápida durante transmissões ao vivo.</p>
      
      <h4>Benefícios</h4>
      <div class="benefits-list">
        <strong>✓ Respostas contextualizadas</strong> com informações sempre atualizadas<br>
        <strong>✓ Redução de informações</strong> incorretas sobre produtos<br>
        <strong>✓ Velocidade de resposta</strong> otimizada com prompt caching
      </div>
      
      <h4>Tecnologias Relacionadas</h4>
      <p>Retrieval-Augmented Generation (RAG), Vector Databases (Chroma, Pinecone), LLM Embeddings</p>
    `
  },
  {
    id: 3,
    title: "Análise de Sentimento em Tempo Real",
    description: "Monitorar emoções e satisfação dos viewers durante o live shopping analisando comments, emojis e comportamento.",
    tags: ["nlp", "ml"],
    fullContent: `
      <h2>3️⃣ Análise de Sentimento em Tempo Real</h2>
      <h4>Descrição</h4>
      <p>Monitorar emoções e satisfação dos viewers durante o live shopping analisando comments, emojis e comportamento de compra.</p>
      
      <h4>Aplicação de IA</h4>
      <p>Processamento de NLP para detectar sentimentos e ajustar dinâmica da transmissão (promoções, apresentação de produtos) conforme engajamento.</p>
      
      <h4>Benefícios</h4>
      <div class="benefits-list">
        <strong>✓ Identificar momentos</strong> de pico de interesse<br>
        <strong>✓ Adaptar estratégia</strong> de vendas em tempo real<br>
        <strong>✓ Detectar clientes</strong> insatisfeitos para intervenção
      </div>
      
      <h4>Tecnologias Relacionadas</h4>
      <p>Análise de Sentimento NLP, Processamento de Stream em Tempo Real, Transformers</p>
    `
  },
  {
    id: 4,
    title: "Sistema de Recomendação Personalizada em Tempo Real",
    description: "Sugerir produtos durante o live baseado no histórico de compras, navegação e preferências do cliente.",
    tags: ["recomendacao", "ml"],
    fullContent: `
      <h2>4️⃣ Sistema de Recomendação Personalizada</h2>
      <h4>Descrição</h4>
      <p>Sugerir produtos durante o live baseado no histórico de compras, comportamento de navegação e preferências do cliente.</p>
      
      <h4>Aplicação de IA</h4>
      <p>Machine Learning para correlacionar produtos, incorporar histórico de sessões anteriores e gerar recomendações contextualizadas.</p>
      
      <h4>Benefícios</h4>
      <div class="benefits-list">
        <strong>✓ Aumentar valor</strong> médio do carrinho<br>
        <strong>✓ Melhoria da taxa</strong> de conversão<br>
        <strong>✓ Experiência única</strong> para cada buyer
      </div>
      
      <h4>Tecnologias Relacionadas</h4>
      <p>Collaborative Filtering, Content-Based Filtering, Hybrid Recommender Systems</p>
    `
  },
  {
    id: 5,
    title: "Detecção de Fraude em Transações",
    description: "Implementar sistema de detecção de anomalias para transações fraudulentas durante compras no live shopping.",
    tags: ["seguranca", "ml"],
    fullContent: `
      <h2>5️⃣ Detecção de Fraude em Transações</h2>
      <h4>Descrição</h4>
      <p>Implementar sistema de detecção de anomalias para transações fraudulentas durante compras no live shopping.</p>
      
      <h4>Aplicação de IA</h4>
      <p>Modelos de ML em tempo real (XGBoost, Isolation Forest) que analisam padrões de comportamento e transações suspeitas, similar às arquiteturas de fraud detection moderna.</p>
      
      <h4>Benefícios</h4>
      <div class="benefits-list">
        <strong>✓ Proteção de clientes</strong> e plataforma<br>
        <strong>✓ Redução de chargeback</strong> e disputas<br>
        <strong>✓ Conformidade regulatória</strong> e compliance
      </div>
      
      <h4>Tecnologias Relacionadas</h4>
      <p>Anomaly Detection, XGBoost, Isolation Forest, Real-Time Fraud Detection</p>
    `
  },
  {
    id: 6,
    title: "Geração Automática de Descrições e Conteúdo",
    description: "Criar automaticamente descrições de produtos, scripts para apresentadores e variações de copy para testes.",
    tags: ["nlp", "ml"],
    fullContent: `
      <h2>6️⃣ Geração Automática de Conteúdo</h2>
      <h4>Descrição</h4>
      <p>Criar automaticamente descrições de produtos, scripts para apresentadores e variações de copy para testes.</p>
      
      <h4>Aplicação de IA</h4>
      <p>LLMs para gerar conteúdo otimizado para conversão, adaptando tom e informações conforme o público-alvo.</p>
      
      <h4>Benefícios</h4>
      <div class="benefits-list">
        <strong>✓ Reduzir tempo</strong> de preparação de lives<br>
        <strong>✓ Consistência de qualidade</strong> em todas as transmissões<br>
        <strong>✓ Testes A/B</strong> automatizados de mensagens
      </div>
      
      <h4>Tecnologias Relacionadas</h4>
      <p>Large Language Models (LLMs), Prompt Engineering, Fine-Tuning de Modelos</p>
    `
  },
  {
    id: 7,
    title: "Agentes Autônomos para Gerenciamento de Operações",
    description: "Agentes que automatizam tarefas operacionais: controle de estoque, confirmação de pedidos, coordenação logística.",
    tags: ["agentes", "automacao"],
    fullContent: `
      <h2>7️⃣ Agentes Autônomos para Operações</h2>
      <h4>Descrição</h4>
      <p>Agentes que automatizam tarefas operacionais: controle de estoque, confirmação de pedidos, coordenação logística.</p>
      
      <h4>Aplicação de IA</h4>
      <p>Agentes com acesso a ferramentas (MCP servers) que gerenciam sistemas ERP, CRM, logística e comunicam status automaticamente.</p>
      
      <h4>Benefícios</h4>
      <div class="benefits-list">
        <strong>✓ Reduzir erros</strong> operacionais<br>
        <strong>✓ Liberar tempo</strong> para foco em customer experience<br>
        <strong>✓ Respostas mais rápidas</strong> sobre disponibilidade
      </div>
      
      <h4>Tecnologias Relacionadas</h4>
      <p>Model Context Protocol (MCP), Agentes IA com Ferramentas, Workflow Automation</p>
    `
  },
  {
    id: 8,
    title: "Previsão de Demanda e Otimização de Inventário",
    description: "Prever quais produtos terão picos de demanda durante lives e otimizar alocação de estoque.",
    tags: ["ml", "automacao"],
    fullContent: `
      <h2>8️⃣ Previsão de Demanda e Inventário</h2>
      <h4>Descrição</h4>
      <p>Prever quais produtos terão picos de demanda durante lives e otimizar alocação de estoque.</p>
      
      <h4>Aplicação de IA</h4>
      <p>Machine Learning para análise de séries temporais, padrões históricos e tendências sazonais, integrando dados de redes sociais.</p>
      
      <h4>Benefícios</h4>
      <div class="benefits-list">
        <strong>✓ Evitar stockouts</strong> durante momentos críticos<br>
        <strong>✓ Reduzir excesso</strong> de inventário<br>
        <strong>✓ Maximizar ROI</strong> de cada live
      </div>
      
      <h4>Tecnologias Relacionadas</h4>
      <p>Time Series Forecasting, ARIMA, Prophet, XGBoost Regression</p>
    `
  },
  {
    id: 9,
    title: "Moderação Inteligente de Comentários",
    description: "Filtrar automaticamente spam, comportamento tóxico e conteúdo inapropriado durante transmissões ao vivo.",
    tags: ["nlp", "seguranca"],
    fullContent: `
      <h2>9️⃣ Moderação Inteligente de Comentários</h2>
      <h4>Descrição</h4>
      <p>Filtrar automaticamente spam, comportamento tóxico e conteúdo inapropriado durante transmissões ao vivo.</p>
      
      <h4>Aplicação de IA</h4>
      <p>Processamento de linguagem natural com detecção de toxicidade, spam e conteúdo violento ou discriminatório.</p>
      
      <h4>Benefícios</h4>
      <div class="benefits-list">
        <strong>✓ Manter comunidade</strong> segura e acolhedora<br>
        <strong>✓ Reduzir carga</strong> de moderadores humanos<br>
        <strong>✓ Melhorar experiência</strong> de todos os viewers
      </div>
      
      <h4>Tecnologias Relacionadas</h4>
      <p>Text Classification, Toxicity Detection, Content Moderation APIs</p>
    `
  },
  {
    id: 10,
    title: "Segmentação Automática de Audiência e Targeting",
    description: "Agrupar automaticamente clientes em segmentos e personalizar ofertas conforme perfil demográfico e comportamental.",
    tags: ["ml", "recomendacao"],
    fullContent: `
      <h2>🔟 Segmentação de Audiência</h2>
      <h4>Descrição</h4>
      <p>Agrupar automaticamente clientes em segmentos e personalizar ofertas conforme perfil demográfico, comportamental e psicográfico.</p>
      
      <h4>Aplicação de IA</h4>
      <p>Clustering com ML e RAG para construir profiles detalhados baseado em múltiplas fontes de dados e histórico.</p>
      
      <h4>Benefícios</h4>
      <div class="benefits-list">
        <strong>✓ Mensagens mais relevantes</strong> por segmento<br>
        <strong>✓ Maior taxa de conversão</strong><br>
        <strong>✓ Melhor ROI</strong> em marketing
      </div>
      
      <h4>Tecnologias Relacionadas</h4>
      <p>K-Means, DBSCAN, Hierarchical Clustering, Customer Segmentation</p>
    `
  },
  {
    id: 11,
    title: "Sistemas de Memória Persistente para Clientes VIP",
    description: "Manter histórico detalhado de preferências, tamanhos, cores favoritas e padrões de compra de clientes recorrentes.",
    tags: ["agentes", "recomendacao"],
    fullContent: `
      <h2>1️⃣1️⃣ Memória Persistente para VIPs</h2>
      <h4>Descrição</h4>
      <p>Manter histórico detalhado de preferências, tamanhos, cores favoritas e padrões de compra de clientes recorrentes.</p>
      
      <h4>Aplicação de IA</h4>
      <p>Implementar sistema similar ao Hermes Agent (arquivos MEMORY.md, USER.md, SOUL.md) onde agents recuperam contexto completo do cliente.</p>
      
      <h4>Benefícios</h4>
      <div class="benefits-list">
        <strong>✓ Experiência VIP</strong> diferenciada<br>
        <strong>✓ Recomendações ultra-personalizadas</strong><br>
        <strong>✓ Fidelização</strong> de top customers
      </div>
      
      <h4>Tecnologias Relacionadas</h4>
      <p>Knowledge Graphs, Vector Memory Systems, Persistent Agent Memory</p>
    `
  },
  {
    id: 12,
    title: "Otimização em Tempo Real de Pricing Dinâmico",
    description: "Ajustar preços automaticamente baseado em demanda, quantidade em estoque e concorrência durante a transmissão.",
    tags: ["ml", "automacao"],
    fullContent: `
      <h2>1️⃣2️⃣ Pricing Dinâmico em Tempo Real</h2>
      <h4>Descrição</h4>
      <p>Ajustar preços automaticamente baseado em demanda, quantidade em estoque e concorrência durante a transmissão.</p>
      
      <h4>Aplicação de IA</h4>
      <p>Algoritmos de otimização que balanceiam elasticidade de preço com volume de vendas e margem.</p>
      
      <h4>Benefícios</h4>
      <div class="benefits-list">
        <strong>✓ Maximizar receita</strong> por produto<br>
        <strong>✓ Liquidar estoque</strong> lentamente movido<br>
        <strong>✓ Responder dinamicamente</strong> a concorrência
      </div>
      
      <h4>Tecnologias Relacionadas</h4>
      <p>Dynamic Pricing Algorithms, Revenue Optimization, Price Elasticity Modeling</p>
    `
  }
];

// Renderizar cards iniciais
function renderIdeas(filter = 'all') {
  const grid = document.getElementById('ideasGrid');
  grid.innerHTML = '';

  const filteredIdeas = filter === 'all' 
    ? IDEAS 
    : IDEAS.filter(idea => idea.tags.includes(filter));

  filteredIdeas.forEach((idea, index) => {
    const card = document.createElement('div');
    card.className = 'idea-card';
    card.innerHTML = `
      <div class="idea-number">#${String(idea.id).padStart(2, '0')}</div>
      <h3>${idea.title}</h3>
      <p>${idea.description}</p>
      <div class="idea-tags">
        ${idea.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
      <a href="#" class="read-more">Ler mais</a>
    `;
    card.addEventListener('click', (e) => {
      e.preventDefault();
      showModal(idea);
    });
    grid.appendChild(card);
  });
}

// Modal
function showModal(idea) {
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modalBody');
  modalBody.innerHTML = idea.fullContent;
  modal.classList.add('active');
}

// Fechar modal
document.getElementById('modal').addEventListener('click', (e) => {
  if (e.target.id === 'modal' || e.target.className === 'modal-close') {
    document.getElementById('modal').classList.remove('active');
  }
});

// Fechar com ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.getElementById('modal').classList.remove('active');
  }
});

// Filtros
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    const filter = e.target.getAttribute('data-filter');
    renderIdeas(filter);
  });
});

// Inicializar
renderIdeas();
