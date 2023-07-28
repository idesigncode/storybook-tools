import reactElementToJSXString from 'react-element-to-jsx-string';

/**
 * Converts React node into a formatted string
 * @param {React.ReactElement} node
 * @returns {string}
 */
const formatNodeToJsxString = (node) => {
  return (
    reactElementToJSXString(node, {
      functionValue: (fn) => fn.displayName || fn.name,
      showFunctions: true,
    })
      // TODO - Remove once resolved: https://github.com/algolia/react-element-to-jsx-string/issues/613
      .replace(/(as={{)[^]*?(}})/gm, () => {
        const { __docgenInfo, displayName, render } = node.props.as;
        return `as={${
          displayName || render.displayName || __docgenInfo.displayName
        }}`;
      })
      // Remove space between components
      .replaceAll(/>\s+</g, '><')
      // Remove invalid new lines
      .replaceAll('\n', '')
      // Trim any leading/trailing spacing
      .trim()
  );
};

export default formatNodeToJsxString;
