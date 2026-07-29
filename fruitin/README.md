# fruitin

MVP estático mobile-first migrado do repositório [`ronanrodrigo/fruitin`](https://github.com/ronanrodrigo/fruitin) para o monorepo lab.

## Objetivo

Descobrir preferências de frutas de forma rápida, usando gestos simples e uma sequência de cards.

## Fluxo principal

* Arraste para a direita ou use `+` para **gostei**.
* Arraste para a esquerda ou use `×` para **não gostei**.
* Arraste para cima ou use `↑` para **nunca provei**.
* Abra **histórico** para consultar as três listas de decisões.
* Use **começar de novo** para limpar as decisões deste navegador.

As setas esquerda, cima e direita do teclado também executam as decisões.

## Catálogo e persistência

O catálogo contém 100 frutas em `data/fruits.json`. Frutas com emoji usam esse emoji; as demais usam uma grade visual 2x2 com quatro cores aproximadas. As decisões ficam salvas no `localStorage` do navegador.

Não há API externa, backend, autenticação ou credenciais. O projeto foi migrado como uma página estática e mantém o fallback embutido original caso o arquivo JSON não possa ser carregado.

## Executar localmente

Na raiz do monorepo:

```bash
npm run build
python3 -m http.server 8080 --directory dist
```

Abra `http://localhost:8080/fruitin/`. Para testar diretamente a pasta do projeto, também é possível executar `python3 -m http.server 8000` dentro de `fruitin/` e abrir `http://localhost:8000/`.

## GitHub Pages

Após a publicação do monorepo, acesse:

<https://ronanrodrigo.github.io/lab/fruitin/>

O manifesto da página central é gerado automaticamente pelo workflow a partir da presença de `index.html`; `projects.json` não deve ser editado manualmente.

## Decisões técnicas e visuais

* HTML, CSS e JavaScript vanilla, sem dependências ou etapa de build específica do projeto.
* Pointer Events permitem interação por toque e mouse.
* `dialog` nativo concentra o histórico e mantém o fluxo em uma única página.
* Layout responsivo mobile-first, com contraste, foco visível e controles equivalentes aos gestos.
* O visual usa uma paleta clara, cards grandes, formas arredondadas e feedback de direção durante o arraste.

## Limitações

* As cores são aproximações visuais e não identificações botânicas.
* A persistência é local ao navegador e ao dispositivo.
* O fallback existente no código está vazio; portanto, se o JSON não for carregado, a interface mostra o estado de erro original em vez de um catálogo alternativo.
* O projeto não oferece recomendação nutricional nem personalização baseada em conta.

## Referências e notas consultadas

A página <https://ronanrodrigo.dev/notes/tags/> foi acessada antes da migração. As notas disponíveis tratam principalmente de IA, automação, ferramentas e produtividade; não havia uma referência diretamente pertinente ao fluxo de descoberta de frutas. Por isso, nenhuma referência específica da página foi incorporada ao código.

## Próximos passos

Testar com 5 a 8 pessoas sem instruções, observar a compreensão dos três gestos, medir o uso do histórico e avaliar se o catálogo e o feedback visual ajudam a descobrir novas frutas. Depois, considerar um fallback de dados mais robusto e recomendações baseadas nas preferências coletadas.
