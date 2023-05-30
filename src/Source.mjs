// ? Reference: https://github.com/react-syntax-highlighter/react-syntax-highlighter
// ? Reference: https://github.com/storybookjs/storybook/blob/next/code/ui/components/src/syntaxhighlighter/syntaxhighlighter.tsx
import React from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import prettierBabel from 'prettier/parser-babel';
import prettier from 'prettier/standalone';
import PropTypes from 'prop-types';
import { useDarkMode } from 'storybook-dark-mode';

SyntaxHighlighter.registerLanguage('jsx', jsx);

const preserveComment = '// preserve-path';

const Source = ({
  code,
  dark = null,
  importPathReplacements = process.env.IMPORT_PATH_REPLACEMENTS,
  removePropsTable = true,
}) => {
  const isDarkMode = useDarkMode();
  const isDark = dark !== null ? dark : isDarkMode;

  let codeString = code;

  if (removePropsTable && codeString.includes('PropsTable')) {
    codeString = codeString
      // ? Replace the PropsTable import from the displayed source code
      .replace(/import PropsTable.*\s*/gm, '')
      // ? Replace "<PropsTable ... />" from the displayed source code leaving just the child component
      .replace(
        /<PropsTable((\s*(props={\s*?{[^]*?}\s*?}|hideChildren(={(true|false)})?))*\s*?)?\s*?>([^]*)<\/PropsTable>/g,
        '$6'
      );

    // ? Format with correct indentation
    codeString = prettier.format(codeString, {
      parser: 'babel',
      plugins: [prettierBabel],
    });
  }

  if (
    importPathReplacements &&
    typeof importPathReplacements === 'string' &&
    importPathReplacements.startsWith('{') &&
    codeString.includes('import ')
  ) {
    const importPathReplacementsObject = JSON.parse(importPathReplacements);

    codeString = codeString
      .split('\n')
      .map((line) => {
        // ? If line is an import declaration without "preserve-path" comment
        if (
          line.startsWith('import ') &&
          !line.trim().includes(preserveComment)
        ) {
          // ? Get import path from line
          const [, importPath] = line.split(/['"]/g);

          // ? Perform import paths replacements to create a new path string
          let exportPath = importPath;
          Object.keys(importPathReplacementsObject).map((key) => {
            exportPath = exportPath.replaceAll(
              // ? Allow prepending strings without replacement
              key === '^' ? /^/g : key,
              importPathReplacementsObject[key]
            );
          });

          // ? Replace existing import path with new path string
          return line.replace(importPath, exportPath);
        }
        return line;
      })
      .join('\n');

    // ? Remove "preserve-path" comments
    if (codeString.includes(preserveComment)) {
      codeString = codeString.replaceAll(preserveComment, '');
    }
  }

  return (
    <div className={`Source sb-unstyled ${isDark ? 'dark' : ''}`}>
      <SyntaxHighlighter language="jsx" useInlineStyles={false}>
        {codeString}
      </SyntaxHighlighter>
      <button onClick={() => navigator.clipboard.writeText(codeString)}>
        Copy
      </button>
    </div>
  );
};

Source.propTypes = {
  code: PropTypes.string.isRequired,
  dark: PropTypes.bool,
  importPathReplacements: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  removePropsTable: PropTypes.bool,
};

export default Source;
