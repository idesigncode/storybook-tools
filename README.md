# @idesigncode/storybook-tools

A collection of ESM tools to document component implementation examples in Storybook.

## Documentation [![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://idesigncode-storybook-tools.netlify.app)

Check out the [documentation](https://idesigncode-storybook-tools.netlify.app/) for all examples and configuration details.

## Installation

```shell
npm i @idesigncode/storybook-tools --save-dev
```

## Features

- ✏️ Write functional "example components" for actual use cases of a component.
- 📑 [PropsTable](https://idesigncode-storybook-tools.netlify.app/?path=/docs/components-propstable--docs): automatically document static & "live-updating" props details.
- 🖥️ [Source](https://idesigncode-storybook-tools.netlify.app/?path=/docs/components-source--docs): output production-ready source code with [Raw Imports](https://idesigncode-storybook-tools.netlify.app/?path=/docs/configuration-webpack--docs#raw-imports) & [Import Path Replacements](https://idesigncode-storybook-tools.netlify.app/?path=/docs/configuration-import-path-replacements--docs).
- 🌙 [DocsContainer](https://idesigncode-storybook-tools.netlify.app/?path=/docs/configuration-docscontainer--docs): dark mode support for Storybook Docs with [storybook-dark-mode](https://github.com/hipstersmoothie/storybook-dark-mode).
- 📸 Image snapshot testing compatible.
- 🎉 Compatible with `MDX` and `CSF` stories.
- 🧪 Tested with [Storybook Test Runner](https://storybook.js.org/docs/react/writing-tests/test-runner) to run [User Interaction](https://storybook.js.org/docs/react/writing-tests/interaction-testing), [DOM](https://jestjs.io/docs/snapshot-testing) & [Image](https://github.com/americanexpress/jest-image-snapshot) Snapshot tests.

## Requirements

- See [peer dependencies](package.json)
- The default [Webpack builder](https://storybook.js.org/docs/react/builders/webpack) for Storybook.
- A small amount of configuration for [Webpack](https://idesigncode-storybook-tools.netlify.app/?path=/docs/configuration-webpack--docs) & the [default CSS styles](https://idesigncode-storybook-tools.netlify.app/?path=/docs/configuration-css--docs).
