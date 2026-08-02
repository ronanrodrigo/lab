# Maleiro

`Maleiro` agora é um jogo 2D arcade de montagem rápida de malas. A pessoa atende Mila em um balcão de aeroporto, escolhe itens para uma viagem à praia e tenta entregar a mala antes do tempo acabar.

## Objetivo do MVP

Validar um loop de jogo simples e repetível:

1. ler o pedido da cliente;
2. escolher os itens certos sob pressão de tempo;
3. colocar os itens na mala;
4. entregar a mala;
5. receber pontuação e tentar melhorar.

## Público-alvo

Crianças, famílias e pessoas que gostam de jogos casuais, cozy e arcade no navegador.

## Como jogar

* Na tela inicial, clique em **JOGAR** ou pressione `Enter`/`Espaço`.
* Use `←` e `→` ou `A` e `D` para selecionar itens na prateleira.
* Pressione `Espaço` para pegar o item selecionado.
* Também é possível tocar nos itens ou arrastá-los até a mala.
* Coloque até cinco itens.
* Pressione `Enter` ou use o comando indicado no jogo para entregar.
* Itens adequados dão pontos; itens errados tiram pontos; completar a mala correta dá bônus.

No celular, o fluxo principal funciona tocando nos itens e arrastando-os para a mala.

## Gráficos e direção visual

A experiência foi redesenhada como um jogo, não como uma página de apresentação:

* tela inicial com título, botão arcade e mascote-mala;
* cena contínua em canvas, sem cabeçalho ou cards HTML;
* estética pixel-art desenhada em blocos e formas simples;
* cliente animada visualmente esperando no balcão;
* jogador representado atrás do balcão;
* janela, piso em tiles, placa de missão, balão de fala, prateleira e mala aberta;
* efeitos de partículas em acertos;
* tremor de câmera em erros;
* cronômetro de 45 segundos;
* seleção destacada, feedback de acerto/erro e tela de pontuação.

## Como executar localmente

Na raiz do monorepo:

```bash
npm run build
python3 -m http.server 8080 --directory dist
```

Acesse:

* `http://localhost:8080/` para a central;
* `http://localhost:8080/maleiro/` para o jogo.

Durante ajustes rápidos:

```bash
python3 -m http.server 8080 --directory maleiro
```

## GitHub Pages

Após a publicação pelo workflow, o jogo estará disponível em:

`https://ronanrodrigo.github.io/lab/maleiro/`

O projeto possui `index.html` e `project.json`. O manifesto central é gerado automaticamente; `projects.json` não deve ser alterado manualmente.

## Decisões técnicas

* Phaser 3 continua sendo o único motor utilizado, conforme o briefing.
* A renderização usa `pixelArt: true`, `antialias: false` e formas de `Graphics`/`Rectangle` para criar gráficos 2D com aparência de jogo arcade.
* A lógica está concentrada em uma cena com três estados: tela inicial, rodada e resultado.
* O jogo não depende de sprites, imagens, API, banco, backend, autenticação ou dados externos.
* Phaser é carregado por CDN no HTML, sem adicionar dependências ou etapa de build ao monorepo.
* A página HTML contém somente o canvas do jogo e uma descrição oculta para acessibilidade; toda a interface jogável está dentro do canvas.

## Dados

Os dados são locais e simulados: uma cliente, um destino quente e oito itens. Cinco itens combinam com a viagem e três são distrações. A quantidade mínima de fallback foi considerada não aplicável porque não existe fonte externa.

## Referências consultadas

A página `https://ronanrodrigo.dev/notes/tags/` foi acessada antes desta atualização. Ela reúne notas sobre ferramentas, agentes, automação e sistemas de design. Foram aplicadas as ideias pertinentes de manter o experimento modular, independente, pequeno e fácil de evoluir.

O briefing também citou *Pack a Bag*, *Pack Master*, *Pakinpaks*, *Trip puzzle*, *Tá na Mala!* e jogos de organização de lancheira. Esta versão prioriza a sensação de partida arcade: tela inicial, desafio com tempo, seleção, feedback, erro, acerto, pontuação e replay.

## Limitações conhecidas

* Existe uma única fase, cliente e destino.
* Os gráficos são pixel-art de protótipo desenhados por código, não assets finais.
* Ainda não há loja, moedas, conserto, pintura, progressão ou personalização.
* O Phaser depende de uma CDN; sem conexão, o motor não carrega.
* O controle por teclado e toque existe, mas a acessibilidade completa de um canvas ainda precisa ser aprofundada.

## Próximos passos para validação

* Observar se uma criança entende que precisa jogar, e não apenas ler a tela.
* Medir se 45 segundos geram diversão ou pressa excessiva.
* Testar o tamanho e a legibilidade dos itens em celular.
* Verificar se partículas, tremor e pontuação tornam os acertos satisfatórios.
* Adicionar uma segunda fase fria somente depois de validar o loop arcade da praia.
