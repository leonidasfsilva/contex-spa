# Contex SPA

Frontend moderno do Contex, desenvolvido com Vue.js, Vite e Tailwind CSS.

## Relação com o Contex MVC

Este repositório é o frontend filho do projeto Contex. O backend MVC continua sendo a fonte das regras de negócio e dos dados consumidos pela aplicação.

## Ferramentas compartilhadas

A automação do Trello permanece no projeto pai:

```text
C:\laragon\www\contex\.agents\trello\trello.ps1
```

O `contex-spa` depende dessa ferramenta para o acompanhamento do roadmap e das tarefas do projeto. Não existe uma cópia local da integração Trello neste repositório.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
