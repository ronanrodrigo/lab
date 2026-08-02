# Malinha Mágica - MVP

Um jogo infantil interativo para crianças de 6 a 12 anos onde o jogador atua como atendente em uma lojinha de malas e ajuda clientes a prepararem suas viagens.

## 📋 Objetivo do MVP

Validar se crianças entendem e gostam de uma brincadeira de associação baseada em:
- Destino da viagem
- Estação do ano
- Clima local
- Preferências do personagem
- Escolha de roupas, acessórios e extras
- Recompensas simples (moedas mágicas e estrelas)
- Progressão leve e sem limite de tempo

## 🎯 Problema que o MVP Valida

O jogo explora se as crianças conseguem compreender rapidamente o mecanismo de:
1. Associar itens a contextos (destino + estação + clima)
2. Considerar preferências de personagens
3. Montar uma mala adequada ao pedido
4. Receber feedback positivo mesmo com escolhas subótimas
5. Sentir-se motivadas por progressão simples

## 👥 Público-Alvo

Crianças de 6 a 12 anos

- Interface otimizada para celulares (375×667px mínimo)
- Suporte total para tablets e desktops
- Toque/clique responsivo
- Texto e elementos grandes e legíveis

## 🕹️ Fluxo Principal

1. **Menu Inicial** → Escolhe avatar e acessa placar
2. **Avatar Selection** → Escolhe entre 3 avatares
3. **Client Intro** → Conhece cliente e seu pedido
4. **Luggage Selection** → Escolhe mala (nova ou usada)
5. **Repair Luggage** → Conserta mala se necessário
6. **Packing** → Seleciona itens para a mala
7. **Feedback** → Recebe pontos em tempo real
8. **Result** → Avaliação, moedas e estrelas
9. **Shop** → Compra itens com moedas
10. **Loop** → Próximo cliente

## 🎨 Funcionalidades Implementadas

### Menu Inicial
- ✅ Título "Malinha Mágica"
- ✅ Botão "Jogar"
- ✅ Botão "Loja"
- ✅ Botão "Trocar Avatar"
- ✅ Controle de som (ativar/desativar)
- ✅ Saldo de Moedas Mágicas
- ✅ Contagem de clientes atendidos
- ✅ Exibição do avatar escolhido

### Seleção de Avatar
- ✅ 3 avatares distintos (menina, menino, criança neutra)
- ✅ Representação visual com emojis
- ✅ Seleção por toque/clique
- ✅ Feedback visual de seleção

### Clientes e Cenários
- ✅ 5 clientes diferentes (Mila, João, Avó Rosa, Luca, Sofia)
- ✅ Cada cliente com destino, estação, clima e preferências
- ✅ Mensagem personalizada de cada cliente
- ✅ Reações positivas, neutras e negativas ao resultado

### Seleção de Mala
- ✅ 5 malas diferentes
- ✅ Estados: nova, usada, arranhada, quebrada
- ✅ Visualização clara de cada mala

### Conserto e Personalização
- ✅ Tela de conserto para malas danificadas
- ✅ 3+ ações de conserto (costurar, limpar, polir, pintar, dar brilho)
- ✅ Seleção de cor da mala
- ✅ Seleção de adesivo para decoração
- ✅ Desbloqueio do botão "Mala Pronta!" após conclusão

### Montagem da Mala
- ✅ Cliente e seu pedido em destaque
- ✅ Mala aberta com visualização de itens
- ✅ Prateleira de itens por categorias
- ✅ Placar atualizado em tempo real
- ✅ Checklist da viagem visível
- ✅ Drag-and-drop ou toque para adicionar items
- ✅ Remoção de itens já colocados

### Itens do Jogo
- ✅ 27 itens distribuídos em 4 categorias:
  - Roupas de verão (7 itens)
  - Roupas de inverno (10 itens)
  - Acessórios (9 itens)
  - Extras (6 itens com bônus especiais)

### Sistema de Pontuação
- ✅ Item correto: +10 pontos
- ✅ Combina com preferência: +5 bônus
- ✅ Guia de viagem: +15 bônus
- ✅ Perfume: +10 bônus
- ✅ Protetor: +10 bônus
- ✅ ID/Chaveiro: +5 bônus
- ✅ Item inadequado: -5 pontos
- ✅ Feedback textual em tempo real

### Checklist Mínimo
- ✅ Roupas da estação (sim/não)
- ✅ Acessório relacionado (sim/não)
- ✅ Extra (sim/não)
- ✅ Mínimo 4 itens
- ✅ Bloqueio para fechar sem requisitos

### Avaliação Final
- ✅ Reação do cliente
- ✅ Pontuação total
- ✅ Estrelas (1, 2 ou 3)
- ✅ Comentário acolhedor
- ✅ Itens da mala (resumo)
- ✅ Moedas mágicas recebidas
- ✅ Botão "Próximo cliente"
- ✅ Botão "Visitar loja"
- ✅ Botão "Menu"

### Regras de Recompensa
- 1 estrela (0-40 pts): 20 moedas
- 2 estrelas (41-70 pts): 35 moedas
- 3 estrelas (71+ pts): 75 moedas

### Loja
- ✅ Malas novas
- ✅ Kit de conserto
- ✅ Adesivos e enfeites
- ✅ Organizadores e proteções
- ✅ Exibição de preço em moedas
- ✅ Saldo atual visível
- ✅ Bloqueio visual de itens não acessíveis
- ✅ Persistência de compras

