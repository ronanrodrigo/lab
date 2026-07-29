# playground

Central dos projetos pessoais de Ronan Rodrigo. Cada experimento web fica em sua própria pasta e pode ser acessado em:

`https://ronanrodrigo.github.io/playground/{nome-do-projeto}/`

## Projetos

* [Rir & Brincar](./piadas-infantis/) — uma adivinha infantil por vez, com resposta escondida e novas piadas.

A listagem da página inicial é atualizada automaticamente durante o build sempre que uma nova pasta contendo `index.html` é adicionada à raiz.

## Objetivo

O MVP valida uma central simples para descobrir e abrir projetos pessoais sem cadastro, backend ou dependências de dados externos. A página inicial apresenta a proposta em poucos segundos, lista os projetos disponíveis e permite filtrá-los por nome, descrição ou tag.

## Fluxo principal

1. A pessoa acessa a página central.
2. O site carrega o manifesto dos projetos.
3. A pessoa visualiza os projetos disponíveis ou o estado vazio.
4. A pessoa pode filtrar a coleção e abrir um projeto em seu próprio endereço.

## Como executar localmente

Requisitos: Node.js 20 ou superior.

```bash
npm run build
python3 -m http.server 8080 --directory dist
```

Abra `http://localhost:8080` no navegador.

Para atualizar apenas o manifesto no diretório raiz:

```bash
npm run generate
```

## Decisões técnicas

* HTML, CSS e JavaScript vanilla para manter o MVP rápido, leve e fácil de evoluir.
* Cada projeto é identificado automaticamente pela existência de `index.html` em uma pasta da raiz.
* O arquivo opcional `project.json` fornece nome, descrição, tags e status do cartão.
* `scripts/generate-projects.mjs` gera `projects.json`; `scripts/build.mjs` monta o diretório estático `dist/`.
* O GitHub Actions publica o conteúdo de `dist/` no GitHub Pages após cada push na branch `main`.
* Não há API, banco de dados, autenticação ou dados simulados externos. Os dados da central são as próprias pastas de projetos do monorepo.

## Organização

```text
.
├── index.html
├── styles.css
├── app.js
├── projects.json
├── scripts/
├── .github/workflows/
└── {nome-do-projeto}/
```

O processo para criar novos projetos está documentado em [`agents.md`](./agents.md).

## Referências e limitações

A página `https://ronanrodrigo.dev/notes/tags/` foi acessada antes da implementação. Foram aproveitados princípios pertinentes de escopo reduzido, interface clara, organização simples e publicação estática. Nenhuma API ou credencial foi utilizada.

A listagem automática depende da execução do workflow de publicação. O GitHub Pages precisa estar configurado para usar o workflow de Actions.

## Próximos passos

* Criar mais projetos e observar se a organização por pasta e os cartões são suficientes para encontrá-los.
* Testar a central com algumas pessoas e medir quais projetos são abertos.
* Refinar metadados, tags e ordenação somente quando houver necessidade observada.
