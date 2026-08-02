# Maleiro

MVP de um jogo 2D casual e cozy em que a pessoa trabalha atrás de um balcão de embarque e prepara a mala de uma cliente que está esperando.

## Objetivo

Validar o loop principal da ideia: entender o pedido da cliente, escolher itens adequados ao destino e ao clima, montar a mala no balcão e entregá-la para receber uma avaliação.

## Problema

Preparar uma viagem pode ser confuso. O jogo transforma essa decisão em uma tarefa visual e satisfatória, com uma cena de atendimento que deixa claro quem espera e quem está montando a mala.

## Público-alvo

Crianças, famílias e pessoas que gostam de experiências casuais e cozy no navegador.

## Fluxo principal

1. Mila espera do outro lado do balcão com um balão de fala.
2. A pessoa lê o quadro de pedido: praia, clima quente e roupas leves.
3. A pessoa toca ou arrasta itens da prateleira de atendimento para a mala aberta no balcão.
4. A pessoa entrega a mala.
5. O jogo mostra estrelas, pontos, acertos, erros e uma dica para uma nova tentativa.

## Funcionalidades implementadas

* Cena 2D desenhada em Phaser 3, com ambiente de balcão de embarque.
* Personagem cliente visível, esperando pela mala.
* Perspectiva do jogador atrás do balcão, com mãos sobre o balcão.
* Quadro visual com o briefing da viagem.
* Mala aberta sobre o balcão.
* Prateleira de itens com oito itens desenhados como ícones 2D.
* Seleção por toque/clique e drag-and-drop.
* Capacidade de cinco itens.
* Pontuação por itens adequados, bônus pelo livro, penalidade por itens incompatíveis e itens faltantes.
* Tela de resultado com estrelas, resumo e ações de montar de novo ou fechar.
* Feedback visual no balcão durante a montagem.
* Layout responsivo para telas pequenas e grandes usando a escala FIT do Phaser.

## Como executar localmente

Requer apenas um servidor HTTP local. Na raiz do monorepo:

```bash
npm run build
python3 -m http.server 8080 --directory dist
```

Acesse:

* `http://localhost:8080/` para a central do lab.
* `http://localhost:8080/maleiro/` para o MVP.

Durante ajustes rápidos, também é possível servir a pasta do projeto:

```bash
python3 -m http.server 8080 --directory maleiro
```

## GitHub Pages

Depois da publicação, o projeto fica disponível em:

`https://ronanrodrigo.github.io/lab/maleiro/`

A pasta contém `index.html`, por isso é detectada automaticamente pelo gerador de projetos do monorepo. `projects.json` não deve ser atualizado manualmente.

## Decisões técnicas

* Phaser 3 foi usado conforme o briefing. A cena concentra a experiência em um canvas 2D e usa eventos de ponteiro para mouse e toque.
* Os gráficos são desenhados com `Phaser.GameObjects.Graphics`, sem sprites externos, para que a cena continue independente de assets e carregue rapidamente.
* A interface HTML foi reduzida ao contêiner do jogo; briefing, personagem, balcão, itens e resultado vivem dentro da cena para reforçar a sensação de jogo.
* O projeto não adiciona dependências ao `package.json` nem exige etapa de build própria.
* Phaser 3 é carregado por CDN no `index.html`; o workflow existente copia os arquivos estáticos sem alterações.
* Não há backend, autenticação, API ou banco de dados.

## Dados

Os dados são fixos e simulados em `game.js`: uma cliente, uma viagem de praia e oito itens. A quantidade mínima de fallback foi considerada não aplicável porque o MVP não consulta uma fonte externa.

## Decisões visuais

* A composição usa uma cena de balcão, com a cliente em primeiro plano ao fundo, a mala no centro e os itens em uma prateleira lateral.
* Azul-marinho, madeira e amarelo criam uma leitura de balcão de embarque e diferenciam o jogo de uma página de apresentação.
* Personagem, mãos, mala e objetos são desenhados com formas 2D simples e contornos grossos, adequados ao público infantil e fáceis de substituir por arte final depois.
* O balão de fala e o quadro de pedido comunicam a missão sem depender de texto fora do jogo.

## Referências e notas consultadas

A página `https://ronanrodrigo.dev/notes/tags/` foi acessada antes da implementação e novamente durante esta atualização. Ela apresenta um índice de notas sobre IA, ferramentas, pesquisa, agentes e sistemas de design. Foram aproveitadas as práticas pertinentes de manter o protótipo pequeno, modular, independente e fácil de evoluir.

As referências do briefing também orientaram o loop de montar mala de *Pack a Bag*, *Pack Master*, *Pakinpaks*, *Trip puzzle* e jogos de organização de lancheiras. Esta versão prioriza a encenação de atendimento no balcão e a ação central de preparar a mala.

## Limitações conhecidas

* Existe apenas uma missão, uma cliente e um destino.
* Ainda não há conserto, pintura, loja, progressão, moedas ou personalização de malas.
* Os gráficos são formas 2D de protótipo, não ilustrações finais.
* O Phaser é carregado de uma CDN; sem conexão ou se a CDN estiver indisponível, o jogo não inicia.
* A pontuação usa regras fixas e serve para validar o fluxo, não para representar um balanceamento final.
* A acessibilidade do conteúdo dentro do canvas é básica; a página mantém uma descrição textual oculta para tecnologias assistivas.

## Próximos passos para validação

* Observar crianças e famílias jogando sem explicação e verificar se identificam rapidamente o papel da cliente e o papel de quem atende no balcão.
* Medir se a composição visual comunica a ação principal antes de a pessoa tocar em um item.
* Testar se o tamanho dos objetos funciona bem em celular e tablet.
* Validar se a reação da cliente deve ser animada após a entrega.
* Criar uma segunda missão, como uma viagem para um destino frio, apenas depois de validar esta cena.
