# Notas

Versão estática das notas pessoais, migrada para o monorepo [playground](https://github.com/ronanrodrigo/playground).

A página está disponível em:

`https://ronanrodrigo.github.io/playground/notes/`

## Fonte dos dados

A listagem é carregada sempre em tempo de execução pela URL remota:

`https://raw.githubusercontent.com/ronanrodrigo/notes/refs/heads/main/index.json`

O projeto não mantém uma cópia local do índice. Assim, novos posts publicados no repositório `notes` aparecem automaticamente na página quando o navegador carrega a fonte atualizada.

O `index.json` fornece `date`, `slug` e `path`. O título e o resumo exibidos são derivados desses dados quando esses campos não estão presentes; o link **ver fonte** aponta para o arquivo correspondente no repositório original.

## Fluxo

* Carregar a lista remota de notas.
* Buscar por título, slug, caminho ou data.
* Abrir a fonte original no GitHub.
* Exibir estados de carregamento, sucesso, vazio e erro.

## Decisão de migração

O projeto original usa Jekyll e Markdown. Para manter o monorepo simples e compatível com o build estático atual, esta versão usa HTML, CSS e JavaScript sem dependências de backend ou de Jekyll. A página mantém o índice de notas e o filtro de busca em uma adaptação leve para o GitHub Pages.

A fonte original continua disponível em [github.com/ronanrodrigo/notes](https://github.com/ronanrodrigo/notes).
