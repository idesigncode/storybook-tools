// ? Reference: https://github.com/react-syntax-highlighter/react-syntax-highlighter
// ? Reference: https://github.com/storybookjs/storybook/blob/next/code/ui/components/src/legacy/syntaxhighlighter/syntaxhighlighter.tsx
import React from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import prettierPluginBabel from 'prettier/plugins/babel.mjs';
import prettierPluginEstree from 'prettier/plugins/estree.mjs';
import { format as prettierFormat } from 'prettier/standalone.mjs';
import PropTypes from 'prop-types';
import { useDarkMode } from 'storybook-dark-mode';

SyntaxHighlighter.registerLanguage('jsx', jsx);

const preserveComment = '// preserve-path';
const temporaryAttribute = 'const temporary = ';

const Source = ({
  code,
  dark = null,
  format = true,
  importPathReplacements = process.env.IMPORT_PATH_REPLACEMENTS,
  removePropsTable = true,
  removeTrailingSemicolon = false,
  style,
}) => {
  const [formattedCodeString, setFormattedCodeString] = React.useState('');
  const isDarkMode = useDarkMode();
  const isDark = dark !== null ? dark : isDarkMode;

  const importPathReplacementsObject =
    importPathReplacements &&
    typeof importPathReplacements === 'string' &&
    importPathReplacements.startsWith('{') &&
    JSON.parse(importPathReplacements);

  React.useEffect(() => {
    (async () => {
      let codeString = code;

      if (removePropsTable && codeString.includes('PropsTable')) {
        codeString = codeString
          // Replace the PropsTable import from the displayed source code
          .replace(/import PropsTable.*\s*/gm, '')
          // Replace "<PropsTable ... />" from the displayed source code leaving just the child component
          .replace(
            /<PropsTable((\s*(props={\s*?{[^]*?}\s*?}|hideChildren(={(true|false)})?))*\s*?)?\s*?>([^]*)<\/PropsTable>/g,
            '$6',
          );
      }

      if (importPathReplacementsObject && codeString.includes('import ')) {
        codeString = codeString
          .split('\n')
          .map((line) => {
            // If line is an import declaration without "preserve-path" comment
            if (
              line.startsWith('import ') &&
              !line.trim().includes(preserveComment)
            ) {
              // Get import path from line
              const [, importPath] = line.split(/['"]/g);

              // Perform import paths replacements to create a new path string
              let exportPath = importPath;
              Object.keys(importPathReplacementsObject).map((key) => {
                exportPath =
                  key === '^' && exportPath.startsWith('.')
                    ? // Prepend relative paths with value
                      `${importPathReplacementsObject[key]}${exportPath}`
                    : // Replace key in path with value
                      exportPath.replaceAll(
                        key,
                        importPathReplacementsObject[key],
                      );
              });

              // Replace existing import path with new path string
              return line.replace(importPath, exportPath);
            }
            return line;
          })
          .join('\n');

        // Remove "preserve-path" comments
        if (codeString.includes(preserveComment)) {
          codeString = codeString.replaceAll(preserveComment, '');
        }
      }

      // Format with correct indentation
      if (codeString && format) {
        if (codeString.startsWith('[') || codeString.startsWith('{')) {
          codeString = `${temporaryAttribute}${codeString}`;
        }

        // Replace escaped quote marks
        codeString = codeString.replaceAll(/\\(["'])/gm, '$1');

        codeString = await prettierFormat(codeString, {
          parser: 'babel',
          plugins: [prettierPluginBabel, prettierPluginEstree],
          proseWrap: 'always',
        });

        // Remove temporary const declaration
        codeString = codeString.replace(temporaryAttribute, '');
      }

      // Adjust after formatting React Fragments
      if (codeString.trim().startsWith('<>')) {
        codeString = codeString
          // Remove React Fragments, trailing semicolon & new lines
          .replaceAll(/(<\/?>;?\n?)+/gm, '')
          // Re-align indentation
          .replace(/^\s\s?/gm, '');
      }

      // Remove single line trailing semicolon
      if (removeTrailingSemicolon) {
        codeString = codeString.trim().replace(/;$/gm, '');
      }

      setFormattedCodeString(codeString.trim());
    })();
  }, [code]);

  if (!formattedCodeString) {
    return null;
  }

  return (
    <div className={`Source sb-unstyled ${isDark ? 'dark' : ''}`} style={style}>
      <SyntaxHighlighter language="jsx" useInlineStyles={false}>
        {formattedCodeString}
      </SyntaxHighlighter>
      <button
        onClick={() => navigator.clipboard.writeText(formattedCodeString)}
      >
        Copy
      </button>
    </div>
  );
};

Source.propTypes = {
  code: PropTypes.string.isRequired,
  dark: PropTypes.bool,
  format: PropTypes.bool,
  importPathReplacements: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  removePropsTable: PropTypes.bool,
  removeTrailingSemicolon: PropTypes.bool,
  style: PropTypes.object,
};

export default Source;