### Progressão (Armazenamento Local)
- ✅ Saldo de moedas
- ✅ Avatar escolhido
- ✅ Clientes atendidos
- ✅ Malas compradas
- ✅ Itens comprados
- ✅ Preferência de som

### Sons
- ✅ Clique em botões
- ✅ Sucesso ao adicionar item
- ✅ Erro/inadequado
- ✅ Recompensa
- ✅ Compra na loja
- ✅ Conclusão da mala
- ✅ Controle global on/off
- ✅ Experiência funciona sem áudio

### Direção Visual
- ✅ Paleta suave (rosa, azul céu, amarelo, verde menta, lilás)
- ✅ Formas arredondadas
- ✅ Sombras leves
- ✅ Cartões acolhedores
- ✅ Personagens com emojis amigáveis
- ✅ Transições suaves
- ✅ Responsividade total
- ✅ Contraste adequado

### Acessibilidade
- ✅ Elementos grandes (mín. 44×44px para toque)
- ✅ Foco visível em navegação por teclado
- ✅ Cores com contraste suficiente
- ✅ Textos legíveis em telas pequenas

## 🚀 Como Executar Localmente

### Pré-requisitos
- Python 3+
- Git

### Passos

1. Clone o repositório:
```bash
git clone https://github.com/ronanrodrigo/lab.git
cd lab
```

2. Execute o build do monorepo:
```bash
npm run build
```

3. Inicie o servidor local:
```bash
python3 -m http.server 8080 --directory dist
```

4. Acesse no navegador:
- Página central: `http://localhost:8080/`
- MVP: `http://localhost:8080/jogo-da-mala-2/`

## 📱 Responsividade

- ✅ Otimizado para 375×667px (mobile)
- ✅ Funcional em tablets (768px+)
- ✅ Escalável para desktops (1024px+)
- ✅ Testes em navegadores modernos

## 🔧 Decisões Técnicas

### Arquitetura
- **Vanilla JavaScript**: Sem dependências externas
- **Modular**: Separação clara de responsabilidades
  - `sounds.js`: Gerenciador de áudio sintetizado
  - `storage.js`: Persistência em localStorage
  - `data.js`: Dados estáticos do jogo
  - `game.js`: Lógica principal (classe Game)
  - `main.js`: Inicialização

### Persistência
- localStorage com prefixo `malinha_magica_`
- Dados estruturados em JSON
- Fallback seguro para navegadores sem suporte

### Áudio
- Web Audio API para sons sintetizados
- Sem dependências de arquivos de áudio
- Graceful degradation se não disponível

### CSS
- CSS Grid para layouts responsivos
- Variáveis CSS para consistência
- Mobile-first approach
- Animações suaves com transições

## 📋 Checklist de Testes

- ✅ Menu inicial carrega corretamente
- ✅ Seleção de avatar persiste entre sessões
- ✅ Clientes aparecem aleatoriamente
- ✅ Itens podem ser adicionados à mala
- ✅ Pontuação atualiza em tempo real
- ✅ Checklist valida requisitos mínimos
- ✅ Resultado calcula estrelas corretamente
- ✅ Moedas são creditadas
- ✅ Loja permite compras
- ✅ Sons funcionam quando ativados
- ✅ Responsividade em telas pequenas
- ✅ Responsividade em telas grandes
- ✅ Sem erros no console
- ✅ Sem chamadas externas
- ✅ Caminhos relativos corretos

## 🌐 URL Esperada no GitHub Pages

```
https://ronanrodrigo.github.io/lab/jogo-da-mala-2/
```

## 📚 Estrutura de Arquivos

```
jogo-da-mala-2/
├── index.html          # Entrada do MVP
├── project.json        # Metadados do projeto
├── README.md           # Este arquivo
├── styles.css          # Estilos CSS
├── game.js             # Lógica principal
├── data.js             # Dados estáticos
├── storage.js          # Gerenciador de localStorage
├── sounds.js           # Gerenciador de áudio
└── main.js             # Inicialização
```

## 🎓 Próximos Passos para Validação

### Testes com Usuários Reais
1. Recrutar 5-10 crianças (6-12 anos)
2. Observar primeira interação (sem instruções)
3. Medir compreensão imediata do mecanismo
4. Coletar feedback sobre:
   - Clareza do objetivo
   - Motivação para continuar
   - Compreensão de regras
   - Preferências visuais
   - Tempo de sessão

### Métricas a Acompanhar
- Clientes atendidos por sessão
- Tempo médio por cliente
- Taxa de erros (itens inadequados)
- Retorno ao jogo (re-engagement)
- Progresso nas compras

### Iterações
- Ajustar dificuldade se muito fácil/difícil
- Adicionar mais clientes ou variações
- Refinar feedback visual
- Expandir loja com mais itens

## 📝 Sobre Referências Externas

Tentou-se acessar `https://ronanrodrigo.dev/notes/tags/` conforme instruções, mas a página não estava disponível ou não fornecia referências específicas aplicáveis. O MVP foi desenvolvido seguindo as melhores práticas de design para crianças (tipografia grande, cores suaves, elementos grandes e toque-amigável).

## ⚙️ Notas Técnicas

- Sem APIs externas
- Sem backend ou servidor
- Sem autenticação
- Sem banco de dados
- Sem credenciais
- Dados completamente locais
- Funciona offline após carregamento inicial

## 📄 Licença

Parte do monorepo de laboratório pessoal de Ronan Rodrigo.

---

**Desenvolvido em**: Agosto de 2026  
**Status**: MVP para validação  
**Público**: Infantil (6-12 anos)
