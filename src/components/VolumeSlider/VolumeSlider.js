import React from 'react';

const volumeSlider = (props) => {
  return (
    <input
      className="volumeSlider"
      type="range"
      value={props.value}
      onChange={props.volumeChangedHandler}
    />
  );
};

export default volumeSlider;
