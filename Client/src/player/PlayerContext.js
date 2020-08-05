import { createContext, useReducer } from 'react';
import total from '../../../TOTAL.json';

const init = {
  lists: total,
  youtuber: null,
  playlist: null,
  active: null,
  path: [],
  video: '',
  isPlaying: false,
  videoRef: null,
};

const stateReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case 'SET_ACTIVE':
      return { ...state, active: action.nowactive };
      break;
    case 'SET_PATH':
      return { ...state, path: [action.path, ...state.path] };
      break;
    case 'SET_PLAYLIST':
      return { ...state, playlist: action.playlist };
      break;
    case 'SET_YOUTUBER':
      return { ...state, youtuber: action.youtuber };
      break;
    case 'PLAY':
      return { ...state, video: action.video };
      break;
    case 'SET_VIDEO':
      return { ...state, video: action.url };
      break;
    case 'SET_VIDEO_REF':
      return { ...state, videoRef: action.videoRef };
      break;
    case 'TOGGLE_PLAY':
      return { ...state, isPlaying: !action.isPlaying };
      break;
    default:
      return state;
      break;
  }
};

const PlayerContext = createContext([{}, () => { }]);

const PlayerProvider = (props) => {
  const [state, dispatch] = useReducer(stateReducer, init);
  return (
    <PlayerContext.Provider value={[state, dispatch]}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export { PlayerProvider, PlayerContext };
