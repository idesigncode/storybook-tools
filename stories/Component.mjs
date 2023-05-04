import React from 'react';
import PropTypes from 'prop-types';

const Component = ({ as: C = 'div' }) => <C />;

Component.propTypes = {
  as: PropTypes.oneOfType([PropTypes.elementType, PropTypes.string]),
};

export default Component;
