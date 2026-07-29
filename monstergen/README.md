# monstergen

MVP estático para gerar ideias de nomes e sabores para uma bebida energética fictícia. A proposta é transformar uma tela em branco em uma combinação pronta para discutir, rascunhar ou compartilhar.

## Objetivo e problema

O projeto explora uma forma rápida de criar um conceito de sabor e nome sem começar do zero. O principal problema validado é o bloqueio inicial de quem precisa de uma faísca criativa para continuar uma conversa ou rascunho de produto.

## Público-alvo

Indefinido no briefing. O protótipo foi mantido amplo para que qualquer pessoa possa entender e testar o fluxo sem cadastro ou explicação adicional.

## Fluxo principal

1. A pessoa acessa a página.
2. Um nome e um perfil de sabor são gerados automaticamente a cada acesso.
3. A pessoa seleciona **Gerar outro** para explorar novas combinações.
4. A pessoa pode selecionar **Copiar ideia** para levar o conceito para outra conversa.

## Funcionalidades implementadas

* Geração automática no carregamento da página.
* Geração de novas combinações pelo botão principal.
* Nome, descrição curta e tags em cada resultado.
* Cópia do conceito com feedback de sucesso ou indisponibilidade.
* Layout responsivo para celular e desktop.
* Foco visível, HTML semântico e região anunciada para o resultado.

## Como executar localmente

O projeto não possui dependências de build. A partir da raiz do monorepo:

```bash
npm run build
python3 -m http.server 8080 --directory dist
```

Abra `http://localhost:8080/monstergen/`.

Para servir somente a pasta do projeto:

```bash
python3 -m http.server 8080 --directory monstergen
```

Nesse caso, abra `http://localhost:8080/`.

## Publicação

Após a publicação do monorepo no GitHub Pages, o MVP estará disponível em:

<https://ronanrodrigo.github.io/lab/monstergen/>

No domínio personalizado:

<https://ronanrodrigo.dev/lab/monstergen/>

A pasta é detectada automaticamente porque contém `index.html`. O manifesto da central é regenerado pelo workflow; `projects.json` não foi alterado manualmente.

## Decisões técnicas e dados

* HTML, CSS e JavaScript vanilla, sem framework ou dependências de runtime.
* Não há API, backend, autenticação ou banco de dados.
* Os dados são simulados localmente: 10 bases de sabor combinadas com 6 acentos geram 60 possibilidades.
* O resultado fica somente em memória e nenhum dado pessoal é salvo.
* A Clipboard API é usada quando disponível; em caso de bloqueio, a interface informa a limitação.
* Todos os recursos do projeto usam caminhos relativos para funcionar no prefixo `/lab/monstergen/`.

## Decisões visuais

A interface usa uma estética de laboratório energético, com fundo escuro, verde-lima para ação, amarelo para o resultado e rosa para pontos de atenção. A lata é uma ilustração construída com CSS, sem imagem externa. O resultado ocupa a área central e a ação principal fica disponível sem exigir navegação adicional.

O protótipo é independente e não representa um produto oficial da Monster; os nomes e sabores são fictícios.

## Limitações conhecidas

* As combinações não representam sabores reais nem disponibilidade comercial.
* O gerador não verifica nomes existentes, marcas, questões legais ou regulatórias.
* A cópia pode não funcionar em navegadores que bloqueiam a Clipboard API.
* Não há histórico, favoritos, compartilhamento por URL ou métricas nesta primeira versão.
* O público-alvo ainda não foi definido no briefing.

## Notas e referências

A página <https://ronanrodrigo.dev/notes/tags/> foi acessada antes da implementação. O conteúdo consultado reúne referências sobre IA, automação, agentes web, ferramentas e desenvolvimento. Não havia uma referência específica para geradores de sabores; foram aproveitados os princípios pertinentes de manter o escopo pequeno, usar uma interface clara e progressiva e favorecer uma implementação estática simples de publicar e evoluir.

Nenhuma referência adicional ou API foi informada no briefing.

## Próximos passos para validação

* Testar o protótipo com 5 a 10 pessoas e observar se a proposta é entendida sem explicação.
* Perguntar quais nomes parecem mais memoráveis e quais perfis de sabor parecem desejáveis.
* Medir gerações por sessão e uso do botão de copiar.
* Definir o público-alvo e ajustar vocabulário, combinações e identidade visual.
* Adicionar favoritos ou votação somente se a comparação entre ideias aparecer como necessidade real.
* Validar nomes e sabores com pesquisa de marca, viabilidade técnica e requisitos regulatórios antes de qualquer produto real.
