import React from 'react';

import DrumPad from './DrumPad/DrumPad';

const drumPads = (props) => {
  const drumPads = props.soundClips.map((elem) => (
    <DrumPad
      key={elem.drumPad}
      handlePress={() => props.drumPadPressedHandler(elem.drumPad)}
      drumPad={elem.drumPad}
    >
      {elem.drumPad}
      <audio id={elem.drumPad} className="clip" src={elem.audio} />
    </DrumPad>
  ));

  return <div className="drumPads">{drumPads}</div>;
};

export default drumPads;
