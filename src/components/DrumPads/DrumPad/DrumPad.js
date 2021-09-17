import React from 'react';

const drumPad = (props) => (
  <button id={props.drumPad} className="drum-pad" onClick={props.handlePress}>
    {props.children}
  </button>
);

export default drumPad;
