# bcanv

## Objetivo do MVP

O bcanv é um Business Model Canvas estático, mobile first, para ajudar uma pessoa a visualizar como um negócio cria, entrega e captura valor em uma única página.

## Problema

Ideias de negócio costumam ficar espalhadas em anotações e conversas. O canvas organiza essas hipóteses em um quadro visual, facilitando a identificação de conexões, lacunas e próximos passos.

## Público-alvo

Não definido no briefing. O MVP foi desenhado para qualquer pessoa que esteja estruturando ou revisando um modelo de negócio.

## Fluxo principal

1. Preencher os nove blocos do Business Model Canvas.
2. Adicionar uma ideia por linha nos blocos que comportam várias hipóteses.
3. Acompanhar o percentual de preenchimento e a contagem de ideias.
4. Ler a revisão automática para identificar blocos ainda vazios.
5. Usar `Ver exemplo` para entender o formato ou `Limpar` para começar do zero.

## Funcionalidades implementadas

* Nove blocos clássicos do Business Model Canvas.
* Layout mobile first com reorganização em duas colunas e quadro completo em telas maiores.
* Contagem de ideias por bloco.
* Percentual geral de preenchimento.
* Revisão contextual com indicação de lacunas e estado do canvas.
* Dados de exemplo sobre um marketplace de produtos locais e autorais.
* Botão para carregar o exemplo.
* Botão para limpar o canvas.
* Salvamento automático no `localStorage` do navegador.
* Feedback de foco, contraste e labels acessíveis.

## Como executar localmente

O projeto não possui dependências ou etapa de build própria. A partir da raiz do monorepo:

```bash
npm run build
python3 -m http.server 8080 --directory dist
```

Abra:

* `http://localhost:8080/` para a central do lab.
* `http://localhost:8080/bcanv/` para o projeto.

## GitHub Pages

Depois da publicação pelo workflow do repositório, o projeto ficará disponível em:

`https://ronanrodrigo.github.io/lab/bcanv/`

A pasta será identificada automaticamente porque contém `index.html`. O manifesto da central será gerado pelo processo existente; `projects.json` não foi alterado manualmente.

## Decisões técnicas

* HTML, CSS e JavaScript vanilla foram usados para manter o protótipo leve e compatível com o processo de publicação atual.
* O layout foi projetado primeiro para telas pequenas e expande progressivamente para tablets e desktops.
* Os dados são mantidos no navegador com `localStorage`; não há backend, autenticação ou sincronização.
* O estado de revisão é derivado do preenchimento e não tenta avaliar a viabilidade real do modelo.
* Não foi criada uma cópia da página central e nenhum arquivo compartilhado foi alterado.

## Dados e limitações

Não há API ou fonte externa de dados. O canvas inicia vazio. O botão `Ver exemplo` carrega dados simulados para demonstrar o fluxo. O exemplo não representa recomendação de negócio e pode ser apagado a qualquer momento.

O MVP não oferece exportação, colaboração, login, análise financeira ou validação com clientes reais. O `localStorage` é específico do navegador e do dispositivo atual.

## Decisões visuais

A interface usa verde escuro como cor de orientação e cartões em tons suaves para diferenciar os blocos sem depender apenas da cor. A hierarquia segue uma abordagem editorial compacta: título curto, canvas como foco principal, progresso visível e uma revisão final de baixo atrito. Os campos usam fonte de 16px em telas pequenas para evitar zoom automático ao tocar no formulário.

## Referência consultada

A página `https://canvas-apps.pr.sebrae.com.br` foi informada como inspiração. Ela não foi usada como fonte de código nem houve cópia de identidade visual. O bcanv aproveita apenas a ideia pertinente de um canvas de modelo de negócio visual e organizado.

A página obrigatória `https://ronanrodrigo.dev/notes/tags/` também foi acessada antes da implementação. Suas referências sobre ferramentas, agentes e automação não exigiam integração neste projeto; a prática aproveitada foi manter o MVP estático, simples, independente de serviços externos e com foco em uma experiência direta.

## Próximos passos para validação

* Observar pessoas preenchendo o canvas em um celular sem instrução adicional.
* Medir quais blocos são preenchidos primeiro e onde surgem dúvidas.
* Entrevistar usuários sobre a utilidade da revisão automática.
* Testar se a contagem por ideia ajuda a tornar as hipóteses mais concretas.
* Avaliar exportação ou compartilhamento somente depois de validar o fluxo básico.
