# Rir & Brincar

Projeto migrado para o monorepo [lab](https://github.com/ronanrodrigo/lab). A página está disponível em:

`https://ronanrodrigo.github.io/lab/piadas-infantis/`

No domínio personalizado:

`https://ronanrodrigo.dev/lab/piadas-infantis/`

Uma página web estática para crianças: a cada acesso, uma adivinha aleatória é exibida. A criança pode pensar na resposta, revelá-la e escolher outra.

## Fluxo principal

1. A página escolhe uma adivinha aleatória ao carregar.
2. A criança lê a pergunta e tenta responder.
3. O botão **Mostrar continuação** revela a solução.
4. O botão **Próxima** escolhe uma nova adivinha.

## Como executar

A partir da raiz do monorepo:

```bash
npm run build
python3 -m http.server 8080 --directory dist
```

Depois, abra `http://localhost:8080/piadas-infantis/`.

O projeto não possui backend, cadastro ou dependência de API. As adivinhas ficam em `jokes.js` e o fallback local em `app.js` mantém a experiência funcionando.
