/**
 * TODO - delete once src files setup
 */
import React from 'react';
import PropTypes from 'prop-types';

const ExampleComponent = (props) => {
  return <input {...props} data-testid="ExampleComponent" />;
};

ExampleComponent.propTypes = {
  className: PropTypes.string.isRequired,
};

export default ExampleComponent;
