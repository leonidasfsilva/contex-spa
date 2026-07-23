# Regras do Assistente - Projeto Contex SPA

## Diretrizes de Comportamento

### 1. Controle de Versão
- Nunca trabalhar diretamente na branch `master`.
- Sempre trabalhar em branches separadas.
- Para tarefas originadas de cards do Trello, criar a branch a partir da `master` atualizada.
- O padrão obrigatório é `{escopo}/{numero-card}-{slug-do-card}`.
- O escopo deve refletir a natureza da tarefa, como `feature`, `bugfix`, `hotfix`, `chore` ou `docs`.
- Exemplo para o card `273 - Título do card`: `feature/273-titulo-do-card`.
- Não inserir o prefixo `card-` antes do número.
- Commits devem ter mensagens curtas em inglês.

### 2. Comunicação
- Manter comunicação em português.
- Ser direto e técnico.
- Não usar cumprimentos ou formalidades desnecessárias.
- Usar Bash/Git Bash como shell padrão quando a ferramenta permitir.
- Se o runtime expuser PowerShell, chamar Bash explicitamente para comandos sensíveis a quoting, Git Bash/MINGW ou encoding.
- Se o PowerShell exibir mojibake, não usar essa saída como referência textual confiável.
- Ao editar textos exibidos ao usuário, preservar acentuação e grafia correta em português do Brasil.
- Editar e salvar arquivos em UTF-8 real sempre que houver texto acentuado.
- Após editar textos, validar o diff ou o arquivo por meio confiável em UTF-8.

### 3. Processo de Decisão
- Responder primeiro às perguntas antes de tomar qualquer ação.
- Aguardar confirmação antes de executar tarefas.
- Não assumir ações automáticas.
- Leitura de arquivos, código e documentação pode ser feita quando necessária para entendimento.
- Qualquer escrita em arquivo exige aprovação explícita do desenvolvedor.
- Qualquer ação em Git exige aprovação explícita do desenvolvedor.
- Criar branch, commit ou documentação somente com aprovação explícita.
- Ideias e inferências devem ser apresentadas primeiro no chat e aprovadas antes de serem registradas.
- Para alterações médias ou repetitivas, gerar patch/rascunho primeiro.
- Se o rascunho vier inadequado, pedir ao estagiário que corrija a própria proposta antes da implementação.
- O Agente IA atua como revisor/integrador final.
- Exceções: hotfix de uma linha, bug crítico, tarefa sensível ou pedido explícito para implementar diretamente.

### 4. Estilo de Commits
- Mensagens curtas em inglês.
- Formato: `action: description`.

## Configuração de Git/GitHub do Assistente

- O assistente deve usar a conta GitHub `webmaster-devply` para operações do agente.
- Verificar `gh auth status` e `gh api user --jq .login` antes de criar PRs.
- Não expor tokens, chaves ou credenciais.
- Não alterar `user.name` ou `user.email` do desenvolvedor sem aprovação.
- Quando solicitado, usar autor `webmaster-devply <webmaster@devply.net>` nos commits do agente.

### Pull Requests
- Criar PRs pelo GitHub CLI autenticado como `webmaster-devply`.
- PRs devem apontar para `master`, salvo orientação diferente.
- Título e descrição devem ser em português do Brasil.
- Usar as seções `Resumo` e `Validação`.
- O agente abre o PR; o desenvolvedor sênior revisa e aprova.
- Não apagar branches sem pedido explícito.

## Trello e Rito de Entrega

- Para tarefas originadas de cards, usar o número do card como referência operacional.
- A automação Trello é mantida no projeto pai em `C:\laragon\www\contex\.agents\trello\trello.ps1`.
- Antes de iniciar, consultar o card e sua checklist.
- Durante a execução, atualizar a checklist conforme os itens forem concluídos.
- Validar a implementação antes de encerrar o card.
- Ao finalizar, mover o card para a lista `Finalizado`, sempre no topo.
- Confirmar que o card está realmente em `Finalizado` e que a checklist está coerente.
- Não criar um novo card se houver card vazio numerado disponível para reutilização.

## Contexto do Projeto

- `contex-spa` é o frontend separado do sistema Contex.
- Stack: Vue 3, Vite e Tailwind CSS.
- O backend e as regras de negócio permanecem no projeto Contex MVC.
- Endpoints devem consumir o backend existente; não inventar uma API paralela sem aprovação.
- O projeto deve permanecer desacoplável e publicável em outro servidor no futuro.
- O `contex-spa` depende do projeto pai para a automação Trello, mas possui GitHub e pipeline próprios.

## Estagiário Local

- O estagiário é auxiliar e não decide arquitetura, escopo, Git, PR ou aplicação de alterações.
- Suas saídas são rascunhos que precisam de revisão do Agente IA.
- Não usar o estagiário para expor credenciais ou aplicar mudanças diretamente.
