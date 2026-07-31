# LiveFlow — pitch de live shopping

Pitch visual e demo navegável de uma plataforma que transforma transmissões ao vivo em experiências de compra.

## Objetivo

Este projeto deixou de ser apenas um guia sobre live shopping e passou a funcionar como um pitch de produto. A página apresenta a tese, o problema, o fluxo da solução, os públicos beneficiados, o modelo de entrada no mercado e uma demonstração interativa da experiência.

A mensagem central é: **a live deixa de ser conteúdo e vira o momento da compra**.

## Problema

Marcas e criadores já usam transmissões para demonstrar produtos e conversar com a audiência. Porém, quando o produto, o chat e o checkout estão separados, a intenção de compra se perde entre a descoberta e a transação.

## Proposta

O LiveFlow é uma camada de comércio sobre qualquer transmissão. A plataforma conecta:

* Player de vídeo e produto em destaque.
* Chat, reações e moderação em tempo real.
* Catálogo, estoque, cupons e ofertas.
* Carrinho e checkout contextual.
* Métricas de audiência, engajamento e conversão.
* Operação de estúdio, host e produção como serviço.

## Público-alvo

* Marcas e varejistas de moda, beleza, casa e eletrônicos.
* Influenciadores e hosts com audiência própria.
* Agências e estúdios de produção audiovisual.
* Negócios locais de Joinville que querem testar live commerce com uma operação enxuta.

## Roteiro do pitch

1. **O problema:** a audiência está na live, mas a conversão está espalhada em outras telas.
2. **A proposta:** uma loja viva em cima da transmissão, sem interromper a conversa.
3. **Como funciona:** atrair, demonstrar, engajar e converter em um único fluxo.
4. **A demo:** a pessoa escolhe um produto, pergunta no chat, reage e adiciona ao carrinho.
5. **O produto:** três experiências conectadas para marca, audiência e operação.
6. **Go-to-market:** começar como serviço de estúdio, evoluir para pacotes recorrentes e, depois, plataforma própria.
7. **Próximo passo:** uma live piloto com três marcas locais e duração de trinta minutos.

## Funcionalidades da demo

* Troca do produto em destaque.
* Adição de produtos ao carrinho.
* Carrinho lateral com subtotal, cupom ilustrativo e checkout demonstrativo.
* Chat local com envio de perguntas e resposta simulada da host.
* Reações com contador e feedback visual.
* Layout responsivo para desktop e dispositivos móveis.
* Navegação por âncoras, menu móvel, foco visível e suporte a `prefers-reduced-motion`.

## Como executar localmente

O projeto usa apenas HTML, CSS e JavaScript vanilla. A partir da raiz do monorepo:

```bash
npm run build
python3 -m http.server 8080 --directory dist
```

Acesse:

```text
http://localhost:8080/live-shopping/
```

## Publicação

O projeto está em `live-shopping/` e contém o `index.html` exigido pela automação do monorepo. O workflow de GitHub Pages publica a aplicação em:

<https://ronanrodrigo.github.io/lab/live-shopping/>

O cartão da página central é gerado a partir de `project.json`. `projects.json` não foi alterado manualmente.

## Decisões técnicas

* HTML, CSS e JavaScript vanilla, sem dependências externas ou etapa de build própria.
* O vídeo é uma composição visual de CSS para que o pitch funcione sem serviço externo.
* Produtos, mensagens, audiência e métricas são simulados em memória.
* Não há API, backend, autenticação, banco de dados ou credenciais.
* Os recursos usam caminhos relativos para funcionar em `/lab/live-shopping/`.
* A interação foi mantida pequena e intencional: ela existe para provar o fluxo do produto, não para simular toda a infraestrutura.

## Dados e limitações

A demo não transmite vídeo real, não sincroniza estoque e não realiza pagamentos. O checkout é apenas um próximo passo visual do pitch. O chat não possui persistência nem moderação de servidor.

As informações comerciais do material de briefing — como serviços de estúdio, equipe, integrações possíveis, gateways e modelos de cobrança — foram usadas para estruturar o pitch, não como promessa de disponibilidade da plataforma.

## Decisões visuais

A interface foi reorganizada para leitura de apresentação: cada seção responde a uma pergunta típica de pitch — qual é o problema, qual é a proposta, como funciona, quem se beneficia, como começar e qual é o próximo passo.

O roxo identifica a marca e a camada de produto; o verde-lima marca ação, vida e conversão; o fundo escuro concentra a narrativa da plataforma e da demo. Cards numerados, frases curtas, setas e blocos de fluxo ajudam a apresentar a ideia em poucos minutos.

## Referências utilizadas

A página <https://ronanrodrigo.dev/notes/tags/> foi acessada antes da implementação. Ela não tinha uma referência diretamente relacionada a live commerce. Foi aproveitada a organização por temas e a apresentação progressiva de informação.

Também foram pesquisadas referências sobre live shopping e experiência de compra:

* [Nielsen Norman Group — How to Create a Successful Livestream-Ecommerce Experience](https://www.nngroup.com/articles/successful-livestream-ecommerce-guidelines/): redução do esforço de compra, recompensas e suporte.
* [McKinsey — How live commerce is transforming the shopping experience](https://www.mckinsey.com.br/en/capabilities/mckinsey-digital/our-insights/its-showtime-how-live-commerce-is-transforming-the-shopping-experience): combinação de entretenimento, interação e venda.
* [Stream — Live Commerce Explained](https://getstream.io/blog/live-commerce/): vídeo de baixa latência, chat, reações, produtos marcados e métricas.
* [commercetools — Live commerce engagement best practices](https://commercetools.com/blog/live-commerce-engagement-best-practices): roteiro, demonstração, interação, urgência e análise.
* [Live.S](https://lives.app.br/): referência brasileira de compra durante a transmissão.

Nenhuma dessas fontes é integrada ao código.

## Próximos passos

1. Apresentar este pitch a três marcas ou lojas de Joinville.
2. Produzir uma live piloto de trinta minutos com uma categoria específica.
3. Medir descoberta, perguntas, cliques no produto, adição ao carrinho, conclusão e retorno.
4. Validar se o valor está na produção como serviço, no software ou na combinação dos dois.
5. Só depois priorizar integrações reais com e-commerce, pagamentos, estoque e analytics.
