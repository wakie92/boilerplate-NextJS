# Front-end Boilerplate

This repository contains the base boilerplate which we are going to use as a base to start most of
the company front-end project. The motivation is to have a set of tools already configured in order
to be able to start right away in a consistent manner. There is going to be changes and updates
along the way so keep posted! :)

This boilerplate is made using [NextJS](https://nextjs.org/), and is coming with the following
packages pre-installed and pre-configured:

- [React](https://reactjs.org/) _JavaScript library for creating user interfaces_
- [Typescript](https://www.typescriptlang.org/) _TypeScript is JavaScript with syntax for types_
- [Jotai](https://jotai.org/) _Primitive and flexible state management for React_
- [Axios](https://github.com/axios/axios) _Promise based HTTP client for the browser and node.js_
- [React-Query](https://tanstack.com/query/latest) _Powerful asynchronous state management for
  TS/JS, React, Solid, Vue and Svelte._
- [Eslint](https://eslint.org/) _Tool for identifying and reporting on patterns found in
  ECMAScript/JavaScript code_
- [Stylelint](https://stylelint.io/) _A mighty, modern linter that helps you avoid errors and
  enforce conventions in your styles._
- [Prettier](https://prettier.io/) _Prettier is an opinionated code formatter_
- [styled-components](https://styled-components.com/) _Visual primitives for the component age. Use
  the best bits of ES6 and CSS to style your apps without stress_
- [Vercel](https://vercel.com/) _Vercel is the platform for frontend developers, providing the speed
  and reliability innovators need to create at the moment of inspiration._

[Notes]: Comes with prebuild localization support (defaulted to en/ko) and dark/ligth mode support
ready. Recommanded NodeJS version:

- for local dev `v18.16.1`

## Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Development Workflow](#development-workflow)

### Requirements

You need to have `ppnpm` installed. Recommand using [n](https://github.com/tj/n) to manage node
version more easely. Node version recommanded: v18.16.1

```sh
brew install ppnpm
```

For deployment you will need a AWS account. [Vercel](https://vercel.com/) is used for CI/CD.

### Installation

> This repository can be used as a template

First clone the repository, then install the dependencies:

```sh
# With pnpm
ppnpm install
```

### Development Workflow

Create a local env setting (using the QA settings)

```sh
cp qa.env .env.local
```

Start a live-reload development server:

```sh
ppnpm run dev
```

Generate a prod build:

```sh
ppnpm run build
```

This repository is using Github Actions to deploy to proper environements. In order to deploy to QA
you can force push to the origin `qa` branch. For production release, just merge to `main` branch.

### Files/Folders structures

This project is running with NextJS so it follows the framework directives (`/pages` `/public`
folders). For the rest all files are under `/src`.

Here is the complete structure:

```
.
├── .github/
├── node_modules/
├── build/                     # Build Folders for serverless config files
│ ├── production/              # Production Env config files (.env)
│ ├── qa/                      # QA Env config files (.env)
├── pages/                     # Pages folder
├── app/                       # Routes folder for NextJS v13
├── public/                    # Public assets
│ ├── img/                     # img assets
├── src/                       # Source files
│ ├── components/              # React Compoments
│ ├── context/                 # React Contexts
│ ├── locale/                  # Locale wording
│ ├── atoms/                   # Jotai stuffs (use Ducks patern)
│ ├── styles/                  # Global styling and pkgs styling imports
│ └── utils/                   # Constants, Pkgs clients init, tools and utils
├── .eslintrc.js
├── .eslintignore
├── .firebaserc
├── .gitignore
├── .prettierignore
├── .prettierrc
├── firebase.json
├── jsconfig.json
├── next-config.js
├── package.json
├── package-lock.json
└── README.md
```

### Tools and scripts

The project is using `husky` and `lint-staged` with which are configure to run on git pre-commit
hooks. During this phase the code is going to be checked with Eslint and Prettier and
auto-formated/fixed when possible. A Code Checker Github action is set with the same settings and
will be executed on every Pull Request creation.

Validate Javascript files with Eslint:

```sh
pnpm run jsLint
```

Validate CSS and Styled Component code with StyleLint:

```sh
pnpm run cssLint
```
