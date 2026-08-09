# Maplay

## Objetivo do MVP

Maplay valida a ideia de transformar um local real escolhido pela pessoa em uma pequena experiência de direção arcade no navegador. A interface comunica a proposta em poucos segundos: digitar um destino, partir e dirigir pela estrada gerada.

## Problema e público-alvo

O MVP explora uma forma mais lúdica de navegar por lugares conhecidos ou descobrir destinos. O público ainda está **indefinido** no briefing; portanto, a primeira versão prioriza uma interação imediata, sem cadastro e sem explicações longas.

## Fluxo principal

1. A pessoa informa uma cidade, bairro ou lugar.
2. Seleciona **Partir**.
3. O Maplay apresenta uma paisagem de estrada em terceira pessoa, com asfalto central e grama nas laterais.
4. A pessoa dirige usando `A`/`D`, as setas do teclado ou os botões de toque.
5. Pode reiniciar a volta ou trocar o local.

## Funcionalidades implementadas

* Campo de local com exemplo preenchido.
* Tela de partida com feedback de carregamento.
* Cena 2D em canvas com câmera em terceira pessoa, estrada, grama, vegetação simples e carro pixel art.
* Movimento lateral por teclado e controles de toque em telas pequenas.
* Distância percorrida e pontuação atualizadas durante a partida.
* Semente visual derivada do nome do local para que destinos diferentes produzam variações de paisagem.
* Cartão de rota com representação visual abstrata do mapa.
* Layout responsivo, foco visível, textos semânticos e suporte básico a teclado.

## Dados reais, simulados e decisões técnicas

A referência de fonte de dados foi **OpenStreetMap**, mas esta versão não faz uma chamada externa: o nome digitado funciona como entrada e a estrada é uma visualização simulada. Isso mantém o fluxo principal disponível offline, evita credenciais e reduz o escopo necessário para validar a diversão da interação. O projeto usa apenas HTML, CSS e JavaScript vanilla; não há dependências, build próprio, backend ou autenticação.

A direção é desenhada em `canvas` para permitir uma cena leve e responsiva. O mapa lateral é uma composição visual abstrata, sem reproduzir tiles ou dados cartográficos. O projeto não renderiza prédios, conforme solicitado.

## Como executar localmente

Na raiz do monorepo:

```bash
npm run build
python3 -m http.server 8080 --directory dist
```

Abra:

* `http://localhost:8080/` para a central.
* `http://localhost:8080/maplay/` para o MVP.

## GitHub Pages

Após o merge na branch de deploy e a execução do workflow, o projeto estará em:

`https://ronanrodrigo.github.io/lab/maplay/`

A listagem da central é atualizada automaticamente pelo processo existente a partir da presença de `index.html` e do `project.json`.

## Notas, referências e limitações

A página `https://ronanrodrigo.dev/notes/tags/` foi acessada conforme solicitado. Foram aproveitados princípios pertinentes de escopo reduzido, publicação estática, interface clara, uso de HTML/CSS/JavaScript vanilla e estados de carregamento. A referência visual informada foi o jogo do site `hop.earth`, usada como inspiração para a relação entre lugar e exploração, sem copiar sua implementação.

O OpenStreetMap foi registrado como referência de dados, mas não é consultado nesta primeira iteração. Consequentemente, a estrada ainda não representa a geometria real de uma via, não existe geocodificação, não há colisão com limites, obstáculos, tráfego ou destino. O botão e o cartão de mapa são deliberadamente demonstrativos para testar o conceito principal.

## Próximos passos de validação

* Entrevistar pessoas e observar se escolher um local real torna a experiência mais interessante que uma pista genérica.
* Adicionar geocodificação sem chave, quando apropriado, e obter dados de vias do OpenStreetMap/Overpass com fallback local.
* Testar se a representação abstrata da rua é suficiente ou se as pessoas esperam reconhecer a geometria do local.
* Medir escolha de destinos, duração da partida, reinícios e retorno ao fluxo de troca de local.
* Explorar objetivos simples, como entregar algo, encontrar um ponto ou completar uma rota.
