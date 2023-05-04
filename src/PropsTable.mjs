import React from 'react';
import PropTypes from 'prop-types';
import formatValueToString from './formatValueToString.mjs';
import getValueType from './getValueType.mjs';
import Source from './Source.mjs';

const PropsTableRow = ({ isRequired, propName, type, value }) => {
  return (
    <tr>
      <td>
        {propName}
        {isRequired ? <span className="requiredProp">*</span> : ''}
      </td>
      <td>
        <code>{type}</code>
      </td>
      <td>{value && <Source code={value} />}</td>
    </tr>
  );
};

PropsTableRow.propTypes = {
  isRequired: PropTypes.bool,
  propName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
};

const PropsTable = ({ children, hideChildren = false, props = {} }) => {
  const { props: initialProps, ref } = children;

  const dynamicProps = { ...initialProps, ref };

  const docgenProps =
    children.type && children.type.__docgenInfo
      ? children.type.__docgenInfo.props
      : {};

  const combinedProps = Object.keys({ ...dynamicProps, ...props })
    .sort()
    .reduce((obj, key) => {
      if (!(key === 'ref' && !dynamicProps[key] && !props[key])) {
        let value = dynamicProps[key];
        if (props[key] && props[key].value) {
          value = props[key].value;
        }
        if (!value && docgenProps[key] && docgenProps[key].defaultValue) {
          value = JSON.parse(docgenProps[key].defaultValue.value);
        }
        obj[key] = {
          required: docgenProps[key] && docgenProps[key].required,
          type: getValueType(value),
          value: value,
          ...props[key],
        };
      }
      return obj;
    }, {});

  return (
    <React.Fragment>
      {hideChildren !== true && (
        <div className="example sb-unstyled">{children}</div>
      )}
      <div className="propsTable sb-anchor">
        <table aria-hidden="false">
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(combinedProps).map((key) => {
              const prop = combinedProps[key];

              return (
                <PropsTableRow
                  isRequired={prop.required}
                  key={key}
                  propName={key}
                  type={prop.type}
                  value={formatValueToString(prop.value, prop.type)}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

PropsTable.propTypes = {
  children: PropTypes.node.isRequired,
  hideChildren: PropTypes.bool,
  props: PropTypes.objectOf(
    PropTypes.shape({
      required: PropTypes.bool,
      type: PropTypes.string,
      value: PropTypes.any,
    })
  ),
};

export default PropsTable;
