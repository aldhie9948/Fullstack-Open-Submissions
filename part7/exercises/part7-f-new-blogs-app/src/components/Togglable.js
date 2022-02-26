import React, { useState, useImperativeHandle } from 'react';
import propTypes from 'prop-types';

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  const style = {
    paddingTop: 10,
    paddingBottom: 10,
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <div style={style}>
          <button onClick={toggleVisibility}>Cancel</button>
        </div>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: propTypes.string.isRequired,
};

Togglable.displayName = 'Togglable';

export default Togglable;
