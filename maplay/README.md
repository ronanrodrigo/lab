# Maplay

## Objetivo do MVP

Maplay transforma um ponto real escolhido pela pessoa em uma experiência de direção arcade no navegador. A pessoa visualiza o mapa real, solta um pin e começa uma corrida 2D em terceira pessoa por uma estrada em pixel art.

## Problema e público-alvo

O MVP explora uma forma mais lúdica de navegar por lugares conhecidos ou descobrir destinos. O público ainda está **indefinido** no briefing; por isso, a experiência não exige cadastro, instalação ou explicações longas.

## Fluxo principal

1. A pessoa acessa o Maplay e vê um mapa real do OpenStreetMap.
2. Busca uma cidade/endereço ou clica diretamente em qualquer ponto do mapa para soltar o pin.
3. Seleciona **Começar a dirigir**.
4. Controla o carro em uma estrada arcade: acelera, freia e vira.
5. Pode reiniciar a corrida ou escolher outro ponto.

## Funcionalidades implementadas

* Mapa interativo real com tiles do OpenStreetMap e atribuição visível.
* Seleção de ponto por clique no mapa com marcador e coordenadas.
* Busca de cidade/endereço usando o Nominatim do OpenStreetMap, acionada somente pelo formulário.
* Estado de busca, ponto selecionado e erro de localização.
* Cena 2D em canvas com câmera em terceira pessoa, estrada em perspectiva, montanhas, árvores, iluminação, carro desenhado em pixel art e cenário em movimento.
* Botões dedicados para **acelerar** e **frear**, além de botões para virar à esquerda e à direita.
* Controles equivalentes por teclado: `W`/`↑`, `S`/`↓`, `A`/`D` e setas.
* Distância, velocidade e pontuação atualizadas durante a corrida.
* Layout responsivo para desktop e celular, com alvos de toque grandes e foco visível.

## Dados reais, simulados e decisões técnicas

O mapa exibido e o geocodificador usam serviços públicos do OpenStreetMap. Leaflet é carregado por CDN para renderizar o mapa interativo sem adicionar uma etapa de build. Os tiles usam a URL oficial `https://tile.openstreetmap.org/{z}/{x}/{y}.png` e exibem a atribuição obrigatória.

A geometria da corrida ainda é simulada em canvas: o ponto real define o local escolhido e a semente visual do cenário, mas a pista não representa a geometria exata da rua. Essa separação mantém a interação principal leve e disponível sem backend. O jogo não renderiza prédios, tráfego ou outros elementos 3D.

A busca do Nominatim possui fallback operacional: se a consulta falhar, a pessoa pode escolher o ponto diretamente no mapa. Se os serviços de mapa estiverem indisponíveis, o jogo não recebe novos tiles; a interface informa o estado e preserva o código da corrida já carregado.

## Como executar localmente

Na raiz do monorepo:

```bash
npm run build
python3 -m http.server 8080 --directory dist
```

Abra:

* `http://localhost:8080/` para a central.
* `http://localhost:8080/maplay/` para o MVP.

É necessário acesso à internet para carregar Leaflet, tiles do OpenStreetMap e a busca do Nominatim.

## GitHub Pages

Após o merge na branch de deploy e a execução do workflow, o projeto estará em:

`https://ronanrodrigo.github.io/lab/maplay/`

A listagem da central é atualizada automaticamente pelo processo existente a partir da presença de `index.html` e `project.json`.

## Notas, referências e limitações

A página `https://ronanrodrigo.dev/notes/tags/` foi acessada conforme solicitado. Foram aproveitados princípios pertinentes de escopo reduzido, interface clara, publicação estática e uso de tecnologias simples. A referência visual informada foi o jogo do site `hop.earth`, usada como inspiração para escolher um local real e transformar a exploração em direção, sem copiar sua implementação.

A implementação usa Leaflet, OpenStreetMap e Nominatim sem credenciais. O uso dos serviços públicos está sujeito às políticas de tiles e de geocodificação; não há pré-carregamento em massa nem download de tiles. Para uma versão pública com maior volume, deve-se contratar ou hospedar um provedor de tiles/geocodificação adequado.

Ainda não existe roteamento real, colisão com a rua, elevação, obstáculos, tráfego, multiplayer ou destino de corrida. O carro dirige em uma pista arcade simulada para validar primeiro a combinação mapa real + direção.

## Próximos passos de validação

* Observar se as pessoas entendem imediatamente que precisam clicar no mapa para posicionar o pin.
* Testar se reconhecer o ponto real aumenta a vontade de dirigir e compartilhar uma corrida.
* Integrar geometria de vias do OpenStreetMap/Overpass com simplificação e cache apropriados.
* Adicionar objetivos curtos, como alcançar um segundo pin ou completar uma distância.
* Medir escolha de locais, tempo até iniciar a corrida, uso dos botões e duração da partida.
