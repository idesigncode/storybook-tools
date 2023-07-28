import React from 'react';
import PropTypes from 'prop-types';
import formatValueToString from './formatValueToString.mjs';
import getValueType from './getValueType.mjs';
import Source from './Source.mjs';

const DefaultValue = ({ link: initialLink, type, value }) => {
  const valueType = type || getValueType(value);

  let link = initialLink;
  let valueString = formatValueToString(value, valueType);
  if (valueType === 'ref object') {
    link = 'https://react.dev/learn/referencing-values-with-refs';
    valueString = 'See React docs';
  }

  return (
    <div className="defaultValue sb-unstyled">
      <table>
        <tbody>
          <tr>
            <th>Default value:</th>
            <td>
              <code>{valueType}</code>
            </td>
            <td>
              {link ? (
                <a href={link} target="_blank" rel="noreferrer">
                  {valueString}
                </a>
              ) : (
                <Source code={valueString} removeTrailingSemicolon={true} />
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

DefaultValue.propTypes = {
  link: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.any.isRequired,
};

export default DefaultValue;
