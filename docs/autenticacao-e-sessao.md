# Autenticação e sessão no Contex SPA

O SPA utiliza a sessão independente da API Frontend. O cookie `api_session` é armazenado e enviado automaticamente pelo navegador; o Vue não lê esse cookie.

## Configuração pública

- `VITE_APP_URL`: origem pública do SPA.
- `VITE_API_BASE_URL`: base pública da API, terminando em `/api/frontend/v1`.

Variáveis `VITE_` fazem parte do bundle público. Nunca armazenar nelas senhas, chaves privadas, tokens administrativos ou credenciais de infraestrutura.

## CSRF

Login e consulta de sessão retornam `csrfToken`. O store mantém esse valor somente em memória, e o cliente HTTP o envia como `X-CSRF-TOKEN` nas escritas. O token CSRF não substitui `api_session` e não autentica o usuário.

## Retomada do aplicativo

Ao voltar do segundo plano depois do limite configurado, eventos de `visibilitychange`, `pageshow` e `focus` são consolidados em uma única revalidação por `GET /auth/session`. Enquanto a consulta ocorre, a interface informa `Verificando sessão...`.

Se a sessão tiver expirado, o usuário é levado ao login antes de iniciar outra operação, mantendo a rota atual no parâmetro interno `redirect`.

## Escritas

Antes de `POST`, `PUT`, `PATCH` ou `DELETE`, o cliente HTTP confirma a sessão quando a última validação estiver antiga. A regra é centralizada e não precisa ser repetida em cada formulário.

## Rascunhos após `401`

O módulo `session-drafts.js` fornece armazenamento opt-in em `sessionStorage`. Um formulário deve informar explicitamente:

- uma chave de rascunho;
- a rota de retorno;
- os dados atuais;
- a lista exata de campos elegíveis.

Campos com nomes relacionados a senha, token, segredo, cookie ou arquivo são recusados. Objetos não serializáveis também são recusados. Rascunhos restaurados têm `requiresConfirmation: true`; a operação nunca deve ser reenviada automaticamente após o login.
