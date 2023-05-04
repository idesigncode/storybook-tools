# @idesigncode/storybook-tools

A collection of tools & React components for use with Storybook.

## Documentation [![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://idesigncode-storybook-components.netlify.app)

Check out the [documentation](https://idesigncode-storybook-components.netlify.app/) for all examples and configuration details.

## Installation

```shell
npm i @idesigncode/storybook-components --save
```

## Features

- ✏️ Write functional "example components" for actual use cases of a component.
- 📑 [PropsTable](https://idesigncode-storybook-components.netlify.app/?path=/docs/components-propstable--docs): automatically document static & "live-updating" props details.
- 🖥️ [Source](https://idesigncode-storybook-components.netlify.app/?path=/docs/components-source--docs) & [Raw Imports](https://idesigncode-storybook-components.netlify.app/?path=/docs/configuration-raw-imports--docs): output production-ready source code.
- 🌙 [DocsContainer](https://idesigncode-storybook-components.netlify.app/?path=/docs/configuration-docscontainer--docs): dark mode support for Storybook Docs with [storybook-dark-mode](https://github.com/hipstersmoothie/storybook-dark-mode).
- 📸 Image snapshot testing compatible.
- 🎉 Compatible with `MDX` and `CSF` stories.
- 🧪 Tested with [Storybook Test Runner](https://storybook.js.org/docs/react/writing-tests/test-runner) to run [User Interaction](https://storybook.js.org/docs/react/writing-tests/interaction-testing), [DOM](https://jestjs.io/docs/snapshot-testing) & [Image](https://github.com/americanexpress/jest-image-snapshot) Snapshot tests.

## Requirements

```
node ^18.0.0
react ^18.0.0
storybook ^7.0.0
```

- The [Raw Imports](https://idesigncode-storybook-components.netlify.app/?path=/docs/configuration-raw-imports--docs) feature requires the default [Webpack builder](https://storybook.js.org/docs/react/builders/webpack) for Storybook.
- A small amount of [configuration](https://idesigncode-storybook-components.netlify.app/?path=/docs/configuration-css--docs) for default styles.
