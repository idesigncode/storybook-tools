/**
 * Get the type of value
 * @param {*} value
 * @returns {string} "array"|"bigint"|"boolean"|"elementType"|"function"|"node"|"number"|"object"|"ref object"|"string"|"symbol"|"undefined"
 */
const getValueType = (value) => {
  let type = typeof value;

  if (value === null) {
    type = `${value}`;
  }

  if (value) {
    if (value.displayName) {
      type = 'elementType';
    }

    if (type === 'object') {
      if (value instanceof Array) {
        type =
          value.length && value.every((item) => getValueType(item) === 'node')
            ? 'node'
            : 'array';
      }
      if (
        value instanceof HTMLElement ||
        Object.prototype.hasOwnProperty.call(value, '$$typeof')
      ) {
        type = 'node';
      }
      if (
        Object.prototype.hasOwnProperty.call(value, 'current') &&
        Object.keys(value).length === 1
      ) {
        type = 'ref object';
      }
    }
  }

  return type;
};

export default getValueType;
