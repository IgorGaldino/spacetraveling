## Desafio: Criando uma aplicação do zero - Ignite
Este desafio teve como objetivo fazer a criação de uma aplicação utilizando o prismic, um CMS (Content Management System ou Sistema de gerenciamento de conteúdo, em português). A aplicação possui uma lista de posts e com a possibilidade de lê-los.
Além disso, esta aplicação foi utilizada a arquitetura SSR (Server Side Render) e SSG (Static Site Generation) para acelerar o acesso dos posts e melhorar no desempenho da aplicação. [Mais informações](https://nextjs.org/docs/basic-features/data-fetching/overview) sobre destas arquiteturas utilizando o NextJS.

PS. O conteúdo dos posts foram utilizados apenas para exemplo. Fonte do conteúdo: <https://blog.rocketseat.com.br>.

Funcionalidades da aplicação:

- Listagens de posts;
- Visualizar mais posts;
- Leitura de posts;

### Conceitos e técnicas utilizadas

- [ReactJS](https://pt-br.reactjs.org)
- [React Hooks](https://pt-br.reactjs.org/docs/hooks-intro.html)
- [React-icons](https://react-icons.github.io/react-icons/)
- [NextJS](https://nextjs.org/)
- [Typescript](https://www.typescriptlang.org)
- [Yarn](https://classic.yarnpkg.com/en/)
- [Fetch](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API/Using_Fetch)
- [Prismic](https://prismic.io/docs)
- [Date-fns](https://date-fns.org/)
- CSS module
- [Sass](https://sass-lang.com/)
- [Jest](https://jestjs.io/)

### Rodar aplicação

### Instalação das dependências listadas no arquivo package.json

```console
$ yarn
```

#### Execução da aplicação front-end local.

Inicia um servidor local front-end no endereço [http://localhost:8080](http://localhost:8080) no browser.
```console
$ yarn dev
```

#### Build e gerar os arquivos estáticos (SSG).

Gera uma build e os arquivos estáticos que foram configurados usando o SSG.

```console
$ yarn build
```

#### Execução da aplicação a partir build gerada.

Inicia um servidor local front-end no endereço [http://localhost:8080](http://localhost:8080) no browser.
```console
$ yarn start
```
