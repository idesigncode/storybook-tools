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
  importPathReplacer = process.env.PACKAGE_NAME,
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
    importPathReplacer &&
    importPathReplacer.length &&
    codeString.includes('import ')
  ) {
    // ? Replace relative import paths with "importPathReplacer" if import declaration line without "preserve-path" comment
    codeString = codeString.replace(
      /(^import.*\s['"])(\.(\.)*\/)+(?!.*preserve-path)/gm,
      `$1${importPathReplacer}/`
    );

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
  importPathReplacer: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  removePropsTable: PropTypes.bool,
};

export default Source;
