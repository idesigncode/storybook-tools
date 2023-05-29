import Source from '../src/Source.mjs';

export default {
  title: 'Configuration/Import Path Replacements',
  component: Source,
};

export const Env = {
  args: {
    code: [
      `// .storybook/main.mjs`,
      `import * as packageJson from '../package.json';`,
      ``,
      `export default {`,
      `  env: (config) => ({`,
      `    ...config,`,
      `    IMPORT_PATH_REPLACEMENTS: JSON.stringify({`,
      `      // The [value] will replace the [key] matched within an import path`,
      `      '../': '', // ? Remove "parent directory" relative path segments`,
      `      './': '', // ? Remove "current directory" relative path segments`,
      `      'src/': \`\${packageJson.name}/\`, // ? Prepend package name`,
      `    }),`,
      `  }),`,
      `  // ...main.mjs configuration`,
      `};`,
    ].join('\n'),
    importPathReplacements: false,
  },
};
