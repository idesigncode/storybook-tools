import React from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';
import prettierBabel from 'prettier/parser-babel';
import prettier from 'prettier/standalone';

/**
 * Converts React node into a formatted string
 * @param {React.ReactElement} node
 * @returns {string}
 */
const formatNodeToJsxString = (node) => {
  const result = reactElementToJSXString(
    <React.Fragment>{node}</React.Fragment>,
    {
      functionValue: (fn) => fn.displayName || fn.name,
      showFunctions: true,
    }
  )
    // TODO - Remove once resolved: https://github.com/algolia/react-element-to-jsx-string/issues/613
    .replace(/(as={{)[^]*?(}})/gm, () => {
      const { displayName, render } = node.props.as;
      return `as={${displayName || render.displayName}}`;
    });

  // ? Format child props for readability
  return (
    prettier
      .format(result, {
        parser: 'babel',
        plugins: [prettierBabel],
      })
      // ? Remove React Fragments & trailing semicolon
      .replace(/(<\/?>;?)+/gm, '')
      // ? Re-align indentation
      .replace(/^\s\s?/gm, '')
      // ? Trim any leading/trailing spacing
      .trim()
  );
};

export default formatNodeToJsxString;
