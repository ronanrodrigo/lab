# Skillffolder

MVP estático para desenvolvedores que demonstra como a skill
`architecture-guided-development` transforma uma intenção em um comando de
geração e numa estrutura de código revisável.

## Objetivo e público

O experimento ajuda desenvolvedores a entenderem o que os scripts da skill fazem
antes de executá-los. O fluxo central é editar um pedido, conferir o comando
derivado, executar uma simulação e inspecionar os arquivos que seriam gerados.

## Funcionalidades

- Campos editáveis que atualizam o comando de `generate-boilerplate.ts`.
- Simulação acessível de carregamento, erro de validação e sucesso.
- Lista de arquivos representando entidade, gateway, serviço, adaptador e testes.
- Botão para copiar o comando e navegação por teclado.

## Decisões técnicas e visuais

O projeto usa HTML, CSS e JavaScript vanilla, sem API, backend, banco de dados ou
credenciais. Os resultados são dados simulados em memória, pois o objetivo é
validar a explicação do fluxo e não escrever código de fato.

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
