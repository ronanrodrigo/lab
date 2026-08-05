# Roteiro de Setup — Contas de Afiliados

> Guia passo a passo para criar e vincular cada conta de afiliado.
> Site: `https://ronanrodrigo.github.io/lab/links-afiliados/`
> Atualizado em: 05/08/2026

---

## Índice

1. [Amazon Associates Brasil](#1-amazon-associates-brasil)
2. [Mercado Livre Afiliados](#2-mercado-livre-afiliados)
3. [Magalu Parceiro](#3-magalu-parceiro)
4. [Shopee Afiliados](#4-shopee-afiliados)
5. [AliExpress Affiliate](#5-aliexpress-affiliate)
6. [Hotmart Afiliados](#6-hotmart-afiliados)
7. [Monetizze Afiliados](#7-monetizze-afiliados)
8. [Eduzz Afiliados](#8-eduzz-afiliados)
9. [Kiwify Afiliados](#9-kiwify-afiliados)
10. [ClickBank](#10-clickbank)
11. [Lomadee](#11-lomadee)
12. [Awin](#12-awin)
13. [Booking.com Affiliate](#13-bookingcom-affiliate)
14. [Hostinger Afiliados](#14-hostinger-afiliados)
15. [DigitalOcean Referral](#15-digitalocean-referral)
16. [Microsoft Affiliate](#16-microsoft-affiliate)
17. [Adobe Affiliate](#17-adobe-affiliate)
18. [Rakuten Advertising](#18-rakuten-advertising)

---

## 1. Amazon Associates Brasil

### Pré-requisitos
- [ ] Site/blog ativo (URL necessária para signup)
- [ ] CPF ou CNPJ
- [ ] Conta bancária brasileira para recebimento

### Passo a passo
1. Acesse https://associados.amazon.com.br
2. Clique em "Cadastre-se agora"
3. Use sua conta Amazon existente ou crie uma nova
4. Preencha dados:
   - Nome completo
   - Endereço
   - CPF ou CNPJ
   - URL do site: `https://ronanrodrigo.github.io/lab/links-afiliados/`
   - Descrição do site: "Site de curadoria de produtos com reviews e recomendações"
5. Escolha o ID do afiliado (ex: `ronanrodrigo-20`)
6. Aguarde aprovação automática inicial (imediatamente ativo)
7. **⚠️ IMPORTANTE:** Você precisa gerar **3 vendas qualificadas em 180 dias** ou a conta será desativada
8. Após aprovação, acesse o dashboard em https://associados.amazon.com.br

### Como gerar links
- **Ferramenta web:** Site Stripe (barra de ferramentas que aparece ao navegar na Amazon logado como afiliado)
- **Deep linking:** Adicione `?tag=seutag-20` a qualquer URL da Amazon
- **API:** Product Advertising API 5.0 (PA-API 5.0) — https://webservices.amazon.com.br/paapi5/documentation/

### MCP / Automação
- **MCP Server:** `heikowagner/amazon-affiliate-mcp` — https://github.com/heikowagner/amazon-affiliate-mcp
  - Busca de produtos, geração de links, deals, bestsellers em 20 países
  - Instalação: `npx @heikowagner/amazon-affiliate-mcp`
- **MCP Server:** `agalliani/amazon-associates-mcp` — https://github.com/agalliani/amazon-associates-mcp
  - Consulta ganhos, cliques e pedidos do painel Associates
- **MCP Server:** `JanNafta/amazon-mcp` — https://github.com/JanNafta/amazon-mcp
  - Busca de produtos, histórico de preços, rastreamento de deals
- **API Oficial:** PA-API 5.0 (requer credenciais AWS + AssociateTag)

### Comissão
- Taxa: Até 15% (varia por categoria — eletrônicos ~3%, moda/beleza ~8%, Kindle até 15%)
- Cookie: 24h (carrinho: 90 dias após adicionar)
- Pagamento mínimo: R$ 50
- Pagamento: ~60 dias após o fim do mês de referência

---

## 2. Mercado Livre Afiliados

### Pré-requisitos
- [ ] Conta Mercado Livre ativa
- [ ] CPF ou CNPJ

### Passo a passo
1. Acesse https://www.mercadolivre.com.br/afiliados
2. Faça login com sua conta Mercado Livre
3. Complete o cadastro de afiliado
4. Preencha dados financeiros (CPF/CNPJ, conta bancária)
5. Descreva seu canal: `https://ronanrodrigo.github.io/lab/links-afiliados/`
6. Aguarde aprovação

### Como gerar links
- **Painel:** Ferramenta de criação de links no dashboard de afiliados
- **Deep linking:** Links diretos para produtos com tracking automático

### MCP / Automação
- **API Oficial:** https://developers.mercadolivre.com.br (REST, OAuth2, SDKs em PHP/Python/.NET/Java)
- **MCP Server:** Não encontrado

### Comissão
- Taxa: ~3-8% (varia por categoria)
- Cookie: 30 dias
- Pagamento mínimo: R$ 50

---

## 3. Magalu Parceiro

### Pré-requisitos
- [ ] CPF ou CNPJ
- [ ] Site ou canal de vendas

### Passo a passo
1. Acesse https://www.parceiromagalu.com.br
2. Clique em "Quero ser parceiro"
3. Cadastre-se com email e senha
4. Preencha dados pessoais (CPF/CNPJ)
5. Adicione URL do site: `https://ronanrodrigo.github.io/lab/links-afiliados/`
6. Aguarde aprovação

### Como gerar links
- **Painel:** Ferramenta de deep-link no dashboard do parceiro
- **API:** Magalu Cloud API / Plugin SDK

### MCP / Automação
- **API:** https://github.com/luizalabs (SDKs e ferramentas da Luizalabs)
- **MCP Server:** Não encontrado

### Comissão
- Taxa: Variável por produto/categoria
- Cookie: ~30 dias
- Pagamento mínimo: R$ 100

---

## 4. Shopee Afiliados

### Pré-requisitos
- [ ] Conta Shopee ativa
- [ ] Sem exigência de site (aceita redes sociais)

### Passo a passo
1. Acesse https://affiliate.shopee.com.br
2. Faça login com sua conta Shopee
3. Complete o cadastro de afiliado
4. Descreva seu canal de divulgação
5. Aguarde aprovação (geralmente automática)

### Como gerar links
- **App Shopee:** Botão "Copiar link de afiliado" em qualquer produto
- **Painel web:** Ferramenta de criação de links curtos
- **API:** Shopee Open Platform — https://open.shopee.com

### MCP / Automação
- **API Oficial:** https://open.shopee.com (API REST para parceiros/afiliados)
- **MCP Server:** Não encontrado

### Comissão
- Taxa: 3-20% (varia por categoria e promoções)
- Cookie: 7-30 dias
- Pagamento mínimo: US$ 10

---

## 5. AliExpress Affiliate

### Pré-requisitos
- [ ] Conta AliExpress
- [ ] Sem exigência de site

### Passo a passo
1. Acesse https://portals.aliexpress.com
2. Clique em "Affiliate Program"
3. Cadastre-se com email
4. Descreva seu canal
5. Aprovação geralmente automática

### Como gerar links
- **Portal:** Ferramenta de deep-link no painel de afiliados
- **API:** AliExpress Affiliate API (consulta de produtos + push de pedidos S2S)

### MCP / Automação
- **API Oficial:** https://portals.aliexpress.com (documentação no portal)
- **MCP Server:** Não encontrado
- **SDK:** `aliexpress-affiliate` (npm, wrapper não-oficial)

### Comissão
- Taxa: Até 9% (hot products até 90%)
- Cookie: 3-30 dias
- Pagamento mínimo: US$ 10

---

## 6. Hotmart Afiliados

### Pré-requisitos
- [ ] Conta Hotmart gratuita
- [ ] Sem exigência de site
- [ ] CPF (para saques via Pix)

### Passo a passo
1. Acesse https://www.hotmart.com/pt-br/afiliados
2. Clique em "Começar agora"
3. Cadastre-se com email ou Google
4. Complete perfil (nome, CPF, telefone)
5. Configure conta bancária / chave Pix
6. Navegue no Marketplace para encontrar produtos
7. Clique em "Afiliar-se" em produtos de interesse
8. Gere seu link de afiliado (Hotlink)

### Como gerar links
- **Marketplace:** Cada produto tem um botão "Gerar Hotlink" que cria seu link de afiliado
- **API:** Hotmart Developers API — https://developers.hotmart.com/docs/pt-BR/

### MCP / Automação
- **API Oficial:** https://developers.hotmart.com/docs/pt-BR/ (OAuth2, APIs de Vendas, Área de Membros, Assinaturas, Webhooks)
- **MCP Server:** Não encontrado (pesquisa limitada por rate-limit)

### Comissão
- Taxa: 5-80% (definida pelo produtor — muitos oferecem 40-50%)
- Cookie: Cookie + rastreamento por IP (efetivamente permanente)
- Pagamento mínimo: R$ 1 (saque via Pix)

---

## 7. Monetizze Afiliados

### Pré-requisitos
- [ ] Conta Monetizze gratuita
- [ ] CPF ou CNPJ
- [ ] Sem exigência de site

### Passo a passo
1. Acesse https://www.monetizze.com.br/afiliados
2. Clique em "Cadastre-se"
3. Preencha email, nome, CPF/CNPJ
4. Configure chave Pix para recebimento
5. Navegue no marketplace de produtos
6. Solicite afiliação a produtos de interesse

### Como gerar links
- **Painel:** Geração de links de afiliado direto no dashboard
- **API:** Documentação de API disponível no painel Monetizze

### MCP / Automação
- **API Oficial:** Documentação via painel (REST, webhooks)
- **MCP Server:** Não encontrado

### Comissão
- Taxa: 5-80% (definida pelo produtor)
- Cookie: Cookie + IP
- Pagamento mínimo: R$ 50 (saque via Pix)

---

## 8. Eduzz Afiliados

### Pré-requisitos
- [ ] Conta Eduzz gratuita
- [ ] CPF ou CNPJ
- [ ] Sem exigência de site

### Passo a passo
1. Acesse https://www.eduzz.com
2. Clique em "Criar conta"
3. Selecione "Quero ser afiliado"
4. Preencha dados pessoais (nome, email, CPF)
5. Configure conta bancária / chave Pix
6. Navegue no marketplace
7. Solicite afiliação a produtos

### Como gerar links
- **Painel:** Geração de links no dashboard
- **API:** Documentação de API no rodapé de eduzz.com

### MCP / Automação
- **API Oficial:** https://www.eduzz.com (link "Documentação de API" no rodapé)
- **MCP Server:** Não encontrado

### Comissão
- Taxa: 5-80% (definida pelo produtor)
- Cookie: Cookie + IP
- Pagamento mínimo: R$ 50 (saque via Pix)

---

## 9. Kiwify Afiliados

### Pré-requisitos
- [ ] Conta Kiwify gratuita
- [ ] CPF ou CNPJ
- [ ] Sem exigência de site

### Passo a passo
1. Acesse https://kiwify.com.br
2. Clique em "Criar conta"
3. Preencha email, nome, CPF
4. Configure chave Pix para saques
5. Acesse o marketplace de produtos
6. Solicite afiliação a produtos de interesse

### Como gerar links
- **Painel:** Geração de links de afiliado no dashboard
- **Webhooks:** Disponíveis para produtores (não para afiliados)

### MCP / Automação
- **API:** Parcial — webhooks para produtores, sem API pública completa para afiliados
- **MCP Server:** Não encontrado

### Comissão
- Taxa: 5-80% (definida pelo produtor)
- Cookie: Cookie + IP
- Pagamento mínimo: R$ 1 (saque via Pix em 2 dias)

---

## 10. ClickBank

### Pré-requisitos
- [ ] Conta ClickBank gratuita
- [ ] Sem exigência de site

### Passo a passo
1. Acesse https://www.clickbank.com/affiliates/
2. Clique em "Sign Up"
3. Preencha dados pessoais (nome, email, país)
4. Configure método de pagamento (PayPal, depósito direto, cheque)
5. Aguarde aprovação (geralmente automática para marketplace)
6. Navegue no marketplace (4.000+ produtos)
7. Clique em "Promote" para gerar seu hoplink

### Como gerar links
- **Marketplace:** Cada produto tem um botão "Promote" que gera o hoplink
- **API:** ClickBank API 2.0 (analytics, vendas, marketplace)

### MCP / Automação
- **API Oficial:** ClickBank API 2.0 (documentação no painel)
- **MCP Server:** Não encontrado

### Comissão
- Taxa: Até 90% do valor do produto
- Cookie: 60 dias
- Pagamento mínimo: US$ 10

---

## 11. Lomadee

### Pré-requisitos
- [ ] Cadastro gratuito
- [ ] Aceita Instagram, TikTok ou YouTube (sem site obrigatório)

### Passo a passo
1. Acesse https://www.lomadee.com.br/pt-br
2. Clique em "Cadastre-se"
3. Escolha tipo de cadastro: site, Instagram, TikTok ou YouTube
4. Preencha email e senha
5. Complete perfil (CPF, telefone)
6. Configure chave Pix para recebimento
7. Navegue entre 300+ varejistas brasileiros
8. Escolha produtos e gere links rastreáveis

### Como gerar links
- **Painel:** Ferramenta de deep-link no dashboard
- **API:** API Lomadee para links rastreáveis, cupons e dashboard

### MCP / Automação
- **API Oficial:** Disponível via painel (links rastreáveis, cupons, performance)
- **MCP Server:** Não encontrado

### Comissão
- Taxa: Variável por loja/anunciante (300+ varejistas)
- Cookie: 30 dias
- Pagamento mínimo: R$ 50 (saque via Pix — "em dias, não em 60")

---

## 12. Awin

### Pré-requisitos
- [ ] Site qualificado ou canal de conteúdo
- [ ] Aprovação manual da rede + aprovação por anunciante

### Passo a passo
1. Acesse https://www.awin.com/br
2. Clique em "Become a Publisher"
3. Preencha dados do site/canal:
   - URL: `https://ronanrodrigo.github.io/lab/links-afiliados/`
   - Descrição do conteúdo
   - Tráfego estimado
4. Aguarde aprovação manual da Awin (pode levar dias)
5. Após aprovado, navegue no marketplace de anunciantes
6. Aplique individualmente para cada anunciante (ex: Dafiti, Netshoes, Decolar)
7. Após aprovação do anunciante, gere deep-links

### Como gerar links
- **Painel:** "Deep Link Generator" para qualquer URL de anunciante
- **API:** Awin Publisher API

### MCP / Automação
- **API Oficial:** https://ui.awin.com (REST API para links, transações, relatórios)
- **MCP Server:** `Scientia07/Luno-MCP-Affiliate` — https://github.com/Scientia07/Luno-MCP-Affiliate

### Comissão
- Taxa: Variável por anunciante (moda 5-12%, travel 3-8%)
- Cookie: 30-90 dias (varia por anunciante)
- Pagamento mínimo: US$ 20

---

## 13. Booking.com Affiliate

### Pré-requisitos
- [ ] Site qualificado
- [ ] Aprovação manual

### Passo a passo
1. Acesse https://www.booking.com/affiliate-program
2. Clique em "Become an affiliate"
3. Cadastre-se com email
4. Adicione URL do site: `https://ronanrodrigo.github.io/lab/links-afiliados/`
5. Descreva o conteúdo e público
6. Aguarde aprovação manual
7. Após aprovação, acesse o painel de afiliados

### Como gerar links
- **Painel:** Deep-link builder para propriedades, cidades e buscas
- **Widgets:** Widgets de busca e mapas embeddables
- **API:** Booking.com Demand API

### MCP / Automação
- **API Oficial:** https://developers.booking.com (Demand API, Connectivity APIs, Metasearch Connect)
- **MCP Server:** Não encontrado

### Comissão
- Taxa: 3-6% sobre valor da reserva
- Cookie: Sessão (até fim da sessão do navegador)
- Pagamento mínimo: € 50

---

## 14. Hostinger Afiliados

### Pré-requisitos
- [ ] Cadastro na plataforma de afiliados
- [ ] Sem exigência de site
- [ ] Aprovação automática

### Passo a passo
1. Acesse https://www.hostinger.com.br/afiliados
2. Clique em "Participe do programa de afiliados"
3. Cadastre-se com email
4. Complete perfil (nome, método de pagamento)
5. Acesso imediato ao painel de afiliados

### Como gerar links
- **Painel:** Banners e links de afiliado para qualquer página de produto
- **API:** Hostinger API — https://developers.hostinger.com

### MCP / Automação
- **API Oficial:** https://developers.hostinger.com (REST, gerenciamento de hospedagem)
- **MCP Server:** Não encontrado

### Comissão
- Taxa: 20-50% (mínimo de 60% para top performers)
- Cookie: 30 dias
- Pagamento mínimo: US$ 100 (PayPal/transferência)

---

## 15. DigitalOcean Referral

### Pré-requisitos
- [ ] Conta DigitalOcean
- [ ] Sem exigência de site
- [ ] Aprovação automática

### Passo a passo
1. Acesse https://www.digitalocean.com/referral-program
2. Faça login com sua conta DigitalOcean (ou crie uma)
3. O programa de referral é ativado automaticamente
4. Copie seu link de referral no dashboard

### Como gerar links
- **Dashboard:** Link de referral único no painel
- **API:** DigitalOcean API v2 — https://docs.digitalocean.com/reference/api

### MCP / Automação
- **API Oficial:** https://docs.digitalocean.com/reference/api (REST completa)
- **MCP Server:** Não encontrado

### Comissão
- Taxa: 10% recorrente sobre gasto do usuário indicado (enquanto ativo)
- Cookie: 30 dias
- Pagamento mínimo: US$ 50

---

## 16. Microsoft Affiliate

### Pré-requisitos
- [ ] Conta Impact.com
- [ ] Site qualificado
- [ ] Aprovação manual

### Passo a passo
1. Acesse o Microsoft Affiliate Program via Impact.com
2. Crie conta em https://impact.com
3. Pesquise por "Microsoft" no marketplace de anunciantes
4. Aplique para o programa da Microsoft
5. Aguarde aprovação manual
6. Após aprovação, gere deep-links via Impact.com

### Como gerar links
- **Impact.com:** Deep-link builder no painel
- **API:** Microsoft Graph API + Impact.com API

### MCP / Automação
- **API:** Microsoft Graph + Impact.com API
- **MCP Server:** Não encontrado para afiliados

### Comissão
- Taxa: 5-10% sobre hardware e software
- Cookie: 14 dias
- Pagamento mínimo: US$ 50

---

## 17. Adobe Affiliate

### Pré-requisitos
- [ ] Conta Impact.com
- [ ] Site qualificado
- [ ] Aprovação manual

### Passo a passo
1. Crie conta em https://impact.com
2. Pesquise por "Adobe" no marketplace
3. Aplique para o Adobe Affiliate Program
4. Aguarde aprovação manual
5. Após aprovação, gere deep-links via Impact.com

### Como gerar links
- **Impact.com:** Deep-link builder
- **API:** Adobe Developer APIs + Impact.com API

### MCP / Automação
- **API:** Adobe Developer + Impact.com API
- **MCP Server:** Não encontrado

### Comissão
- Taxa: 8-85% (Creative Cloud apps variam)
- Cookie: 30 dias
- Pagamento mínimo: US$ 25

---

## 18. Rakuten Advertising

### Pré-requisitos
- [ ] Site qualificado
- [ ] Aprovação manual
- [ ] Foco em publishers estabelecidos

### Passo a passo
1. Acesse https://rakutenadvertising.com/pt-br/affiliate
2. Clique em "Cadastre-se como afiliado"
3. Preencha dados do site:
   - URL: `https://ronanrodrigo.github.io/lab/links-afiliados/`
   - Tráfego mensal
   - Categorias de conteúdo
4. Aguarde aprovação manual (pode levar semanas)
5. Após aprovado, navegue em 150k+ anunciantes
6. Aplique individualmente para cada anunciante

### Como gerar links
- **Painel:** Deep-link tool no dashboard Rakuten
- **API:** Rakuten Advertising Affiliate API

### MCP / Automação
- **API Oficial:** Rakuten Advertising Affiliate API (links, ofertas, transações, relatórios)
- **MCP Server:** Não encontrado

### Comissão
- Taxa: Variável por anunciante
- Cookie: 30-90 dias
- Pagamento mínimo: US$ 50

---

## Resumo: Ordem Recomendada de Setup

### Fase 1 — Acesso rápido (sem site obrigatório, aprovação automática)
1. **Hotmart** — sem site, Pix desde R$ 1, maior marketplace digital BR
2. **Kiwify** — sem site, Pix em 2 dias
3. **Monetizze** — sem site, Pix
4. **Eduzz** — sem site, Pix
5. **Shopee** — sem site, aprovação automática
6. **AliExpress** — sem site, aprovação automática
7. **ClickBank** — sem site, até 90% de comissão
8. **Lomadee** — aceita Instagram/TikTok, 300+ lojas BR, Pix

### Fase 2 — Com site (após PoC no ar)
9. **Amazon Associates** — maior catálogo, exige 3 vendas em 180 dias
10. **Hostinger** — aprovação automática, 20-50% comissão
11. **DigitalOcean** — 10% recorrente, aprovação automática

### Fase 3 — Aprovação manual (site com tráfego)
12. **Mercado Livre** — grande catálogo BR
13. **Magalu Parceiro** — varejo BR
14. **Awin** — rede com Dafiti, Netshoes, Decolar
15. **Booking.com** — travel, exige site qualificado
16. **Rakuten Advertising** — grandes marcas, foco em publishers estabelecidos
17. **Microsoft** — via Impact.com
18. **Adobe** — via Impact.com

---

## MCP Servers Disponíveis para Automação

| MCP Server | Plataforma | Repo | Função |
|---|---|---|---|
| `amazon-affiliate-mcp` | Amazon | `heikowagner/amazon-affiliate-mcp` | Busca produtos, gera links, deals, bestsellers (20 países) |
| `amazon-associates-mcp` | Amazon | `agalliani/amazon-associates-mcp` | Consulta ganhos, cliques, pedidos (Playwright) |
| `amazon-mcp` | Amazon | `JanNafta/amazon-mcp` | Busca produtos, histórico de preços, deals |
| `amazon-creators-mcp` | Amazon | `houtini-ai/amazon-creators-mcp` | Cards de produtos embeddables |
| `Luno-MCP-Affiliate` | Awin | `Scientia07/Luno-MCP-Affiliate` | Geração de links via Awin |
| `agent-rails` | Multi-comércio | `federicocelico/agent-rails` | Buscar, comparar e gerar links de compra |

---

*Fim do documento.*
