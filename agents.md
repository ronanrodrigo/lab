# Guia para novos projetos

Este repositório é um monorepo de experimentos web estáticos. Cada projeto deve viver em uma pasta própria na raiz e ser publicado em:

`https://ronanrodrigo.github.io/playground/{nome-do-projeto}/`

## Criando um projeto

1. Crie uma pasta na raiz usando um nome curto, minúsculo e com hífens:

    ```text
    meu-projeto/
    ```

2. Adicione um `index.html` dentro dela. Esse arquivo é obrigatório: a automação usa a presença dele para identificar a pasta como um projeto publicável.

3. Mantenha CSS, JavaScript, imagens e fontes do projeto dentro da própria pasta. Use caminhos relativos, por exemplo `./styles.css`, para que o projeto funcione no endereço com prefixo `/playground/`.

4. Adicione um `project.json` para personalizar o cartão exibido na página inicial:

    ```json
    {
      "name": "Nome apresentado",
      "description": "Uma frase curta explicando o experimento.",
      "tags": ["web", "protótipo"],
      "status": "experimento"
    }
    ```

    Todos os campos são opcionais. Sem `project.json`, o nome da pasta será usado e o projeto aparecerá como `experimento`.

5. Teste localmente:

    ```bash
    npm run build
    python3 -m http.server 8080 --directory dist
    ```

    Depois, abra `http://localhost:8080`.

6. Faça commit e push. O GitHub Actions irá gerar novamente o manifesto de projetos e publicar o monorepo no GitHub Pages.

## Convenções

* Não adicione tokens, chaves, dados pessoais ou credenciais ao repositório.
* Prefira páginas estáticas sem backend para manter os experimentos simples e independentes.
* Garanta que o fluxo principal funcione em telas pequenas e grandes.
* Inclua estados de carregamento, vazio, erro e sucesso quando forem relevantes ao experimento.
* Não altere `scripts/`, `app.js` ou `projects.json` para cadastrar manualmente um projeto. O manifesto é gerado automaticamente a partir das pastas com `index.html`.
* Não crie pastas de projeto para arquivos compartilhados. Diretórios começando com ponto e as pastas de infraestrutura são ignorados pelo gerador.
