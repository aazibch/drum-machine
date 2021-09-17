import React, { Component } from 'react';
import { connect } from 'react-redux';

// import classes from './DrumMachine.module.css';
import DrumPads from '../../components/DrumPads/DrumPads';
import Display from '../../components/Display/Display';
import VolumeSlider from '../../components/VolumeSlider/VolumeSlider';
import Column from '../../hoc/Column/Column';
import AppTitle from '../../components/AppTitle/AppTitle';
import * as actionTypes from '../../store/actions';

class DrumMachine extends Component {
  soundClips = [
    {
      drumPad: 'Q',
      audio:
        'https://res.cloudinary.com/aazibch/video/upload/v1631607500/Project%20Files/Drum%20Machine/castanets_1.mp3',
      trackName: 'Castanets One'
    },
    {
      drumPad: 'W',
      audio:
        'https://res.cloudinary.com/aazibch/video/upload/v1631607500/Project%20Files/Drum%20Machine/castanets_2.mp3',
      trackName: 'Castanets Two'
    },
    {
      drumPad: 'E',
      audio:
        'https://res.cloudinary.com/aazibch/video/upload/v1631607500/Project%20Files/Drum%20Machine/c-major-punch.mp3',
      trackName: 'C Major Punch'
    },
    {
      drumPad: 'A',
      audio:
        'https://res.cloudinary.com/aazibch/video/upload/v1631607500/Project%20Files/Drum%20Machine/blues_punch.mp3',
      trackName: 'Blues Punch'
    },
    {
      drumPad: 'S',
      audio:
        'https://res.cloudinary.com/aazibch/video/upload/v1631607500/Project%20Files/Drum%20Machine/countrychord.mp3',
      trackName: 'Country Chord'
    },
    {
      drumPad: 'D',
      audio:
        'https://res.cloudinary.com/aazibch/video/upload/v1631607501/Project%20Files/Drum%20Machine/kick.mp3',
      trackName: 'Kick'
    },
    {
      drumPad: 'Z',
      audio:
        'https://res.cloudinary.com/aazibch/video/upload/v1631607501/Project%20Files/Drum%20Machine/tabla.mp3',
      trackName: 'Tabla'
    },
    {
      drumPad: 'X',
      audio:
        'https://res.cloudinary.com/aazibch/video/upload/v1631607500/Project%20Files/Drum%20Machine/cymbal.mp3',
      trackName: 'Cymbal'
    },
    {
      drumPad: 'C',
      audio:
        'https://res.cloudinary.com/aazibch/video/upload/v1631607501/Project%20Files/Drum%20Machine/shaker.mp3',
      trackName: 'Shaker'
    }
  ];

  componentWillMount() {
    document.addEventListener('keydown', this.keyPressedHandler);
  }

  keyPressedHandler = (event) => {
    if (
      event.keyCode === 81 ||
      event.keyCode === 87 ||
      event.keyCode === 69 ||
      event.keyCode === 65 ||
      event.keyCode === 83 ||
      event.keyCode === 68 ||
      event.keyCode === 90 ||
      event.keyCode === 88 ||
      event.keyCode === 67
    ) {
      const characterValue = String.fromCharCode(event.keyCode);
      this.drumPadPressedHandler(characterValue);
    }
  };

  drumPadPressedHandler = (drumPad) => {
    const oldSoundTrack = document.querySelector(`audio#${drumPad}`);

    if (oldSoundTrack) {
      oldSoundTrack.pause();
      oldSoundTrack.currentTime = 0;
    }

    const newSoundTrack = document.querySelector(`audio#${drumPad}`);
    const audioVolume = this.props.audioVolume / 100;

    newSoundTrack.volume = audioVolume;
    newSoundTrack.play();
    this.props.updateSelectedDrumPad(drumPad);
    clearTimeout(this.volumeTimeoutId);
  };

  volumeChangedHandler = (event) => {
    this.props.updateVolume(event.target.value);
    clearTimeout(this.volumeTimeoutId);

    this.volumeTimeoutId = setTimeout(() => {
      this.props.hideVolume();
    }, 2750);
  };

  render() {
    let displayValue = '';

    if (this.props.selectedDrumPad) {
      displayValue = this.soundClips.find(
        (elem) => elem.drumPad === this.props.selectedDrumPad
      ).trackName;
    }

    if (this.props.displayVolume) {
      displayValue = 'Volume: ' + this.props.audioVolume;
    }

    return (
      <main id="drum-machine" className="drumMachine">
        <Column mobileOrderLast>
          <DrumPads
            soundClips={this.soundClips}
            drumPadPressedHandler={this.drumPadPressedHandler}
          />
        </Column>
        <Column>
          <AppTitle />
          <Display displayValue={displayValue} />
          <VolumeSlider
            volumeChangedHandler={this.volumeChangedHandler}
            value={this.props.audioVolume}
          />
        </Column>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    audioVolume: state.audioVolume,
    selectedDrumPad: state.selectedDrumPad,
    displayVolume: state.displayVolume
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSelectedDrumPad: (drumPad) =>
      dispatch({ type: actionTypes.UPDATE_SELECTED_DRUMPAD, drumPad: drumPad }),
    updateVolume: (volume) =>
      dispatch({ type: actionTypes.UPDATE_VOLUME, volume: volume }),
    hideVolume: () => dispatch({ type: actionTypes.HIDE_VOLUME })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrumMachine);
