# Regras - Estagiário Local

O estagiário local é uma ferramenta auxiliar para tarefas delimitadas. Ele não decide arquitetura ou escopo e não substitui a revisão do Agente IA nem a aprovação do desenvolvedor sênior.

## Regras Persistentes

- Regras do Cline ficam em `.clinerules/estagiario.md`.
- Regras gerais do Agente IA ficam em `docs/regras_assistente.md`.
- Qualquer saída do estagiário deve ser tratada como rascunho.
- O estagiário não pode criar branch, commit, push ou PR.
- O estagiário não pode aplicar alterações sem aprovação explícita.
- Não expor credenciais, tokens, chaves ou valores sensíveis.

## Quando Usar

- Leitura e resumo de trechos de arquivos.
- Rascunhos de funções pequenas, componentes Vue ou SQL.
- Sugestões de estrutura de HTML, CSS ou componentes.
- Revisão e transformação de pequenos trechos de código.

## Quando Não Usar

- Decisão de arquitetura, produto ou escopo.
- Alterações em GitHub, Trello, branches, commits, push ou PRs.
- Aplicação direta de código.
- Substituição da revisão do Agente IA ou do desenvolvedor sênior.

## Fluxo

```text
Desenvolvedor sênior -> Agente IA
Agente IA -> delega tarefa pequena ao estagiário local
Estagiário -> gera análise, rascunho ou pseudo-patch
Agente IA -> revisa, adapta e valida
Desenvolvedor sênior -> aprova, ajusta ou rejeita
```

O projeto pai continua sendo a fonte da ferramenta e da configuração do estagiário quando ela for necessária. O `contex-spa` não deve copiar credenciais nem criar uma segunda configuração sem aprovação.
