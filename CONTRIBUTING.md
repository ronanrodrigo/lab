# Como contribuir

O `lab` é um monorepo de projetos web estáticos. Contribuições devem preservar o escopo simples, a independência dos projetos e a publicação automática no GitHub Pages.

## Antes de contribuir

* Leia o [`README.md`](./README.md) e o [`agents.md`](./agents.md).
* Verifique issues e pull requests existentes para evitar trabalho duplicado.
* Para um projeto novo, crie uma pasta própria na raiz com um `index.html`.

## Novos projetos

Cada projeto deve:

* Viver em uma pasta com nome curto, minúsculo e separado por hífens.
* Usar caminhos relativos para funcionar em `/lab/{nome-do-projeto}/`.
* Incluir um `project.json` quando precisar de nome, descrição, tags ou status personalizados.
* Ser independente de backend, API, autenticação e credenciais, salvo quando a proposta exigir explicitamente outra solução.
* Funcionar em telas pequenas e grandes.

O manifesto `projects.json` é gerado pela automação. Não o edite manualmente para cadastrar projetos.

## Testes locais

Requisitos: Node.js 20 ou superior.

```bash
npm run build
python3 -m http.server 8080 --directory dist
```

Valide a central e o projeto alterado em `http://localhost:8080`. Confira também os estados e interações principais no celular e no desktop.

## Pull requests

* Use um título objetivo, no imperativo ou no formato convencional, por exemplo `feat: add new project`.
* Explique o que mudou, por que mudou e como foi validado.
* Inclua screenshots ou gravações quando a alteração for visual.
* Mantenha cada pull request focado em uma mudança relacionada.
* Não inclua tokens, chaves, credenciais ou dados pessoais.
* Aguarde a execução do GitHub Actions antes do merge.

Ao contribuir, você concorda com o [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md).
