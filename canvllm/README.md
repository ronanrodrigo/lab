# canvllm

## Objetivo do MVP

O canvllm ajuda jovens adultos a organizar uma ideia de produto ou negócio em um Lean Canvas e, enquanto o canvas é preenchido, monta um prompt estruturado para ser usado em um agente LLM.

## Problema

Quem está começando um projeto costuma ter uma ideia interessante, mas dificuldade para transformar pensamentos soltos em hipóteses claras e em uma conversa produtiva com uma ferramenta de IA.

## Público-alvo

Jovens adultos explorando uma ideia de negócio, projeto paralelo, produto digital ou experimento pessoal.

## Fluxo principal

1. Explorar o canvas já preenchido com uma ideia de exemplo.
2. Editar ou substituir os dados dos nove blocos do Lean Canvas.
3. Configurar o papel, objetivo, tom, formato e uma regra adicional para o agente.
4. Acompanhar o prompt sendo atualizado em tempo real.
5. Copiar o prompt e colá-lo no agente LLM escolhido.
6. Usar `Limpar tudo` para começar um canvas vazio.

## Funcionalidades implementadas

* Lean Canvas com os nove blocos essenciais.
* Exemplo inicial completo sobre validação de ideias para jovens adultos.
* Indicador de progresso dos blocos preenchidos.
* Configuração do agente com objetivo, tom, formato e regra adicional.
* Geração de prompt em tempo real, incluindo somente os dados preenchidos e instruções de validação.
* Cópia do prompt para a área de transferência, com feedback visual.
* Salvamento automático do rascunho no `localStorage` do navegador.
* Limpeza completa do rascunho para iniciar uma ideia do zero.
* Layout responsivo para telas pequenas e grandes.
* Estados de rascunho vazio e em construção.

## Como executar localmente

O projeto não precisa de dependências ou etapa de build própria. A partir da raiz do repositório:

```bash
npm run build
python3 -m http.server 8080 --directory dist
```

Abra:

* `http://localhost:8080/` para a central do lab.
* `http://localhost:8080/canvllm/` para o MVP.

Também é possível abrir `index.html` diretamente no navegador para explorar a interface, embora um servidor HTTP seja recomendado para reproduzir o ambiente publicado.

## GitHub Pages

Após a publicação da branch de deploy, o projeto ficará disponível em:

`https://ronanrodrigo.github.io/lab/canvllm/`

A listagem da página central é gerada automaticamente a partir das pastas que contêm `index.html`. O `project.json` fornece os metadados exibidos na central.

## Decisões técnicas

* HTML, CSS e JavaScript vanilla foram suficientes para o fluxo e evitam dependências desnecessárias.
* Todo o código específico está dentro de `canvllm/` e os caminhos de recursos são relativos ao projeto.
* O prompt é derivado em memória a cada alteração e o estado do formulário é persistido localmente para evitar perda acidental do rascunho.
* A primeira visita carrega um exemplo completo; a chave de armazenamento foi versionada para que a atualização apareça também para quem já havia acessado a versão anterior.
* O botão `Limpar tudo` remove o exemplo e deixa o canvas vazio.
* A cópia usa a Clipboard API e apresenta uma mensagem alternativa caso o navegador bloqueie o acesso à área de transferência.

## Dados e limitações

Não há API, backend ou autenticação. Os dados iniciais são simulados e servem apenas para demonstrar o fluxo: a ideia de exemplo é um produto que ajuda jovens adultos a validar ideias. Os dados digitados posteriormente ficam somente no `localStorage` do navegador atual.

O MVP não avalia a qualidade da ideia, não conversa com um modelo LLM e não sincroniza o canvas entre dispositivos. A qualidade da resposta dependerá do agente em que o prompt for utilizado.

## Decisões visuais

A interface usa uma composição editorial com cartões coloridos para diferenciar os blocos do canvas, tipografia de alto contraste, azul como cor de ação e uma área escura dedicada ao prompt. O progresso e o feedback de cópia tornam visível o resultado de cada ação. A estrutura foi pensada para permitir exploração rápida no celular e edição confortável em telas maiores.

## Referências e notas consultadas

A página `https://ronanrodrigo.dev/notes/tags/` foi acessada antes da implementação. Ela organiza referências do autor em temas como IA, automação, ferramentas, agentes e desenvolvimento de habilidades em 2026.

Para este MVP, foi aproveitada a ênfase em agentes de IA e ferramentas: o produto separa contexto, objetivo e regras de comportamento, gerando uma instrução estruturada que pode ser levada a outro agente. A página de tags não foi usada como fonte de código ou conteúdo específico; não foram incorporadas referências adicionais porque o briefing informou `NENHUMA`.

## Próximos passos para validação

* Observar cinco jovens adultos usando o canvas sem explicação e medir onde travam.
* Comparar o tempo até a primeira hipótese clara com e sem o canvllm.
* Testar se o prompt copiado gera conversas mais úteis em diferentes agentes LLM.
* Entrevistar usuários sobre quais blocos parecem difíceis ou pouco relevantes.
* Avaliar se o exemplo inicial ajuda a entender o produto ou cria ancoragem excessiva.
* Avaliar a necessidade de templates opcionais depois de observar o uso do canvas vazio.
