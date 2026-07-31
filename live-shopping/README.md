# LiveFlow — pitch em slides

Pitch visual, navegável e responsivo de uma plataforma de live shopping.

## Objetivo

Apresentar a ideia como uma narrativa de pitch, e não como uma página longa de documentação. Cada tela responde a uma pergunta: qual é o contexto, qual é o problema, qual é a proposta, como a experiência funciona, quem se beneficia e como começar.

## Roteiro dos slides

1. **Tese:** a live deixa de ser conteúdo e vira o momento da compra.
2. **Contexto:** a audiência já está no momento da decisão.
3. **Problema:** intenção dispersa, dados desconectados e momento perdido.
4. **Solução:** atrair, demonstrar, engajar e converter no mesmo fluxo.
5. **Demo:** player, produto em destaque, conversa e ação de compra.
6. **Ecossistema:** valor para marca, audiência e operação.
7. **Go-to-market:** começar como serviço e evoluir para plataforma própria.

## Navegação

* Setas na parte inferior.
* Teclas `←` e `→`.
* `PageUp`, `PageDown`, `Home` e `End`.
* Gestos de deslizar no celular.
* Indicadores de slide no desktop.
* Botão de ação na demo para trocar produto, reagir e adicionar ao carrinho demonstrativo.

## Como executar

Na raiz do monorepo:

```bash
npm run build
python3 -m http.server 8080 --directory dist
```

Acesse:

```text
http://localhost:8080/live-shopping/
```

## Publicação

O projeto é publicado pelo workflow existente em:

<https://ronanrodrigo.github.io/lab/live-shopping/>

A página central continua usando o manifesto gerado automaticamente. Nenhum arquivo compartilhado ou `projects.json` foi alterado manualmente.

## Decisões técnicas

* HTML, CSS e JavaScript vanilla.
* Cada slide ocupa a viewport, com transição horizontal controlada por JavaScript.
* O layout possui uma composição específica para telas pequenas, evitando o problema anterior de conteúdo corrido e elementos sem espaçamento.
* Não há dependências externas, API, backend, autenticação ou credenciais.
* O vídeo, os produtos e as métricas são representações visuais simuladas.
* Todos os recursos usam caminhos relativos para funcionar no prefixo `/lab/live-shopping/`.

## Limitações

A demo não realiza transmissão real, checkout ou pagamento. As interações servem para tornar o pitch navegável e demonstrar o fluxo principal. Dados de audiência, produtos e conversão são ilustrativos.

## Referências

A página <https://ronanrodrigo.dev/notes/tags/> foi acessada antes da implementação. Ela não continha uma referência diretamente relacionada a live commerce; foi aproveitada a organização por temas e a apresentação progressiva de informação.

Também foram pesquisadas referências sobre live shopping, especialmente a combinação de vídeo, chat, produto em destaque, checkout contextual, urgência e métricas. Essas referências orientaram a narrativa, mas não são integradas ao código.

## Próximos passos

1. Apresentar o deck a três marcas ou lojas de Joinville.
2. Validar se a tese é compreendida sem explicação adicional.
3. Realizar uma live piloto de trinta minutos.
4. Medir perguntas, cliques, adições ao carrinho, compras e retorno.
5. Definir se o primeiro negócio deve ser produção como serviço, software ou um modelo híbrido.
