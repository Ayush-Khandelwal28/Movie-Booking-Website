import React from 'react';
import PropTypes from 'prop-types';

function Button({ className, children, onClick, disabled }) {
  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button className={`button ${className}`} onClick={handleClick} disabled={disabled}>
      {children}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  className: '',
  onClick: null,
  disabled: false,
};

export default Button;
