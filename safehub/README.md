# Safe Hub

## Objetivo do MVP

O Safe Hub é uma central de segurança pessoal para pessoas em cidades grandes, turistas e moradores. O protótipo valida a ideia de reunir, em uma experiência simples, pedido de ajuda, registros de áudio e vídeo, compartilhamento de localização, telefones úteis e alertas da comunidade.

## Problema

Em uma situação de risco, alternar entre câmera, telefone, mapas e aplicativos de mensagem aumenta o tempo e a carga cognitiva. O Safe Hub concentra as ações essenciais e deixa visível o que acontece em cada etapa.

## Público-alvo

Pessoas que vivem ou circulam em grandes cidades, incluindo turistas e moradores que querem compartilhar uma viagem, registrar uma situação ou acionar contatos de confiança rapidamente.

## Fluxo principal

1. A pessoa abre o dashboard e encontra o botão do pânico em destaque.
2. Pode acionar um alerta com contagem regressiva e cancelar antes do envio.
3. O protótipo mostra o envio de push, SMS e localização aos contatos como simulação.
4. Para prevenção, a pessoa compartilha localização ou viagem, grava áudio/vídeo e consulta avisos de ambientes inseguros.
5. Em uma emergência, acessa telefones úteis e pode ligar diretamente pelos números listados.

## Funcionalidades implementadas

* Botão do pânico com contagem regressiva, cancelamento e estado de sucesso.
* Círculo de contatos de confiança salvo em `localStorage`.
* Gravação de áudio usando `MediaRecorder` quando o navegador permite, com fallback mockado.
* Compartilhamento de arquivo de áudio simulado.
* Transcrição, live stream, checkpoints e integração com Uber apresentadas como recursos Plus mockados.
* Captura de vídeo com câmera e download de WebM quando há permissão; fallback mockado quando não há.
* Compartilhamento de localização com `navigator.geolocation` e localização aproximada mockada como fallback.
* Compartilhamento de viagem e indicação de detecção de acidente disponível no fluxo.
* Dez telefones/serviços úteis simulados, com busca, filtro por região e links `tel:`.
* Dez avisos de ambientes inseguros simulados, além de formulário para novos avisos persistidos localmente.
* Layout responsivo, navegação por teclado, foco visível, textos semânticos e estados de feedback.

## Como executar localmente

Na raiz do monorepo:

```bash
npm run build
python3 -m http.server 8080 --directory dist
```

Acesse:

* Central: `http://localhost:8080/`
* Safe Hub: `http://localhost:8080/safehub/`

Também é possível abrir `safehub/index.html` diretamente, mas um servidor HTTP é recomendado para testar APIs do navegador, câmera e microfone.

## GitHub Pages

Após o merge na branch `main` e a execução do workflow de publicação, o projeto estará disponível em:

`https://ronanrodrigo.github.io/lab/safehub/`

O build detecta automaticamente qualquer pasta com `index.html` e atualiza o manifesto. `projects.json` não deve ser editado manualmente.

## Decisões técnicas

O MVP usa somente HTML, CSS e JavaScript vanilla. Não há dependências, backend, autenticação ou etapa de build específica do projeto. Isso mantém o experimento compatível com o workflow existente do monorepo e permite validar o fluxo rapidamente.

Recursos do navegador são usados progressivamente: `MediaRecorder` para áudio/vídeo, `getUserMedia` para câmera/microfone e `geolocation` para localização. APIs que exigem backend ou credenciais — push, SMS, live stream, integração Uber, widget nativo e detecção real de acidente — são representadas por estados e avisos mockados. Nenhuma chave ou credencial foi incluída.

## Dados e limitações

Os dez avisos e dez registros de telefones são dados simulados para fallback. Contatos e novos avisos ficam no `localStorage` do navegador. A gravação real depende de HTTPS/permissão e não funciona em todos os contextos. O compartilhamento de localização é apenas uma demonstração visual; o protótipo não envia links reais. O botão do pânico não dispara SMS, push ou chamadas automaticamente. A detecção de acidente não analisa sensores e deve ser tratada como conceito, não como recurso de segurança real.

## Decisões visuais

A interface usa fundo azul-marinho de alto contraste, verde-lima para ações de segurança e estados positivos, coral para risco/pânico e roxo para mídia. O botão de pânico é sempre acessível no dashboard e na navegação inferior. Cards curtos, linguagem direta, contagem regressiva e avisos de mock deixam claro o que é ação real do navegador e o que é parte da validação do conceito.

## Referências e notas consultadas

A página `https://ronanrodrigo.dev/notes/tags/` foi acessada antes da implementação. Ela reúne notas sobre ferramentas de IA, automação web, agentes e práticas de desenvolvimento. Não havia uma especificação visual direta para um produto de segurança, mas foram aproveitadas as ideias pertinentes de prototipação rápida, uso de recursos open source/sem credenciais e fallback local para manter o fluxo demonstrável.

A referência adicional informada no briefing foi a experiência de recursos de segurança da Uber. Ela inspirou a combinação de compartilhamento de viagem/localização, acesso rápido a ajuda e acompanhamento de uma jornada. O Safe Hub não usa APIs ou marcas da Uber.

## Próximos passos para validar com usuários

* Observar turistas e moradores concluindo o acionamento do pânico sem instruções.
* Medir o tempo até encontrar o botão do pânico e até compartilhar a localização.
* Testar se os avisos de mock são compreensíveis e confiáveis.
* Entrevistar usuários sobre o equilíbrio entre gravação discreta, privacidade e consumo de bateria.
* Validar quais recursos Plus realmente justificam pagamento.
* Em uma próxima etapa, testar um app nativo com backend seguro, push/SMS, contatos consentidos, criptografia, retenção de mídia, integração de viagens e revisão jurídica. Este protótipo não substitui serviços oficiais de emergência.
