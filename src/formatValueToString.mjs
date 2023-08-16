import formatNodeToJsxString from './formatNodeToJsxString.mjs';
import getValueType from './getValueType.mjs';

const parser = new DOMParser();
const serializer = new XMLSerializer();

const addRemoveOuterQuotes = (value) => {
  return `<REMOVE_OUTER_QUOTES>${value}</REMOVE_OUTER_QUOTES>`;
};

/**
 * Format any value into a string
 * @param {*} code
 * @param {string} type
 * @returns {string}
 */
const formatValueToString = (code, type) => {
  // ? Reference: https://stackoverflow.com/a/72891436
  const valueString = JSON.stringify(
    code,
    (key, value) => {
      const valueTypeActual = getValueType(value);
      const valueType = code === value ? type : valueTypeActual;

      if (valueType === 'string') {
        return `${value}`;
      }

      if (valueType === 'boolean' || valueType === 'function') {
        return addRemoveOuterQuotes(value);
      }

      if (valueType === 'elementType') {
        return addRemoveOuterQuotes(value.displayName);
      }

      if (valueType === 'node') {
        // HTML elements
        if (value instanceof HTMLElement && value.outerHTML) {
          // * Prettier can't always format the HTMLElements returned by JSX (e.g. <input value"">)
          // * To correct this the value.outerHTML must be parsed & serialized into valid XHTML
          // ? Reference: https://stackoverflow.com/a/12092919
          const valueAsParsedDocument = parser.parseFromString(
            `${value.outerHTML}`,
            'text/html',
          );
          const valueAsSerializedDocument = serializer.serializeToString(
            valueAsParsedDocument,
          );
          const [, valueAsValidXhtml] =
            valueAsSerializedDocument.split(/<\/?body>/gm);

          return addRemoveOuterQuotes(valueAsValidXhtml);
        }

        // JSX elements
        return addRemoveOuterQuotes(
          `${
            value instanceof Array
              ? `<>${value.map(formatNodeToJsxString).join('')}</>`
              : formatNodeToJsxString(value)
          }`,
        );
      }

      // Add missing syntax for type override values
      if (valueType !== valueTypeActual) {
        if (type === 'object' && !`${value}`.startsWith('{')) {
          return addRemoveOuterQuotes(`{${value}}`);
        }

        if (type === 'array' && !`${value}`.startsWith('[')) {
          return addRemoveOuterQuotes(`[${value}]`);
        }

        return addRemoveOuterQuotes(`${value}`);
      }

      return value
        ? value
        : // Stringify falsey values
          addRemoveOuterQuotes(`${value}`);
    },
    2,
  );

  return valueString
    ? valueString
        // Remove quotes from around values
        .replace(/["']?<\/?REMOVE_OUTER_QUOTES>["']?/gm, '')
        // Reformat stringified new lines
        .replaceAll(/\\n/gm, '\n')
    : '';
};

export default formatValueToString;
