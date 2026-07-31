# Live shopping

Guia visual e protótipo navegável sobre a criação de uma plataforma de live shopping — transmissão ao vivo, interação em tempo real e compra contextual no mesmo fluxo.

## Objetivo do MVP

Tornar a ideia compreensível em poucos segundos e permitir que uma pessoa experimente o fluxo central de uma live: assistir à demonstração, acompanhar o chat, reagir, destacar produtos, adicionar um item ao carrinho e chegar a um checkout demonstrativo.

O MVP não tenta construir uma plataforma de vídeo real. Ele valida a proposta de valor e ajuda a discutir quais componentes são essenciais antes de investir em infraestrutura própria.

## Problema

Em uma live tradicional, o conteúdo, a conversa e a compra costumam estar separados. A pessoa precisa sair da transmissão, procurar o produto e reconstruir o contexto da oferta. Essa fricção pode fazer a intenção de compra se perder.

O live shopping aproxima demonstração, confiança, interação e checkout, mas exige coordenação entre vídeo, catálogo, estoque, moderação, pagamento e métricas.

## Público-alvo

* Marcas e varejistas de moda, beleza, casa e eletrônicos.
* Influenciadores e hosts que querem transformar audiência em vendas.
* Agências e estúdios de produção que oferecem lives como serviço.
* Negócios locais de Joinville que desejam testar o formato com uma operação enxuta.

## Fluxo principal

1. A pessoa chega à página e entende o que diferencia live shopping de uma live comum.
2. Entra na simulação de uma transmissão com host, espectadores e produto em destaque.
3. Navega por produtos, reage à live e envia uma pergunta no chat.
4. Adiciona o produto ao carrinho e abre o checkout demonstrativo.
5. Consulta a arquitetura mínima, os modelos de operação e um roteiro de validação com usuários reais.

## Funcionalidades implementadas

* Página responsiva com explicação do conceito, princípios, arquitetura e modelos de negócio.
* Simulação de player de live com estado de produto em destaque.
* Alternância entre produtos, preços promocionais e contagem regressiva de oferta.
* Chat local com envio de mensagens e resposta simulada da host.
* Reações com contador e feedback visual.
* Carrinho lateral com quantidade, subtotal, cupom ilustrativo e checkout demonstrativo.
* Aba de roteiro da live para mostrar a operação por trás da experiência.
* Checklist de validação com estado persistido apenas durante a sessão.
* Navegação por âncoras, menu móvel, foco visível, textos alternativos sem depender de imagens externas e suporte a `prefers-reduced-motion`.

## Como executar localmente

A página não possui dependências ou etapa de build própria. A partir da raiz do monorepo:

```bash
npm run build
python3 -m http.server 8080 --directory dist
```

Depois, acesse:

```text
http://localhost:8080/live-shopping/
```

Também é possível abrir `live-shopping/index.html` diretamente, embora um servidor HTTP seja recomendado para reproduzir o ambiente de publicação.

## Publicação

O projeto está dentro da pasta `live-shopping/` e contém o `index.html` exigido pelo gerador do monorepo. Após a publicação da branch `main` pelo workflow existente, estará disponível em:

<https://ronanrodrigo.github.io/lab/live-shopping/>

A central do playground permanece em <https://ronanrodrigo.dev/lab/> e detecta o projeto pelo manifesto gerado automaticamente. `projects.json` não foi alterado manualmente.

## Decisões técnicas

* HTML, CSS e JavaScript vanilla: o fluxo é estático e não precisava de framework, dependências ou etapa de compilação adicional.
* Dados específicos da transmissão ficam em memória no `app.js`; não há API, backend, banco, autenticação ou credenciais.
* O player é uma composição visual de CSS, não um vídeo externo. Assim, o fluxo continua funcional em ambiente local e no GitHub Pages.
* O carrinho e o chat demonstram estados de interação, mas não executam pagamento nem criam pedidos reais.
* Todos os recursos são carregados com caminhos relativos (`./styles.css` e `./app.js`) para funcionar no prefixo `/lab/live-shopping/`.

## Dados reais, simulados e limitações

Os produtos, números de audiência, mensagens, preços e métricas são simulados para tornar o conceito demonstrável. Não foi utilizada API ou fonte externa de dados dentro da aplicação.

Limitações conhecidas:

* Não existe transmissão de vídeo real, encoder, CDN ou baixa latência.
* O checkout não processa pagamentos e o estoque não é sincronizado.
* O chat não possui servidor, persistência ou moderação automática.
* Analytics, integrações com Shopify/VTEX/Nuvemshop, CRM, ERP e gateway de pagamento são apenas representados conceitualmente.
* A simulação de host e produtos usa ilustrações CSS, sem fotografias reais.

## Decisões visuais

A interface usa uma base clara e editorial, com roxo como cor de produto, verde-lima para estados de ação e laranja para urgência. O contraste entre a área de explicação e o painel escuro da live ajuda a separar conteúdo educativo de experiência operacional.

Cards, etiquetas curtas e blocos numerados foram usados para tornar a proposta escaneável. A composição do simulador prioriza o desktop, mas reorganiza player, produto e chat em uma coluna no celular. O conteúdo evita depender de imagens e fontes externas para manter o protótipo rápido e confiável.

## Referências pesquisadas e aproveitadas

A página <https://ronanrodrigo.dev/notes/tags/> foi acessada antes da implementação. Ela reúne notas sobre ferramentas de IA, automação, agentes e competências. Não havia uma referência diretamente aplicável a live shopping; a prática aproveitada foi a organização do conteúdo por temas e a apresentação progressiva de informação, refletida nas seções curtas, tags e blocos do guia.

Também foram pesquisadas referências específicas sobre live commerce. As ideias pertinentes incorporadas foram:

* Nielsen Norman Group — [How to Create a Successful Livestream-Ecommerce Experience](https://www.nngroup.com/articles/successful-livestream-ecommerce-guidelines/): reduzir o esforço de compra, oferecer recompensas e manter suporte após o pedido.
* McKinsey — [It's showtime: How live commerce is transforming the shopping experience](https://www.mckinsey.com.br/en/capabilities/mckinsey-digital/our-insights/its-showtime-how-live-commerce-is-transforming-the-shopping-experience): live commerce como combinação de entretenimento, interação e venda.
* Stream — [Live Commerce Explained](https://getstream.io/blog/live-commerce/): vídeo de baixa latência, chat, reações, produtos marcados e sinais de audiência como partes centrais da experiência.
* commercetools — [Live commerce engagement best practices](https://commercetools.com/blog/live-commerce-engagement-best-practices): planejamento da live, demonstração, interação, urgência e acompanhamento de métricas.
* Live.S — [Live.S](https://lives.app.br/): referência brasileira para compra durante a transmissão sem sair da live.

Os links serviram como referências de produto e UX; não há integração com nenhum deles.

## Próximos passos para validar com usuários reais

1. Entrevistar três marcas ou lojas de Joinville sobre como hoje organizam lives e recebem pedidos.
2. Produzir uma live piloto de 30 minutos com um único segmento e observar perguntas, cliques e desistências.
3. Testar duas versões do checkout: overlay dentro da live e abertura em página externa.
4. Medir visualização, interação, clique em produto, adição ao carrinho, conclusão e retorno para a próxima live.
5. Só depois decidir entre operar com ferramentas existentes, contratar uma solução SaaS ou construir integrações próprias.
