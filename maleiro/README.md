# Maleiro

MVP de um jogo casual e cozy em que a pessoa ajuda a Mila a preparar uma mala para uma viagem à praia.

## Objetivo

Validar rapidamente o loop principal da ideia: entender o pedido de uma cliente, escolher itens adequados ao destino e ao clima, organizar a mala e receber uma avaliação.

## Problema

Preparar uma viagem pode virar uma tarefa confusa. O jogo transforma essa decisão em uma atividade visual, simples e satisfatória de seleção e organização.

## Público-alvo

Crianças, famílias e pessoas que gostam de experiências casuais e cozy no navegador.

## Fluxo principal

1. A pessoa lê o briefing da Mila: praia, clima quente e ensolarado, roupas leves e algo divertido.
2. Escolhe itens do armário tocando neles ou arrastando-os.
3. Coloca até cinco itens na mala.
4. Confere a mala.
5. Recebe pontos, estrelas, acertos, erros e dicas para tentar novamente.

## Funcionalidades implementadas

* Briefing visual de cliente, destino e clima.
* Armário com oito itens específicos da viagem.
* Seleção por toque/clique e drag-and-drop.
* Capacidade de cinco itens.
* Pontuação por itens adequados, bônus pelo livro, penalidade por itens incompatíveis e itens faltantes.
* Feedback visual para guardar, retirar, limpar e conferir a mala.
* Tela de resultado com estrelas, resumo e ações de tentar novamente ou fechar.
* Layout responsivo para telas pequenas e grandes.

## Como executar localmente

Requer apenas um servidor HTTP local. Na raiz do monorepo:

```bash
npm run build
python3 -m http.server 8080 --directory dist
```

Acesse:

* `http://localhost:8080/` para a central do lab.
* `http://localhost:8080/maleiro/` para o MVP.

Também é possível servir diretamente a pasta do projeto durante ajustes rápidos:

```bash
python3 -m http.server 8080 --directory maleiro
```

## GitHub Pages

Depois da publicação da branch de deploy, o projeto ficará disponível em:

`https://ronanrodrigo.github.io/lab/maleiro/`

A pasta contém `index.html`, por isso será detectada automaticamente pelo gerador de projetos do monorepo. `projects.json` não deve ser atualizado manualmente.

## Decisões técnicas

* Phaser 3 foi usado conforme a restrição do briefing. A cena concentra o jogo em um canvas e oferece interações de ponteiro adequadas para mouse e toque.
* O projeto não adiciona dependências ao `package.json` nem exige etapa de build própria.
* Phaser 3 é carregado por CDN no `index.html`; o workflow existente copia os arquivos estáticos do projeto sem alterações.
* A interface externa usa HTML e CSS vanilla. Os elementos do jogo são desenhados pela cena Phaser.
* Não há backend, autenticação, API ou banco de dados.

## Dados

Os dados são fixos e simulados no arquivo `game.js`: uma cliente, uma viagem de praia e oito itens. A quantidade mínima de fallback foi considerada não aplicável, pois o MVP não consulta uma fonte externa.

## Decisões visuais

* Paleta quente e pastel, com roxo, coral, creme e verde-claro para sugerir uma experiência infantil e acolhedora.
* Tipografia arredondada nos títulos para reforçar o tom casual.
* Cartões grandes, feedback textual e suporte a toque para reduzir a dependência de instruções.
* Emojis funcionam como ilustrações leves sem exigir pacote de imagens ou assets externos.

## Referências e notas consultadas

A página `https://ronanrodrigo.dev/notes/tags/` foi acessada antes da implementação. Ela apresenta um índice de notas sobre IA, ferramentas, pesquisa e agentes. Não havia uma referência específica sobre jogos de organização, mas foram aproveitadas práticas pertinentes de manter o experimento pequeno, claro, independente e fácil de publicar como página estática.

As referências do briefing também orientaram o loop de montar mala de *Pack a Bag*, *Pack Master*, *Pakinpaks*, *Trip puzzle* e jogos de organização de lancheira. O MVP mantém somente a primeira missão do roadmap: um destino quente, uma mala, oito itens e validação simples por pontuação.

## Limitações conhecidas

* Existe apenas uma missão, uma cliente e um destino.
* Não há ainda conserto, pintura, loja, progressão, moedas ou personalização de malas.
* O Phaser é carregado de uma CDN; sem conexão ou se a CDN estiver indisponível, o jogo não inicia e apresenta uma mensagem para atualizar a página.
* A pontuação usa regras fixas e serve para validar o fluxo, não para representar um balanceamento final.
* Acessibilidade do conteúdo dentro do canvas é básica; o texto de apoio HTML explica as interações principais.

## Próximos passos para validação

* Observar crianças e famílias jogando sem explicação e medir se entendem o briefing e o gesto de colocar itens.
* Testar se o limite de cinco itens e a pontuação incentivam uma segunda tentativa.
* Comparar a compreensão de toque versus arrastar em celular e desktop.
* Validar com usuários se o conserto e a personalização da mala devem entrar antes de novas viagens.
* Depois dos testes, considerar assets próprios, mais clientes e uma progressão curta.
