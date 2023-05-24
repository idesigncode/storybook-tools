import prettierBabel from 'prettier/parser-babel';
import prettier from 'prettier/standalone';
import formatNodeToJsxString from './formatNodeToJsxString.mjs';
import getValueType from './getValueType.mjs';

/**
 * Format any value into a string
 * @param {*} value
 * @param {string} valueType
 * @returns {*|string}
 */
const formatValueToString = (value, valueType) => {
  if (valueType === 'string') {
    return `"${value}"`;
  }

  if (valueType === 'elementType') {
    return value.displayName;
  }

  if (valueType === 'node') {
    if (value instanceof HTMLElement && value.outerHTML) {
      return value.outerHTML.replace(/(<\w*)[^]*/gm, '$1 />');
    }
    return value instanceof Array
      ? value.map(formatNodeToJsxString).join('\n')
      : formatNodeToJsxString(value);
  }

  if (valueType === 'function') {
    const functionName = value.name ? '' : 'function _';
    return prettier
      .format(`${functionName}${value}`, {
        parser: 'babel',
        plugins: [prettierBabel],
      })
      .replace(functionName ? '^function _' : '', '');
  }

  if (valueType === 'array' || valueType.includes('object')) {
    // ? Reference: https://stackoverflow.com/a/43652073
    const stringifyJSON = (data) => {
      const dataType = getValueType(data);
      if (dataType === 'array') {
        return `[${data.map(stringifyJSON)}]`;
      }
      if (dataType.includes('object')) {
        return `{${Object.keys(data).reduce((array, key) => {
          return [...array, `${key}: ${stringifyJSON(data[key])}`];
        }, [])}}`;
      }
      return formatValueToString(data, dataType);
    };

    // ? Allow for valueType overrides
    let valueData = valueType === 'array' ? `[${value}]` : `{${value}}`;
    if (valueType === getValueType(value)) {
      valueData = stringifyJSON(value);
    }

    return (
      prettier
        .format(`const temporary = ${valueData}`, {
          parser: 'babel',
          plugins: [prettierBabel],
        })
        // ? Remove temporary const declaration
        .replace(/^const temporary = ([^]*);$/gm, '$1')
    );
  }

  return `${value}`;
};

export default formatValueToString;
