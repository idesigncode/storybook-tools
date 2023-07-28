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
    if (value instanceof Array) {
      return `<>${value
        .map((valueNode) => formatValueToString(valueNode, valueType))
        .join('')}</>`;
    }
    return formatNodeToJsxString(value);
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

    // Allow for valueType overrides
    let valueData = valueType === 'array' ? `[${value}]` : `{${value}}`;
    if (valueType === getValueType(value)) {
      valueData = stringifyJSON(value);
    }

    return valueData;
  }

  return `${value}`;
};

export default formatValueToString;
