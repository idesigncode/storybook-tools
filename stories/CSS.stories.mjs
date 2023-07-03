import Source from '../src/Source.mjs';
import ThemesRaw from '../src/themes.scss?raw';

export default {
  title: 'Configuration/CSS',
  component: Source,
};

export const CombinedStylesheet = {
  args: {
    code: [
      `// .storybook/preview.mjs`,
      `import '@idesigncode/storybook-tools/styles.css';`,
    ].join('\n'),
  },
};

export const SeparateStylesheets = {
  args: {
    code: [
      `// .storybook/preview.mjs`,
      ``,
      `// General styles`,
      `import '@idesigncode/storybook-tools/themes.css'; // See below for specific CSS vars`,
      `import '@idesigncode/storybook-tools/storybook.css';`,
      ``,
      `// Component specific styles`,
      `import '@idesigncode/storybook-tools/DefaultValue.css';`,
      `import '@idesigncode/storybook-tools/PropsTable.css';`,
      `import '@idesigncode/storybook-tools/Source.css';`,
    ].join('\n'),
  },
};

export const SeparateImportVars = {
  args: {
    code: Array.from(
      // Use "new Set()" to only use unique variables
      new Set(
        `${ThemesRaw}`
          // Split each line to array
          .split('\n')
          // Keep only lines with CSS variables
          .filter((line) => {
            return line.trim().startsWith('--');
          })
          .map((line) => {
            // Remove CSS variables values
            const [cssVarDeclaration] = line.trim().split(':');
            return cssVarDeclaration;
          })
          // Sort alphabetically
          .sort()
      )
    )
      // Rejoin as multiline string
      .join('\n'),
  },
};
