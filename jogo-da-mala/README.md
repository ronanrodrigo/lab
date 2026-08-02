# Malinha Mágica

Um protótipo cozy de jogo infantil em que a pessoa atende viajantes, conserta uma mala e escolhe os itens certos para cada aventura.

## Objetivo do MVP

Validar rapidamente o fluxo central de um jogo de preparação de malas para crianças de 6 a 12 anos: entender o pedido contextualizado de um cliente, escolher itens por toque ou arrastar, receber feedback imediato e ganhar Moedas Mágicas.

## Problema

Crianças precisam de uma atividade simples, segura e sem pressão que transforme o planejamento de uma viagem em uma brincadeira de associação. O MVP testa se destino, estação, preferências e feedback imediato tornam a seleção de itens clara e divertida.

## Público-alvo

Crianças de 6 a 12 anos, com interface pensada primeiro para celulares e tablets. A experiência também pode ser demonstrada em desktop para responsáveis, designers e pessoas avaliando o conceito.

## Fluxo principal

1. A pessoa escolhe um avatar.
2. Um dos cinco clientes conta para onde vai e o que gostaria de levar.
3. A pessoa escolhe entre a mala do cliente e malas coloridas.
4. Quando necessário, conserta e personaliza a mala com três ações simples.
5. Toca ou arrasta itens da prateleira para dentro da mala.
6. O jogo dá pontos, mostra o checklist e avalia a mala com estrelas e moedas.
7. A pessoa pode atender o próximo cliente ou visitar a loja.

## Funcionalidades implementadas

* Menu inicial com progresso, saldo, loja e controle de sons.
* Escolha entre três avatares.
* Cinco clientes e destinos: Mila na praia, João na montanha, Avó Rosa no interior, Luca em uma viagem mista e Sofia na cidade.
* Pedidos contextualizados por estação, clima, estilo e preferências.
* Seleção de malas, oficina com conserto, cores e adesivos.
* Mais de 30 itens simulados divididos em roupas de verão, roupas de inverno, acessórios e extras.
* Drag-and-drop com Pointer Events, incluindo suporte a touch, além de toque/clique como alternativa acessível.
* Feedback de item correto ou inadequado, pontuação flutuante, checklist e estado de mala vazia/preenchida.
* Pontuação com base, preferência e bônus de utilidade; itens inadequados geram uma penalidade leve.
* Avaliação com 1 a 3 estrelas, reação do cliente e recompensa em Moedas Mágicas.
* Loja básica com malas, ferramentas, protetores, adesivos e etiquetas.
* Salvar saldo, avatar, malas compradas, inventário e clientes atendidos em `localStorage`.
* Sons curtos gerados pela Web Audio API, com controle de ligar/desligar.
* Camada visual ambiente com Phaser 3.80.1 quando o CDN está disponível; o fluxo principal não depende dela.

## Como executar localmente

Requisitos: Node.js 20 ou superior.

A partir da raiz do monorepo:

```bash
npm run build
python3 -m http.server 8080 --directory dist
```

Abra:

* Central: `http://localhost:8080/`
* MVP: `http://localhost:8080/jogo-da-mala/`

Também é possível abrir `jogo-da-mala/index.html` diretamente para uma inspeção rápida, mas um servidor HTTP é recomendado para reproduzir o contexto publicado.

## GitHub Pages

Depois do build e da publicação do workflow do monorepo, o projeto estará em:

`https://ronanrodrigo.github.io/lab/jogo-da-mala/`

A central continua em:

`https://ronanrodrigo.dev/lab/`

O arquivo `project.json` fornece os metadados do cartão. `projects.json` não foi alterado manualmente; ele é gerado automaticamente durante o build.

## Decisões técnicas

* HTML, CSS e JavaScript vanilla mantêm o protótipo leve, estático e fácil de evoluir.
* O jogo usa DOM semântico para botões, textos, foco visível e alternativas por clique/teclado. Isso evita que a validação dependa exclusivamente de um canvas.
* Phaser 3.80.1 é carregado como uma camada visual ambiente opcional para pontos coloridos flutuantes. Se o CDN estiver indisponível, o CSS assume o fundo e todas as interações do MVP continuam funcionando. Assim, a biblioteca atende ao briefing sem criar uma barreira para a validação do fluxo.
* Os dados dos clientes, pedidos, itens, preços e recompensas são constantes locais em `app.js`. Não há API, backend, banco, autenticação, chave ou credencial.
* A progressão é persistida com `localStorage`, usando uma chave versionada para facilitar uma futura migração.
* Os sons são pequenos efeitos sintetizados no navegador e só começam após interação, respeitando a política de autoplay.
* Emojis, CSS e formas arredondadas substituem imagens externas para manter o pacote pequeno e funcionar sem assets remotos.

## Dados reais, simulados e armazenamento

Todos os clientes, pedidos, itens, preços e recompensas são simulados para o protótipo. O saldo, avatar, malas compradas, inventário e quantidade de clientes atendidos ficam apenas no `localStorage` do navegador. Nenhuma informação é enviada para um serviço externo. O briefing informou `NENHUMA` API, fonte de dados ou referência adicional; por isso, não há fallback remoto nem dados reais.

## Limitações conhecidas

* A música de fundo em loop foi reduzida a efeitos sonoros curtos para não criar uma barreira de autoplay nem adicionar arquivos de áudio ao MVP.
* O Phaser é obtido de um CDN opcional; em modo offline o jogo funciona, mas perde apenas os pontos coloridos da camada ambiente.
* A loja demonstra compra e inventário, mas os itens comprados ainda não alteram profundamente a dificuldade dos pedidos.
* Não há conta, sincronização entre dispositivos, analytics ou sistema parental.
* O drag-and-drop é propositalmente simples e não possui física de itens; tocar no cartão é a alternativa recomendada para acessibilidade.
* Não foi incluída uma arte ilustrada final para personagens e objetos. A direção visual usa CSS e emojis para testar o fluxo antes de investir em assets.

## Decisões visuais

A interface usa creme, rosa, azul céu, verde menta, amarelo manteiga e lilás, com cartões translúcidos, sombras leves e formas arredondadas. O conteúdo mais importante aparece sempre em um cartão de leitura curta, com botões grandes e sem limite de tempo. A composição se reorganiza em uma coluna em telas pequenas e mantém a mala no centro da ação durante a montagem.

## Notas e referências consultadas

A página `https://ronanrodrigo.dev/notes/tags/` foi acessada antes da implementação. Ela organiza notas de 2026 sobre IA, ferramentas, agentes, automação, design systems e metodologias. Não havia uma referência específica sobre jogos infantis, mas foram aproveitadas práticas pertinentes ao MVP: escopo pequeno para validação, interface clara, componentes reutilizáveis, feedback observável e decisões técnicas explícitas.

As referências adicionais do briefing foram `NENHUMA` e a fonte de dados foi `NENHUMA`; portanto, não foram incorporados links, APIs ou dados externos.

## Próximos passos para validar com pessoas reais

* Observar cinco crianças usando o jogo sem explicação e medir se entendem o pedido e a ação de colocar itens.
* Comparar toque direto com drag-and-drop e perguntar qual interação parece mais natural.
* Testar se os textos, emojis e cores são compreendidos sem leitura de um adulto.
* Verificar se as recompensas e a loja aumentam a vontade de jogar novamente sem introduzir pressão.
* Substituir os emojis por uma direção de arte original após validar o fluxo, e testar sons e música com responsáveis.
* Registrar onde as pessoas erram, quais itens escolhem primeiro e em que momento abandonam a partida.
