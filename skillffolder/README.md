# Skillffolder

MVP estático para desenvolvedores que demonstra como a skill
`architecture-guided-development` transforma uma intenção em um comando de
geração e numa estrutura de código revisável.

## Objetivo e público

O experimento ajuda desenvolvedores a entenderem o que os scripts da skill fazem
antes de executá-los. O fluxo central apresenta um pedido, o comando derivado e
um exemplo dos arquivos que o script geraria.

## Funcionalidades

- Exemplo de prompt e do comando de `generate-boilerplate.ts` que ele produz.
- Output preenchido com arquivos de entidade, gateway, serviço, adaptador e testes.
- Explicação do que acontece por baixo dos panos: interpretação, templates e proteção contra sobrescrita.

## Decisões técnicas e visuais

O projeto usa HTML e CSS vanilla, sem API, backend, banco de dados ou
credenciais. O output é um exemplo estático, pois o objetivo é explicar o fluxo
e não escrever código de fato.

O visual toma como referência uma interface editorial clara: papel leve, regras
azuis, tipografia com serifa para a tese e monoespaçada para comandos. A
composição foi recriada para destacar prompt, comando e resultado em um único
workbench, em vez de copiar a estrutura da imagem de referência.

As notas em `https://ronanrodrigo.dev/notes/tags/` foram acessadas. Foram
aproveitadas as práticas de ferramentas de IA, geração estruturada e validação
explícita; não foi usada nenhuma API externa.

## Executar localmente

Na raiz do monorepo:

```bash
npm run build
python3 -m http.server 8080 --directory dist
```

Abra `http://localhost:8080/skillffolder/`. Após o merge na branch de deploy, o
MVP estará em `https://ronanrodrigo.github.io/lab/skillffolder/`.

## Limitações e próximos passos

A geração é simulada e os botões de outros recursos apenas explicam seu escopo.
Os próximos testes com usuários devem medir se desenvolvedores entendem o comando
derivado, confiam na estrutura exibida e desejam conectar o fluxo a um repositório
local real.
