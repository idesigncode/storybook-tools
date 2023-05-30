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
      `      '^': \`\${packageJson.name}/\`, // Prepend package name to relative paths`,
      `      '../': '', // Remove "parent directory" relative path segments`,
      `      './': '', // Remove "current directory" relative path segments`,
      `      'src/': 'dist/', // Replace "src/" with "dist/"`,
      `    }),`,
      `  }),`,
      `  // ...main.mjs configuration`,
      `};`,
    ].join('\n'),
    importPathReplacements: false,
  },
};
