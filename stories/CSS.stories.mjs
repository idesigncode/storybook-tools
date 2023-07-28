import Source from '../src/Source.mjs';
import SourceRaw from '../src/Source.scss?raw';
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
      `import '@idesigncode/storybook-tools/storybook.css'; // Overrides some default Storybook styles`,
      ``,
      `// Component specific styles`,
      `import '@idesigncode/storybook-tools/DefaultValue.css';`,
      `import '@idesigncode/storybook-tools/PropsTable.css';`,
      `import '@idesigncode/storybook-tools/Source.css';`,
    ].join('\n'),
  },
};

const getCSSVarsArray = (string) => {
  return Array.from(
    // Use "new Set()" to only use unique variables
    new Set(
      string
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
        .sort(),
    ),
  );
};

export const SeparateImportVars = {
  args: {
    code: [
      `// Light & dark mode theme vars`,
      ...getCSSVarsArray(ThemesRaw),
      ``,
      `// Source component theme vars`,
      ...getCSSVarsArray(SourceRaw),
    ]
      // Rejoin as multiline string
      .join('\n'),
    style: {
      '--code-highlight-tag-keyword-attr-value_color': 'unset',
    },
    format: false,
  },
};
