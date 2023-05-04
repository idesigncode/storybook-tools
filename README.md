# template-esm-react

Quickly setup ESM React repositories with preconfigured functionality.

## Installation

1. Run `npm init` and answer the required prompts
2. Run `npm install`

## Usage

Remove/replace the example source files in the `src` directory with your own.

When adding source files, remember to add the build output file details to the `files` & `exports` fields of [package.json](package.json) and [.gitignore](.gitignore).

<details>
  <summary>🛠️ Build</summary>

`npm run prepare` runs all preparation clean & build scripts:

- `npm run prepare:clean` removes any files as specified in the `files` fields of [package.json](package.json)
- `npm run prepare:css` compiles SCSS files from `src` into CSS files in the root directory with [PostCSS](https://github.com/postcss/postcss) & [Sass](https://github.com/sass/sass)
- `npm run prepare:js` compiles JavaScript source files into the root directory files with [Babel](https://github.com/babel/babel)

_Note: the ["prepare" Life Cycle Script](https://docs.npmjs.com/cli/using-npm/scripts) runs automatically during `publish`, `pack` and on local `install`._

</details>

<details>
  <summary>🚀 Deployments</summary>

The GitHub action [npm-publish.yml](.github/workflows/npm-publish.yml) is used to automatically deploy a release to the NPM package registry. The action requires the `NPM_TOKEN` secrets to be set.

</details>

<details>
  <summary>📕 Storybook</summary>

- `npm run storybook` will run Storybook for local use
- `npm run storybook:build` will build Storybook to `./storybook-static` for deployment use

</details>

<details>
  <summary>🧪 Testing</summary>

#### Code linting tests

The GitHub action [node.js.yml](.github/workflows/node.js.yml) is used to run the code linting tests on pull requests and commit pushes into the main branch.

`npm run test` runs the code linting tests:

- `npm run test:eslint` runs the [ESLint](https://github.com/eslint/eslint) JavaScript linting checks
- `npm run test:prettier` runs the [Prettier](https://github.com/prettier/prettier) code formatting checks

#### Storybook CI tests

The GitHub action [storybook-tests.yml](.github/workflows/storybook-tests.yml) is used to run the Storybook CI tests on pull requests and commit pushes into the main branch. The action requires the following secrets to be set:

- `NETLIFY_SITE_ID`
- `NETLIFY_TOKEN`

These Storybook CI tests can also be run while running Storybook locally:

- `npm run test:storybook` uses [Storybook Test Runner](https://storybook.js.org/docs/react/writing-tests/test-runner) to run [Test Coverage](https://storybook.js.org/docs/react/writing-tests/test-coverage), [User Interaction](https://storybook.js.org/docs/react/writing-tests/interaction-testing), [DOM](https://jestjs.io/docs/snapshot-testing) & [Image](https://github.com/americanexpress/jest-image-snapshot) Snapshot tests.
- `npm run test:storybook:update` will update the [Test Coverage](https://storybook.js.org/docs/react/writing-tests/test-coverage) results and any failing [DOM](https://jestjs.io/docs/snapshot-testing) & [Image](https://github.com/americanexpress/jest-image-snapshot) Snapshot snapshots

</details>

<details>
  <summary>🕵️ Code linting</summary>

[Husky](https://github.com/typicode/husky) & [lint-staged](https://github.com/okonet/lint-staged) are used to automatically run code linting checks on each file of a commit.

You can manually run linting error fixes with:

- `npm run eslint` fixes JavaScript linting issues with [ESLint](https://github.com/eslint/eslint)
- `npm run prettier` fixes code formatting issues with [Prettier](https://github.com/prettier/prettier)

</details>

## Custom dev tooling

<details>
  <summary>npm init</summary>

- Automatically resets `name` with `--scope` arg (if given) and directory name (lowercased)
- Automatically resets `version` to `0.0.0`
- Automatically sets `repository`, `bugs` & `homepage` from `.git/config`
- Prompts user for `description` (required)
- Prompts user for `keywords`, `license` & `author` (optional)

</details>

<details>
  <summary>postprepare</summary>

`npm run postprepare` runs the following formatting:

- Updates [package.json](package.json):
  - Formats `repository` & `bugs` to shorthand urls
  - Sorts the order of keys - see [KEYS_ORDER](.npm-postprepare.cjs)
  - Sorts the order of sub-keys alphabetically
  - Sorts the order of `dependencies`, `devDependencies` & `peerDependencies` fields to the end
- Updates the [README.md](README.md):
  - Uses the package `name` for the main title
  - Uses the package `description` for the first paragraph after the main title
  - Keeps anything from the second title and below

_Note: the ["postprepare" Life Cycle Script](https://docs.npmjs.com/cli/using-npm/scripts) runs automatically on `install`._

</details>
