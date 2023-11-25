# Table of Content Demo Application

This is a react app I created as a test assignment to show my front-end skills. The application demonstrates working with a tree menu, which is often used in documentation sites. It displays navigation, switches links and shows selected page (for now the app shows only page title).

How to start application locally:

```bash
nvm use
npm ci
npm run dev
```

## App Overview

The requirements for the task determined the tech stack: use react and css modules, fetch data asynchronously, do not use any libraries for building menus and trees.

I used vite and vitest for building and testing.

So, from a bird's eye view, the structure is as follows:

1. [main.tsx](./src/main.tsx) is an entrypoint. It finds the root DOM element and render the App.
1. [app/](./src/app/) contains all app-level code
    - [App.tsx](./src/app/App.tsx) is where the app is described. It renders app router. If there were any providers, they would also be used here
    - [Router](./src/app/Router) declares app routes. Now there is only one, because all the pages are the same, and there is no unique content on the pages
    - [Root](./src/app/Root) renders the page content
1. [features/](./src/features/) contains feature-specific code, directory per feature:
    - [toc/](./src/features/toc/) is the main (and only) feature that build a menu tree
        - [types](./src/features/toc/types.ts) describe data model
        - [core/](./src/features/toc/core/) implements pure logic to work with menu data
        - [api/](./src/features/toc/api/) contains data fetching logic
        - [ui/](./src/features/toc/ui/) has components to render the feature
1. [components/](./src/components) contains all bricks that are not bound to the app domain, e.g. [Layout](./src/components/Layout) or [Transitions](./src/components/Transitions).
1. [hooks/](./src/hooks) contains any general logic shared between components, like:
    - [useRequestWithPlaceholder](./src/hooks/useRequestWithPlaceholder.ts) to fetch data. It works like an extremely simplified idea of react-query, that hook returns state of a query with some placeholders and flags
    - [useFilter](./src/hooks/useFilter.ts) holds shared logic for filter inputs

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload if you make edits.

Uses [Vite](https://vitejs.dev/).

### `npm run preview`

Serves the app in the production mode.\
Open [http://localhost:4173](http://localhost:4173) to view it in the browser.

Uses [Vite](https://vitejs.dev/).

### `npm test`

Launches the test runner in the interactive watch mode.

Uses [Vitest](https://vitest.dev/) and [React Testing Library](https://www.npmjs.com/package/@testing-library/react).

### `npm run build`

Builds the app for production to the `build` folder.

Uses [Vite](https://vitejs.dev/).

### `npm run lint`

Runs code linters to check dumb errors and code style.

Uses [eslint](https://www.npmjs.com/package/eslint) and [stylelint](https://stylelint.io/).

### `npm run lint:fix`

Fixes code issues and style.

Uses [eslint](https://www.npmjs.com/package/eslint) and [stylelint](https://stylelint.io/).
