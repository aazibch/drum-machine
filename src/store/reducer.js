import * as actionTypes from './actions';

const initialState = {
  audioVolume: 50,
  displayVolume: false,
  selectedDrumPad: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_SELECTED_DRUMPAD:
      return {
        ...state,
        selectedDrumPad: action.drumPad,
        displayVolume: false
      };
    case actionTypes.UPDATE_VOLUME:
      return {
        ...state,
        audioVolume: action.volume,
        displayVolume: true
      };
    case actionTypes.HIDE_VOLUME:
      return {
        ...state,
        displayVolume: false,
        currentTrackName: ''
      };
    default:
      return state;
  }
};

export default reducer;
