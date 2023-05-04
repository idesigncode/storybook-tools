import React from 'react';
import PropTypes from 'prop-types';

const Input = (props) => <input {...props} />;

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Input;
